import { test, expect, Page } from '@playwright/test';
import {ModalPage} from '../pages/ModalPage';
import {MainPage} from '../pages/MainPage';

test.describe('Zara user journey: from cookie modal to registration', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('D-2 User accept all cookies', async ({ page }) => {
    const modalPage = new ModalPage(page);
    const mainPage = new MainPage(page);
    await modalPage.clickAcceptCookiesButton();
    await modalPage.clickGoButton();
    await mainPage.clickShoppingBagButton();
    expect(page.locator('div.zds-empty-state__title > span')).toBeVisible;
  });

  test('D-2 User rejects cookies', async ({ page }) => {
    const modalPage = new ModalPage(page);
    const mainPage = new MainPage(page);
    await modalPage.clickRejectCookiesButton();
    await modalPage.clickGoButton();
    await mainPage.clickShoppingBagButton();
    expect(page.locator('div.zds-empty-state__title > span')).toBeVisible;
  });
})