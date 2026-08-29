import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { env } from '../utils/env';

export class LoginPage extends BasePage {
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly rememberMeCheckbox: Locator;
  readonly loginButton: Locator;
  readonly forgotPasswordLink: Locator;
  readonly languageSelect: Locator;
  readonly pageHeading: Locator;
  readonly errorToast: Locator;

  constructor(page: Page) {
    super(page);
    this.emailInput = page.locator('#email');
    this.passwordInput = page.locator('#password');
    this.rememberMeCheckbox = page.locator('#remember');
    this.loginButton = page.getByRole('button', { name: 'Login' });
    this.forgotPasswordLink = page.getByRole('link', { name: 'Forgot Password?' });
    this.languageSelect = page.locator('select[name="language"]');
    this.pageHeading = page.getByRole('heading', { name: 'Please login' });
    this.errorToast = page.getByText('Invalid username or password');
  }

  async open(): Promise<void> {
    await this.goto(env.loginPath);
    await expect(this.pageHeading).toBeVisible();
  }

  async fillEmail(email: string): Promise<void> {
    await this.emailInput.fill(email);
  }

  async fillPassword(password: string): Promise<void> {
    await this.passwordInput.fill(password);
  }

  async submit(): Promise<void> {
    await this.loginButton.click();
  }

  async login(email: string, password: string, rememberMe = false): Promise<void> {
    await this.fillEmail(email);
    await this.fillPassword(password);
    if (rememberMe) {
      await this.rememberMeCheckbox.check();
    }
    await this.submit();
  }

  async expectLoginError(message = 'Invalid username or password'): Promise<void> {
    await expect(this.page.getByText(message)).toBeVisible();
  }

  async expectLoggedIn(): Promise<void> {
    await expect(this.page).not.toHaveURL(/\/authentication/);
    await expect(this.pageHeading).not.toBeVisible();
  }

  async expectRequiredFieldError(field: 'email' | 'password'): Promise<void> {
    const label = field === 'email' ? 'Email Address' : 'Password';
    await expect(this.page.getByText(`The ${label} field is required.`)).toBeVisible();
  }
}
