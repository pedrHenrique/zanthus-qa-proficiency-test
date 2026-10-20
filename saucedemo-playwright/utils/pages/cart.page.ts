import { expect, type Page } from '@playwright/test';
import type { Product } from '../../data/test-data';
import { cartLocators } from '../pageObject/cart.locators';

export class CartPage {
  readonly locators;

  constructor(readonly page: Page) {
    this.locators = cartLocators(page);
  }

  async expectSingleProduct(product: Product) {
    await expect(this.locators.title).toHaveText('Your Cart');
    await expect(this.locators.items).toHaveCount(1);
    await expect(this.locators.productName).toHaveText(product.name);
    await expect(this.locators.productPrice).toHaveText(product.price);
    await expect(this.locators.quantity).toHaveText('1');
  }

  async checkout() {
    await this.locators.checkoutButton.click();
    await expect(this.page).toHaveURL(/\/checkout-step-one\.html$/);
    await expect(this.locators.title).toHaveText('Checkout: Your Information');
  }
}
