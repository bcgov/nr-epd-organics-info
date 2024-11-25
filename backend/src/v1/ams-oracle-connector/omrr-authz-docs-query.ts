export const OMRR_AUTHZ_DOCS_QUERY = `SELECT AUTHORIZATIONOBJECT.AuthorizationNumber as "Authorization Number",
                                  EM_AuthorizationDocuments.DocumentObjectID AS "DocumentObjectID",
                                  CASE
                                      WHEN EM_AuthorizationDocuments.Description is not null
                                          THEN EM_AuthorizationDocuments.Description
                                      ELSE EM_AuthorizationDocuments.Filename
                                      END                                 As "Description",
                                      EM_AuthorizationDocuments.Filename AS "Filename",
                                  EM_AuthorizationDocuments.Publiclyviewable AS "Publiclyviewable"
                           FROM corral_generated_views.authorizationobject,
                                corral_generated_views.Em_Authorizationdocuments
                           where authorizationobject.objectID = Em_Authorizationdocuments.authorizationobjectID
                           UNION ALL
                           SELECT REGISTRATION.REGAUTHORIZATIONNUMBER as "Authorization Number",
                                  EM_AuthorizationDocuments.DocumentObjectID AS "DocumentObjectID",
                                  CASE
                                      WHEN EM_AuthorizationDocuments.Description is not null
                                          THEN EM_AuthorizationDocuments.Description
                                      ELSE EM_AuthorizationDocuments.Filename
                                      END                             As "Description",
                                    EM_AuthorizationDocuments.Filename AS "Filename",
                                  EM_AuthorizationDocuments.Publiclyviewable AS "Publiclyviewable"
                           FROM CORRAL_GENERATED_VIEWS.REGISTRATION,
                                corral_generated_views.Em_Authorizationdocuments
                           where REGISTRATION.ObjectID = Em_Authorizationdocuments.authorizationobjectID`;
