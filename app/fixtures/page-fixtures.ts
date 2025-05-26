import { test as base } from '../fixtures/stealth-fixtures';
import { CookieConsentPage } from '../pages/CookieConsentPage';
import { MainPage } from '../pages/MainPage';
import { CartPage } from '../pages/CartPage';
import { RegisterPage } from '../pages/RegisterPage';
import { PersonalDetailsPage } from '../pages/PersonalDetailsPage';
import { BasePage } from '../pages/BasePage';

type PageFixtures = {
    mainPageWithCookies: MainPage;
    cookieConsentPage: CookieConsentPage;
    cartPage: CartPage;
    registerPage: RegisterPage;
    personalDetailsPage: PersonalDetailsPage;
    basePage: BasePage;
};

export const test = base.extend<PageFixtures>({
    mainPageWithCookies: async ({ page }, use) => {
        const cookieConsentPage = new CookieConsentPage(page);
        await page.goto('/');
       // await cookieConsentPage.acceptCookies();
        await cookieConsentPage.goToStore();
        const mainPage = new MainPage(page);
        await use(mainPage);
    },

    cookieConsentPage: async ({ page }, use) => {
        await use(new CookieConsentPage(page));
    },

    cartPage: async ({ page }, use) => {
        await use(new CartPage(page));
    },

    basePage: async ({ page }, use) => {
        await use(new BasePage(page));
    },

    registerPage: async ({ page }, use) => {
        await use(new RegisterPage(page));
    },

    personalDetailsPage: async ({ page }, use) => {
        await use(new PersonalDetailsPage(page));
    },
});

export { expect } from '@playwright/test';