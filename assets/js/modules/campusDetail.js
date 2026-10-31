/**
 * OXFORD VIT – THE LIVING CAMPUS EXPERIENCE
 * Master Campus Detail Engine
 * Dynamically displays all 15 institutional dimensions for any of the 10 campuses:
 * 1. Campus Name
 * 2. City
 * 3. Full Address
 * 4. Campus Type
 * 5. Educational Programmes
 * 6. Academic Focus
 * 7. Senior and Junior Sections
 * 8. Residential or Day-Scholar Facilities
 * 9. Infrastructure
 * 10. Faculty Assigned to the Campus
 * 11. Official Phone Numbers
 * 12. Location Map (Embed & Direction Link)
 * 13. Campus Photographs / Architectural SVG Gallery
 * 14. Campus Events
 * 15. Achievements
 */

import { campusesData, citiesData } from '../data/campusesData.js';

export class CampusDetailEngine {
  constructor() {
    this.container = document.getElementById('campus-detail-page');
    if (!this.container) return;

    this.init();
  }

  init() {
    // Read ?id= from URL parameter, fallback to yashoda-bhavan
    const params = new URLSearchParams(window.location.search);
    const initialId = params.get('id') || 'yashoda-bhavan';
    this.renderCampus(initialId, false);

    // Listen to browser navigation (back/forward)
    window.addEventListener('popstate', () => {
      const currentParams = new URLSearchParams(window.location.search);
      const campusId = currentParams.get('id') || 'yashoda-bhavan';
      this.renderCampus(campusId, false);
    });
  }

