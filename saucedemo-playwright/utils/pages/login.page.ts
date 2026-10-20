import { expect, type Page } from '@playwright/test';
import { loginLocators } from '../pageObject/login.locators';

export class LoginPage {
  readonly locators;

  constructor(readonly page: Page) {
    this.locators = loginLocators(page);
  }

  async open() {
    await this.page.goto('/');
    await expect(this.locators.username).toBeVisible();
    await expect(this.locators.loginButton).toBeEnabled();
  }

  async signIn(user: { username: string; password: string }) {
    await this.locators.username.fill(user.username);
    await this.locators.password.fill(user.password);
    await this.locators.loginButton.click();
  }
}
