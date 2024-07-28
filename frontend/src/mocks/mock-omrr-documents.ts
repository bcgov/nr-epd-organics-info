import { OmrrAuthzDocsResponse } from '@/interfaces/omrr-documents'

export const mockOmrrDocuments: OmrrAuthzDocsResponse[] = [
  {
    'Authorization Number': 108485,
    doc_links: [
      {
        DocumentObjectID: 1,
        Description: 'test-file.pdf',
        Publiclyviewable: '',
      },
      {
        DocumentObjectID: 2,
        Description: 'sample-file.pdf',
        Publiclyviewable: '',
      },
    ],
  },
  {
    'Authorization Number': 11123,
    doc_links: [],
  },
]
