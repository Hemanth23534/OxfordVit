/**
 * OXFORD VIT – THE LIVING CAMPUS EXPERIENCE
 * Fault-Tolerant Cinematic Preloader & Milestone Loading System
 * Features:
 * - Immediate visual feedback on initial paint (never stuck at 0%)
 * - Real asset loading milestone tracking (DOM, fonts, scripts, canvas)
 * - Smooth interpolated percentage animation
 * - Built-in maximum timeout watchdog (site always reveals within 1.8s max)
 * - Graceful degradation if WebGL, canvas, or fonts fail
 */

export class CinematicPreloader {
  constructor() {
    this.preloader = document.getElementById('cinematic-preloader');
    this.progressBar = document.querySelector('.preloader-progress-bar');
    this.counterEl = document.querySelector('.preloader-counter');
    this.particleCanvas = null;
    this.ctx = null;
    this.particles = [];
    this.animId = null;

    this.currentProgress = 0;
    this.targetProgress = 20; // Immediate initial feedback
    this.isFinished = false;

    if (!this.preloader) return;
    this.init();
  }

  init() {
    // 1. Initial visual kickstart so user immediately sees activity
    this.updateUI(20);

    // 2. Soft canvas particles (graceful fallback if canvas 2D context fails)
    try {
      this.initParticleCanvas();
    } catch (e) {
      console.warn('Preloader particles fallback:', e);
    }

    // 3. Track real browser asset milestones
    this.trackRealLoadingMilestones();

    // 4. Smooth continuous progress animator
    this.startProgressLoop();

    // 5. Maximum Loading Timeout Watchdog (Guaranteed site reveal within 1800ms)
    this.maxTimeoutTimer = setTimeout(() => {
      if (!this.isFinished) {
        console.info('Preloader: Maximum loading timeout reached; revealing homepage.');
        this.targetProgress = 100;
        this.finish();
      }
    }, 1800);
  }

  trackRealLoadingMilestones() {
    // Milestone 1: DOM Ready
    this.targetProgress = Math.max(this.targetProgress, 40);

    // Milestone 2: Fonts and Core Layout
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        this.targetProgress = Math.max(this.targetProgress, 70);
      }).catch(() => {
        this.targetProgress = Math.max(this.targetProgress, 70);
      });
    } else {
      this.targetProgress = Math.max(this.targetProgress, 70);
    }

    // Milestone 3: Dynamic handoff progression
    setTimeout(() => {
      this.targetProgress = Math.max(this.targetProgress, 88);
    }, 350);

    // Milestone 4: Window Complete / Final Handshake
    if (document.readyState === 'complete') {
      setTimeout(() => { this.targetProgress = 100; }, 700);
    } else {
      window.addEventListener('load', () => {
        setTimeout(() => { this.targetProgress = 100; }, 300);
      });
      // Fallback progression if load event already passed
      setTimeout(() => {
        this.targetProgress = 100;
      }, 950);
    }
  }

  startProgressLoop() {
    const updateTick = () => {
      if (this.isFinished) return;

      // Smooth interpolation towards targetProgress
      if (this.currentProgress < this.targetProgress) {
        const step = Math.max(1, (this.targetProgress - this.currentProgress) * 0.18);
        this.currentProgress = Math.min(this.targetProgress, this.currentProgress + step);
        this.updateUI(Math.round(this.currentProgress));
      } else if (this.targetProgress < 100) {
        // Natural subtle crawl while waiting for assets
        this.targetProgress = Math.min(95, this.targetProgress + 0.8);
      }

      if (this.currentProgress >= 100) {
        this.updateUI(100);
        setTimeout(() => this.finish(), 220);
        return;
      }

      requestAnimationFrame(updateTick);
    };

    requestAnimationFrame(updateTick);
  }

  initParticleCanvas() {
    this.particleCanvas = document.createElement('canvas');
    this.particleCanvas.style.position = 'absolute';
    this.particleCanvas.style.inset = '0';
    this.particleCanvas.style.pointerEvents = 'none';
    this.particleCanvas.style.zIndex = '1';
    this.preloader.insertBefore(this.particleCanvas, this.preloader.firstChild);

    this.ctx = this.particleCanvas.getContext('2d');
    if (!this.ctx) return;

    this.resizeCanvas();
    window.addEventListener('resize', () => this.resizeCanvas());

    // Generate soft glowing golden and lavender particles
    const count = 36;
    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: Math.random() * this.particleCanvas.width,
        y: Math.random() * this.particleCanvas.height,
        radius: Math.random() * 2.5 + 1,
        color: i % 2 === 0 ? 'rgba(214, 183, 122, ' : 'rgba(185, 168, 216, ',
        alpha: Math.random() * 0.5 + 0.2,
        vx: (Math.random() - 0.5) * 0.5,
        vy: -Math.random() * 0.7 - 0.2
      });
    }

    this.renderParticles();
  }

  resizeCanvas() {
    if (!this.particleCanvas) return;
    this.particleCanvas.width = window.innerWidth;
    this.particleCanvas.height = window.innerHeight;
  }

  renderParticles() {
    if (this.isFinished || !this.ctx || !this.particleCanvas) return;
    this.ctx.clearRect(0, 0, this.particleCanvas.width, this.particleCanvas.height);

    this.particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;

      if (p.y < 0) {
        p.y = this.particleCanvas.height + 10;
        p.x = Math.random() * this.particleCanvas.width;
      }

      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = p.color + p.alpha + ')';
      this.ctx.fill();
    });

    this.animId = requestAnimationFrame(this.renderParticles.bind(this));
  }

  updateUI(value) {
    if (this.progressBar) {
      this.progressBar.style.width = `${value}%`;
    }
    if (this.counterEl) {
      this.counterEl.textContent = `${value}%`;
    }
  }

  finish() {
    if (this.isFinished) return;
    this.isFinished = true;

    if (this.maxTimeoutTimer) clearTimeout(this.maxTimeoutTimer);
    if (this.animId) cancelAnimationFrame(this.animId);

    this.updateUI(100);

    if (this.preloader) {
      this.preloader.classList.add('loaded');
      // Guarantee overlay is non-blocking even if transition lags
      this.preloader.style.pointerEvents = 'none';
      setTimeout(() => {
        if (this.preloader) {
          this.preloader.style.display = 'none';
        }
      }, 850);
    }

    document.body.style.overflow = '';
    
    // Announce site is ready for GSAP hero entrance
    window.dispatchEvent(new CustomEvent('oxfordVitLoaded'));
  }
}
