/**
 * OXFORD VIT – THE LIVING CAMPUS EXPERIENCE
 * Achievements & Wall of Champions Interactive Logic
 */

import { achievementsData } from '../data/achievementsData.js';

export class AchievementsEngine {
  constructor() {
    this.marqueeContainer = document.querySelector('.marquee-content');
    this.rankersGrid = document.querySelector('.rankers-grid');
    this.filterButtons = document.querySelectorAll('.achievements-tabs .tab-btn');

    this.init();
  }

  init() {
    this.renderMarquee();
    this.renderRankers('all');
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
      ? achievementsData.hallOfFame
      : achievementsData.hallOfFame.filter(r => {
          if (filter === 'jee') return r.exam.includes('JEE');
          if (filter === 'neet') return r.exam.includes('NEET');
          if (filter === 'board') return r.exam.includes('BIEAP') || r.exam.includes('Board');
          if (filter === 'eapcet') return r.exam.includes('EAPCET');
          return true;
        });

    this.rankersGrid.innerHTML = list.map(ranker => `
      <div class="ranker-card">
        <!-- Student Achiever Portrait Badge with Gold Laurels -->
        <div style="position: relative; width: 90px; height: 90px; margin: 0 auto 1.25rem;">
          <div style="width: 100%; height: 100%; border-radius: 50%; background: linear-gradient(135deg, var(--color-champagne-gold-light), var(--color-champagne-gold)); display: flex; align-items: center; justify-content: center; box-shadow: 0 8px 24px rgba(214, 183, 122, 0.4); border: 3px solid #fff; font-family: var(--font-serif); font-size: 1.75rem; font-weight: 700; color: var(--color-deep-plum);">
            ${ranker.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
          </div>
          <div style="position: absolute; bottom: -8px; left: 50%; transform: translateX(-50%); background: linear-gradient(135deg, var(--color-coral), var(--color-coral-dark)); color: #fff; font-family: var(--font-mono); font-size: 0.6875rem; font-weight: 800; padding: 2px 10px; border-radius: 12px; white-space: nowrap; border: 1.5px solid #fff; box-shadow: 0 4px 10px rgba(0,0,0,0.15);">
            ${ranker.rank}
          </div>
        </div>

        <h4 class="ranker-name">${ranker.name}</h4>
        <div class="ranker-exam">${ranker.exam} • ${ranker.score}</div>
        <span class="badge badge-botanical" style="margin-bottom: 0.85rem;">${ranker.stream}</span>
        <div style="font-size: 0.78125rem; color: var(--text-muted); margin-bottom: 0.75rem;">
          Campus: ${ranker.campus}
        </div>
        <p class="ranker-quote">“${ranker.quote}”</p>
      </div>
    `).join('');
  }

  bindFilters() {
    this.filterButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        this.filterButtons.forEach(b => b.classList.remove('active'));
        e.currentTarget.classList.add('active');
        const filter = e.currentTarget.getAttribute('data-filter');
        this.renderRankers(filter);
      });
    });
  }
}
