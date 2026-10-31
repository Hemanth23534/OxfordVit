/**
 * OXFORD VIT – THE LIVING CAMPUS EXPERIENCE
 * Interactive Regional & Spatial Campus Map Engine
 * Visualizes the 3 primary geographical hubs:
 * - Narasaraopet Headquarters (6 Locations)
 * - Guntur Competitive Hub (3 Centers)
 * - Bapatla Coastal Branch (1 Branch)
 */

export class InteractiveCampusMap {
  constructor(containerId = 'interactive-campus-map') {
    this.container = document.getElementById(containerId);
    if (!this.container) return;

    this.currentCity = 'all';
    this.activeCampusId = 'yashoda-bhavan';

    this.campuses = [
      {
        id: 'yashoda-bhavan',
        name: 'Yashoda Bhavan — Main Campus',
        shortName: 'Yashoda Bhavan',
        city: 'Narasaraopet',
        hub: 'narasaraopet',
        address: 'Opposite Kamma Hostel & Indian Petrol Bunk, Ravipadu Road, Reddy Nagar, Narasaraopet - 522601',
        type: 'Main Academic Campus & Girls Residential Sanctuary',
        focus: 'Intermediate MPC, BiPC, Integrated NEET & JEE',
        phone: '+91 92467 64999',
        imageType: 'verified', // 'verified' or 'illustration'
        imageTypeLabel: 'Verified Campus Photograph',
        thumbnail: 'assets/images/campuses/yashoda-bhavan.svg',
        mapCoords: { x: 230, y: 195 },
        hubCenter: { x: 220, y: 220 }
      },
      {
        id: 'balaji-bhavan',
        name: 'Balaji Bhavan — Inter Sections',
        shortName: 'Balaji Bhavan',
        city: 'Narasaraopet',
        hub: 'narasaraopet',
        address: '62VJ+P63, Palnadu Road, Reddy Nagar, Ravipadu, Narasaraopet - 522601',
        type: 'Senior & Junior Intermediate Residential Wing',
        focus: 'Super-60 IIT-JEE & AP EAPCET Stream',
        phone: '+91 92467 64999',
        imageType: 'verified',
        imageTypeLabel: 'Verified Campus Photograph',
        thumbnail: 'assets/images/campuses/balaji-bhavan.svg',
        mapCoords: { x: 195, y: 165 },
        hubCenter: { x: 220, y: 220 }
      },
      {
        id: 'raman-bhavan',
        name: 'Raman Bhavan — Senior IIT Super Wing',
        shortName: 'Raman Bhavan',
        city: 'Narasaraopet',
        hub: 'narasaraopet',
        address: 'Reddy Nagar / Ravipadu Road, Narasaraopet - 522601',
        type: 'Senior IIT-JEE Super Wing & 150+ CBT Lab',
        focus: 'Advanced Physics & National Olympiads',
        phone: '+91 77991 37799',
        imageType: 'verified',
        imageTypeLabel: 'Verified Campus Photograph',
        thumbnail: 'assets/images/campuses/raman-bhavan.svg',
        mapCoords: { x: 255, y: 235 },
        hubCenter: { x: 220, y: 220 }
      },
      {
        id: 'ksr-towers',
        name: 'KSR Towers — Administrative Archive',
        shortName: 'KSR Towers',
        city: 'Narasaraopet',
        hub: 'narasaraopet',
        address: 'Arundelpet / Town Center, Narasaraopet - 522601',
        type: 'Historical Campus & KSR Trust Headquarters',
        focus: 'Directorate, Admissions Bureau, Merit Scholarships',
        phone: '+91 92467 64999',
        imageType: 'verified',
        imageTypeLabel: 'Verified Heritage Archive',
        thumbnail: 'assets/images/campuses/ksr-towers.svg',
        mapCoords: { x: 280, y: 190 },
        hubCenter: { x: 220, y: 220 }
      },
      {
        id: 'vit-olympiad-school',
        name: 'VIT Olympiad School',
        shortName: 'VIT Olympiad',
        city: 'Narasaraopet',
        hub: 'narasaraopet',
        address: 'Old Samithi Office Road, Ramireddypet, Narasaraopet - 522601',
        type: 'Competitive Olympiad & High School Wing',
        focus: 'Mathematical Olympiads, NTSE, Early STEM',
        phone: '+91 92467 64999',
        imageType: 'illustration',
        imageTypeLabel: 'Architectural Illustration',
        thumbnail: 'assets/images/campuses/vit-olympiad-school.svg',
        mapCoords: { x: 175, y: 235 },
        hubCenter: { x: 220, y: 220 }
      },
      {
        id: 'oxford-iit-school',
        name: 'Oxford IIT Concept School',
        shortName: 'Oxford IIT School',
        city: 'Narasaraopet',
        hub: 'narasaraopet',
        address: 'D.No. 12-9-7/6, Near Rickshaw Centre, Prakash Nagar, Narasaraopet - 522601',
        type: 'Concept School & IIT Foundation Wing',
        focus: 'Grades 6–10 Advanced IIT Foundation Pedagogy',
        phone: '+91 77991 37799',
        imageType: 'illustration',
        imageTypeLabel: 'Architectural Illustration',
        thumbnail: 'assets/images/campuses/oxford-iit-school.svg',
        mapCoords: { x: 235, y: 270 },
        hubCenter: { x: 220, y: 220 }
      },
      {
        id: 'guntur-balaji-tower',
        name: 'Balaji Tower Campus — Guntur',
        shortName: 'Balaji Tower (GNT)',
        city: 'Guntur',
        hub: 'guntur',
        address: '8th Lane Extension, Behind Reddy Girls Hostel, Syamala Nagar, Guntur - 522006',
        type: 'Competitive Day & Residential Academy',
        focus: 'IIT-JEE Super-60 & AIIMS Medical Stream',
        phone: '+91 92467 64999',
        imageType: 'verified',
        imageTypeLabel: 'Verified Campus Facility',
        thumbnail: 'assets/images/campuses/guntur-balaji-tower.svg',
        mapCoords: { x: 575, y: 135 },
        hubCenter: { x: 600, y: 160 }
      },
      {
        id: 'guntur-vasavi-tower',
        name: 'Vasavi Tower Girls Campus — Guntur',
        shortName: 'Vasavi Tower (GNT)',
        city: 'Guntur',
        hub: 'guntur',
        address: 'Vasavi Nagar / Pattabhipuram Main Road, Guntur - 522006',
        type: 'Premier Girls Residential Academy',
        focus: 'BiPC NEET High-Yield Batch & MPC IIT Wing',
        phone: '+91 77991 37799',
        imageType: 'verified',
        imageTypeLabel: 'Verified Girls Sanctuary',
        thumbnail: 'assets/images/campuses/guntur-vasavi-tower.svg',
        mapCoords: { x: 625, y: 155 },
        hubCenter: { x: 600, y: 160 }
      },
      {
        id: 'guntur-vit-medical',
        name: 'VIT Medical Academy — Long-Term NEET',
        shortName: 'VIT Medical Academy',
        city: 'Guntur',
        hub: 'guntur',
        address: 'Near Hindu College / Brodipet, Guntur - 522002',
        type: 'Dedicated Long-Term Dropper & NEET Hub',
        focus: 'Intensive 720/720 Medical Entrance Coaching',
        phone: '+91 92467 64999',
        imageType: 'illustration',
        imageTypeLabel: 'Architectural Illustration',
        thumbnail: 'assets/images/campuses/guntur-vit-medical.svg',
        mapCoords: { x: 595, y: 195 },
        hubCenter: { x: 600, y: 160 }
      },
      {
        id: 'bapatla-branch',
        name: 'VIT Junior College — Bapatla Branch',
        shortName: 'Bapatla Branch',
        city: 'Bapatla',
        hub: 'bapatla',
        address: 'College Road, Near Railway Station, Bapatla Town - 522101',
        type: 'Coastal Regional Junior College Branch',
        focus: 'Intermediate MPC, BiPC & EAPCET Coaching',
        phone: '+91 92467 64999',
        imageType: 'illustration',
        imageTypeLabel: 'Regional Branch Illustration',
        thumbnail: 'assets/images/campuses/bapatla-branch.svg',
        mapCoords: { x: 650, y: 345 },
        hubCenter: { x: 650, y: 345 }
      }
    ];

    this.init();
  }

