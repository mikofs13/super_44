import http from 'node:http';
import path from 'node:path';
import { readFile, stat } from 'node:fs/promises';
import { gzipSync } from 'node:zlib';
const root = path.resolve('out');
const types = { '.html':'text/html; charset=utf-8','.css':'text/css','.js':'text/javascript','.json':'application/json','.gltf':'model/gltf+json','.webp':'image/webp','.svg':'image/svg+xml','.woff2':'font/woff2','.txt':'text/plain' };
http.createServer(async (req,res) => {
  let file;
  try {
    const url = new URL(req.url, 'http://localhost');
    file = path.resolve(root, '.' + decodeURIComponent(url.pathname));
    if (file !== root && !file.startsWith(root + path.sep)) throw new Error('Invalid path');
    if ((await stat(file)).isDirectory()) file = path.join(file,'index.html');
    const body = await readFile(file);
    const type = types[path.extname(file)] || 'application/octet-stream';
    res.setHeader('Content-Type',type);
    res.setHeader('Cache-Control','no-cache');
    if (req.headers['accept-encoding']?.includes('gzip') && /text|javascript|json/.test(type)) {
      res.setHeader('Content-Encoding','gzip'); res.end(gzipSync(body));
    } else res.end(body);
  } catch { res.statusCode=404; res.setHeader('Content-Type','text/html'); res.end(await readFile(path.join(root,'404.html')).catch(()=>'Not found')); }
}).listen(3000,'127.0.0.1',()=>console.log('Super 44 production preview: http://127.0.0.1:3000'));
