export const OMRR_APP_STATUS_QUERY = `SELECT DISTINCT
    To_Number(CORRAL_GENERATED_VIEWS.EM_AUTHJOBQUEUES.AUTHORIZATIONNUMBER) As "Authorization Number",
    To_Number(CORRAL_GENERATED_VIEWS.EM_AUTHJOBQUEUES_T.TRACKINGNUMBER) As "Job Tracking Number",
    CORRAL_GENERATED_VIEWS.EM_AUTHJOBQUEUES.JOBTYPE As "Job Type",
    CORRAL_GENERATED_VIEWS.EM_AUTHJOBQUEUES.AUTHORIZATIONTYPE As "Authorization Type",
--CORRAL_GENERATED_VIEWS.EM_AUTHJOBQUEUES_T.APPLICATIONTYPE As "Application Type", -- NOTE this is where we could filter out internal amendments
    Decode (CORRAL_GENERATED_VIEWS.EM_AUTHJOBQUEUES_T.STATUSDESCRIPTION,
            'In Screening', 'In Review',
            'Awaiting Decision', 'In Review',
            'Distribute', 'Review Complete',
            'Signed', 'Review Complete',
            'Pre-Application', 'Preliminary Application Review',
            CORRAL_GENERATED_VIEWS.EM_AUTHJOBQUEUES_T.STATUSDESCRIPTION)  As "Status",
    To_Date(NVL(CORRAL_GENERATED_VIEWS.EM_AUTHJOBQUEUES.RECEIVEDDATE,CORRAL_GENERATED_VIEWS.EM_AUTHJOBQUEUES_T.CREATEDDATE)) As "Received Date"

FROM CORRAL_GENERATED_VIEWS.EM_AUTHJOBQUEUES
         INNER JOIN CORRAL_GENERATED_VIEWS.EM_AUTHJOBQUEUES_T
                    ON CORRAL_GENERATED_VIEWS.EM_AUTHJOBQUEUES.JOBID =CORRAL_GENERATED_VIEWS.EM_AUTHJOBQUEUES_T.JOBID
WHERE
    CORRAL_GENERATED_VIEWS.EM_AUTHJOBQUEUES.AUTHORIZATIONNUMBER in (
        SELECT TO_NUMBER(AUTHORIZATIONOBJECT.AUTHORIZATIONNUMBER)
        FROM CORRAL_GENERATED_VIEWS.AUTHORIZATIONOBJECT,
             CORRAL_GENERATED_VIEWS.AUTHORIZATIONTYPE,
             CORRAL_GENERATED_VIEWS.Wdrschedule_One,
             CORRAL_GENERATED_VIEWS.Wdrschedule_two
        WHERE AUTHORIZATIONOBJECT.AUTHORIZATIONTYPEID = AUTHORIZATIONTYPE.AUTHTYPEOBJECTID(+)
          AND AUTHORIZATIONOBJECT.AUTHORIZATIONNUMBER IS NOT NULL
          AND AUTHORIZATIONOBJECT.WDRSchedule1ID = Wdrschedule_One.ObjectId(+)
          AND AUTHORIZATIONOBJECT.WDRSchedule2ID = Wdrschedule_Two.ObjectId(+)
          AND Wdrschedule_One.ActivityDescription || '' || Wdrschedule_two.ActivityDescription || '' || Wdrschedule_two.CodeOfPractice = 'Composting Operations'
          and AUTHORIZATIONOBJECT.STATUS !='Withdrawn'
        UNION
        SELECT DISTINCT

            To_Number(REGISTRATION.REGAUTHORIZATIONNUMBER) As "Authorization Number"
        FROM CORRAL_GENERATED_VIEWS.REGISTRATION,
             CORRAL_GENERATED_VIEWS.AUTHORIZATIONTYPE
        WHERE REGISTRATION.AuthorizationTypeID =  AUTHORIZATIONTYPE.AUTHTYPEOBJECTID
          AND AUTHORIZATIONTYPE.AUTHORIZATIONNAME ='Organic Matter Recycling Regulation'
          AND REGISTRATION.STATE !='Withdrawn'
    )
  AND (CORRAL_GENERATED_VIEWS.EM_AUTHJOBQUEUES_T.APPLICATIONTYPE is null
    OR CORRAL_GENERATED_VIEWS.EM_AUTHJOBQUEUES_T.APPLICATIONTYPE != 'Internal Amendment')

  and CORRAL_GENERATED_VIEWS.EM_AUTHJOBQUEUES.JOBTYPE IN ( 'New Registration' ,'Registration Amendment' ,'New Authorization' ,'Authorization Amendment')
  and  CORRAL_GENERATED_VIEWS.EM_AUTHJOBQUEUES_T.STATUSDESCRIPTION NOT IN ( 'Approved','Completed','Withdrawn','Data Updated','Rejected')
order by 1
`;