/**
 * OXFORD VIT – THE LIVING CAMPUS EXPERIENCE
 * Verified Social Media & Institutional Pulse Engine
 * Curated from public institutional outreach by Panadi Raghava (@raghava_vit)
 * Platforms: Instagram (https://www.instagram.com/raghava_vit/) & Threads (https://www.threads.com/@raghava_vit)
 */

import { socialData } from '../data/socialData.js';

export class SocialFeedEngine {
  constructor(options = {}) {
    this.container = options.container || document.querySelector('.social-feed-section');
    this.grid = options.grid || document.querySelector('.social-feed-grid');
    this.filterContainer = options.filterContainer || document.querySelector('.social-filter-tabs');
    this.profileCard = options.profileCard || document.querySelector('.social-profile-card');
    this.modal = options.modal || document.getElementById('social-modal');
    this.modalBody = options.modalBody || document.getElementById('social-modal-body');
    this.modalClose = options.modalClose || document.getElementById('social-modal-close');

    this.posts = socialData.posts || [];
    this.profiles = socialData.profiles || {};
    this.currentCategory = 'all';

    if (!this.container && !this.grid) return;
    this.init();
  }

  async init() {
    await this.fetchSocialData();
    this.renderProfileCard();
    this.renderFilters();
    this.renderGrid();
    this.bindModalEvents();
  }

  async fetchSocialData() {
    try {
      const res = await fetch('/api/social');
      if (res.ok) {
        const json = await res.json();
        if (json.data && json.data.length > 0) {
          this.posts = json.data;
          this.profiles = json.profiles || socialData.profiles;
        }
      }
    } catch (e) {
      console.warn('Using static social dataset as API fallback:', e);
      this.posts = socialData.posts || [];
      this.profiles = socialData.profiles || {};
    }
  }

  getFilteredPosts() {
    if (this.currentCategory === 'all') return this.posts;
    return this.posts.filter(p => {
      if (this.currentCategory === 'instagram') return p.platform === 'instagram';
      if (this.currentCategory === 'threads') return p.platform === 'threads';
      if (this.currentCategory === 'achievements') return p.category === 'achievements' || p.category === 'academics';
      if (this.currentCategory === 'celebrations') return p.category === 'celebrations' || p.category === 'events';
      if (this.currentCategory === 'trust') return p.category === 'trust' || p.categoryLabel.toLowerCase().includes('trust');
      return p.category === this.currentCategory;
    });
  }

  renderProfileCard() {
    if (!this.profileCard) return;
    const author = this.profiles['raghava_vit'] || {
      name: 'Panadi Raghava',
      handle: '@raghava_vit',
      role: 'Principal and Academic Director',
      institution: 'Oxford VIT Junior College & Academy, Narasaraopet',
      instagramUrl: 'https://www.instagram.com/raghava_vit/',
      threadsUrl: 'https://www.threads.com/@raghava_vit'
    };

    this.profileCard.innerHTML = `
      <div class="social-author-banner">
        <div class="author-avatar-wrap">
          <div class="avatar-ring">
            <span class="avatar-initials">PR</span>
          </div>
          <span class="verified-tick" title="Verified Institutional Management Profile">✓</span>
        </div>
        <div class="author-details">
          <div class="author-title-row">
            <h3 class="author-name">${author.name}</h3>
            <span class="author-handle">${author.handle}</span>
            <span class="badge badge-gold">Official Management Channel</span>
          </div>
          <p class="author-bio">
            ${author.role} &bull; ${author.institution}. Sharing mathematical pedagogy, classroom milestones, ranker honors, and KSR Charitable Trust community initiatives.
          </p>
        </div>
        <div class="author-actions">
          <a href="${author.instagramUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-outline btn-sm social-channel-btn instagram-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
            Follow on Instagram
          </a>
          <a href="${author.threadsUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-outline btn-sm social-channel-btn threads-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12.186 24c-3.535 0-6.425-1.168-8.358-3.377C1.968 18.508 1 15.617 1 12.016 1 8.486 2.002 5.59 3.978 3.398 5.954 1.206 8.878 0 12.449 0c3.57 0 6.452 1.18 8.334 3.413C22.665 5.646 23.6 8.52 23.6 11.963v.787h-4.398v-.787c0-2.453-.615-4.444-1.826-5.918-1.212-1.474-3.033-2.254-5.412-2.254-2.38 0-4.227.78-5.49 2.316C5.21 7.644 4.58 9.61 4.58 11.963c0 2.38.618 4.372 1.836 5.927 1.218 1.556 3.036 2.345 5.4 2.345 2.102 0 3.76-.62 4.927-1.844.75-.788 1.248-1.802 1.48-3.013h-6.407v-3.792h10.427c.105.772.158 1.57.158 2.396 0 3.557-1.125 6.428-3.344 8.532C17.037 23.018 14.773 24 12.186 24z"/></svg>
            Follow on Threads
          </a>
        </div>
      </div>
    `;
  }

