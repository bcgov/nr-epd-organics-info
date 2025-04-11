import { ReactElement, ReactNode } from 'react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { render, RenderOptions, waitFor } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { Provider } from 'react-redux'

import { loadApiData, RootState, setupStore } from '@/app/store'

interface TestRouterProps {
  children: ReactNode
  withRouter?: boolean
  route?: string
  path?: string
}

function TestRouter({
  children,
  withRouter = false,
  route,
  path,
}: Readonly<TestRouterProps>) {
  if (withRouter) {
    window.history.replaceState({}, '', route ?? '/')
    return (
      <MemoryRouter initialEntries={[route ?? '/']}>
        <Routes>
          {path ? (
            <>
              <Route path={path} element={children} />
              <Route path="*" element={<span />} />
            </>
          ) : (
            <Route path="*" element={children} />
          )}
        </Routes>
      </MemoryRouter>
    )
  }
  return children
}

interface TestStateProviderProps {
  children: ReactNode
  withStateProvider?: boolean
  initialState?: Partial<RootState>
  withApiData?: boolean
}

function TestStateProvider({
  children,
  withStateProvider = false,
  initialState,
  withApiData = false,
}: Readonly<TestStateProviderProps>) {
  if (withStateProvider) {
    const store = setupStore(initialState)
    if (withApiData) {
      loadApiData(store)
    }
    return <Provider store={store}>{children}</Provider>
  }
  return children
}

type CustomRenderOptions = Omit<RenderOptions, 'wrapper'> & {
  screenWidth?: number
  withRouter?: boolean
  route?: string
  path?: string
  withStateProvider?: boolean
  initialState?: Partial<RootState>
  withApiData?: boolean
}

function customRender(ui: ReactElement, options: CustomRenderOptions = {}) {
  // Set a custom screen width
  const {
    screenWidth,
    withRouter,
    route,
    path,
    withStateProvider,
    initialState,
    withApiData,
    ...restOptions
  } = options
  if (screenWidth !== undefined) {
    setScreenWidth(screenWidth)
  }

  const renderValues = render(ui, {
    wrapper: ({ children }: { children: ReactNode }) => (
      <TestRouter withRouter={withRouter} route={route} path={path}>
        <TestStateProvider
          withStateProvider={withStateProvider}
          initialState={initialState}
          withApiData={withApiData}
        >
          {children}
        </TestStateProvider>
      </TestRouter>
    ),
    ...restOptions,
  })

  // Include user events in the return value
  return {
    user: userEvent.setup(),
    ...renderValues,
  }
}

export function setScreenWidth(width: number) {
  Object.defineProperty(window, 'innerWidth', {
    writable: true,
    configurable: true,
    value: width,
  })
}

export * from '@testing-library/react'
export { default as userEvent } from '@testing-library/user-event'
// override render export
export { customRender as render }