  init() {
    this.renderMapInterface();
    this.bindEvents();
    this.selectCampus(this.activeCampusId);
  }

  renderMapInterface() {
    this.container.innerHTML = `
      <div class="campus-map-spatial-wrapper">
        
        <!-- Controls Bar -->
        <div class="map-controls-header">
          <div class="map-city-tabs">
            <button class="map-tab-btn active" data-hub="all">
              <span class="tab-dot"></span>
              All 10 Campuses
            </button>
            <button class="map-tab-btn" data-hub="narasaraopet">
              <span class="tab-dot dot-nrt"></span>
              Narasaraopet Hub (6)
            </button>
            <button class="map-tab-btn" data-hub="guntur">
              <span class="tab-dot dot-gnt"></span>
              Guntur Hub (3)
            </button>
            <button class="map-tab-btn" data-hub="bapatla">
              <span class="tab-dot dot-bpt"></span>
              Bapatla Branch (1)
            </button>
          </div>

          <div class="map-legend">
            <span class="legend-item"><span class="legend-color verified"></span> Verified Photo</span>
            <span class="legend-item"><span class="legend-color illustration"></span> Architectural Illustration</span>
          </div>
        </div>

        <!-- Main Spatial Map & HUD Split -->
        <div class="map-viewport-grid">
          
          <!-- Interactive SVG Vector Map -->
          <div class="map-canvas-container" id="map-viewport">
            <svg viewBox="0 0 800 450" class="spatial-svg-map" id="spatial-svg" preserveAspectRatio="xMidYMid meet">
              <defs>
                <linearGradient id="transitGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="#D6B77A" stop-opacity="0.8"/>
                  <stop offset="50%" stop-color="#526B54" stop-opacity="0.6"/>
                  <stop offset="100%" stop-color="#D6B77A" stop-opacity="0.8"/>
                </linearGradient>
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur"/>
                  <feComposite in="SourceGraphic" in2="blur" operator="over"/>
                </filter>
              </defs>

              <!-- Regional Andhra Map Background Geometry -->
              <path class="map-region-contour" d="M 80,120 Q 200,60 400,90 T 720,110 Q 760,260 700,400 T 450,420 Q 250,380 120,320 Z" fill="rgba(247, 243, 233, 0.45)" stroke="rgba(214, 183, 122, 0.35)" stroke-width="1.5"/>

              <!-- Coastal Shoreline Contour (Bay of Bengal) -->
              <path class="map-coastline" d="M 680,80 Q 730,220 680,330 T 640,430" fill="none" stroke="rgba(78, 155, 143, 0.35)" stroke-width="2" stroke-dasharray="4 4"/>
              <text x="710" y="380" fill="rgba(78, 155, 143, 0.6)" font-family="monospace" font-size="10" transform="rotate(75, 710, 380)">BAY OF BENGAL</text>

              <!-- Golden Academic Transit Vectors Connecting Hubs -->
              <!-- Narasaraopet (220, 220) to Guntur (600, 160) -->
              <path class="transit-corridor-path" d="M 220,220 Q 410,170 600,160" fill="none" stroke="url(#transitGlow)" stroke-width="2.5" stroke-dasharray="6 6"/>
              <!-- Guntur (600, 160) to Bapatla (650, 345) -->
              <path class="transit-corridor-path" d="M 600,160 Q 640,250 650,345" fill="none" stroke="url(#transitGlow)" stroke-width="2.5" stroke-dasharray="6 6"/>
              <!-- Narasaraopet (220, 220) to Bapatla (650, 345) direct link -->
              <path class="transit-corridor-path" d="M 220,220 Q 420,310 650,345" fill="none" stroke="rgba(214, 183, 122, 0.25)" stroke-width="1.5" stroke-dasharray="3 3"/>

              <!-- Regional Hub Cluster Enclosures -->
              <!-- Narasaraopet Cluster Hub Circle -->
              <g class="hub-cluster-group hub-narasaraopet">
                <circle cx="225" cy="220" r="95" class="hub-boundary" fill="rgba(82, 107, 84, 0.05)" stroke="rgba(82, 107, 84, 0.25)" stroke-dasharray="3 3"/>
                <circle cx="225" cy="220" r="8" fill="rgba(82, 107, 84, 0.2)"/>
                <text x="140" y="115" class="hub-title-text">NARASARAOPET HEADQUARTERS</text>
                <text x="140" y="130" class="hub-subtitle-text">Founding Hub &bull; 6 Campuses</text>
              </g>

              <!-- Guntur Cluster Hub Circle -->
              <g class="hub-cluster-group hub-guntur">
                <circle cx="600" cy="160" r="65" class="hub-boundary" fill="rgba(214, 183, 122, 0.06)" stroke="rgba(214, 183, 122, 0.35)" stroke-dasharray="3 3"/>
                <circle cx="600" cy="160" r="8" fill="rgba(214, 183, 122, 0.2)"/>
                <text x="540" y="70" class="hub-title-text">GUNTUR HUB</text>
                <text x="540" y="85" class="hub-subtitle-text">Competitive &bull; 3 Centers</text>
              </g>

              <!-- Bapatla Cluster Hub Circle -->
              <g class="hub-cluster-group hub-bapatla">
                <circle cx="650" cy="345" r="45" class="hub-boundary" fill="rgba(233, 161, 140, 0.06)" stroke="rgba(233, 161, 140, 0.35)" stroke-dasharray="3 3"/>
                <circle cx="650" cy="345" r="6" fill="rgba(233, 161, 140, 0.2)"/>
                <text x="585" y="410" class="hub-title-text">BAPATLA BRANCH</text>
                <text x="585" y="423" class="hub-subtitle-text">Coastal Center &bull; 1 College</text>
              </g>

              <!-- Interactive Campus Pins (10 Pins) -->
              <g id="campus-pins-layer">
                ${this.campuses.map(c => `
                  <g class="map-pin-marker ${c.id === this.activeCampusId ? 'active' : ''}" data-campus="${c.id}" data-hub="${c.hub}" transform="translate(${c.mapCoords.x}, ${c.mapCoords.y})">
                    <circle class="pin-radar" r="14" fill="none" stroke="${c.imageType === 'verified' ? '#526B54' : '#D6B77A'}" stroke-width="1.5" opacity="0.6"/>
                    <circle class="pin-base" r="7" fill="${c.imageType === 'verified' ? '#526B54' : '#D6B77A'}" stroke="#ffffff" stroke-width="2"/>
                    <text class="pin-label" x="12" y="4">${c.shortName}</text>
                  </g>
                `).join('')}
              </g>
            </svg>

            <!-- Map Spatial Compass -->
            <div class="map-compass-badge">
              <span class="compass-n">N</span>
              <div class="compass-needle"></div>
            </div>

            <!-- Transit Legend Pill -->
            <div class="map-transit-pill">
              <span class="pulse-indicator"></span>
              Inter-Campus Transit Network: Narasaraopet ⇄ Guntur ⇄ Bapatla
            </div>
          </div>

          <!-- Dynamic Live HUD Detail Card -->
          <div class="map-hud-panel" id="map-hud-detail">
            <!-- Populated via selectCampus -->
          </div>

        </div>

      </div>
    `;
  }

