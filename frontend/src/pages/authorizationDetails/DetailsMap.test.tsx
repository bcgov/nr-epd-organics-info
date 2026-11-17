import { render } from '@testing-library/react'

import { mockOmrrData } from '@/mocks/mock-omrr-data'
import { DetailsMap } from './DetailsMap'

describe('Test suite for DetailsMap', () => {
  it('should use Esri basemap tiles instead of OpenStreetMap', () => {
    const { container } = render(<DetailsMap item={mockOmrrData[0]} />)

    const attribution = container.querySelector('.leaflet-control-attribution')
    expect(attribution).toHaveTextContent('Esri')
    expect(attribution).not.toHaveTextContent('OpenStreetMap')

    container.querySelectorAll('img.leaflet-tile').forEach((tile) => {
      expect(tile.getAttribute('src')).toMatch(
        /^https:\/\/server\.arcgisonline\.com\//,
      )
    })
    expect(container.innerHTML).not.toContain('openstreetmap.org')
  })
})
