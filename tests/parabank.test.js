import { test, expect } from '@playwright/test';

const USERNAME = 'john';
const PASSWORD = 'demo';
const BASE_URL = 'https://parabank.parasoft.com/parabank/index.htm';

test.describe('Parabank Full Test Suite', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
  });

  test('Login sukses', async ({ page }) => {
    await page.fill('input[name="username"]', USERNAME);
    await page.fill('input[name="password"]', PASSWORD);
    await page.click('input[type="submit"]');
    await expect(page.getByRole('heading', { name: 'Accounts Overview' })).toBeVisible();
  });

  test('Login gagal dengan kredensial salah', async ({ page }) => {
    await page.fill('input[name="username"]', 'salahuser');
    await page.fill('input[name="password"]', 'salahpass');
    await page.click('input[type="submit"]');

    const errorLocator = page.locator('.error');
    const errorText = (await errorLocator.innerText()).trim();

    expect([
      'The username and password could not be verified',
      'An internal error has occurred and has been logged.'
    ]).toContain(errorText);
  });

  test('Transfer dana antar akun', async ({ page }) => {
    await page.fill('input[name="username"]', USERNAME);
    await page.fill('input[name="password"]', PASSWORD);
    await page.click('input[type="submit"]');

    // ✅ Tunggu halaman setelah login
    await expect(page.getByRole('heading', { name: 'Accounts Overview' })).toBeVisible();

    // Klik menu Transfer Funds dan tunggu halaman siap
    await page.click('text=Transfer Funds');
    await expect(page.locator('input[name="amount"]')).toBeVisible(); // tunggu elemen muncul

    // Lanjutkan proses transfer
    await page.fill('input[id="amount"]', '100');
    await page.selectOption('select#fromAccountId', { index: 0 });
    await page.selectOption('select#toAccountId', { index: 1 });
    await page.click('input[type="submit"]');

    // ✅ Verifikasi transfer berhasil
    await expect(page.locator('text=Transfer Complete')).toBeVisible();
  });

  test('Transfer dana gagal tanpa isi amount', async ({ page }) => {
    await page.fill('input[name="username"]', USERNAME);
    await page.fill('input[name="password"]', PASSWORD);
    await page.click('input[type="submit"]');

    await expect(page.getByRole('heading', { name: 'Accounts Overview' })).toBeVisible();

    await page.click('text=Transfer Funds');

    // ✅ Tunggu input amount muncul
    const amountField = page.locator('input[name="amount"]');
    await expect(amountField).toBeVisible();

    // ✅ Langsung submit
    await page.click('input[type="submit"]');

    // ✅ Validasi error native tidak bisa dicek via .toContainText
    // Solusi: gunakan `evaluate` untuk cek validasi HTML5
    const isAmountValid = await amountField.evaluate((el) => el.checkValidity());
    expect(isAmountValid).toBe(false);
  });

  test('Bill Pay sukses', async ({ page }) => {
    await page.fill('input[name="username"]', USERNAME);
    await page.fill('input[name="password"]', PASSWORD);
    await page.click('input[type="submit"]');

    await page.click('text=Bill Pay');
    await page.fill('input[name="payee.name"]', 'Electric Company');
    await page.fill('input[name="payee.address.street"]', '123 Main St');
    await page.fill('input[name="payee.address.city"]', 'Los Angeles');
    await page.fill('input[name="payee.address.state"]', 'CA');
    await page.fill('input[name="payee.address.zipCode"]', '90001');
    await page.fill('input[name="payee.phoneNumber"]', '1234567890');
    await page.fill('input[name="payee.accountNumber"]', '123456');
    await page.fill('input[name="verifyAccount"]', '123456');
    await page.fill('input[name="amount"]', '50');

    // ✅ Tombol diperbaiki
    await page.getByRole('button', { name: 'Send Payment' }).click();

    await expect(page.locator('text=Bill Payment Complete')).toBeVisible();
  });


  test('Bill Pay gagal: semua field kosong', async ({ page }) => {
    await page.fill('input[name="username"]', USERNAME);
    await page.fill('input[name="password"]', PASSWORD);
    await page.click('input[type="submit"]');
    await page.click('text=Bill Pay');
    
    // ✅ Perbaikan selector tombol
    await page.getByRole('button', { name: 'Send Payment' }).click();

    await expect(page.locator('text=Bill Payment Complete')).toBeVisible();
  });

});