import { test, expect } from '@playwright/test';
import { baseURL } from '../utils';
import { Page } from 'playwright';

export const dashboard_page = async (page: Page) => {
  await page.goto(baseURL);
  await expect(page.getByText('Organics Info')).toBeVisible();
  await expect(page.getByRole('link', { name: 'Logo' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Text Search' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Contact Us' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Compost and Biosolids' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Find an authorized compost' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'List all authorizations' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Legislation' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Process and procedures' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Compliance and enforcement' })).toBeVisible();
  await expect(page.locator('.MuiCardContent-root > .MuiCardMedia-root').first()).toBeVisible();
  await expect(page.locator('div:nth-child(2) > .MuiPaper-root > .MuiCardContent-root > .MuiCardMedia-root')).toBeVisible();
  await expect(page.locator('div:nth-child(3) > .MuiPaper-root > .MuiCardContent-root > .MuiCardMedia-root')).toBeVisible();
};