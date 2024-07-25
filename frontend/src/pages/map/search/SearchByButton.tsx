import { useDispatch } from 'react-redux'
import clsx from 'clsx'
import { Button } from '@mui/material'

import DropdownButton from '@/components/DropdownButton'
import { SearchByRadioGroup } from '@/components/SearchByRadioGroup'
import { BottomDrawerContentEnum } from '@/constants/constants'
import { useSearchBy } from '@/features/omrr/omrr-slice'
import {
  setBottomDrawerContent,
  useBottomDrawerContentType,
} from '@/features/map/map-slice'

interface Props {
  isLarge: boolean
}

export function SearchByButton({ isLarge }: Readonly<Props>) {
  const dispatch = useDispatch()
  const searchBy = useSearchBy()
  // Bottom drawer only
  const isActive =
    useBottomDrawerContentType() === BottomDrawerContentEnum.searchBy

  const onClick = () => {
    dispatch(
      setBottomDrawerContent(
        isActive ? undefined : BottomDrawerContentEnum.searchBy,
      ),
    )
  }

  const label = (
    <span>
      Search By: <b style={{ textTransform: 'capitalize' }}>{searchBy}</b>
    </span>
  )
  const content = (
    <SearchByRadioGroup
      name="map-search-by-group"
      row={false}
      sx={{ gap: '0.25rem', paddingLeft: '0.5rem' }}
    />
  )

  if (isLarge) {
    return (
      <DropdownButton
        id="mapSearchByButton"
        variant="contained"
        color="secondary"
        size="medium"
        className="map-button map-button--medium"
        openClassName="map-button--active"
        dropdownContent={content}
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
      className={clsx(
        'map-button map-button--medium',
        isActive && 'map-button--active',
      )}
      onClick={onClick}
      aria-label="Search By"
    >
      {label}
    </Button>
  )
}
