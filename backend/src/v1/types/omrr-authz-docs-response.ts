export interface OmrrAuthzDocsResponse {
  'Authorization Number': number,
  'doc_links'?: OmrrAuthzDocs[]
}
export interface OmrrAuthzDocs{
  'DocumentObjectID': number,
  'Description': string,
  'Publiclyviewable': string
}

export interface omrrAuthzDocsQueryResponse {
  'Authorization Number': number,
  'DocumentObjectID': number,
  'Description': string,
  'Publiclyviewable': string
}
