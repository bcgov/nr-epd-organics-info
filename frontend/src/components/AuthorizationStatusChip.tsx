import { Chip } from '@mui/material'
import clsx from 'clsx'

import './AuthorizationStatusChip.css'

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
      className={clsx(
        'authorization-status-chip',
        `authorization-status-chip--${size}`,
        isActive && 'authorization-status-chip--active',
      )}
      label={status}
      size={size}
    />
  )
}
