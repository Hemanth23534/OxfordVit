/**
 * OXFORD VIT – THE LIVING CAMPUS EXPERIENCE
 * Three.js WebGL Interactive 3D Spatial Canvas
 */

export class LivingCampus3D {
  constructor(containerId = 'canvas3d-container') {
    this.container = document.getElementById(containerId);
    if (!this.container || typeof THREE === 'undefined') {
      console.warn('3D Canvas container not found or Three.js not loaded.');
      return;
    }

    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.nodesGroup = null;
    this.particles = null;
    this.lines = null;
    this.mouseX = 0;
    this.mouseY = 0;
    this.targetMouseX = 0;
    this.targetMouseY = 0;
    this.windowHalfX = window.innerWidth / 2;
    this.windowHalfY = window.innerHeight / 2;
    this.clock = new THREE.Clock();

    this.init();
  }

  init() {
    // 1. Scene setup
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(0xF7F3E9, 0.0018);

    // 2. Camera setup
    const aspect = window.innerWidth / window.innerHeight;
    this.camera = new THREE.PerspectiveCamera(50, aspect, 1, 2000);
    this.camera.position.z = 520;
    this.camera.position.y = 40;

    // 3. Renderer setup
    this.renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.1;
    this.container.appendChild(this.renderer.domElement);

    // 4. Ambient & Directional Lights
    const ambientLight = new THREE.AmbientLight(0xF7F3E9, 0.9);
    this.scene.add(ambientLight);

    const goldLight = new THREE.DirectionalLight(0xD6B77A, 1.4);
    goldLight.position.set(200, 300, 200);
    this.scene.add(goldLight);

    const botanicalLight = new THREE.DirectionalLight(0x526B54, 0.8);
    botanicalLight.position.set(-200, -100, 150);
    this.scene.add(botanicalLight);

    const lavenderLight = new THREE.PointLight(0xB9A8D8, 1.2, 800);
    lavenderLight.position.set(0, 150, 100);
    this.scene.add(lavenderLight);

    // 5. Build Architectural Nodes & Constellation
    this.createLivingConstellation();

    // 6. Event Listeners
    window.addEventListener('resize', this.onWindowResize.bind(this));
    window.addEventListener('mousemove', this.onMouseMove.bind(this));
    window.addEventListener('scroll', this.onScroll.bind(this), { passive: true });

    // 7. Start Animation Loop
    this.animate();
  }

