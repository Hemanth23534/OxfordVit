/**
 * OXFORD VIT – THE LIVING CAMPUS EXPERIENCE
 * Interactive Institutional History Timeline Engine
 * Covers verified institutional evolution (1994–2026) across Narasaraopet, Guntur, and Bapatla.
 */

import { historyData } from '../data/historyData.js';

export class TimelineEngine {
  constructor(options = {}) {
    this.container = options.container || document.querySelector('.timeline-container');
    this.scrubber = options.scrubber || document.querySelector('.timeline-scrubber');
    this.filterContainer = options.filterContainer || document.querySelector('.timeline-filters');
    this.detailContainer = options.detailContainer || document.querySelector('.timeline-cards-track');
    this.activeYearBadge = options.activeYearBadge || document.querySelector('.timeline-active-year-display');

    this.milestones = historyData.milestones || [];
    this.currentCategory = 'all';
    this.currentYear = null;

    if (!this.container) return;
    this.init();
  }

  async init() {
    await this.fetchMilestones();
    this.renderFilters();
    this.renderScrubber();
    this.renderMilestones();
    this.bindEvents();

    // Select the first milestone by default or latest
    if (this.milestones.length > 0) {
      this.selectYear(this.milestones[0].year);
    }
  }

  async fetchMilestones() {
    try {
      const res = await fetch('/api/history');
      if (res.ok) {
        const json = await res.json();
        if (json.data && json.data.length > 0) {
          this.milestones = json.data;
        }
      }
    } catch (e) {
      console.warn('Using static history dataset as API fallback:', e);
      this.milestones = historyData.milestones || [];
    }
  }

  getFilteredMilestones() {
    if (this.currentCategory === 'all') return this.milestones;
    return this.milestones.filter(m => {
      if (this.currentCategory === 'narasaraopet') return m.city.toLowerCase().includes('narasaraopet');
      if (this.currentCategory === 'guntur') return m.city.toLowerCase().includes('guntur');
      if (this.currentCategory === 'bapatla') return m.city.toLowerCase().includes('bapatla');
      if (this.currentCategory === 'trust') return m.category === 'trust' || (m.trustActivity && m.trustActivity.length > 0);
      return m.category === this.currentCategory;
    });
  }

