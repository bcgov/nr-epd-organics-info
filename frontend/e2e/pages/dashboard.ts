import { expect } from '@playwright/test'
import { baseURL } from '../utils'
import { Page } from 'playwright'

export const dashboard_page = async (page: Page) => {
  await page.goto(baseURL)
  await expect(page.getByText('Organics Info')).toBeVisible()
  await expect(page.getByAltText('Logo')).toBeVisible()
  await expect(page.getByRole('link', { name: 'Map Search' })).toBeVisible()
  await expect(page.getByRole('link', { name: 'Text Search' })).toBeVisible()
  await expect(page.getByRole('link', { name: 'Guidance' })).toBeVisible()
  await expect(page.getByRole('link', { name: 'Contact Us' })).toBeVisible()
  await expect(
    page.getByRole('heading', {
      name: 'Find an authorized compost and biosolid facility in British Columbia',
    }),
  ).toBeVisible()
  await expect(
    page.getByRole('button', { name: 'Search on a map' }),
  ).toBeVisible()
  await expect(
    page.getByRole('button', { name: 'List all authorizations' }),
  ).toBeVisible()

  await expect(
    page.getByRole('heading', {
      name: 'Organic Recycling in B.C.',
    }),
  ).toBeVisible()
  await expect(
    page.getByRole('heading', {
      name: 'The B.C. government has a plan to update the regulation to',
    }),
  ).toBeVisible()
  await expect(
    page.getByRole('link', { name: 'Project Update Report' }),
  ).toBeVisible()
  await expect(page.getByAltText('Information image')).toBeVisible()

  await expect(page.getByText('Learn more')).toBeVisible()
  await expect(
    page.getByRole('link', { name: 'Legislation', exact: true }),
  ).toBeVisible()
  await expect(
    page.getByRole('link', { name: 'Process and procedures', exact: true }),
  ).toBeVisible()
  await expect(
    page.getByRole('link', { name: 'Compliance and enforcement', exact: true }),
  ).toBeVisible()
}
