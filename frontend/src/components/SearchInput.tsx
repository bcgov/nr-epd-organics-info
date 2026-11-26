import { MouseEventHandler } from 'react'
import { IconButton, InputAdornment, TextField, TextFieldProps } from '@mui/material'
import clsx from 'clsx'

import { SEARCH_PLACEHOLDER } from '@/constants/constants'
import { LocationIconButton } from './LocationIconButton'

import SearchIcon from '@/assets/svgs/fa-search.svg?react'
import CloseIcon from '@/assets/svgs/fa-close.svg?react'

import './SearchInput.css'

interface Props extends Omit<TextFieldProps, 'variant'> {
  showSearchIcon?: boolean
  showClearIcon?: boolean
  onClear?: MouseEventHandler<HTMLButtonElement>
  showLocationIcon?: boolean
}

export function SearchInput({
  value,
  onChange,
  showSearchIcon = true,
  showClearIcon = true,
  onClear,
  showLocationIcon = false,
  slotProps,
  placeholder = SEARCH_PLACEHOLDER,
  className,
  size,
  ...rest
}: Readonly<Props>) {
  const startAdornment = showSearchIcon ? (
    <InputAdornment position="start">
      <SearchIcon
        title="Search icon"
        className="search-input-icon search-input-icon--search"
      />
    </InputAdornment>
  ) : null

  const endAdornment =
    showClearIcon || showLocationIcon ? (
      <InputAdornment position="end">
        {showClearIcon && value ? (
          <IconButton
            onClick={onClear}
            title="Clear"
            className="search-input-clear-button"
          >
            <CloseIcon className="search-input-icon search-input-icon--close" />
          </IconButton>
        ) : null}
        {showLocationIcon ? <LocationIconButton /> : null}
      </InputAdornment>
    ) : null

  return (
    <TextField
      {...rest}
      value={value}
      onChange={onChange}
      slotProps={{
        ...slotProps,
        input: {
          ...(typeof slotProps?.input === 'object' ? slotProps.input : undefined),
          startAdornment,
          endAdornment,
        },
      }}
      placeholder={placeholder}
      variant="outlined"
      className={clsx(
        'search-input',
        size && `search-input--${size}`,
        className,
      )}
    />
  )
}
