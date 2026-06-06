/* ═══════════════════════════════════════════════════════
   viz3d.js — Three.js (WebGL) 3D renderer for the sorting
   visualiser. Bundled by Astro/Vite. Exposes a small API on
   `window.Viz3D` that the classic visualiser.js script drives:

     window.Viz3D.ready                 -> bool (false if WebGL failed)
     window.Viz3D.render(arr, states)   -> update the 3D boxes
     window.Viz3D.celebrate()           -> finish ripple
     window.Viz3D.setEnabled(bool)      -> show/hide the 3D canvas
     window.Viz3D.isEnabled()           -> bool

   The scene draws every array element as a real 3D box sitting
   on a floor. The camera is fixed and looks straight at the row
   (no sway, no mouse-parallax) so the boxes always stand upright.
   When two values are swapped, the two boxes physically travel to
   each other's slot — making it obvious that they changed places.
   A value label sits at the bottom of every box.
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
// active states gently lift straight up off the floor (no tilt toward viewer)
const LIFT     = { comparing: 2.5, swapping: 4, pivot: 3.5, selected: 3.5, sorted: 0, default: 0 };
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
  slot: 1,
  barD: 8,
  rafId: null,
  clock: null,
  celebrateStart: -1,
  baseDist: 150,
  lookAtY: WORLD_H * 0.34,
  prevArr: null,
};

function slotX(i) { return -WORLD_W / 2 + (i + 0.5) * S.slot; }

function initViz3D() {
  const container = document.getElementById('barCanvas');
  if (!container || S.ready) return;
  S.container = container;

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
    // No WebGL — leave ready=false so visualiser.js falls back to DOM boxes.
    S.ready = false;
    window.Viz3D = makeApi();
    return;
  }

  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0x060810, 160, 380);
  S.scene = scene;

  S.camera = new THREE.PerspectiveCamera(FOV, 1.6, 0.1, 1000);

  // ── lighting ──
  scene.add(new THREE.HemisphereLight(0x9fb8ff, 0x0a0c14, 0.75));

  const key = new THREE.DirectionalLight(0xffffff, 1.15);
  key.position.set(-30, 110, 90);
  key.castShadow = true;
  key.shadow.mapSize.set(1024, 1024);
  key.shadow.camera.near = 10;
  key.shadow.camera.far = 360;
  key.shadow.camera.left = -90;
  key.shadow.camera.right = 90;
  key.shadow.camera.top = 110;
  key.shadow.camera.bottom = -40;
  scene.add(key);

  const fill = new THREE.PointLight(0x00ffc8, 0.4, 460);
  fill.position.set(0, 50, 120);
  scene.add(fill);

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
  if (grid.material) { grid.material.transparent = true; grid.material.opacity = 0.35; }
  scene.add(grid);

  S.group = new THREE.Group();
  scene.add(S.group);

  S.clock = new THREE.Clock();

  window.addEventListener('resize', onResize);
  if (window.ResizeObserver) {
    new ResizeObserver(onResize).observe(container);
  }

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
// The camera is FIXED and looks straight at the row — no sway, no parallax.
function fitCamera() {
  const aspect = S.camera.aspect || 1.6;
  const tan = Math.tan((FOV * Math.PI / 180) / 2);
  const distH = (WORLD_H / 2 + 14) / tan;
  const distW = (WORLD_W / 2) / (tan * aspect);
  S.baseDist = Math.max(distH, distW) * 1.12 + 14;
  S.lookAtY = WORLD_H * 0.34;
  // a small, constant elevation gives the row a 3D feel while keeping the
  // boxes perfectly upright (they are never tilted/rotated).
  S.camera.position.set(0, S.lookAtY + 10, S.baseDist);
  S.camera.lookAt(0, S.lookAtY, 0);
}

/* ── value labels: a canvas-texture sprite under each box ── */
function drawLabel(b, value) {
  const ctx = b.lctx;
  const cw = b.lcanvas.width, ch = b.lcanvas.height;
  ctx.clearRect(0, 0, cw, ch);
  // rounded translucent pill behind the number for readability
  const txt = String(value);
  ctx.font = 'bold 44px "Inter", system-ui, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  const tw = ctx.measureText(txt).width;
  const pad = 26;
  const rw = Math.min(cw - 4, tw + pad * 2);
  const rh = 64;
  const rx = (cw - rw) / 2, ry = (ch - rh) / 2;
  const r = 16;
  ctx.fillStyle = 'rgba(6,10,20,0.78)';
  ctx.beginPath();
  ctx.moveTo(rx + r, ry);
  ctx.arcTo(rx + rw, ry, rx + rw, ry + rh, r);
  ctx.arcTo(rx + rw, ry + rh, rx, ry + rh, r);
  ctx.arcTo(rx, ry + rh, rx, ry, r);
  ctx.arcTo(rx, ry, rx + rw, ry, r);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = 'rgba(0,255,200,0.35)';
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.fillStyle = '#eaf6ff';
  ctx.fillText(txt, cw / 2, ch / 2 + 2);
  b.ltex.needsUpdate = true;
}

