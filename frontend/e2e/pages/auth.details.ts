import { Page } from 'playwright'
import { expect } from '@playwright/test'
import { baseURL } from '../utils'

export const authorization_details_page = async (page: Page) => {
  await page.goto(baseURL)
  await page.getByRole('button', { name: 'List all authorizations' }).click()
  await page.getByLabel('Search Authorizations').click()
  await page.getByLabel('Search Authorizations').fill('12398')
  await page.getByText('View Facility Details').click()

  await expect(page.getByText('Authorization #:')).toBeVisible()
  await expect(page.getByText('12398', { exact: true })).toBeVisible()
  await expect(page.getByText('Effective/Issue Date')).toBeVisible()
  await expect(page.getByText('1994-08-02')).toBeVisible()
  await expect(page.getByText('Last Amendment Date')).toBeVisible()
  await expect(page.getByText('2020-08-18')).toBeVisible()

  await expect(page.getByText('CONSOLIDATED ENVIROWASTE')).toBeVisible()
  await expect(page.getByText('Huntingdon Road Abbotsford, BC')).toBeVisible()
  await expect(page.getByText('49.017')).toBeVisible()
  await expect(page.getByText('-122.4547')).toBeVisible()

  await expect(page.getByText('Authorization Details')).toBeVisible()
  await expect(page.getByText('Authorization Type')).toBeVisible()
  await expect(page.getByText('Regulation', { exact: true })).toBeVisible()
  await expect(
    page.getByRole('link', { name: 'Waste Discharge Regulation' }),
  ).toBeVisible()
  await expect(
    page.getByText('Schedule 2 - Composting Operations'),
  ).toBeVisible()

  const backBtn = page.getByRole('button', { name: 'Back to Text Search' })
  await expect(backBtn).toBeVisible()
  await backBtn.click()

  // Go to a Notification compost facility
  await page.getByLabel('Search Authorizations').fill('16109')
  await page.getByText('View Facility Details').click()
  await expect(page.getByText('FISHER ROAD HOLDINGS LTD.')).toBeVisible()
  await expect(page.getByText('Operation Type')).toBeVisible()
  await expect(page.getByText('Compost Production Facility')).toBeVisible()
  await expect(page.getByText('Regulation', { exact: true })).toBeVisible()
  await expect(
    page.getByRole('link', { name: 'Organic Matter Recycling Regulation' }),
  ).toBeVisible()
  await expect(page.getByText('Type of Compost Produced')).toBeVisible()
  await expect(page.getByText('Facility Design Capacity')).toBeVisible()
  await expect(
    page.getByText('Organic Matter Used for Composting'),
  ).toBeVisible()
  await expect(page.getByText('Yard Waste')).toBeVisible()
}
