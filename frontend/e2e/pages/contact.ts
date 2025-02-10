import { Page } from 'playwright'
import { expect } from '@playwright/test'

import { baseURL } from '../utils'

export const contact_page = async (page: Page) => {
  await page.goto(baseURL + '/contact')

  // Test main heading
  await expect(
    page.getByRole('heading', { name: 'Contact us', level: 1 }),
  ).toBeVisible()

  // Test section headers using the new class
  await expect(
    page.locator('.link-section-header', { hasText: 'Organic matter' }),
  ).toBeVisible()

  await expect(
    page.locator('.link-section-header', { hasText: 'Authorizations' }),
  ).toBeVisible()

  await expect(
    page.locator('.link-section-header', {
      hasText: 'Report natural resource violations',
    }),
  ).toBeVisible()

  // Test Need general help section
  await expect(
    page.getByRole('heading', { name: 'Need general help?' }),
  ).toBeVisible()

  // Test link sections are present
  await expect(page.locator('.link-section')).toHaveCount(3)

  // Test a sample link is visible
  await expect(
    page.getByRole('link', { name: 'ENV.OMRR.Reg.Reviews@gov.bc.ca' }),
  ).toBeVisible()
}
