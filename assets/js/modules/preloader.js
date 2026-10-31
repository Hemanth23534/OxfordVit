/**
 * OXFORD VIT – THE LIVING CAMPUS EXPERIENCE
 * Cinematic Loading Experience & Opening Reveal
 */

export class CinematicPreloader {
  constructor() {
    this.preloader = document.getElementById('cinematic-preloader');
    this.progressBar = document.querySelector('.preloader-progress-bar');
    this.counterEl = document.querySelector('.preloader-counter');

    if (!this.preloader) return;
    this.init();
  }

  init() {
    let progress = 0;
    const duration = 1400; // Fast and delightful (1.4 seconds)
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

  updateUI(value) {
    if (this.progressBar) {
      this.progressBar.style.width = `${value}%`;
    }
    if (this.counterEl) {
      this.counterEl.textContent = `${value}%`;
    }
  }

  finish() {
    this.preloader.classList.add('loaded');
    document.body.style.overflow = '';
    
    // Dispatch event to announce site is ready for GSAP hero entrance
    window.dispatchEvent(new CustomEvent('oxfordVitLoaded'));
  }
}
