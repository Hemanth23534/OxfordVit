/**
 * OXFORD VIT – THE LIVING CAMPUS EXPERIENCE
 * Vanilla 3D Card Tilt & Specular Glare Logic
 */

export class Tilt3DEngine {
  constructor() {
    this.cards = document.querySelectorAll('.campus-card, .academic-program-card, .ranker-card, .leader-card, .youtube-preview-card, .trust-pillar-card');
    this.isTouch = window.matchMedia('(pointer: coarse)').matches;

    if (this.isTouch) return;
    this.init();
  }

  init() {
    this.cards.forEach((card) => {
      // Inject glare layer if not present
      if (!card.querySelector('.card-glare')) {
        const glare = document.createElement('div');
        glare.className = 'card-glare';
        card.appendChild(glare);
      }

      card.addEventListener('mousemove', (e) => this.handleMouseMove(e, card));
      card.addEventListener('mouseleave', () => this.handleMouseLeave(card));
    });
  }

  handleMouseMove(e, card) {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -6; // Max 6 deg tilt
    const rotateY = ((x - centerX) / centerX) * 6;

    card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-6px)`;

    const glare = card.querySelector('.card-glare');
    if (glare) {
      const glareX = (x / rect.width) * 100;
      const glareY = (y / rect.height) * 100;
      glare.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255, 255, 255, 0.4) 0%, transparent 60%)`;
      glare.style.opacity = '1';
    }
  }

  handleMouseLeave(card) {
    card.style.transform = '';
    const glare = card.querySelector('.card-glare');
    if (glare) {
      glare.style.opacity = '0';
    }
  }
}
