import { test as base, Browser, BrowserContext, Page } from '@playwright/test';
import { chromium } from 'playwright-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';

chromium.use(StealthPlugin());

type StealthFixtures = {
    browser: Browser;
    context: BrowserContext;
    page: Page;
};

export const test = base.extend<StealthFixtures>({
    browser: async ({ }, use) => {
        const browser = await chromium.launch({ headless: true });
        await use(browser);
        await browser.close();
    },

    context: async ({ browser }, use) => {
        const context = await browser.newContext({
            viewport: { width: 1280, height: 720 },
            ignoreHTTPSErrors: true,
        });
        await use(context);
        await context.close();
    },

    page: async ({ context }, use) => {
        const page = await context.newPage();
        await use(page);
    },
});

export { expect } from '@playwright/test';