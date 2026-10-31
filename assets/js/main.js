/**
 * OXFORD VIT – THE LIVING CAMPUS EXPERIENCE
 * Main Orchestration Entrypoint (ES6+ Module)
 * Resilient startup architecture with isolated subsystem protection
 */

import { CinematicPreloader } from './modules/preloader.js';
import { LuxuryCursor } from './modules/cursor.js';
import { Tilt3DEngine } from './modules/tilt3d.js';
import { LivingCampus3D } from './modules/canvas3d.js';
import { ScrollAnimationEngine } from './modules/scrollAnimations.js';
import { CampusSwitcher } from './modules/campusSwitcher.js';
import { AchievementsEngine } from './modules/achievements.js';
import { GalleryLightbox } from './modules/galleryModal.js';
import { AdmissionsHandler } from './modules/admissionsForm.js';
import { NavigationHandler } from './modules/navigation.js';
import { FacultyDirectoryEngine } from './modules/facultyDirectory.js';
import { EventsEngine } from './modules/eventsEngine.js';
import { CampusDetailEngine } from './modules/campusDetail.js';
import { TimelineEngine } from './modules/timelineEngine.js';
import { SocialFeedEngine } from './modules/socialFeedEngine.js';
import { InteractiveCampusMap } from './modules/interactiveMap.js';
import { PageTransitionsEngine } from './modules/pageTransitions.js';

document.addEventListener('DOMContentLoaded', () => {
  console.log('🏛️ Initializing Oxford VIT – The Living Campus Experience...');

  // 1. Initialize Fault-Tolerant Cinematic Preloader (Immediate)
  let preloaderInstance = null;
  try {
    preloaderInstance = new CinematicPreloader();
  } catch (err) {
    console.warn('Preloader initialization fallback:', err);
    const preloaderEl = document.getElementById('cinematic-preloader');
    if (preloaderEl) preloaderEl.style.display = 'none';
  }

  // 2. Initialize Luxury Custom Cursor & Magnetic Interactions
  try {
    new LuxuryCursor();
  } catch (err) {
    console.warn('Luxury cursor fallback:', err);
  }

  // 3. Initialize 3D WebGL Living Campus Constellation
  try {
    new LivingCampus3D('canvas3d-container');
  } catch (err) {
    console.warn('3D Canvas initialization fallback:', err);
  }

  // 4. Initialize Navigation & Mobile Drawer
  try {
    new NavigationHandler();
  } catch (err) {
    console.warn('Navigation handler fallback:', err);
  }

  // 5. Initialize Multi-Campus Spatial Switcher
  try {
    new CampusSwitcher();
  } catch (err) {
    console.warn('Campus switcher fallback:', err);
  }

  // 6. Initialize Achievements & Hall of Fame
  try {
    new AchievementsEngine();
  } catch (err) {
    console.warn('Achievements engine fallback:', err);
  }

  // 7. Initialize Photo & Video Gallery Lightbox
  try {
    new GalleryLightbox();
  } catch (err) {
    console.warn('Gallery lightbox fallback:', err);
  }

  // 8. Initialize Admissions Bureau Form Logic
  try {
    new AdmissionsHandler();
  } catch (err) {
    console.warn('Admissions handler fallback:', err);
  }

  // 8b. Initialize Subject-Wise Faculty Directory Logic
  try {
    new FacultyDirectoryEngine();
  } catch (err) {
    console.warn('Faculty directory fallback:', err);
  }

  // 8c. Initialize Institutional Events & Celebrations Engine
  try {
    new EventsEngine();
  } catch (err) {
    console.warn('Events engine fallback:', err);
  }

  // 8d. Initialize Detailed Campus Profile Engine
  try {
    new CampusDetailEngine();
  } catch (err) {
    console.warn('Campus detail engine fallback:', err);
  }

  // 8e. Initialize Institutional History Timeline Engine
  try {
    if (document.querySelector('.timeline-container') || document.querySelector('.timeline-cards-track')) {
      new TimelineEngine();
    }
  } catch (err) {
    console.warn('Timeline engine fallback:', err);
  }

  // 8f. Initialize Verified Social Media & Pulse Engine (@raghava_vit)
  try {
    if (document.querySelector('.social-feed-section') || document.querySelector('.social-feed-grid')) {
      new SocialFeedEngine();
    }
  } catch (err) {
    console.warn('Social feed engine fallback:', err);
  }

  // 8g. Initialize Interactive Regional & Spatial Campus Map Engine
  try {
    if (document.getElementById('interactive-campus-map')) {
      new InteractiveCampusMap('interactive-campus-map');
    }
  } catch (err) {
    console.warn('Interactive map fallback:', err);
  }

  // 9. Initialize 3D Tilt & Specular Glare Logic
  try {
    new Tilt3DEngine();
  } catch (err) {
    console.warn('Tilt engine fallback:', err);
  }

  // 10. Initialize Editorial GSAP / ScrollTrigger Motion Engine
  try {
    new ScrollAnimationEngine();
  } catch (err) {
    console.warn('Scroll animation fallback:', err);
  }

  // 11. Initialize Cinematic Dual-Curtain Page Transitions Engine
  try {
    new PageTransitionsEngine();
  } catch (err) {
    console.warn('Page transitions fallback:', err);
  }

  console.log('✨ Oxford VIT Platform successfully orchestrated.');
});
