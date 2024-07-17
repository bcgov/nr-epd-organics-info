import {
  extractPostalCode,
  isDigits,
  isPostalCodeStart,
  isValidDate,
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
    expect(truncateDate('')).toBeUndefined()
    expect(truncateDate(undefined)).toBeUndefined()
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
})
