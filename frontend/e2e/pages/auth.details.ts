import { Page } from 'playwright'
import { expect } from '@playwright/test'
import { baseURL } from '../utils'

export const authorization_details_page = async (page: Page) => {
  await page.goto(baseURL)
  await page.getByRole('button', { name: 'List all authorizations' }).click()
  await page.getByLabel('Search Authorizations').click()
  await page.getByLabel('Search Authorizations').fill('12398')
  await page.getByText('View Facility Details').click()
  await expect(page.getByText('Authorization Status')).toBeVisible()
  await expect(page.getByText('Active')).toBeVisible()
  await expect(page.getByText('Authorization Number')).toBeVisible()
  await expect(page.getByText('12398')).toBeVisible()
  await expect(page.getByText('Effective/Issue Date')).toBeVisible()

  await expect(page.getByText('1994-08-02')).toBeVisible()
  await expect(page.getByText('Last Amendment Date')).toBeVisible()
  await expect(page.getByText('2020-08-18')).toBeVisible()

  await expect(
    page.getByRole('button', { name: 'Back To Search' }),
  ).toBeVisible()
  await expect(page.getByText('CONSOLIDATED ENVIROWASTE')).toBeVisible()
  await expect(page.getByText('Huntingdon Road Abbotsford, BC')).toBeVisible()
  await expect(page.getByText('49.017')).toBeVisible()
  await expect(page.getByText('-122.4547')).toBeVisible()
  await expect(page.getByText('Permit', { exact: true })).toBeVisible()
  await expect(
    page.getByText('Schedule 2 - Composting Operations'),
  ).toBeVisible()
}
