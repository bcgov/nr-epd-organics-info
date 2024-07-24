import { ChangeEvent } from 'react'
import { Button, Dialog, Stack } from '@mui/material'

import { AutocompleteOption } from '@/interfaces/autocomplete-option'
import { SearchInput } from '@/components/SearchInput'
import { useAutocompleteSearch } from '../hooks/useAutocompleteSearch'
import { AutocompleteItem } from './AutocompleteItem'

import ChevronLeft from '@/assets/svgs/fa-chevron-left.svg?react'

import './SearchDialog.css'

interface Props {
  onClose: () => void
}

export function SearchDialog({ onClose }: Readonly<Props>) {
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
    <Dialog open={true} onClose={onClose} className="search-dialog">
      <Stack direction="row" className="search-dialog-titlebar">
        <Button
          title="Back to the map"
          onClick={onClose}
          variant="outlined"
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
