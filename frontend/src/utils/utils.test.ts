import {
  extractPostalCode,
  filenameDateFormat,
  formatDistance,
  formatLatOrLng,
  isDigits,
  isPostalCodeStart,
  isValidDate,
  shortDateFormat,
  toNumber,
  truncateDate,
} from '@/utils/utils'

describe('Test suite for utils', () => {
  it('should test isDigits()', () => {
    expect(isDigits('12')).toBe(true)
    expect(isDigits('asdf')).toBe(false)
    expect(isDigits('12d')).toBe(false)
    expect(isDigits(undefined as any)).toBe(false)
  })

  it('should test isValidDate()', () => {
    expect(isValidDate(undefined)).toBe(false)
    expect(isValidDate(new Date(NaN))).toBe(false)
    expect(isValidDate(new Date())).toBe(true)
    expect(isValidDate(new Date('2023-10-24T12:34:56.123Z'))).toBe(true)
  })

  it('should test truncateDate()', () => {
    expect(truncateDate('2023-10-24T12:34:56.123Z')).toBe('2023-10-24')
    expect(truncateDate('')).toBe('')
    expect(truncateDate(undefined as any)).toBe('')
    expect(truncateDate(null as any)).toBe('')
    expect(truncateDate(123 as any)).toBe('')
  })

  it('should test filenameDateFormat', () => {
    const date = new Date('2024-07-31T13:57:34.553Z')
    expect(filenameDateFormat(date)).toBe('20240731_135734553')
    expect(filenameDateFormat()).toHaveLength(18)
  })

  it('should test shortDateFormat', () => {
    const date = new Date('2024-07-25T13:57:34.553Z')
    expect(shortDateFormat(date)).toBe('Jul 25, 2024')

    const today = new Date()
    const expected = shortDateFormat(today)
    expect(shortDateFormat(undefined as any)).toBe(expected)
  })
  it('should test formatDistance', () => {
    expect(formatDistance(NaN)).toBe('')
    expect(formatDistance(12.3)).toBe('12 m')
    expect(formatDistance(1234.123)).toBe('1.23 km')
    expect(formatDistance(1234.123, 1)).toBe('1.2 km')
  })

  it('should test isPostalCodeStart()', () => {
    expect(isPostalCodeStart('V8P')).toBe(true)
    expect(isPostalCodeStart('V8P 4Y6')).toBe(true)
    expect(isPostalCodeStart('V8P4Y6')).toBe(true)

    expect(isPostalCodeStart('V')).toBe(false)
    expect(isPostalCodeStart('V8')).toBe(false)
    expect(isPostalCodeStart('ABC 3Y6')).toBe(false)
    expect(isPostalCodeStart('String')).toBe(false)
  })

  it('should test extractPostalCode()', () => {
    expect(extractPostalCode('123 road, Sidney, V8P 4Y6')).toBe('V8P 4Y6')
    expect(extractPostalCode('123 road, Sidney, V8P4Y6')).toBe('V8P 4Y6')
    expect(extractPostalCode('v8p4y6 Sidney')).toBe('V8P 4Y6')
    expect(extractPostalCode('V0A 0A0')).toBe('V0A 0A0')
  })

  it('should test toNumber()', () => {
    expect(toNumber(NaN)).toBeNaN()
    expect(toNumber(undefined)).toBeNaN()
    expect(toNumber(null)).toBeNaN()
    expect(toNumber('')).toBeNaN()
    expect(toNumber({}, 0)).toBe(0)

    expect(toNumber(12)).toBe(12)
    expect(toNumber('12')).toBe(12)
    expect(toNumber('12.123')).toBe(12.123)
  })

  it('should test formatLatOrLng()', () => {
    expect(formatLatOrLng(NaN)).toBe('')
    expect(formatLatOrLng(undefined)).toBe('')
    expect(formatLatOrLng(null as any)).toBe('')
    expect(formatLatOrLng('' as any)).toBe('')
    expect(formatLatOrLng('asdf' as any)).toBe('')
    expect(formatLatOrLng('12str' as any)).toBe('12')

    expect(formatLatOrLng(12)).toBe('12')
    expect(formatLatOrLng(48.1111111)).toBe('48.1111')
    expect(formatLatOrLng(48.0)).toBe('48')
    expect(formatLatOrLng(48.1)).toBe('48.1')
    expect(formatLatOrLng(48.100001, 6)).toBe('48.100001')
  })
})
