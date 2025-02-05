import { Stack } from '@mui/material'

import { InfoSection } from './InfoSection'
import { LearnMoreSection } from './LearnMoreSection'
import { TopSection } from './TopSection'
import { UseThisTool } from './UseThisTool'

export default function Dashboard() {
  return (
    <Stack direction="column" sx={{ marginTop: '4em' }}>
      <TopSection />
      <InfoSection />
      <UseThisTool />
      <LearnMoreSection />
    </Stack>
  )
}
