import { test } from '@playwright/test';
import { dashboard_page } from './pages/dashboard';
import { authorization_list_page } from './pages/auth.list';
import { authorization_details_page } from './pages/auth.details';

test.describe.parallel('Organics Info', () => {
  test('Dashboard Page', async ({ page }) => {
    await dashboard_page(page);
  });
  test('Authorization List', async ({ page }) => {
    await authorization_list_page(page);
  });
  test('Authorization Details', async ({ page }) => {
    await authorization_details_page(page);
  });
});
