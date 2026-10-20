import type { Page } from '@playwright/test';

export function loginLocators(page: Page) {
  return {
    username: page.getByTestId('username'),
    password: page.getByTestId('password'),
    loginButton: page.getByRole('button', { name: 'Login', exact: true }),
  };
}
