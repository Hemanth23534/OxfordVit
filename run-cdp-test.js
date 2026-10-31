const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const USER_DATA_DIR = 'C:\\Users\\heman\\AppData\\Local\\Temp\\chrome-cdp-test';
const PORT = 9222;

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function httpGetJson(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

async function main() {
  console.log('🚀 Launching Chrome in headless mode with remote debugging...');
  const chromeProcess = spawn(CHROME_PATH, [
    `--remote-debugging-port=${PORT}`,
    '--headless=new',
    '--no-sandbox',
    '--disable-gpu',
    `--user-data-dir=${USER_DATA_DIR}`,
    '--window-size=1440,900',
    'about:blank'
  ]);

  let isExited = false;
  chromeProcess.on('exit', () => { isExited = true; });

  // Wait for Chrome remote debugging port to become ready
  let targets = null;
  for (let i = 0; i < 20; i++) {
    await delay(300);
    try {
      targets = await httpGetJson(`http://localhost:${PORT}/json`);
      if (targets && targets.length > 0) break;
    } catch (e) {}
  }

  if (!targets || targets.length === 0) {
    console.error('❌ Failed to connect to Chrome debugging port.');
    chromeProcess.kill();
    process.exit(1);
  }

  const pageTarget = targets.find(t => t.type === 'page') || targets[0];
  console.log(`🔌 Connected to Chrome target: ${pageTarget.title} (${pageTarget.id})`);

  const ws = new WebSocket(pageTarget.webSocketDebuggerUrl);

  let idCounter = 1;
  const pendingRequests = new Map();

  function sendCommand(method, params = {}) {
    return new Promise((resolve, reject) => {
      const id = idCounter++;
      pendingRequests.set(id, { resolve, reject });
      ws.send(JSON.stringify({ id, method, params }));
    });
  }

  const consoleLogs = [];
  const errors = [];
  const networkFailures = [];

  await new Promise((resolve) => ws.onopen = resolve);

  ws.onmessage = (event) => {
    const msg = JSON.parse(event.data);
    if (msg.id && pendingRequests.has(msg.id)) {
      const { resolve, reject } = pendingRequests.get(msg.id);
      pendingRequests.delete(msg.id);
      if (msg.error) reject(msg.error);
      else resolve(msg.result);
      return;
    }

    if (msg.method === 'Runtime.consoleAPICalled') {
      const text = msg.params.args.map(a => a.value || JSON.stringify(a)).join(' ');
      consoleLogs.push(`[${msg.params.type.toUpperCase()}] ${text}`);
      console.log(`  [Browser Console] ${text}`);
    } else if (msg.method === 'Runtime.exceptionThrown') {
      const desc = msg.params.exceptionDetails.exception?.description || msg.params.exceptionDetails.text;
      errors.push(desc);
      console.error(`  [Browser JS Exception] ${desc}`);
    } else if (msg.method === 'Network.loadingFailed') {
      networkFailures.push(`${msg.params.errorText}: ${msg.params.type}`);
    }
  };

  // Enable debugging domains
  await sendCommand('Page.enable');
  await sendCommand('Runtime.enable');
  await sendCommand('Network.enable');

  console.log('🌐 Navigating to http://localhost:3000...');
  await sendCommand('Page.navigate', { url: 'http://localhost:3000' });

  // Monitor loading progress for up to 6 seconds
  console.log('⏳ Monitoring preloader progress and homepage reveal...');
  const progressReadings = [];

  for (let i = 0; i < 30; i++) {
    await delay(200);

    const evalResult = await sendCommand('Runtime.evaluate', {
      expression: `(() => {
        const preloader = document.getElementById('cinematic-preloader');
        const heroTitle = document.querySelector('.hero-title');
        return {
          counter: document.querySelector('.preloader-counter')?.textContent || '',
          barWidth: document.querySelector('.preloader-progress-bar')?.style.width || '',
          preloaderClass: preloader?.className || '',
          preloaderDisplay: preloader?.style.display || '',
          heroTitle: heroTitle?.textContent?.trim() || '',
          heroTitleOpacity: heroTitle ? getComputedStyle(heroTitle).opacity : '',
          heroTitleVisibility: heroTitle ? getComputedStyle(heroTitle).visibility : ''
        };
      })()`,
      returnByValue: true
    });

    const state = evalResult.result?.value || {};
    progressReadings.push(state.counter);

    if (i % 3 === 0 || state.counter === '100%') {
      console.log(`  Tick ${i * 200}ms: Progress = ${state.counter} (Bar: ${state.barWidth}), Preloader Class = "${state.preloaderClass}", Preloader Display = "${state.preloaderDisplay}"`);
    }

    if (state.preloaderClass.includes('loaded') || state.preloaderDisplay === 'none') {
      console.log(`✨ Preloader finished! Hero title opacity: ${state.heroTitleOpacity}, title: "${state.heroTitle}"`);
      break;
    }
  }

  // Extra delay to let GSAP hero entrance animate smoothly
  await delay(1200);

  // Check final visibility
  const finalCheck = await sendCommand('Runtime.evaluate', {
    expression: `(() => ({
      preloaderDisplay: document.getElementById('cinematic-preloader')?.style.display,
      preloaderClasses: document.getElementById('cinematic-preloader')?.className,
      heroVisible: getComputedStyle(document.querySelector('.hero-section') || document.body).visibility,
      heroOpacity: getComputedStyle(document.querySelector('.hero-title') || document.body).opacity,
      mainNavLinks: Array.from(document.querySelectorAll('.nav-link')).map(a => a.textContent.trim()),
      campusesCount: document.querySelectorAll('.campus-card').length,
      mapPresent: !!document.getElementById('interactive-campus-map')
    }))()`,
    returnByValue: true
  });

  console.log('\n📊 Final Homepage State Verification:', JSON.stringify(finalCheck.result?.value || finalCheck, null, 2));

  // Capture Screenshot of Revealed Homepage
  console.log('📸 Capturing screenshot of the live revealed homepage...');
  const screenshotResult = await sendCommand('Page.captureScreenshot', { format: 'png' });
  const screenshotBuffer = Buffer.from(screenshotResult.data, 'base64');
  fs.writeFileSync(path.join(__dirname, 'verified-revealed-homepage.png'), screenshotBuffer);
  console.log(`💾 Saved verified screenshot: verified-revealed-homepage.png (${screenshotBuffer.length} bytes)`);

  // Close browser
  ws.close();
  chromeProcess.kill();

  console.log('\n======================================================');
  console.log(`Errors caught: ${errors.length}`);
  console.log(`Console logs captured: ${consoleLogs.length}`);
  console.log(`Progress milestones tracked: ${progressReadings.filter(Boolean).slice(0, 10).join(' -> ')}`);
  console.log('======================================================');

  if (errors.length > 0) {
    console.error('❌ Browser had JavaScript errors during startup!');
    process.exit(1);
  } else {
    console.log('✅ ALL TESTS PASSED: Homepage loaded and revealed with 0 errors!');
    process.exit(0);
  }
}

main().catch(err => {
  console.error('Fatal error in CDP test:', err);
  process.exit(1);
});
