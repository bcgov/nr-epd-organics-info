import { Stack, Typography } from '@mui/material'

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
        Authorized compost and biosolid facilities in B.C.
      </Typography>
    </Stack>
  )
}
