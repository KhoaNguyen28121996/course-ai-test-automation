import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { env } from '../utils/env';

test.describe('CRM Login - crm.anhtester.com', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.open();
  });

  test('login successfully with valid credentials', async () => {
    await loginPage.login(env.validEmail, env.validPassword);
    await loginPage.expectLoggedIn();
  });

  test('show error toast with invalid credentials', async () => {
    await loginPage.login(env.invalidEmail, env.invalidPassword);
    await loginPage.expectLoginError();
  });

  test('show error toast with valid email but wrong password', async () => {
    await loginPage.login(env.validEmail, env.invalidPassword);
    await loginPage.expectLoginError();
  });

  test('show required-field validation when submitting an empty form', async () => {
    await loginPage.submit();
    await loginPage.expectRequiredFieldError('email');
    await loginPage.expectRequiredFieldError('password');
  });

  test('show required-field validation when password is missing', async () => {
    await loginPage.fillEmail(env.validEmail);
    await loginPage.submit();
    await loginPage.expectRequiredFieldError('password');
  });

  test('remember me checkbox can be checked before login', async () => {
    await loginPage.login(env.validEmail, env.validPassword, true);
    await loginPage.expectLoggedIn();
  });
});
