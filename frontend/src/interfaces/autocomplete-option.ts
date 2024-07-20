import OmrrData from './omrr'
import { Place } from './place'

export type MatchType = 'name' | 'place' | 'postalCode'

export interface AutocompleteOption {
  id: string
  text: string
  matchType: MatchType
  item?: OmrrData
  place?: Place
}
