import { createElement, ReactNode } from 'react'
import { configureStore } from '@reduxjs/toolkit'
import { renderHook } from '@testing-library/react'
import { Provider } from 'react-redux'
import { http, HttpResponse } from 'msw'

import {
  documentsSlice,
  fetchOmrrDocuments,
  initialState,
  selectAllDocuments,
  selectStatus,
  useFindAuthorizationDocuments,
} from './documents-slice'
import { OmrrAuthzDocsResponse } from '@/interfaces/omrr-documents'
import { mockOmrrDocuments } from '@/mocks/mock-omrr-documents'
import { mswServer } from '@/test-setup'
import { RootState } from '@/app/store'

const documentsReducer = documentsSlice.reducer

function createDocumentsStore() {
  return configureStore({
    reducer: {
      documents: documentsReducer,
    },
  })
}

describe('documentsSlice', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('fetches authorization documents via MSW and exposes selectors', async () => {
    const store = createDocumentsStore()
    await store.dispatch(fetchOmrrDocuments())

    const state = store.getState().documents
    expect(state.status).toBe('succeeded')
    expect(state.allDocuments).toEqual(mockOmrrDocuments)

    const rootState = { documents: state } as unknown as RootState
    expect(selectStatus(rootState)).toBe('succeeded')
    expect(selectAllDocuments(rootState)).toEqual(mockOmrrDocuments)
  })

  it('handles pending, empty fulfilled, and rejected states cleanly', async () => {
    const consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {})
    const consoleErrorSpy = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {})

    const pending = documentsReducer(
      initialState,
      fetchOmrrDocuments.pending('req-1', undefined),
    )
    expect(pending.status).toBe('loading')

    const empty = documentsReducer(
      initialState,
      fetchOmrrDocuments.fulfilled(
        [] as OmrrAuthzDocsResponse[],
        'req-2',
        undefined,
      ),
    )
    expect(empty.status).toBe('failed')
    expect(empty.error).toBe('No data found')
    expect(consoleLogSpy).toHaveBeenCalledWith(
      'No authorization documents loaded.',
    )

    mswServer.use(
      http.get(
        'http://localhost:3000/api/omrr/authorization-docs',
        () => new HttpResponse(null, { status: 500 }),
      ),
    )
    const store = createDocumentsStore()
    await store.dispatch(fetchOmrrDocuments())
    expect(store.getState().documents.status).toBe('failed')
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Failed to load authorization documents',
      expect.stringContaining('500'),
    )
  })

  it('looks up doc_links by authorization number via useFindAuthorizationDocuments', () => {
    const store = createDocumentsStore()
    store.dispatch(
      fetchOmrrDocuments.fulfilled(mockOmrrDocuments, 'req-3', undefined),
    )

    const wrapper = ({ children }: { children: ReactNode }) =>
      createElement(Provider, { store, children })

    const authNum = mockOmrrDocuments[0]['Authorization Number']
    const { result: found } = renderHook(
      () => useFindAuthorizationDocuments(authNum),
      { wrapper },
    )
    expect(found.current).toEqual(mockOmrrDocuments[0].doc_links)

    const { result: invalid } = renderHook(
      () => useFindAuthorizationDocuments(0),
      { wrapper },
    )
    expect(invalid.current).toBeUndefined()
  })
})
