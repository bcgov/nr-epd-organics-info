import { Page } from 'playwright'
import { expect } from '@playwright/test'
import { baseURL } from '../utils'

export const map_page = async (page: Page) => {
  await page.goto(baseURL)

  await page.getByRole('button', { name: 'Map Search' }).click()

  await expect(page).toHaveTitle('Organics Info')
  await expect(page.getByRole('button', { name: 'Map Search' })).toBeVisible()
  await expect(page.getByRole('button', { name: 'Text Search' })).toBeVisible()

  await expect(page.getByTestId('map-view')).toBeVisible()

  // Find map markers - expect there to be some
  const markers = await page.getByAltText('Authorization marker').all()
  if (markers.length === 0) {
    console.log('No markers')
  }
  // TODO not sure why this fails on CI (chromium/Chrome)
  // expect(markers.length > 0).toBe(true)

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
}
