export type SearchByType = 'all' | 'active' | 'inactive'

export const SEARCH_BY_ALL = 'all'
export const SEARCH_BY_ACTIVE = 'active'
export const SEARCH_BY_INACTIVE = 'inactive'

export interface OmrrFilter {
  value: string
  label: string
  on: boolean
  disabled?: boolean
  field: string
}
