/**
 * OXFORD VIT – THE LIVING CAMPUS EXPERIENCE
 * Achievements & Wall of Champions Interactive Logic
 */

import { achievementsData } from '../data/achievementsData.js';

export class AchievementsEngine {
  constructor() {
    this.marqueeContainer = document.querySelector('.marquee-content');
    this.rankersGrid = document.querySelector('.rankers-grid');
    this.databaseGrid = document.querySelector('.rankers-database-grid');
    this.filterButtons = document.querySelectorAll('.achievements-tabs .tab-btn');
    this.campusFilter = document.getElementById('achievement-campus-filter');
    this.yearFilter = document.getElementById('achievement-year-filter');
    this.searchInput = document.getElementById('achievement-search-input');
    this.countDisplay = document.getElementById('achievement-count-display');

    this.currentCategory = 'all';
    this.currentCampus = 'all';
    this.currentYear = 'all';
    this.currentSearch = '';

    this.init();
  }

  init() {
    this.renderMarquee();
    this.renderRankers();
    this.renderDatabase();
    this.bindFilters();
  }

  renderMarquee() {
    if (!this.marqueeContainer) return;
    const itemsHtml = achievementsData.marqueeItems.map(item => `
      <span class="marquee-item">
        <span class="marquee-star">✦</span>
        ${item}
      </span>
    `).join('');

    // Duplicate content to achieve seamless continuous ticker loop
    this.marqueeContainer.innerHTML = itemsHtml + itemsHtml;
  }

  renderRankers(filter = 'all') {
    if (!this.rankersGrid) return;

    const list = filter === 'all'
      ? achievementsData.hallOfFame.slice(0, 6)
      : achievementsData.hallOfFame.filter(r => {
          if (filter === 'jee') return r.exam.includes('JEE');
          if (filter === 'neet') return r.exam.includes('NEET');
          if (filter === 'board') return r.exam.includes('BIEAP') || r.exam.includes('Board');
          if (filter === 'eapcet') return r.exam.includes('EAPCET');
          return true;
        }).slice(0, 6);

    this.rankersGrid.innerHTML = list.map(ranker => this.generateCardHtml(ranker)).join('');
  }

