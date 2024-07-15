import OmrrData from './omrr'

export type MatchType = 'postalCode' | 'name' | 'city'

export interface SearchOption {
  id: string
  text: string
  matchType: MatchType
  item?: OmrrData
}
