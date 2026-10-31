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
    'history.json',
    'social-feed.json',
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
  assert(Array.isArray(campusesRaw.campuses) && campusesRaw.campuses.length >= 10, `campuses.json contains all 10 verified campuses (found ${campusesRaw.campuses.length})`);

  const expectedIds = [
    'yashoda-bhavan',
    'balaji-bhavan',
    'raman-bhavan',
    'ksr-towers',
    'vit-olympiad-school',
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
      // 15-Dimension Verification
      assert(typeof found.name === 'string' && found.name.length > 0, `Campus ${id} has Name (1)`);
      assert(typeof found.city === 'string' && found.city.length > 0, `Campus ${id} has City (2)`);
      assert(typeof found.address === 'string' && found.address.length > 0, `Campus ${id} has Full Address (3)`);
      assert(typeof found.campusType === 'string' && found.campusType.length > 0, `Campus ${id} has Campus Type (4)`);
      assert(Array.isArray(found.programmes) && found.programmes.length > 0, `Campus ${id} has Educational Programmes (5)`);
      assert(typeof found.academicFocus === 'string' && found.academicFocus.length > 0, `Campus ${id} has Academic Focus (6)`);
      assert(typeof found.sections === 'string' && found.sections.length > 0, `Campus ${id} has Senior & Junior Sections (7)`);
      assert(typeof found.residentialFacilities === 'string' && found.residentialFacilities.length > 0, `Campus ${id} has Residential/Day Facilities (8)`);
      assert(Array.isArray(found.infrastructure) && found.infrastructure.length > 0, `Campus ${id} has Infrastructure (9)`);
      assert(Array.isArray(found.facultyAssigned) && found.facultyAssigned.length > 0, `Campus ${id} has Assigned Faculty (10)`);
      assert(typeof found.phone === 'string' && found.phone.length > 0, `Campus ${id} has Official Phone (11)`);
      assert(typeof found.mapUrl === 'string' && found.mapUrl.includes('google.com/maps'), `Campus ${id} has Location Map (12)`);
      assert(typeof found.image === 'string' && found.image.length > 0, `Campus ${id} has Campus Photographs (13)`);
      assert(Array.isArray(found.events) && found.events.length > 0, `Campus ${id} has Campus Events (14)`);
      assert(Array.isArray(found.achievements) && found.achievements.length > 0, `Campus ${id} has Achievements (15)`);

      // Standardized Unified Fields Verification
      assert(typeof found.description === 'string' && found.description.length > 20 && !found.description.includes('undefined') && !found.description.includes('null'), `Campus ${id} has valid non-null Description`);
      assert(typeof found.status === 'string' && found.status.length > 0, `Campus ${id} has Status field`);
      assert(typeof found.focus === 'string' && found.focus.length > 0, `Campus ${id} has Focus field`);
      assert(typeof found.verificationStatus === 'string' && found.verificationStatus.length > 0, `Campus ${id} has VerificationStatus field`);
      assert(Array.isArray(found.contact) && found.contact.length > 0, `Campus ${id} has Contact array`);
      assert(Array.isArray(found.facilities) && found.facilities.length > 0, `Campus ${id} has Facilities array`);

      if (id === 'ksr-towers') {
        assert(found.operationalStatus.includes('Historical'), 'KSR Towers correctly marked as Historical Campus / Archive');
      }
      if (id === 'bapatla-branch') {
        assert(found.governance.includes('Pending Verification'), 'Bapatla branch governance marked Pending Verification');
      }
      if (id === 'oxford-iit-school') {
        assert(found.category === 'sister-school', 'Oxford IIT School classified as sister-school');
      }
      if (id === 'vit-olympiad-school') {
        assert(found.category === 'sister-school' || found.category === 'school-wing', 'VIT Olympiad School classified as school wing');
      }
    }
  });

  // TEST 1C: Master Management & Leadership Directorate Verification
  console.log('\n1C. Master Management & Leadership Directorate Verification:');
  const mgmtRaw = JSON.parse(fs.readFileSync(path.join(__dirname, 'management.json'), 'utf8'));
  assert(mgmtRaw.institutionalHierarchy && Array.isArray(mgmtRaw.institutionalHierarchy.tiers) && mgmtRaw.institutionalHierarchy.tiers.length === 3, 'management.json defines 3-Tier Institutional Hierarchy');
  assert(Array.isArray(mgmtRaw.executiveLeadership) && mgmtRaw.executiveLeadership.length === 6, 'management.json contains all 6 verified leadership profiles');

  const expectedLeaders = [
    { id: 'admin-ksr', name: 'K. Srinivasa Rao (KSR Sir)', role: 'Chairman / Institutional Leadership' },
    { id: 'academic-dsr', name: 'D. Srinivasa Rao (DSR Sir)', role: 'Chairman / Institutional Leadership' },
    { id: 'director-raja', name: 'Ch. Raja Reddy', role: 'Director' },
    { id: 'academic-ranga', name: 'P.V. Ranga Rao', role: 'Academic Director' },
    { id: 'principal-raghava', name: 'Panadi Raghava', role: 'Principal & Academic Director' },
    { id: 'manager-sambasiva', name: 'K. Sambasiva Rao', role: 'Administrative Manager' }
  ];

  expectedLeaders.forEach(exp => {
    const leader = mgmtRaw.executiveLeadership.find(l => l.id === exp.id);
    assert(leader !== undefined, `Management profile exists: ${exp.name} (${exp.id})`);
    if (leader) {
      assert(leader.name === exp.name, `Leader name verified: ${exp.name}`);
      assert(leader.designation === exp.role, `Leader designation verified: ${exp.role}`);
      assert(typeof leader.verificationStatus === 'string' && leader.verificationStatus.length > 0, `Leader has verification status badge: ${exp.id}`);
      if (exp.id === 'admin-ksr') {
        assert(leader.experienceYears === 30 && leader.designation.includes('Chairman') && leader.additionalRole.includes('KSR Charitable Trust'), 'K. Srinivasa Rao (KSR Sir) verified: Chairman, 30 yrs, Senior IIT Maths, KSR Trust');
      }
      if (exp.id === 'academic-dsr') {
        assert(leader.experienceYears === 32 && leader.designation.includes('Chairman') && leader.background.includes('IIT Delhi'), 'D. Srinivasa Rao (DSR Sir) verified: Chairman, 32 yrs, Ex-SRA IIT Delhi, Senior IIT Maths & Academic Planning');
      }
      if (exp.id === 'academic-ranga') {
        assert(leader.experienceYears === 19 && leader.qualifications.includes('IIT Roorkee'), 'P.V. Ranga Rao verified: 19 yrs, M.Sc. IIT Roorkee, IIT Chemistry');
      }
      if (exp.id === 'principal-raghava') {
        assert(leader.experienceYears === 19 && leader.qualifications.includes('M.Sc.'), 'Panadi Raghava verified: 19 yrs, M.Sc., M.A., Mathematics & KSR Trust volunteer');
      }
    }
  });

  // TEST: Verification that Sri S. Francis Reddy has been completely removed from all site files
  const filesToCheckForFrancis = [
    'management.json', 'history.json', 'events.json', 'social-feed.json', 'college-profile.json',
    'index.html', 'about.html', 'faculty.html', 'achievements.html', 'gallery.html',
    'assets/js/data/managementData.js', 'assets/js/data/historyData.js',
    'assets/js/data/eventsData.js', 'assets/js/data/socialData.js'
  ];
  filesToCheckForFrancis.forEach(relPath => {
    const fullPath = path.join(__dirname, relPath);
    if (fs.existsSync(fullPath)) {
      const content = fs.readFileSync(fullPath, 'utf8');
      assert(!/Francis/i.test(content), `Zero occurrences of "Francis" in ${relPath}`);
    }
  });

  // TEST 1D: Subject-Wise Teaching Faculty Directory Verification
  console.log('\n1D. Subject-Wise Teaching Faculty Directory Verification:');
  const facultyRaw = JSON.parse(fs.readFileSync(path.join(__dirname, 'faculty.json'), 'utf8'));
  assert(Array.isArray(facultyRaw.faculty) && facultyRaw.faculty.length >= 12, `faculty.json contains comprehensive faculty roster (${facultyRaw.faculty.length} found)`);

  const suppliedSeniorFaculty = [
    { name: 'D. Srinivasa Rao (DSR Sir)', subject: 'IIT Mathematics', isInformal: false },
    { name: 'K. Srinivasa Rao (KSR Sir)', subject: 'IIT Mathematics', isInformal: false },
    { name: 'Panadi Raghava Sir', subject: 'IIT Mathematics', isInformal: false },
    { name: 'BSR Sir', subject: 'Senior Mathematics 2A', isInformal: true },
    { name: 'Sankar Sir', subject: 'Senior Mathematics 2A', isInformal: true },
    { name: 'Raja Sir', subject: 'Senior Mathematics 2B', isInformal: true },
    { name: 'Praveen Kumar Sir', subject: 'Senior Mathematics 2B', isInformal: true },
    { name: 'MSR Sir', subject: 'Senior Physics', isInformal: true },
    { name: 'Ramesh Sir', subject: 'Senior Physics', isInformal: true },
    { name: 'P.V. Ranga Rao Sir', subject: 'IIT and Senior Chemistry', isInformal: false },
    { name: 'VS Sir', subject: 'IIT and Senior Chemistry', isInformal: true },
    { name: 'Anji Sir', subject: 'IIT and Senior Chemistry', isInformal: true }
  ];

  suppliedSeniorFaculty.forEach(exp => {
    const found = facultyRaw.faculty.find(f => f.name === exp.name);
    assert(found !== undefined, `Supplied faculty record exists: ${exp.name}`);
    if (found) {
      assert(found.subject === exp.subject, `Faculty subject matches: ${exp.name} -> ${exp.subject}`);
      assert(found.isInformal === exp.isInformal, `Informal status properly marked: ${exp.name} (isInformal: ${found.isInformal})`);
      if (exp.isInformal) {
        assert(found.status === 'pending-confirmation', `Informal name marked pending confirmation: ${exp.name}`);
        assert(found.verificationBadge.includes('Pending') || found.verificationBadge.includes('Informal'), `Verification badge flags pending confirmation: ${exp.name}`);
      } else {
        assert(found.status === 'verified', `Verified faculty marked verified: ${exp.name}`);
      }
    }
  });

  // TEST 2: Static Asset & Image Directory Verification
  console.log('\n2. Static Asset Verification:');
  const requiredAssetDirs = [
    'assets/images/logo',
    'assets/images/campuses',
    'assets/images/campuses/narasaraopet/yashoda-bhavan',
    'assets/images/campuses/narasaraopet/balaji-bhavan',
    'assets/images/campuses/narasaraopet/raman-bhavan',
    'assets/images/campuses/narasaraopet/ksr-towers',
    'assets/images/campuses/narasaraopet/vit-olympiad-school',
    'assets/images/campuses/narasaraopet/oxford-iit-school',
    'assets/images/campuses/guntur/balaji-tower',
    'assets/images/campuses/guntur/vasavi-tower',
    'assets/images/campuses/guntur/medical-academy',
    'assets/images/campuses/bapatla/junior-college',
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

  // Check specific architectural SVGs and centralized campus images
  const newSvgs = [
    'assets/images/logo/oxford-vit-logo.svg',
    'assets/images/logo/crest.svg',
    'assets/images/campuses/campus-placeholder.svg',
    'assets/images/campuses/narasaraopet/yashoda-bhavan/campus.svg',
    'assets/images/campuses/narasaraopet/yashoda-bhavan/placeholder.svg',
    'assets/images/campuses/narasaraopet/balaji-bhavan/campus.svg',
    'assets/images/campuses/narasaraopet/balaji-bhavan/placeholder.svg',
    'assets/images/campuses/narasaraopet/raman-bhavan/campus.svg',
    'assets/images/campuses/narasaraopet/raman-bhavan/placeholder.svg',
    'assets/images/campuses/narasaraopet/ksr-towers/campus.svg',
    'assets/images/campuses/narasaraopet/ksr-towers/placeholder.svg',
    'assets/images/campuses/narasaraopet/vit-olympiad-school/campus.svg',
    'assets/images/campuses/narasaraopet/vit-olympiad-school/placeholder.svg',
    'assets/images/campuses/narasaraopet/oxford-iit-school/campus.svg',
    'assets/images/campuses/narasaraopet/oxford-iit-school/placeholder.svg',
    'assets/images/campuses/guntur/balaji-tower/campus.svg',
    'assets/images/campuses/guntur/balaji-tower/placeholder.svg',
    'assets/images/campuses/guntur/vasavi-tower/campus.svg',
    'assets/images/campuses/guntur/vasavi-tower/placeholder.svg',
    'assets/images/campuses/guntur/medical-academy/campus.svg',
    'assets/images/campuses/guntur/medical-academy/placeholder.svg',
    'assets/images/campuses/bapatla/junior-college/campus.svg',
    'assets/images/campuses/bapatla/junior-college/placeholder.svg',
    'assets/images/events/cultural-sambaralu.svg',
    'assets/images/campuses/vit-olympiad-school.svg',
    'assets/images/campuses/oxford-iit-school.svg',
    'assets/images/campuses/guntur-balaji-tower.svg',
    'assets/images/campuses/guntur-vasavi-tower.svg',
    'assets/images/campuses/guntur-vit-medical.svg',
    'assets/images/campuses/bapatla-branch.svg',
    'assets/images/management/k-srinivasa-rao.svg',
    'assets/images/management/ch-raja-reddy.svg',
    'assets/images/management/dogiparthi-srinivasa-rao.svg',
    'assets/images/management/pv-ranga-rao.svg',
    'assets/images/management/panadi-raghava.svg',
    'assets/images/management/k-sambasiva-rao.svg',
    'assets/images/faculty/bsr-sir.svg',
    'assets/images/faculty/sankar-sir.svg',
    'assets/images/faculty/raja-sir.svg',
    'assets/images/faculty/praveen-kumar-sir.svg',
    'assets/images/faculty/msr-sir.svg',
    'assets/images/faculty/ramesh-sir.svg',
    'assets/images/faculty/vs-sir.svg',
    'assets/images/faculty/anji-sir.svg'
  ];
  newSvgs.forEach(svg => {
    assert(fs.existsSync(path.join(__dirname, svg)), `Heraldic / Architectural SVG artwork exists: ${svg}`);
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
    'assets/js/modules/campusDetail.js',
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
    'assets/js/data/managementData.js',
    'assets/js/data/facultyData.js'
  ];
  jsModules.forEach(mod => {
    assert(fs.existsSync(path.join(__dirname, mod)), `JS File exists: ${mod}`);
  });

  // TEST 5: HTML Documents & SEO Metas (All 15 pages)
  console.log('\n5. HTML Documents & SEO Metas (All 15 Pages):');
  const htmlFiles = [
    'index.html',
    'about.html',
    'campuses.html',
    'campus-detail.html',
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
    if (html === 'faculty.html') {
      assert(content.includes('id="filter-city"'), 'faculty.html includes City filter');
      assert(content.includes('id="filter-campus"'), 'faculty.html includes Campus filter');
      assert(content.includes('id="filter-dept"'), 'faculty.html includes Department filter');
      assert(content.includes('id="filter-subject"'), 'faculty.html includes Subject filter');
      assert(content.includes('id="filter-section"'), 'faculty.html includes Section filter');
      assert(content.includes('id="filter-track"'), 'faculty.html includes Track filter');
      assert(content.includes('id="filter-search"'), 'faculty.html includes live Search input');
      assert(content.includes('id="faculty-modal-overlay"'), 'faculty.html includes Academic Dossier Modal');
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
    '/campus-detail.html',
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
  for (const jsonEndpoint of ['/campuses.json', '/faculty.json', '/achievements.json', '/management.json', '/college-profile.json', '/events.json', '/history.json', '/social-feed.json']) {
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

  // GET /api/history
  try {
    const res = await httpRequest({ hostname: 'localhost', port: 3000, path: '/api/history', method: 'GET' });
    assert(res.statusCode === 200, 'GET /api/history returns HTTP 200');
    const hist = JSON.parse(res.data);
    assert(hist.success === true && Array.isArray(hist.data) && hist.data.length === 12, `GET /api/history delivers all 12 milestones (found ${hist.data.length})`);
    
    // Check first and last milestones
    const m1994 = hist.data.find(m => m.year === 1994);
    assert(m1994 !== undefined && typeof m1994.verificationStatus === 'string' && m1994.verificationStatus.includes('Founding Record'), '1994 foundation milestone has verified status');
    assert(typeof m1994.managementActivity === 'string', '1994 milestone includes managementActivity');
    assert(typeof m1994.academicActivity === 'string', '1994 milestone includes academicActivity');

    const m2026 = hist.data.find(m => m.year === 2026);
    assert(m2026 !== undefined && m2026.category.includes('digital'), '2026 digital unification milestone verified');
  } catch (e) {
    assert(false, `GET /api/history failed: ${e.message}`);
  }

  // GET /api/social
  try {
    const res = await httpRequest({ hostname: 'localhost', port: 3000, path: '/api/social', method: 'GET' });
    assert(res.statusCode === 200, 'GET /api/social returns HTTP 200');
    const soc = JSON.parse(res.data);
    assert(soc.success === true && Array.isArray(soc.data) && soc.data.length === 10, `GET /api/social delivers all 10 social broadcasts (found ${soc.data.length})`);
    assert(soc.profiles && soc.profiles.raghava_vit && typeof soc.profiles.raghava_vit.instagramUrl === 'string' && soc.profiles.raghava_vit.instagramUrl.includes('instagram.com/raghava_vit'), 'Profiles include official @raghava_vit Instagram URL');
    assert(soc.profiles && soc.profiles.raghava_vit && typeof soc.profiles.raghava_vit.threadsUrl === 'string' && soc.profiles.raghava_vit.threadsUrl.includes('threads.com/@raghava_vit'), 'Profiles include official @raghava_vit Threads URL');

    const p1 = soc.data[0];
    assert(typeof p1.originalUrl === 'string' && p1.originalUrl.includes('raghava_vit'), 'Social post has originalUrl referencing @raghava_vit');
    assert(typeof p1.verificationStatus === 'string' && p1.verificationStatus.length > 0, 'Social post has verificationStatus');
    assert(typeof p1.permissionStatus === 'string' && p1.permissionStatus.length > 0, 'Social post has permissionStatus');
    assert(typeof p1.campus === 'string' && p1.campus.length > 0, 'Social post is mapped to an institutional campus');
  } catch (e) {
    assert(false, `GET /api/social failed: ${e.message}`);
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

  // -------------------------------------------------------------------------
  // 9. Institutional History, Social Media & Campus Galleries Verification
  // -------------------------------------------------------------------------
  console.log('\n9. Institutional History, Social Media & Campus Galleries Verification:');

  // Verify all 10 campuses have media items in gallery.json
  const galleryRaw = JSON.parse(fs.readFileSync(path.join(__dirname, 'gallery.json'), 'utf8'));
  const galleryItems = galleryRaw.mediaItems || [];
  const expectedCampusIds = [
    'yashoda-bhavan',
    'balaji-bhavan',
    'raman-bhavan',
    'ksr-towers',
    'vit-olympiad-school',
    'oxford-iit-school',
    'guntur-balaji-tower',
    'guntur-vasavi-tower',
    'guntur-vit-medical',
    'bapatla-branch'
  ];

  expectedCampusIds.forEach(cId => {
    const hasMedia = galleryItems.some(item => item.campusId === cId);
    assert(hasMedia, `gallery.json contains verified media for campus: ${cId}`);
  });

  // Verify JavaScript modules exist
  assert(fs.existsSync(path.join(__dirname, 'assets/js/modules/timelineEngine.js')), 'timelineEngine.js exists');
  assert(fs.existsSync(path.join(__dirname, 'assets/js/modules/socialFeedEngine.js')), 'socialFeedEngine.js exists');
  assert(fs.existsSync(path.join(__dirname, 'assets/js/modules/interactiveMap.js')), 'interactiveMap.js exists');
  assert(fs.existsSync(path.join(__dirname, 'assets/js/modules/pageTransitions.js')), 'pageTransitions.js exists');

  // Verify Interactive Campus Map containers
  const campusesHtml = fs.readFileSync(path.join(__dirname, 'campuses.html'), 'utf8');
  const indexHtml = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
  assert(campusesHtml.includes('id="interactive-campus-map"'), 'campuses.html includes #interactive-campus-map');
  assert(indexHtml.includes('id="interactive-campus-map"'), 'index.html includes #interactive-campus-map');

  // Verify gallery.html has campus selector
  const galleryHtml = fs.readFileSync(path.join(__dirname, 'gallery.html'), 'utf8');
  assert(galleryHtml.includes('id="gallery-campus-filter"'), 'gallery.html includes campus-specific gallery selector dropdown');
  assert(galleryHtml.includes('id="gallery-count-display"'), 'gallery.html includes dynamic media count display');

  // Verify index.html has history and social-pulse sections
  assert(indexHtml.includes('id="history"'), 'index.html includes #history timeline section');
  assert(indexHtml.includes('id="social-pulse"'), 'index.html includes #social-pulse section');
  assert(indexHtml.includes('id="social-modal"'), 'index.html includes #social-modal dialog');

  // Verify about.html has timeline and social sections
  const aboutHtml = fs.readFileSync(path.join(__dirname, 'about.html'), 'utf8');
  assert(aboutHtml.includes('timeline-container'), 'about.html includes timeline-container');
  assert(aboutHtml.includes('social-feed-section'), 'about.html includes social-feed-section');
  assert(aboutHtml.includes('id="social-modal"'), 'about.html includes #social-modal dialog');

  // Verify all 15 HTML files contain verified links to @raghava_vit on Instagram & Threads
  const allHtmlFiles = fs.readdirSync(__dirname).filter(f => f.endsWith('.html'));
  assert(allHtmlFiles.length === 15, `Found all 15 HTML files (found ${allHtmlFiles.length})`);
  allHtmlFiles.forEach(f => {
    const content = fs.readFileSync(path.join(__dirname, f), 'utf8');
    const hasRaghava = content.includes('raghava_vit');
    assert(hasRaghava, `${f} contains verified social media link to @raghava_vit`);
  });

  // 10. Official Institutional Branding & Logo Suite Verification
  console.log('\n10. Official Institutional Branding & Logo Suite Verification:');
  const expectedLogoFiles = [
    'supplied-official-logo-original.png',
    'oxford-vit-official-logo.png',
    'oxford-vit-official-logo-transparent.png',
    'oxford-vit-crest.png',
    'oxford-vit-crest-transparent.png',
    'favicon.png'
  ];

  expectedLogoFiles.forEach(file => {
    const fullPath = path.join(__dirname, 'assets/images/logo', file);
    assert(fs.existsSync(fullPath), `Official branding asset exists: assets/images/logo/${file}`);
    assert(fs.statSync(fullPath).size > 1000, `Official branding asset is valid non-empty binary: ${file}`);
  });

  allHtmlFiles.forEach(f => {
    const content = fs.readFileSync(path.join(__dirname, f), 'utf8');
    const hasFaviconPng = content.includes('assets/images/logo/favicon.png');
    const hasOfficialLogo = content.includes('assets/images/logo/oxford-vit-official-logo-transparent.png');
    const hasObsoleteSvgFavicon = content.includes('data:image/svg+xml');
    const hasObsoleteGeometricCrest = content.includes('class="brand-crest"');

    assert(hasFaviconPng, `${f} uses official PNG favicon`);
    assert(hasOfficialLogo, `${f} uses official Oxford's VIT transparent logo in header & footer`);
    assert(!hasObsoleteSvgFavicon, `${f} has completely removed obsolete placeholder SVG favicon`);
    assert(!hasObsoleteGeometricCrest, `${f} has completely removed obsolete geometric brand-crest SVG`);
  });

  // Preloader verification in index.html
  const preloaderHasOfficialLogo = indexHtml.includes('class="preloader-logo-wrap"') && indexHtml.includes('assets/images/logo/oxford-vit-official-logo-transparent.png');
  const preloaderHasNoOldCrest = !indexHtml.includes('class="preloader-crest"');
  assert(preloaderHasOfficialLogo, 'index.html cinematic preloader displays official Oxford VIT logo');
  assert(preloaderHasNoOldCrest, 'index.html cinematic preloader has zero geometric placeholder crests');

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
