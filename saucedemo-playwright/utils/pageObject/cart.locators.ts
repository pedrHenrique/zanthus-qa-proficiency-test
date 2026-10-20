import type { Page } from '@playwright/test';

export function cartLocators(page: Page) {
  const items = page.getByTestId('inventory-item');

  return {
    title: page.getByTestId('title'),
    items,
    productName: items.getByTestId('inventory-item-name'),
    productPrice: items.getByTestId('inventory-item-price'),
    quantity: items.getByTestId('item-quantity'),
    checkoutButton: page.getByRole('button', { name: 'Checkout', exact: true }),
  };
}
