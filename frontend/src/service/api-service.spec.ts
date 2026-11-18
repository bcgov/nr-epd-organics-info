import { http, HttpResponse } from 'msw'

import apiService from '@/service/api-service'
import { errorHandlers, mswServer } from '@/test-setup'
import { mockOmrrData } from '@/mocks/mock-omrr-data'

describe('APIService', () => {
  it('fetches JSON from /api with Content-Type application/json', async () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch')

    const data = await apiService.get<{ omrrData: unknown[] }>('/omrr')

    expect(data.omrrData).toHaveLength(mockOmrrData.length)
    expect(fetchSpy).toHaveBeenCalledWith('/api/omrr', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    fetchSpy.mockRestore()
  })

  it('normalizes paths without a leading slash', async () => {
    const data = await apiService.get<{ omrrData: unknown[] }>('omrr')
    expect(data.omrrData).toHaveLength(mockOmrrData.length)
  })

  it('throws on non-ok HTTP responses', async () => {
    mswServer.use(...errorHandlers)
    await expect(apiService.get('/omrr')).rejects.toThrow(
      'HTTP error! status: 500',
    )
  })

  it('rethrows network errors', async () => {
    mswServer.use(
      http.get('http://localhost:3000/api/omrr', () => HttpResponse.error()),
    )
    await expect(apiService.get('/omrr')).rejects.toThrow()
  })
})
