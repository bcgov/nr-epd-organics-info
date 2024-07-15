import { ReactElement, ReactNode } from 'react'
import { Box, Typography } from '@mui/material'
import clsx from 'clsx'

import OmrrData from '@/interfaces/omrr'
import { MatchType, SearchOption } from '@/interfaces/search-option'

import MarkerIcon from '@/assets/svgs/fa-marker.svg?react'
import NoteIcon from '@/assets/svgs/fa-memo.svg?react'

import './SearchResultItem.css'

function getIcon(matchType: MatchType): ReactElement {
  if (matchType === 'postalCode' || matchType === 'city') {
    return <MarkerIcon className="search-result-icon" />
  }
  return <NoteIcon className="search-result-icon" />
}

function getLabel(matchType: MatchType, item: OmrrData | undefined): ReactNode {
  if (matchType === 'postalCode') {
    return 'Postal Code'
  } else if (matchType === 'city') {
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

export function SearchResultItem({ option, className, ...rest }: Props) {
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
