import React from 'react'
import { useSelector } from 'react-redux'
import { Typography } from '@mui/material'

import { selectLastModified } from '@/features/omrr/omrr-slice'

export function ListLastUpdated() {
  const lastModified = useSelector(selectLastModified)

  return (
    <div className="list-last-updated">
      <Typography className="list-last-updated-text">
        Data last updated : {lastModified}
      </Typography>
    </div>
  )
}

export default ListLastUpdated
