import { Page } from 'playwright';
import { expect } from '@playwright/test';
import { baseURL } from '../utils';

export const authorization_list_page = async (page: Page) => {
  await page.goto(baseURL);
  await page.getByRole('button', { name: 'List all authorizations' }).click();
  await expect(page.getByRole('heading', { name: 'Authorizations' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Authorized compost and' })).toBeVisible();
  await page.getByRole('button', { name: 'Filter by Facility Type' }).click();
  await expect(page.getByLabel('Notification')).toBeVisible();
  await expect(page.getByLabel('Permit')).toBeVisible();
  await expect(page.getByLabel('Approval')).toBeVisible();
  await expect(page.getByLabel('Operational Certificate')).toBeVisible();
  await expect(page.getByLabel('Notification')).toBeVisible();
  await page.getByLabel('Notification').check();
  await expect(page.getByLabel('Compost Production Facility')).toBeVisible();
  await expect(page.getByLabel('Land Application of Biosolids')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Reset Filters' })).toBeVisible();
  await page.getByLabel('Search Authorizations').click();
  await page.getByLabel('Search Authorizations').fill('victoria');
  await expect(page.getByText('Authorization #:17268')).toBeVisible();
  await expect(page.getByText('CITY OF VICTORIA')).toBeVisible();
  await expect(page.locator('#root')).toContainText('Notification');
};