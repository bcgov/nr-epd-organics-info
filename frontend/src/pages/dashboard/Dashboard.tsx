import { Stack } from '@mui/material'

import { InfoSection } from './InfoSection'
import { LearnMoreSection } from './LearnMoreSection'
import { TopSection } from './TopSection'
import { UseThisTool } from './UseThisTool'
import { HowToUseThisTool } from './HowToUseThisTool'

const VIDEO_URL = 'https://your-video-url-here.com' // You can move this to an environment variable or config file

export default function Dashboard() {
  return (
    <Stack
      direction="column"
      sx={{
        marginTop: '4em',
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
      {VIDEO_URL && <HowToUseThisTool videoUrl={VIDEO_URL} />}
      <LearnMoreSection />
    </Stack>
  )
}
