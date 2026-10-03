import { chromium } from '@playwright/test';
import { mkdir } from 'node:fs/promises';
import sharp from 'sharp';
const browser=await chromium.launch({channel:'msedge',headless:true});
try {
  const page=await browser.newPage({viewport:{width:1440,height:1000},reducedMotion:'no-preference'});
  page.on('pageerror',error=>console.error(error));
  page.on('console',message=>{if(message.type()==='error')console.error(message.text());});
  await page.goto('http://127.0.0.1:3000');
  await page.locator('[data-scene-state="ready"]').waitFor({timeout:15000});
  await page.waitForTimeout(400);
  await mkdir('public/images',{recursive:true});
  const pixels=await page.locator('canvas').screenshot();
  await sharp(pixels).webp({quality:88}).toFile('public/images/garage-poster.webp');
  console.log('Saved poster from the working garage camera.');
} finally { await browser.close(); }
