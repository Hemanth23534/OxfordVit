/**
 * OXFORD VIT – THE LIVING CAMPUS EXPERIENCE
 * Photo & Video Archive Gallery Dynamic Lightbox Logic
 * Fetches dynamic media items from /api/gallery with fallback to local galleryData
 * Supports category filtering AND campus-specific galleries across all 10 verified campuses
 */

import { galleryData } from '../data/galleryData.js';

export class GalleryLightbox {
  constructor() {
    this.grid = document.querySelector('.gallery-grid');
    this.filterButtons = document.querySelectorAll('.gallery-tabs .tab-btn');
    this.campusFilterSelect = document.getElementById('gallery-campus-filter');
    this.countDisplay = document.getElementById('gallery-count-display');
    this.modal = document.getElementById('gallery-modal');
    this.modalBody = document.getElementById('gallery-modal-body');
    this.modalClose = document.getElementById('gallery-modal-close');

    this.allMedia = galleryData;
    this.currentList = [];
    this.currentIndex = 0;
    this.currentCategory = 'all';
    this.currentCampus = 'all';

    if (!this.grid) return;
    this.init();
  }

  async init() {
    await this.fetchMedia();
    this.renderGallery();
    this.bindFilters();
    this.bindModal();
  }

  async fetchMedia() {
    try {
      const res = await fetch('/api/gallery');
      if (res.ok) {
        const json = await res.json();
        if (json.data && json.data.length > 0) {
          this.allMedia = json.data;
        }
      }
    } catch (err) {
      console.warn('Using static gallery dataset as API fallback:', err);
      this.allMedia = galleryData;
    }
  }

