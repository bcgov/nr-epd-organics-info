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
export const truncateDate = (
  dateString: string | undefined,
): string | undefined => (dateString ? dateString.substring(0, 10) : undefined)

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
