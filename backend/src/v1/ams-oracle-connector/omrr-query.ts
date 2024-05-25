export const OMRR_QUERY = `SELECT DISTINCT TO_NUMBER(AUTHORIZATIONOBJECT.AUTHORIZATIONNUMBER) AS "Authorization Number",
                                           AUTHORIZATIONTYPE.AUTHORIZATIONNAME                AS "Authorization Type",
                                           Case
                                               When Upper(CLIENT.DoingBusinessAs) Is Not Null Then (Case
                                                                                                        When Upper(CLIENT.DUP_FORMATTEDNAME) Is Not Null
                                                                                                            Then Upper(CLIENT.DUP_FORMATTEDNAME)
                                                                                                        Else InitCap(CLIENT.FIRSTNAME) || ' ' || InitCap(CLIENT.LASTNAME) End) ||
                                                                                                   ' doing business as ' ||
                                                                                                   Upper(CLIENT.DoingBusinessAs)
                                               Else NVL(Upper(CLIENT.DUP_FORMATTEDNAME),
                                                        InitCap(CLIENT.FIRSTNAME) || ' ' ||
                                                        InitCap(CLIENT.LASTNAME)) End         As "Regulated Party",
                                           Decode(AUTHORIZATIONOBJECT.STATUS, 'Cancelled', 'Inactive', 'Expired',
                                                  'Inactive', 'Active', 'Active')             As "Authorization Status",
                                           AUTHORIZATIONOBJECT.IssueDate                      AS "Effective/Issue Date",
                                           AUTHORIZATIONOBJECT.Amendmentdate                  AS "Last Amendment Date",
                                           ADDRESS_2.INLINEDISPLAY                            AS "Facility Location",
                                           AUTHORIZATIONOBJECT.LATITUDE                       AS "Latitude",
                                           -1 * AUTHORIZATIONOBJECT.LONGITUDE                 AS "Longitude",
                                           AUTHORIZATIONOBJECT.WDRType || ' - ' ||
                                           Wdrschedule_One.ActivityDescription || '' ||
                                           Wdrschedule_two.ActivityDescription || '' ||
                                           Wdrschedule_two.CodeOfPractice                     AS "Waste Discharge Regulation",
                                           NULL                                               as "Operation Type",
                                           NULL                                               as "Material Land Applied",
                                           NULL                                               as "Intended Dates of Land Application",
                                           NULL                                               as "Facility Design Capacity (t/y)",
                                           NULL                                               as "Type of Compost Produced",
                                           NULL                                               as "Yard Waste",
                                           NULL                                               as "Biosolids",
                                           NULL                                               as "Whey",
                                           NULL                                               as "Untreated and Unprocessed Wood Residuals",
                                           NULL                                               as "Poultry Carcasses",
                                           NULL                                               as "Fish Wastes",
                                           NULL                                               as "Food Waste",
                                           NULL                                               as "Brewery Waste/Wine Waste",
                                           NULL                                               as "Animal Bedding",
                                           NULL                                               as "Domestic Septic Tank Sludge",
                                           NULL                                               as "Hatchery Waste",
                                           NULL                                               as "Manure",
                                           NULL                                               as "Milk Processing Waste"
                           from CORRAL_GENERATED_VIEWS.AUTHORIZATIONOBJECT,
                                CORRAL_GENERATED_VIEWS.CLIENT,
                                CORRAL_GENERATED_VIEWS.AUTHORIZATIONTYPE,
                                CORRAL_GENERATED_VIEWS.DISCHARGETYPE,
                                CORRAL_GENERATED_VIEWS.DISCHARGEPOINT,
                                CORRAL_GENERATED_VIEWS.ADDRESS,
                                CORRAL_GENERATED_VIEWS.ADDRESS "ADDRESS_2",
                                CORRAL_GENERATED_VIEWS.Wdrschedule_One,
                                CORRAL_GENERATED_VIEWS.Wdrschedule_two,
                                CORRAL_GENERATED_VIEWS.Bceniccode n,
                                CORRAL_GENERATED_VIEWS.Bceniccode n2
                           where AUTHORIZATIONOBJECT.AUTHORIZATIONTYPEID = AUTHORIZATIONTYPE.AUTHTYPEOBJECTID(+)
                             AND AUTHORIZATIONOBJECT.AUTHORIZATIONNUMBER IS NOT NULL
                             AND AUTHORIZATIONOBJECT.APPLICANTCLIENTID = CLIENT.CLIENTID(+)
                             AND AUTHORIZATIONOBJECT.PrimaryBCENICID = n.ObjectId(+)
                             AND AUTHORIZATIONOBJECT.SecondaryBCENICID = n2.ObjectId(+)
                             AND AUTHORIZATIONOBJECT.WDRSchedule1ID = Wdrschedule_One.ObjectId(+)
                             AND AUTHORIZATIONOBJECT.WDRSchedule2ID = Wdrschedule_Two.ObjectId(+)
                             AND AUTHORIZATIONOBJECT.AUTHORIZATIONNUMBER = DISCHARGEPOINT.AUTHAUTHORIZATIONNUMBER(+)
                             AND DISCHARGEPOINT.DISCHARGETYPEID = DISCHARGETYPE.DISCHARGETYPEID(+)
                             AND AUTHORIZATIONOBJECT.MAILINGADDRESSID = ADDRESS.OBJECTID(+)
                             AND AUTHORIZATIONOBJECT.ADDRESSID = ADDRESS_2.OBJECTID(+)
                             AND
                               Wdrschedule_One.ActivityDescription || '' || Wdrschedule_two.ActivityDescription || '' ||
                               Wdrschedule_two.CodeOfPractice = 'Composting Operations'
                             and AUTHORIZATIONOBJECT.STATUS !='Withdrawn'
                           Union
                           Select Distinct To_Number(REGISTRATION.REGAUTHORIZATIONNUMBER) As "Authorization Number", DECODE(AUTHORIZATIONTYPE.AUTHORIZATIONNAME, 'Organic Matter Recycling Regulation', 'Notification') As "Authorization Type", Case When Upper (CLIENT.DoingBusinessAs) Is Not Null Then (Case When Upper (CLIENT.DUP_FORMATTEDNAME) Is Not Null Then Upper (CLIENT.DUP_FORMATTEDNAME) Else InitCap(CLIENT.FIRSTNAME) || ' ' || InitCap(CLIENT.LASTNAME) End ) ||' doing business as ' || Upper (CLIENT.DoingBusinessAs) Else NVL(Upper (CLIENT.DUP_FORMATTEDNAME), InitCap(CLIENT.FIRSTNAME) || ' ' || InitCap(CLIENT.LASTNAME)) End As "Regulated Party", Decode (REGISTRATION.STATE, 'Cancelled', 'Inactive', 'Expired', 'Inactive', 'Active', 'Active') As "Authorization Status", To_Date(CORRAL_GENERATED_VIEWS.REGISTRATION.REGISTRATIONDATE) as "Effective/Issue Date", To_Date(CORRAL_GENERATED_VIEWS.REGISTRATION.AmendmentDate) as "Last Amendment Date", ADDRESS_2.INLINEDISPLAY As "Facility Location", REGISTRATION.LATITUDE As "Latitude", -1.0000000*(REGISTRATION.LONGITUDE) As "Longitude", NULL as "Waste Discharge Regulation", CORRAL_GENERATED_VIEWS.REGISTRATION.OMOPERATIONTYPE as "Operation Type", CORRAL_GENERATED_VIEWS.REGISTRATION.OMLANDBASEDTYPEOFPRODUCTION as "Material Land Applied", CORRAL_GENERATED_VIEWS.REGISTRATION.INTENDEDDATESLANDAPPLICATION as "Intended Dates of Land Application", CORRAL_GENERATED_VIEWS.REGISTRATION.OMDESIGNCAPACITY as "Facility Design Capacity (t/y)", CORRAL_GENERATED_VIEWS.REGISTRATION.OMCOMPOSTFACILITYPRODUCTTYPE as "Type of Compost Produced", Decode (CORRAL_GENERATED_VIEWS.REGISTRATION.YARDWASTE, 'Y', 'Yes', 'N', 'No') as "Yard Waste", Decode (CORRAL_GENERATED_VIEWS.REGISTRATION.BIOSOLIDS, 'Y', 'Yes', 'N', 'No') as "Biosolids", Decode (CORRAL_GENERATED_VIEWS.REGISTRATION.WHEY, 'Y', 'Yes', 'N', 'No') as "Whey", Decode (CORRAL_GENERATED_VIEWS.REGISTRATION.UNTREATUNPROCESSWOODRESIDUALS, 'Y', 'Yes', 'N', 'No') as "Untreated and Unprocessed Wood Residuals", Decode (CORRAL_GENERATED_VIEWS.REGISTRATION.POULTRYCARCASSES, 'Y', 'Yes', 'N', 'No') as "Poultry Carcasses", Decode (CORRAL_GENERATED_VIEWS.REGISTRATION.FISHWASTE, 'Y', 'Yes', 'N', 'No') as "Fish Wastes", Decode (CORRAL_GENERATED_VIEWS.REGISTRATION.FOODWASTE, 'Y', 'Yes', 'N', 'No') as "Food Waste", Decode (CORRAL_GENERATED_VIEWS.REGISTRATION.BREWERYWASTEWINERYWASTE, 'Y', 'Yes', 'N', 'No') as "Brewary Waste/Wine Waste", Decode (CORRAL_GENERATED_VIEWS.REGISTRATION.ANIMALBEDDING, 'Y', 'Yes', 'N', 'No') as "Animal Bedding", Decode (CORRAL_GENERATED_VIEWS.REGISTRATION.DOMESTICSEPTICTANKSLUDGE, 'Y', 'Yes', 'N', 'No') as "Domestic Septic Tank Sludge", Decode (CORRAL_GENERATED_VIEWS.REGISTRATION.HATCHERYWASTE, 'Y', 'Yes', 'N', 'No') as "Hatchery Waste", Decode (CORRAL_GENERATED_VIEWS.REGISTRATION.MANURE, 'Y', 'Yes', 'N', 'No') as "Manure", Decode (CORRAL_GENERATED_VIEWS.REGISTRATION.MILKPROCESSINGWASTE, 'Y', 'Yes', 'N', 'No') as "Milk Processing Waste"
                           From CORRAL_GENERATED_VIEWS.REGISTRATION, CORRAL_GENERATED_VIEWS.REGISTRATION_2 r2, CORRAL_GENERATED_VIEWS.Bceniccode n, CORRAL_GENERATED_VIEWS.Bceniccode n2, CORRAL_GENERATED_VIEWS.AUTHORIZATIONTYPE, CORRAL_GENERATED_VIEWS.CLIENT, CORRAL_GENERATED_VIEWS.DISCHARGEPOINT, CORRAL_GENERATED_VIEWS.DISCHARGETYPE, CORRAL_GENERATED_VIEWS.ADDRESS, CORRAL_GENERATED_VIEWS.ADDRESS ADDRESS_2, CORRAL_GENERATED_VIEWS.Wdrschedule_One, CORRAL_GENERATED_VIEWS.Wdrschedule_two
                           Where r2.PRIMARYBCENICID = n.OBJECTID(+)
                             And r2.SECONDARYBCENICID = n2.OBJECTID(+)
                             And REGISTRATION.AuthorizationTypeID = AUTHORIZATIONTYPE.AUTHTYPEOBJECTID
                             And r2.WDRSCHEDULE1ID = Wdrschedule_One.ObjectId(+)
                             And r2.WDRSCHEDULE2ID = Wdrschedule_Two.ObjectId(+)
                             And REGISTRATION.objectID = r2.OBJECTID
                             And REGISTRATION.APPLICANTCLIENTID = CLIENT.CLIENTID
                             And REGISTRATION.REGAUTHORIZATIONNUMBER = DISCHARGEPOINT.REGAUTHORIZATIONNUMBER(+)
                             And DISCHARGEPOINT.DISCHARGETYPEID = DISCHARGETYPE.DISCHARGETYPEID(+)
                             And REGISTRATION.MAILINGADDRESSID = ADDRESS.OBJECTID(+)
                             And REGISTRATION.ADDRESSID = ADDRESS_2.OBJECTID(+)
                             and AUTHORIZATIONTYPE.AUTHORIZATIONNAME ='Organic Matter Recycling Regulation'
                             and REGISTRATION.STATE !='Withdrawn'`;