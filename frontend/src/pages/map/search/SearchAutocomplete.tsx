import { Autocomplete } from '@mui/material'

import { AutocompleteOption } from '@/interfaces/autocomplete-option'
import { SearchInput } from '@/components/SearchInput'
import { AutocompleteItem } from './AutocompleteItem'
import { useAutocompleteSearch } from '../hooks/useAutocompleteSearch'

import './SearchAutocomplete.css'

const searchInputStyles = {
  width: {
    xxl: '632px',
    xl: '542px',
    lg: '452px',
  },
}

const componentProps = {
  popper: {
    modifiers: [
      {
        name: 'offset',
        options: { offset: [0, 6] },
      },
    ],
  },
}

export function SearchAutocomplete() {
  const { loading, value, options, performSearch, selectOption } =
    useAutocompleteSearch()

  const onTextChange = (_ev: any, newValue: string) => {
    performSearch(newValue)
  }

  const onClear = () => {
    performSearch('')
  }

  const onAutocompleteChange = (
    _ev: any,
    value: string | AutocompleteOption | null,
  ) => {
    // When the user selects an option from the autocomplete list
    selectOption(value)
  }

  return (
    <Autocomplete
      value={value}
      sx={{
        border: '1px solid #295286',
        borderRadius: '6px',
        color: '#295286',
        '& svg path': {
          fill: '#295286',
        },
        input: {
          color: '#295286',
        },
      }}
      options={options}
      loading={loading}
      onInputChange={onTextChange}
      onChange={onAutocompleteChange}
      filterOptions={(options: AutocompleteOption[]) => options}
      getOptionKey={(option: string | AutocompleteOption) =>
        typeof option === 'string' ? option : option.id
      }
      getOptionLabel={(option: string | AutocompleteOption) =>
        typeof option === 'string' ? option : option.text
      }
      freeSolo
      renderInput={(params) => {
        return (
          <SearchInput
            {...params}
            value={value}
            onClear={onClear}
            sx={searchInputStyles}
          />
        )
      }}
      renderOption={(props, option) => {
        const { key, ...optionProps } = props
        return <AutocompleteItem key={key} option={option} {...optionProps} />
      }}
      componentsProps={componentProps}
      className="search-autocomplete"
    />
  )
}
