import { Page } from 'playwright'
import { expect } from '@playwright/test'
import { baseURL } from '../utils'

export const authorization_list_page = async (page: Page) => {
  await page.goto(baseURL)
  await page.getByRole('button', { name: 'List all authorizations' }).click()
  await expect(
    page.getByRole('heading', { name: 'Search Authorizations' }),
  ).toBeVisible()
  await expect(
    page.getByRole('heading', {
      name: 'Authorized compost and biosolid facilities in B.C.',
    }),
  ).toBeVisible()

  await page.getByRole('button', { name: 'Filter by Facility Type' }).click()
  await expect(page.getByLabel('Notification')).toBeVisible()
  await expect(page.getByLabel('Permit')).toBeVisible()
  await expect(page.getByLabel('Approval')).toBeVisible()
  await expect(page.getByLabel('Operational Certificate')).toBeVisible()
  await expect(page.getByLabel('Notification')).toBeVisible()
  await page.getByLabel('Notification').check()
  await expect(page.getByLabel('Compost Production Facility')).toBeVisible()
  await expect(page.getByLabel('Land Application Biosolids')).toBeVisible()
  await expect(
    page.getByRole('button', { name: 'Reset Filters' }),
  ).toBeVisible()

  await expect(page.getByPlaceholder('Type keyword to search')).toBeVisible()
  const searchInput = page.getByLabel('Search Authorizations')
  await searchInput.click()
  await searchInput.fill('victoria')

  // There are 3 search results - find the City of Victoria one
  const listItem = page
    .getByRole('listitem')
    .filter({ hasText: 'CITY OF VICTORIA' })
  await expect(listItem.getByText('Authorization #:')).toBeVisible()
  await expect(listItem.getByText('17268')).toBeVisible()
  await expect(listItem.getByText('Active')).toBeVisible()
  await expect(listItem.getByText('Notification')).toBeVisible()
}
