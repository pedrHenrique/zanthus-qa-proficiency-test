import { test } from '@playwright/test';
import { customer, product, user } from '../data/test-data';
import { LoginPage } from '../utils/pages/login.page';
import { InventoryPage } from '../utils/pages/inventory.page';
import { CartPage } from '../utils/pages/cart.page';
import { CheckoutPage } from '../utils/pages/checkout.page';

test.describe('Fluxo de compra no SauceDemo', () => {
  let login: LoginPage;
  let inventory: InventoryPage;
  let cart: CartPage;
  let checkout: CheckoutPage;

  test.beforeEach(async ({ page }) => {
    login = new LoginPage(page);
    inventory = new InventoryPage(page);
    cart = new CartPage(page);
    checkout = new CheckoutPage(page);
  });

  test('CHK 01 - Acessar a URL e realizar login', async () => {
    await login.open();
    await login.signIn(user);
    await inventory.expectLoaded();
  });

  test('CHK 02 - Buscar um produto específico no catálogo', async () => {
    await test.step('Preparação: acessar o catálogo com usuário autenticado', async () => {
      await login.open();
      await login.signIn(user);
      await inventory.expectLoaded();
    });

    await inventory.sortByLowestPrice();
    await inventory.expectProduct(product);
  });

  test('CHK 03 - Adicionar o item ao carrinho de compras', async () => {
    await test.step('Preparação: realizar login e localizar o produto', async () => {
      await login.open();
      await login.signIn(user);
      await inventory.expectLoaded();
      await inventory.expectProduct(product);
    });

    await inventory.addToCart(product);
    await inventory.openCart();
    await cart.expectSingleProduct(product);
  });

  test('CHK 04 - Validar a presença correta do produto no checkout', async () => {
    await test.step('Preparação: realizar login e colocar o produto no carrinho', async () => {
      await login.open();
      await login.signIn(user);
      await inventory.expectLoaded();
      await inventory.expectProduct(product);
      await inventory.addToCart(product);
      await inventory.openCart();
      await cart.expectSingleProduct(product);
    });

    await cart.checkout();
    await checkout.fillCustomer(customer);
    await checkout.expectSingleProduct(product);
  });
});
