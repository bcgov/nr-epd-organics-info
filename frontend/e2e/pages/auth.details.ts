import { Page } from 'playwright';
import { expect } from '@playwright/test';
import { baseURL } from '../utils';

export const authorization_details_page = async (page: Page) => {
  await page.goto(`${baseURL}`);
  await page.getByTestId('list_all_authorizations').click();
  await page.getByTestId('auth-list-search-authorizations-textfield').click();
  await page.getByLabel('Search Authorizations').fill('12398');
  await page.getByTestId('auth-list-view-facility-details-button-12398').click();
  await expect(page.getByTestId('auth-details-auth-status')).toContainText('Authorization Status');
  await expect(page.getByTestId('auth-details-auth-status-value').locator('span')).toContainText('Active');
  await expect(page.getByTestId('auth-details-auth-number')).toContainText('Authorization Number');
  await expect(page.getByTestId('auth-details-auth-number-value')).toContainText('12398');
  await expect(page.getByTestId('auth-details-effactive-date')).toContainText('Effective/Issue Date');
  await expect(page.getByTestId('auth-details-effactive-date-value')).toContainText('1994-08-02');
  await expect(page.getByTestId('auth-details-last-ammendment-date')).toContainText('Last Amendment Date');
  await expect(page.getByTestId('auth-details-last-ammendment-date-value')).toContainText('2020-08-18');

  await expect(page.getByTestId('auth-details-back-to-search')).toBeVisible();
  await expect(page.getByText('CONSOLIDATED ENVIROWASTE')).toBeVisible();
  await expect(page.getByText('Huntingdon Road Abbotsford, BC')).toBeVisible();
  await expect(page.getByText('49.017')).toBeVisible();
  await expect(page.getByText('-122.4547')).toBeVisible();
  await expect(page.locator('#root')).toContainText('1994-08-02');
  await expect(page.locator('#root')).toContainText('2020-08-18');
  await expect(page.locator('#root')).toContainText('Permit');
  await expect(page.locator('#root')).toContainText('Schedule 2 - Composting Operations');
};
