import { Page } from 'playwright'
import { expect } from '@playwright/test'
import { baseURL } from '../utils'

// The OMRR API is backed by a live government database, so fields like dates
// get amended over time. Read the current values via the API instead of
// hardcoding them, so the test doesn't break every time the record changes.
const truncateDate = (dateString: string): string => dateString.substring(0, 10)

export const authorization_details_page = async (page: Page) => {
  await page.goto(baseURL)

  const omrrResponse = await page.request.get(
    `${baseURL.replace(/\/$/, '')}/api/omrr`,
  )
  const { omrrData } = await omrrResponse.json()
  const facility12398 = omrrData.find(
    (item: { 'Authorization Number': number }) =>
      item['Authorization Number'] === 12398,
  )

  await page.getByRole('button', { name: 'List all authorizations' }).click()

  const searchInput = page.locator('input[placeholder="Search"]').first()
  await searchInput.click()
  await searchInput.fill('12398')
  await page.getByText('View Details').click()

  await expect(page.getByText('Effective/Issue Date')).toBeVisible()
  await expect(
    page.getByText(truncateDate(facility12398['Effective/Issue Date'])),
  ).toBeVisible()
  await expect(page.getByText('Last Amendment Date')).toBeVisible()
  await expect(
    page.getByText(truncateDate(facility12398['Last Amendment Date'])),
  ).toBeVisible()

  await expect(page.getByText('CONSOLIDATED ENVIROWASTE')).toBeVisible()
  await expect(page.getByText('Huntingdon Road Abbotsford, BC')).toBeVisible()
  await expect(
    page.getByText(String(facility12398.Latitude)),
  ).toBeVisible()
  await expect(
    page.getByText(String(facility12398.Longitude)),
  ).toBeVisible()

  await expect(page.getByText('Authorization Details')).toBeVisible()
  await expect(page.getByText('Authorization Type')).toBeVisible()
  await expect(page.getByText('Regulation', { exact: true })).toBeVisible()
  await expect(
    page.getByRole('link', { name: 'Waste Discharge Regulation' }),
  ).toBeVisible()
  await expect(
    page.getByText('Schedule 2 - Composting Operations'),
  ).toBeVisible()

  // Compliance and Enforcement
  await expect(
    page.getByText('Compliance and Enforcement', { exact: true }),
  ).toBeVisible()
  const headerRow = page.locator('.compliance-table-header')
  await expect(
    headerRow.getByText('Date Issued', { exact: true }),
  ).toBeVisible()
  await expect(headerRow.getByText('Type', { exact: true })).toBeVisible()
  await expect(headerRow.getByText('Summary', { exact: true })).toBeVisible()
  await expect(headerRow.getByText('Action', { exact: true })).toBeVisible()

  const backBtn = page.getByRole('button', { name: 'Back to List View' })
  await expect(backBtn).toBeVisible()
  await backBtn.click()

  // Update the second search operation
  await searchInput.fill('16109')
  await page.getByText('View Details').click()
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
