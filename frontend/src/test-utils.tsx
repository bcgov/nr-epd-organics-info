import { ReactElement, ReactNode } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { render, RenderOptions } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { Provider } from 'react-redux'
import { RootState, setupStore } from '@/app/store'

interface TestRouterProps {
  children: ReactNode
  withRouter?: boolean
}

function TestRouter({
  children,
  withRouter = false,
}: Readonly<TestRouterProps>) {
  if (withRouter) {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="*" element={children} />
        </Routes>
      </BrowserRouter>
    )
  }
  return children
}

interface TestStateProviderProps {
  children: ReactNode
  withStateProvider?: boolean
  initialState?: Partial<RootState>
}

function TestStateProvider({
  children,
  withStateProvider = false,
  initialState,
}: Readonly<TestStateProviderProps>) {
  if (withStateProvider) {
    const store = setupStore(initialState)
    return <Provider store={store}>{children}</Provider>
  }
  return children
}

type CustomRenderOptions = Omit<RenderOptions, 'wrapper'> & {
  screenWidth?: number
  withRouter?: boolean
  withStateProvider?: boolean
  initialState?: Partial<RootState>
}

function customRender(ui: ReactElement, options: CustomRenderOptions = {}) {
  // Set a custom screen width
  const {
    screenWidth,
    withRouter,
    withStateProvider,
    initialState,
    ...restOptions
  } = options
  if (screenWidth !== undefined) {
    setScreenWidth(screenWidth)
  }

  const renderValues = render(ui, {
    wrapper: ({ children }: { children: ReactNode }) => (
      <TestRouter withRouter={withRouter}>
        <TestStateProvider
          withStateProvider={withStateProvider}
          initialState={initialState}
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
