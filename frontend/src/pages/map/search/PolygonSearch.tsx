import { useDispatch } from 'react-redux'
import { Button } from '@mui/material'
import clsx from 'clsx'

import { clearActiveTool } from '@/features/map/map-slice'
import {
  clearShapeFilters,
  setPolygonFilter,
  usePolygonFilter,
} from '@/features/omrr/omrr-slice'

import CloseIcon from '@/assets/svgs/fa-close.svg?react'
import DeleteIcon from '@/assets/svgs/fa-trash.svg?react'
import CheckIcon from '@/assets/svgs/fa-check.svg?react'

interface Props {
  isSmall?: boolean
  className?: string
}

export function PolygonSearch({ isSmall = false, className }: Readonly<Props>) {
  const dispatch = useDispatch()
  const { finished = false, positions = [] } = usePolygonFilter() ?? {}

  const onCancel = () => {
    dispatch(clearActiveTool())
    dispatch(clearShapeFilters())
  }

  const onDelete = () => {
    if (finished) {
      dispatch(setPolygonFilter({ positions: [], finished: false }))
    } else {
      const newPositions = [...positions]
      newPositions.pop()
      dispatch(setPolygonFilter({ positions: newPositions, finished }))
    }
  }

  const onFinish = () => {
    dispatch(setPolygonFilter({ positions, finished: true }))
  }

  return (
    <div className={clsx('polygon-search', className)}>
      {!isSmall && (
        <Button
          color="primary"
          variant="contained"
          size="medium"
          onClick={onCancel}
          startIcon={<CloseIcon className="polygon-cancel-icon" />}
        >
          Cancel
        </Button>
      )}
      <Button
        color="primary"
        variant="contained"
        size="medium"
        disabled={positions.length === 0}
        onClick={onDelete}
        startIcon={<DeleteIcon className="polygon-delete-icon" />}
      >
        {finished ? 'Delete Shape' : 'Delete Last Point'}
      </Button>
      <Button
        color="primary"
        variant="contained"
        size="medium"
        disabled={finished || positions.length < 3}
        onClick={onFinish}
        startIcon={<CheckIcon className="polygon-finish-icon" />}
      >
        Finish Shape
      </Button>
    </div>
  )
}
