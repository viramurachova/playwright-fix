import { Page, Locator, expect } from '@playwright/test';

export class CartPage {
  page: Page;
  removeButton: Locator;
  productName: Locator;
  sizeName: Locator;
  itemId: Locator;
  continueButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.removeButton = this.page.locator('[data-qa-action="remove-order-item"]');
    this.productName = this.page.locator('.shop-cart-item-header__description--product-name a');
    this.sizeName = this.page.locator('span.shop-cart-item-details-base__size');
    this.itemId = this.page.locator('[data-qa-order-item-id]')
    this.continueButton = page.locator('[data-qa-id="shop-continue"]');
  }

  async getProductNameByIndex(index: number): Promise<string> {
    return (await this.productName.nth(index).innerText()).trim();
  }
  async getSizeByIndex(index: number): Promise<string> {
    return (await this.sizeName.nth(index).innerText()).trim();
  }

  async getCartItems(): Promise<{ product: string; size: string }[]> {
    await this.page.locator('.shop-cart-item').first().waitFor({ state: 'visible', timeout: 5000 });
    const cartItems: { product: string; size: string }[] = [];
    const count = await this.productName.count();

    for (let i = 0; i < count; i++) {
      const product = await this.getProductNameByIndex(i);
      const size = await this.getSizeByIndex(i);
      const item = { product, size };

      console.log(`Cart item [${i}]:`, item);
      cartItems.push(item);
    }

    console.log('Final cartItems array:', cartItems);

    return cartItems;
  }

  async getCartItemIds(): Promise<string[]> {
    const ids = await this.itemId.evaluateAll((elements) =>
      elements.map((el) => el.getAttribute('data-qa-order-item-id') || '')
    );

    console.log('Collected cart item IDs:', ids);
    return ids;
  }

  async getAllProductSizes(): Promise<string[]> {
    await this.sizeName.first().waitFor({ state: 'visible', timeout: 5000 });
    const count = await this.sizeName.count();
    const sizes: string[] = [];

    for (let i = 0; i < count; i++) {
      sizes.push((await this.sizeName.nth(i).innerText()).trim());
    }
    console.log('Sizes in bag:', sizes);
    return sizes;
  }

  async cartMatchesAddedSizes(expected: { productName: string; sizes: string[] }) {
    const cartItems = await this.getCartItems();

    console.log('Expected product:', expected.productName);
    console.log('Expected sizes:', expected.sizes);
    console.log('Actual cart items:', cartItems);

    expect(cartItems.length).toBe(expected.sizes.length);

    for (const item of cartItems) {
      console.log(`Checking item in cart:`, item);

      expect(item.product).toBe(expected.productName);
      expect(expected.sizes).toContain(item.size);
    }

    const cartSizes = cartItems.map(item => item.size).sort();
    const expectedSizes = [...expected.sizes].sort();

    expect(cartSizes).toEqual(expectedSizes);

    console.log('Cart matches expected product name and sizes exactly.');
  }
  async removeEverySecondItem(): Promise<void> {
    const orderIds = await this.getAllOrderIds();
    console.log('Order IDs in cart:', orderIds);

    const itemsToRemove: string[] = [];
    for (let i = 0; i < orderIds.length; i++) {
      if (i % 2 !== 0) {
        itemsToRemove.push(orderIds[i]);
      }
    }
    console.log('Order IDs to remove:', itemsToRemove);

    for (const orderId of itemsToRemove) {
      console.log(`Removing product with Order ID: ${orderId}`);

      const deleteButtonByID = this.page.locator(`[data-qa-order-item-id="${orderId}"]`);
      const deleteButton = deleteButtonByID.locator('[data-qa-action="remove-order-item"]')
      await deleteButtonByID.scrollIntoViewIfNeeded();
      await deleteButtonByID.hover();
      await deleteButton.click({ force: true });

      console.log(`Clicked removeButton for Order ID: ${orderId}`);
      await deleteButtonByID.waitFor({ state: 'detached', timeout: 7000 });
    }

    const remainingOrderIds = await this.getAllOrderIds();
    console.log('Remaining Order IDs after removal:', remainingOrderIds);

    const expectedRemainingItems = orderIds.filter(id => !itemsToRemove.includes(id));
    console.log('Expected remaining Order IDs:', expectedRemainingItems);

    expect(remainingOrderIds).toEqual(expectedRemainingItems);
  }

  async getAllOrderIds(): Promise<string[]> {
    const orderIdLocators = this.page.locator('[data-qa-order-item-id]');
    const count = await orderIdLocators.count();
    const orderIds: string[] = [];

    for (let i = 0; i < count; i++) {
      const orderId = await orderIdLocators.nth(i).getAttribute('data-qa-order-item-id');
      orderIds.push(orderId!);
    }

    return orderIds;
  }

  async clickContinueButton(): Promise<void> {
    await this.continueButton.waitFor({ state: 'visible', timeout: 10000 });
    await this.continueButton.click();
  }
}