  renderDatabase() {
    if (!this.databaseGrid) return;

    const filtered = achievementsData.hallOfFame.filter(r => {
      // Category match
      if (this.currentCategory !== 'all') {
        if (this.currentCategory === 'jee-main' && r.category !== 'jee-main') return false;
        if (this.currentCategory === 'jee-advanced' && r.category !== 'jee-advanced') return false;
        if (this.currentCategory === 'neet' && r.category !== 'neet') return false;
        if (this.currentCategory === 'eapcet' && r.category !== 'eapcet') return false;
        if (this.currentCategory === 'intermediate' && r.category !== 'intermediate') return false;
        if (this.currentCategory === 'awards' && r.category !== 'awards') return false;
      }

      // Campus match
      if (this.currentCampus !== 'all' && r.campus !== this.currentCampus) {
        return false;
      }

      // Year match
      if (this.currentYear !== 'all' && r.year !== this.currentYear) {
        return false;
      }

      // Search match
      if (this.currentSearch) {
        const query = this.currentSearch.toLowerCase();
        const matchName = r.name.toLowerCase().includes(query);
        const matchExam = r.exam.toLowerCase().includes(query);
        const matchScore = r.score.toLowerCase().includes(query);
        const matchCampus = r.campus.toLowerCase().includes(query);
        if (!matchName && !matchExam && !matchScore && !matchCampus) return false;
      }

      return true;
    });

    if (this.countDisplay) {
      this.countDisplay.textContent = `Showing ${filtered.length} verified achiever${filtered.length === 1 ? '' : 's'}`;
    }

    if (filtered.length === 0) {
      this.databaseGrid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 2rem; background: var(--bg-card); border-radius: var(--radius-xl); border: 1px solid var(--border-subtle);">
          <div style="font-size: 2.5rem; margin-bottom: 1rem;">🔍</div>
          <h3 style="font-family: var(--font-serif); font-size: 1.5rem; color: var(--color-deep-plum); margin-bottom: 0.5rem;">No Achievers Found</h3>
          <p style="color: var(--text-muted); max-width: 450px; margin: 0 auto 1.5rem;">No results match the selected filter criteria. Try resetting the filters or searching for another student name or exam.</p>
          <button id="reset-achieve-filters" class="btn btn-outline btn-sm">Reset All Filters</button>
        </div>
      `;
      const resetBtn = document.getElementById('reset-achieve-filters');
      if (resetBtn) {
        resetBtn.addEventListener('click', () => this.resetFilters());
      }
      return;
    }

    this.databaseGrid.innerHTML = filtered.map(ranker => this.generateCardHtml(ranker, true)).join('');
  }

  generateCardHtml(ranker, isFull = false) {
    const initials = ranker.name.split(' ').map(n => n[0]).slice(0, 2).join('');
    return `
      <div class="ranker-card" data-tilt>
        <!-- Achiever Portrait Badge -->
        <div style="position: relative; width: 90px; height: 90px; margin: 0 auto 1.25rem;">
          <div style="width: 100%; height: 100%; border-radius: 50%; background: linear-gradient(135deg, var(--color-champagne-gold-light), var(--color-champagne-gold)); display: flex; align-items: center; justify-content: center; box-shadow: 0 8px 24px rgba(214, 183, 122, 0.4); border: 3px solid #fff; font-family: var(--font-serif); font-size: 1.75rem; font-weight: 700; color: var(--color-deep-plum);">
            ${initials}
          </div>
          <div style="position: absolute; bottom: -8px; left: 50%; transform: translateX(-50%); background: linear-gradient(135deg, var(--color-coral), var(--color-coral-dark)); color: #fff; font-family: var(--font-mono); font-size: 0.6875rem; font-weight: 800; padding: 2px 10px; border-radius: 12px; white-space: nowrap; border: 1.5px solid #fff; box-shadow: 0 4px 10px rgba(0,0,0,0.15);">
            ${ranker.rank}
          </div>
        </div>

        <h4 class="ranker-name">${ranker.name}</h4>
        <div class="ranker-exam">${ranker.exam} • <strong style="color: var(--color-botanical);">${ranker.score}</strong></div>
        
        <div style="display: flex; gap: 0.5rem; justify-content: center; flex-wrap: wrap; margin: 0.75rem 0;">
          <span class="badge badge-botanical">${ranker.stream}</span>
          ${ranker.year ? `<span class="badge badge-gold">${ranker.year}</span>` : ''}
        </div>

        <div style="font-size: 0.8125rem; color: var(--text-muted); margin-bottom: 0.75rem; display: flex; align-items: center; justify-content: center; gap: 0.35rem;">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
          ${ranker.campus}
        </div>

        ${ranker.sourceRef ? `
          <div style="font-family: var(--font-mono); font-size: 0.6875rem; color: var(--color-botanical); background: rgba(82, 107, 84, 0.08); padding: 4px 8px; border-radius: 4px; margin-bottom: 0.85rem; border: 1px solid rgba(82, 107, 84, 0.2);">
            Ref: ${ranker.sourceRef}
          </div>
        ` : ''}

        <p class="ranker-quote">“${ranker.quote}”</p>
      </div>
    `;
  }

  bindFilters() {
    this.filterButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        this.filterButtons.forEach(b => b.classList.remove('active'));
        e.currentTarget.classList.add('active');
        const filter = e.currentTarget.getAttribute('data-filter') || 'all';
        this.currentCategory = filter;
        
        // Update homepage rankers if present
        this.renderRankers(filter);
        // Update database if present
        this.renderDatabase();
      });
    });

    if (this.campusFilter) {
      this.campusFilter.addEventListener('change', (e) => {
        this.currentCampus = e.target.value;
        this.renderDatabase();
      });
    }

    if (this.yearFilter) {
      this.yearFilter.addEventListener('change', (e) => {
        this.currentYear = e.target.value;
        this.renderDatabase();
      });
    }

    if (this.searchInput) {
      this.searchInput.addEventListener('input', (e) => {
        this.currentSearch = e.target.value.trim();
        this.renderDatabase();
      });
    }
  }

  resetFilters() {
    this.currentCategory = 'all';
    this.currentCampus = 'all';
    this.currentYear = 'all';
    this.currentSearch = '';

    if (this.campusFilter) this.campusFilter.value = 'all';
    if (this.yearFilter) this.yearFilter.value = 'all';
    if (this.searchInput) this.searchInput.value = '';

    this.filterButtons.forEach((b, i) => {
      if (i === 0) b.classList.add('active');
      else b.classList.remove('active');
    });

    this.renderDatabase();
  }
}
