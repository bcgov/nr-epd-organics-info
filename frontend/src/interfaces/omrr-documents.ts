export interface OmrrAuthzDocs {
  DocumentObjectID: number
  Description: string
  Publiclyviewable: string
}

export interface OmrrAuthzDocsResponse {
  'Authorization Number': number
  doc_links?: OmrrAuthzDocs[]
}
