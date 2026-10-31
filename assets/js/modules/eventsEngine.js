/**
 * OXFORD VIT – THE LIVING CAMPUS EXPERIENCE
 * Institutional Events & Celebrations Interactive Engine
 */

import { eventsData } from '../data/eventsData.js';

export class EventsEngine {
  constructor() {
    this.container = document.getElementById('events-grid');
    this.tabs = document.querySelectorAll('.events-tabs .tab-btn');
    this.currentCategory = 'all';

    this.init();
  }

  init() {
    if (!this.container) return;
    this.render();
    this.bindEvents();
  }

  render() {
    if (!this.container) return;

    const list = this.currentCategory === 'all'
      ? eventsData.events
      : eventsData.events.filter(e => e.category === this.currentCategory);

    if (list.length === 0) {
      this.container.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 3rem; background: var(--bg-card); border-radius: var(--radius-xl);">
          <p style="color: var(--text-muted);">No scheduled events found in this category.</p>
        </div>
      `;
      return;
    }

    this.container.innerHTML = list.map(evt => `
      <div class="glass-card event-card" style="display: flex; flex-direction: column; overflow: hidden; border-radius: var(--radius-xl); transition: transform 0.4s var(--ease-spring), box-shadow 0.4s ease;" data-tilt>
        <!-- Header Banner with Date Badge -->
        <div style="background: linear-gradient(135deg, rgba(82, 107, 84, 0.15), rgba(214, 183, 122, 0.15)); padding: 1.5rem; display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid var(--border-subtle);">
          <div style="display: flex; align-items: center; gap: 1rem;">
            <div style="background: var(--color-deep-plum); color: var(--color-champagne-gold); padding: 0.5rem 0.85rem; border-radius: var(--radius-md); text-align: center; font-family: var(--font-mono); line-height: 1.1; border: 1px solid var(--color-champagne-gold);">
              <div style="font-size: 0.75rem; font-weight: 700; letter-spacing: 0.05em;">${evt.month}</div>
              <div style="font-size: 1.25rem; font-weight: 800;">${evt.day}</div>
            </div>
            <div>
              <span class="badge badge-gold" style="font-size: 0.6875rem; margin-bottom: 0.25rem;">${evt.tag}</span>
              <div style="font-size: 0.8125rem; color: var(--text-muted); font-family: var(--font-mono);">${evt.date}</div>
            </div>
          </div>
        </div>

        <!-- Body -->
        <div style="padding: 1.75rem; display: flex; flex-direction: column; flex-grow: 1;">
          <h3 style="font-family: var(--font-serif); font-size: 1.4rem; color: var(--color-deep-plum); margin-bottom: 0.75rem; line-height: 1.3;">
            ${evt.title}
          </h3>

          <div style="font-size: 0.8125rem; color: var(--color-botanical); margin-bottom: 1rem; display: flex; align-items: center; gap: 0.35rem; font-weight: 600;">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
            ${evt.campus}
          </div>

          <p style="font-size: 0.9375rem; color: var(--text-secondary); line-height: 1.6; margin-bottom: 1.25rem; flex-grow: 1;">
            ${evt.description}
          </p>

          <div style="background: rgba(247, 243, 233, 0.6); padding: 1rem; border-radius: var(--radius-md); border-left: 3px solid var(--color-champagne-gold);">
            <div style="font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: var(--color-deep-plum); margin-bottom: 0.5rem;">Event Highlights:</div>
            <ul style="margin: 0; padding-left: 1.2rem; font-size: 0.8125rem; color: var(--text-secondary); line-height: 1.5;">
              ${evt.highlights.map(h => `<li style="margin-bottom: 0.25rem;">${h}</li>`).join('')}
            </ul>
          </div>
        </div>
      </div>
    `).join('');
  }

  bindEvents() {
    this.tabs.forEach(tab => {
      tab.addEventListener('click', (e) => {
        this.tabs.forEach(t => t.classList.remove('active'));
        e.currentTarget.classList.add('active');
        this.currentCategory = e.currentTarget.getAttribute('data-category') || 'all';
        this.render();
      });
    });
  }
}
