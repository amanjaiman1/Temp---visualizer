/* ═══════════════════════════════════════════════════════
   viz3d.js — Three.js (WebGL) 3D renderer for the sorting
   visualiser. Bundled by Astro/Vite. Exposes a small API on
   `window.Viz3D` that the classic visualiser.js script drives:

     window.Viz3D.ready                 -> bool (false if WebGL failed)
     window.Viz3D.render(arr, states)   -> update the 3D bars
     window.Viz3D.celebrate()           -> finish ripple
     window.Viz3D.setEnabled(bool)      -> show/hide the 3D canvas
     window.Viz3D.isEnabled()           -> bool

   The scene draws every array element as a real 3D block sitting
   on a reflective floor, with smooth height tweening, glowing
   active states and a gently drifting camera so the whole thing
   reads as a living 3D space.
═══════════════════════════════════════════════════════ */
import * as THREE from 'three';

const COLORS = {
  default:   0x2a4a72,
  comparing: 0xffb830,
  swapping:  0xff4060,
  sorted:    0x39ff85,
  pivot:     0xb06fff,
  selected:  0x00ffc8,
};
// active states pop toward the viewer / lift off the floor
const LIFT     = { comparing: 3, swapping: 6, pivot: 7, selected: 7, sorted: 0, default: 0 };
const POP      = { comparing: 4, swapping: 9, pivot: 11, selected: 11, sorted: 0, default: 0 };
const EMISSIVE = { comparing: 0.55, swapping: 0.85, pivot: 0.7, selected: 0.7, sorted: 0.35, default: 0.0 };

const WORLD_W = 100;   // world units the whole row spans
const WORLD_H = 56;    // world height of the tallest possible bar
const FOV = 45;

const S = {
  ready: false,
  enabled: false,
  container: null,
  canvas: null,
  renderer: null,
  scene: null,
  camera: null,
  group: null,
  bars: [],
  count: 0,
  rafId: null,
  clock: null,
  pointer: { x: 0, y: 0 },
  celebrateStart: -1,
  baseDist: 150,
  lookAtY: WORLD_H * 0.34,
  reduceMotion: false,
};

function initViz3D() {
  const container = document.getElementById('barCanvas');
  if (!container || S.ready) return;
  S.container = container;
  S.reduceMotion = !!(window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches);

  try {
    const canvas = document.createElement('canvas');
    canvas.className = 'viz3d-canvas';
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    S.canvas = canvas;
    S.renderer = renderer;
  } catch (e) {
    // No WebGL — leave ready=false so visualiser.js falls back to DOM bars.
    S.ready = false;
    window.Viz3D = makeApi();
    return;
  }

  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0x060810, 130, 340);
  S.scene = scene;

  S.camera = new THREE.PerspectiveCamera(FOV, 1.6, 0.1, 1000);

  // ── lighting ──
  scene.add(new THREE.HemisphereLight(0x9fb8ff, 0x0a0c14, 0.7));

  const key = new THREE.DirectionalLight(0xffffff, 1.15);
  key.position.set(-40, 95, 70);
  key.castShadow = true;
  key.shadow.mapSize.set(1024, 1024);
  key.shadow.camera.near = 10;
  key.shadow.camera.far = 340;
  key.shadow.camera.left = -90;
  key.shadow.camera.right = 90;
  key.shadow.camera.top = 95;
  key.shadow.camera.bottom = -40;
  scene.add(key);

  const rim = new THREE.PointLight(0x00ffc8, 0.55, 420);
  rim.position.set(60, 45, 60);
  scene.add(rim);

  // ── floor + grid for depth perception ──
  const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(700, 700),
    new THREE.MeshStandardMaterial({
      color: 0x0a0e1a, roughness: 0.55, metalness: 0.35,
      transparent: true, opacity: 0.92,
    })
  );
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = -0.05;
  floor.receiveShadow = true;
  scene.add(floor);

  const grid = new THREE.GridHelper(700, 90, 0x1c2a4a, 0x101626);
  if (grid.material) { grid.material.transparent = true; grid.material.opacity = 0.4; }
  scene.add(grid);

  S.group = new THREE.Group();
  scene.add(S.group);

  S.clock = new THREE.Clock();

  window.addEventListener('resize', onResize);
  if (window.ResizeObserver) {
    new ResizeObserver(onResize).observe(container);
  }
  container.addEventListener('pointermove', onPointerMove);

  S.ready = true;
  window.Viz3D = makeApi();
}

function makeApi() {
  return {
    get ready() { return S.ready; },
    render: render3D,
    celebrate: celebrate3D,
    setEnabled,
    isEnabled: () => S.enabled,
  };
}

function setEnabled(on) {
  if (!S.ready) return;
  S.enabled = !!on;
  if (S.container) S.container.classList.toggle('mode-3d', S.enabled);
  if (S.canvas) {
    if (!S.canvas.parentNode) S.container.appendChild(S.canvas);
    S.canvas.style.display = S.enabled ? 'block' : 'none';
  }
  if (S.enabled) {
    onResize();
    if (!S.rafId) loop();
  } else if (S.rafId) {
    cancelAnimationFrame(S.rafId);
    S.rafId = null;
  }
}

