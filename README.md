# OXFORD VIT – THE LIVING CAMPUS EXPERIENCE
### Oxford VIT Junior College & Academy • Multi-Location Centralized Portal
#### Narasaraopet (Headquarters) • Guntur (Competitive Hub) • Bapatla (Coastal Branch)

> **Headquarters / Main Campus:** Yashoda Bhavan, Reddy Nagar / Ramireddypeta, Narasaraopet, Palnadu District, Andhra Pradesh 522601, India.  
> **Under the Aegis of:** KSR Charitable Trust  
> **Leadership:** K. Sambasiva Rao (KSR, Administrative Director) & Panadi Raghava (Academic Director, `@raghava_vit`)

---

## 🏛️ Project Architecture & Purpose

This repository houses the unified institutional web platform representing the entire **Oxford VIT** educational institution across all its verified geographical divisions: **Narasaraopet**, **Guntur**, and **Bapatla**.

Built strictly in accordance with pure creative web engineering:
- **Zero Framework Bloat:** Strictly no React, Next.js, Vue, Angular, JSX, Tailwind, or Bootstrap.
- **100% Pure Web Standards:** Pure HTML5, modular CSS3, Vanilla ES6+ JavaScript modules.
- **Support Libraries:** Three.js (WebGL) for the 3D Living Campus constellation and GSAP / ScrollTrigger for editorial transitions.
- **Lightweight Native Backend:** Zero-dependency Node.js server handling static files, dynamic gallery additions, admission enquiries, and institutional announcements.

---

## 🎨 Design System: The Living Campus Experience

- **Warm Ivory (`#F7F3E9`)**: Primary luminous background canvas.
- **Champagne Gold (`#D6B77A`)**: Institutional prestige, badges, crest, and accents.
- **Botanical Green (`#526B54`)**: Campus grounds, sustainability, and growth.
- **Lavender (`#B9A8D8`)**: Intellectual curiosity, ambient glow, and creative energy.
- **Coral (`#E9A18C`)**: Achievement callouts, examination ranks, and interactive CTAs.
- **Deep Plum (`#493B4C`)**: High-contrast editorial typography and anchor cards.

---

## 📍 Geographical Divisions & Campus Spectrum

### NARASARAOPET (Palnadu District Hub — Founding Headquarters)
1. **Yashoda Bhavan — Main Campus:** Central academic headquarters, lecture amphitheatres, modern science labs, and premier girls residential academy.
2. **Balaji Bhavan — Senior and Junior Intermediate Sections:** Super-60 competitive cell, boys residential campus, and intensive study pods.
3. **Raman Bhavan — Senior IIT-JEE Super Wing:** Elite IIT-JEE Advanced cell, 150+ networked computer testing terminals (CBT), and national Olympiad labs.
4. **Oxford IIT School / Concept School:** High school (Classes 6th to 10th) & early IIT foundation wing. (Sister School Category).
5. **KSR Towers — Historical Campus Information:** Foundational tower and registered trust headquarters. Preserved for institutional archives and merit scholarships; distinguished from operational teaching campuses. (Historical Archive Category).

### GUNTUR (Guntur District Hub — Competitive & Medical Corridor)
1. **Balaji Tower Campus — IIT-JEE & Medical Academy:** Premier urban flagship in Guntur (Arundelpet / Brodipet) for high-achieving engineering and medical scholars.
2. **Vasavi Tower Girls Campus — Girls Residential & Day Campus:** Secure, gated educational sanctuary in Guntur with 24/7 biometric security and resident lady faculty.
3. **VIT Medical Academy — Long-Term NEET Wing:** Dedicated high-intensity repeater division for post-intermediate students targeting top government MBBS and AIIMS seats.

### BAPATLA (Bapatla District — Coastal Regional Branch)
1. **VIT Junior College / Bapatla Branch:** Dedicated profile serving coastal Andhra scholars with Intermediate MPC & BiPC courses and AP EAPCET coaching. *(Governance Status: Pending Verification — Regional Affiliation / Society Registration)*.

---

