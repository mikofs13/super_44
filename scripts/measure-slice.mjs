import { chromium } from '@playwright/test';
import { mkdir, writeFile, readFile } from 'node:fs/promises';
import { gzipSync } from 'node:zlib';
import path from 'node:path';
const browser = await chromium.launch({channel:'msedge',headless:true});
try {
  const context=await browser.newContext({viewport:{width:1440,height:1000},reducedMotion:'no-preference'});
  await context.addInitScript(()=>localStorage.setItem('super44.view.v1','static'));
  const page=await context.newPage();
  const urls=new Set();
  page.on('request',r=>urls.add(r.url()));
  await page.goto('http://127.0.0.1:3000');
  await page.waitForLoadState('networkidle');
  const initial=[...urls];
  await page.getByRole('button',{name:'3D',exact:true}).click();
  await page.locator('[data-scene-state="ready"]').waitFor();
  await page.waitForLoadState('networkidle');
  const optional=[...urls].filter(url=>!initial.includes(url));
  await page.waitForTimeout(400); // Poster crossfade must settle before visual evidence.
  async function sizes(list) {
    return Promise.all(list.map(async url=>{
      const pathname=new URL(url).pathname;
      const file=path.join('out',pathname==='/'?'index.html':pathname);
      const bytes=await readFile(file);
      const compressed=/\.(js|css|gltf|svg|json)$/.test(pathname)||pathname==='/' ? gzipSync(bytes).length : bytes.length;
      return {path:pathname,rawBytes:bytes.length,encodedBytes:compressed};
    }));
  }
  const initialFiles=await sizes(initial), optionalFiles=await sizes(optional);
  const sum=(files,filter=()=>true)=>files.filter(filter).reduce((total,file)=>total+file.encodedBytes,0);
  const runtime=await page.locator('canvas').evaluate(canvas=>({progress:canvas.dataset.progress,drawCalls:Number(canvas.dataset.drawCalls),triangles:Number(canvas.dataset.triangles),pixelWidth:canvas.width,pixelHeight:canvas.height}));
  const network=await page.evaluate(()=>performance.getEntriesByType('resource').map(r=>({name:r.name,startTime:r.startTime,duration:r.duration,transferSize:r.transferSize,encodedBodySize:r.encodedBodySize})));
  const report={date:new Date().toISOString(),browser:browser.version(),method:'Production export served with gzip; cold isolated Edge context. Payload bytes exclude HTTP headers; network entries retain transfer sizes. Not a field Web Vitals or device FPS claim.',initial:{js:sum(initialFiles,f=>f.path.endsWith('.js')),css:sum(initialFiles,f=>f.path.endsWith('.css')),fonts:sum(initialFiles,f=>f.path.endsWith('.woff2')),poster:sum(initialFiles,f=>f.path.endsWith('.webp')),totalEncoded:sum(initialFiles)},optional:{js:sum(optionalFiles,f=>f.path.endsWith('.js')),models:sum(optionalFiles,f=>f.path.endsWith('.gltf'))},runtime,initialFiles,optionalFiles,network};
  await mkdir('docs/verification',{recursive:true});
  await writeFile('docs/verification/slice-measurements.json',JSON.stringify(report,null,2));
  await page.screenshot({path:'docs/verification/hero-desktop.png'});
  await page.getByRole('link',{name:'Projects',exact:true}).click();
  await page.waitForTimeout(100);
  await page.screenshot({path:'docs/verification/projects-desktop.png'});
  console.log(JSON.stringify({initial:report.initial,optional:report.optional,runtime},null,2));
  if(report.initial.js>200000 || report.initial.css>35000 || report.initial.fonts>100000 || report.initial.poster>250000 || report.initial.totalEncoded>700000 || report.optional.js>500000 || report.optional.models>2500000) throw new Error('A slice transfer budget was exceeded.');
} finally {await browser.close();}
