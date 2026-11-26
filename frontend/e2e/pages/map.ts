import { Page } from 'playwright'
import { expect } from '@playwright/test'
import { SEARCH_PLACEHOLDER } from '../../src/constants/constants'
import { baseURL } from '../utils'

export const map_page = async (page: Page) => {
  await page.goto(baseURL)
  await page.getByRole('button', { name: 'Search on a map' }).click()
  await page.waitForLoadState('domcontentloaded')

  await expect(page.getByTestId('map-view')).toBeVisible()

  // Search and spatial tool buttons
  await expect(page.getByPlaceholder(SEARCH_PLACEHOLDER)).toBeVisible()
  await expect(page.getByRole('button', { name: 'Find Me' })).toBeVisible()
  await expect(
    page.getByRole('button', { name: 'Polygon Search' }),
  ).toBeVisible()
  await expect(
    page.getByRole('button', { name: 'Radius Search' }),
  ).toBeVisible()

  // Status dropdown
  const searchBy = page.getByRole('button', { name: /Status/i })
  await expect(searchBy).toBeVisible()
  await searchBy.click()

  await expect(page.getByRole('radio', { name: 'All' })).toBeVisible()
  const activeRadio = page.getByRole('radio', { name: 'Active', exact: true })
  await expect(activeRadio).toBeVisible()
  await expect(page.getByLabel('Inactive')).toBeVisible()
  await activeRadio.check()

  await page.keyboard.press('Escape')
  await expect(page.getByLabel('Inactive')).toBeHidden()

  // Filter dropdown
  const filterBy = page.getByRole('button', { name: /Filter/i })
  await expect(filterBy).toBeVisible()
  await filterBy.click()

  await expect(
    page.getByRole('checkbox', { name: 'Notification' }),
  ).toBeVisible()
  await expect(
    page.getByRole('checkbox', { name: 'Compost Production Facility' }),
  ).toBeVisible()
  await expect(
    page.getByRole('checkbox', { name: 'Land Application' }),
  ).toBeVisible()
  await expect(page.getByRole('checkbox', { name: 'Permit' })).toBeVisible()
  await expect(page.getByRole('checkbox', { name: 'Approval' })).toBeVisible()
  await expect(
    page.getByRole('checkbox', { name: 'Operational Certificate' }),
  ).toBeVisible()
  await expect(page.getByRole('button', { name: 'Reset Filters' })).toBeHidden()

  await page.getByLabel('Notification').click()
  await expect(page.getByLabel('Notification')).toBeChecked()
  await page.getByLabel('Permit').click()
  await expect(page.getByLabel('Permit')).toBeChecked()

  await page.getByRole('button', { name: 'Reset Filters' }).click()
  await expect(page.getByLabel('Notification')).not.toBeChecked()
  await expect(page.getByLabel('Permit')).not.toBeChecked()

  await page
    .locator('[aria-labelledby="mapFilterByButton"] .MuiBackdrop-root')
    .click({
      position: { x: 5, y: 5 },
    })
  await expect(page.getByLabel('Notification')).toBeHidden()

  // Search autocomplete and results sidebar
  const searchInput = page.getByPlaceholder(SEARCH_PLACEHOLDER)
  await searchInput.click()
  await searchInput.fill('Victoria')

  await expect(
    page.getByRole('option').filter({ hasText: '17268' }),
  ).toBeVisible()
  await expect(
    page.getByRole('listitem').filter({ hasText: '17268' }),
  ).toBeVisible()

  const victoriaOption = page
    .getByRole('option')
    .filter({ hasText: 'CITY OF VICTORIA' })
  await expect(victoriaOption).toBeVisible()
  await victoriaOption.click()

  await expect(page.getByText('Search Results')).toBeVisible()

  const hideResultsBtn = page.getByRole('button', { name: 'Hide Results' })
  await expect(hideResultsBtn).toBeVisible()
  await hideResultsBtn.click()

  const showResultsBtn = page.getByRole('button', { name: 'Show Results' })
  await expect(showResultsBtn).toBeVisible()
  await showResultsBtn.click()

  await page.getByTitle('Close').first().click({ force: true })

  // Basemap tiles must come from Esri, not OpenStreetMap (#425)
  const mapTile = page.locator('.leaflet-tile-pane img.leaflet-tile').first()
  await expect(mapTile).toHaveAttribute(
    'src',
    /^https:\/\/server\.arcgisonline\.com\//,
  )
  await expect(
    page.locator('.leaflet-tile-pane img[src*="openstreetmap.org"]'),
  ).toHaveCount(0)

  // Basemap switcher
  const basemapButton = page.getByTitle('Change basemap')
  await expect(basemapButton).toBeVisible()
  await basemapButton.click()
  await expect(
    page.locator('.basemap-option span', { hasText: 'Terrain + Roads' }),
  ).toBeVisible()
  await expect(
    page.locator('.basemap-option span', { hasText: 'Imagery + Roads' }),
  ).toBeVisible()
}
