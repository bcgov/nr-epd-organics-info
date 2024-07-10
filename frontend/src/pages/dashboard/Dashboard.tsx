import { Stack } from '@mui/system'

import { InfoSection } from './InfoSection'
import { LearnMoreSection } from './LearnMoreSection'
import { TopSection } from './TopSection'

export default function Dashboard() {
  return (
    <Stack direction="column" sx={{ marginTop: '4em' }}>
      <TopSection />
      <InfoSection />
      <LearnMoreSection />
    </Stack>
  )
}