  renderFilters() {
    if (!this.filterContainer) return;
    const categories = [
      { id: 'all', label: 'All Updates' },
      { id: 'instagram', label: 'Instagram Feeds' },
      { id: 'threads', label: 'Threads Broadcasts' },
      { id: 'achievements', label: 'Academic & Ranks' },
      { id: 'celebrations', label: 'Campus Life & Fests' },
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
        this.renderGrid();
      });
    });
  }

  renderGrid() {
    if (!this.grid) return;
    const filtered = this.getFilteredPosts();

    if (filtered.length === 0) {
      this.grid.innerHTML = `
        <div class="empty-social-state" style="grid-column: 1 / -1; text-align: center; padding: 3rem; background: var(--bg-card); border-radius: var(--radius-xl); border: 1px dashed var(--border-gold);">
          <p style="color: var(--text-muted); font-size: 1rem;">No social media records found matching this filter.</p>
        </div>
      `;
      return;
    }

    this.grid.innerHTML = filtered.map((post, index) => {
      const isIg = post.platform === 'instagram';
      const formattedCaption = this.highlightHashtags(post.caption);
      return `
        <article class="social-feed-card" data-index="${index}" style="cursor: pointer;">
          <div class="social-card-header">
            <div class="social-header-user">
              <div class="post-avatar">
                <span>PR</span>
              </div>
              <div class="post-user-info">
                <div class="user-name-row">
                  <span class="user-display-name">${post.author}</span>
                  <span class="verified-icon">✓</span>
                </div>
                <div class="user-sub-row">
                  <span class="user-handle">${post.handle}</span>
                  <span class="dot-separator">&bull;</span>
                  <span class="post-date">${this.formatDate(post.publicationDate)}</span>
                </div>
              </div>
            </div>
            <div class="platform-badge ${isIg ? 'badge-instagram' : 'badge-threads'}">
              ${isIg ? 'Instagram' : 'Threads'}
            </div>
          </div>

          <div class="social-card-media-box">
            <div class="media-preview-container">
              ${post.image ? `
                <img src="${post.image}" alt="${post.event}" loading="lazy" class="social-card-img">
              ` : `
                <div class="media-illustration-box">
                  <div class="illustration-graphic">
                    <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                      <rect width="18" height="18" x="3" y="3" rx="2" ry="2"/>
                      <circle cx="9" cy="9" r="2"/>
                      <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>
                    </svg>
                  </div>
                  <div class="illustration-tag">${post.event}</div>
                </div>
              `}
              <div class="media-campus-tag">📍 ${post.campus}</div>
            </div>
          </div>

          <div class="social-card-caption">
            <p>${formattedCaption}</p>
          </div>

          <div class="social-card-engagement">
            <div class="engagement-metric">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
              <span>${post.likesCount || 0}</span>
            </div>
            <div class="engagement-metric">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
              <span>${post.commentsCount || 0}</span>
            </div>
            <div class="post-category-tag">
              ${post.categoryLabel}
            </div>
          </div>

          <div class="social-card-footer">
            <div class="compliance-row">
              <span class="compliance-chip">✓ ${post.verificationStatus}</span>
              <span class="compliance-chip">${post.permissionStatus}</span>
            </div>
            <a href="${post.originalUrl}" target="_blank" rel="noopener noreferrer" class="view-post-link" onclick="event.stopPropagation();">
              View on ${isIg ? 'Instagram' : 'Threads'} ↗
            </a>
          </div>
        </article>
      `;
    }).join('');

    this.grid.querySelectorAll('.social-feed-card').forEach(card => {
      card.addEventListener('click', (e) => {
        const idx = parseInt(e.currentTarget.getAttribute('data-index'), 10);
        this.openModal(idx);
      });
    });
  }

  highlightHashtags(text) {
    if (!text) return '';
    return text.replace(/#([\w\u0080-\uffff]+)/g, '<span class="post-hashtag">#$1</span>');
  }

  formatDate(dateStr) {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  }

  openModal(index) {
    const filtered = this.getFilteredPosts();
    const post = filtered[index];
    if (!post || !this.modal || !this.modalBody) return;

    const isIg = post.platform === 'instagram';
    this.modalBody.innerHTML = `
      <div class="social-modal-inner">
        <div class="social-modal-header">
          <div class="post-avatar"><span>PR</span></div>
          <div class="post-user-info">
            <div class="user-name-row">
              <span class="user-display-name">${post.author}</span>
              <span class="verified-icon">✓</span>
            </div>
            <div class="user-sub-row">
              <span class="user-handle">${post.handle}</span>
              <span class="dot-separator">&bull;</span>
              <span class="post-date">${this.formatDate(post.publicationDate)}</span>
            </div>
          </div>
          <div class="platform-badge ${isIg ? 'badge-instagram' : 'badge-threads'}" style="margin-left: auto;">
            ${isIg ? 'Instagram' : 'Threads'}
          </div>
        </div>

        <div class="social-modal-media-box" style="margin: 1.5rem 0; border-radius: var(--radius-lg); overflow: hidden; background: #2B212D; border: 1.5px solid var(--border-gold);">
          ${post.image ? `
            <img src="${post.image}" alt="${post.event}" style="width: 100%; max-height: 400px; object-fit: contain; display: block;">
          ` : `
            <div style="padding: 3rem 1.5rem; text-align: center; color: var(--color-champagne-gold);">
              <div style="font-size: 2.5rem; margin-bottom: 0.5rem;">📸</div>
              <div style="font-family: var(--font-serif); font-size: 1.25rem; font-weight: 600; margin-bottom: 0.5rem;">${post.event}</div>
              <p style="font-size: 0.875rem; color: #D4CDD7; max-width: 480px; margin: 0 auto;">${post.mediaDescription}</p>
            </div>
          `}
        </div>

        <div class="social-modal-caption" style="font-size: 1.05rem; line-height: 1.7; color: var(--color-deep-plum); margin-bottom: 1.5rem;">
          ${this.highlightHashtags(post.caption)}
        </div>

        <div class="social-audit-dossier" style="background: rgba(247,243,233,0.7); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 1.25rem; margin-bottom: 1.5rem;">
          <h4 style="font-size: 0.8125rem; text-transform: uppercase; font-family: var(--font-mono); color: var(--color-botanical); margin-bottom: 0.75rem; letter-spacing: 0.05em;">
            Institutional Research &amp; Media Audit Record
          </h4>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 0.75rem; font-size: 0.8125rem;">
            <div><strong>Target Institution:</strong> Oxford VIT Narasaraopet</div>
            <div><strong>Campus:</strong> ${post.campus}</div>
            <div><strong>Verification Status:</strong> ${post.verificationStatus}</div>
            <div><strong>Photo Permission:</strong> ${post.permissionStatus}</div>
            <div><strong>Event / Occasion:</strong> ${post.event}</div>
            <div><strong>Achievement Details:</strong> ${post.achievementDetails || 'Institutional Brief'}</div>
          </div>
        </div>

        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem; padding-top: 1rem; border-top: 1px solid var(--border-subtle);">
          <div style="display: flex; gap: 1.5rem; color: var(--text-muted); font-size: 0.875rem;">
            <span>❤️ ${post.likesCount} Likes</span>
            <span>💬 ${post.commentsCount} Comments</span>
          </div>
          <a href="${post.originalUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-gold btn-sm">
            Open Original Post on ${isIg ? 'Instagram' : 'Threads'} ↗
          </a>
        </div>
      </div>
    `;

    this.modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  bindModalEvents() {
    if (this.modalClose) {
      this.modalClose.addEventListener('click', () => this.closeModal());
    }
    if (this.modal) {
      this.modal.addEventListener('click', (e) => {
        if (e.target === this.modal) this.closeModal();
      });
    }
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.modal && this.modal.classList.contains('active')) {
        this.closeModal();
      }
    });
  }

  closeModal() {
    if (!this.modal) return;
    this.modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}
