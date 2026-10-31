/**
 * OXFORD VIT – THE LIVING CAMPUS EXPERIENCE
 * Full-Screen 3D Hero & Cinematic Scholastic Nexus Canvas (Three.js)
 * Note: Abstract conceptual scholastic architecture; not representing a physical building.
 */

export class LivingCampus3D {
  constructor(containerId = 'canvas3d-container') {
    this.container = document.getElementById(containerId);
    if (!this.container || typeof THREE === 'undefined') {
      console.warn('3D Canvas container not found or Three.js missing.');
      return;
    }

    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.nexusGroup = null;
    this.terrainMesh = null;
    this.terrainGeom = null;
    this.orbitalRings = [];
    this.glassSpheres = [];
    this.floatingObjects = [];
    this.particles = null;

    this.mouseX = 0;
    this.mouseY = 0;
    this.targetMouseX = 0;
    this.targetMouseY = 0;
    this.windowHalfX = window.innerWidth / 2;
    this.windowHalfY = window.innerHeight / 2;
    this.scrollY = 0;
    this.clock = new THREE.Clock();

    this.init();
  }

  init() {
    // 1. Scene & Atmospheric Fog
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(0xF7F3E9, 0.0016);

    // 2. Camera Setup
    const aspect = window.innerWidth / window.innerHeight;
    this.camera = new THREE.PerspectiveCamera(46, aspect, 1, 2500);
    this.camera.position.set(0, 45, 540);

    // 3. High-Performance Renderer
    this.renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.15;
    this.container.appendChild(this.renderer.domElement);

    // 4. Multi-Layered Atmospheric Lighting
    const ambientLight = new THREE.AmbientLight(0xF7F3E9, 0.95);
    this.scene.add(ambientLight);

    const goldKeyLight = new THREE.DirectionalLight(0xD6B77A, 1.6);
    goldKeyLight.position.set(240, 320, 260);
    this.scene.add(goldKeyLight);

    const botanicalRimLight = new THREE.DirectionalLight(0x526B54, 1.1);
    botanicalRimLight.position.set(-250, -80, -180);
    this.scene.add(botanicalRimLight);

    const lavenderDomeLight = new THREE.PointLight(0xB9A8D8, 1.8, 600);
    lavenderDomeLight.position.set(0, 80, 0);
    this.scene.add(lavenderDomeLight);

    const coralAccentLight = new THREE.PointLight(0xE9A18C, 1.2, 500);
    coralAccentLight.position.set(120, -40, 160);
    this.scene.add(coralAccentLight);

    // 5. Construct 3D Elements
    this.createScholasticNexusArchitecture();
    this.createOrganicTerrainLandscape();
    this.createReflectiveMetallicRings();
    this.createIridescentGlassSpheres();
    this.createFloatingEducationalGeometries();
    this.createGoldenStardustParticles();

    // 6. Listeners
    window.addEventListener('resize', this.onWindowResize.bind(this));
    window.addEventListener('mousemove', this.onMouseMove.bind(this));
    window.addEventListener('scroll', this.onScroll.bind(this), { passive: true });

    // 7. Render Loop
    this.animate();
  }

  /**
   * Abstract Scholastic Nexus Architecture:
   * Colonnade pavilion ring, entablature, and geodesic dome.
   */
  createScholasticNexusArchitecture() {
    this.nexusGroup = new THREE.Group();

    // Base Circular Podium
    const podiumGeom = new THREE.CylinderGeometry(110, 125, 12, 48);
    const marbleMat = new THREE.MeshStandardMaterial({
      color: 0xF7F3E9,
      roughness: 0.35,
      metalness: 0.2
    });
    const podium = new THREE.Mesh(podiumGeom, marbleMat);
    podium.position.y = -60;
    this.nexusGroup.add(podium);

    // Colonnade Ring: 12 Classical Slender Columns
    const colRadius = 88;
    const colCount = 12;
    const colGeom = new THREE.CylinderGeometry(3.5, 4.2, 90, 16);
    const goldCapGeom = new THREE.CylinderGeometry(5.2, 3.8, 4.5, 16);
    const goldMat = new THREE.MeshStandardMaterial({
      color: 0xD6B77A,
      metalness: 0.85,
      roughness: 0.22
    });

    for (let i = 0; i < colCount; i++) {
      const angle = (i / colCount) * Math.PI * 2;
      const x = Math.cos(angle) * colRadius;
      const z = Math.sin(angle) * colRadius;

      const columnMesh = new THREE.Mesh(colGeom, marbleMat);
      columnMesh.position.set(x, -12, z);

      const topCap = new THREE.Mesh(goldCapGeom, goldMat);
      topCap.position.set(x, 34, z);

      const bottomCap = new THREE.Mesh(goldCapGeom, goldMat);
      bottomCap.position.set(x, -55, z);

      this.nexusGroup.add(columnMesh);
      this.nexusGroup.add(topCap);
      this.nexusGroup.add(bottomCap);
    }

    // Entablature (Architrave Ring)
    const ringGeom = new THREE.TorusGeometry(88, 4.5, 16, 64);
    ringGeom.rotateX(Math.PI / 2);
    const entablature = new THREE.Mesh(ringGeom, goldMat);
    entablature.position.y = 38;
    this.nexusGroup.add(entablature);

    // Geodesic Knowledge Dome atop Pavilion
    const domeGeom = new THREE.IcosahedronGeometry(72, 2);
    const domeWireframe = new THREE.WireframeGeometry(domeGeom);
    const domeWireMat = new THREE.LineBasicMaterial({
      color: 0xD6B77A,
      transparent: true,
      opacity: 0.65
    });
    const domeWireMesh = new THREE.LineSegments(domeWireframe, domeWireMat);
    domeWireMesh.position.y = 48;
    this.nexusGroup.add(domeWireMesh);

    // Central Floating Monolith / Knowledge Prism
    const monolithGeom = new THREE.OctahedronGeometry(22, 0);
    const monolithMat = new THREE.MeshStandardMaterial({
      color: 0x526B54,
      emissive: 0x526B54,
      emissiveIntensity: 0.35,
      roughness: 0.15,
      metalness: 0.85
    });
    this.monolith = new THREE.Mesh(monolithGeom, monolithMat);
    this.monolith.position.y = 10;
    this.nexusGroup.add(this.monolith);

    this.scene.add(this.nexusGroup);
  }

