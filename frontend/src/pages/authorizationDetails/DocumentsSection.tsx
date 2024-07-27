import { Stack, Typography } from '@mui/material'

import {
  useDocumentsStatus,
  useFindAuthorizationDocuments,
} from '@/features/omrr/documents-slice'
import OmrrData from '@/interfaces/omrr'
import { OmrrAuthzDocs } from '@/interfaces/omrr-documents'

import './DocumentsSection.css'

interface Props {
  item: OmrrData
}

export function DocumentsSection({ item }: Readonly<Props>) {
  const status = useDocumentsStatus()
  const documents = useFindAuthorizationDocuments(item['Authorization Number'])
  if (status !== 'succeeded' || !Array.isArray(documents)) {
    return null
  }

  const count = documents.length
  return (
    <Stack
      direction="column"
      sx={{
        padding: {
          xs: '24px 16px 32px',
          md: '40px 24px 48px',
        },
      }}
      className="details-section"
    >
      <Typography fontWeight={700} color="#000" fontSize="24px">
        Documents
      </Typography>
      <Stack className="documents-table" direction="column">
        <div className="documents-table-cell documents-table-cell--header">
          File Description
        </div>
        {count === 0 && (
          <div className="documents-table-cell">
            There are no documents to display.
          </div>
        )}
        {documents.map((doc: OmrrAuthzDocs) => (
          <div
            key={`DocumentRow-${doc.DocumentObjectID}`}
            className="documents-table-cell document-table-link"
          >
            {doc.Description}
          </div>
        ))}
      </Stack>
    </Stack>
  )
}
