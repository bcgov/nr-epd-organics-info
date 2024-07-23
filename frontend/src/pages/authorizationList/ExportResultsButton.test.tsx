import { screen } from '@testing-library/react'

import { render } from '@/test-utils'
import { initialState } from '@/features/omrr/omrr-slice'
import { mockOmrrData } from '@/mocks/mock-omrr-data'
import { ExportResultsButton } from './ExportResultsButton'
import { omrrDataToCsv } from '@/utils/utils'
import { downloadCsvFile } from '@/utils/file-utils'

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
    expect(downloadCsvFile).toHaveBeenCalledWith(csv, 'authorizations.csv')
  })
})
