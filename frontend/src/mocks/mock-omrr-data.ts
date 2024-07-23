import OmrrData from '@/interfaces/omrr'
import { SEARCH_BY_ACTIVE, SEARCH_BY_INACTIVE } from '@/interfaces/types'
import { extractPostalCode } from '@/utils/utils'

export const mockOmrrData: OmrrData[] = [
  {
    Manure: false,
    'Untreated and Unprocessed Wood Residuals': false,
    'Domestic Septic Tank Sludge': false,
    Latitude: 49.028961,
    'Yard Waste': false,
    'Fish Wastes': false,
    Whey: false,
    'Animal Bedding': false,
    Biosolids: false,
    'Hatchery Waste': false,
    'Last Amendment Date': '1996-04-11',
    'Authorization Status': 'Inactive',
    'Authorization Number': 11123,
    'Milk Processing Waste': false,
    'Poultry Carcasses': false,
    'Authorization Type': 'Notification',
    'Effective/Issue Date': '2002-02-04',
    Longitude: -123.805217,
    'Facility Location': 'LOT 10, OYSTER DISTRICT',
    'Brewery Waste/Wine Waste': false,
    'Regulated Party': 'WYNDLOW WOOD WASTE REDUCTION INC.',
    'Food Waste': false,
  },
  {
    Latitude: 49.019078,
    'Last Amendment Date': '1995-02-01',
    'Authorization Status': 'Inactive',
    'Authorization Number': 11475,
    'Waste Discharge Regulation': 'Schedule 2 - Composting Operations',
    'Authorization Type': 'Permit',
    'Effective/Issue Date': '1992-11-19',
    Longitude: -122.455984,
    'Facility Location': 'ABBOTSFORD, 27715 HUNTINGDON ROAD',
    'Regulated Party': 'BIOWASTE MANAGEMENT LTD.',
  },
  {
    Latitude: 49.017,
    'Last Amendment Date': '2020-08-18',
    'Authorization Status': 'Active',
    'Authorization Number': 12398,
    'Waste Discharge Regulation': 'Schedule 2 - Composting Operations',
    'Authorization Type': 'Permit',
    'Effective/Issue Date': '1994-08-02',
    Longitude: -122.4547,
    'Facility Location': '27715 Huntingdon Road Abbotsford, BC',
    'Regulated Party': 'CONSOLIDATED ENVIROWASTE INDUSTRIES INC.',
  },
  {
    Manure: false,
    'Untreated and Unprocessed Wood Residuals': false,
    'Domestic Septic Tank Sludge': false,
    Latitude: 49.696324,
    'Yard Waste': false,
    'Fish Wastes': false,
    Whey: false,
    'Animal Bedding': false,
    Biosolids: false,
    'Hatchery Waste': false,
    'Last Amendment Date': '2003-05-12',
    'Authorization Status': 'Active',
    'Authorization Number': 14517,
    'Milk Processing Waste': false,
    'Poultry Carcasses': false,
    'Authorization Type': 'Notification',
    'Effective/Issue Date': '2003-05-12',
    Longitude: -125.016807,
    'Facility Location': '4738 Condensory  Road, Courtenay BC  V9N 7J3',
    'Postal Code': 'V9N 7J3',
    'Brewery Waste/Wine Waste': false,
    'Regulated Party': 'RIVER MEADOW FARMS LTD.',
    'Food Waste': false,
  },
  // This one has an application status
  {
    Latitude: 50.7826,
    'Last Amendment Date': '2023-10-04',
    'Authorization Status': 'Active',
    'Authorization Number': 108485,
    'Waste Discharge Regulation': 'Schedule 2 - Composting Operations',
    'Authorization Type': 'Permit',
    'Effective/Issue Date': '2018-01-16',
    Longitude: -121.1942,
    'Facility Location': '2990 Trans Canada Highway, Cache Creek V0H 1K0',
    'Regulated Party':
      'HALTON RECYCLING LTD. doing business as EMTERRA ENVIRONMENTAL',
    'Postal Code': 'V0H 1K0',
  },
  {
    Latitude: 49.13656,
    'Authorization Status': 'Active',
    'Authorization Number': 108531,
    'Waste Discharge Regulation': 'Schedule 2 - Composting Operations',
    'Authorization Type': 'Operational Certificate',
    'Effective/Issue Date': '2017-09-05',
    Longitude: -123.87431,
    'Facility Location': '981 Maughan Road, Nanaimo BC  V9X 1J2',
    'Regulated Party': 'NANAIMO ORGANIC WASTE LTD.',
    'Postal Code': 'V9X 1J2',
  },
]

export const mockActiveOmrrData = mockOmrrData.filter(
  (item) => item['Authorization Status'].toLowerCase() === SEARCH_BY_ACTIVE,
)

export const mockInactiveOmrrData = mockOmrrData.filter(
  (item) => item['Authorization Status'].toLowerCase() === SEARCH_BY_INACTIVE,
)

export function createMockOmrrData(
  authorizationType:
    | 'Approval'
    | 'Permit'
    | 'Operational Certificate'
    | 'Notification',
  input: Partial<OmrrData> = {},
): OmrrData {
  const address = input['Facility Location'] ?? 'Test Address, V0H 1K0'
  return {
    'Authorization Number': 555555,
    'Authorization Type': authorizationType,
    'Regulated Party': 'Test Facility',
    'Authorization Status': 'Active',
    Latitude: 50.1234,
    Longitude: -121.1234,
    'Effective/Issue Date': '2018-01-16',
    'Last Amendment Date': '2023-10-04',
    'Facility Location': address,
    'Postal Code': extractPostalCode(address),
    ...input,
  }
}
