/**
 * OXFORD VIT – THE LIVING CAMPUS EXPERIENCE
 * Main Orchestration Entrypoint (ES6+ Module)
 */

import { LivingCampus3D } from './modules/canvas3d.js';
import { ScrollAnimationEngine } from './modules/scrollAnimations.js';
import { CampusSwitcher } from './modules/campusSwitcher.js';
import { AchievementsEngine } from './modules/achievements.js';
import { GalleryLightbox } from './modules/galleryModal.js';
import { AdmissionsHandler } from './modules/admissionsForm.js';
import { NavigationHandler } from './modules/navigation.js';

document.addEventListener('DOMContentLoaded', () => {
  console.log('🏛️ Initializing Oxford VIT – The Living Campus Experience...');

  // 1. Initialize 3D WebGL Living Campus Constellation
  try {
    new LivingCampus3D('canvas3d-container');
  } catch (err) {
    console.warn('3D Canvas initialization fallback:', err);
  }

  // 2. Initialize Navigation & Mobile Drawer
  new NavigationHandler();

  // 3. Initialize Multi-Campus Spatial Switcher
  new CampusSwitcher();

  // 4. Initialize Achievements & Hall of Fame
  new AchievementsEngine();

  // 5. Initialize Photo & Video Gallery Lightbox
  new GalleryLightbox();

  // 6. Initialize Admissions Bureau Form Logic
  new AdmissionsHandler();

  // 7. Initialize Editorial GSAP / ScrollTrigger Motion Engine
  new ScrollAnimationEngine();

  console.log('✨ Oxford VIT Platform successfully orchestrated.');
});
