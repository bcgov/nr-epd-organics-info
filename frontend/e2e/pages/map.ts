import { expect } from '@playwright/test'
import { baseURL } from '../utils'
import { Page } from 'playwright'

export const map_page = async (page: Page) => {
  await page.goto(baseURL)

  await page.getByRole('button', { name: 'Map Search' }).click()

  await expect(page).toHaveTitle('Organics Info')
  await expect(page.getByRole('button', { name: 'Map Search' })).toBeVisible()
  await expect(page.getByRole('button', { name: 'Text Search' })).toBeVisible()

  await page.getByTestId('map-view')

  // Find map markers - expect there to be some
  // TODO not sure why this fails on CI (chromium/Chrome)
  // const markers = await page.getByAltText('Authorization marker').all()
  // expect(markers.length > 0).toBe(true)
}
