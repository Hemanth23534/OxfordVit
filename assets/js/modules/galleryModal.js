/**
 * OXFORD VIT – THE LIVING CAMPUS EXPERIENCE
 * Photo & Video Archive Gallery Lightbox Logic
 */

import { galleryData } from '../data/galleryData.js';

export class GalleryLightbox {
  constructor() {
    this.grid = document.querySelector('.gallery-grid');
    this.filterButtons = document.querySelectorAll('.gallery-tabs .tab-btn');
    this.modal = document.getElementById('gallery-modal');
    this.modalBody = document.getElementById('gallery-modal-body');
    this.modalClose = document.getElementById('gallery-modal-close');
    this.currentList = galleryData;
    this.currentIndex = 0;

    if (!this.grid) return;
    this.init();
  }

  init() {
    this.renderGallery('all');
    this.bindFilters();
    this.bindModal();
  }

  renderGallery(category = 'all') {
    this.currentList = category === 'all'
      ? galleryData
      : galleryData.filter(g => g.category === category);

    this.grid.innerHTML = this.currentList.map((item, index) => `
      <div class="gallery-item" data-index="${index}" style="background: ${item.bgColor};">
        <div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; color: rgba(255,255,255,0.7); font-size: 2.5rem;">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <rect width="18" height="18" x="3" y="3" rx="2" ry="2"/>
            <circle cx="9" cy="9" r="2"/>
            <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>
          </svg>
        </div>
        <div class="gallery-item-overlay">
          <span class="gallery-item-badge">${item.badge}</span>
          <div class="gallery-item-caption">${item.title}</div>
        </div>
      </div>
    `).join('');

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
        const cat = e.currentTarget.getAttribute('data-category');
        this.renderGallery(cat);
      });
    });
  }

  openLightbox(index) {
    this.currentIndex = index;
    const item = this.currentList[index];
    if (!item || !this.modal || !this.modalBody) return;

    this.modalBody.innerHTML = `
      <div style="height: 360px; border-radius: var(--radius-lg); background: ${item.bgColor}; display: flex; align-items: center; justify-content: center; color: #fff; margin-bottom: 1.5rem; position: relative; border: 1.5px solid var(--border-gold);">
        <svg width="84" height="84" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.8)" stroke-width="1.2">
          <rect width="18" height="18" x="3" y="3" rx="2" ry="2"/>
          <circle cx="9" cy="9" r="2"/>
          <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>
        </svg>
        <span class="badge badge-gold" style="position: absolute; top: 1rem; right: 1rem;">${item.badge}</span>
      </div>
      <div>
        <h3 style="font-size: 1.6rem; margin-bottom: 0.5rem; color: var(--color-deep-plum);">${item.title}</h3>
        <p style="font-size: 1rem; color: var(--text-secondary); line-height: 1.6;">${item.caption}</p>
      </div>
      <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 1.75rem; padding-top: 1rem; border-top: 1px solid rgba(73,59,76,0.1);">
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
        if (e.target === this.modal) this.closeLightbox();
      });
    }
    window.addEventListener('keydown', (e) => {
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
    if (this.modal) {
      this.modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }
}
