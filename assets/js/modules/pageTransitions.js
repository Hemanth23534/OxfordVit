/**
 * OXFORD VIT – THE LIVING CAMPUS EXPERIENCE
 * Cinematic Dual-Curtain Page Transitions Engine
 * Design: Champagne Gold + Deep Plum + Crest Seal Reveal
 */

export class PageTransitionsEngine {
  constructor() {
    this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.isTransitioning = false;
    this.overlay = null;

    this.init();
  }

  init() {
    this.createTransitionOverlay();
    this.bindLinkInterception();
    this.revealPageOnLoad();

    // Reset overlay if loaded from back/forward cache (bfcache)
    window.addEventListener('pageshow', (e) => {
      if (e.persisted) {
        this.resetOverlay();
      }
    });
  }

  createTransitionOverlay() {
    let overlay = document.getElementById('cinematic-page-transition');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = 'cinematic-page-transition';
      overlay.className = 'cinematic-transition-curtain';
      overlay.setAttribute('aria-hidden', 'true');
      overlay.innerHTML = `
        <div class="transition-panel panel-left"></div>
        <div class="transition-panel panel-right"></div>
        <div class="transition-brand-crest">
          <div class="crest-icon-ring">
            <svg width="42" height="42" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
            </svg>
          </div>
          <div class="crest-title">OXFORD VIT</div>
          <div class="crest-tagline">Where Knowledge Takes Shape</div>
        </div>
      `;
      document.body.appendChild(overlay);
    }
    this.overlay = overlay;
  }

  bindLinkInterception() {
    document.addEventListener('click', (e) => {
      const targetLink = e.target.closest('a');
      if (!targetLink) return;

      const href = targetLink.getAttribute('href');
      if (!href) return;

      // Ignore external links, downloads, mailto, tel, empty links, or hash-only links
      if (
        targetLink.target === '_blank' ||
        targetLink.hasAttribute('download') ||
        href.startsWith('mailto:') ||
        href.startsWith('tel:') ||
        href.startsWith('javascript:') ||
        href === '#' ||
        href.startsWith('#') ||
        href.includes('://') && !href.startsWith(window.location.origin)
      ) {
        return;
      }

      // Check if destination is same page anchor
      const targetUrl = new URL(href, window.location.href);
      if (targetUrl.pathname === window.location.pathname && targetUrl.search === window.location.search && targetUrl.hash) {
        return;
      }

      // Intercept and animate
      e.preventDefault();
      this.transitionTo(href);
    });
  }

  transitionTo(destinationUrl) {
    if (this.isTransitioning) return;
    this.isTransitioning = true;

    if (this.prefersReducedMotion) {
      window.location.href = destinationUrl;
      return;
    }

    if (this.overlay) {
      this.overlay.classList.add('transition-active');
      this.overlay.classList.add('is-closing');
    }

    setTimeout(() => {
      window.location.href = destinationUrl;
    }, 450);
  }

  revealPageOnLoad() {
    if (this.prefersReducedMotion) return;

    // Smooth page entrance
    if (this.overlay) {
      // Small timeout to allow browser paint
      requestAnimationFrame(() => {
        this.overlay.classList.add('transition-active');
        this.overlay.classList.add('is-opening');
        setTimeout(() => {
          this.overlay.classList.remove('transition-active', 'is-opening', 'is-closing');
          this.isTransitioning = false;
        }, 550);
      });
    }
  }

  resetOverlay() {
    if (this.overlay) {
      this.overlay.classList.remove('transition-active', 'is-opening', 'is-closing');
    }
    this.isTransitioning = false;
  }
}
