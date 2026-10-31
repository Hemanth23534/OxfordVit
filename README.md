# OXFORD VIT – THE LIVING CAMPUS EXPERIENCE
### Oxford VIT Junior College & Academy • Narasaraopet

> **Headquarters / Main Campus:** Opposite Kamma Hostel, Ravipadu Road, Narasaraopet, Palnadu District, Andhra Pradesh, India.  
> **Under the Patronage of:** KSR Charitable Trust  
> **Leadership:** K. Sambasiva Rao (KSR, Administrative Director) & Panadi Raghava (Academic Director, `@raghava_vit`)

---

## 🏛️ Project Architecture & Purpose

This project is the centralized institutional web platform representing the entire **Oxford VIT** ecosystem and its network of six verified Bhavans across Narasaraopet, Andhra Pradesh.

Built purely in accordance with modern creative web engineering principles:
- **No React, Next.js, Vue, Angular, JSX, Tailwind, or Bootstrap.**
- Developed in **100% Pure HTML5, CSS3, Vanilla ES6+ JavaScript modules**.
- Augmented with **Three.js (WebGL)** for the 3D Living Campus constellation and **GSAP / ScrollTrigger** for editorial animations.

---

## 🎨 Design System: The Living Campus Experience

- **Warm Ivory (`#F7F3E9`)**: Primary luminous background canvas.
- **Champagne Gold (`#D6B77A`)**: Institutional prestige, badges, crest, and accents.
- **Botanical Green (`#526B54`)**: Campus grounds, sustainability, and growth.
- **Lavender (`#B9A8D8`)**: Intellectual curiosity, ambient glow, and creative energy.
- **Coral (`#E9A18C`)**: Achievement callouts, examination ranks, and interactive CTAs.
- **Deep Plum (`#493B4C`)**: High-contrast editorial typography and anchor cards.

---

## 📍 The Six Verified Bhavans & Campuses

1. **Main Junior College Campus:** Opposite Kamma Hostel, Ravipadu Road. (Central administrative headquarters, lecture halls, and admissions bureau).
2. **Balaji Bhavan:** Reddy Nagar / Vengala Reddy Nagar. (Super-60 cohort, boys residential campus, and intensive study pods).
3. **Yashoda Bhavan:** Reddy Nagar / Ramireddypeta. (Dedicated girls residential academy with 24/7 security and infirmary).
4. **Raman Bhavan:** Ramireddypeta / Arundelpet (near Sainath Towers). (Advanced STEM research labs, Olympiad center, and computer testing facility).
5. **Padmavathi Bhavan:** Central Narasaraopet. (Academic residence and personalized tutorial pods).
6. **KSR Towers:** Arundelpet. (Executive directorate, counseling lounge, and KSR Charitable Trust headquarters).

---

## 🚀 Quick Start & Local Preview

This project requires **zero external build tools** or heavy dependencies.

### Option 1: Native Node Server
```bash
node server.js
```
Open your browser to: `http://localhost:3000`

### Option 2: Direct Browser Launch
Open `index.html` directly in any modern WebGL-compatible browser.

---

## 📂 File Hierarchy

```
d:\Rea\OxfordVit\
├── index.html                      # Unified single institutional entrypoint
├── server.js                       # Zero-dependency local preview server
├── package.json                    # Project metadata & start script
├── README.md                       # Comprehensive documentation
│
└── assets/
    ├── css/
    │   ├── variables.css           # Institutional color palette & glass tokens
    │   ├── base.css                # Reset, typography, utility classes
    │   ├── components.css          # Buttons, glass cards, badges, tabs, modals
    │   ├── layout.css              # Header, mobile drawer, footer, breakpoints
    │   ├── sections.css            # Styling for all 12 institutional sections
    │   └── animations.css          # Keyframes, floating motion & reduced motion
    │
    ├── js/
    │   ├── main.js                 # ES6+ module orchestration
    │   ├── modules/
    │   │   ├── canvas3d.js         # Three.js 3D Living Campus constellation
    │   │   ├── scrollAnimations.js # GSAP & ScrollTrigger timelines
    │   │   ├── campusSwitcher.js   # 6 Bhavans interactive switcher & modal
    │   │   ├── achievements.js     # Marquee ticker & Wall of Champions filter
    │   │   ├── galleryModal.js     # Filterable lightbox modal
    │   │   ├── admissionsForm.js   # Student application & reference token generator
    │   │   └── navigation.js       # Sticky header, mobile drawer & scrollspy
    │   │
    │   └── data/
    │       ├── campusesData.js     # Metadata for all 6 Bhavans
    │       ├── academicsData.js    # Curricula, Super-60, NEET & daily routine
    │       ├── achievementsData.js # JEE/NEET/IPE rankers & KSR scholarships
    │       └── galleryData.js      # Photographic archive items
    │
    └── vendor/
        ├── three.min.js            # Three.js core
        ├── gsap.min.js             # GSAP core
        └── ScrollTrigger.min.js    # GSAP ScrollTrigger
```
