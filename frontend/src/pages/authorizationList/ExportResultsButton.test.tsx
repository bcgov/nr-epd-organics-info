import { screen } from '@testing-library/react'

import { render } from '@/test-utils'
import { initialState } from '@/features/omrr/omrr-slice'
import { mockOmrrData } from '@/mocks/mock-omrr-data'
import { omrrDataToCsv } from '@/utils/utils'
import { downloadCsvFile } from '@/utils/file-utils'
import { ExportResultsButton } from './ExportResultsButton'

vi.mock('@/utils/file-utils')

describe('Test suite for ExportResultsButton', () => {
  it('should render ExportResultsButton', async () => {
    const { user } = render(<ExportResultsButton />, {
      withStateProvider: true,
      initialState: {
        omrr: {
          ...initialState,
          filteredResults: mockOmrrData,
        },
      },
    })

    const btn = screen.getByText('Export Results to CSV')
    await user.click(btn)

    const csv = omrrDataToCsv(mockOmrrData)
    expect(downloadCsvFile).toHaveBeenCalledOnce()

    const expectedFilename = expect.stringMatching(
      /OMRR_Authorizations_\d{8}_\d{9}\.csv/,
    )
    expect(downloadCsvFile).toHaveBeenCalledWith(csv, expectedFilename)
  })
})
