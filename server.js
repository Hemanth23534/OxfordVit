/**
 * OXFORD VIT – THE LIVING CAMPUS EXPERIENCE
 * Zero-Dependency Local Static & Centralized REST API Server
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = path.join(__dirname);
const DATA_DIR = path.join(__dirname, 'data');
const ADMISSIONS_FILE = path.join(DATA_DIR, 'admissions.json');
const CONTENT_FILE = path.join(DATA_DIR, 'content.json');
const GALLERY_FILE = path.join(__dirname, 'gallery.json');

// Ensure data files exist
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}
if (!fs.existsSync(ADMISSIONS_FILE)) {
  fs.writeFileSync(ADMISSIONS_FILE, JSON.stringify([], null, 2));
}
if (!fs.existsSync(CONTENT_FILE)) {
  const initialContent = {
    announcements: [
      { id: 1, title: 'Admissions Open for Academic Session 2026-27 across all 6 Bhavans', date: '2026-10-31', active: true },
      { id: 2, title: 'Oxford VIT Entrance & Scholarship Test (OVEST 2026) Schedule Announced', date: '2026-10-28', active: true },
      { id: 3, title: 'Super-60 Batch Screening Camps at KSR Towers and Main Campus', date: '2026-10-25', active: true }
    ],
    lastUpdated: new Date().toISOString()
  };
  fs.writeFileSync(CONTENT_FILE, JSON.stringify(initialContent, null, 2));
}

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf'
};

function sendJson(res, statusCode, data) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization'
  });
  res.end(JSON.stringify(data));
}

function parseJsonBody(req, callback) {
  let body = '';
  req.on('data', chunk => {
    body += chunk.toString();
    if (body.length > 2e6) { // 2MB limit
      req.connection.destroy();
    }
  });
  req.on('end', () => {
    try {
      const parsed = body ? JSON.parse(body) : {};
      callback(null, parsed);
    } catch (err) {
      callback(err);
    }
  });
}

const server = http.createServer((req, res) => {
  // CORS Preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    });
    return res.end();
  }

  const parsedUrl = req.url.split('?')[0];

  // -------------------------------------------------------------------------
  // REST API ROUTING
  // -------------------------------------------------------------------------

  // 1. Admission Enquiries API
  if (parsedUrl === '/api/admissions') {
    if (req.method === 'GET') {
      try {
        const data = JSON.parse(fs.readFileSync(ADMISSIONS_FILE, 'utf-8'));
        return sendJson(res, 200, { success: true, count: data.length, data });
      } catch (err) {
        return sendJson(res, 500, { success: false, message: 'Error reading admissions data' });
      }
    }

    if (req.method === 'POST') {
      parseJsonBody(req, (err, payload) => {
        if (err || !payload.studentName || !payload.mobile) {
          return sendJson(res, 400, { success: false, message: 'Invalid payload: studentName and mobile are required.' });
        }

        try {
          const list = JSON.parse(fs.readFileSync(ADMISSIONS_FILE, 'utf-8'));
          const tokenNum = Math.floor(1000 + Math.random() * 9000);
          const newEntry = {
            id: `OXF-2026-${tokenNum}`,
            studentName: payload.studentName,
            parentName: payload.parentName || '',
            mobile: payload.mobile,
            email: payload.email || '',
            course: payload.course || '',
            campus: payload.campus || '',
            qualification: payload.qualification || '',
            submittedAt: new Date().toISOString()
          };

          list.unshift(newEntry);
          fs.writeFileSync(ADMISSIONS_FILE, JSON.stringify(list, null, 2));

          return sendJson(res, 201, {
            success: true,
            message: 'Admission enquiry successfully registered.',
            referenceToken: newEntry.id,
            data: newEntry
          });
        } catch (saveErr) {
          return sendJson(res, 500, { success: false, message: 'Error writing admission submission.' });
        }
      });
      return;
    }
  }

  // 2. Centralized Content Management API
  if (parsedUrl === '/api/content') {
    if (req.method === 'GET') {
      try {
        const data = JSON.parse(fs.readFileSync(CONTENT_FILE, 'utf-8'));
        return sendJson(res, 200, { success: true, data });
      } catch (err) {
        return sendJson(res, 500, { success: false, message: 'Error reading content data' });
      }
    }

    if (req.method === 'POST') {
      parseJsonBody(req, (err, payload) => {
        if (err) {
          return sendJson(res, 400, { success: false, message: 'Invalid JSON payload.' });
        }
        try {
          const current = JSON.parse(fs.readFileSync(CONTENT_FILE, 'utf-8'));
          const updated = {
            ...current,
            ...payload,
            lastUpdated: new Date().toISOString()
          };
          fs.writeFileSync(CONTENT_FILE, JSON.stringify(updated, null, 2));
          return sendJson(res, 200, { success: true, message: 'Content updated successfully.', data: updated });
        } catch (saveErr) {
          return sendJson(res, 500, { success: false, message: 'Error saving content updates.' });
        }
      });
      return;
    }
  }

  // 3. Dynamic Gallery Media Management API
  if (parsedUrl === '/api/gallery') {
    if (req.method === 'GET') {
      try {
        if (!fs.existsSync(GALLERY_FILE)) {
          return sendJson(res, 200, { success: true, count: 0, data: [] });
        }
        const data = JSON.parse(fs.readFileSync(GALLERY_FILE, 'utf-8'));
        const items = data.mediaItems || [];
        return sendJson(res, 200, { success: true, count: items.length, data: items });
      } catch (err) {
        return sendJson(res, 500, { success: false, message: 'Error reading gallery media data.' });
      }
    }

    if (req.method === 'POST') {
      parseJsonBody(req, (err, payload) => {
        if (err || !payload.title) {
          return sendJson(res, 400, { success: false, message: 'Invalid payload: title is required.' });
        }

        try {
          let data = { mediaItems: [] };
          if (fs.existsSync(GALLERY_FILE)) {
            data = JSON.parse(fs.readFileSync(GALLERY_FILE, 'utf-8'));
          }

          const newId = `gal-${Date.now()}`;
          const newMedia = {
            id: newId,
            title: payload.title.trim(),
            category: payload.category || 'events',
            badge: payload.badge || 'New Media',
            imagePath: payload.imagePath || 'assets/images/gallery/quadrangle-view.svg',
            caption: payload.caption || '',
            bgColor: payload.bgColor || '#493B4C',
            publishedAt: new Date().toISOString()
          };

          if (!data.mediaItems) data.mediaItems = [];
          data.mediaItems.unshift(newMedia);
          fs.writeFileSync(GALLERY_FILE, JSON.stringify(data, null, 2));

          return sendJson(res, 201, {
            success: true,
            message: 'New media item successfully added to gallery.',
            data: newMedia
          });
        } catch (saveErr) {
          return sendJson(res, 500, { success: false, message: 'Error persisting gallery media item.' });
        }
      });
      return;
    }
  }

  // -------------------------------------------------------------------------
  // STATIC FILE SERVING
  // -------------------------------------------------------------------------
  let safeUrl = decodeURI(parsedUrl);
  if (safeUrl === '/' || safeUrl === '') {
    safeUrl = '/index.html';
  }

  const filePath = path.join(PUBLIC_DIR, safeUrl);

  // Security: prevent path traversal outside project root
  if (!filePath.startsWith(PUBLIC_DIR)) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    return res.end('403 Forbidden');
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
      return res.end(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <title>404 Page Not Found | Oxford VIT</title>
          <style>
            body { font-family: sans-serif; background: #F7F3E9; color: #493B4C; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; text-align: center; }
            h1 { font-size: 3rem; margin-bottom: 0.5rem; color: #D6B77A; }
            p { font-size: 1.15rem; margin-bottom: 1.5rem; }
            a { color: #fff; background: #526B54; padding: 0.75rem 1.75rem; text-decoration: none; border-radius: 999px; font-weight: bold; }
          </style>
        </head>
        <body>
          <div>
            <h1>404</h1>
            <p>The requested campus resource or page does not exist.</p>
            <a href="/">Return to Oxford VIT Home</a>
          </div>
        </body>
        </html>
      `);
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    res.writeHead(200, {
      'Content-Type': contentType,
      'Cache-Control': 'no-cache',
      'Access-Control-Allow-Origin': '*'
    });

    const stream = fs.createReadStream(filePath);
    stream.pipe(res);
  });
});

server.listen(PORT, () => {
  console.log(`\n======================================================`);
  console.log(`🏛️ OXFORD VIT – THE LIVING CAMPUS EXPERIENCE`);
  console.log(`🌐 Local Server running at: http://localhost:${PORT}`);
  console.log(`🔌 Centralized Backend API active: /api/admissions, /api/content`);
  console.log(`======================================================\n`);
});
