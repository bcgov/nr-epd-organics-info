import { Autocomplete } from '@mui/material'

import { AutocompleteOption } from '@/interfaces/autocomplete-option'
import { AutocompleteItem } from './AutocompleteItem'
import { useAutocompleteSearch } from '../hooks/useAutocompleteSearch'
import { SearchInput } from './SearchInput'

import './SearchAutocomplete.css'

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
        return <SearchInput {...params} value={value} onClear={onClear} />
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
