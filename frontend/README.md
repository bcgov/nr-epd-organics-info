# Organics Info Frontend

Refer to the project README file in the parent directory for details 
on the architecture, libraries, and how to run the whole application.

The information in this README file will be specific to the frontend only.

## Scripts

See the `scripts` section of the `frontend/package.json` file to see 
what command line scripts can be run. The most used ones are:
- `npm start` - Starts the local application
- `npm run dev` - Starts the app with network support
- `npm run lint` - Runs the eslint to check for linting issues
- `npm run tsc` - Runs the typescript checker for typing issues
- `npm run test:unit` - Runs unit tests in watch mode
- `npm run test:cov` - Runs unit tests and generates coverage report
- `npm run test-e2e` - Runs Playwright end to end tests

There is also a `scripts` folder that contains other utility scripts 
that can be run. See the README file in that directory for more details.

## Tests - Playwright and Testing Library

The [Playwright](https://playwright.dev/) library is used for End to End tests.
It requires the backend server and front end client to be running.

[Vitest](https://vitest.dev/) is used for the unit tests, along with 
[React Testing Library](https://testing-library.com/). 
[MSW](https://mswjs.io/) is also used for mocking the 3 API calls.
Unit tests run using jsdom, which is not the same as a full functioning browser,
and as such some features don't work and need to be mocked.
See the `src/test-setup.ts` file for more details.

### Running End To End Tests

**End to end** tests are run using [Playwright](https://playwright.dev/).
Here are the steps to follow to run the end to end tests:
1. First install Playwright: `npx playwright install`
2. Then run start the server and frontend as shown above in steps 1-4.
3. Run Playwright with this command: `npx playwright test` or `npm run test:e2e`

To configure playwright edit the `playwright.config.ts` file.
End to end tests are located in the `/e2e` folder.

It is also really useful to run the `npx playwright test --ui` command if you
want to debug why a test is failing, or to run certain tests on specific browsers.

### Running Unit Tests

**Unit tests** do not require the server or frontend to be running.
You can run the unit tests with this command: `npm run test:unit`
To generate a coverage report, use this command: `npm run test:cov`
The coverage report can be viewed in the `coverage` folder.
Unit tests use [MSW](https://mswjs.io/) to mock API responses, see the
`src/test-setup.ts` file where it is set up.

## Application Styles - Figma, MUI and CSS

The [Figma design](https://www.figma.com/design/74nNxjyv6JM6hiT1FluULV/OMRR-(ORI)?node-id=675-3797)
for this application is the source of truth for the text and styles used.

This application uses a combination of [Material UI](https://mui.com/) components,
custom React components, and CSS stylesheets.

Material UI is convenient and very helpful for making the application
responsive to different screen sizes. Therefore, MUI components are often
used whenever styles need to change based on the screen size using the
`sx` or `style` attributes. See the MUI 
[Responsive UI](https://mui.com/material-ui/guides/responsive-ui/)
page for more details on how it works.

Basic styling that don't need to change with screen size (for example
colors) is handled with plain CSS files.

[CSS Variables](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)
(also called custom properties) are used quite frequently to define
color and layout constants. These come directly from the Figma file
and makes it easy to copy styles directly from Figma. 
All the custom properties can be found in the `src/properties.css` file.

## Application State - Redux

The application state is stored in 
[Redux](https://redux.js.org/tutorials/essentials/part-1-overview-concepts).

The state is divided into 4 slices:
- **omrr-slice** - Stores the array of authorizations and all search filters, 
and has the API call for loading authorizations. 
- **applications-slice** - Stores the array of applications
- **documents-slice** - Stores the array of documents
- **map-slice** - Stores all the map related state including selected item, 
sidebar width, etc.

Each slice defines selectors and hooks to allow extracting each piece of state
in the most efficient way.

It also contains the action functions for changing the state.