  renderFilters() {
    if (!this.filterContainer) return;
    const categories = [
      { id: 'all', label: 'All Milestones (1994–2026)' },
      { id: 'narasaraopet', label: 'Narasaraopet Headquarters' },
      { id: 'guntur', label: 'Guntur Expansion' },
      { id: 'bapatla', label: 'Bapatla Outreach' },
      { id: 'trust', label: 'KSR Charitable Trust' }
    ];

    this.filterContainer.innerHTML = categories.map(cat => `
      <button class="tab-btn ${cat.id === this.currentCategory ? 'active' : ''}" data-cat="${cat.id}">
        ${cat.label}
      </button>
    `).join('');

    this.filterContainer.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        this.filterContainer.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        e.currentTarget.classList.add('active');
        this.currentCategory = e.currentTarget.getAttribute('data-cat');
        this.renderScrubber();
        this.renderMilestones();
        const filtered = this.getFilteredMilestones();
        if (filtered.length > 0) {
          this.selectYear(filtered[0].year);
        }
      });
    });
  }

  renderScrubber() {
    if (!this.scrubber) return;
    const filtered = this.getFilteredMilestones();

    this.scrubber.innerHTML = `
      <div class="scrubber-line"></div>
      <div class="scrubber-nodes-wrapper">
        ${filtered.map(m => `
          <button class="scrubber-node ${m.year === this.currentYear ? 'active' : ''}" data-year="${m.year}" aria-label="Milestone ${m.year}: ${m.title}">
            <span class="node-year">${m.year}</span>
            <span class="node-dot"></span>
            <span class="node-city">${m.city.split(' ')[0]}</span>
          </button>
        `).join('')}
      </div>
    `;

    this.scrubber.querySelectorAll('.scrubber-node').forEach(node => {
      node.addEventListener('click', (e) => {
        const year = parseInt(e.currentTarget.getAttribute('data-year'), 10);
        this.selectYear(year, true);
      });
    });
  }

  renderMilestones() {
    if (!this.detailContainer) return;
    const filtered = this.getFilteredMilestones();

    if (filtered.length === 0) {
      this.detailContainer.innerHTML = `
        <div class="empty-timeline-state" style="text-align: center; padding: 3rem; background: var(--bg-card); border-radius: var(--radius-xl); border: 1px dashed var(--border-gold);">
          <p style="color: var(--text-muted); font-size: 1rem;">No verified institutional milestones found under this category filter.</p>
        </div>
      `;
      return;
    }

    this.detailContainer.innerHTML = filtered.map((m, idx) => `
      <article class="timeline-card ${m.year === this.currentYear ? 'active' : ''}" id="milestone-${m.year}" data-year="${m.year}">
        <div class="timeline-card-header">
          <div class="timeline-card-meta">
            <span class="milestone-year-badge">${m.year}</span>
            <span class="milestone-period-badge">${m.period}</span>
            <span class="milestone-location-badge">📍 ${m.city} &bull; ${m.campus}</span>
          </div>
          <span class="badge ${m.category === 'trust' ? 'badge-coral' : 'badge-gold'}">
            ${m.category.toUpperCase()}
          </span>
        </div>

        <h3 class="milestone-title">${m.title}</h3>

        <p class="milestone-description">${m.description}</p>

        <div class="milestone-facets-grid">
          ${m.managementActivity ? `
            <div class="milestone-facet facet-management">
              <div class="facet-label">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                Management Activity
              </div>
              <div class="facet-content">${m.managementActivity}</div>
            </div>
          ` : ''}

          ${m.academicActivity ? `
            <div class="milestone-facet facet-academic">
              <div class="facet-label">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
                Academic Activity
              </div>
              <div class="facet-content">${m.academicActivity}</div>
            </div>
          ` : ''}

          ${m.trustActivity ? `
            <div class="milestone-facet facet-trust">
              <div class="facet-label">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
                KSR Charitable Trust Activity
              </div>
              <div class="facet-content">${m.trustActivity}</div>
            </div>
          ` : ''}
        </div>

        <div class="milestone-verification-footer">
          <div class="source-info">
            <span class="source-label">Institutional Source:</span>
            <span class="source-value">${m.verifiedSource}</span>
          </div>
          <div class="status-badge status-confirmed">
            ✓ ${m.verificationStatus}
          </div>
        </div>
      </article>
    `).join('');

    this.detailContainer.querySelectorAll('.timeline-card').forEach(card => {
      card.addEventListener('click', (e) => {
        const year = parseInt(e.currentTarget.getAttribute('data-year'), 10);
        this.selectYear(year, false);
      });
    });
  }

  selectYear(year, scrollCardIntoView = true) {
    this.currentYear = year;

    // Update scrubber buttons
    if (this.scrubber) {
      this.scrubber.querySelectorAll('.scrubber-node').forEach(node => {
        const nodeYear = parseInt(node.getAttribute('data-year'), 10);
        if (nodeYear === year) {
          node.classList.add('active');
          node.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        } else {
          node.classList.remove('active');
        }
      });
    }

    // Update milestone cards
    if (this.detailContainer) {
      this.detailContainer.querySelectorAll('.timeline-card').forEach(card => {
        const cardYear = parseInt(card.getAttribute('data-year'), 10);
        if (cardYear === year) {
          card.classList.add('active');
          if (scrollCardIntoView) {
            card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          }
        } else {
          card.classList.remove('active');
        }
      });
    }

    // Update active year badge
    if (this.activeYearBadge) {
      const activeMilestone = this.milestones.find(m => m.year === year);
      if (activeMilestone) {
        this.activeYearBadge.textContent = `${activeMilestone.year} • ${activeMilestone.period}`;
      }
    }
  }

  bindEvents() {
    // Keyboard navigation (Arrow keys left/right)
    document.addEventListener('keydown', (e) => {
      if (!this.container || !this.isElementInViewport(this.container)) return;
      const filtered = this.getFilteredMilestones();
      if (filtered.length === 0) return;

      const currentIdx = filtered.findIndex(m => m.year === this.currentYear);
      if (e.key === 'ArrowRight' && currentIdx < filtered.length - 1) {
        this.selectYear(filtered[currentIdx + 1].year, true);
      } else if (e.key === 'ArrowLeft' && currentIdx > 0) {
        this.selectYear(filtered[currentIdx - 1].year, true);
      }
    });
  }

  isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.bottom >= 0
    );
  }
}
