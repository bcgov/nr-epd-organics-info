import { useDispatch } from 'react-redux'
import { Button } from '@mui/material'
import clsx from 'clsx'

import DropdownButton from '@/components/DropdownButton'
import { FilterByCheckboxGroup } from '@/components/FilterByCheckboxGroup'
import { toggleActiveTool, useActiveTool } from '@/features/map/map-slice'
import { ActiveToolEnum } from '@/constants/constants'

interface Props {
  isLarge: boolean
}

export function FilterByButton({ isLarge }: Readonly<Props>) {
  const dispatch = useDispatch()
  // Small screens/bottom drawer only
  const isActive = useActiveTool() === ActiveToolEnum.filterBy

  // Small screens/bottom drawer only
  const onClick = () => {
    dispatch(toggleActiveTool(ActiveToolEnum.filterBy))
  }

  if (isLarge) {
    return (
      <DropdownButton
        id="mapFilterByButton"
        variant="contained"
        color="secondary"
        size="medium"
        className="map-button map-button--medium"
        openClassName="map-button--active"
        dropdownContent={
          <FilterByCheckboxGroup sx={{ gap: '8px', paddingLeft: '8px' }} />
        }
      >
        Filter by Facility Type
      </DropdownButton>
    )
  }

  return (
    <Button
      variant="contained"
      color="secondary"
      size="medium"
      className={clsx(
        'map-button map-button--medium',
        isActive && 'map-button--active',
      )}
      onClick={onClick}
    >
      Filter by Facility Type
    </Button>
  )
}
