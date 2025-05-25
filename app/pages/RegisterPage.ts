import { Page, Locator } from '@playwright/test';

export class RegisterPage {
  page: Page;
  logInButton: Locator;
  registerButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.registerButton = this.page.locator('[data-qa-id="logon-view-alternate-button"]');
    this.logInButton = this.page.locator('[data-qa-id="oauth-logon-button"]')
  }

  async clickRegisterButton() {
    await this.registerButton.click();
  }

  async clickLogInButton() {
    await this.logInButton.click();
  }
}