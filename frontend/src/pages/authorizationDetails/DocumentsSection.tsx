import { Link, Stack, Typography } from '@mui/material'
import clsx from 'clsx'

import { env } from '@/env'
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
  // When the documents can be downloaded - change to a link
  const canDownload = env.VITE_AMS_DOCS_FLAG === 'true'
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
          <div className="documents-table-cell documents-table-cell--no-data">
            There are no documents to display.
          </div>
        )}
        {documents.map((doc: OmrrAuthzDocs) => (
          <Link
            key={`DocumentRow-${doc.DocumentObjectID}`}
            className={clsx(
              'documents-table-cell',
              canDownload && 'documents-table-cell--link',
            )}
            href={
              env.VITE_AMS_URL +
              'download.aspx?PosseObjectId=' +
              doc.DocumentObjectID
            }
            target="_blank"
            rel={canDownload ? 'noopener noreferrer' : ''}
          >
            {doc.Description}
          </Link>
        ))}
      </Stack>
    </Stack>
  )
}
