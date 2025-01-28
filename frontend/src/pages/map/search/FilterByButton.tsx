import { useDispatch } from 'react-redux'
import { Button, Chip } from '@mui/material'
import clsx from 'clsx'

import DropdownButton from '@/components/DropdownButton'
import { FilterByCheckboxGroup } from '@/components/FilterByCheckboxGroup'
import { toggleActiveTool, useActiveTool } from '@/features/map/map-slice'
import { ActiveToolEnum } from '@/constants/constants'
import { useFilters } from '@/features/omrr/omrr-slice'
import { flattenFilters } from '@/features/omrr/omrr-utils'

interface Props {
  isLarge: boolean
}

export function FilterByButton({ isLarge }: Readonly<Props>) {
  const dispatch = useDispatch()
  const filters = useFilters()
  const activeFilterCount = flattenFilters(filters).filter(
    (f) => f.on && !f.disabled,
  ).length
  const isActive = useActiveTool() === ActiveToolEnum.filterBy

  const onClick = () => {
    dispatch(toggleActiveTool(ActiveToolEnum.filterBy))
  }

  const label = (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      Filter
      {activeFilterCount > 0 && (
        <div
          style={{
            position: 'absolute',
            top: isLarge ? '-10px' : '-2px',
            right: isLarge ? '-30px' : '-12px',
            width: isLarge ? '10px' : '6px',
            height: isLarge ? '10px' : '6px',
            backgroundColor:
              'var(--surface-color-primary-dangerButton-default, #ce3e39)',
            borderRadius: '50%',
          }}
        />
      )}
    </div>
  )

  if (isLarge) {
    return (
      <DropdownButton
        id="mapFilterByButton"
        variant="contained"
        color="secondary"
        size="large"
        className={clsx('map-button', 'map-button--large')}
        openClassName="map-button--active"
        dropdownContent={
          <FilterByCheckboxGroup sx={{ gap: '8px', paddingLeft: '8px' }} />
        }
      >
        {label}
      </DropdownButton>
    )
  }

  return (
    <Button
      variant="contained"
      color="secondary"
      size="medium"
      className={clsx('map-button', isActive && 'map-button--active')}
      onClick={onClick}
    >
      {label}
    </Button>
  )
}
