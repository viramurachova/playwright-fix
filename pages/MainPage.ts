import { Page, Locator } from '@playwright/test';

export class MainPage {
    page: Page;
    searchButton: Locator;
    shoppingBagButton: Locator;
    searchInputField: Locator;
    searchResult: Locator;
    sizeSelector: Locator;
    sizeInStockLocator:Locator;
    filtersLocator: Locator;
    imageLocator: Locator;
    productName: Locator;
    closeButton: Locator;
    logInLink: Locator;

    constructor (page:Page){
        this.page = page;
        this.searchButton = this.page.locator('.layout-header-action-search__content.link');
        this.searchInputField = this.page.locator('#search-home-form-combo-input');
        this.searchResult = this.page.locator('[data-qa-qualifier="media-image"]');  
        this.shoppingBagButton = this.page.locator('[data-qa-id="layout-header-go-to-cart"]');
        this.sizeSelector = this.page.locator('[data-qa-action="product-grid-open-size-selector"]')
        this.sizeInStockLocator = this.page.locator('[data-qa-action="size-in-stock"]')
        this.filtersLocator = this.page.locator('#filters-text')
        this.imageLocator = this.page.locator('img[data-qa-qualifier="media-image"]');
        this.productName = this.page.locator('.product-grid-product-info__main-info');
        this.closeButton = this.page.locator('[aria-label="close"]');
        this.logInLink = this.page.locator('[data-qa-id="layout-header-user-logon"]')
    }
    async clickFiltersButton(){
        await this.filtersLocator.waitFor({state: 'visible', timeout: 10000});
        await this.filtersLocator.click();
    }

    async clickSearchButton(){
        await this.searchButton.click();
    }

    async fillSearchField(){
        await this.searchInputField.click();
        await this.page.keyboard.type('boots');
        await this.page.keyboard.press('Enter');
        await this.searchResult.first().waitFor({state: 'visible', timeout: 10000});
    }

    async clickShoppingBagButton(){
         await this.shoppingBagButton.click();
    }

    async clickLoginLink(){
        await this.logInLink.click();
    }

    async clickFirstSearchResult(){
        await this.searchResult.first().click();
    }

    async getProductNameByIndex(index: number): Promise<string>{
        return ((await this.productName.nth(index).innerText()).trim());
    }
    async clickImageLocator(){
        await this.imageLocator.click();
    }

    async addFirstItemWithEnoughSizes(minSizes: number): Promise<{ sizes: string[]; productName: string }> {
    const totalItems = await this.sizeSelector.count();
  
    for (let i = 0; i < totalItems; i++) {
      // Відкрити SizeSelector для поточного айтема
      await this.sizeSelector.nth(i).waitFor({ state: 'visible', timeout: 5000 });
      await this.sizeSelector.nth(i).click();
  
      // Дочекатися, поки зʼявляться доступні розміри
      await this.sizeInStockLocator.first().waitFor({ state: 'visible', timeout: 5000 });
      const count = await this.sizeInStockLocator.count();
      console.log(`Item ${i + 1} has ${count} available sizes`);
  
      // Якщо кількість доступних розмірів >= minSizes — додаємо всі до корзини
      if (count >= minSizes) {
        const rawProductName = await this.getProductNameByIndex(i);
        const productName  = rawProductName.split('\n')[0].trim();
        const clickedSizes: string[] = [];
  
        for (let j = 0; j < count; j++) {
          const sizeLocator = this.sizeInStockLocator.nth(j);
          const sizeText = await sizeLocator.innerText();
  
          await sizeLocator.click();
          await this.closeButton.waitFor({ state: 'visible', timeout: 3000 });
          await this.closeButton.click();
  
          clickedSizes.push(sizeText.trim());
  
          if (j === count - 1) break; // Зупинити цикл після останнього розміру
  
          // Відкрити селектор + знову для наступного кліку
          await this.sizeSelector.nth(i).click();
          await this.sizeInStockLocator.first().waitFor({ state: 'visible', timeout: 5000 });
        }
  
        console.log('Final added item:', { productName, clickedSizes });
        return { sizes: clickedSizes, productName };
      }
  
      // Якщо не відповідає умові — переходимо до наступного айтема
    }
  
    throw new Error('No item found with at least ${minSizes} available sizes');
  }}