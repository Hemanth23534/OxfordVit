/**
 * OXFORD VIT – THE LIVING CAMPUS EXPERIENCE
 * Master Centralized Multi-Campus Switcher & Location Modal
 * Supports: Narasaraopet, Guntur, and Bapatla locations
 * Distinguishes: Operational vs Historical buildings, Junior Colleges, Specialized Academies & Sister Schools
 */

import { campusesData, citiesData } from '../data/campusesData.js';

export class CampusSwitcher {
  constructor() {
    this.container = document.querySelector('.campus-cards-grid');
    this.cityTabButtons = document.querySelectorAll('.city-filter-tabs .tab-btn');
    this.categoryTabButtons = document.querySelectorAll('.campuses-tabs .tab-btn');
    this.modal = document.getElementById('campus-modal');
    this.modalContent = document.getElementById('campus-modal-body');
    this.modalClose = document.getElementById('campus-modal-close');

    this.currentCity = 'all';
    this.currentCategory = 'all';

    if (!this.container) return;
    this.init();
  }

  init() {
    this.renderCampuses();
    this.bindCityTabEvents();
    this.bindCategoryTabEvents();
    this.bindModalEvents();
    this.bindHeroBhavanClicks();
  }

  renderCampuses() {
    let filtered = campusesData;

    if (this.currentCity !== 'all') {
      filtered = filtered.filter(c => c.city && c.city.toLowerCase() === this.currentCity.toLowerCase());
    }

    if (this.currentCategory !== 'all') {
      filtered = filtered.filter(c => {
        const cat = (c.category || '').toLowerCase();
        const type = (c.campusType || '').toLowerCase();
        const label = (c.categoryLabel || '').toLowerCase();
        const name = (c.name || '').toLowerCase();

        if (this.currentCategory === 'junior-college') {
          return cat === 'junior-college' || cat === 'operational-campus' ||
                 label.includes('junior') || label.includes('intermediate') ||
                 name.includes('junior') || name.includes('intermediate') ||
                 type.includes('junior') || type.includes('intermediate');
        }
        if (this.currentCategory === 'specialized-academy') {
          return cat === 'specialized-academy' || cat === 'coaching-wing' ||
                 label.includes('academy') || label.includes('coaching') || label.includes('super wing') ||
                 name.includes('academy') || name.includes('super wing') ||
                 type.includes('academy') || type.includes('super wing');
        }
        if (this.currentCategory === 'sister-school') {
          return cat === 'sister-school' || cat === 'school-wing' || cat === 'school-foundation' ||
                 label.includes('school') || name.includes('school') || type.includes('school');
        }
        if (this.currentCategory === 'historical') {
          const stat = (c.status || c.operationalStatus || '').toLowerCase();
          return cat === 'historical' || cat === 'historical-location' || cat === 'historical-campus' ||
                 stat.includes('historical') || label.includes('historical') || name.includes('historical');
        }
        return cat === this.currentCategory.toLowerCase();
      });
    }

    if (filtered.length === 0) {
      this.container.innerHTML = `
        <div class="glass-card" style="grid-column: 1 / -1; padding: 3rem; text-align: center;">
          <h3 style="font-size: 1.4rem; color: var(--color-deep-plum); margin-bottom: 0.5rem;">No Campuses Found</h3>
          <p style="color: var(--text-secondary);">No educational centers match the selected city and category combination.</p>
          <button class="btn btn-gold btn-sm" id="reset-filters-btn" style="margin-top: 1rem;">View All Locations</button>
        </div>
      `;
      const resetBtn = document.getElementById('reset-filters-btn');
      if (resetBtn) {
        resetBtn.addEventListener('click', () => {
          this.currentCity = 'all';
          this.currentCategory = 'all';
          this.cityTabButtons.forEach(b => b.classList.toggle('active', b.getAttribute('data-city') === 'all'));
          this.categoryTabButtons.forEach(b => b.classList.toggle('active', b.getAttribute('data-filter') === 'all'));
          this.renderCampuses();
        });
      }
      return;
    }

    this.container.innerHTML = filtered.map((campus) => {
      const status = campus.status || campus.operationalStatus || 'Currently Operational';
      const isHistorical = status.toLowerCase().includes('historical');
      const verification = campus.verificationStatus || campus.governanceStatus || 'Verified Governance';
      const isPending = verification.toLowerCase().includes('pending');
      
      const statusBadge = isHistorical
        ? `<span class="badge" style="background: rgba(73, 59, 76, 0.15); color: var(--color-deep-plum); border: 1px dashed var(--color-deep-plum);">🏛️ Historical Campus / Archive</span>`
        : `<span class="badge badge-botanical">✓ Currently Operational</span>`;

      const governanceBadge = isPending
        ? `<span class="badge" style="background: rgba(233, 161, 140, 0.25); color: #B34024; border: 1px solid var(--color-coral);">⚠️ Governance: Pending Verification</span>`
        : `<span class="badge badge-gold">${verification}</span>`;

      const hasSpecificPhoto = Boolean(campus.image || campus.imageSrc || (campus.galleryImages && campus.galleryImages[0]));
      const primaryImg = campus.image || campus.imageSrc || (campus.galleryImages && campus.galleryImages[0]);
      const fallbackPlaceholder = campus.placeholder || 'assets/images/campuses/campus-placeholder.svg';
      const effectiveImg = primaryImg || fallbackPlaceholder;

      const description = (campus.description && campus.description.trim()) || 'Information being updated';
      const addressText = (campus.address && campus.address.trim()) || (campus.landmark && campus.landmark.trim()) || 'Information being updated';
      const landmarkText = (campus.landmark && campus.landmark.trim()) || addressText;

      const facilitiesList = (Array.isArray(campus.facilities) && campus.facilities.length > 0)
        ? campus.facilities
        : ((Array.isArray(campus.infrastructure) && campus.infrastructure.length > 0)
          ? campus.infrastructure
          : ['Academic Facilities', 'Laboratories', 'Digital Library']);

      const categoryLabel = campus.categoryLabel || (campus.category ? campus.category.replace(/-/g, ' ').toUpperCase() : 'CAMPUS');
      const badgeText = campus.badge || campus.campusType || 'Oxford VIT Campus';

      return `
        <article class="campus-card ${isHistorical ? 'historical-campus-card' : ''}" id="card-${campus.id}" data-category="${campus.category}" data-city="${campus.city}">
          <div class="campus-card-img-wrap">
            <img 
              src="${effectiveImg}" 
              alt="${campus.name || 'Campus Photograph'}" 
              class="campus-card-img" 
              loading="lazy" 
              onerror="this.onerror=null; this.src='${fallbackPlaceholder}'; this.classList.add('img-fallback');" 
            />
            <div class="campus-type-pill">${badgeText}</div>
            <div style="position: absolute; bottom: 12px; left: 12px; display: flex; flex-direction: column; gap: 4px; z-index: 2;">
              ${statusBadge}
              ${!hasSpecificPhoto ? `<span class="badge" style="background: rgba(73, 59, 76, 0.85); color: #FAF7F0; font-size: 0.65rem;">📷 Photograph coming soon</span>` : ''}
            </div>
          </div>
          <div class="campus-card-content">
            <div style="display: flex; align-items: center; justify-content: space-between; gap: 0.5rem; margin-bottom: 0.5rem;">
              <span class="section-tag botanical" style="font-size: 0.7rem; padding: 2px 8px;">${campus.city || 'Regional'} Hub</span>
              <span style="font-size: 0.75rem; color: var(--text-muted); font-family: var(--font-mono); font-weight: 600;">${categoryLabel}</span>
            </div>

            <h3 class="campus-card-title">${campus.name || 'Oxford VIT Campus'}</h3>
            
            <p class="campus-card-address">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
              ${landmarkText}
            </p>
            
            <p class="campus-card-desc">${description}</p>
            
            <div class="campus-amenities-tags">
              ${facilitiesList.slice(0, 3).map(f => `<span class="amenity-tag">${f}</span>`).join('')}
            </div>

            <div style="margin-top: 0.75rem; margin-bottom: 0.75rem;">
              ${governanceBadge}
            </div>

            <div class="campus-card-footer" style="display: flex; gap: 0.5rem; justify-content: space-between; align-items: center;">
              <button class="btn btn-sm btn-outline view-campus-btn" data-id="${campus.id}" style="padding: 0.35rem 0.65rem; font-size: 0.8rem;">
                Quick Preview
              </button>
              <a href="campus-detail.html?id=${campus.id}" class="btn btn-sm btn-gold" style="text-decoration: none; padding: 0.35rem 0.75rem; font-size: 0.8rem;">
                Campus Profile →
              </a>
            </div>
          </div>
        </article>
      `;
    }).join('');

    // Re-bind view details buttons
    this.container.querySelectorAll('.view-campus-btn').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.getAttribute('data-id');
        this.openCampusModal(id);
      });
    });
  }

  bindCityTabEvents() {
    this.cityTabButtons.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        this.cityTabButtons.forEach(b => b.classList.remove('active'));
        e.currentTarget.classList.add('active');
        this.currentCity = e.currentTarget.getAttribute('data-city') || 'all';
        this.renderCampuses();
      });
    });
  }

  bindCategoryTabEvents() {
    this.categoryTabButtons.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        this.categoryTabButtons.forEach(b => b.classList.remove('active'));
        e.currentTarget.classList.add('active');
        this.currentCategory = e.currentTarget.getAttribute('data-filter') || 'all';
        this.renderCampuses();
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

    const status = campus.status || campus.operationalStatus || 'Currently Operational';
    const isHistorical = status.toLowerCase().includes('historical');
    const verification = campus.verificationStatus || campus.governanceStatus || 'Verified Governance';
    const isPending = verification.toLowerCase().includes('pending');

    const hasSpecificPhoto = Boolean(campus.image || campus.imageSrc || (campus.galleryImages && campus.galleryImages[0]));
    const primaryImg = campus.image || campus.imageSrc || (campus.galleryImages && campus.galleryImages[0]);
    const fallbackPlaceholder = campus.placeholder || 'assets/images/campuses/campus-placeholder.svg';
    const effectiveImg = primaryImg || fallbackPlaceholder;

    const description = (campus.description && campus.description.trim()) || 'Information being updated';
    const addressText = (campus.address && campus.address.trim()) || (campus.landmark && campus.landmark.trim()) || 'Information being updated';
    const governanceText = campus.governance || 'Oxford VIT Directorate';

    const facilitiesList = (Array.isArray(campus.facilities) && campus.facilities.length > 0)
      ? campus.facilities
      : ((Array.isArray(campus.infrastructure) && campus.infrastructure.length > 0)
        ? campus.infrastructure
        : ['Information being updated']);

    const coursesList = (Array.isArray(campus.courses) && campus.courses.length > 0)
      ? campus.courses
      : ((Array.isArray(campus.programmes) && campus.programmes.length > 0)
        ? campus.programmes
        : ['Information being updated']);

    let contactDisplay = 'Contact information not yet confirmed';
    let rawPhone = '';
    if (Array.isArray(campus.contact) && campus.contact.length > 0 && campus.contact[0] && !campus.contact[0].toLowerCase().includes('not yet confirmed')) {
      contactDisplay = campus.contact.join(' / ');
      rawPhone = campus.contact[0];
    } else if (campus.phone && typeof campus.phone === 'string' && !campus.phone.toLowerCase().includes('not yet confirmed')) {
      contactDisplay = campus.phone.split('(')[0].trim();
      rawPhone = campus.phone;
    }

    const cityHubText = campus.city ? `${campus.city} Hub` : 'Regional Hub';
    const districtText = campus.district ? `(${campus.district})` : '';
    const badgeText = campus.badge || campus.campusType || 'Oxford VIT Campus';
    const cityPageUrl = campus.cityPageUrl || (campus.city ? `${campus.city.toLowerCase()}.html` : 'campuses.html');

    this.modalContent.innerHTML = `
      <div style="margin-bottom: 1.5rem;">
        <div style="border-radius: var(--radius-lg); overflow: hidden; margin-bottom: 1.25rem; border: 1px solid var(--border-gold); max-height: 280px; background: linear-gradient(135deg, #FAF7F0, #EFE9DC); aspect-ratio: 16 / 9; display: flex; align-items: center; justify-content: center; position: relative;">
          <img 
            src="${effectiveImg}" 
            alt="${campus.name || 'Campus Photograph'}" 
            style="width: 100%; height: 100%; object-fit: cover; max-height: 280px; display: block;" 
            onerror="this.onerror=null; this.src='${fallbackPlaceholder}';" 
          />
          ${!hasSpecificPhoto ? `
            <div style="position: absolute; bottom: 12px; right: 12px; background: rgba(73, 59, 76, 0.85); color: #FAF7F0; padding: 4px 12px; border-radius: 999px; font-size: 0.75rem; font-weight: 600;">
              📷 Photograph coming soon
            </div>
          ` : ''}
        </div>
        
        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 0.75rem;">
          <span class="section-tag gold">${badgeText}</span>
          <span class="section-tag botanical">${cityHubText}</span>
          ${isHistorical 
            ? `<span class="badge" style="background: rgba(73, 59, 76, 0.15); color: var(--color-deep-plum);">🏛️ Historical Building / Archive</span>` 
            : `<span class="badge badge-botanical">✓ Currently Operational Campus</span>`}
        </div>

        <h2 style="margin-top: 0.5rem; margin-bottom: 0.5rem; font-size: 1.85rem; color: var(--color-deep-plum);">${campus.name || 'Oxford VIT Campus'}</h2>
        
        <p style="color: var(--color-botanical-green-dark); font-weight: 600; display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem;">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
            <circle cx="12" cy="10" r="3"/>
          </svg>
          ${addressText}
        </p>

        <div style="padding: 0.75rem 1rem; border-radius: var(--radius-sm); margin-bottom: 1rem; background: ${isPending ? 'rgba(233, 161, 140, 0.15)' : 'rgba(214, 183, 122, 0.12)'}; border-left: 3px solid ${isPending ? 'var(--color-coral)' : 'var(--color-champagne-gold)'};">
          <div style="font-size: 0.8rem; font-weight: 700; color: var(--color-deep-plum);">Governance & Ownership Record:</div>
          <div style="font-size: 0.875rem; color: ${isPending ? '#B34024' : 'var(--text-secondary)'}; font-weight: 600;">
            ${governanceText} (${verification})
          </div>
          ${isPending ? `<div style="font-size: 0.775rem; color: #B34024; margin-top: 2px;">Note: Regional registry confirmation in progress under academic supervision.</div>` : ''}
        </div>
      </div>

      <p class="lead" style="margin-bottom: 1.5rem; font-size: 1rem; line-height: 1.6;">${description}</p>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1.5rem; margin-bottom: 2rem;">
        <div class="glass-card" style="padding: 1.25rem;">
          <h4 style="color: var(--color-champagne-gold-dark); margin-bottom: 0.75rem; font-family: var(--font-sans); font-size: 0.95rem; text-transform: uppercase; letter-spacing: 0.05em;">Infrastructure & Facilities</h4>
          <ul style="display: flex; flex-direction: column; gap: 0.5rem; font-size: 0.875rem;">
            ${facilitiesList.map(f => `
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
          <h4 style="color: var(--color-champagne-gold-dark); margin-bottom: 0.75rem; font-family: var(--font-sans); font-size: 0.95rem; text-transform: uppercase; letter-spacing: 0.05em;">Academic Programs</h4>
          <ul style="display: flex; flex-direction: column; gap: 0.5rem; font-size: 0.875rem;">
            ${coursesList.map(c => `
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
          <div style="font-size: 0.8rem; text-transform: uppercase; color: var(--text-muted); font-weight: 600;">Location Hub</div>
          <div style="font-weight: 700; color: var(--color-deep-plum);">${campus.city || 'Regional'} ${districtText}</div>
        </div>
        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
          <a href="${cityPageUrl}" class="btn btn-outline btn-sm">
            ${campus.city || 'City'} City Portal
          </a>
          <a href="campus-detail.html?id=${campus.id}" class="btn btn-gold btn-sm">
            Full 15-Dimension Profile ↗
          </a>
          ${rawPhone ? `
            <a href="tel:${rawPhone.replace(/[^0-9+]/g, '').slice(0, 13)}" class="btn btn-outline btn-sm">
              Helpline: ${contactDisplay}
            </a>
          ` : `
            <span class="btn btn-outline btn-sm" style="cursor: default; opacity: 0.8;">
              ${contactDisplay}
            </span>
          `}
        </div>
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
