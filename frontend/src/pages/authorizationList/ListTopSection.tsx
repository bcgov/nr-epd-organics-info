import { Stack, Typography } from '@mui/material'
import { ListSearchSection } from './ListSearchSection'

import './ListTopSection.css'

export function ListTopSection() {
  return (
    <Stack
      direction="column"
      className="list-top-section"
      gap="16px"
      component="section"
      sx={{
        padding: {
          xs: '32px 24px',
          md: '32px 76px',
        },
      }}
    >
      <Typography
        variant="h1"
        component="h1"
        fontWeight="700"
        sx={{
          fontSize: {
            xs: '36px',
            md: '48px',
          },
          margin: 0,
        }}
      >
        Search Authorizations
      </Typography>
      <Typography variant="h6" component="h6" fontSize="18px">
        Authorized land application sites and compost facilities in B.C.
      </Typography>
      <Stack sx={{ display: { xs: 'none', md: 'block' }, marginTop: '24px' }}>
        <ListSearchSection isMobile={false} />
      </Stack>
    </Stack>
  )
}
