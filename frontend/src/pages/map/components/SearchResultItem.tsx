import { ReactElement, ReactNode } from 'react'
import { Box, Typography } from '@mui/material'
import clsx from 'clsx'

import OmrrData from '@/interfaces/omrr'
import { MatchType, SearchOption } from '@/interfaces/search-option'

import MarkerIcon from '@/assets/svgs/fa-marker.svg?react'
import NoteIcon from '@/assets/svgs/fa-memo.svg?react'

import './SearchResultItem.css'

const PostalCodeIcon = (
  <MarkerIcon className="search-result-icon" title="Postal code icon" />
)
const PlaceIcon = (
  <MarkerIcon className="search-result-icon" title="Place icon" />
)
const FacilityIcon = (
  <NoteIcon className="search-result-icon" title="Facility icon" />
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
        Authorization #: <u>{number}</u>
      </span>
    )
  }
  return 'Authorization:'
}

interface Props {
  option: SearchOption
  className?: string
  [key: string]: any
}

export function SearchResultItem({
  option,
  className,
  ...rest
}: Readonly<Props>) {
  const { matchType, text, item } = option
  return (
    <Box
      {...rest}
      component="li"
      className={clsx('search-result-item', className)}
    >
      {getIcon(matchType)}
      <div className="search-result-column">
        <Typography component="div" className="search-result-label">
          {getLabel(matchType, item)}
        </Typography>
        <Typography component="div" className="search-result-value">
          {text}
        </Typography>
      </div>
    </Box>
  )
}
