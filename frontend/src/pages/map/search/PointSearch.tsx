import { useDispatch } from 'react-redux'
import { Button, Slider, Typography, TextField } from '@mui/material'
import clsx from 'clsx'

import DropdownButton from '@/components/DropdownButton'
import { MIN_CIRCLE_RADIUS } from '@/constants/constants'
import {
  clearActiveTool,
  toggleActiveTool,
  useActiveTool,
} from '@/features/map/map-slice'
import {
  resetPointFilter,
  setPointFilterRadius,
  usePointFilterRadius,
  usePointFilterActive,
  usePointFilterFinished,
  setPointFilterFinished,
  setPointFilterUnfinished,
} from '@/features/omrr/omrr-slice'
import { formatDistance } from '@/utils/utils'
import { ActiveToolEnum } from '@/constants/constants'

import CloseIcon from '@/assets/svgs/fa-close.svg?react'
import CheckIcon from '@/assets/svgs/fa-check.svg?react'

interface Props {
  isSmall?: boolean
  className?: string
  showControls?: boolean
}

const styles = {
  sliderContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
  },
  sliderWrapper: {
    flex: 1,
  },
  labelContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
  },
  textField: {
    marginTop: '-10px',
    '& input[type=number]': {
      MozAppearance: 'textfield',
    },
    '& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button':
      {
        WebkitAppearance: 'none',
      },
  },
  okButton: { marginTop: '-10px' },
  input: {
    textAlign: 'right',
    paddingRight: '2px',
    paddingLeft: '2px',
    paddingTop: '2px',
    paddingBottom: '2px',
  },
} as const

export function PointSearch({
  isSmall = false,
  className,
  showControls = true,
}: Readonly<Props>) {
  const dispatch = useDispatch()
  const radius = usePointFilterRadius()
  const activeTool = useActiveTool()
  const isDrawing = activeTool === ActiveToolEnum.pointSearch
  const isFilterActive = usePointFilterActive()
  const finished = usePointFilterFinished()

  const onCancel = () => {
    dispatch(resetPointFilter())
    dispatch(clearActiveTool())
    dispatch(setPointFilterUnfinished())
  }

  const onFinish = () => {
    const mapContainer = document.querySelector('.map-container')
    if (mapContainer) {
      mapContainer.classList.remove('crosshairs-cursor')
    }
    dispatch(setPointFilterFinished())
  }

  const onRadiusChange = (_ev: any, value: number | number[]) => {
    const newRadius = Math.max(
      Array.isArray(value) ? value[0] : value,
      MIN_CIRCLE_RADIUS,
    )
    dispatch(setPointFilterRadius(newRadius))
  }

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value =
      event.target.value === '' ? 1 : parseInt(event.target.value, 10)
    if (!isNaN(value)) {
      const newRadius = Math.min(
        Math.max(value * 1000, MIN_CIRCLE_RADIUS),
        400000,
      )
      dispatch(setPointFilterRadius(newRadius))
    }
  }

  const sliderBox = (
    <div className="point-search-slider-content">
      {isSmall && (
        <Typography className="point-search-slider-text">
          Set Radius:
        </Typography>
      )}
      <div style={styles.sliderContainer}>
        <div style={styles.sliderWrapper}>
          <Slider
            className={clsx(
              'point-search-slider',
              isSmall && 'point-search-slider--shrink',
            )}
            aria-label="Search radius"
            valueLabelDisplay="off"
            min={MIN_CIRCLE_RADIUS}
            max={400000}
            step={MIN_CIRCLE_RADIUS}
            defaultValue={MIN_CIRCLE_RADIUS}
            value={radius}
            onChange={onRadiusChange}
          />
          <div style={styles.labelContainer}>
            <Typography variant="caption">1 km</Typography>
            <Typography variant="caption">400 km</Typography>
          </div>
        </div>
        <TextField
          className="point-search-input"
          size="small"
          type="number"
          sx={styles.textField}
          value={Math.round(radius / 1000)}
          onChange={onInputChange}
          InputProps={{
            endAdornment: <Typography variant="caption">km</Typography>,
            inputProps: {
              min: 1,
              max: 400,
              inputMode: 'numeric',
              style: styles.input,
            },
          }}
        />
        {isSmall && (
          <Button
            color="primary"
            variant="contained"
            size="small"
            onClick={onFinish}
            disabled={!isDrawing || !isFilterActive || finished}
            startIcon={<CheckIcon className="point-ok-icon" />}
            sx={{ ml: 1, ...styles.okButton }}
          >
            OK
          </Button>
        )}
      </div>
    </div>
  )

  return isSmall ? (
    sliderBox
  ) : (
    <div className={clsx('point-search', className)}>
      {showControls && (
        <>
          <Button
            color="primary"
            variant="contained"
            size="medium"
            onClick={onCancel}
            startIcon={<CloseIcon className="point-cancel-icon" />}
          >
            Cancel
          </Button>
          <DropdownButton
            id="pointSearchSetRadiusButton"
            color="primary"
            variant="contained"
            size="medium"
            menuClassName="point-search-menu"
            dropdownContent={sliderBox}
            // disabled={finished}
          >
            Set Radius
          </DropdownButton>
          <Button
            color="primary"
            variant="contained"
            size="medium"
            onClick={onFinish}
            disabled={!isDrawing || !isFilterActive || finished}
            startIcon={<CheckIcon className="point-ok-icon" />}
          >
            OK
          </Button>
        </>
      )}
    </div>
  )
}
