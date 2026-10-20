import { expect, type Page } from '@playwright/test';
import type { Product } from '../../data/test-data';
import { inventoryLocators } from '../pageObject/inventory.locators';

export class InventoryPage {
  readonly locators;

  constructor(readonly page: Page) {
    this.locators = inventoryLocators(page);
  }

  async expectLoaded() {
    // Aguarda a URL e o conteúdo, sem sleep ou waitForTimeout.
    await expect(this.page).toHaveURL(/\/inventory\.html$/);
    await expect(this.locators.title).toHaveText('Products');
    await expect(this.locators.items.first()).toBeVisible();
  }

  async sortByLowestPrice() {
    await this.locators.sortSelect.selectOption('lohi');
    await expect(this.locators.sortSelect).toHaveValue('lohi');
  }

  async expectProduct(product: Product) {
    await expect(this.locators.productCard(product.name)).toHaveCount(1);
    await expect(this.locators.productName(product.name)).toHaveText(product.name);
    await expect(this.locators.productPrice(product.name)).toHaveText(product.price);
  }

  async addToCart(product: Product) {
    // click espera automaticamente o botão ficar visível, estável e habilitado.
    await this.locators.addButton(product.name).click();
    await expect(this.locators.removeButton(product.name)).toBeVisible();
    // A assertion repete a consulta até o contador refletir o estado esperado.
    await expect(this.locators.cartBadge).toHaveText('1');
  }

  async openCart() {
    await this.locators.cartLink.click();
    await expect(this.page).toHaveURL(/\/cart\.html$/);
  }
}
