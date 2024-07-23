/**
 * Downloads a CSV file with the given data.
 */
export function downloadCsvFile(data: string, fileName = 'file.csv') {
  downloadFile(data, fileName, 'text/csv')
}

/**
 * Causes a text file to be downloaded with the given file name.
 * @param {string} contents the file contents to save
 * @param {string} [fileName=file.json] the filename to use when downloading
 * @param {string} [type=text/plain] the file content type
 */
export function downloadFile(
  contents: string,
  fileName = 'file.json',
  type = 'text/plain',
) {
  const blob = new Blob([contents], { type })
  const href = URL.createObjectURL(blob)
  downloadFileFromUrl(href, fileName)
  URL.revokeObjectURL(href)
}

/**
 * Downloads the given url.
 */
export function downloadFileFromUrl(
  url: string,
  fileName: string | undefined = undefined,
) {
  const link = document.createElement('a')
  link.style.position = 'absolute'
  link.style.display = 'none'
  link.setAttribute('href', url)
  link.setAttribute('download', fileName ?? (getFileName(url) || 'file'))
  // Required for Firefox - element must be in the DOM?
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

export function isDataUri(src: string | undefined): boolean {
  return typeof src === 'string' && src.startsWith('data:')
}

/**
 * Returns the file name portion of the path.
 * Strips of leading path and trailing query string or hash.
 * @param path the path or URL
 */
export function getFileName(path: string | undefined): string {
  let name = ''
  // exclude base64 src strings
  if (typeof path === 'string' && !isDataUri(path)) {
    const slash = Math.max(path.lastIndexOf('/'), path.lastIndexOf('\\'))
    name = path.substring(slash + 1)
    const query = name.indexOf('?')
    if (query != -1) {
      name = name.substring(0, query)
    }
    const hash = name.indexOf('#')
    if (hash !== -1) {
      name = name.substring(0, hash)
    }
  }
  return name
}
