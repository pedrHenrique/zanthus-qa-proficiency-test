import type { Page } from '@playwright/test';

export function inventoryLocators(page: Page) {
  // O nome exato identifica qual card deve receber a ação.
  const productCard = (name: string) => page.getByTestId('inventory-item').filter({
    has: page.getByText(name, { exact: true }),
  });

  return {
    title: page.getByTestId('title'),
    items: page.getByTestId('inventory-item'),
    cartBadge: page.getByTestId('shopping-cart-badge'),
    cartLink: page.getByTestId('shopping-cart-link'),
    sortSelect: page.getByTestId('product-sort-container'),
    productCard,
    productName: (name: string) => productCard(name).getByTestId('inventory-item-name'),
    productPrice: (name: string) => productCard(name).getByTestId('inventory-item-price'),
    addButton: (name: string) => productCard(name).getByRole('button', { name: 'Add to cart', exact: true }),
    removeButton: (name: string) => productCard(name).getByRole('button', { name: 'Remove', exact: true }),
  };
}