function makeLabel() {
  const lcanvas = document.createElement('canvas');
  lcanvas.width = 256; lcanvas.height = 96;
  const lctx = lcanvas.getContext('2d');
  const ltex = new THREE.CanvasTexture(lcanvas);
  ltex.minFilter = THREE.LinearFilter;
  const lmat = new THREE.SpriteMaterial({ map: ltex, transparent: true, depthTest: false, depthWrite: false });
  const sprite = new THREE.Sprite(lmat);
  return { sprite, lcanvas, lctx, ltex, lmat };
}

function rebuild(n) {
  S.bars.forEach(b => {
    S.group.remove(b.mesh);
    b.mesh.geometry.dispose();
    b.mat.dispose();
    if (b.label) {
      S.group.remove(b.label.sprite);
      b.label.lmat.dispose();
      b.label.ltex.dispose();
    }
  });
  S.bars = [];

  S.slot = WORLD_W / n;
  const barW = S.slot * 0.74;
  const barD = Math.min(barW, 9);
  S.barD = barD;
  const geo = new THREE.BoxGeometry(barW, 1, barD);

  // label width scales with the slot; clamp so big arrays stay legible-ish
  const labelW = Math.max(3.4, Math.min(S.slot * 0.95, 9));
  const labelH = labelW * (96 / 256) * 2.4;

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
    const x = slotX(i);
    mesh.position.x = x;

    const label = makeLabel();
    label.sprite.scale.set(labelW, labelH, 1);
    label.sprite.position.set(x, -labelH * 0.55 - 1.5, barD / 2 + 0.5);

    S.group.add(mesh);
    S.group.add(label.sprite);

    S.bars.push({
      mesh, mat, label,
      value: null,
      h: 1, targetH: 1,
      lift: 0, targetLift: 0,
      emi: 0, targetEmi: 0,
      x, xTarget: x, swapDir: 0,
      col: new THREE.Color(COLORS.default),
      targetCol: new THREE.Color(COLORS.default),
    });
  }
  S.count = n;
  S.prevArr = null;
}

function render3D(arr, states) {
  if (!S.ready) return;
  const n = arr.length;
  if (n !== S.count) rebuild(n);
  S.celebrateStart = -1;

  let maxVal = 1;
  for (let i = 0; i < n; i++) if (arr[i] > maxVal) maxVal = arr[i];

  // detect a pure two-element swap (transposition) versus the previous render
  let swapPair = null;
  if (S.prevArr && S.prevArr.length === n) {
    const diff = [];
    for (let i = 0; i < n; i++) {
      if (arr[i] !== S.prevArr[i]) { diff.push(i); if (diff.length > 2) break; }
    }
    if (diff.length === 2) {
      const [a, c] = diff;
      if (arr[a] === S.prevArr[c] && arr[c] === S.prevArr[a]) swapPair = [a, c];
    }
  }

  for (let i = 0; i < n; i++) {
    const b = S.bars[i];
    if (!b) continue;
    const role = (states && states[i]) || 'default';
    b.targetH    = Math.max(1.2, (arr[i] / maxVal) * WORLD_H);
    b.targetLift = LIFT[role] || 0;
    b.targetEmi  = EMISSIVE[role] || 0;
    b.targetCol.setHex(COLORS[role] || COLORS.default);
    if (b.value !== arr[i]) { b.value = arr[i]; drawLabel(b, arr[i]); }
  }

  // make the two swapped boxes physically travel to each other's slot
  if (swapPair) {
    const [a, c] = swapPair;
    const ba = S.bars[a], bc = S.bars[c];
    // snap heights so each box keeps its size while it slides across
    ba.h = ba.targetH; bc.h = bc.targetH;
    ba.x = slotX(c); ba.xTarget = slotX(a); ba.swapDir = 1;
    bc.x = slotX(a); bc.xTarget = slotX(c); bc.swapDir = -1;
  }

  S.prevArr = arr.slice();
}

function celebrate3D() {
  if (!S.ready) return;
  S.celebrateStart = S.clock ? S.clock.getElapsedTime() : 0;
  for (const b of S.bars) {
    b.targetCol.setHex(COLORS.sorted);
    b.targetEmi = 0.4;
    b.targetLift = 0;
    b.xTarget = b.x; b.swapDir = 0;
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

    b.h    += (b.targetH  - b.h)    * k;
    b.lift += (liftTarget - b.lift) * k;
    b.emi  += (b.targetEmi - b.emi) * (k * 1.4);
    b.col.lerp(b.targetCol, k * 1.2);

    // horizontal travel for swaps
    b.x += (b.xTarget - b.x) * 0.22;
    const dx = b.xTarget - b.x;
    const arc = Math.min(1, Math.abs(dx) / Math.max(0.001, S.slot));
    const zSep = (b.swapDir || 0) * arc * (S.slot * 0.5 + 5);

    b.mesh.scale.y = b.h;
    b.mesh.position.x = b.x;
    b.mesh.position.y = b.h / 2 + b.lift + arc * 7;
    b.mesh.position.z = zSep;
    b.mat.color.copy(b.col);
    b.mat.emissive.copy(b.col);
    b.mat.emissiveIntensity = b.emi;

    if (b.label) {
      b.label.sprite.position.x = b.x;
      b.label.sprite.position.z = S.barD / 2 + 0.5 + Math.abs(zSep);
    }
  }

  S.renderer.render(S.scene, S.camera);
}

// module scripts are deferred, so the DOM is normally ready here
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initViz3D);
} else {
  initViz3D();
}

export { initViz3D };
