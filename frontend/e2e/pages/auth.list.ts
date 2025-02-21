import { Page } from 'playwright'
import { expect } from '@playwright/test'
import { baseURL } from '../utils'

export const authorization_list_page = async (page: Page) => {
  await page.goto(baseURL)
  await page.getByRole('button', { name: 'List all authorizations' }).click()
  // Wait for the page to be fully loaded and interactive
  await page.waitForLoadState('networkidle')
  await expect(page.getByTestId('auth-list-top-section-title')).toBeVisible()
  await expect(page.getByTestId('auth-list-top-section-subtitle')).toBeVisible()

  // Test the Search dropdown
  const statusButton = page.getByTestId('list-page-search-by-button')
  await expect(statusButton).toBeVisible()
  await expect(statusButton).toBeEnabled()
  await statusButton.click()

  await expect(page.getByTestId('list-page-search-by-button-all')).toBeVisible()

  // await expect(
  //   page.getByRole('menuitem', { name: 'All', exact: true }),
  // ).toBeVisible()
  // await expect(
  //   page.getByRole('menuitem', { name: 'Active', exact: true }),
  // ).toBeVisible()
  // await expect(
  //   page.getByRole('menuitem', { name: 'Inactive', exact: true }),
  // ).toBeVisible()
  // await page.getByRole('menuitem', { name: 'Active', exact: true }).click()

  // Ensure menu is closed by clicking away
  // await page.click('body', { position: { x: 0, y: 0 } })

  // // Test the Filter dropdown
  // const filterButton = page.getByRole('button', { name: 'Filter' })
  // await expect(filterButton).toBeVisible()
  // await expect(filterButton).toBeEnabled()
  // await filterButton.click()

  // await expect(page.getByLabel('Notification')).toBeVisible()
  // await expect(page.getByLabel('Permit')).toBeVisible()
  // await expect(page.getByLabel('Approval')).toBeVisible()
  // await expect(page.getByLabel('Operational Certificate')).toBeVisible()
  // await page.getByLabel('Notification').check()
  // await expect(page.getByLabel('Compost Production Facility')).toBeVisible()
  // await expect(page.getByLabel('Land Application')).toBeVisible()
  // await expect(
  //   page.getByRole('button', { name: 'Reset Filters' }),
  // ).toBeVisible()

  // // Close the filter menu
  // await page.click('body', { position: { x: 0, y: 0 } })

  // // Test the search input
  // const searchInput = page.locator('input[placeholder="Search"]').first()
  // await expect(searchInput).toBeVisible()
  // await searchInput.click()
  // await searchInput.fill('victoria')

  // // Test search results
  // const listItem = page
  //   .getByRole('listitem')
  //   .filter({ hasText: 'CITY OF VICTORIA' })
  // await expect(listItem.getByText('Authorization #:')).toBeVisible()
  // await expect(listItem.getByText('17268')).toBeVisible()
  // await expect(listItem.getByText('Active')).toBeVisible()
  // await expect(listItem.getByText('Notification')).toBeVisible()

  // await expect(
  //   page.getByRole('button', { name: 'Export Results to CSV' }),
  // ).toBeVisible()

  // await page.getByTitle('Sort results by my location').first().click()
}
