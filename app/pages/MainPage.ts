import { Page, Locator } from '@playwright/test';

export class MainPage {
  page: Page;
  searchButton: Locator;
  shoppingBagButton: Locator;
  searchInputField: Locator;
  searchResult: Locator;
  sizeSelector: Locator;
  sizeInStockLocator: Locator;
  filtersLocator: Locator;
  imageLocator: Locator;
  productName: Locator;
  closeButton: Locator;
  logInLink: Locator;
  continueButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchButton = this.page.locator('[data-qa-id="header-search-text-link"]');
    this.searchInputField = this.page.locator('[id="search-home-form-combo-input"]');
    this.searchResult = this.page.locator('[data-qa-qualifier="media-image"]');
    this.shoppingBagButton = this.page.locator('[data-qa-id="layout-header-go-to-cart"]');
    this.sizeSelector = this.page.locator('[data-qa-action="product-grid-open-size-selector"]')
    this.sizeInStockLocator = this.page.locator('[data-qa-action]:is([data-qa-action="size-in-stock"], [data-qa-action="size-low-on-stock"])')
    this.filtersLocator = this.page.locator('#filters-text')
    this.imageLocator = this.page.locator('img[data-qa-qualifier="media-image"]');
    this.productName = this.page.locator('.product-grid-product-info__main-info');
    this.closeButton = this.page.locator('[aria-label="close"]');
    this.logInLink = this.page.locator('[data-qa-id="layout-header-user-logon"]')
    this.continueButton = page.locator('[data-qa-id="shop-continue"]');
  }
  async clickFiltersButton() {
    await this.filtersLocator.waitFor({ state: 'visible', timeout: 10000 });
    await this.filtersLocator.click();
  }

  async clickSearchButton() {
    await this.searchButton.click();
  }

  async fillSearchField(itemName: string): Promise<void> {
    await this.searchInputField.click();
    await this.page.keyboard.type(itemName);
    await this.page.keyboard.press('Enter');
    await this.imageLocator.first().waitFor({ state: 'visible', timeout: 10000 });
  }

  async clickShoppingBagButton() {
    await this.shoppingBagButton.waitFor({ state: 'visible', timeout: 10000 });
    await this.shoppingBagButton.click();
  }

  async clickLoginLink() {
    await this.logInLink.click();
  }

  async clickFirstSearchResult() {
    await this.searchResult.first().click();
  }

  async getProductNameByIndex(index: number): Promise<string> {
    return ((await this.productName.nth(index).innerText()).trim());
  }
  async clickImageLocator() {
    await this.imageLocator.click();
  }

  async clickContinueButton(): Promise<void> {
    await this.continueButton.waitFor({ state: 'visible', timeout: 10000 });
    await this.continueButton.click();
  }

  async addFirstItemWithEnoughSizes(minSizes: number): Promise<{ sizes: string[]; productName: string }> {
    const totalItems = await this.sizeSelector.count();

    for (let i = 0; i < totalItems; i++) {
      await this.sizeSelector.nth(i).waitFor({ state: 'visible', timeout: 5000 });
      await this.sizeSelector.nth(i).click();

      await this.sizeInStockLocator.first().waitFor({ state: 'visible', timeout: 5000 });
      const count = await this.sizeInStockLocator.count();
      console.log(`Item ${i + 1} has ${count} available sizes`);

      if (count >= minSizes) {
        const rawProductName = await this.getProductNameByIndex(i);
        const productName = rawProductName.split('\n')[0].trim();
        const clickedSizes: string[] = [];

        for (let j = 0; j < count; j++) {
          const sizeLocator = this.sizeInStockLocator.nth(j);
          const sizeText = await sizeLocator.innerText();

          await sizeLocator.click();

          await this.closeButton.waitFor({ state: 'visible', timeout: 3000 });
          await this.closeButton.click();

          const cleanSize = sizeText.trim().split(/\s+/)[0];
          clickedSizes.push(cleanSize);

          if (j === count - 1) break;

          await this.sizeSelector.nth(i).click();
        }

        console.log('Final added item:', { productName, clickedSizes });
        return { sizes: clickedSizes, productName };
      }
    }

    throw new Error(`No item found with at least ${minSizes} available sizes`);
  }
}