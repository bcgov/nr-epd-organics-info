import { useNavigate } from 'react-router'
import { Button } from '@mui/material'

import OmrrData from '@/interfaces/omrr'

interface Props {
  item: OmrrData
}

export function ViewFacilityDetailsButton({ item }: Props) {
  const navigate = useNavigate()

  const onClick = (route: string) => {
    // Navigate to the details page, including the item as state
    navigate(route, { state: { data: { ...item } } })
  }

  const { 'Authorization Number': number } = item
  return (
    <Button
      size="large"
      sx={{
        border: '1px solid #053662',
        borderRadius: '4px',
        boxSizing: 'border-box',
        textTransform: 'none',
        color: '#255a90',
        width: {
          xs: '100%',
          sm: 'auto',
        },
      }}
      onClick={() => onClick(`/authorization/${number}`)}
    >
      View Facility Details
    </Button>
  )
}
