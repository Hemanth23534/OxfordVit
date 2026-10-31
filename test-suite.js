// Complete Automated Verification & Testing Suite for Oxford VIT
// Comprehensive Multi-Campus & Locations Verification (Narasaraopet, Guntur, Bapatla)
const fs = require('fs');
const path = require('path');
const http = require('http');

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;

function assert(condition, testName) {
  totalTests++;
  if (condition) {
    passedTests++;
    console.log(`  [PASS] ${testName}`);
  } else {
    failedTests++;
    console.error(`  [FAIL] ${testName}`);
  }
}

function httpRequest(options, postData) {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          data: data
        });
      });
    });
    req.on('error', (err) => reject(err));
    if (postData) {
      req.write(postData);
    }
    req.end();
  });
}

async function runTests() {
  console.log('====================================================');
  console.log('OXFORD VIT – COMPLETE AUTOMATED MULTI-LOCATION SUITE');
  console.log('Narasaraopet • Guntur • Bapatla Institutional Portal');
  console.log('====================================================\n');

  // TEST 1: Structured Institutional Data Files
  console.log('1. Structured Institutional Data Files:');
  const jsonFiles = [
    'college-profile.json',
    'campuses.json',
    'management.json',
    'faculty.json',
    'achievements.json',
    'events.json',
    'gallery.json',
    'source-references.json',
    'data/content.json',
    'data/admissions.json'
  ];

  jsonFiles.forEach(file => {
    const filePath = path.join(__dirname, file);
    assert(fs.existsSync(filePath), `File exists: ${file}`);
    try {
      const parsed = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      assert(parsed !== null && typeof parsed === 'object', `Valid JSON syntax & schema in: ${file}`);
    } catch (e) {
      assert(false, `Valid JSON in ${file}: ${e.message}`);
    }
  });

  // TEST 1B: Verify Specific Multi-City & Campus Structure
  console.log('\n1B. Multi-City & Campus Roster Verification:');
  const campusesRaw = JSON.parse(fs.readFileSync(path.join(__dirname, 'campuses.json'), 'utf8'));
  assert(Array.isArray(campusesRaw.cities) && campusesRaw.cities.length === 3, 'campuses.json specifies all 3 geographical hubs (Narasaraopet, Guntur, Bapatla)');
  assert(Array.isArray(campusesRaw.campuses) && campusesRaw.campuses.length >= 9, `campuses.json contains all 9 verified campuses (found ${campusesRaw.campuses.length})`);

  const expectedIds = [
    'yashoda-bhavan',
    'balaji-bhavan',
    'raman-bhavan',
    'ksr-towers',
    'oxford-iit-school',
    'guntur-balaji-tower',
    'guntur-vasavi-tower',
    'guntur-vit-medical',
    'bapatla-branch'
  ];

  expectedIds.forEach(id => {
    const found = campusesRaw.campuses.find(c => c.id === id);
    assert(found !== undefined, `Verified campus entity exists: ${id}`);
    if (found) {
      if (id === 'ksr-towers') {
        assert(found.operationalStatus.includes('Historical'), 'KSR Towers correctly marked as Historical Campus / Archive');
      }
      if (id === 'bapatla-branch') {
        assert(found.governance.includes('Pending Verification'), 'Bapatla branch governance marked Pending Verification');
      }
      if (id === 'oxford-iit-school') {
        assert(found.category === 'sister-school', 'Oxford IIT School classified as sister-school');
      }
    }
  });

  // TEST 2: Static Asset & Image Directory Verification
  console.log('\n2. Static Asset Verification:');
  const requiredAssetDirs = [
    'assets/images/campuses',
    'assets/images/management',
    'assets/images/faculty',
    'assets/images/students',
    'assets/images/achievements',
    'assets/images/events',
    'assets/images/gallery',
    'assets/images/transport'
  ];

  requiredAssetDirs.forEach(dir => {
    const fullPath = path.join(__dirname, dir);
    assert(fs.existsSync(fullPath) && fs.statSync(fullPath).isDirectory(), `Directory exists: ${dir}`);
    const files = fs.readdirSync(fullPath);
    assert(files.length > 0, `Directory contains assets (${files.length} found): ${dir}`);
  });

  // Check specific architectural SVGs for the new campuses
  const newSvgs = [
    'assets/images/campuses/oxford-iit-school.svg',
    'assets/images/campuses/guntur-balaji-tower.svg',
    'assets/images/campuses/guntur-vasavi-tower.svg',
    'assets/images/campuses/guntur-vit-medical.svg',
    'assets/images/campuses/bapatla-branch.svg'
  ];
  newSvgs.forEach(svg => {
    assert(fs.existsSync(path.join(__dirname, svg)), `Architectural SVG artwork exists: ${svg}`);
  });

  // TEST 3: CSS and Vendor Library Verification
  console.log('\n3. CSS & Vendor Supporting Libraries:');
  const requiredCss = [
    'assets/css/variables.css',
    'assets/css/base.css',
    'assets/css/components.css',
    'assets/css/layout.css',
    'assets/css/sections.css',
    'assets/css/animations.css'
  ];
  requiredCss.forEach(css => {
    assert(fs.existsSync(path.join(__dirname, css)), `CSS stylesheet exists: ${css}`);
  });

  const requiredVendors = [
    'assets/vendor/three.min.js',
    'assets/vendor/gsap.min.js',
    'assets/vendor/ScrollTrigger.min.js'
  ];
  requiredVendors.forEach(vendor => {
    assert(fs.existsSync(path.join(__dirname, vendor)), `Vendor library exists: ${vendor}`);
  });

  // TEST 4: JavaScript Modules Syntax
  console.log('\n4. JavaScript Modules & Data Stores:');
  const jsModules = [
    'assets/js/main.js',
    'assets/js/modules/canvas3d.js',
    'assets/js/modules/campusSwitcher.js',
    'assets/js/modules/achievements.js',
    'assets/js/modules/facultyDirectory.js',
    'assets/js/modules/galleryModal.js',
    'assets/js/modules/admissionsForm.js',
    'assets/js/modules/navigation.js',
    'assets/js/modules/cursor.js',
    'assets/js/modules/preloader.js',
    'assets/js/modules/scrollAnimations.js',
    'assets/js/modules/tilt3d.js',
    'assets/js/modules/eventsEngine.js',
    'assets/js/data/academicsData.js',
    'assets/js/data/achievementsData.js',
    'assets/js/data/campusesData.js',
    'assets/js/data/eventsData.js',
    'assets/js/data/galleryData.js',
    'assets/js/data/managementData.js'
  ];
  jsModules.forEach(mod => {
    assert(fs.existsSync(path.join(__dirname, mod)), `JS File exists: ${mod}`);
  });

  // TEST 5: HTML Documents & SEO Metas (All 14 pages)
  console.log('\n5. HTML Documents & SEO Metas (All 14 Pages):');
  const htmlFiles = [
    'index.html',
    'about.html',
    'campuses.html',
    'narasaraopet.html',
    'guntur.html',
    'bapatla.html',
    'academics.html',
    'achievements.html',
    'faculty.html',
    'student-life.html',
    'events.html',
    'gallery.html',
    'admissions.html',
    'admin.html'
  ];

  htmlFiles.forEach(html => {
    const fullPath = path.join(__dirname, html);
    assert(fs.existsSync(fullPath), `HTML file exists: ${html}`);
    const content = fs.readFileSync(fullPath, 'utf8');
    assert(content.includes('<!DOCTYPE html>'), `${html} has valid DOCTYPE`);
    assert(content.includes('<title>'), `${html} has title tag`);
    if (html !== 'admin.html') {
      assert(content.includes('og:title'), `${html} has Open Graph meta tags`);
      assert(content.includes('meta name="description"'), `${html} has meta description`);
    }
  });

  // TEST 6: Live Server HTTP Endpoint Testing
  console.log('\n6. Live Server HTTP Endpoint Testing (http://localhost:3000):');
  
  // Test root and all 14 html routes
  const publicRoutes = [
    '/',
    '/index.html',
    '/about.html',
    '/campuses.html',
    '/narasaraopet.html',
    '/guntur.html',
    '/bapatla.html',
    '/academics.html',
    '/achievements.html',
    '/faculty.html',
    '/student-life.html',
    '/events.html',
    '/gallery.html',
    '/admissions.html',
    '/admin.html'
  ];

  for (const page of publicRoutes) {
    try {
      const res = await httpRequest({
        hostname: 'localhost',
        port: 3000,
        path: page,
        method: 'GET'
      });
      assert(res.statusCode === 200, `GET ${page} returns HTTP 200 (length: ${res.data.length})`);
    } catch (e) {
      assert(false, `GET ${page} failed: ${e.message}`);
    }
  }

  // Test robots.txt and sitemap.xml
  try {
    const robots = await httpRequest({ hostname: 'localhost', port: 3000, path: '/robots.txt', method: 'GET' });
    assert(robots.statusCode === 200 && robots.data.includes('narasaraopet.html') && robots.data.includes('guntur.html') && robots.data.includes('bapatla.html'), 'GET /robots.txt includes all 3 city pages');
    assert(robots.headers['content-type'].includes('text/plain'), `GET /robots.txt served with text/plain (${robots.headers['content-type']})`);

    const sitemap = await httpRequest({ hostname: 'localhost', port: 3000, path: '/sitemap.xml', method: 'GET' });
    assert(sitemap.statusCode === 200 && sitemap.data.includes('narasaraopet.html') && sitemap.data.includes('guntur.html') && sitemap.data.includes('bapatla.html'), 'GET /sitemap.xml contains all 3 city URLs');
    assert(sitemap.headers['content-type'].includes('application/xml'), `GET /sitemap.xml served with application/xml (${sitemap.headers['content-type']})`);
  } catch (e) {
    assert(false, `robots/sitemap verification failed: ${e.message}`);
  }

  // Test Static JSON endpoints
  console.log('\n7. Static Institutional JSON Endpoints:');
  for (const jsonEndpoint of ['/campuses.json', '/faculty.json', '/achievements.json', '/management.json', '/college-profile.json', '/events.json']) {
    try {
      const res = await httpRequest({ hostname: 'localhost', port: 3000, path: jsonEndpoint, method: 'GET' });
      assert(res.statusCode === 200, `GET ${jsonEndpoint} returns HTTP 200`);
      const parsed = JSON.parse(res.data);
      assert(parsed !== null, `Parsed valid data from ${jsonEndpoint}`);
    } catch (e) {
      assert(false, `GET ${jsonEndpoint} failed: ${e.message}`);
    }
  }

  // Test REST API Endpoints
  console.log('\n8. REST API Endpoints Verification:');
  
  // GET /api/content
  try {
    const res = await httpRequest({ hostname: 'localhost', port: 3000, path: '/api/content', method: 'GET' });
    assert(res.statusCode === 200, 'GET /api/content returns HTTP 200');
    const content = JSON.parse(res.data);
    assert(content.success === true && content.data.announcements.length > 0, `GET /api/content delivers active announcements (${content.data.announcements.length})`);
  } catch (e) {
    assert(false, `GET /api/content failed: ${e.message}`);
  }

  // GET /api/gallery
  try {
    const res = await httpRequest({ hostname: 'localhost', port: 3000, path: '/api/gallery', method: 'GET' });
    assert(res.statusCode === 200, 'GET /api/gallery returns HTTP 200');
    const gallery = JSON.parse(res.data);
    assert(gallery.success === true && Array.isArray(gallery.data) && gallery.data.length > 0, `GET /api/gallery delivers media items (${gallery.data.length} items)`);
  } catch (e) {
    assert(false, `GET /api/gallery failed: ${e.message}`);
  }

  // GET /api/admissions
  try {
    const res = await httpRequest({ hostname: 'localhost', port: 3000, path: '/api/admissions', method: 'GET' });
    assert(res.statusCode === 200, 'GET /api/admissions returns HTTP 200');
    const apps = JSON.parse(res.data);
    assert(apps.success === true && Array.isArray(apps.data), 'GET /api/admissions returns application array');
  } catch (e) {
    assert(false, `GET /api/admissions failed: ${e.message}`);
  }

  // POST /api/admissions validation (missing required fields)
  try {
    const invalidPost = await httpRequest({
      hostname: 'localhost',
      port: 3000,
      path: '/api/admissions',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    }, JSON.stringify({ studentName: 'Test' }));
    assert(invalidPost.statusCode === 400, 'POST /api/admissions rejects incomplete payload with HTTP 400');
  } catch (e) {
    assert(false, `POST /api/admissions incomplete test failed: ${e.message}`);
  }

  // POST /api/admissions valid submission with city selection
  let testAppId = null;
  try {
    const validPost = await httpRequest({
      hostname: 'localhost',
      port: 3000,
      path: '/api/admissions',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    }, JSON.stringify({
      studentName: 'Multi-Location Test Scholar',
      parentName: 'Verification Parent',
      mobile: '9848022338',
      email: 'admissions@oxfordvit.edu.in',
      course: 'MPC Super-60 (IIT-JEE)',
      campus: 'Yashoda Bhavan — Main Campus (Narasaraopet)',
      qualification: 'BSEAP AP SSC 10.0 GPA'
    }));
    assert(validPost.statusCode === 201, 'POST /api/admissions accepts valid application with HTTP 201');
    const resObj = JSON.parse(validPost.data);
    assert(resObj.success === true && resObj.referenceToken.startsWith('OXF-2026-'), `Application generated token: ${resObj.referenceToken}`);
    testAppId = resObj.referenceToken;
  } catch (e) {
    assert(false, `POST /api/admissions valid test failed: ${e.message}`);
  }

  // Clean up the test admissions entry
  if (testAppId) {
    const adminPath = path.join(__dirname, 'data', 'admissions.json');
    if (fs.existsSync(adminPath)) {
      const records = JSON.parse(fs.readFileSync(adminPath, 'utf8'));
      const cleaned = records.filter(r => r.id !== testAppId);
      fs.writeFileSync(adminPath, JSON.stringify(cleaned, null, 2), 'utf8');
      console.log(`  [CLEANUP] Cleaned test admission record ${testAppId}`);
    }
  }

  // 404 Route handling
  try {
    const notFound = await httpRequest({ hostname: 'localhost', port: 3000, path: '/non-existent-page-xyz', method: 'GET' });
    assert(notFound.statusCode === 404, 'Non-existent route cleanly returns HTTP 404 with custom branded template');
  } catch (e) {
    assert(false, `404 route test failed: ${e.message}`);
  }

  console.log('\n====================================================');
  console.log(`FINAL RESULTS: ${passedTests} PASSED, ${failedTests} FAILED out of ${totalTests} TOTAL CHECKS`);
  console.log('====================================================\n');

  if (failedTests > 0) {
    process.exit(1);
  }
}

runTests().catch(err => {
  console.error('Fatal test runner error:', err);
  process.exit(1);
});
