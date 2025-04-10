import { test } from '@playwright/test'
import { dashboard_page } from './pages/dashboard'
import { authorization_list_page } from './pages/auth.list'
import { authorization_details_page } from './pages/auth.details'
import { map_page } from './pages/map'

test.setTimeout(30000) // Set timeout to 30 seconds

test.describe.parallel('Organics Info', () => {
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
