import { ReactElement, ReactNode } from 'react'
import { Box, Typography } from '@mui/material'
import clsx from 'clsx'

import OmrrData from '@/interfaces/omrr'
import { MatchType, AutocompleteOption } from '@/interfaces/autocomplete-option'

import MarkerIcon from '@/assets/svgs/fa-marker.svg?react'
import NoteIcon from '@/assets/svgs/fa-memo.svg?react'

import './AutocompleteItem.css'

const PostalCodeIcon = (
  <MarkerIcon className="autocomplete-icon" title="Postal code icon" />
)
const PlaceIcon = (
  <MarkerIcon className="autocomplete-icon" title="Place icon" />
)
const FacilityIcon = (
  <NoteIcon className="autocomplete-icon" title="Facility icon" />
)
function getIcon(matchType: MatchType): ReactElement {
  switch (matchType) {
    case 'postalCode':
      return PostalCodeIcon
    case 'place':
      return PlaceIcon
    default:
      return FacilityIcon
  }
}

function getLabel(matchType: MatchType, item: OmrrData | undefined): ReactNode {
  if (matchType === 'postalCode') {
    return 'Postal Code'
  } else if (matchType === 'place') {
    // Perhaps this should be Place as well?
    return 'City'
  }
  if (item) {
    const { 'Authorization Number': number = 0 } = item
    return (
      <span>
        Authorization #: <b>{number}</b>
      </span>
    )
  }
  return 'Authorization:'
}

interface Props {
  option: AutocompleteOption
  className?: string
  [key: string]: any
}

export function AutocompleteItem({
  option,
  className,
  ...rest
}: Readonly<Props>) {
  const { matchType, text, item } = option
  return (
    <Box
      {...rest}
      component="li"
      className={clsx('autocomplete-item', className)}
    >
      {getIcon(matchType)}
      <div className="autocomplete-column">
        <Typography component="div" className="autocomplete-label">
          {getLabel(matchType, item)}
        </Typography>
        <Typography component="div" className="autocomplete-value">
          {text}
        </Typography>
      </div>
    </Box>
  )
}
