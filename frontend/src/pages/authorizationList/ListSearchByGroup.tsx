import { FormControl, FormLabel } from '@mui/material'

import { SearchByRadioGroup } from '@/components/SearchByRadioGroup'

export function ListSearchByGroup() {
  return (
    <FormControl
      sx={{
        alignItems: {
          xs: 'flex-start',
          md: 'center',
        },
        flexDirection: {
          xs: 'column',
          md: 'row',
        },
        gap: '0 10px',
      }}
    >
      <FormLabel
        id="listSearchByRadioGroupLabel"
        sx={{
          color: '#000',
        }}
      >
        Search by:
      </FormLabel>
      <SearchByRadioGroup
        name="list-search-by-group"
        aria-labelledby="listSearchByRadioGroupLabel"
        sx={{ gap: '16px' }}
      />
    </FormControl>
  )
}
