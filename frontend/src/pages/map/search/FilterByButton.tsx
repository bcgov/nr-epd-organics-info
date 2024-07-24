import clsx from 'clsx'

import DropdownButton from '@/components/DropdownButton'
import { FilterByCheckboxGroup } from '@/components/FilterByCheckboxGroup'
import { Button } from '@mui/material'
import { useDispatch } from 'react-redux'
import {
  setBottomDrawerContent,
  useBottomDrawerContentType,
} from '@/features/map/map-slice'
import { BottomDrawerContentEnum } from '@/constants/constants'

interface Props {
  isLarge: boolean
}

export function FilterByButton({ isLarge }: Readonly<Props>) {
  const dispatch = useDispatch()
  // Bottom drawer only
  const isActive =
    useBottomDrawerContentType() === BottomDrawerContentEnum.filterBy

  const onClick = () => {
    dispatch(
      setBottomDrawerContent(
        isActive ? undefined : BottomDrawerContentEnum.filterBy,
      ),
    )
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
