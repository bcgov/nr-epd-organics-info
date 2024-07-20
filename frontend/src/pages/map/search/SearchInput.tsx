import { MouseEventHandler } from 'react'
import { IconButton, InputAdornment, TextField } from '@mui/material'
import { TextFieldProps } from '@mui/material/TextField/TextField'
import clsx from 'clsx'

import SearchIcon from '@/assets/svgs/fa-search.svg?react'
import CloseIcon from '@/assets/svgs/fa-close.svg?react'

import './SearchInput.css'

const styles = {
  width: {
    xxl: '632px',
    xl: '542px',
    lg: '452px',
  },
}

interface Props extends Omit<TextFieldProps, 'variant'> {
  onClear?: MouseEventHandler<HTMLButtonElement>
  showStartAdornment?: boolean
}

export function SearchInput({
  value,
  onChange,
  onClear,
  showStartAdornment = true,
  InputProps,
  sx,
  placeholder = 'Search',
  className,
  size,
  ...rest
}: Readonly<Props>) {
  return (
    <TextField
      {...rest}
      value={value}
      onChange={onChange}
      InputProps={{
        ...InputProps,
        startAdornment: showStartAdornment ? (
          <InputAdornment position="start">
            <SearchIcon
              title="Search icon"
              className="search-input-icon search-input-icon--search"
            />
          </InputAdornment>
        ) : null,
        endAdornment: value ? (
          <InputAdornment position="end">
            <IconButton
              onClick={onClear}
              title="Clear"
              className="search-input-clear-button"
            >
              <CloseIcon className="search-input-icon search-input-icon--close" />
            </IconButton>
          </InputAdornment>
        ) : null,
      }}
      placeholder={placeholder}
      variant="outlined"
      className={clsx(
        'search-input',
        size && `search-input--${size}`,
        className,
      )}
      sx={{
        ...styles,
        ...sx,
      }}
    />
  )
}
