import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
test('one scene, section routes, project details and browser history',async({page})=>{
 await page.goto('/');await expect(page.locator('#hero')).toBeVisible();await page.getByRole('link',{name:'Enter pit lane'}).click();await expect(page.locator('#hero')).toBeHidden();await expect(page.locator('#projects')).toBeVisible();
 await page.getByRole('navigation',{name:'Portfolio sections'}).getByRole('link',{name:'about',exact:true}).click();await expect(page).toHaveURL(/#about$/);await expect(page.locator('#about')).toBeVisible();
 await page.goBack();await expect(page.locator('#projects')).toBeVisible();await page.goForward();await expect(page.locator('#about')).toBeVisible();await page.reload();await expect(page.locator('#about')).toBeVisible();
 await page.getByRole('navigation',{name:'Portfolio sections'}).getByRole('link',{name:'projects',exact:true}).click();await page.getByRole('link',{name:'Explore the build'}).click();await expect(page).toHaveURL(/\/#project-super-44$/);await expect(page.getByRole('heading',{name:'Super 44',exact:true})).toBeVisible();
 await page.getByRole('link',{name:'Back to projects',exact:false}).click();await expect(page.locator('#projects')).toBeVisible();await page.getByRole('link',{name:'Close portfolio, return to circuit'}).click();await expect(page.locator('#hero')).toBeVisible();expect(await page.evaluate(()=>scrollY)).toBe(0);
});
test('racer moves, entrance is brief, pause and reduced motion stop animation',async({page})=>{
 await page.goto('/');await expect(page.getByRole('button',{name:'Motion: On'})).toBeVisible();expect(await page.evaluate(()=>document.getAnimations().some(a=>a.effect?.getTiming().iterations===Infinity))).toBe(true);
 await page.evaluate(()=>{const original=Element.prototype.animate;(window as unknown as {durations:number[]}).durations=[];Element.prototype.animate=function(frames,options){(window as unknown as {durations:number[]}).durations.push(typeof options==='number'?options:Number(options?.duration));return original.call(this,frames,options)}});
 await page.getByRole('link',{name:'Enter pit lane'}).click();expect(await page.evaluate(()=>(window as unknown as {durations:number[]}).durations)).toEqual([220]);
 await page.getByRole('button',{name:'Motion: On'}).click();expect(await page.evaluate(()=>document.getAnimations().length)).toBe(0);await page.reload();await expect(page.getByRole('button',{name:'Motion: Off'})).toBeVisible();
 await page.emulateMedia({reducedMotion:'reduce'});await page.getByRole('navigation',{name:'Main navigation'}).getByRole('link',{name:'about',exact:true}).click();expect(await page.evaluate(()=>document.getAnimations().length)).toBe(0);
});
test('mobile panes scroll without document travel; keyboard access',async({page})=>{
 await page.setViewportSize({width:390,height:844});await page.goto('/');await page.keyboard.press('Tab');await expect(page.getByRole('link',{name:'Skip to portfolio'})).toBeFocused();await page.keyboard.press('Enter');await expect(page.locator('#projects')).toBeFocused();
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth && document.documentElement.scrollHeight<=innerHeight)).toBe(true);
 await expect(page.getByRole('link',{name:'Close portfolio, return to circuit'})).toBeInViewport();await page.screenshot({path:'docs/verification/single-scene-mobile.png'});
});
test('missing art and unavailable storage preserve navigation',async({page})=>{
 await page.route('**/images/pixel/**',r=>r.abort());await page.addInitScript(()=>{Object.defineProperty(window,'localStorage',{get(){throw new Error('blocked')}})});await page.goto('/#contact');await expect(page.locator('#contact')).toBeVisible();await page.getByRole('navigation',{name:'Portfolio sections'}).getByRole('link',{name:'skills',exact:true}).click();await expect(page.locator('#skills')).toBeVisible();
});
test('HTML fallback without JavaScript',async({browser})=>{
 const context=await browser.newContext({javaScriptEnabled:false});const page=await context.newPage();await page.goto('http://127.0.0.1:3000/');await expect(page.locator('#contact')).toBeVisible();await page.getByRole('link',{name:'Explore the build'}).click();await expect(page.locator('#project-super-44')).toBeInViewport();await context.close();
});
test('desktop visual and automated accessibility checks',async({page})=>{
 await page.goto('/');expect((await new AxeBuilder({page}).analyze()).violations).toEqual([]);await page.screenshot({path:'docs/verification/single-scene-circuit.png'});await page.getByRole('link',{name:'Enter pit lane'}).click();expect((await new AxeBuilder({page}).analyze()).violations).toEqual([]);await page.screenshot({path:'docs/verification/single-scene-garage.png'});
});

test('project detail deep link, preview fallback and missing links',async({page})=>{
 await page.route('**/images/pixel/circuit-800.webp',r=>r.abort());await page.goto('/#project-super-44');await expect(page.locator('#project-super-44')).toBeVisible();await expect(page.locator('#project-super-44').getByText('Preview unavailable')).toBeVisible();await expect(page.locator('#project-super-44').getByRole('heading',{name:'About the project'})).toBeVisible();await expect(page.locator('#project-super-44').getByRole('link',{name:/Live demo|View repository/})).toHaveCount(0);await page.reload();await expect(page.locator('#project-super-44')).toBeVisible();
});
test('project detail visual and accessibility check',async({page})=>{
 await page.goto('/#project-super-44');await expect(page.locator('#project-super-44')).toBeVisible();expect((await new AxeBuilder({page}).analyze()).violations).toEqual([]);await page.screenshot({path:'docs/verification/project-detail.png'});
});