## 📑 Complete Suite of Pages (14 HTML Pages)

1. **`index.html`**: Cinematic full-screen 3D Living Campus homepage with interactive constellation, overview of all 3 hubs, academic programs, champions wall, video spotlight, and quick enquiry.
2. **`about.html`**: Institutional heritage (founded 1994), vision, mission, KSR Charitable Trust patronage, and leadership profiles.
3. **`campuses.html`**: Master centralized multi-campus directory with live dual-level filtering (by city and by category), interactive locator, and facility cards for all 9 entities.
4. **`narasaraopet.html`**: Dedicated city page for the Narasaraopet Hub with individual profiles for all 5 facilities, transportation routes, and historical archive section.
5. **`guntur.html`**: Dedicated city page for the Guntur Hub with profiles for Balaji Tower, Vasavi Tower Girls, and VIT Medical Academy.
6. **`bapatla.html`**: Dedicated profile page for the Bapatla Coastal Branch with verified regional information and governance disclosures.
7. **`academics.html`**: Deep-dive academic syllabi (MPC Super-60, BiPC Medical Academy, MEC/CEC), daily academic schedule, and weekly testing system.
8. **`achievements.html`**: Wall of Champions with verified JEE Advanced, NEET, and AP EAPCET toppers, plus state-level BIEAP medalists.
9. **`faculty.html`**: Comprehensive faculty roster across Mathematics, Physics, Chemistry, Biology, and Humanities.
10. **`student-life.html`**: Residential culture, hostel amenities, nutritional dining, sports facilities, digital libraries, and bus transport grid.
11. **`events.html`**: Cultural celebrations, Sankranti Sambaralu, Prathibha Puraskaralu convocations, Science Day, and Ramanujan Math Day.
12. **`gallery.html`**: Filterable high-definition photo and video gallery connected dynamically to `/api/gallery`.
13. **`admissions.html`**: Centralized online application and OVEST 2026 scholarship entrance examination registration.
14. **`admin.html`**: Management administrative console for monitoring admission applications and publishing new photo/video media directly to the website.

---

## 📊 Structured JSON Data Repositories

- `college-profile.json`: BIEAP affiliation, multi-city geographical hubs, institutional milestones, contact details, and core philosophies.
- `campuses.json`: Address coordinates, facilities, operational status, governance, and academic cohorts for all 9 campuses.
- `management.json`: Executive profiles for Chairmen K. Srinivasa Rao (KSR Sir) and D. Srinivasa Rao (DSR Sir), Directorate, and campus leaders.
- `faculty.json`: Faculty credentials, subjects, experience, and academic specializations.
- `achievements.json`: Verified student ranks and competitive scores with full student privacy protection.
- `events.json`: Calendar of annual cultural, scientific, and community welfare events.
- `gallery.json`: Media items categorized by campus, events, faculty, students, and transport.
- `source-references.json`: Provenance audit linking to social channels and official gazettes.

---

## 🚀 Quick Start & Automated Verification

### Running the Platform
```bash
# Start the local server on http://localhost:3000
npm start
# or: node server.js
```

### Running the Automated Test Suite
```bash
# Execute 192 automated end-to-end tests validating all pages, assets, and APIs
npm test
# or: node test-suite.js
```

---

## 🌐 Production Deployment Guide

### Option 1: Node.js with PM2 (Recommended for Production Server / VPS)
```bash
# Install PM2 globally
npm install -g pm2

# Start Oxford VIT server with automatic restarts and clustering
pm2 start server.js --name "oxford-vit"

# Save PM2 process list to survive server reboots
pm2 save
pm2 startup
```

### Option 2: Nginx Reverse Proxy Configuration
```nginx
server {
    listen 80;
    server_name oxfordvit.edu.in www.oxfordvit.edu.in;

    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml image/svg+xml;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

---

## 🔒 Security & Privacy Notice
- Personal student phone numbers and private addresses are strictly redacted in compliance with educational privacy protocols.
- Admission forms undergo rigorous client and server-side sanitization.
- Form rate-limiting and payload capping (2MB) are active in `server.js`.
