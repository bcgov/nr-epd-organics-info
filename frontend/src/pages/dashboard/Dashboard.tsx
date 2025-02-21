import { Stack } from '@mui/material'

import { InfoSection } from './InfoSection'
import { LearnMoreSection } from './LearnMoreSection'
import { TopSection } from './TopSection'
import { UseThisTool } from './UseThisTool'
import { HowToUseThisTool } from './HowToUseThisTool'

/**
 * If there is a video url specified here then the video will
 * be shown on the dashboard
 */

// const VIDEO_URL = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' // You can move this to an environment variable or config file
const VIDEO_URL = '' // You can move this to an environment variable or config file

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
      {VIDEO_URL && <HowToUseThisTool videoUrl={VIDEO_URL} />}
      <LearnMoreSection />
    </Stack>
  )
}
