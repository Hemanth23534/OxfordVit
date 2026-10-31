/**
 * OXFORD VIT – THE LIVING CAMPUS EXPERIENCE
 * Luxury Custom Cursor & Magnetic Interactions
 */

export class LuxuryCursor {
  constructor() {
    this.dot = document.querySelector('.custom-cursor-dot');
    this.ring = document.querySelector('.custom-cursor-ring');

    if (!this.dot || !this.ring) return;

    this.mouse = { x: -100, y: -100 };
    this.ringPos = { x: -100, y: -100 };
    this.isTouch = window.matchMedia('(pointer: coarse)').matches;

    if (this.isTouch) return;
    this.init();
  }

  init() {
    window.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
      this.dot.style.transform = `translate(${this.mouse.x}px, ${this.mouse.y}px)`;
    });

    // Hover magnification on interactive elements
    const interactiveTargets = 'a, button, input, select, textarea, .tab-btn, .campus-card, .ranker-card, .gallery-item, .youtube-preview-card, .hero-bhavan-item';

    document.addEventListener('mouseover', (e) => {
      if (e.target.closest(interactiveTargets)) {
        this.ring.classList.add('active');
      }
    });

    document.addEventListener('mouseout', (e) => {
      if (e.target.closest(interactiveTargets)) {
        this.ring.classList.remove('active');
      }
    });

    // Magnetic pull for high-priority buttons
    document.querySelectorAll('.btn-gold, .btn-botanical, .btn-coral').forEach((btn) => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${x * 0.22}px, ${y * 0.22}px)`;
      });

      btn.addEventListener('mouseleave', () => {
        btn.style.transform = '';
      });
    });

    // Smooth trailing loop
    this.render();
  }

  render() {
    this.ringPos.x += (this.mouse.x - this.ringPos.x) * 0.16;
    this.ringPos.y += (this.mouse.y - this.ringPos.y) * 0.16;

    this.ring.style.transform = `translate(${this.ringPos.x}px, ${this.ringPos.y}px)`;
    requestAnimationFrame(this.render.bind(this));
  }
}
