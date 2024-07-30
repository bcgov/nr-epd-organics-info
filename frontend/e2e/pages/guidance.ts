import { Page } from 'playwright'
import { expect } from '@playwright/test'

import { baseURL } from '../utils'

export const guidance_page = async (page: Page) => {
  await page.goto(baseURL)
  const guidanceLink = page.getByRole('link', { name: 'Guidance' })
  await guidanceLink.click()

  await expect(
    page.getByRole('heading', {
      name: 'Guidance',
    }),
  ).toBeVisible()
  await expect(
    page.getByRole('heading', {
      name: 'How to interpret',
    }),
  ).toBeVisible()
  await expect(
    page.getByRole('heading', {
      name: 'Map layers',
    }),
  ).toBeVisible()

  await expect(
    page.getByRole('link', {
      name: 'Aquifers - All',
    }),
  ).toBeVisible()

  await expect(
    page.getByRole('heading', {
      name: 'Other sources of information',
    }),
  ).toBeVisible()
}