  renderCampus(campusId, updateHistory = true) {
    let campus = campusesData.find(c => c.id === campusId);
    if (!campus) {
      campus = campusesData[0]; // fallback
    }

    if (updateHistory) {
      const newUrl = `${window.location.pathname}?id=${campus.id}`;
      window.history.pushState({ id: campus.id }, '', newUrl);
    }

    // Update Document Title and Meta
    document.title = `${campus.name} | Oxford VIT Campuses & Locations`;

    // Compute previous and next campuses for quick browsing
    const currentIndex = campusesData.findIndex(c => c.id === campus.id);
    const prevCampus = campusesData[(currentIndex - 1 + campusesData.length) % campusesData.length];
    const nextCampus = campusesData[(currentIndex + 1) % campusesData.length];

    const isHistorical = campus.operationalStatus && campus.operationalStatus.includes('Historical');
    const isPending = campus.governanceStatus && campus.governanceStatus.includes('Pending Verification');

    const statusBadge = isHistorical
      ? `<span class="badge" style="background: rgba(73, 59, 76, 0.15); color: var(--color-deep-plum); border: 1.5px dashed var(--color-deep-plum);">🏛️ Historical Landmark / Archive</span>`
      : `<span class="badge badge-botanical">✓ Currently Operational Campus</span>`;

    const governanceBadge = isPending
      ? `<span class="badge" style="background: rgba(233, 161, 140, 0.25); color: #B34024; border: 1px solid var(--color-coral);">⚠️ Governance: Pending Registry Confirmation</span>`
      : `<span class="badge badge-gold">${campus.governanceStatus || 'Verified Governance'}</span>`;

    // Extract programmes and infrastructure (using aliases if necessary)
    const programmesList = campus.programmes || campus.courses || [];
    const infraList = campus.infrastructure || campus.facilities || [];
    const facultyList = campus.facultyAssigned || [];
    const eventsList = campus.events || [];
    const achievementsList = campus.achievements || [];
    const galleryList = campus.galleryImages || [campus.image || campus.imageSrc];

    this.container.innerHTML = `
      <!-- =========================================================================
           TOP SELECTOR STRIP: QUICK SWITCHER FOR ALL 10 CAMPUSES
           ========================================================================= -->
      <section class="campus-selector-strip" style="background: rgba(247, 243, 233, 0.95); border-bottom: 1px solid var(--border-gold); padding: 0.85rem 0; position: sticky; top: var(--header-height); z-index: 90; backdrop-filter: blur(12px);">
        <div class="container" style="display: flex; align-items: center; justify-content: space-between; gap: 1rem; flex-wrap: wrap;">
          <div style="display: flex; align-items: center; gap: 0.75rem;">
            <span style="font-size: 0.8rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: var(--color-deep-plum);">
              🏛️ Select Campus (10 Locations):
            </span>
            <select id="campus-dropdown-select" class="form-input" style="padding: 0.4rem 1.8rem 0.4rem 0.75rem; font-size: 0.85rem; border-color: var(--color-champagne-gold); border-radius: var(--radius-sm); font-weight: 600; color: var(--color-deep-plum); background-color: #fff; cursor: pointer;">
              <optgroup label="📍 Narasaraopet Hub (6 Locations)">
                <option value="yashoda-bhavan" ${campus.id === 'yashoda-bhavan' ? 'selected' : ''}>Yashoda Bhavan — Main Campus</option>
                <option value="balaji-bhavan" ${campus.id === 'balaji-bhavan' ? 'selected' : ''}>Balaji Bhavan — Senior &amp; Junior Sections</option>
                <option value="raman-bhavan" ${campus.id === 'raman-bhavan' ? 'selected' : ''}>Raman Bhavan — Senior IIT-JEE Super Wing</option>
                <option value="ksr-towers" ${campus.id === 'ksr-towers' ? 'selected' : ''}>KSR Towers — Historical Campus &amp; Trust</option>
                <option value="vit-olympiad-school" ${campus.id === 'vit-olympiad-school' ? 'selected' : ''}>VIT Olympiad School — Classes 6 to 10</option>
                <option value="oxford-iit-school" ${campus.id === 'oxford-iit-school' ? 'selected' : ''}>Oxford IIT School / Concept School</option>
              </optgroup>
              <optgroup label="📍 Guntur Hub (3 Locations)">
                <option value="guntur-balaji-tower" ${campus.id === 'guntur-balaji-tower' ? 'selected' : ''}>Balaji Tower — IIT-JEE &amp; Medical Academy</option>
                <option value="guntur-vasavi-tower" ${campus.id === 'guntur-vasavi-tower' ? 'selected' : ''}>Vasavi Tower — Girls Residential &amp; Day</option>
                <option value="guntur-vit-medical" ${campus.id === 'guntur-vit-medical' ? 'selected' : ''}>VIT Medical Academy — Long-Term NEET</option>
              </optgroup>
              <optgroup label="📍 Bapatla Hub (1 Location)">
                <option value="bapatla-branch" ${campus.id === 'bapatla-branch' ? 'selected' : ''}>VIT Junior College / Bapatla Branch</option>
              </optgroup>
            </select>
          </div>

          <div style="display: flex; align-items: center; gap: 0.5rem;">
            <button id="btn-prev-campus" class="btn btn-sm btn-outline" style="padding: 0.35rem 0.75rem; font-size: 0.8rem;" title="Previous Campus: ${prevCampus.name}">
              ← ${prevCampus.name.split('—')[0].trim()}
            </button>
            <a href="campuses.html" class="btn btn-sm btn-outline" style="padding: 0.35rem 0.75rem; font-size: 0.8rem;">
              Directory View
            </a>
            <button id="btn-next-campus" class="btn btn-sm btn-outline" style="padding: 0.35rem 0.75rem; font-size: 0.8rem;" title="Next Campus: ${nextCampus.name}">
              ${nextCampus.name.split('—')[0].trim()} →
            </button>
          </div>
        </div>
      </section>

      <!-- =========================================================================
           HERO & KEY DIMENSIONS SECTION
           ========================================================================= -->
      <section class="section" style="padding-top: 2.5rem; padding-bottom: 2.5rem;">
        <div class="container">
          <!-- Breadcrumb Navigation -->
          <nav aria-label="Breadcrumb" style="margin-bottom: 1.25rem; font-size: 0.875rem; color: var(--text-muted);">
            <a href="index.html" style="color: var(--color-botanical-green); text-decoration: none;">Home</a> / 
            <a href="campuses.html" style="color: var(--color-botanical-green); text-decoration: none;">All Campuses</a> / 
            <a href="${campus.cityPageUrl}" style="color: var(--color-botanical-green); text-decoration: none;">${campus.city} Hub</a> / 
            <span style="color: var(--color-deep-plum); font-weight: 600;">${campus.name}</span>
          </nav>

          <!-- Status & Categorization Badges -->
          <div style="display: flex; gap: 0.65rem; flex-wrap: wrap; align-items: center; margin-bottom: 1rem;">
            <span class="section-tag botanical" style="font-size: 0.75rem;">📍 ${campus.city} Hub (${campus.district})</span>
            <span class="section-tag gold" style="font-size: 0.75rem;">${campus.campusType}</span>
            ${statusBadge}
            ${governanceBadge}
          </div>

          <!-- Dimension 1: Campus Name -->
          <h1 class="section-title" style="text-align: left; font-size: clamp(2rem, 4.5vw, 3.25rem); margin-bottom: 0.75rem; line-height: 1.15; color: var(--color-deep-plum);">
            ${campus.name}
          </h1>

          <!-- Dimension 3: Full Address & Landmark Highlight -->
          <div style="display: flex; align-items: flex-start; gap: 0.65rem; color: var(--color-botanical-green-dark); font-size: 1.05rem; font-weight: 600; margin-bottom: 1.5rem; max-width: 900px; line-height: 1.5;">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="flex-shrink: 0; margin-top: 2px;">
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
            <div>
              <span>${campus.address}</span>
              <div style="font-size: 0.85rem; color: var(--text-secondary); font-weight: 500; margin-top: 2px;">
                Landmark Reference: <strong>${campus.landmark}</strong>
              </div>
            </div>
          </div>

          <!-- Quick Highlight Statistics Bar -->
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-bottom: 2.5rem;">
            <div class="glass-card" style="padding: 1.25rem; border-left: 3px solid var(--color-champagne-gold);">
              <div style="font-size: 0.75rem; text-transform: uppercase; color: var(--text-muted); font-weight: 700;">Campus Type</div>
              <div style="font-size: 0.95rem; font-weight: 700; color: var(--color-deep-plum); margin-top: 4px;">${campus.categoryLabel}</div>
              <div style="font-size: 0.75rem; color: var(--color-botanical-green); font-weight: 600; margin-top: 2px;">${campus.operationalStatus}</div>
            </div>

            <div class="glass-card" style="padding: 1.25rem; border-left: 3px solid var(--color-botanical-green);">
              <div style="font-size: 0.75rem; text-transform: uppercase; color: var(--text-muted); font-weight: 700;">Academic Sections</div>
              <div style="font-size: 0.95rem; font-weight: 700; color: var(--color-deep-plum); margin-top: 4px;">Senior &amp; Junior Wings</div>
              <div style="font-size: 0.75rem; color: var(--text-secondary); margin-top: 2px;">Intermediate &amp; Foundation</div>
            </div>

            <div class="glass-card" style="padding: 1.25rem; border-left: 3px solid var(--color-coral);">
              <div style="font-size: 0.75rem; text-transform: uppercase; color: var(--text-muted); font-weight: 700;">Residence Type</div>
              <div style="font-size: 0.95rem; font-weight: 700; color: var(--color-deep-plum); margin-top: 4px;">
                ${campus.residentialFacilities.includes('Residential') ? 'Residential &amp; Day-Scholar' : 'Day-Scholar Transit'}
              </div>
              <div style="font-size: 0.75rem; color: var(--text-secondary); margin-top: 2px;">24/7 Wardens &amp; CCTV</div>
            </div>

            <div class="glass-card" style="padding: 1.25rem; border-left: 3px solid var(--color-lavender);">
              <div style="font-size: 0.75rem; text-transform: uppercase; color: var(--text-muted); font-weight: 700;">Official Campus Line</div>
              <div style="font-size: 0.95rem; font-weight: 700; color: var(--color-deep-plum); margin-top: 4px;">
                <a href="tel:${campus.phone.replace(/[^0-9+]/g, '').slice(0, 13)}" style="color: var(--color-deep-plum); text-decoration: none;">
                  ${campus.phone.split('(')[0].trim()}
                </a>
              </div>
              <div style="font-size: 0.75rem; color: var(--color-champagne-gold-dark); font-weight: 600; margin-top: 2px;">Central Admissions Bureau</div>
            </div>
          </div>

          <!-- =========================================================================
               DIMENSION 13: VISUAL SHOWCASE / ARCHITECTURAL ARTWORK & GALLERY
               ========================================================================= -->
          <div class="glass-card" style="padding: 1.5rem; margin-bottom: 3.5rem; border: 1.5px solid var(--border-gold);">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; flex-wrap: wrap; gap: 0.5rem;">
              <div>
                <span class="section-tag gold" style="font-size: 0.7rem;">Dimension 13</span>
                <h3 style="font-size: 1.35rem; color: var(--color-deep-plum); margin-top: 0.25rem;">
                  Architectural Artwork &amp; Campus Visual Showcase
                </h3>
              </div>
              <div style="display: flex; gap: 0.5rem;">
                <a href="${campus.mapUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-outline">
                  📍 Open in Google Maps ↗
                </a>
                <a href="admissions.html" class="btn btn-sm btn-gold">
                  Schedule Campus Visit
                </a>
              </div>
            </div>

            <!-- Featured Image Display -->
            <div style="position: relative; border-radius: var(--radius-lg); overflow: hidden; border: 1px solid var(--border-gold); background: #FAF7F2; text-align: center; max-height: 480px; display: flex; align-items: center; justify-content: center; margin-bottom: 1rem;">
              <img id="campus-featured-img" src="${campus.imageSrc || campus.image || 'assets/images/campuses/campus-placeholder.svg'}" alt="${campus.name}" style="width: 100%; height: auto; max-height: 480px; object-fit: contain; display: block;" onerror="this.onerror=null; this.src='assets/images/campuses/campus-placeholder.svg';" />
              <div style="position: absolute; bottom: 12px; left: 16px; background: rgba(73, 59, 76, 0.85); color: #fff; padding: 6px 14px; border-radius: var(--radius-sm); font-size: 0.8rem; backdrop-filter: blur(8px);">
                🏛️ ${campus.name} — ${campus.city}
              </div>
            </div>

            <!-- Gallery Thumbnails Strip -->
            <div style="display: flex; gap: 0.75rem; overflow-x: auto; padding-bottom: 0.5rem;">
              ${galleryList.map((img, idx) => `
                <div class="gallery-thumb-item ${idx === 0 ? 'active' : ''}" data-src="${img}" style="width: 110px; height: 75px; flex-shrink: 0; border-radius: var(--radius-sm); overflow: hidden; border: 2px solid ${idx === 0 ? 'var(--color-champagne-gold)' : 'var(--border-gold)'}; cursor: pointer; transition: transform 0.2s ease, border-color 0.2s ease; background: #fff;">
                  <img src="${img}" alt="Thumbnail ${idx + 1}" style="width: 100%; height: 100%; object-fit: cover;" onerror="this.onerror=null; this.src='assets/images/campuses/campus-placeholder.svg';" />
                </div>
              `).join('')}
            </div>
          </div>

          <!-- =========================================================================
               DETAILED 15-DIMENSION SPECIFICATION CARDS
               ========================================================================= -->
          <div style="display: grid; grid-template-columns: 1.25fr 1fr; gap: 2rem; margin-bottom: 3.5rem;">
            
            <!-- LEFT COLUMN: ACADEMICS, PROGRAMMES, SECTIONS, FOCUS -->
            <div style="display: flex; flex-direction: column; gap: 2rem;">
              
              <!-- Dimension 5: Educational Programmes -->
              <div class="glass-card" style="padding: 2rem;">
                <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1rem;">
                  <span class="section-tag gold" style="font-size: 0.7rem;">Dimension 5</span>
                  <h3 style="font-size: 1.35rem; color: var(--color-deep-plum);">Educational Programmes Offered</h3>
                </div>
                <div style="display: flex; flex-direction: column; gap: 0.85rem;">
                  ${programmesList.map(prog => `
                    <div style="display: flex; align-items: flex-start; gap: 0.75rem; background: rgba(247, 243, 233, 0.7); padding: 0.85rem 1rem; border-radius: var(--radius-md); border-left: 3px solid var(--color-champagne-gold);">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-champagne-gold-dark)" stroke-width="2.5" style="flex-shrink: 0; margin-top: 2px;">
                        <circle cx="12" cy="12" r="10"/>
                        <path d="m9 12 2 2 4-4"/>
                      </svg>
                      <div style="font-weight: 700; color: var(--color-deep-plum); font-size: 0.95rem;">
                        ${prog}
                      </div>
                    </div>
                  `).join('')}
                </div>
              </div>

              <!-- Dimension 6: Academic Focus -->
              <div class="glass-card" style="padding: 2rem;">
                <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1rem;">
                  <span class="section-tag botanical" style="font-size: 0.7rem;">Dimension 6</span>
                  <h3 style="font-size: 1.35rem; color: var(--color-deep-plum);">Academic Focus &amp; Pedagogy</h3>
                </div>
                <p style="font-size: 1rem; color: var(--text-secondary); line-height: 1.7; margin-bottom: 1rem;">
                  ${campus.academicFocus}
                </p>
                <div style="background: rgba(82, 107, 84, 0.08); padding: 1rem 1.25rem; border-radius: var(--radius-md); border-left: 3px solid var(--color-botanical-green);">
                  <div style="font-size: 0.8rem; font-weight: 700; text-transform: uppercase; color: var(--color-botanical-green-dark); margin-bottom: 4px;">
                    Pedagogical Architecture
                  </div>
                  <div style="font-size: 0.875rem; color: var(--text-primary); line-height: 1.5;">
                    • 3-Tier Concept Deconstruction (Foundation, Application, Advanced Mastery)<br>
                    • Daily Evening Doubt-Resolution Clinics with Senior Subject Mentors<br>
                    • Weekly Computer-Based Mock Examinations benchmarked against NTA standards
                  </div>
                </div>
              </div>

              <!-- Dimension 7: Senior & Junior Sections -->
              <div class="glass-card" style="padding: 2rem;">
                <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1rem;">
                  <span class="section-tag gold" style="font-size: 0.7rem;">Dimension 7</span>
                  <h3 style="font-size: 1.35rem; color: var(--color-deep-plum);">Senior &amp; Junior Sections</h3>
                </div>
                <div style="background: rgba(247, 243, 233, 0.8); padding: 1.25rem; border-radius: var(--radius-md); border: 1px solid var(--border-gold); margin-bottom: 1rem;">
                  <div style="font-weight: 700; color: var(--color-deep-plum); margin-bottom: 0.35rem; font-size: 1.05rem;">
                    Cohort Organization &amp; Distribution
                  </div>
                  <p style="font-size: 0.95rem; color: var(--text-secondary); line-height: 1.6; margin: 0;">
                    ${campus.sections}
                  </p>
                </div>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                  <div style="padding: 1rem; background: #fff; border-radius: var(--radius-sm); border: 1px solid var(--border-gold);">
                    <div style="font-size: 0.75rem; text-transform: uppercase; color: var(--text-muted); font-weight: 700;">Junior Section</div>
                    <div style="font-weight: 700; color: var(--color-deep-plum); margin-top: 4px;">1st Year Intermediate</div>
                    <div style="font-size: 0.8rem; color: var(--text-secondary); margin-top: 2px;">Fundamental concept building &amp; board syllabus coverage.</div>
                  </div>
                  <div style="padding: 1rem; background: #fff; border-radius: var(--radius-sm); border: 1px solid var(--border-gold);">
                    <div style="font-size: 0.75rem; text-transform: uppercase; color: var(--text-muted); font-weight: 700;">Senior Section</div>
                    <div style="font-weight: 700; color: var(--color-deep-plum); margin-top: 4px;">2nd Year Intermediate</div>
                    <div style="font-size: 0.8rem; color: var(--text-secondary); margin-top: 2px;">Advanced problem drills, full-length test series &amp; rank push.</div>
                  </div>
                </div>
              </div>

              <!-- Dimension 8: Residential or Day-Scholar Facilities -->
              <div class="glass-card" style="padding: 2rem;">
                <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1rem;">
                  <span class="section-tag botanical" style="font-size: 0.7rem;">Dimension 8</span>
                  <h3 style="font-size: 1.35rem; color: var(--color-deep-plum);">Residential &amp; Day-Scholar Facilities</h3>
                </div>
                <p style="font-size: 0.975rem; color: var(--text-secondary); line-height: 1.65; margin-bottom: 1.25rem;">
                  ${campus.residentialFacilities}
                </p>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 0.75rem;">
                  <div style="display: flex; align-items: center; gap: 0.5rem; font-size: 0.85rem; color: var(--color-deep-plum); font-weight: 600;">
                    <span style="color: var(--color-botanical-green);">✓</span> 24/7 Security &amp; CCTV
                  </div>
                  <div style="display: flex; align-items: center; gap: 0.5rem; font-size: 0.85rem; color: var(--color-deep-plum); font-weight: 600;">
                    <span style="color: var(--color-botanical-green);">✓</span> Pure Vegetarian Dining
                  </div>
                  <div style="display: flex; align-items: center; gap: 0.5rem; font-size: 0.85rem; color: var(--color-deep-plum); font-weight: 600;">
                    <span style="color: var(--color-botanical-green);">✓</span> Resident Faculty Mentors
                  </div>
                  <div style="display: flex; align-items: center; gap: 0.5rem; font-size: 0.85rem; color: var(--color-deep-plum); font-weight: 600;">
                    <span style="color: var(--color-botanical-green);">✓</span> GPS Tracked Transit Fleet
                  </div>
                </div>
              </div>

            </div>

            <!-- RIGHT COLUMN: INFRASTRUCTURE, FACULTY, PHONE, MAP, EVENTS, ACHIEVEMENTS -->
            <div style="display: flex; flex-direction: column; gap: 2rem;">
              
              <!-- Dimension 9: Infrastructure -->
              <div class="glass-card" style="padding: 2rem;">
                <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1rem;">
                  <span class="section-tag gold" style="font-size: 0.7rem;">Dimension 9</span>
                  <h3 style="font-size: 1.35rem; color: var(--color-deep-plum);">Campus Infrastructure &amp; Laboratories</h3>
                </div>
                <div style="display: flex; flex-direction: column; gap: 0.75rem;">
                  ${infraList.map(item => `
                    <div style="display: flex; align-items: flex-start; gap: 0.65rem; font-size: 0.9rem; line-height: 1.5; color: var(--text-primary);">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-botanical-green)" stroke-width="2.5" style="flex-shrink: 0; margin-top: 3px;">
                        <path d="M20 6 9 17l-5-5"/>
                      </svg>
                      <div>${item}</div>
                    </div>
                  `).join('')}
                </div>
              </div>

              <!-- Dimension 10: Faculty Assigned to the Campus -->
              <div class="glass-card" style="padding: 2rem;">
                <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1rem; flex-wrap: wrap; gap: 0.5rem;">
                  <div style="display: flex; align-items: center; gap: 0.5rem;">
                    <span class="section-tag botanical" style="font-size: 0.7rem;">Dimension 10</span>
                    <h3 style="font-size: 1.35rem; color: var(--color-deep-plum);">Faculty Assigned to this Campus</h3>
                  </div>
                  <a href="faculty.html" class="btn btn-sm btn-outline" style="font-size: 0.75rem; padding: 0.25rem 0.65rem;">
                    Full Directory →
                  </a>
                </div>
                <div style="display: flex; flex-direction: column; gap: 0.65rem; margin-bottom: 1.25rem;">
                  ${facultyList.map(fac => `
                    <div style="padding: 0.75rem 1rem; background: rgba(247, 243, 233, 0.7); border-radius: var(--radius-sm); border-left: 3px solid var(--color-botanical-green); display: flex; justify-content: space-between; align-items: center;">
                      <div>
                        <div style="font-weight: 700; color: var(--color-deep-plum); font-size: 0.9rem;">${fac}</div>
                        <div style="font-size: 0.775rem; color: var(--text-muted);">Assigned Teaching Division</div>
                      </div>
                      <a href="faculty.html" style="font-size: 0.75rem; color: var(--color-champagne-gold-dark); font-weight: 700; text-decoration: none;">
                        Profile ↗
                      </a>
                    </div>
                  `).join('')}
                </div>
                <p style="font-size: 0.8rem; color: var(--text-muted); margin: 0; line-height: 1.4;">
                  Note: Resident and visiting senior faculty rotate periodically across sections to ensure uniform excellence across all Oxford VIT campuses.
                </p>
              </div>

              <!-- Dimension 11 & 12: Official Phone Numbers & Location Map -->
              <div class="glass-card" style="padding: 2rem; border: 1.5px solid var(--color-champagne-gold);">
                <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1rem;">
                  <span class="section-tag gold" style="font-size: 0.7rem;">Dimensions 11 &amp; 12</span>
                  <h3 style="font-size: 1.35rem; color: var(--color-deep-plum);">Official Helplines &amp; Location Map</h3>
                </div>

                <!-- Phone Line -->
                <div style="margin-bottom: 1.25rem; background: rgba(214, 183, 122, 0.12); padding: 1rem; border-radius: var(--radius-md); border-left: 3px solid var(--color-champagne-gold);">
                  <div style="font-size: 0.75rem; text-transform: uppercase; color: var(--text-muted); font-weight: 700;">Authorized Contact Numbers</div>
                  <div style="font-size: 1.15rem; font-weight: 800; color: var(--color-deep-plum); margin-top: 4px;">
                    ${campus.phone}
                  </div>
                  <div style="display: flex; gap: 0.5rem; margin-top: 0.75rem; flex-wrap: wrap;">
                    <a href="tel:+919246764999" class="btn btn-sm btn-gold" style="font-size: 0.8rem;">
                      📞 Call Central Desk
                    </a>
                    <a href="tel:+917799137799" class="btn btn-sm btn-outline" style="font-size: 0.8rem;">
                      📞 Alternative Line
                    </a>
                  </div>
                </div>

                <!-- Location Map Embed View -->
                <div>
                  <div style="font-size: 0.8rem; font-weight: 700; color: var(--color-deep-plum); margin-bottom: 0.5rem;">
                    Geographical Coordinate &amp; Direction Navigator:
                  </div>
                  <div style="height: 220px; border-radius: var(--radius-md); overflow: hidden; border: 1px solid var(--border-gold); background: #EFE9DC; position: relative;">
                    <iframe
                      title="Map View: ${campus.name}"
                      width="100%"
                      height="100%"
                      style="border:0;"
                      loading="lazy"
                      allowfullscreen
                      src="https://maps.google.com/maps?q=${encodeURIComponent(campus.address)}&t=&z=15&ie=UTF8&iwloc=&output=embed">
                    </iframe>
                  </div>
                  <div style="margin-top: 0.75rem; text-align: right;">
                    <a href="${campus.mapUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-outline" style="width: 100%; text-align: center; justify-content: center;">
                      Open Full Google Maps App ↗
                    </a>
                  </div>
                </div>
              </div>

              <!-- Dimension 14: Campus Events -->
              <div class="glass-card" style="padding: 2rem;">
                <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1rem;">
                  <span class="section-tag botanical" style="font-size: 0.7rem;">Dimension 14</span>
                  <h3 style="font-size: 1.35rem; color: var(--color-deep-plum);">Campus Events &amp; Traditions</h3>
                </div>
                <div style="display: flex; flex-direction: column; gap: 0.75rem;">
                  ${eventsList.map(evt => `
                    <div style="display: flex; align-items: center; gap: 0.65rem; font-size: 0.9rem; color: var(--color-deep-plum); font-weight: 600;">
                      <span style="color: var(--color-champagne-gold-dark);">★</span>
                      ${evt}
                    </div>
                  `).join('')}
                </div>
              </div>

              <!-- Dimension 15: Achievements -->
              <div class="glass-card" style="padding: 2rem; background: linear-gradient(135deg, rgba(247, 243, 233, 0.9), rgba(214, 183, 122, 0.15)); border: 1.5px solid var(--color-champagne-gold);">
                <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1rem; flex-wrap: wrap; gap: 0.5rem;">
                  <div style="display: flex; align-items: center; gap: 0.5rem;">
                    <span class="section-tag gold" style="font-size: 0.7rem;">Dimension 15</span>
                    <h3 style="font-size: 1.35rem; color: var(--color-deep-plum);">Verified Achievements &amp; Records</h3>
                  </div>
                  <a href="achievements.html" class="btn btn-sm btn-gold" style="font-size: 0.75rem; padding: 0.25rem 0.65rem;">
                    Hall of Fame →
                  </a>
                </div>
                <div style="display: flex; flex-direction: column; gap: 0.75rem;">
                  ${achievementsList.map(ach => `
                    <div style="display: flex; align-items: flex-start; gap: 0.65rem; font-size: 0.9rem; line-height: 1.5; color: var(--text-primary);">
                      <span style="font-size: 1.1rem; line-height: 1;">🏆</span>
                      <div style="font-weight: 600;">${ach}</div>
                    </div>
                  `).join('')}
                </div>
              </div>

            </div>

          </div>

          <!-- =========================================================================
               OTHER CAMPUSES IN OXFORD VIT NETWORK
               ========================================================================= -->
          <div style="border-top: 2px solid var(--border-gold); padding-top: 3rem; margin-bottom: 2rem;">
            <div style="text-align: center; max-width: 700px; margin: 0 auto 2.5rem;">
              <span class="section-tag gold">Multi-Campus Navigation</span>
              <h2 style="font-size: 2rem; color: var(--color-deep-plum); margin-top: 0.5rem; margin-bottom: 0.5rem;">
                Explore Other Oxford VIT Campuses
              </h2>
              <p style="color: var(--text-secondary); font-size: 0.95rem;">
                One unified educational institution spanning Narasaraopet, Guntur, and Bapatla. Click any campus to inspect its detailed specifications.
              </p>
            </div>

            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1.5rem;">
              ${campusesData.filter(c => c.id !== campus.id).slice(0, 4).map(other => `
                <div class="glass-card" style="padding: 1.5rem; display: flex; flex-direction: column; justify-content: space-between; border-top: 3px solid var(--color-champagne-gold);">
                  <div>
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
                      <span class="section-tag botanical" style="font-size: 0.65rem; padding: 2px 6px;">${other.city} Hub</span>
                      <span style="font-size: 0.75rem; color: var(--text-muted); font-weight: 600;">${other.categoryLabel.split('(')[0].trim()}</span>
                    </div>
                    <h4 style="font-size: 1.1rem; color: var(--color-deep-plum); margin-bottom: 0.5rem;">${other.name}</h4>
                    <p style="font-size: 0.8rem; color: var(--text-secondary); line-height: 1.5; margin-bottom: 1rem;">
                      ${other.address.split(',')[0]}...
                    </p>
                  </div>
                  <button class="btn btn-sm btn-outline switch-campus-btn" data-id="${other.id}" style="width: 100%; text-align: center; justify-content: center;">
                    Inspect Campus →
                  </button>
                </div>
              `).join('')}
            </div>
          </div>

        </div>
      </section>
    `;

    // Re-bind interactive events
    this.bindEvents(campus);

    // Scroll to top of campus view smoothly if rendered dynamically
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  bindEvents(currentCampus) {
    // Dropdown change
    const dropdown = document.getElementById('campus-dropdown-select');
    if (dropdown) {
      dropdown.addEventListener('change', (e) => {
        this.renderCampus(e.target.value);
      });
    }

    // Prev / Next campus buttons
    const prevBtn = document.getElementById('btn-prev-campus');
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        const currentIndex = campusesData.findIndex(c => c.id === currentCampus.id);
        const prevCampus = campusesData[(currentIndex - 1 + campusesData.length) % campusesData.length];
        this.renderCampus(prevCampus.id);
      });
    }

    const nextBtn = document.getElementById('btn-next-campus');
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        const currentIndex = campusesData.findIndex(c => c.id === currentCampus.id);
        const nextCampus = campusesData[(currentIndex + 1) % campusesData.length];
        this.renderCampus(nextCampus.id);
      });
    }

    // Other campus grid buttons
    this.container.querySelectorAll('.switch-campus-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.getAttribute('data-id');
        if (id) this.renderCampus(id);
      });
    });

    // Gallery Thumbnail Switching
    const featuredImg = document.getElementById('campus-featured-img');
    const thumbnails = this.container.querySelectorAll('.gallery-thumb-item');
    thumbnails.forEach(thumb => {
      thumb.addEventListener('click', (e) => {
        thumbnails.forEach(t => {
          t.classList.remove('active');
          t.style.borderColor = 'var(--border-gold)';
        });
        const target = e.currentTarget;
        target.classList.add('active');
        target.style.borderColor = 'var(--color-champagne-gold)';
        const src = target.getAttribute('data-src');
        if (featuredImg && src) {
          featuredImg.style.opacity = '0.3';
          setTimeout(() => {
            featuredImg.src = src;
            featuredImg.style.opacity = '1';
          }, 150);
        }
      });
    });
  }
}