  createLivingConstellation() {
    this.nodesGroup = new THREE.Group();

    // Bhavans Spatial Positions representing Oxford VIT's 6 verified centers
    const bhavansCoords = [
      { name: 'Main Campus', x: 0, y: 30, z: 0, size: 24, color: 0xD6B77A },
      { name: 'Balaji Bhavan', x: -140, y: 70, z: -50, size: 18, color: 0x526B54 },
      { name: 'Yashoda Bhavan', x: 130, y: 80, z: -40, size: 18, color: 0xB9A8D8 },
      { name: 'Raman Bhavan', x: -180, y: -60, z: 30, size: 16, color: 0xE9A18C },
      { name: 'Padmavathi Bhavan', x: 160, y: -50, z: 20, size: 16, color: 0xD6B77A },
      { name: 'KSR Towers', x: 20, y: -110, z: -20, size: 20, color: 0x493B4C }
    ];

    const nodePositions = [];

    // Create 3D Polyhedral Architectural Pavilion Nodes
    bhavansCoords.forEach((bhavan, idx) => {
      const geometry = new THREE.IcosahedronGeometry(bhavan.size, 1);
      const wireframeGeometry = new THREE.WireframeGeometry(geometry);
      
      // Wireframe cage
      const wireframeMaterial = new THREE.LineBasicMaterial({
        color: 0xD6B77A,
        transparent: true,
        opacity: 0.65,
        linewidth: 1
      });
      const wireframeMesh = new THREE.LineSegments(wireframeGeometry, wireframeMaterial);

      // Core luminous nucleus
      const coreGeometry = new THREE.OctahedronGeometry(bhavan.size * 0.48, 0);
      const coreMaterial = new THREE.MeshStandardMaterial({
        color: bhavan.color,
        roughness: 0.25,
        metalness: 0.7,
        emissive: bhavan.color,
        emissiveIntensity: 0.25
      });
      const coreMesh = new THREE.Mesh(coreGeometry, coreMaterial);

      const nodeUnit = new THREE.Group();
      nodeUnit.add(wireframeMesh);
      nodeUnit.add(coreMesh);
      nodeUnit.position.set(bhavan.x, bhavan.y, bhavan.z);
      nodeUnit.userData = {
        name: bhavan.name,
        rotationSpeed: 0.005 + (idx * 0.002),
        baseY: bhavan.y
      };

      this.nodesGroup.add(nodeUnit);
      nodePositions.push(new THREE.Vector3(bhavan.x, bhavan.y, bhavan.z));
    });

    // Create Interconnecting Spline Network (Filaments)
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0xD6B77A,
      transparent: true,
      opacity: 0.35
    });

    for (let i = 0; i < nodePositions.length; i++) {
      for (let j = i + 1; j < nodePositions.length; j++) {
        const points = [];
        points.push(nodePositions[i]);
        points.push(nodePositions[j]);
        const lineGeom = new THREE.BufferGeometry().setFromPoints(points);
        const line = new THREE.Line(lineGeom, lineMaterial);
        this.nodesGroup.add(line);
      }
    }

    this.scene.add(this.nodesGroup);

    // Ambient floating golden and ivory stardust particles
    const particleCount = 280;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const palette = [
      new THREE.Color(0xD6B77A),
      new THREE.Color(0x526B54),
      new THREE.Color(0xB9A8D8),
      new THREE.Color(0xE9A18C),
      new THREE.Color(0xF7F3E9)
    ];

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 800;
      positions[i + 1] = (Math.random() - 0.5) * 600;
      positions[i + 2] = (Math.random() - 0.5) * 600;

      const col = palette[Math.floor(Math.random() * palette.length)];
      colors[i] = col.r;
      colors[i + 1] = col.g;
      colors[i + 2] = col.b;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size: 3.5,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      blending: THREE.NormalBlending
    });

    this.particles = new THREE.Points(particleGeometry, particleMaterial);
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
    this.targetMouseX = (e.clientX - this.windowHalfX) * 0.05;
    this.targetMouseY = (e.clientY - this.windowHalfY) * 0.05;
  }

  onScroll() {
    const scrollY = window.scrollY || window.pageYOffset;
    if (this.nodesGroup) {
      // Gentle camera vertical descent matching user scroll
      this.nodesGroup.position.y = scrollY * 0.12;
      this.nodesGroup.rotation.y = scrollY * 0.0008;
    }
  }

  animate() {
    requestAnimationFrame(this.animate.bind(this));

    const delta = this.clock.getDelta();
    const elapsedTime = this.clock.getElapsedTime();

    // Smooth Mouse Parallax Lerping
    this.mouseX += (this.targetMouseX - this.mouseX) * 0.04;
    this.mouseY += (this.targetMouseY - this.mouseY) * 0.04;

    this.camera.position.x = this.mouseX * 0.6;
    this.camera.position.y = 40 - (this.mouseY * 0.4);
    this.camera.lookAt(this.scene.position);

    // Gently rotate constellation group
    if (this.nodesGroup) {
      this.nodesGroup.rotation.y += 0.0012;
      
      // Animate individual nodes
      this.nodesGroup.children.forEach(child => {
        if (child.userData && child.userData.rotationSpeed) {
          child.rotation.x += child.userData.rotationSpeed;
          child.rotation.y += child.userData.rotationSpeed * 1.2;
          // Soft hovering respiration
          child.position.y = child.userData.baseY + Math.sin(elapsedTime * 1.5 + child.position.x) * 4;
        }
      });
    }

    // Slowly orbit ambient particles
    if (this.particles) {
      this.particles.rotation.y = elapsedTime * 0.02;
    }

    this.renderer.render(this.scene, this.camera);
  }
}
