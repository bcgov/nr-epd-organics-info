import { test } from '@playwright/test'
import { dashboard_page } from './pages/dashboard'
import { authorization_list_page } from './pages/auth.list'
import { authorization_details_page } from './pages/auth.details'
import { map_page } from './pages/map'
import { mockOmrrApi } from './fixtures/mock-api'

test.setTimeout(30000) // Set timeout to 30 seconds

test.describe.parallel('Organics Info', () => {
  test.beforeEach(async ({ page }) => {
    // Locally, serve the committed public OMRR API snapshot so the suite runs
    // against a local dev build with no backend. In CI (E2E_BASE_URL set) the
    // specs hit the deployed environment instead.
    if (!process.env.E2E_BASE_URL) {
      await mockOmrrApi(page)
    }
  })

  test('Dashboard Page', async ({ page }) => {
    await dashboard_page(page)
  })
  test('Authorization List', async ({ page }) => {
    await authorization_list_page(page)
  })
  test('Authorization Details', async ({ page }) => {
    await authorization_details_page(page)
  })
  test('Map View', async ({ page }) => {
    await map_page(page)
  })
})
