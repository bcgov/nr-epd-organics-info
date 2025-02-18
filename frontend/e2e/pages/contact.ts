import { Page } from 'playwright'
import { expect } from '@playwright/test'

import { baseURL } from '../utils'

export const contact_page = async (page: Page) => {
  await page.goto(baseURL + '/contact')

  // Test section headers using data attributes
  await expect(
    page.locator('[data-section-header="true"]', { hasText: 'Organic matter' }),
  ).toBeVisible()

  await expect(
    page.locator('[data-section-header="true"]', { hasText: 'Authorizations' }),
  ).toBeVisible()

  await expect(
    page.locator('[data-section-header="true"]', {
      hasText: 'Report natural resource violations',
    }),
  ).toBeVisible()

  // Test Need general help section
  await expect(
    page.getByRole('heading', { name: 'Need general help?' }),
  ).toBeVisible()

  // Test link sections are present
  await expect(page.locator('[data-testid="link-section"]')).toHaveCount(3)

  // Test a sample link is visible
  await expect(
    page.getByRole('link', { name: 'ENV.OMRR.Reg.Reviews@gov.bc.ca' }),
  ).toBeVisible()
}