  /**
   * Organic Landscape / Topographical Terrain
   */
  createOrganicTerrainLandscape() {
    const width = 1400;
    const depth = 1400;
    this.terrainGeom = new THREE.PlaneGeometry(width, depth, 48, 48);
    this.terrainGeom.rotateX(-Math.PI / 2);

    const pos = this.terrainGeom.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const vx = pos.getX(i);
      const vz = pos.getZ(i);
      const distFromCenter = Math.sqrt(vx * vx + vz * vz);
      // Gentle rolling hills on edges, flattened in center for pavilion
      if (distFromCenter > 160) {
        const elevation = (Math.sin(vx * 0.015) + Math.cos(vz * 0.015)) * 26;
        pos.setY(i, -120 + elevation);
      } else {
        pos.setY(i, -120);
      }
    }
    this.terrainGeom.computeVertexNormals();

    const terrainMat = new THREE.MeshStandardMaterial({
      color: 0xF7F3E9,
      roughness: 0.85,
      metalness: 0.1,
      wireframe: true
    });

    this.terrainMesh = new THREE.Mesh(this.terrainGeom, terrainMat);
    this.scene.add(this.terrainMesh);
  }

  /**
   * Reflective Metallic Rings (Nested Orbital Gimbals)
   */
  createReflectiveMetallicRings() {
    const ringRadii = [118, 142, 168];
    const ringTubes = [2.2, 1.8, 1.5];
    const ringColors = [0xD6B77A, 0xF3E5C8, 0xB9A8D8];

    ringRadii.forEach((radius, idx) => {
      const geom = new THREE.TorusGeometry(radius, ringTubes[idx], 16, 72);
      const mat = new THREE.MeshStandardMaterial({
        color: ringColors[idx],
        metalness: 0.9,
        roughness: 0.18
      });

      const ring = new THREE.Mesh(geom, mat);
      ring.position.y = 45;
      ring.rotation.x = Math.PI / (3 + idx);
      ring.rotation.y = (idx * Math.PI) / 4;
      ring.userData = {
        speedX: 0.003 * (idx % 2 === 0 ? 1 : -1),
        speedY: 0.004 * (idx % 2 === 0 ? -1 : 1),
        speedZ: 0.002 * (idx + 1)
      };

      this.orbitalRings.push(ring);
      this.nexusGroup.add(ring);
    });
  }

  /**
   * Floating Iridescent Glass Spheres
   */
  createIridescentGlassSpheres() {
    const sphereData = [
      { x: -140, y: 110, z: 80, size: 24, color: 0xF3E5C8 },
      { x: 150, y: 130, z: -60, size: 28, color: 0xB9A8D8 },
      { x: -170, y: -20, z: -100, size: 20, color: 0xE9A18C },
      { x: 170, y: 10, z: 90, size: 22, color: 0x526B54 }
    ];

    sphereData.forEach((s, idx) => {
      const geom = new THREE.SphereGeometry(s.size, 32, 32);
      const glassMat = new THREE.MeshPhysicalMaterial({
        color: s.color,
        roughness: 0.12,
        metalness: 0.1,
        transmission: 0.75,
        transparent: true,
        opacity: 0.75,
        reflectivity: 0.9
      });

      const sphere = new THREE.Mesh(geom, glassMat);
      sphere.position.set(s.x, s.y, s.z);
      sphere.userData = {
        baseY: s.y,
        floatFreq: 1.2 + idx * 0.3,
        floatAmp: 8 + idx * 2
      };

      this.glassSpheres.push(sphere);
      this.scene.add(sphere);
    });
  }

  /**
   * Floating Educational Objects (Icosahedrons, Octahedrons, Prisms)
   */
  createFloatingEducationalGeometries() {
    const items = [
      { geom: new THREE.IcosahedronGeometry(14, 0), x: -100, y: 180, z: -40, color: 0xD6B77A },
      { geom: new THREE.OctahedronGeometry(12, 0), x: 110, y: 190, z: 50, color: 0x526B54 },
      { geom: new THREE.TetrahedronGeometry(15, 0), x: -160, y: 70, z: 120, color: 0xB9A8D8 },
      { geom: new THREE.DodecahedronGeometry(13, 0), x: 180, y: 90, z: -120, color: 0xE9A18C }
    ];

    items.forEach((item, idx) => {
      const mat = new THREE.MeshStandardMaterial({
        color: item.color,
        metalness: 0.75,
        roughness: 0.25,
        wireframe: idx % 2 === 0
      });

      const mesh = new THREE.Mesh(item.geom, mat);
      mesh.position.set(item.x, item.y, item.z);
      mesh.userData = {
        baseY: item.y,
        rotSpeed: 0.01 + idx * 0.004,
        floatFreq: 1.5 + idx * 0.2
      };

      this.floatingObjects.push(mesh);
      this.scene.add(mesh);
    });
  }

  /**
   * Golden Light Particles
   */
  createGoldenStardustParticles() {
    const count = 380;
    const geom = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    const palette = [
      new THREE.Color(0xD6B77A),
      new THREE.Color(0xF3E5C8),
      new THREE.Color(0x526B54),
      new THREE.Color(0xB9A8D8),
      new THREE.Color(0xE9A18C)
    ];

    for (let i = 0; i < count * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 1100;
      positions[i + 1] = (Math.random() - 0.5) * 800;
      positions[i + 2] = (Math.random() - 0.5) * 900;

      const col = palette[Math.floor(Math.random() * palette.length)];
      colors[i] = col.r;
      colors[i + 1] = col.g;
      colors[i + 2] = col.b;
    }

    geom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geom.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const mat = new THREE.PointsMaterial({
      size: 4,
      vertexColors: true,
      transparent: true,
      opacity: 0.78,
      blending: THREE.NormalBlending
    });

    this.particles = new THREE.Points(geom, mat);
    this.scene.add(this.particles);
  }

  onWindowResize() {
    this.windowHalfX = window.innerWidth / 2;
    this.windowHalfY = window.innerHeight / 2;
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  onMouseMove(e) {
    this.targetMouseX = (e.clientX - this.windowHalfX) * 0.06;
    this.targetMouseY = (e.clientY - this.windowHalfY) * 0.06;
  }

  onScroll() {
    this.scrollY = window.scrollY || window.pageYOffset;
  }

  animate() {
    requestAnimationFrame(this.animate.bind(this));

    const elapsedTime = this.clock.getElapsedTime();

    // Damped Mouse Parallax Lerping
    this.mouseX += (this.targetMouseX - this.mouseX) * 0.04;
    this.mouseY += (this.targetMouseY - this.mouseY) * 0.04;

    // Scroll-based 3D Camera Gliding
    const scrollProgress = this.scrollY * 0.15;
    this.camera.position.x = this.mouseX * 0.65;
    this.camera.position.y = 45 - (this.mouseY * 0.45) - (scrollProgress * 0.35);
    this.camera.position.z = 540 - (scrollProgress * 0.5);
    this.camera.lookAt(0, -scrollProgress * 0.3, 0);

    // Rotate Central Scholastic Monolith
    if (this.monolith) {
      this.monolith.rotation.x = elapsedTime * 0.6;
      this.monolith.rotation.y = elapsedTime * 0.8;
      this.monolith.position.y = 10 + Math.sin(elapsedTime * 2) * 5;
    }

    // Slowly Orbit Nested Rings
    this.orbitalRings.forEach((ring) => {
      ring.rotation.x += ring.userData.speedX;
      ring.rotation.y += ring.userData.speedY;
      ring.rotation.z += ring.userData.speedZ;
    });

    // Floating Glass Spheres Respiration
    this.glassSpheres.forEach((sphere) => {
      sphere.position.y = sphere.userData.baseY + Math.sin(elapsedTime * sphere.userData.floatFreq) * sphere.userData.floatAmp;
      sphere.rotation.y += 0.005;
    });

    // Floating Educational Geometries
    this.floatingObjects.forEach((obj) => {
      obj.rotation.x += obj.userData.rotSpeed;
      obj.rotation.y += obj.userData.rotSpeed * 1.3;
      obj.position.y = obj.userData.baseY + Math.sin(elapsedTime * obj.userData.floatFreq) * 7;
    });

    // Ambient Stardust Gentle Drift
    if (this.particles) {
      this.particles.rotation.y = elapsedTime * 0.015;
    }

    // Gently rotate entire pavilion
    if (this.nexusGroup) {
      this.nexusGroup.rotation.y = elapsedTime * 0.05 + (this.scrollY * 0.0006);
    }

    this.renderer.render(this.scene, this.camera);
  }
}
