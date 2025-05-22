import { Page, Locator, expect } from '@playwright/test';

export class PersonalDetailsPage {
page: Page;
emailField: Locator;
passwordField: Locator;
nameField: Locator;
surnameField: Locator;
preferredLanguage: Locator;
newsLetterCheck: Locator;
createAccountButton: Locator;
errorMessage: Locator;
inputNameText: Locator;
phoneNumberInputField: Locator;
privacyCheck: Locator;


constructor(page: Page) {
    this.page = page;
    this.emailField = this.page.locator('[data-qa-input-qualifier="email"]');
    this.passwordField = this.page.locator('[data-qa-input-qualifier="password"]');
    this.nameField = this.page.locator('[data-qa-input-qualifier="firstName"]');
    this.surnameField = this.page.locator('[data-qa-input-qualifier="lastName"]');
    this.preferredLanguage = this.page.locator('[data-qa-input-qualifier="preferredLanguage"]');
    this.newsLetterCheck = this.page.locator('[data-qa-input-qualifier="newsletterCheck"]');
    this.privacyCheck = this.page.locator('[data-qa-input-qualifier="privacyCheck"]');
    this.createAccountButton = this.page.locator('[data-qa-action="sign-up-submit"]');
    this.inputNameText = this.page.locator('.screen-reader-text');
    this.errorMessage = this.page.locator('.form-input-error');
}

async checkPrivacyCheckbox() {
    await this.privacyCheck.click({ force: true });

}

async getErrorMessage() {
    const fullText = await this.errorMessage.innerText();
    const labelText = await this.inputNameText.first().innerText();
    return fullText.replace(labelText, '').trim();
  }

async clickCreateAccountButton() {
        await this.createAccountButton.click();
    }    
}

