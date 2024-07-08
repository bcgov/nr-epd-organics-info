import { test, expect } from '@playwright/test'
import { baseURL } from '../utils'

test('Map page', async ({ page }) => {
  await page.goto(baseURL)

  await page.getByRole('button', { name: 'Map Search' }).click()

  await expect(page).toHaveTitle('Organics Info')
  await expect(page.getByRole('button', { name: 'Map Search' })).toBeVisible()
  await expect(page.getByRole('button', { name: 'Text Search' })).toBeVisible()

  // Find map markers - expect there to be some
  const markers = await page.getByAltText('Authorization marker').all()
  expect(markers.length > 0).toBe(true)
})