function onPointerMove(e) {
  const r = S.container.getBoundingClientRect();
  S.pointer.x = ((e.clientX - r.left) / r.width) * 2 - 1;
  S.pointer.y = ((e.clientY - r.top) / r.height) * 2 - 1;
}

function onResize() {
  if (!S.ready || !S.container) return;
  const w = Math.max(1, S.container.clientWidth);
  const h = Math.max(1, S.container.clientHeight);
  S.renderer.setSize(w, h, false);
  S.camera.aspect = w / h;
  fitCamera();
  S.camera.updateProjectionMatrix();
}

// Position the camera so the whole row (WORLD_W × WORLD_H) fits the viewport.
function fitCamera() {
  const aspect = S.camera.aspect || 1.6;
  const tan = Math.tan((FOV * Math.PI / 180) / 2);
  const distH = (WORLD_H / 2) / tan;
  const distW = (WORLD_W / 2) / (tan * aspect);
  S.baseDist = Math.max(distH, distW) * 1.16 + 16;
  S.lookAtY = WORLD_H * 0.34;
}

function rebuild(n) {
  S.bars.forEach(b => {
    S.group.remove(b.mesh);
    b.mesh.geometry.dispose();
    b.mat.dispose();
  });
  S.bars = [];

  const slot = WORLD_W / n;
  const barW = slot * 0.74;
  const barD = Math.min(barW, 9);
  const geo = new THREE.BoxGeometry(barW, 1, barD);

  for (let i = 0; i < n; i++) {
    const mat = new THREE.MeshStandardMaterial({
      color: COLORS.default,
      emissive: COLORS.default,
      emissiveIntensity: 0,
      roughness: 0.35,
      metalness: 0.25,
    });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.castShadow = true;
    mesh.position.x = -WORLD_W / 2 + (i + 0.5) * slot;
    S.group.add(mesh);
    S.bars.push({
      mesh, mat,
      h: 1, targetH: 1,
      lift: 0, targetLift: 0,
      pop: 0, targetPop: 0,
      emi: 0, targetEmi: 0,
      col: new THREE.Color(COLORS.default),
      targetCol: new THREE.Color(COLORS.default),
    });
  }
  S.count = n;
}

function render3D(arr, states) {
  if (!S.ready) return;
  const n = arr.length;
  if (n !== S.count) rebuild(n);
  S.celebrateStart = -1;

  let maxVal = 1;
  for (let i = 0; i < n; i++) if (arr[i] > maxVal) maxVal = arr[i];

  for (let i = 0; i < n; i++) {
    const b = S.bars[i];
    if (!b) continue;
    const role = (states && states[i]) || 'default';
    b.targetH    = Math.max(1.2, (arr[i] / maxVal) * WORLD_H);
    b.targetLift = LIFT[role] || 0;
    b.targetPop  = POP[role] || 0;
    b.targetEmi  = EMISSIVE[role] || 0;
    b.targetCol.setHex(COLORS[role] || COLORS.default);
  }
}

function celebrate3D() {
  if (!S.ready) return;
  S.celebrateStart = S.clock ? S.clock.getElapsedTime() : 0;
  for (const b of S.bars) {
    b.targetCol.setHex(COLORS.sorted);
    b.targetEmi = 0.4;
    b.targetLift = 0;
    b.targetPop = 0;
  }
}

function loop() {
  S.rafId = requestAnimationFrame(loop);
  if (!S.enabled || !S.ready) return;
  const t = S.clock.getElapsedTime();
  const k = 0.18; // tween factor

  for (let i = 0; i < S.bars.length; i++) {
    const b = S.bars[i];

    let liftTarget = b.targetLift;
    if (S.celebrateStart >= 0) {
      const wave = Math.sin((t - S.celebrateStart) * 5 - i * 0.35);
      liftTarget = (t - S.celebrateStart > 2.4) ? 0 : Math.max(0, wave) * 5;
    }

    b.h    += (b.targetH    - b.h)    * k;
    b.lift += (liftTarget   - b.lift) * k;
    b.pop  += (b.targetPop  - b.pop)  * k;
    b.emi  += (b.targetEmi  - b.emi)  * (k * 1.4);
    b.col.lerp(b.targetCol, k * 1.2);

    b.mesh.scale.y = b.h;
    b.mesh.position.y = b.h / 2 + b.lift;
    b.mesh.position.z = b.pop;
    b.mat.color.copy(b.col);
    b.mat.emissive.copy(b.col);
    b.mat.emissiveIntensity = b.emi;
  }

  // gentle drifting + mouse-parallax camera orbit
  const sway = S.reduceMotion ? 0 : Math.sin(t * 0.18) * 0.22;
  const az = sway + S.pointer.x * 0.28;
  const el = 0.32 - S.pointer.y * 0.12;
  const d = S.baseDist;
  S.camera.position.set(
    Math.sin(az) * d,
    Math.max(8, Math.sin(el) * d * 0.9 + 6),
    Math.cos(az) * d
  );
  S.camera.lookAt(0, S.lookAtY, 0);

  S.renderer.render(S.scene, S.camera);
}

// module scripts are deferred, so the DOM is normally ready here
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initViz3D);
} else {
  initViz3D();
}

export { initViz3D };
