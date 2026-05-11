import { expect, test } from '@playwright/test';

test('core mobile flows fit and navigate on an S25 Ultra sized viewport', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('heading', { name: /hello/i })).toBeVisible();
  await expect(page.getByRole('navigation', { name: /primary/i })).toBeVisible();

  await page.getByRole('button', { name: 'STATS' }).tap();
  await expect(page.getByRole('heading', { name: /records hub/i })).toBeVisible();
  await expect(page.getByText(/past workouts/i)).toBeVisible();
  await page.getByRole('button', { name: /benchmarks/i }).tap();
  await expect(page.getByText(/training frequency/i)).toBeVisible();

  await page.getByRole('button', { name: 'FUEL' }).tap();
  await expect(page.getByRole('heading', { name: /fuel/i })).toBeVisible();
  await page.getByRole('button', { name: /grocery list/i }).tap();
  await expect(page.getByText(/provisioning queue/i)).toBeVisible();

  await page.getByRole('button', { name: 'WORKOUT' }).tap();
  await expect(page.getByRole('button', { name: /enter focus mode/i })).toBeVisible();
});
