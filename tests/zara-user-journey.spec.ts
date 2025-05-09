import { test, expect } from '@playwright/test';
import { getStorageState } from '../helper/storageState';
import { MainPage } from '../pages/MainPage';

test.describe('Zara user journey: from cookie modal to registration', () => {
  test.use({
    storageState: getStorageState('authenticated'),
  });

  test.beforeEach(async ({ page }) => {
    await page.goto('/'); 
  });

  test('D-1 Search boots and add all sizes', async ({ page }) => {
    const mainPage = new MainPage(page);
    
    await mainPage.clickSearchButton();
    await mainPage.fillSearchField();
    await mainPage.addFirstItemWithEnoughSizes(4);

  });
});
