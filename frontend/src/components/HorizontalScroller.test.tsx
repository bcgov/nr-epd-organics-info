import { fireEvent, screen } from '@testing-library/react'

import { render } from '@/test-utils'
import { HorizontalScroller } from './HorizontalScroller'

describe('Test suite for HorizontalScroller', () => {
  it('should render HorizontalScroller disabled', () => {
    render(
      <HorizontalScroller isEnabled={false} title="scroller">
        Content
      </HorizontalScroller>,
    )

    expect(screen.queryByTitle('scroller')).not.toBeInTheDocument()
    screen.getByText('Content')
  })

  it('should render HorizontalScroller with no scrolling', () => {
    render(
      <div style={{ width: '1000px' }} className="test-class" title="scroller">
        <HorizontalScroller>Content</HorizontalScroller>
      </div>,
    )

    const scroller = screen.getByTitle('scroller')
    expect(scroller).toHaveClass('test-class')

    screen.getByText('Content')
    expect(screen.queryByTitle('Scroll left')).not.toBeInTheDocument()
    expect(screen.queryByTitle('Scroll right')).not.toBeInTheDocument()
  })

  it('should render HorizontalScroller with scrolling', async () => {
    // jsdom doesn't supper scrollWidth/clientWidth - need to mock these
    const clientWidthMock = vi
      .spyOn(HTMLElement.prototype, 'clientWidth', 'get')
      .mockImplementation(() => 100)
    const scrollWidthMock = vi
      .spyOn(HTMLElement.prototype, 'scrollWidth', 'get')
      .mockImplementation(() => 300)

    const { user } = render(
      <div style={{ width: '100px', height: '20px' }}>
        <HorizontalScroller title="scroller">
          <div style={{ width: '300px', height: '20px' }}>Content</div>
        </HorizontalScroller>
      </div>,
    )

    const scroller = screen.getByTitle('scroller')
    screen.getByText('Content')

    const scrollRight = await screen.findByTitle('Scroll right')
    expect(screen.queryByTitle('Scroll left')).not.toBeInTheDocument()
    await user.click(scrollRight)

    const scrollLeft = await screen.findByTitle('Scroll left')
    await user.click(scrollLeft)

    // Swipe left - scroll right
    fireEvent.touchStart(scroller, {
      changedTouches: [{ clientX: 50, clientY: 0 }],
    })
    fireEvent.touchEnd(scroller, {
      changedTouches: [{ clientX: 10, clientY: 0 }],
    })

    // Swipe right - scroll left
    fireEvent.touchStart(scroller, {
      changedTouches: [{ clientX: 10, clientY: 0 }],
    })
    fireEvent.touchEnd(scroller, {
      changedTouches: [{ clientX: 50, clientY: 0 }],
    })

    clientWidthMock.mockRestore()
    scrollWidthMock.mockRestore()
  })
})
