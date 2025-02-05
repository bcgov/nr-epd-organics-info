import { expect } from '@playwright/test'
import { baseURL } from '../utils'
import { Page } from 'playwright'

export const dashboard_page = async (page: Page) => {
  await page.goto(baseURL)
  await expect(page.getByAltText('Logo')).toBeVisible()
  await expect(page.getByRole('link', { name: 'Map Search' })).toBeVisible()
  await expect(page.getByRole('link', { name: 'Text Search' })).toBeVisible()
  await expect(page.getByRole('link', { name: 'Guidance' })).toBeVisible()
  await expect(page.getByRole('link', { name: 'Contact Us' })).toBeVisible()

  // Top Section
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

  // Info Section
  await expect(
    page.getByRole('heading', { name: 'Who is this for' }),
  ).toBeVisible()
  await expect(page.getByText('I am a member of the public')).toBeVisible()
  await expect(page.getByText('I am an industry professional')).toBeVisible()
  await expect(page.getByText('I am an organization')).toBeVisible()
  await expect(page.getByAltText('Information image')).toBeVisible()

  // Use This Tool Section
  await expect(
    page.getByRole('heading', { name: 'Why use this tool' }),
  ).toBeVisible()
  await expect(page.getByAltText('Water Drop')).toBeVisible()
  await expect(page.getByAltText('Leaves')).toBeVisible()
  await expect(page.getByAltText('Cloud')).toBeVisible()
  await expect(page.getByAltText('Chat')).toBeVisible()
  await expect(page.getByAltText('Transport')).toBeVisible()
  await expect(page.getByAltText('Calendar')).toBeVisible()
  await expect(
    page.getByText('Organic Matter Recycling Regulation'),
  ).toBeVisible()

  // Learn More Section
  await expect(
    page.getByRole('heading', { name: 'More resources' }),
  ).toBeVisible()
  await expect(page.getByRole('link', { name: 'Legislation' })).toBeVisible()
  await expect(
    page.getByRole('link', { name: 'Process and procedures' }),
  ).toBeVisible()
  await expect(
    page.getByRole('link', { name: 'Compliance and enforcement' }),
  ).toBeVisible()
  await expect(
    page.getByText('Authorization application process'),
  ).toBeVisible()
}
