import { downloadCsvFile, getFileName } from '@/utils/file-utils'

describe('Test suite for file-utils', () => {
  it('should test downloadCsvFile', () => {
    // can't spy on downloadFile, so we do this instead
    const originalCreate = URL.createObjectURL
    const originalRevoke = URL.revokeObjectURL
    const createMock = vi.fn(() => '#')
    const revokeMock = vi.fn()
    URL.createObjectURL = createMock
    URL.revokeObjectURL = revokeMock

    const data = 'one,two,three'
    downloadCsvFile(data)
    expect(createMock).toHaveBeenCalledTimes(1)
    expect(revokeMock).toHaveBeenCalledTimes(1)

    URL.createObjectURL = originalCreate
    URL.revokeObjectURL = originalRevoke
  })

  it('should test getFileName', () => {
    expect(getFileName(undefined as any)).toBe('')
    expect(getFileName(null as any)).toBe('')
    expect(getFileName({} as any)).toBe('')
    expect(getFileName(0 as any)).toBe('')
    expect(getFileName('')).toBe('')
    expect(getFileName('data:image/gif;base64,R0lGODlhAQABAIAAAP==')).toBe('')

    expect(getFileName('file.mp3')).toBe('file.mp3')
    expect(getFileName('File.mp3')).toBe('File.mp3')
    expect(getFileName('c:\\folder\\file.mp3')).toBe('file.mp3')
    expect(getFileName('/folder/file.mp3')).toBe('file.mp3')
    expect(getFileName('/folder/file.mp3?key=value')).toBe('file.mp3')
    expect(getFileName('/folder/file.mp3#num=123')).toBe('file.mp3')
    expect(getFileName('/folder/file.mp3?key=value#num=123')).toBe('file.mp3')
  })
})
