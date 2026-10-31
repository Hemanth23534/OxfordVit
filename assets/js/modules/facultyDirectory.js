/**
 * OXFORD VIT – THE LIVING CAMPUS EXPERIENCE
 * Subject-Wise Teaching Faculty Directory Engine
 * Multi-Facet 6D Filtering System:
 * - City
 * - Campus
 * - Department
 * - Subject
 * - Section (Senior / Junior)
 * - Teaching Track (IIT-JEE / NEET / Intermediate)
 * Plus live search, verification status badges, and academic dossier modal.
 */

import { facultyData } from '../data/facultyData.js';

export class FacultyDirectoryEngine {
  constructor() {
    this.container = document.getElementById('faculty-cards-grid');
    this.countBadge = document.getElementById('faculty-count-badge');
    this.chipsContainer = document.getElementById('active-filter-chips');
    this.resetBtn = document.getElementById('filter-reset-btn');

    // Filter controls
    this.filterCity = document.getElementById('filter-city');
    this.filterCampus = document.getElementById('filter-campus');
    this.filterDept = document.getElementById('filter-dept');
    this.filterSubject = document.getElementById('filter-subject');
    this.filterSection = document.getElementById('filter-section');
    this.filterTrack = document.getElementById('filter-track');
    this.searchInput = document.getElementById('filter-search');

    // Modal
    this.modalOverlay = document.getElementById('faculty-modal-overlay');
    this.modalContent = document.getElementById('faculty-modal-content');
    this.modalCloseBtn = document.getElementById('faculty-modal-close');

    // State
    this.filters = {
      city: 'all',
      campus: 'all',
      department: 'all',
      subject: 'all',
      section: 'all',
      track: 'all',
      search: ''
    };

    this.init();
  }

  init() {
    if (!this.container) return;

    this.bindEvents();
    this.render();
  }

