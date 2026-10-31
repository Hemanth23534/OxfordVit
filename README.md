# OXFORD VIT – THE LIVING CAMPUS EXPERIENCE
### Oxford VIT Junior College & Academy • Narasaraopet

> **Headquarters / Main Campus:** Opposite Kamma Hostel, Ravipadu Road, Narasaraopet, Palnadu District, Andhra Pradesh 522601, India.  
> **Under the Aegis of:** KSR Charitable Trust  
> **Leadership:** K. Sambasiva Rao (KSR, Administrative Director) & Panadi Raghava (Academic Director, `@raghava_vit`)

---

## 🏛️ Project Architecture & Purpose

This repository houses the unified institutional web platform representing the entire **Oxford VIT** educational institution and its network of six verified Bhavans across Narasaraopet, Andhra Pradesh.

Built purely in accordance with modern creative web engineering principles:
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

## 📍 The Six Verified Bhavans & Campuses

1. **Main Junior College Campus:** Opposite Kamma Hostel, Ravipadu Road (Pin 522601). Central administrative headquarters, lecture halls, and admissions bureau.
2. **Balaji Bhavan:** Reddy Nagar / Vengala Reddy Nagar (Pin 522601). Super-60 cohort, boys residential campus, and intensive study pods.
3. **Yashoda Bhavan:** Reddy Nagar / Ramireddypeta (Pin 522601). Dedicated girls residential academy with 24/7 security and infirmary.
4. **Raman Bhavan:** Ramireddypeta / Arundelpet, near Sainath Towers (Pin 522601). Advanced STEM research labs, Olympiad center, and computer testing facility.
5. **Padmavathi Bhavan:** Central Narasaraopet. Academic residence and personalized tutorial pods.
6. **KSR Towers:** Arundelpet (Directorate & KSR Charitable Trust HQ). Executive directorate, counseling lounge, and charitable scholarship trust.

---

## 📑 Pages Included in the Unified Portal

1. **`index.html`**: Cinematic full-screen 3D Living Campus homepage with interactive constellation, overview of Bhavans, academic programs, champions wall, video spotlight, and quick enquiry.
2. **`about.html`**: Institutional heritage (founded 1994), vision, mission, KSR Charitable Trust patronage, and leadership profiles.
3. **`campuses.html`**: Centralized multi-campus directory with live filterable cards for all 6 Bhavans, amenities, courses, and interactive locator.
4. **`academics.html`**: Deep-dive academic syllabi (MPC Super-60, BiPC Medical Academy, MEC/CEC), daily academic schedule, and weekly testing system.
5. **`achievements.html`**: Wall of Champions with verified JEE Advanced, NEET, and AP EAPCET toppers, plus state-level BIEAP medalists.
6. **`faculty.html`**: Comprehensive faculty roster across Mathematics, Physics, Chemistry, Biology, and Humanities.
7. **`student-life.html`**: Residential culture, hostel amenities, nutritional dining, sports facilities, digital libraries, and bus transport grid.
8. **`events.html`**: Cultural celebrations, Sankranti Sambaralu, Prathibha Puraskaralu convocations, Science Day, and Ramanujan Math Day.
9. **`gallery.html`**: Filterable high-definition photo and video gallery connected dynamically to `/api/gallery`.
10. **`admissions.html`**: Centralized online application and OVEST 2026 scholarship entrance examination registration.
11. **`admin.html`**: Management administrative console for monitoring admission applications and publishing new photo/video media directly to the website.

---

## 📊 Structured JSON Data Repositories

- `college-profile.json`: BIEAP affiliation, institutional milestones, contact details, and core philosophies.
- `campuses.json`: Address coordinates, facilities, and academic cohorts for all 6 Bhavans.
- `management.json`: Executive profiles for Dr. S. Francis Reddy, K. Sambasiva Rao, Panadi Raghava, and trustees.
- `faculty.json`: Faculty credentials, subjects, experience, and academic specializations.
- `achievements.json`: Verified student ranks and competitive scores with full student privacy protection.
- `events.json`: Calendar of annual cultural, scientific, and community welfare events.
- `gallery.json`: Media items categorized by campus, events, faculty, students, and transport.
- `source-references.json`: Provenance audit linking to social channels and official gazettes.

---

## 🚀 Quick Start & Verification

### Running the Platform
```bash
# Start the local server on http://localhost:3000
npm start
# or: node server.js
```

### Running the Automated Test Suite
```bash
# Execute 155 automated end-to-end tests
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

    # Gzip Compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml;

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

### Option 3: Docker Deployment
```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY . .
EXPOSE 3000
CMD ["node", "server.js"]
```

---

## 🔒 Security & Privacy Notice
- Personal student phone numbers and private addresses are strictly redacted in compliance with educational privacy protocols.
- Admission forms undergo rigorous client and server-side sanitization.
- Form rate-limiting and payload capping (2MB) are active in `server.js`.