  bindEvents() {
    // City filter tab buttons
    this.container.querySelectorAll('.map-tab-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        this.container.querySelectorAll('.map-tab-btn').forEach(b => b.classList.remove('active'));
        e.currentTarget.classList.add('active');
        const hub = e.currentTarget.getAttribute('data-hub');
        this.filterByHub(hub);
      });
    });

    // Campus pins
    this.container.querySelectorAll('.map-pin-marker').forEach(pin => {
      pin.addEventListener('click', (e) => {
        const campusId = e.currentTarget.getAttribute('data-campus');
        this.selectCampus(campusId);
      });

      pin.addEventListener('mouseenter', (e) => {
        const campusId = e.currentTarget.getAttribute('data-campus');
        this.highlightPin(campusId);
      });
    });
  }

  filterByHub(hub) {
    this.currentCity = hub;
    const pins = this.container.querySelectorAll('.map-pin-marker');
    const clusters = this.container.querySelectorAll('.hub-cluster-group');

    pins.forEach(pin => {
      const pinHub = pin.getAttribute('data-hub');
      if (hub === 'all' || pinHub === hub) {
        pin.style.opacity = '1';
        pin.style.pointerEvents = 'auto';
      } else {
        pin.style.opacity = '0.2';
        pin.style.pointerEvents = 'none';
      }
    });

    clusters.forEach(cluster => {
      if (hub === 'all') {
        cluster.style.opacity = '1';
      } else if (cluster.classList.contains(`hub-${hub}`)) {
        cluster.style.opacity = '1';
      } else {
        cluster.style.opacity = '0.25';
      }
    });

    // Automatically focus the first campus in that hub
    const firstInHub = this.campuses.find(c => hub === 'all' || c.hub === hub);
    if (firstInHub) {
      this.selectCampus(firstInHub.id);
    }
  }

  selectCampus(campusId) {
    this.activeCampusId = campusId;
    const campus = this.campuses.find(c => c.id === campusId);
    if (!campus) return;

    // Update active pin marker
    this.container.querySelectorAll('.map-pin-marker').forEach(pin => {
      pin.classList.toggle('active', pin.getAttribute('data-campus') === campusId);
    });

    // Render HUD Detail Card
    const hud = this.container.querySelector('#map-hud-detail');
    if (!hud) return;

    hud.innerHTML = `
      <div class="hud-card-inner">
        <div class="hud-header">
          <div class="hud-type-badge">${campus.city} Hub &bull; ${campus.type}</div>
          <span class="badge ${campus.imageType === 'verified' ? 'badge-botanical' : 'badge-gold'}">
            ${campus.imageType === 'verified' ? '✓ Verified Facility' : '🎨 Architectural Artwork'}
          </span>
        </div>

        <div class="hud-image-box">
          <img src="${campus.thumbnail}" alt="${campus.name}" class="hud-img" loading="lazy">
          <span class="hud-verification-tag">${campus.imageTypeLabel}</span>
        </div>

        <h3 class="hud-campus-title">${campus.name}</h3>

        <div class="hud-info-list">
          <div class="hud-info-row">
            <span class="hud-icon">📍</span>
            <span class="hud-text">${campus.address}</span>
          </div>
          <div class="hud-info-row">
            <span class="hud-icon">🎯</span>
            <span class="hud-text">${campus.focus}</span>
          </div>
          <div class="hud-info-row">
            <span class="hud-icon">📞</span>
            <span class="hud-text">${campus.phone}</span>
          </div>
        </div>

        <div class="hud-actions">
          <a href="campus-detail.html?campus=${campus.id}" class="btn btn-gold btn-sm" style="width: 100%; text-align: center; justify-content: center;">
            Explore Complete Campus Profile →
          </a>
        </div>
      </div>
    `;

    // Trigger subtle 3D camera pan if LivingCampus3D is present on window
    if (window.livingCampus3DInstance && typeof window.livingCampus3DInstance.focusCoordinates === 'function') {
      window.livingCampus3DInstance.focusCoordinates(campus.hub);
    }
  }

  highlightPin(campusId) {
    // Subtle hover state
    this.container.querySelectorAll('.map-pin-marker').forEach(pin => {
      if (pin.getAttribute('data-campus') === campusId) {
        pin.querySelector('.pin-radar')?.setAttribute('stroke-width', '2.5');
      } else {
        pin.querySelector('.pin-radar')?.setAttribute('stroke-width', '1.5');
      }
    });
  }
}
