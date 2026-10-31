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
        <div class="rank-badge-large">
          <span class="rank-number">${ranker.rank}</span>
          <span class="rank-sub">${ranker.exam.split(' ')[0]}</span>
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
