import { createElement, ReactNode } from 'react'
import { configureStore } from '@reduxjs/toolkit'
import { renderHook } from '@testing-library/react'
import { Provider } from 'react-redux'
import { http, HttpResponse } from 'msw'

import {
  applicationsSlice,
  fetchOmrrApplicationStatus,
  initialState,
  selectAllApplications,
  selectStatus,
  useFindApplications,
} from './applications-slice'
import { OmrrApplicationStatus } from '@/interfaces/omrr-application-status'
import { mockOmrrApplicationStatusResponse } from '@/mocks/mock-omrr-application-status'
import { mswServer } from '@/test-setup'
import { RootState } from '@/app/store'

const applicationsReducer = applicationsSlice.reducer

function createApplicationsStore() {
  return configureStore({
    reducer: {
      applications: applicationsReducer,
    },
  })
}

describe('applicationsSlice', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('fetches application statuses via MSW and truncates Received Date', async () => {
    const store = createApplicationsStore()
    await store.dispatch(fetchOmrrApplicationStatus())

    const state = store.getState().applications
    expect(state.status).toBe('succeeded')
    expect(state.allApplications).toHaveLength(
      mockOmrrApplicationStatusResponse.length,
    )
    expect(state.allApplications[0]?.['Received Date']).toBe(
      mockOmrrApplicationStatusResponse[0]?.['Received Date'].substring(0, 10),
    )

    const rootState = { applications: state } as unknown as RootState
    expect(selectStatus(rootState)).toBe('succeeded')
    expect(selectAllApplications(rootState)).toEqual(state.allApplications)
  })

  it('handles pending, empty fulfilled, and rejected states cleanly', async () => {
    const consoleErrorSpy = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {})

    const pending = applicationsReducer(
      initialState,
      fetchOmrrApplicationStatus.pending('req-1', undefined),
    )
    expect(pending.status).toBe('loading')

    const empty = applicationsReducer(
      initialState,
      fetchOmrrApplicationStatus.fulfilled(
        [] as OmrrApplicationStatus[],
        'req-2',
        undefined,
      ),
    )
    expect(empty.status).toBe('failed')
    expect(empty.error).toBe('No data found')

    mswServer.use(
      http.get(
        'http://localhost:3000/api/omrr/application-status',
        () => new HttpResponse(null, { status: 500 }),
      ),
    )
    const store = createApplicationsStore()
    await store.dispatch(fetchOmrrApplicationStatus())
    expect(store.getState().applications.status).toBe('failed')
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Failed to load application statuses',
      'No data found',
    )
  })

  it('filters applications by authorization number in useFindApplications', () => {
    const store = createApplicationsStore()
    const payload: OmrrApplicationStatus[] = [
      {
        'Authorization Number': 108485,
        'Job Tracking Number': 386999,
        'Job Type': 'Authorization Amendment',
        'Authorization Type': 'Permit',
        Status: 'In Review',
        'Received Date': '2019-09-27T00:00:00.000Z',
      },
    ]
    store.dispatch(
      fetchOmrrApplicationStatus.fulfilled(payload, 'req-3', undefined),
    )

    const wrapper = ({ children }: { children: ReactNode }) =>
      createElement(Provider, { store, children })

    const { result: found } = renderHook(() => useFindApplications(108485), {
      wrapper,
    })
    expect(found.current).toHaveLength(1)

    const { result: missing } = renderHook(() => useFindApplications(0), {
      wrapper,
    })
    expect(missing.current).toEqual([])
  })
})
