import { Chip } from '@mui/material'

interface Props {
  status: string
  size?: 'medium' | 'small'
}

export function AuthorizationStatusChip({
  status,
  size = 'medium',
}: Readonly<Props>) {
  const isActive = status === 'Active'
  return (
    <Chip
      sx={{
        color: '#ffffff',
        backgroundColor: isActive ? '#42814a' : '#9f9d9c',
        display: 'inline-flex',
        height: size === 'small' ? '24px' : '40px',
        fontSize: size === 'small' ? '14px' : '16px',
        padding: '0 12px',
        borderRadius: '24px',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      label={status}
    />
  )
}
