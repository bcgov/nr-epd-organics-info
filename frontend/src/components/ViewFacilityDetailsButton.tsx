import { useNavigate } from 'react-router'
import { Button } from '@mui/material'

import OmrrData from '@/interfaces/omrr'

interface Props {
  item: OmrrData
}

export function ViewFacilityDetailsButton({ item }: Readonly<Props>) {
  const navigate = useNavigate()

  const onClick = (route: string) => {
    // Navigate to the details page, including the item as state
    navigate(route, {
      state: { data: { ...item }, previousPath: location.pathname },
    })
  }

  const { 'Authorization Number': number } = item
  return (
    <Button
      color="primary"
      variant="outlined"
      size="medium"
      sx={{
        whiteSpace: 'nowrap',
        width: {
          xs: '100%',
          sm: 'auto',
        },
      }}
      onClick={() => onClick(`/authorization/${number}`)}
      className="button--square-padding"
    >
      View Facility Details
    </Button>
  )
}
