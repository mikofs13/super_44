import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
test('reference-style Start, section routes, close, toolbar history and reload',async({page})=>{
 await page.goto('/');await page.getByRole('link',{name:'Start',exact:false}).click();await expect(page).toHaveURL(/\/info\/$/);await expect(page.getByRole('heading',{name:'Meet the developer'})).toBeVisible();
 await page.getByRole('navigation',{name:'Portfolio sections'}).getByRole('link',{name:'Projects',exact:true}).click();await expect(page).toHaveURL(/\/projects\/$/);await expect(page.getByRole('heading',{name:'Super 44',exact:true})).toBeVisible();
 await page.getByRole('button',{name:'Go back',exact:true}).click();await expect(page).toHaveURL(/\/info\/$/);await page.getByRole('button',{name:'Go forward',exact:true}).click();await expect(page).toHaveURL(/\/projects\/$/);
 await page.getByRole('button',{name:'Reload page'}).click();await expect(page.getByRole('heading',{name:'About the project'})).toBeVisible();await page.getByRole('link',{name:'Close section, return to About'}).click();await expect(page).toHaveURL(/\/info\/$/);
 await page.getByRole('link',{name:'Close portfolio, return to circuit'}).click();await expect(page.getByRole('heading',{name:'SUPER44',exact:true})).toBeVisible();
});
test('static exports resolve each direct route and legacy project hashes',async({page})=>{
 for(const route of ['info','projects','skills','certificates','contact']){const response=await page.goto(`/${route}/`);expect(response?.status()).toBe(200);await expect(page.locator('#garage')).toBeVisible()}
 await page.goto('/#project-super-44');await expect(page.locator('#project-super-44')).toBeVisible();await page.reload();await expect(page.locator('#project-super-44')).toBeVisible();
});
test('car motion can be paused and respects reduced motion',async({page})=>{
 await page.goto('/info/');await expect(page.getByRole('button',{name:'Motion: On'})).toBeVisible();expect(await page.evaluate(()=>document.getAnimations().some(a=>a.effect?.getTiming().iterations===Infinity))).toBe(true);
 await page.getByRole('button',{name:'Motion: On'}).click();expect(await page.evaluate(()=>document.getAnimations().length)).toBe(0);await page.reload();await expect(page.getByRole('button',{name:'Motion: Off'})).toBeVisible();await page.emulateMedia({reducedMotion:'reduce'});await page.getByRole('link',{name:'Projects',exact:true}).click();expect(await page.evaluate(()=>document.getAnimations().length)).toBe(0);
});
test('fullscreen can open and exit',async({page})=>{
 await page.goto('/info/');await page.getByRole('button',{name:'Enter fullscreen'}).click();await expect(page.getByRole('button',{name:'Exit fullscreen'})).toBeVisible();await page.getByRole('button',{name:'Exit fullscreen'}).click();await expect(page.getByRole('button',{name:'Enter fullscreen'})).toBeVisible();
});
test('mobile tabs, keyboard focus, content scroll and accessible window',async({page})=>{
 await page.setViewportSize({width:390,height:844});await page.goto('/');await page.keyboard.press('Tab');await expect(page.getByRole('link',{name:'Skip to portfolio'})).toBeFocused();await page.keyboard.press('Enter');await expect(page.locator('#about')).toBeFocused();
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth&&document.documentElement.scrollHeight<=innerHeight)).toBe(true);
 await page.getByRole('navigation',{name:'Portfolio sections'}).getByRole('link',{name:'Contact',exact:true}).click();await expect(page.locator('#contact')).toBeVisible();await page.getByRole('link',{name:'Close section, return to About'}).click();await expect(page.getByRole('button',{name:'Enter fullscreen'})).toBeInViewport();await page.screenshot({path:'docs/verification/straight-mobile.png'});
});
test('image failures, blocked storage and project navigation remain usable',async({page})=>{
 await page.route('**/images/pixel/**',r=>r.abort());await page.addInitScript(()=>{Object.defineProperty(window,'localStorage',{get(){throw new Error('blocked')}})});await page.goto('/projects/');await expect(page.locator('#projects').getByText('Preview unavailable')).toBeVisible();await expect(page.getByRole('button',{name:'Next project'})).toBeDisabled();await page.getByRole('link',{name:'Show project 1: Super 44'}).click();await expect(page).toHaveURL(/\/projects\/#project-super-44$/);await expect(page.locator('#project-super-44')).toBeVisible();
});
test('real paths and introduction work without JavaScript',async({browser})=>{
 const context=await browser.newContext({javaScriptEnabled:false});const page=await context.newPage();await page.goto('http://127.0.0.1:3000/');await page.getByRole('link',{name:'Start',exact:false}).click();await expect(page.getByRole('heading',{name:'Meet the developer'})).toBeVisible();await page.getByRole('link',{name:'Projects',exact:true}).click();await expect(page.getByRole('heading',{name:'Super 44',exact:true})).toBeVisible();await context.close();
});
test('large introduction and project views pass automated accessibility',async({page})=>{
 await page.goto('/info/');expect((await new AxeBuilder({page}).analyze()).violations).toEqual([]);const width=await page.locator('[data-maximized]').evaluate(el=>el.getBoundingClientRect().width);expect(width).toBeGreaterThan(1200);await page.screenshot({path:'docs/verification/straight-about.png'});await page.getByRole('link',{name:'Projects',exact:true}).click();expect((await new AxeBuilder({page}).analyze()).violations).toEqual([]);await page.screenshot({path:'docs/verification/straight-projects.png'});
});

test('project screenshot arrows and dots switch previews',async({page})=>{
 await page.goto('/projects/');const panel=page.locator('#projects');await expect(panel.getByRole('img')).toHaveAttribute('src','/images/pixel/circuit-800.webp');await page.getByRole('button',{name:'Next screenshot'}).click();await expect(panel.getByRole('img')).toHaveAttribute('src','/images/pixel/garage-800.webp');await page.getByRole('button',{name:'Show screenshot 1'}).click();await expect(panel.getByRole('img')).toHaveAttribute('src','/images/pixel/circuit-800.webp');
});
