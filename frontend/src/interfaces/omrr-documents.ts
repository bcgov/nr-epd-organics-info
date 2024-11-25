export interface OmrrAuthzDocs {
  DocumentObjectID: number
  Description: string
  Publiclyviewable: string,
  Filename?: string
}

export interface OmrrAuthzDocsResponse {
  'Authorization Number': number
  doc_links?: OmrrAuthzDocs[]
}
