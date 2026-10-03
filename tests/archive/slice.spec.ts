import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('native scroll reverses the camera, anchor navigation works, and idle stops rendering', async ({page}) => {
  const errors: string[]=[];
  page.on('pageerror', error=>errors.push(error.message));
  await page.goto('/');
  await expect(page.locator('[data-scene-state]')).toHaveAttribute('data-scene-state','ready');
  const canvas=page.locator('canvas');
  const initial=Number(await canvas.getAttribute('data-progress'));
  await page.mouse.wheel(0,400);
  await expect.poll(async()=>Number(await canvas.getAttribute('data-progress'))).toBeGreaterThan(initial+.1);
  const middle=Number(await canvas.getAttribute('data-progress'));
  await page.mouse.wheel(0,-400);
  await expect.poll(async()=>Number(await canvas.getAttribute('data-progress'))).toBeLessThan(middle);
  await page.getByRole('link',{name:'Projects',exact:true}).click();
  await expect(page).toHaveURL(/#projects$/);
  await expect.poll(async()=>Number(await canvas.getAttribute('data-progress'))).toBeGreaterThan(.95);
  await page.waitForTimeout(500);
  const frames=await canvas.getAttribute('data-frames');
  await page.waitForTimeout(600);
  expect(await canvas.getAttribute('data-frames')).toBe(frames);
  expect(Number(await canvas.getAttribute('data-draw-calls'))).toBeLessThanOrEqual(90);
  expect(Number(await canvas.getAttribute('data-triangles'))).toBeLessThanOrEqual(120000);
  await page.screenshot({path:'test-results/projects-desktop.png'});
  await page.getByRole('link',{name:'Super 44 home'}).click();
  await expect.poll(async()=>Number(await canvas.getAttribute('data-progress'))).toBeLessThan(.05);
  await page.screenshot({path:'test-results/hero-desktop.png'});
  expect(errors).toEqual([]);
});

test('saved Static loads no optional JS or models; switching to 3D is explicit', async ({page}) => {
  await page.addInitScript(()=>localStorage.setItem('super44.view.v1','static'));
  const urls:string[]=[];
  page.on('request',request=>urls.push(request.url()));
  await page.goto('/');
  await expect(page.getByRole('button',{name:'Static',exact:true})).toHaveAttribute('aria-pressed','true');
  await page.waitForTimeout(500);
  expect(urls.some(url=>url.includes('/models/'))).toBe(false);
  await expect(page.locator('canvas')).toHaveCount(0);
  const initialJS=new Set(urls.filter(url=>url.includes('.js')));
  await page.getByRole('button',{name:'3D',exact:true}).click();
  await expect(page.locator('[data-scene-state]')).toHaveAttribute('data-scene-state','ready');
  expect(urls.filter(url=>url.includes('.js')&&!initialJS.has(url)).length).toBeGreaterThan(0);
  await page.getByRole('button',{name:'Static',exact:true}).click();
  await expect(page.locator('canvas')).toHaveCount(0);
  const count=urls.length;
  await page.reload();
  await page.waitForTimeout(500);
  expect(urls.slice(count).some(url=>url.includes('/models/'))).toBe(false);
  expect(urls.slice(count).filter(url=>url.includes('.js')).every(url=>initialJS.has(url))).toBe(true);
});

test('reduced motion overrides saved 3D; session consent and live changes work', async ({page}) => {
  await page.addInitScript(()=>localStorage.setItem('super44.view.v1','3d'));
  await page.emulateMedia({reducedMotion:'reduce'});
  const models:string[]=[]; page.on('request',r=>{if(r.url().includes('/models/'))models.push(r.url());});
  await page.goto('/');
  await expect(page.getByRole('button',{name:'Enable motion for this visit'})).toBeVisible();
  expect(models).toHaveLength(0);
  await page.getByRole('button',{name:'Enable motion for this visit'}).click();
  await expect(page.locator('[data-scene-state]')).toHaveAttribute('data-scene-state','ready');
  await page.emulateMedia({reducedMotion:'no-preference'});
  await page.emulateMedia({reducedMotion:'reduce'});
  await expect(page.locator('canvas')).toHaveCount(0);
  await page.reload();
  await expect(page.getByRole('button',{name:'Enable motion for this visit'})).toBeVisible();
  await expect(page.locator('canvas')).toHaveCount(0);
});

test('failed model leaves navigation intact; explicit retry recovers', async ({page}) => {
  await page.route('**/models/placeholder-car.gltf',route=>route.abort());
  await page.goto('/');
  await expect(page.locator('[data-scene-state]')).toHaveAttribute('data-scene-state','failed');
  await expect(page.getByRole('status')).toContainText('You can still explore');
  await page.getByRole('link',{name:'Contact',exact:false}).first().click();
  await expect(page).toHaveURL(/#contact$/);
  await expect(page.getByRole('heading',{name:'See you at the next turn.'})).toBeVisible();
  await page.unroute('**/models/placeholder-car.gltf');
  await page.getByRole('button',{name:'Try 3D again'}).click();
  await expect(page.locator('[data-scene-state]')).toHaveAttribute('data-scene-state','ready');
});

test('late model completion cannot activate motion after timeout', async ({page}) => {
  await page.route('**/models/placeholder-car.gltf',async route=>{
    await new Promise(resolve=>setTimeout(resolve,9500));
    await route.continue().catch(()=>{});
  });
  await page.goto('/');
  await expect(page.locator('[data-scene-state]')).toHaveAttribute('data-scene-state','timed-out',{timeout:12000});
  await page.waitForTimeout(2000);
  await expect(page.locator('canvas')).toHaveCount(0);
  await expect(page.getByRole('button',{name:'Try 3D again'})).toBeVisible();
});

test('context loss recovers to poster and retry creates a fresh scene', async ({page}) => {
  await page.goto('/');
  await expect(page.locator('[data-scene-state]')).toHaveAttribute('data-scene-state','ready');
  await page.locator('canvas').evaluate(canvas=>{
    const gl=(canvas as HTMLCanvasElement).getContext('webgl2');
    const extension=gl?.getExtension('WEBGL_lose_context');
    if(!extension) throw new Error('Context loss extension unavailable');
    extension.loseContext();
  });
  await expect(page.locator('[data-scene-state]')).toHaveAttribute('data-scene-state','failed');
  await expect(page.locator('canvas')).toHaveCount(0);
  await page.getByRole('button',{name:'Try 3D again'}).click();
  await expect(page.locator('[data-scene-state]')).toHaveAttribute('data-scene-state','ready');
});

test('static view passes automated accessibility and keyboard navigation', async ({page}) => {
  await page.addInitScript(()=>localStorage.setItem('super44.view.v1','static'));
  await page.goto('/');
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link',{name:'Skip to content'})).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.locator('main')).toBeFocused();
  const results=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze();
  expect(results.violations).toEqual([]);
});

test('compact layouts are static, have no overflow, and keep navigation usable', async ({page}) => {
  for (const width of [320,390,768,1024]) {
    await page.setViewportSize({width,height:900});
    if(width>=1024) await page.addInitScript(()=>localStorage.setItem('super44.view.v1','static'));
    await page.goto('/');
    await expect(page.locator('canvas')).toHaveCount(0);
    expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
    await page.screenshot({path:`test-results/static-${width}.png`,fullPage:true});
    await page.getByRole('link',{name:'Projects',exact:true}).click();
    await expect(page).toHaveURL(/#projects$/);
  }
});

test('HTML and poster remain useful without JavaScript', async ({browser}) => {
  const context=await browser.newContext({javaScriptEnabled:false});
  const page=await context.newPage();
  await page.goto('http://127.0.0.1:3000/');
  await expect(page.getByRole('heading',{level:1})).toContainText('Built with');
  await page.getByRole('link',{name:'Projects',exact:true}).click();
  await expect(page).toHaveURL(/#projects$/);
  await expect(page.locator('img')).toHaveJSProperty('complete',true);
  expect(await page.locator('img').evaluate(img=>(img as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
  await expect(page.locator('canvas')).toHaveCount(0);
  await context.close();
});

test('Static cancels an in-flight model; late completion stays static', async ({page}) => {
  await page.route('**/models/placeholder-car.gltf',async route=>{
    await new Promise(resolve=>setTimeout(resolve,1500));
    await route.continue().catch(()=>{});
  });
  await page.goto('/');
  await expect(page.locator('[data-scene-state]')).toHaveAttribute('data-scene-state','loading');
  await page.getByRole('button',{name:'Static',exact:true}).click();
  await page.waitForTimeout(1800);
  await expect(page.locator('canvas')).toHaveCount(0);
  await expect(page.getByRole('status')).toContainText('Static view');
});

test('blocked storage and repeated mode switches preserve one working canvas', async ({page}) => {
  await page.addInitScript(()=>{
    Storage.prototype.getItem=()=>{throw new Error('Storage blocked');};
    Storage.prototype.setItem=()=>{throw new Error('Storage blocked');};
  });
  await page.goto('/');
  for(let visit=0;visit<3;visit++) {
    await expect(page.locator('[data-scene-state]')).toHaveAttribute('data-scene-state','ready');
    await expect(page.locator('canvas')).toHaveCount(1);
    await page.getByRole('button',{name:'Static',exact:true}).click();
    await expect(page.locator('canvas')).toHaveCount(0);
    await page.getByRole('button',{name:'3D',exact:true}).click();
  }
  await expect(page.locator('[data-scene-state]')).toHaveAttribute('data-scene-state','ready');
});

test('unsupported WebGL preserves the poster and usable HTML', async ({page}) => {
  await page.addInitScript(()=>{
    const original=HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext=function(this:HTMLCanvasElement,...args:Parameters<typeof original>) {
      if(String(args[0]).includes('webgl'))return null;
      return original.apply(this,args);
    } as typeof original;
  });
  await page.goto('/');
  await expect(page.locator('[data-scene-state]')).toHaveAttribute('data-scene-state','failed');
  await page.getByRole('link',{name:'Projects',exact:true}).click();
  await expect(page).toHaveURL(/#projects$/);
  await expect(page.locator('img')).toBeVisible();
});
