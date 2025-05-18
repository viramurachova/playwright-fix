import { MainPage } from '../app/pages/MainPage';
import { CartPage } from '../app/pages/CartPage';
import { test } from '../app/fixtures/cookieFixture';

test.describe('Zara user journey: from cookie modal to registration', () => {

  test('TC-1 Search item by name and add all sizes', async ({ pageWithCookies, page }) => {
    const mainPage = new MainPage(pageWithCookies);
    const cartPage = new CartPage(page);
    const itemName = "Boots"
    const minSizes = 4


    await mainPage.clickSearchButton();
    await mainPage.fillSearchField(itemName);
    const added = await mainPage.addFirstItemWithEnoughSizes(minSizes);
    await mainPage.clickShoppingBagButton();
    await cartPage.cartMatchesAddedSizes(added);
  });

  test('TC-2 Remove every second item from shopping bag', async ({ pageWithCookies, page }) => {
    const mainPage = new MainPage(pageWithCookies);
    const cartPage = new CartPage(page);
    const itemName = "Dress"
    const minSizes = 6


    await mainPage.clickSearchButton();
    await mainPage.fillSearchField(itemName);

    const added = await mainPage.addFirstItemWithEnoughSizes(minSizes);
    await mainPage.clickShoppingBagButton();
    await cartPage.cartMatchesAddedSizes(added);
    await cartPage.removeEverySecondItem();
    await cartPage.clickContinueButton();
  });
});;