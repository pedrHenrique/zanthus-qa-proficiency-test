import { expect, type Page } from '@playwright/test';
import type { Product } from '../../data/test-data';
import { checkoutLocators } from '../pageObject/checkout.locators';

export class CheckoutPage {
  readonly locators;

  constructor(readonly page: Page) {
    this.locators = checkoutLocators(page);
  }

  async fillCustomer(customer: { firstName: string; lastName: string; postalCode: string }) {
    await this.locators.firstName.fill(customer.firstName);
    await this.locators.lastName.fill(customer.lastName);
    await this.locators.postalCode.fill(customer.postalCode);
    await this.locators.continueButton.click();
    await expect(this.page).toHaveURL(/\/checkout-step-two\.html$/);
    await expect(this.locators.title).toHaveText('Checkout: Overview');
  }

  async expectSingleProduct(product: Product) {
    await expect(this.locators.items).toHaveCount(1);
    await expect(this.locators.productName).toHaveText(product.name);
    await expect(this.locators.productPrice).toHaveText(product.price);
    await expect(this.locators.quantity).toHaveText('1');
  }
}
