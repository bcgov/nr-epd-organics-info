import { type Page } from '@playwright/test'
import { fileURLToPath } from 'node:url'

/**
 * Local e2e data source.
 *
 * The OMRR API data is public (https://organicsinfo.gov.bc.ca/api/omrr). A
 * snapshot is committed under ./*.json so the Playwright suite can run against
 * a local dev build with no backend or network access. The same specs run
 * unchanged in CI against the deployed environment (see E2E_BASE_URL).
 */
const fixturePath = (name: string): string =>
  fileURLToPath(new URL(`./${name}`, import.meta.url))

const routes: Record<string, string> = {
  '**/api/omrr': 'omrr.json',
  '**/api/omrr/application-status': 'omrr-application-status.json',
  '**/api/omrr/authorization-docs': 'omrr-authorization-docs.json',
}

/**
 * Intercept the OMRR API endpoints and respond with the committed JSON
 * fixtures. Call this before navigating in a test (e.g. in `beforeEach`).
 */
export async function mockOmrrApi(page: Page): Promise<void> {
  for (const [pattern, file] of Object.entries(routes)) {
    await page.route(pattern, (route) =>
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        path: fixturePath(file),
      }),
    )
  }
}
