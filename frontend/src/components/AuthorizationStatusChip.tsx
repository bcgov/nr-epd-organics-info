import { Chip } from '@mui/material'

interface Props {
  status: string
}

export function AuthorizationStatusChip({ status }: Props) {
  const isActive = status === 'Active'
  return (
    <Chip
      sx={{
        color: '#ffffff',
        backgroundColor: isActive ? '#42814a' : '#9f9d9c',
        display: 'inline-flex',
        height: '40px',
        padding: '0 12px',
        borderRadius: '24px',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      label={status}
    />
  )
}
