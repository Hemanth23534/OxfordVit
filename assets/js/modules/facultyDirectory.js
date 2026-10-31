/**
 * OXFORD VIT – THE LIVING CAMPUS EXPERIENCE
 * Management & Subject-Wise Faculty Directory Logic
 */

import { managementData } from '../data/managementData.js';

export class FacultyDirectoryEngine {
  constructor() {
    this.container = document.getElementById('faculty-grid');
    this.tabs = document.querySelectorAll('.faculty-dept-tabs .tab-btn');
    this.countBadge = document.getElementById('faculty-count-badge');
    this.currentDept = 'all';

    this.init();
  }

  init() {
    if (!this.container) return;
    this.render();
    this.bindEvents();
  }

  render() {
    if (!this.container) return;

    const list = this.currentDept === 'all'
      ? managementData.facultyDirectory
      : managementData.facultyDirectory.filter(f => f.department === this.currentDept);

    if (this.countBadge) {
      this.countBadge.textContent = `${list.length} Faculty Member${list.length === 1 ? '' : 's'}`;
    }

    if (!list || list.length === 0) {
      this.container.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 3rem; background: var(--bg-card); border-radius: var(--radius-xl);">
          <p style="color: var(--text-muted);">No faculty listed for this department.</p>
        </div>
      `;
      return;
    }

    this.container.innerHTML = list.map(faculty => {
      let deptColor = 'var(--color-botanical)';
      let deptLabel = 'Department';

      switch (faculty.department) {
        case 'mathematics':
          deptColor = 'var(--color-champagne-gold)';
          deptLabel = 'Mathematics & JEE Advanced';
          break;
        case 'physics':
          deptColor = 'var(--color-botanical)';
          deptLabel = 'Physics & Experiments';
          break;
        case 'chemistry':
          deptColor = 'var(--color-coral)';
          deptLabel = 'Chemistry & Research';
          break;
        case 'biology':
          deptColor = 'var(--color-botanical-dark)';
          deptLabel = 'Biology & NEET Division';
          break;
        case 'languages':
          deptColor = 'var(--color-lavender)';
          deptLabel = 'Humanities & Languages';
          break;
      }

      return `
        <div class="glass-card" style="padding: 2.25rem 1.75rem; display: flex; flex-direction: column; align-items: center; text-align: center; border-radius: var(--radius-xl); transition: transform 0.4s var(--ease-spring), box-shadow 0.4s ease;" data-tilt>
          <!-- Faculty Avatar / Monogram -->
          <div style="width: 84px; height: 84px; border-radius: 50%; background: linear-gradient(135deg, ${deptColor}, var(--color-deep-plum)); display: flex; align-items: center; justify-content: center; color: #fff; font-family: var(--font-serif); font-size: 1.6rem; font-weight: 700; margin-bottom: 1.25rem; border: 3px solid #fff; box-shadow: 0 8px 24px rgba(73, 59, 76, 0.2);">
            ${faculty.avatarInitial}
          </div>

          <span class="badge" style="background: rgba(73, 59, 76, 0.08); color: var(--color-deep-plum); border: 1px solid rgba(73, 59, 76, 0.15); margin-bottom: 0.6rem; font-size: 0.72rem;">
            ${deptLabel}
          </span>

          <h3 style="font-family: var(--font-serif); font-size: 1.35rem; color: var(--color-deep-plum); margin-bottom: 0.35rem;">
            ${faculty.name}
          </h3>

          <div style="font-family: var(--font-sans); font-size: 0.875rem; font-weight: 600; color: var(--color-botanical); margin-bottom: 0.25rem;">
            ${faculty.role}
          </div>

          <div style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--text-muted); margin-bottom: 1rem;">
            ${faculty.qualification} • <span style="color: var(--color-champagne-gold); font-weight: 700;">${faculty.experience}</span>
          </div>

          <div style="width: 100%; border-top: 1px solid var(--border-subtle); margin: 0.75rem 0 1rem;"></div>

          <div style="font-size: 0.8125rem; color: var(--text-secondary); line-height: 1.5; margin-bottom: 1rem; flex-grow: 1;">
            <strong>Specialization:</strong> ${faculty.focus}
          </div>

          <div style="font-size: 0.75rem; color: var(--text-muted); display: flex; align-items: center; gap: 0.3rem;">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
            Active at: ${faculty.campus}
          </div>
        </div>
      `;
    }).join('');
  }

  bindEvents() {
    this.tabs.forEach(tab => {
      tab.addEventListener('click', (e) => {
        this.tabs.forEach(t => t.classList.remove('active'));
        e.currentTarget.classList.add('active');
        this.currentDept = e.currentTarget.getAttribute('data-dept') || 'all';
        this.render();
      });
    });
  }
}
