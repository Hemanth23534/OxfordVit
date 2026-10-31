/**
 * OXFORD VIT – THE LIVING CAMPUS EXPERIENCE
 * Cinematic Loading Experience & Opening Reveal
 * Includes: Animated Logo Reveal, Liquid Metallic Typography, Soft Floating Canvas Particles
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

    if (!this.preloader) return;
    this.init();
  }

  init() {
    this.initParticleCanvas();

    let progress = 0;
    const duration = 1400; // 1.4s fast and delightful opening
    const intervalTime = 20;
    const step = 100 / (duration / intervalTime);

    const timer = setInterval(() => {
      progress += step + (Math.random() * 2);
      if (progress >= 100) {
        progress = 100;
        clearInterval(timer);
        this.updateUI(100);
        setTimeout(() => this.finish(), 280);
      } else {
        this.updateUI(Math.floor(progress));
      }
    }, intervalTime);
  }

  initParticleCanvas() {
    this.particleCanvas = document.createElement('canvas');
    this.particleCanvas.style.position = 'absolute';
    this.particleCanvas.style.inset = '0';
    this.particleCanvas.style.pointerEvents = 'none';
    this.particleCanvas.style.zIndex = '1';
    this.preloader.insertBefore(this.particleCanvas, this.preloader.firstChild);

    this.ctx = this.particleCanvas.getContext('2d');
    this.resizeCanvas();
    window.addEventListener('resize', () => this.resizeCanvas());

    // Generate soft glowing particles
    const count = 48;
    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: Math.random() * this.particleCanvas.width,
        y: Math.random() * this.particleCanvas.height,
        radius: Math.random() * 3 + 1,
        color: i % 2 === 0 ? 'rgba(214, 183, 122, ' : 'rgba(185, 168, 216, ',
        alpha: Math.random() * 0.6 + 0.2,
        vx: (Math.random() - 0.5) * 0.6,
        vy: -Math.random() * 0.8 - 0.3
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
    if (!this.ctx || !this.particleCanvas) return;
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
    if (this.animId) cancelAnimationFrame(this.animId);
    this.preloader.classList.add('loaded');
    document.body.style.overflow = '';
    
    // Announce site is ready for GSAP hero entrance
    window.dispatchEvent(new CustomEvent('oxfordVitLoaded'));
  }
}
