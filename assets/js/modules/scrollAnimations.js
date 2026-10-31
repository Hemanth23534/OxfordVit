/**
 * OXFORD VIT – THE LIVING CAMPUS EXPERIENCE
 * GSAP & ScrollTrigger Editorial Motion Architecture
 */

export class ScrollAnimationEngine {
  constructor() {
    this.hasGSAP = typeof gsap !== 'undefined';
    this.hasScrollTrigger = typeof ScrollTrigger !== 'undefined';
    this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    this.init();
  }

  init() {
    if (this.prefersReducedMotion) {
      this.fallbackReveals();
      return;
    }

    if (this.hasGSAP && this.hasScrollTrigger) {
      gsap.registerPlugin(ScrollTrigger);
      this.initHeaderScroll();
      this.initHeroEntrance();
      this.initSectionHeaders();
      this.initStatCounters();
      this.initCardStaggers();
    } else {
      this.fallbackReveals();
    }
  }

  initHeaderScroll() {
    const header = document.querySelector('.site-header');
    if (!header) return;

    ScrollTrigger.create({
      start: 'top -50',
      onUpdate: (self) => {
        if (self.direction === 1 || window.scrollY > 60) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }
      }
    });
  }

  initHeroEntrance() {
    const heroTl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 1.1 } });

    heroTl
      .from('.hero-badge-wrap', { opacity: 0, y: 25, delay: 0.2 })
      .from('.hero-title', { opacity: 0, y: 35, duration: 1.2 }, '-=0.8')
      .from('.hero-description', { opacity: 0, y: 25 }, '-=0.8')
      .from('.hero-cta-group', { opacity: 0, y: 20 }, '-=0.7')
      .from('.hero-visual-card', { opacity: 0, scale: 0.94, y: 40, duration: 1.3 }, '-=1')
      .from('.stat-item', { opacity: 0, y: 20, stagger: 0.12 }, '-=0.8');
  }

  initSectionHeaders() {
    const headers = document.querySelectorAll('.section-header');
    headers.forEach((header) => {
      gsap.from(header.children, {
        scrollTrigger: {
          trigger: header,
          start: 'top 85%',
          toggleActions: 'play none none none'
        },
        opacity: 0,
        y: 35,
        stagger: 0.18,
        duration: 0.95,
        ease: 'power2.out'
      });
    });
  }

  initStatCounters() {
    const counterElements = document.querySelectorAll('.stat-number');
    counterElements.forEach((el) => {
      const originalText = el.textContent.trim();
      const numMatch = originalText.match(/\d+/);
      if (!numMatch) return;

      const targetValue = parseInt(numMatch[0], 10);
      const prefix = originalText.split(targetValue)[0] || '';
      const suffix = originalText.split(targetValue)[1] || '';

      const counterObj = { val: 0 };

      ScrollTrigger.create({
        trigger: el,
        start: 'top 90%',
        once: true,
        onEnter: () => {
          gsap.to(counterObj, {
            val: targetValue,
            duration: 2.2,
            ease: 'power2.out',
            onUpdate: () => {
              el.innerHTML = `${prefix}${Math.floor(counterObj.val)}<span class="accent">${suffix}</span>`;
            }
          });
        }
      });
    });
  }

  initCardStaggers() {
    const cardContainers = [
      '.campus-cards-grid',
      '.academics-grid',
      '.rankers-grid',
      '.management-grid',
      '.faculty-grid',
      '.student-life-grid',
      '.events-grid'
    ];

    cardContainers.forEach((selector) => {
      const container = document.querySelector(selector);
      if (!container) return;

      gsap.from(container.children, {
        scrollTrigger: {
          trigger: container,
          start: 'top 82%',
          toggleActions: 'play none none none'
        },
        opacity: 0,
        y: 45,
        stagger: 0.12,
        duration: 0.85,
        ease: 'power2.out'
      });
    });
  }

  fallbackReveals() {
    // Pure CSS intersection observer fallback if GSAP isn't present
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    document.querySelectorAll('.glass-card, .campus-card, .academic-program-card, .leader-card, .event-card').forEach((el) => {
      el.classList.add('reveal-on-scroll');
      observer.observe(el);
    });
  }
}
