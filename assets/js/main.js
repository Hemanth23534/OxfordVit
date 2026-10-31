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
import { FacultyDirectoryEngine } from './modules/facultyDirectory.js';
import { EventsEngine } from './modules/eventsEngine.js';
import { CampusDetailEngine } from './modules/campusDetail.js';
import { TimelineEngine } from './modules/timelineEngine.js';
import { SocialFeedEngine } from './modules/socialFeedEngine.js';
import { InteractiveCampusMap } from './modules/interactiveMap.js';
import { PageTransitionsEngine } from './modules/pageTransitions.js';

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

  // 8b. Initialize Subject-Wise Faculty Directory Logic
  new FacultyDirectoryEngine();

  // 8c. Initialize Institutional Events & Celebrations Engine
  new EventsEngine();

  // 8d. Initialize Detailed Campus Profile Engine
  new CampusDetailEngine();

  // 8e. Initialize Institutional History Timeline Engine
  if (document.querySelector('.timeline-container') || document.querySelector('.timeline-cards-track')) {
    new TimelineEngine();
  }

  // 8f. Initialize Verified Social Media & Pulse Engine (@raghava_vit)
  if (document.querySelector('.social-feed-section') || document.querySelector('.social-feed-grid')) {
    new SocialFeedEngine();
  }

  // 8g. Initialize Interactive Regional & Spatial Campus Map Engine
  if (document.getElementById('interactive-campus-map')) {
    new InteractiveCampusMap('interactive-campus-map');
  }

  // 9. Initialize 3D Tilt & Specular Glare Logic
  new Tilt3DEngine();

  // 10. Initialize Editorial GSAP / ScrollTrigger Motion Engine
  new ScrollAnimationEngine();

  // 11. Initialize Cinematic Dual-Curtain Page Transitions Engine
  new PageTransitionsEngine();

  console.log('✨ Oxford VIT Platform successfully orchestrated.');
});
