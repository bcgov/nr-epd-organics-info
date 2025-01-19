import { Page } from 'playwright'
import { expect } from '@playwright/test'
import { baseURL } from '../utils'

export const map_page = async (page: Page) => {
  await page.goto(baseURL)
  await page.getByRole('link', { name: 'Map Search' }).click()

  await expect(page).toHaveTitle('Organics Info')
  await expect(page.getByRole('link', { name: 'Map Search' })).toBeVisible()
  await expect(page.getByRole('link', { name: 'Text Search' })).toBeVisible()

  await expect(page.getByTestId('map-view')).toBeVisible()

  // Search components
  await expect(page.getByPlaceholder('Search')).toBeVisible()
  await expect(page.getByRole('button', { name: 'Find Me' })).toBeVisible()
  await expect(
    page.getByRole('button', { name: 'Polygon Search' }),
  ).toBeVisible()
  await expect(page.getByRole('button', { name: 'Point Search' })).toBeVisible()

  const searchBy = page.getByText('Search By:')
  await expect(searchBy).toBeVisible()
  await searchBy.click()

  await expect(page.getByRole('radio', { name: 'All' })).toBeVisible()
  const activeRadio = page.getByRole('radio', { name: 'Active', exact: true })
  await expect(activeRadio).toBeVisible()
  await expect(page.getByLabel('Inactive')).toBeVisible()
  await activeRadio.check()

  // Close the menu by clicking on the mask
  await page.locator('.MuiBackdrop-root').click({ force: true })

  await expect(page.getByLabel('Inactive')).toBeHidden()

  const filterBy = page.getByText('Filter by Facility Type')
  await expect(filterBy).toBeVisible()
  await filterBy.click()

  await expect(
    page.getByRole('checkbox', { name: 'Notification' }),
  ).toBeVisible()
  await expect(
    page.getByRole('checkbox', { name: 'Compost Production Facility' }),
  ).toBeVisible()
  await expect(
    page.getByRole('checkbox', { name: 'Land Application Biosolids' }),
  ).toBeVisible()
  await expect(page.getByRole('checkbox', { name: 'Permit' })).toBeVisible()
  await expect(page.getByRole('checkbox', { name: 'Approval' })).toBeVisible()
  await expect(
    page.getByRole('checkbox', { name: 'Operational Certificate' }),
  ).toBeVisible()
  await expect(page.getByRole('button', { name: 'Reset Filters' })).toBeHidden()

  await expect(page.getByLabel('Notification')).not.toBeChecked()
  await page.getByLabel('Notification').click()
  await expect(page.getByLabel('Notification')).toBeChecked()

  await expect(page.getByLabel('Permit')).not.toBeChecked()
  await page.getByLabel('Permit').click()
  await expect(page.getByLabel('Permit')).toBeChecked()

  // Reset Filters is only shown when there are active filters
  await page.getByRole('button', { name: 'Reset Filters' }).click()
  await expect(page.getByLabel('Notification')).not.toBeChecked()
  await expect(page.getByLabel('Permit')).not.toBeChecked()

  // Close the menu by clicking on the mask
  await page.locator('.MuiBackdrop-root').click({ force: true })

  // Enter 'Victoria' into the search field
  const searchInput = page.getByPlaceholder('Search')
  await searchInput.click({ force: true })
  await searchInput.fill('Victoria')

  // Autocomplete and search results list should be visible
  let autocompleteOption = page.getByRole('option').filter({ hasText: '17268' })
  await expect(autocompleteOption).toBeVisible()

  const searchResultItem = page
    .getByRole('listitem')
    .filter({ hasText: '17268' })
  await expect(searchResultItem).toBeVisible()

  autocompleteOption = page
    .getByRole('option')
    .filter({ hasText: 'CITY OF VICTORIA' })
  await expect(autocompleteOption).toBeVisible()
  await autocompleteOption.click()

  // Search input
  await expect(searchInput).toHaveValue('City Of Victoria')

  // Search results should be expanded
  await expect(page.getByText('Search Results')).toBeVisible()

  const hideResultsBtn = page.getByRole('button', { name: 'Hide Results' })
  await expect(hideResultsBtn).toBeVisible()
  await hideResultsBtn.click()

  const showResultsBtn = page.getByRole('button', { name: 'Show Results' })
  await expect(showResultsBtn).toBeVisible()
  await showResultsBtn.click()

  await page.getByTitle('Close').click({ force: true })

  // Test basemap switcher
  const basemapButton = page.locator('.leaflet-control-basemaps')
  await expect(basemapButton).toBeVisible()
  await basemapButton.click()

  // Check all basemap options are available
  await expect(
    page.locator('.basemap-option span').filter({ hasText: 'Streets' }),
  ).toBeVisible()
  await expect(
    page.locator('.basemap-option span').filter({ hasText: 'Terrain' }),
  ).toBeVisible()
  await expect(
    page.locator('.basemap-option span').filter({ hasText: 'Imagery' }),
  ).toBeVisible()
}
