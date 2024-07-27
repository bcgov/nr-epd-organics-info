import OmrrData from '@/interfaces/omrr'
import { MyLocationData, MyLocationSuccess } from '@/interfaces/location'

/**
 * Checks if the entire string is made up of digits
 */
export const isDigits = (text: string): boolean => /^\d+$/.test(text ?? '')

/**
 * Checks if the date is valid.
 */
export function isValidDate(date?: Date) {
  if (date instanceof Date) {
    return !Number.isNaN(date.getTime())
  }
  return false
}

/**
 * Truncates the date string to only include the date portion
 * @param {string} dateString the ISO date string
 */
export const truncateDate = (dateString: string): string =>
  typeof dateString === 'string' ? dateString.substring(0, 10) : ''

/**
 * Formats the date in MMM D, YYYY format
 * @param date
 */
export function shortDateFormat(date: Date): string {
  date = isValidDate(date) ? date : new Date()
  const month = date.toLocaleString('default', {
    month: 'short',
  })
  const day = date.getDate()
  const year = date.getFullYear()
  return `${month} ${day}, ${year}`
}

export function formatDistance(meters: number, kmDigits = 2): string {
  if (isNaN(meters)) {
    return ''
  }
  if (meters <= 1000) {
    return `${Math.round(meters)} m`
  }
  const kms = Number((meters / 1000).toFixed(kmDigits))
  return `${kms} km`
}

// These postal codes are all for BC only!
const POSTAL_CODE_REGEX = /(V\d[ABCEGHJ-NPRSTV-Z] ?\d[ABCEGHJ-NPRSTV-Z]\d)/i
const POSTAL_CODE_PREFIX = /^(V\d[ABCEGHJ-NPRSTV-Z])/i

export const isPostalCodeStart = (text: string): boolean =>
  POSTAL_CODE_PREFIX.test(text)

/**
 * Attempts to extract the postal code from the address.
 * Allows an optional space in the middle.
 * If it can't find the postal code it returns undefined.
 * @param {string} address
 */
export function extractPostalCode(address: string): string | undefined {
  const match = POSTAL_CODE_REGEX.exec(address)
  if (match) {
    let postalCode = match[1]
    if (postalCode.length === 6) {
      // add a space in the middle to make them all consistent
      postalCode = `${postalCode.substring(0, 3)} ${postalCode.substring(3, 6)}`
    }
    return postalCode.toUpperCase()
  }
  return undefined
}

export function toNumber(input: any, defaultValue = NaN): number {
  if (typeof input === 'number') {
    return input
  }
  if (typeof input === 'string') {
    return parseFloat(input)
  }
  return defaultValue
}

export function formatLatOrLng(input: number | undefined, digits = 4): string {
  const num = toNumber(input)
  if (isNaN(num)) {
    return ''
  }
  // Limit the number of digits, and remove trailing zeroes
  return String(Number(num.toFixed(digits)))
}

const CSV_KEYS: (keyof OmrrData)[] = [
  'Authorization Number',
  'Authorization Type',
  'Regulated Party',
  'Authorization Status',
  'Effective/Issue Date',
  'Last Amendment Date',
  'Facility Location',
  'Latitude',
  'Longitude',
  'Waste Discharge Regulation',
  'Operation Type',
  'Material Land Applied',
  'Intended Dates of Land Application',
  'Facility Design Capacity (t/y)',
  'Type of Compost Produced',
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
]
const DELIMETER_REGEX = /,/
const CSV_DELIMETER = ','

export function omrrDataToCsv(data: OmrrData[]): string {
  const rows: string[] = data.map((item: OmrrData) => {
    const cols: string[] = CSV_KEYS.map((key) => {
      const value: string | number | boolean | null | undefined = item[key]
      let stringValue: string = ''
      if (value !== undefined && value !== null) {
        if (typeof value === 'boolean') {
          stringValue = value ? 'Yes' : 'No'
        } else if (typeof value === 'number') {
          if (!isNaN(value)) {
            stringValue = String(value)
          }
        } else {
          // Remove quotes if necessary, and add quotes if a comma is present
          stringValue = value.replace(/"/g, '')
          if (DELIMETER_REGEX.test(stringValue)) {
            stringValue = `"${stringValue}"`
          }
        }
      }
      return stringValue
    })
    return cols.join(CSV_DELIMETER)
  })
  // Header line
  rows.unshift(CSV_KEYS.join(CSV_DELIMETER))
  return rows.join('\n')
}

const DEFAULT_POSITION_OPTIONS: PositionOptions = {
  enableHighAccuracy: true,
  maximumAge: 0,
}

/**
 * Uses geolocation to find the current users latitude and longitude.
 */
export function getMyLocation(
  onSuccess: MyLocationSuccess,
  onError: PositionErrorCallback | null | undefined = undefined,
  options: PositionOptions | undefined = DEFAULT_POSITION_OPTIONS,
) {
  // Extract just the position and accuracy values
  const successCb = (result: GeolocationPosition) => {
    const { coords } = result
    const { latitude: lat, longitude: lng, accuracy = 0 } = coords || {}
    const newData: MyLocationData = { accuracy }
    if (!isNaN(lat) && !isNaN(lng)) {
      newData.position = [lat, lng]
    }
    onSuccess(newData)
  }
  const { geolocation } = navigator
  // prettier-ignore Ignore Sonar error about geolocation - we need to allow this
  geolocation.getCurrentPosition(successCb, onError, options) // NOSONAR
}
