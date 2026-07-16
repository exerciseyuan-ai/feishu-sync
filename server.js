const http = require('http');
const fs = require('fs');
const path = require('path');
const PORT = process.env.PORT || 3000;
const PUBLIC = path.join(__dirname, 'public');
const MIME = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'application/javascript', '.json': 'application/json', '.png': 'image/png', '.svg': 'image/svg+xml', '.webmanifest': 'application/manifest+json' };
const server = http.createServer(async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') { res.writeHead(204); res.end(); return; }
  var url = new URL(req.url, 'http://localhost');
  var p = url.pathname;
  if (p.startsWith('/api/feishu/')) {
    var fp = p.replace('/api/feishu/', '');
    var fu = 'https://open.feishu.cn/open-apis/' + fp + url.search;
    try {
      var opts = { method: req.method, headers: { 'Content-Type': 'application/json' } };
      if (req.headers['authorization']) opts.headers['Authorization'] = req.headers['authorization'];
      if (req.method === 'POST') {
        var body = '';
        await new Promise(function(resolve) { req.on('data', function(c) { body += c; }); req.on('end', resolve); });
        opts.body = body;
      }
      var resp = await fetch(fu, opts);
      var data = await resp.text();
      res.writeHead(resp.status, { 'Content-Type': 'application/json' });
      res.end(data);
    } catch (e) { res.writeHead(500); res.end(JSON.stringify({ error: e.message })); }
    return;
  }
  var f = p === '/' ? '/3.0.0.html' : p;
  f = path.join(PUBLIC, f);
  if (!f.startsWith(PUBLIC)) { res.writeHead(403); res.end('Forbidden'); return; }
  try {
    var c = fs.readFileSync(f);
    res.writeHead(200, { 'Content-Type': MIME[path.extname(f)] || 'application/octet-stream', 'Cache-Control': 'no-cache' });
    res.end(c);
  } catch (e) {
    try { var fb = fs.readFileSync(path.join(PUBLIC, '3.0.0.html')); res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' }); res.end(fb); }
    catch (f) { res.writeHead(404); res.end('Not found'); }
  }
});
server.listen(PORT, function() { console.log('Server running on port ' + PORT); });