  bindEvents() {
    // Dropdown change listeners
    if (this.filterCity) {
      this.filterCity.addEventListener('change', (e) => {
        this.filters.city = e.target.value;
        this.render();
      });
    }

    if (this.filterCampus) {
      this.filterCampus.addEventListener('change', (e) => {
        this.filters.campus = e.target.value;
        this.render();
      });
    }

    if (this.filterDept) {
      this.filterDept.addEventListener('change', (e) => {
        this.filters.department = e.target.value;
        this.render();
      });
    }

    if (this.filterSubject) {
      this.filterSubject.addEventListener('change', (e) => {
        this.filters.subject = e.target.value;
        this.render();
      });
    }

    if (this.filterSection) {
      this.filterSection.addEventListener('change', (e) => {
        this.filters.section = e.target.value;
        this.render();
      });
    }

    if (this.filterTrack) {
      this.filterTrack.addEventListener('change', (e) => {
        this.filters.track = e.target.value;
        this.render();
      });
    }

    // Search live typing
    if (this.searchInput) {
      this.searchInput.addEventListener('input', (e) => {
        this.filters.search = e.target.value.toLowerCase().trim();
        this.render();
      });
    }

    // Reset button
    if (this.resetBtn) {
      this.resetBtn.addEventListener('click', () => {
        this.resetFilters();
      });
    }

    // Modal close listeners
    if (this.modalCloseBtn) {
      this.modalCloseBtn.addEventListener('click', () => this.closeModal());
    }

    if (this.modalOverlay) {
      this.modalOverlay.addEventListener('click', (e) => {
        if (e.target === this.modalOverlay) {
          this.closeModal();
        }
      });
    }

    // Global ESC key listener for modal
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.modalOverlay && this.modalOverlay.classList.contains('active')) {
        this.closeModal();
      }
    });

    // Delegated clicks for "View Academic Dossier"
    this.container.addEventListener('click', (e) => {
      const btn = e.target.closest('.faculty-dossier-btn');
      if (btn) {
        const id = btn.getAttribute('data-id');
        this.openModal(id);
      }
    });
  }

  resetFilters() {
    this.filters = {
      city: 'all',
      campus: 'all',
      department: 'all',
      subject: 'all',
      section: 'all',
      track: 'all',
      search: ''
    };

    if (this.filterCity) this.filterCity.value = 'all';
    if (this.filterCampus) this.filterCampus.value = 'all';
    if (this.filterDept) this.filterDept.value = 'all';
    if (this.filterSubject) this.filterSubject.value = 'all';
    if (this.filterSection) this.filterSection.value = 'all';
    if (this.filterTrack) this.filterTrack.value = 'all';
    if (this.searchInput) this.searchInput.value = '';

    this.render();
  }

  filterList() {
    return facultyData.filter(item => {
      // 1. City Filter
      if (this.filters.city !== 'all') {
        if (item.city !== this.filters.city && item.city !== 'all') {
          return false;
        }
      }

      // 2. Campus Filter
      if (this.filters.campus !== 'all') {
        if (item.campusId !== this.filters.campus && item.campusId !== 'all') {
          return false;
        }
      }

      // 3. Department Filter
      if (this.filters.department !== 'all') {
        if (item.department !== this.filters.department) {
          return false;
        }
      }

      // 4. Subject Filter
      if (this.filters.subject !== 'all') {
        if (item.subjectKey !== this.filters.subject) {
          return false;
        }
      }

      // 5. Section Filter (senior / junior)
      if (this.filters.section !== 'all') {
        if (item.section !== this.filters.section && item.section !== 'both') {
          return false;
        }
      }

      // 6. Track Filter (iit-jee / neet / intermediate)
      if (this.filters.track !== 'all') {
        if (item.teachingTrack !== this.filters.track && item.teachingTrack !== 'integrated') {
          return false;
        }
      }

      // 7. Search text
      if (this.filters.search) {
        const query = this.filters.search;
        const nameMatch = item.name.toLowerCase().includes(query);
        const subjectMatch = item.subject.toLowerCase().includes(query);
        const qualMatch = (item.qualification || '').toLowerCase().includes(query);
        const specMatch = (item.specialization || '').toLowerCase().includes(query);
        const campusMatch = (item.campus || '').toLowerCase().includes(query);
        const topicsMatch = (item.topicsTaught || []).some(t => t.toLowerCase().includes(query));

        if (!nameMatch && !subjectMatch && !qualMatch && !specMatch && !campusMatch && !topicsMatch) {
          return false;
        }
      }

      return true;
    });
  }

  render() {
    const filtered = this.filterList();

    // 1. Update counter badge
    if (this.countBadge) {
      this.countBadge.textContent = `Showing ${filtered.length} of ${facultyData.length} Faculty Members`;
    }

    // 2. Render active chips
    this.renderChips();

    // 3. Render grid
    if (filtered.length === 0) {
      this.container.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 2rem; background: #ffffff; border-radius: var(--radius-xl); border: 1.5px dashed var(--border-gold);">
          <div style="font-size: 2.5rem; margin-bottom: 1rem;">🔍</div>
          <h3 style="font-size: 1.4rem; color: var(--color-deep-plum); margin-bottom: 0.5rem;">No Faculty Members Found</h3>
          <p style="color: var(--text-secondary); max-width: 480px; margin: 0 auto 1.5rem; font-size: 0.95rem;">
            No faculty match the chosen combination of City, Campus, Department, Subject, and Track filters.
          </p>
          <button id="zero-state-reset" class="btn btn-gold btn-sm">
            <span>Reset All Filters</span>
          </button>
        </div>
      `;

      const zeroReset = document.getElementById('zero-state-reset');
      if (zeroReset) {
        zeroReset.addEventListener('click', () => this.resetFilters());
      }
      return;
    }

    this.container.innerHTML = filtered.map(f => this.renderCard(f)).join('');

    // Trigger subtle entrance transition if GSAP is available
    if (window.gsap) {
      window.gsap.from(this.container.children, {
        opacity: 0,
        y: 15,
        duration: 0.35,
        stagger: 0.04,
        ease: 'power2.out'
      });
    }
  }

  renderCard(f) {
    const isInformal = f.isInformal;

    const statusPill = isInformal
      ? `<span class="verification-notice-pill pending-informal" title="Informal roster record">⚠️ ${f.verificationBadge}</span>`
      : `<span class="verification-notice-pill verified" title="Verified institutional council record">✓ ${f.verificationBadge}</span>`;

    const informalNoticeBox = isInformal
      ? `<div class="faculty-informal-notice">
          <strong>Roster Record Note:</strong> Initial department entry supplied as informal name / abbreviation. Do not assume legal surname until confirmed by institutional registry.
        </div>`
      : '';

    const topicsHtml = (f.topicsTaught && f.topicsTaught.length > 0)
      ? `
        <div class="faculty-topics-box">
          <div class="faculty-topics-title">Key Curriculum Modules</div>
          <ul class="faculty-topics-list">
            ${f.topicsTaught.slice(0, 3).map(t => `<li>${t}</li>`).join('')}
          </ul>
        </div>
      `
      : '';

    return `
      <article class="faculty-card" data-id="${f.id}" data-dept="${f.department}">
        
        <!-- Card Header -->
        <div class="faculty-card-header">
          <div class="faculty-card-avatar">
            <img src="${f.imageSrc}" alt="${f.name} Crest" loading="lazy">
          </div>
          <div class="faculty-card-meta">
            <div style="font-family: var(--font-mono); font-size: 0.72rem; color: var(--color-champagne-gold-dark); text-transform: uppercase; font-weight: 700;">
              ${f.departmentLabel}
            </div>
            <h3 class="faculty-card-name">${f.name}</h3>
            <div class="faculty-card-subject">${f.subject}</div>
            <div class="faculty-card-qual">${f.qualification} • <strong style="color: var(--color-champagne-gold-dark);">${f.experience}</strong></div>
          </div>
        </div>

        <!-- Card Body -->
        <div class="faculty-card-body">
          
          <!-- Badges Row -->
          <div class="faculty-badges-row">
            <span class="badge badge-gold" style="font-size: 0.72rem;">${f.sectionLabel}</span>
            <span class="badge badge-botanical" style="font-size: 0.72rem;">${f.teachingTrackLabel}</span>
            <span class="badge" style="background: rgba(73,59,76,0.08); color: var(--color-deep-plum); font-size: 0.72rem;">📍 ${f.cityLabel}</span>
          </div>

          <!-- Status Badge -->
          <div style="margin-bottom: 0.75rem;">
            ${statusPill}
          </div>

          <!-- Informal Roster Transparency Warning -->
          ${informalNoticeBox}

          <!-- Bio Snippet -->
          <p class="faculty-bio-snippet">
            ${f.biography}
          </p>

          <!-- Key Syllabus Modules -->
          ${topicsHtml}

          <!-- Card Footer & Privacy -->
          <div class="faculty-card-footer">
            <div class="faculty-privacy-pill" title="Personal contact info protected">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
              Contact routed via Central Office
            </div>

            <button class="faculty-dossier-btn" data-id="${f.id}" aria-label="View Academic Dossier for ${f.name}">
              <span>View Dossier</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
          </div>

        </div>

      </article>
    `;
  }

  renderChips() {
    if (!this.chipsContainer) return;

    const chips = [];

    if (this.filters.city !== 'all') {
      chips.push({ key: 'city', label: `City: ${this.filters.city}` });
    }
    if (this.filters.campus !== 'all') {
      chips.push({ key: 'campus', label: `Campus: ${this.filters.campus}` });
    }
    if (this.filters.department !== 'all') {
      chips.push({ key: 'department', label: `Dept: ${this.filters.department}` });
    }
    if (this.filters.subject !== 'all') {
      chips.push({ key: 'subject', label: `Subject: ${this.filters.subject}` });
    }
    if (this.filters.section !== 'all') {
      chips.push({ key: 'section', label: `Section: ${this.filters.section}` });
    }
    if (this.filters.track !== 'all') {
      chips.push({ key: 'track', label: `Track: ${this.filters.track}` });
    }
    if (this.filters.search) {
      chips.push({ key: 'search', label: `Search: "${this.filters.search}"` });
    }

    if (chips.length === 0) {
      this.chipsContainer.innerHTML = '';
      return;
    }

    this.chipsContainer.innerHTML = chips.map(chip => `
      <span class="filter-chip">
        ${chip.label}
        <button data-remove-key="${chip.key}" aria-label="Remove filter">✕</button>
      </span>
    `).join('');

    this.chipsContainer.querySelectorAll('button[data-remove-key]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const key = e.currentTarget.getAttribute('data-remove-key');
        if (key === 'search') {
          this.filters.search = '';
          if (this.searchInput) this.searchInput.value = '';
        } else {
          this.filters[key] = 'all';
          const el = document.getElementById(`filter-${key === 'department' ? 'dept' : key}`);
          if (el) el.value = 'all';
        }
        this.render();
      });
    });
  }

  openModal(facultyId) {
    const f = facultyData.find(item => item.id === facultyId);
    if (!f || !this.modalOverlay || !this.modalContent) return;

    const statusBadge = f.isInformal
      ? `<span class="verification-notice-pill pending-informal">⚠️ ${f.verificationBadge}</span>`
      : `<span class="verification-notice-pill verified">✓ ${f.verificationBadge}</span>`;

    const informalNote = f.isInformal
      ? `
        <div style="background: rgba(214,183,122,0.18); border: 1.5px dashed var(--color-champagne-gold); padding: 1rem 1.25rem; border-radius: var(--radius-md); margin-bottom: 1.5rem;">
          <div style="font-weight: 700; color: #7D6123; font-size: 0.85rem; margin-bottom: 0.25rem;">Official Record Confirmation Notice</div>
          <p style="font-size: 0.8125rem; color: #5C4516; line-height: 1.5; margin: 0;">
            This profile is maintained from initial departmental records as an informal name / abbreviation. In alignment with academic publishing policies, full civil surname and degree registry are preserved as incomplete pending official verification.
          </p>
        </div>
      `
      : '';

    this.modalContent.innerHTML = `
      <div style="padding: 2.25rem 2rem;">
        
        <div style="display: flex; gap: 1.5rem; align-items: flex-start; margin-bottom: 1.5rem; flex-wrap: wrap;">
          <div style="width: 84px; height: 84px; border-radius: var(--radius-md); overflow: hidden; border: 2px solid var(--border-gold); flex-shrink: 0; background: #FAF7F2;">
            <img src="${f.imageSrc}" alt="${f.name}" style="width: 100%; height: 100%; object-fit: cover;">
          </div>
          <div style="flex-grow: 1;">
            <div style="font-family: var(--font-mono); font-size: 0.78125rem; color: var(--color-champagne-gold-dark); text-transform: uppercase; font-weight: 700;">
              ${f.departmentLabel} • ${f.sectionLabel}
            </div>
            <h2 style="font-family: var(--font-serif); font-size: 1.75rem; color: var(--color-deep-plum); margin: 0.25rem 0 0.35rem;">
              ${f.name}
            </h2>
            <div style="font-size: 0.95rem; font-weight: 700; color: var(--color-botanical-green-dark); margin-bottom: 0.5rem;">
              ${f.subject} (${f.teachingTrackLabel})
            </div>
            <div style="font-family: var(--font-mono); font-size: 0.8125rem; color: var(--text-muted);">
              ${f.qualification} • <strong style="color: var(--color-champagne-gold-dark);">${f.experience}</strong>
            </div>
          </div>
        </div>

        <div style="margin-bottom: 1.25rem;">
          ${statusBadge}
        </div>

        ${informalNote}

        <div style="margin-bottom: 1.5rem;">
          <h4 style="font-size: 0.9rem; text-transform: uppercase; color: var(--color-deep-plum); font-weight: 700; margin-bottom: 0.5rem;">
            Academic Biography &amp; Pedagogy
          </h4>
          <p style="font-size: 0.9375rem; color: var(--text-secondary); line-height: 1.7;">
            ${f.biography}
          </p>
        </div>

        <div style="margin-bottom: 1.5rem;">
          <h4 style="font-size: 0.9rem; text-transform: uppercase; color: var(--color-deep-plum); font-weight: 700; margin-bottom: 0.5rem;">
            Teaching Specialization &amp; Focus Areas
          </h4>
          <p style="font-size: 0.9rem; color: var(--color-deep-plum); background: rgba(73,59,76,0.04); padding: 0.75rem 1rem; border-radius: var(--radius-md); border-left: 3px solid var(--color-botanical-green);">
            ${f.specialization}
          </p>
        </div>

        <div style="margin-bottom: 1.75rem;">
          <h4 style="font-size: 0.9rem; text-transform: uppercase; color: var(--color-deep-plum); font-weight: 700; margin-bottom: 0.75rem;">
            Full Syllabus Modules &amp; Chapters Covered
          </h4>
          <ul style="list-style: none; padding: 0; margin: 0; display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 0.6rem;">
            ${(f.topicsTaught || []).map(t => `
              <li style="font-size: 0.85rem; color: var(--text-secondary); display: flex; align-items: center; gap: 0.5rem; background: rgba(247,243,233,0.7); padding: 0.5rem 0.75rem; border-radius: var(--radius-sm); border: 1px solid rgba(214,183,122,0.3);">
                <span style="color: var(--color-champagne-gold-dark);">✓</span> ${t}
              </li>
            `).join('')}
          </ul>
        </div>

        <div style="background: rgba(73,59,76,0.03); padding: 1.25rem; border-radius: var(--radius-lg); border: 1px solid var(--border-gold); margin-bottom: 1.75rem;">
          <div style="font-size: 0.85rem; font-weight: 700; color: var(--color-deep-plum); margin-bottom: 0.35rem; display: flex; align-items: center; gap: 0.4rem;">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
            Campus Base &amp; Student Advisory Pods
          </div>
          <div style="font-size: 0.875rem; color: var(--text-secondary); line-height: 1.6;">
            <strong>Primary Campus:</strong> ${f.campus} (${f.cityLabel})<br>
            <strong>Doubt Clearing Hours:</strong> Daily 06:45 PM – 08:30 PM (Evening Supervised Study)<br>
            <strong>Parent Consultations:</strong> Scheduled via Central Directorate Office.
          </div>
        </div>

        <!-- Privacy & Contact Note -->
        <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem; padding-top: 1.25rem; border-top: 1px solid rgba(73,59,76,0.1);">
          <div style="font-size: 0.75rem; color: var(--text-muted); max-width: 340px;">
            🔒 Personal phone numbers and private emails are restricted to safeguard faculty privacy.
          </div>
          <a href="admissions.html?faculty=${encodeURIComponent(f.name)}" class="btn btn-gold btn-sm">
            <span>Enquire for this Faculty's Batches →</span>
          </a>
        </div>

      </div>
    `;

    this.modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  closeModal() {
    if (!this.modalOverlay) return;
    this.modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }
}
