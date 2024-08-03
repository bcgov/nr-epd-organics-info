import { ChangeEvent } from 'react'
import { Button, Dialog, Stack } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

import { AutocompleteOption } from '@/interfaces/autocomplete-option'
import { SearchInput } from '@/components/SearchInput'
import { useAutocompleteSearch } from '../hooks/useAutocompleteSearch'
import { AutocompleteItem } from './AutocompleteItem'

import ChevronLeft from '@/assets/svgs/fa-chevron-left.svg?react'

import './SearchDialog.css'
import clsx from 'clsx'

interface Props {
  onClose: () => void
}

export function SearchDialog({ onClose }: Readonly<Props>) {
  const theme = useTheme()
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'))
  const { value, options, performSearch, selectOption } =
    useAutocompleteSearch()

  const onTextChange = (ev: ChangeEvent<HTMLInputElement>) => {
    performSearch(ev.target.value)
  }

  const onOptionSelect = (option: AutocompleteOption) => {
    selectOption(option)
    onClose()
  }

  const onClear = () => {
    performSearch('')
  }

  return (
    <Dialog
      open={true}
      onClose={onClose}
      className={clsx(
        'search-dialog',
        !isSmall && 'search-dialog--fixed-size',
        isSmall && 'search-dialog--full-size',
      )}
    >
      <Stack direction="row" className="search-dialog-titlebar">
        <Button
          title="Back to the map"
          onClick={onClose}
          variant="outlined"
          size="small"
          className="search-dialog-back-button"
        >
          <ChevronLeft className="search-dialog-back-icon" />
        </Button>
        <SearchInput
          value={value}
          onChange={onTextChange}
          showSearchIcon={!value}
          onClear={onClear}
          size="small"
          className="search-dialog-input"
        />
      </Stack>
      <ul className="search-dialog-list">
        {options.map((option: AutocompleteOption) => {
          return (
            <AutocompleteItem
              key={`SearchDialogOption-${option.id}`}
              option={option}
              onClick={() => onOptionSelect(option)}
            />
          )
        })}
      </ul>
    </Dialog>
  )
}
