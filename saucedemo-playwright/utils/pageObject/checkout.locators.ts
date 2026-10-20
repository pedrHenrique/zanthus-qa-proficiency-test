import type { Page } from '@playwright/test';

export function checkoutLocators(page: Page) {
  const items = page.getByTestId('inventory-item');

  return {
    title: page.getByTestId('title'),
    items,
    productName: items.getByTestId('inventory-item-name'),
    productPrice: items.getByTestId('inventory-item-price'),
    quantity: items.getByTestId('item-quantity'),
    firstName: page.getByTestId('firstName'),
    lastName: page.getByTestId('lastName'),
    postalCode: page.getByTestId('postalCode'),
    continueButton: page.getByRole('button', { name: 'Continue', exact: true }),
  };
}
