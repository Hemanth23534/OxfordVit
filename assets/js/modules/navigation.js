/**
 * OXFORD VIT – THE LIVING CAMPUS EXPERIENCE
 * Navigation, Mobile Drawer & Scrollspy Architecture
 */

export class NavigationHandler {
  constructor() {
    this.menuToggle = document.querySelector('.menu-toggle');
    this.mobileDrawer = document.querySelector('.mobile-drawer');
    this.drawerOverlay = document.querySelector('.mobile-drawer-overlay');
    this.navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    this.sections = document.querySelectorAll('section[id]');

    this.init();
  }

  init() {
    this.bindMobileDrawer();
    this.bindSmoothScroll();
    this.bindScrollspy();
  }

  bindMobileDrawer() {
    if (!this.menuToggle || !this.mobileDrawer) return;

    const toggle = () => {
      this.menuToggle.classList.toggle('active');
      this.mobileDrawer.classList.toggle('active');
      if (this.drawerOverlay) {
        this.drawerOverlay.classList.toggle('active');
      }
      document.body.style.overflow = this.mobileDrawer.classList.contains('active') ? 'hidden' : '';
    };

    this.menuToggle.addEventListener('click', toggle);

    if (this.drawerOverlay) {
      this.drawerOverlay.addEventListener('click', toggle);
    }

    // Close drawer when any mobile link is clicked
    document.querySelectorAll('.mobile-nav-link').forEach(link => {
      link.addEventListener('click', () => {
        if (this.mobileDrawer.classList.contains('active')) {
          toggle();
        }
      });
    });
  }

  bindSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        const targetId = anchor.getAttribute('href');
        if (targetId === '#' || !targetId) return;

        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          e.preventDefault();
          const headerOffset = 80;
          const elementPosition = targetEl.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  }

  bindScrollspy() {
    window.addEventListener('scroll', () => {
      let currentSectionId = '';
      const scrollPos = window.scrollY + 200;

      this.sections.forEach(sec => {
        const top = sec.offsetTop;
        const height = sec.offsetHeight;
        if (scrollPos >= top && scrollPos < top + height) {
          currentSectionId = sec.getAttribute('id');
        }
      });

      if (currentSectionId) {
        this.navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${currentSectionId}`) {
            link.classList.add('active');
          }
        });
      }
    }, { passive: true });
  }
}
