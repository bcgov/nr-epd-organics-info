import { Page } from 'playwright'
import { expect } from '@playwright/test'

import { baseURL } from '../utils'

export const contact_page = async (page: Page) => {
  await page.goto(baseURL)
  const contactUsLink = page.getByRole('link', { name: 'Contact Us' })
  await contactUsLink.click()

  await expect(
    page.getByRole('heading', {
      name: 'Contact Us',
    }),
  ).toBeVisible()
  await expect(
    page.getByRole('heading', {
      name: 'Organic matter',
    }),
  ).toBeVisible()
  await expect(
    page.getByRole('heading', {
      name: 'Authorizations',
    }),
  ).toBeVisible()

  await expect(
    page.getByRole('heading', {
      name: 'Report natural resource violations',
    }),
  ).toBeVisible()

  await expect(
    page.getByRole('link', {
      name: 'ENV.OMRR.Reg.Reviews@gov.bc.ca',
    }),
  ).toBeVisible()
}
