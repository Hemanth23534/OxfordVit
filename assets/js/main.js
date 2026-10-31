/**
 * OXFORD VIT – THE LIVING CAMPUS EXPERIENCE
 * Main Orchestration Entrypoint (ES6+ Module)
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

document.addEventListener('DOMContentLoaded', () => {
  console.log('🏛️ Initializing Oxford VIT – The Living Campus Experience...');

  // 1. Initialize Cinematic Preloader
  new CinematicPreloader();

  // 2. Initialize Luxury Custom Cursor & Magnetic Interactions
  new LuxuryCursor();

  // 3. Initialize 3D WebGL Living Campus Constellation
  try {
    new LivingCampus3D('canvas3d-container');
  } catch (err) {
    console.warn('3D Canvas initialization fallback:', err);
  }

  // 4. Initialize Navigation & Mobile Drawer
  new NavigationHandler();

  // 5. Initialize Multi-Campus Spatial Switcher
  new CampusSwitcher();

  // 6. Initialize Achievements & Hall of Fame
  new AchievementsEngine();

  // 7. Initialize Photo & Video Gallery Lightbox
  new GalleryLightbox();

  // 8. Initialize Admissions Bureau Form Logic
  new AdmissionsHandler();

  // 9. Initialize 3D Tilt & Specular Glare Logic
  new Tilt3DEngine();

  // 10. Initialize Editorial GSAP / ScrollTrigger Motion Engine
  new ScrollAnimationEngine();

  console.log('✨ Oxford VIT Platform successfully orchestrated.');
});
