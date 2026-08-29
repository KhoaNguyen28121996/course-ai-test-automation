# CRM Login Automation

Playwright + TypeScript automation framework for testing the login flow of the Perfex CRM demo at [crm.anhtester.com](https://crm.anhtester.com/authentication).

## Structure

```
pages/            Page Object Model classes (BasePage, LoginPage)
tests/            Test specs (login.spec.ts)
utils/env.ts      Typed access to environment variables
playwright.config.ts
.env.example      Template for required environment variables
```

## Setup

```bash
npm install
npx playwright install --with-deps
cp .env.example .env   # then fill in real credentials
```

## Running tests

```bash
npm test              # run all tests, all browsers
npm run test:headed   # run with a visible browser
npm run test:ui       # Playwright UI mode
npm run test:debug    # step-through debugger
npm run report        # open the last HTML report
```

## Environment variables (`.env`)

| Variable          | Description                              |
|-------------------|-------------------------------------------|
| `BASE_URL`        | CRM base URL                              |
| `LOGIN_PATH`      | Path to the login page                    |
| `VALID_EMAIL`     | Email of an account that can log in       |
| `VALID_PASSWORD`  | Password for `VALID_EMAIL`                |
| `INVALID_EMAIL`   | Any non-existent email, for negative tests|
| `INVALID_PASSWORD`| Any wrong password, for negative tests    |

`.env` is gitignored — never commit real credentials.

## Test coverage

- Successful login with valid credentials
- Invalid email/password combinations
- Valid email with wrong password
- Required-field validation on empty submit
- "Remember me" checkbox flow

## Notes

`VALID_EMAIL` / `VALID_PASSWORD` must point to an account that currently works on the demo instance — the demo site's data can be reset periodically, so update `.env` if the login tests start failing with a redirect back to the login page.