  renderGallery() {
    this.currentList = this.allMedia.filter(g => {
      const matchCat = (this.currentCategory === 'all')
        ? true
        : (g.category === this.currentCategory || (this.currentCategory === 'life' && (g.category === 'students' || g.category === 'transport')));

      const matchCampus = (this.currentCampus === 'all')
        ? true
        : (g.campusId === this.currentCampus);

      return matchCat && matchCampus;
    });

    if (this.countDisplay) {
      this.countDisplay.textContent = `Showing ${this.currentList.length} Media Item${this.currentList.length === 1 ? '' : 's'}`;
    }

    if (this.currentList.length === 0) {
      this.grid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 2rem; background: var(--bg-card); border-radius: var(--radius-xl); border: 1.5px dashed var(--border-gold);">
          <div style="font-size: 2.5rem; margin-bottom: 0.75rem;">🏛️</div>
          <h3 style="font-family: var(--font-serif); font-size: 1.4rem; color: var(--color-deep-plum); margin-bottom: 0.5rem;">No Media Found For This Filter</h3>
          <p style="color: var(--text-muted); max-width: 450px; margin: 0 auto 1.5rem;">Try choosing another campus or switching to "All Media" to explore our full photo archive.</p>
          <button id="reset-gallery-filter" class="btn btn-outline btn-sm">Reset Gallery Filters</button>
        </div>
      `;
      document.getElementById('reset-gallery-filter')?.addEventListener('click', () => {
        this.currentCategory = 'all';
        this.currentCampus = 'all';
        this.filterButtons.forEach(b => b.classList.toggle('active', b.getAttribute('data-category') === 'all'));
        if (this.campusFilterSelect) this.campusFilterSelect.value = 'all';
        this.renderGallery();
      });
      return;
    }

    this.grid.innerHTML = this.currentList.map((item, index) => {
      const hasImage = item.imagePath && item.imagePath.trim() !== '';
      return `
        <div class="gallery-item" data-index="${index}" style="background: ${item.bgColor || '#493B4C'}; position: relative; overflow: hidden; border-radius: var(--radius-lg); aspect-ratio: 4/3; cursor: pointer;">
          ${hasImage ? `
            <img src="${item.imagePath}" alt="${item.title}" style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s ease;" loading="lazy">
          ` : `
            <div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; color: rgba(255,255,255,0.7); font-size: 2.5rem;">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <rect width="18" height="18" x="3" y="3" rx="2" ry="2"/>
                <circle cx="9" cy="9" r="2"/>
                <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>
              </svg>
            </div>
          `}
          <div class="gallery-item-overlay">
            <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 0.35rem;">
              <span class="gallery-item-badge">${item.badge || 'Archive'}</span>
              ${item.campusName ? `<span class="gallery-item-badge" style="background: rgba(82, 107, 84, 0.9);">${item.campusName.split(' ')[0]}</span>` : ''}
            </div>
            <div class="gallery-item-caption">${item.title}</div>
          </div>
        </div>
      `;
    }).join('');

    this.grid.querySelectorAll('.gallery-item').forEach(el => {
      el.addEventListener('click', (e) => {
        const idx = parseInt(e.currentTarget.getAttribute('data-index'), 10);
        this.openLightbox(idx);
      });
    });
  }

  bindFilters() {
    this.filterButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        this.filterButtons.forEach(b => b.classList.remove('active'));
        e.currentTarget.classList.add('active');
        this.currentCategory = e.currentTarget.getAttribute('data-category');
        this.renderGallery();
      });
    });

    if (this.campusFilterSelect) {
      this.campusFilterSelect.addEventListener('change', (e) => {
        this.currentCampus = e.target.value;
        this.renderGallery();
      });
    }
  }

  openLightbox(index) {
    this.currentIndex = index;
    const item = this.currentList[index];
    if (!item || !this.modal || !this.modalBody) return;

    const hasImage = item.imagePath && item.imagePath.trim() !== '';

    this.modalBody.innerHTML = `
      <div style="height: 380px; border-radius: var(--radius-lg); background: ${item.bgColor || '#493B4C'}; overflow: hidden; display: flex; align-items: center; justify-content: center; color: #fff; margin-bottom: 1.5rem; position: relative; border: 1.5px solid var(--border-gold);">
        ${hasImage ? `
          <img src="${item.imagePath}" alt="${item.title}" style="width: 100%; height: 100%; object-fit: contain; background: rgba(0,0,0,0.2);">
        ` : `
          <svg width="84" height="84" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.8)" stroke-width="1.2">
            <rect width="18" height="18" x="3" y="3" rx="2" ry="2"/>
            <circle cx="9" cy="9" r="2"/>
            <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>
          </svg>
        `}
        <div style="position: absolute; top: 1rem; right: 1rem; display: flex; gap: 0.5rem;">
          <span class="badge badge-gold">${item.badge || 'Archive'}</span>
          ${item.campusName ? `<span class="badge badge-coral">📍 ${item.campusName}</span>` : ''}
        </div>
      </div>

      <div>
        <h3 style="font-size: 1.6rem; margin-bottom: 0.5rem; color: var(--color-deep-plum);">${item.title}</h3>
        <p style="font-size: 1rem; color: var(--text-secondary); line-height: 1.6; margin-bottom: 1.25rem;">${item.caption || ''}</p>
        
        <div style="background: rgba(247,243,233,0.7); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 1rem; margin-bottom: 1.25rem; font-size: 0.8125rem; display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 0.5rem;">
          <div><strong>Campus:</strong> ${item.campusName || 'General'}</div>
          <div><strong>Verification:</strong> ${item.verificationStatus || 'Verified Archive'}</div>
          <div><strong>Permission:</strong> ${item.photoPermission || 'Public Release'}</div>
          <div><strong>Source:</strong> ${item.source || 'Institutional Repository'}</div>
        </div>

        ${item.campusId ? `
          <div style="margin-bottom: 1.25rem;">
            <a href="campus-detail.html?campus=${item.campusId}" class="btn btn-outline btn-sm" style="font-size: 0.8125rem;">
              Explore Full ${item.campusName || 'Campus'} Profile →
            </a>
          </div>
        ` : ''}
      </div>

      <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 1rem; padding-top: 1rem; border-top: 1px solid rgba(73,59,76,0.1);">
        <button id="lb-prev" class="btn btn-sm btn-outline">‹ Previous</button>
        <span style="font-family: var(--font-mono); font-size: 0.85rem; color: var(--text-muted);">${index + 1} / ${this.currentList.length}</span>
        <button id="lb-next" class="btn btn-sm btn-outline">Next ›</button>
      </div>
    `;

    document.getElementById('lb-prev')?.addEventListener('click', () => {
      const prevIdx = (this.currentIndex - 1 + this.currentList.length) % this.currentList.length;
      this.openLightbox(prevIdx);
    });

    document.getElementById('lb-next')?.addEventListener('click', () => {
      const nextIdx = (this.currentIndex + 1) % this.currentList.length;
      this.openLightbox(nextIdx);
    });

    this.modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  bindModal() {
    if (this.modalClose) {
      this.modalClose.addEventListener('click', () => this.closeLightbox());
    }

    if (this.modal) {
      this.modal.addEventListener('click', (e) => {
        if (e.target === this.modal) {
          this.closeLightbox();
        }
      });
    }

    document.addEventListener('keydown', (e) => {
      if (!this.modal || !this.modal.classList.contains('active')) return;
      if (e.key === 'Escape') this.closeLightbox();
      if (e.key === 'ArrowLeft') {
        const prevIdx = (this.currentIndex - 1 + this.currentList.length) % this.currentList.length;
        this.openLightbox(prevIdx);
      }
      if (e.key === 'ArrowRight') {
        const nextIdx = (this.currentIndex + 1) % this.currentList.length;
        this.openLightbox(nextIdx);
      }
    });
  }

  closeLightbox() {
    if (!this.modal) return;
    this.modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}
