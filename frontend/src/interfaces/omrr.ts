export default interface OmrrData {
  'Authorization Number': number
  'Authorization Type': string
  'Regulated Party': string
  'Authorization Status': string
  'Facility Location': string
  'Effective/Issue Date': string // ISO date string
  'Last Amendment Date'?: string // ISO date string
  Latitude: number
  Longitude: number
  'Waste Discharge Regulation'?: string
  'Operation Type'?: string
  'Material Land Applied'?: string
  'Intended Dates of Land Application'?: string
  'Facility Design Capacity (t/y)'?: string
  'Type of Compost Produced'?: string
  'Yard Waste'?: boolean
  Biosolids?: boolean
  Whey?: boolean
  'Untreated and Unprocessed Wood Residuals'?: boolean
  'Poultry Carcasses'?: boolean
  'Fish Wastes'?: boolean
  'Food Waste'?: boolean
  'Brewery Waste/Wine Waste'?: boolean
  'Animal Bedding'?: boolean
  'Domestic Septic Tank Sludge'?: boolean
  'Hatchery Waste'?: boolean
  Manure?: boolean
  'Milk Processing Waste'?: boolean
  'Plant Matter Derived From Processing Plants'?: boolean,
  'Red Meat Waste'?: boolean
  // Extracted from Facility Location - not all facilities will have this set
  'Postal Code'?: string
}

// Contains all the boolean fields
export const omrrDataBooleanFields: (keyof OmrrData)[] = [
  'Yard Waste',
  'Biosolids',
  'Whey',
  'Untreated and Unprocessed Wood Residuals',
  'Poultry Carcasses',
  'Fish Wastes',
  'Food Waste',
  'Brewery Waste/Wine Waste',
  'Animal Bedding',
  'Domestic Septic Tank Sludge',
  'Hatchery Waste',
  'Manure',
  'Milk Processing Waste',
  'Plant Matter Derived From Processing Plants',
  'Red Meat Waste',
]
