import { Stack } from '@mui/material'

import { InfoSection } from './InfoSection'
import { LearnMoreSection } from './LearnMoreSection'
import { TopSection } from './TopSection'
import { UseThisTool } from './UseThisTool'

export default function Dashboard() {
  return (
    <Stack
      direction="column"
      sx={{
        '& > section': {
          // Target all direct section children
          paddingTop: {
            xs: '24px',
            md: '40px',
          },
          paddingBottom: {
            xs: '24px',
            md: '40px',
          },
        },
      }}
    >
      <TopSection />
      <InfoSection />
      <UseThisTool />
      <LearnMoreSection />
    </Stack>
  )
}
