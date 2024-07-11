import { expect } from '@playwright/test'
import { baseURL } from '../utils'
import { Page } from 'playwright'

export const map_page = async (page: Page) => {
  await page.goto(baseURL)

  await page.getByRole('button', { name: 'Map Search' }).click()

  await expect(page).toHaveTitle('Organics Info')
  await expect(page.getByRole('button', { name: 'Map Search' })).toBeVisible()
  await expect(page.getByRole('button', { name: 'Text Search' })).toBeVisible()

  await expect(page.getByTestId('map-view')).toBeVisible()

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
  await expect(
    page.getByRole('radio', { name: 'Inactive', exact: true }),
  ).toBeVisible()

  await activeRadio.click()

  // TODO this causes an infinite loop, not sure why
  /*
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
 */

  // Find map markers - expect there to be some
  // TODO not sure why this fails on CI (chromium/Chrome)
  // const markers = await page.getByAltText('Authorization marker').all()
  // expect(markers.length > 0).toBe(true)
}
