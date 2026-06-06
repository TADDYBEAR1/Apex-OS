import { chromium } from '@playwright/test';
import { mkdir, rename, rm } from 'node:fs/promises';
import path from 'node:path';

const BASE_URL = process.env.BASE_URL || 'http://127.0.0.1:5173';
const OUTPUT_DIR = path.resolve('docs/visual-alternatives');
const RECORD_MS = Number(process.env.VISUAL_RECORD_MS || 30000);

const alternatives = ['neon-forge', 'frosted-atlas', 'solar-carbon', 'prism-reactor'];

async function waitForServer() {
  const target = `${BASE_URL}/`;
  let lastError;

  for (let attempt = 0; attempt < 40; attempt += 1) {
    try {
      const response = await fetch(target);
      if (response.ok) return;
      lastError = new Error(`Server responded with ${response.status}`);
    } catch (error) {
      lastError = error;
    }
    await new Promise((resolve) => setTimeout(resolve, 500));
  }

  throw new Error(`Unable to reach ${target}: ${lastError?.message || 'unknown error'}`);
}

async function recordAlternative(slug) {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 430, height: 932 },
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true,
    recordVideo: {
      dir: OUTPUT_DIR,
      size: { width: 430, height: 932 },
    },
  });

  const page = await context.newPage();
  const url = `${BASE_URL}/?visual=${slug}&capture=1`;
  const targetPath = path.join(OUTPUT_DIR, `${slug}.webm`);

  await page.goto(url, { waitUntil: 'networkidle' });
  await page.waitForTimeout(RECORD_MS);

  const video = page.video();
  await page.close();
  await context.close();
  await browser.close();

  const tempPath = await video.path();
  await rm(targetPath, { force: true });
  await rename(tempPath, targetPath);
  return targetPath;
}

await mkdir(OUTPUT_DIR, { recursive: true });
await waitForServer();

for (const slug of alternatives) {
  const output = await recordAlternative(slug);
  console.log(`${slug}: ${output}`);
}
