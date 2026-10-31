/**
 * OXFORD VIT – THE LIVING CAMPUS EXPERIENCE
 * Multi-Campus Spatial Switcher & Modal Viewer
 */

import { campusesData } from '../data/campusesData.js';

export class CampusSwitcher {
  constructor() {
    this.container = document.querySelector('.campus-cards-grid');
    this.tabButtons = document.querySelectorAll('.campuses-tabs .tab-btn');
    this.modal = document.getElementById('campus-modal');
    this.modalContent = document.getElementById('campus-modal-body');
    this.modalClose = document.getElementById('campus-modal-close');

    if (!this.container) return;
    this.init();
  }

  init() {
    this.renderCampuses('all');
    this.bindTabEvents();
    this.bindModalEvents();
    this.bindHeroBhavanClicks();
  }

  renderCampuses(category = 'all') {
    const filtered = category === 'all'
      ? campusesData
      : campusesData.filter((c) => c.category === category || (category === 'academic' && (c.category === 'academic' || c.category === 'stem')));

    this.container.innerHTML = filtered.map((campus) => `
      <article class="campus-card" id="card-${campus.id}" data-category="${campus.category}">
        <div class="campus-card-img-wrap">
          <img src="${campus.imageSrc}" alt="${campus.name}" class="campus-card-img" loading="lazy" />
          <div class="campus-type-pill">${campus.badge}</div>
        </div>
        <div class="campus-card-content">
          <h3 class="campus-card-title">${campus.name}</h3>
          <p class="campus-card-address">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
            ${campus.landmark}
          </p>
          <p class="campus-card-desc">${campus.description}</p>
          
          <div class="campus-amenities-tags">
            ${campus.facilities.slice(0, 4).map(f => `<span class="amenity-tag">${f}</span>`).join('')}
          </div>

          <div class="campus-card-footer">
            <span class="badge badge-gold">${campus.courses[0]}</span>
            <button class="btn btn-sm btn-outline view-campus-btn" data-id="${campus.id}">
              Full Details
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="m9 18 6-6-6-6"/>
              </svg>
            </button>
          </div>
        </div>
      </article>
    `).join('');

    // Re-bind view details buttons
    this.container.querySelectorAll('.view-campus-btn').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.getAttribute('data-id');
        this.openCampusModal(id);
      });
    });
  }

  bindTabEvents() {
    this.tabButtons.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        this.tabButtons.forEach(b => b.classList.remove('active'));
        e.currentTarget.classList.add('active');
        const cat = e.currentTarget.getAttribute('data-filter');
        this.renderCampuses(cat);
      });
    });
  }

  bindHeroBhavanClicks() {
    document.querySelectorAll('.hero-bhavan-item').forEach((item) => {
      item.addEventListener('click', (e) => {
        const id = e.currentTarget.getAttribute('data-id');
        const targetSection = document.getElementById('campuses');
        if (targetSection) {
          targetSection.scrollIntoView({ behavior: 'smooth' });
          setTimeout(() => {
            const card = document.getElementById(`card-${id}`);
            if (card) {
              card.style.transform = 'translateY(-10px) scale(1.02)';
              card.style.borderColor = 'var(--color-coral)';
              setTimeout(() => {
                card.style.transform = '';
                card.style.borderColor = '';
              }, 2000);
            }
          }, 600);
        }
      });
    });
  }

  openCampusModal(id) {
    const campus = campusesData.find(c => c.id === id);
    if (!campus || !this.modal || !this.modalContent) return;

    this.modalContent.innerHTML = `
      <div style="margin-bottom: 1.5rem;">
        <div style="border-radius: var(--radius-lg); overflow: hidden; margin-bottom: 1.25rem; border: 1px solid var(--border-gold); max-height: 260px;">
          <img src="${campus.imageSrc}" alt="${campus.name}" style="width: 100%; height: 100%; object-fit: cover;" />
        </div>
        <span class="section-tag gold">${campus.badge}</span>
        <h2 style="margin-top: 0.5rem; margin-bottom: 0.5rem; font-size: 2rem;">${campus.name}</h2>
        <p style="color: var(--color-botanical-green-dark); font-weight: 600; display: flex; align-items: center; gap: 0.5rem;">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
            <circle cx="12" cy="10" r="3"/>
          </svg>
          ${campus.address}
        </p>
      </div>

      <p class="lead" style="margin-bottom: 1.5rem;">${campus.description}</p>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1.5rem; margin-bottom: 2rem;">
        <div class="glass-card" style="padding: 1.25rem;">
          <h4 style="color: var(--color-champagne-gold-dark); margin-bottom: 0.75rem; font-family: var(--font-sans); font-size: 1rem; text-transform: uppercase;">Infrastructure & Facilities</h4>
          <ul style="display: flex; flex-direction: column; gap: 0.5rem; font-size: 0.9rem;">
            ${campus.facilities.map(f => `
              <li style="display: flex; align-items: center; gap: 0.5rem;">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-botanical-green)" stroke-width="2.5">
                  <path d="M20 6 9 17l-5-5"/>
                </svg>
                ${f}
              </li>
            `).join('')}
          </ul>
        </div>

        <div class="glass-card" style="padding: 1.25rem;">
          <h4 style="color: var(--color-champagne-gold-dark); margin-bottom: 0.75rem; font-family: var(--font-sans); font-size: 1rem; text-transform: uppercase;">Academic Offerings</h4>
          <ul style="display: flex; flex-direction: column; gap: 0.5rem; font-size: 0.9rem;">
            ${campus.courses.map(c => `
              <li style="display: flex; align-items: center; gap: 0.5rem;">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-coral)" stroke-width="2.5">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="m9 12 2 2 4-4"/>
                </svg>
                ${c}
              </li>
            `).join('')}
          </ul>
        </div>
      </div>

      <div style="background: rgba(73, 59, 76, 0.05); padding: 1.25rem; border-radius: var(--radius-md); border: 1px solid var(--border-gold); display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem;">
        <div>
          <div style="font-size: 0.8rem; text-transform: uppercase; color: var(--text-muted); font-weight: 600;">Campus Administration</div>
          <div style="font-weight: 700; color: var(--color-deep-plum);">${campus.incharge} • ${campus.timing}</div>
        </div>
        <a href="tel:${campus.phone.replace(/\s+/g, '')}" class="btn btn-gold btn-sm">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
          </svg>
          Direct Coordinator
        </a>
      </div>
    `;

    this.modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  bindModalEvents() {
    if (this.modalClose) {
      this.modalClose.addEventListener('click', () => this.closeCampusModal());
    }
    if (this.modal) {
      this.modal.addEventListener('click', (e) => {
        if (e.target === this.modal) this.closeCampusModal();
      });
    }
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.modal && this.modal.classList.contains('active')) {
        this.closeCampusModal();
      }
    });
  }

  closeCampusModal() {
    if (this.modal) {
      this.modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }
}
