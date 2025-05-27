import { test as base } from '../fixtures/stealth-fixtures';
import { CookieConsentPage } from '../pages/CookieConsentPage';
import { MainPage } from '../pages/MainPage';
import { CartPage } from '../pages/CartPage';
import { RegisterPage } from '../pages/RegisterPage';
import { PersonalDetailsPage } from '../pages/PersonalDetailsPage';
import { BasePage } from '../pages/BasePage';

type PageFixtures = {
    basePageWithCookies: BasePage;
    cookieConsentPage: CookieConsentPage;
    cartPage: CartPage;
    registerPage: RegisterPage;
    personalDetailsPage: PersonalDetailsPage;
    mainPage: MainPage;
    basePage: BasePage
};

export const test = base.extend<PageFixtures>({
    basePageWithCookies: async ({ page }, use) => {
        const cookieConsentPage = new CookieConsentPage(page);
        await page.goto('ua/en');
       // await cookieConsentPage.acceptCookies();
        await cookieConsentPage.goToStore();
        const basePage = new BasePage(page);
        await use(basePage);
    },

    basePage: async ({ page }, use) => {
        const basePage = new BasePage(page);
        await use(basePage);
      },

    cookieConsentPage: async ({ page }, use) => {
        await use(new CookieConsentPage(page));
    },

    cartPage: async ({ page }, use) => {
        await use(new CartPage(page));
    },

    mainPage: async ({ page }, use) => {
        await use(new MainPage(page));
    },

    registerPage: async ({ page }, use) => {
        await use(new RegisterPage(page));
    },

    personalDetailsPage: async ({ page }, use) => {
        await use(new PersonalDetailsPage(page));
    },
});

export { expect } from '@playwright/test';