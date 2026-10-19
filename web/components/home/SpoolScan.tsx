"use client";

// Home hero: a flanged pipe spool swept by an ultrasonic ring scanner.
// Each pass paints a wall-thickness map behind the ring and tags the girth weld amber once it is checked.
import { useEffect, useRef } from "react";
import { createTimer } from "animejs";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

const OUTER = 0.5;
const BORE = 0.4;
const LENGTH = 3.3;
const FLANGE = 0.84;
const FLANGE_DEPTH = 0.16;
const BOLTS = 8;
const PITCH = 0.69;
const SCAN_END = LENGTH / 2 - FLANGE_DEPTH - 0.42;
// Cycle timings in seconds: rest, sweep, hold on the certified weld, then clear the map.
const REST = 0.6;
const SWEEP = 5.4;
const HOLD_END = 8.8;
const CYCLE = 9.8;

// Spool drawing tags: service on the first line, illustrative spool spec on the second.
const CALLOUTS = [
  ["Ultrasonic testing", "Phased-array ring scan"],
  ["Girth weld W-01", "Butt weld · 100% UT"],
  ["Weld-neck flange", "WN · RF · Class 150"],
  ["Wall-thickness map", "NPS 12 · SCH 40"],
] as const;
// Label-side start of each leader line in the 0–100 callout box: [x, y, elbow x].
const LEADERS = [[6, 17, 28], [94, 21, 76], [6, 89, 24], [94, 82, 72]] as const;

const ease = (t: number) => 0.5 - Math.cos(Math.PI * Math.min(1, Math.max(0, t))) / 2;
const smooth = (a: number, b: number, v: number) => {
  const t = Math.min(1, Math.max(0, (v - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

function ring(outer: number, inner: number, holes: [number, number, number][] = []) {
  const shape = new THREE.Shape().absarc(0, 0, outer, 0, Math.PI * 2, false);
  for (const [x, y, r] of [[0, 0, inner] as [number, number, number], ...holes]) {
    shape.holes.push(new THREE.Path().absarc(x, y, r, 0, Math.PI * 2, true));
  }
  return shape;
}

export default function SpoolScan() {
  const host = useRef<HTMLDivElement>(null);
  const lines = useRef<(SVGPathElement | null)[]>([]);
  const dots = useRef<(SVGCircleElement | null)[]>([]);

  useEffect(() => {
    const element = host.current;
    if (!element) return;
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    } catch {
      return;
    }
    element.appendChild(renderer.domElement);
    const scene = new THREE.Scene();
    const pmrem = new THREE.PMREMGenerator(renderer);
    const room = new RoomEnvironment();
    scene.environment = pmrem.fromScene(room, 0.04).texture;
    scene.environmentIntensity = 0.32;
    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 50);
    camera.position.set(0, 0, 9);
    camera.updateMatrixWorld();
    scene.add(new THREE.AmbientLight(0x86c9ed, 1.6));
    const key = new THREE.DirectionalLight(0xe3f6ff, 4.5);
    key.position.set(3, 5, 5);
    scene.add(key);
    const rim = new THREE.PointLight(0x18baff, 28, 15);
    rim.position.set(-3, -1, 2);
    scene.add(rim);

    // tilt carries pointer parallax, axis lays the spool diagonally, roll turns it about its own centreline.
    const tilt = new THREE.Group();
    tilt.rotation.set(0.32, 0, 0.3);
    scene.add(tilt);
    const axis = new THREE.Group();
    tilt.add(axis);
    const roll = new THREE.Group();
    axis.add(roll);

    const steel = (color: number, roughness = 0.28) => new THREE.MeshStandardMaterial({ color, metalness: 0.8, roughness });
    const scan = {
      uFrom: { value: 0 }, uTo: { value: 0 }, uScanZ: { value: -SCAN_END }, uMap: { value: 0 }, uBeam: { value: 0 },
      uProbe: { value: new THREE.Vector3() }, uProbeStrength: { value: 0 },
    };
    const pipeMaterial = steel(0x377b9b);
    // Paint the scanned band, the live beam line and the pointer probe onto the outer wall only.
    pipeMaterial.onBeforeCompile = (shader) => {
      Object.assign(shader.uniforms, scan);
      shader.vertexShader = shader.vertexShader.replace("#include <common>", "#include <common>\nvarying vec3 vSpool;")
        .replace("#include <begin_vertex>", "#include <begin_vertex>\nvSpool = position;");
      shader.fragmentShader = shader.fragmentShader.replace("#include <common>", `#include <common>
        varying vec3 vSpool;
        uniform float uFrom, uTo, uScanZ, uMap, uBeam, uProbeStrength;
        uniform vec3 uProbe;
        float spoolOuter() { return step(${((OUTER + BORE) / 2).toFixed(3)}, length(vSpool.xy)); }
        float spoolBand() { return smoothstep(uFrom - 0.015, uFrom + 0.015, vSpool.z) * (1.0 - smoothstep(uTo - 0.015, uTo + 0.015, vSpool.z)); }
        vec3 spoolMap() {
          float a = atan(vSpool.y, vSpool.x);
          float t = 0.5 + 0.28 * sin(vSpool.z * 6.3 + sin(a * 3.0) * 1.4) + 0.22 * sin(a * 5.0 - vSpool.z * 2.7);
          vec3 c = mix(vec3(0.05, 0.30, 0.48), vec3(0.24, 0.68, 0.92), clamp(t, 0.0, 1.0));
          float index = smoothstep(0.86, 1.0, abs(sin(a * 12.0))) + smoothstep(0.9, 1.0, abs(sin(vSpool.z * 20.0)));
          return c * (1.0 + 0.22 * min(index, 1.0));
        }`)
        .replace("#include <color_fragment>", `#include <color_fragment>
          float spoolMask = spoolOuter() * spoolBand() * uMap;
          diffuseColor.rgb = mix(diffuseColor.rgb, spoolMap(), spoolMask * 0.72);`)
        .replace("#include <emissivemap_fragment>", `#include <emissivemap_fragment>
          float spoolBeam = exp(-pow((vSpool.z - uScanZ) / 0.03, 2.0)) * uBeam * spoolOuter();
          float spoolProbe = exp(-pow(distance(vSpool, uProbe) / 0.16, 2.0)) * uProbeStrength * spoolOuter();
          totalEmissiveRadiance += spoolMap() * spoolMask * 0.24 + vec3(0.46, 0.86, 1.0) * spoolBeam * 1.8 + vec3(1.0, 0.72, 0.0) * spoolProbe * 0.9;`);
    };

    const tube = new THREE.Mesh(new THREE.ExtrudeGeometry(ring(OUTER, BORE), { depth: LENGTH - 0.02, bevelEnabled: false, curveSegments: 72 }), pipeMaterial);
    tube.geometry.translate(0, 0, -(LENGTH - 0.02) / 2);
    roll.add(tube);

    const flangeMaterial = steel(0x2f6f8e, 0.32);
    const boltMaterial = steel(0x1f4f66, 0.4);
    const boltHoles = Array.from({ length: BOLTS }, (_, i) => {
      const a = (i + 0.5) / BOLTS * Math.PI * 2;
      return [Math.cos(a) * PITCH, Math.sin(a) * PITCH, 0.05] as [number, number, number];
    });
    const flangeGeometry = new THREE.ExtrudeGeometry(ring(FLANGE, BORE, boltHoles), {
      depth: FLANGE_DEPTH - 0.03, bevelEnabled: true, bevelThickness: 0.015, bevelSize: 0.012, bevelSegments: 2, curveSegments: 64,
    });
    flangeGeometry.translate(0, 0, -(FLANGE_DEPTH - 0.03) / 2);
    // Weld-neck hub tapering from the flange into the pipe wall.
    const hubGeometry = new THREE.CylinderGeometry(OUTER + 0.005, OUTER + 0.1, 0.24, 72, 1, true).rotateX(Math.PI / 2);
    const studGeometry = new THREE.CylinderGeometry(0.034, 0.034, FLANGE_DEPTH + 0.16, 12).rotateX(Math.PI / 2);
    const nutGeometry = new THREE.CylinderGeometry(0.078, 0.078, 0.07, 6).rotateX(Math.PI / 2);
    for (const side of [-1, 1]) {
      const face = side * (LENGTH / 2 - FLANGE_DEPTH / 2);
      const flange = new THREE.Mesh(flangeGeometry, flangeMaterial);
      flange.position.z = face;
      roll.add(flange);
      const hub = new THREE.Mesh(hubGeometry, flangeMaterial);
      hub.position.z = face - side * (FLANGE_DEPTH / 2 + 0.12);
      hub.rotation.y = side > 0 ? Math.PI : 0;
      roll.add(hub);
      for (const [x, y] of boltHoles) {
        const stud = new THREE.Mesh(studGeometry, boltMaterial);
        stud.position.set(x, y, face + side * 0.04);
        const nut = new THREE.Mesh(nutGeometry, boltMaterial);
        nut.position.set(x, y, face + side * (FLANGE_DEPTH / 2 + 0.035));
        roll.add(stud, nut);
      }
    }

    const amber = new THREE.Color(0xffb800);
    const weldMaterial = new THREE.MeshStandardMaterial({ color: 0x4a7c92, metalness: 0.65, roughness: 0.55, emissive: amber, emissiveIntensity: 0 });
    const weld = new THREE.Mesh(new THREE.TorusGeometry(OUTER + 0.004, 0.048, 14, 120), weldMaterial);
    weld.scale.z = 1.5;
    roll.add(weld);

    // Ring scanner: two guide rings bridged by probe shoes, riding the pipe without rolling with it.
    const scanner = new THREE.Group();
    axis.add(scanner);
    const frameMaterial = steel(0x2a5f7a, 0.35);
    const guideGeometry = new THREE.TorusGeometry(OUTER + 0.2, 0.026, 12, 120);
    for (const z of [-0.075, 0.075]) {
      const guide = new THREE.Mesh(guideGeometry, frameMaterial);
      guide.position.z = z;
      scanner.add(guide);
    }
    const shoeGeometry = new THREE.BoxGeometry(0.17, 0.07, 0.19);
    const lensMaterial = new THREE.MeshBasicMaterial({ color: 0x76d8ff });
    const lensGeometry = new THREE.BoxGeometry(0.02, 0.04, 0.12);
    for (let i = 0; i < 6; i++) {
      const a = i / 6 * Math.PI * 2 + Math.PI / 6;
      const shoe = new THREE.Group();
      shoe.rotation.z = a;
      const body = new THREE.Mesh(shoeGeometry, frameMaterial);
      body.position.x = OUTER + 0.12;
      const lens = new THREE.Mesh(lensGeometry, lensMaterial);
      lens.position.x = OUTER + 0.025;
      shoe.add(body, lens);
      scanner.add(shoe);
    }
    const beamMaterial = new THREE.MeshBasicMaterial({ color: 0x76d8ff, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide });
    const beam = new THREE.Mesh(new THREE.CylinderGeometry(OUTER + 0.03, OUTER + 0.03, 0.05, 120, 1, true).rotateX(Math.PI / 2), beamMaterial);
    scanner.add(beam);

    // Points the callout leaders track: scanner ring, right flange rim, left flange rim, middle weld ring.
    const anchors = [new THREE.Object3D(), new THREE.Object3D(), new THREE.Object3D(), new THREE.Object3D()];
    anchors[0].position.set(0, OUTER + 0.23, 0);
    scanner.add(anchors[0]);
    axis.add(anchors[1], anchors[2], anchors[3]);

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pointer = new THREE.Vector2();
    const raycaster = new THREE.Raycaster();
    const probeTarget = new THREE.Vector3();
    const projected = new THREE.Vector3();
    let hovering = false;
    let clock = 0;
    let previousFrame = performance.now();
    let settled = false;
    const rimPoint = new THREE.Vector3();
    const best = new THREE.Vector3();
    // Visible rimPoint point (in axis space) whose screen position leans furthest toward a label corner.
    const pickRim = (z: number, radius: number, towardX: number, towardY: number, camera2d: THREE.Vector3) => {
      let score = -Infinity;
      for (let k = 0; k < 48; k++) {
        const a = k / 48 * Math.PI * 2;
        if (Math.cos(a) * camera2d.x + Math.sin(a) * camera2d.y < 0.2) continue;
        rimPoint.set(Math.cos(a) * radius, Math.sin(a) * radius, z);
        axis.localToWorld(rimPoint).project(camera);
        const s = rimPoint.x * towardX + rimPoint.y * towardY;
        if (s > score) { score = s; best.set(Math.cos(a) * radius, Math.sin(a) * radius, z); }
      }
      return best;
    };
    const facing = new THREE.Vector3();

    const move = (event: PointerEvent) => {
      if (event.pointerType === "touch" || reduced.matches) return;
      const bounds = element.getBoundingClientRect();
      pointer.set((event.clientX - bounds.left) / bounds.width * 2 - 1, 1 - (event.clientY - bounds.top) / bounds.height * 2);
      hovering = true;
    };
    const leave = () => { hovering = false; };
    element.addEventListener("pointermove", move);
    element.addEventListener("pointerleave", leave);
    element.addEventListener("pointercancel", leave);

    const render = () => {
      const now = performance.now();
      const delta = Math.min(now - previousFrame, 64);
      previousFrame = now;
      const still = reduced.matches;
      const follow = still ? 1 : 1 - Math.exp(-delta / 120);
      if (!still && !document.hidden) clock += delta / 1000;
      // Reduced motion shows the finished pass: full map, weld tagged.
      const time = still ? 7 : clock;
      const pass = Math.floor(time / CYCLE);
      const phase = time - pass * CYCLE;
      const start = pass % 2 ? SCAN_END : -SCAN_END;
      const progress = ease((phase - REST) / SWEEP);
      const ringZ = start - 2 * start * progress;
      const fade = 1 - smooth(HOLD_END, CYCLE, phase);
      const sweeping = smooth(0, 0.04, progress) * (1 - smooth(0.96, 1, progress));

      scanner.position.z = ringZ;
      scan.uScanZ.value = ringZ;
      scan.uFrom.value = Math.min(start, ringZ);
      scan.uTo.value = Math.max(start, ringZ);
      scan.uMap.value = fade;
      scan.uBeam.value = 0.3 + 0.7 * sweeping;
      beamMaterial.opacity = 0.18 + 0.5 * sweeping;
      const tag = smooth(0.5, 0.58, progress) * fade;
      const done = phase > REST + SWEEP && phase < HOLD_END ? 1 : 0;
      weldMaterial.emissiveIntensity = tag * (0.55 + (still ? 0 : 0.15 * Math.sin(time * 3.2) * done));
      weldMaterial.color.setHex(0x4a7c92).lerp(amber, tag * 0.55);

      roll.rotation.z = still ? 0.4 : time * 0.11;
      axis.rotation.y = -0.98 + (still ? 0 : Math.sin(time * 0.23) * 0.09);
      const active = hovering && !still && !document.hidden;
      tilt.rotation.x = THREE.MathUtils.lerp(tilt.rotation.x, 0.32 + (active ? -pointer.y * 0.16 : 0), follow);
      tilt.rotation.y = THREE.MathUtils.lerp(tilt.rotation.y, active ? pointer.x * 0.22 : 0, follow);
      scene.updateMatrixWorld(true);

      axis.worldToLocal(facing.copy(camera.position));
      facing.z = 0;
      facing.normalize();
      const anchorFollow = settled ? 1 - Math.exp(-delta / 200) : 1;
      settled = true;
      // Left flange is whichever end projects further left on screen.
      const leftEnd = rimPoint.set(0, 0, 1).applyMatrix4(axis.matrixWorld).project(camera).x < projected.set(0, 0, -1).applyMatrix4(axis.matrixWorld).project(camera).x ? 1 : -1;
      anchors[2].position.lerp(pickRim(leftEnd * (LENGTH / 2 - FLANGE_DEPTH / 2), FLANGE, -1, -1, facing), anchorFollow);
      anchors[1].position.lerp(pickRim(-leftEnd * (LENGTH / 2 - FLANGE_DEPTH / 2), FLANGE, 1, 1, facing), anchorFollow);
      anchors[3].position.lerp(pickRim(0, OUTER + 0.05, 1, -1, facing), anchorFollow);
      anchors.forEach(anchor => anchor.updateMatrixWorld());

      // Pointer acts as a hand-held probe: an amber spot that follows the cursor across the wall.
      let probe = 0;
      if (active) {
        raycaster.setFromCamera(pointer, camera);
        const hit = raycaster.intersectObject(tube, false)[0];
        if (hit) {
          tube.worldToLocal(probeTarget.copy(hit.point));
          scan.uProbe.value.lerp(probeTarget, scan.uProbeStrength.value < 0.05 ? 1 : follow);
          probe = 1;
        }
      }
      scan.uProbeStrength.value = THREE.MathUtils.lerp(scan.uProbeStrength.value, probe, follow);

      anchors.forEach((anchor, i) => {
        anchor.getWorldPosition(projected).project(camera);
        const x = ((projected.x + 1) / 2 * 100).toFixed(2);
        const y = ((1 - projected.y) / 2 * 100).toFixed(2);
        const [lx, ly, elbow] = LEADERS[i];
        lines.current[i]?.setAttribute("d", `M ${lx} ${ly} H ${elbow} L ${x} ${y}`);
        dots.current[i]?.setAttribute("cx", x);
        dots.current[i]?.setAttribute("cy", y);
      });
      renderer.render(scene, camera);
    };

    const resize = new ResizeObserver(() => {
      // Layout size, not the transformed rect: CSS sizes the canvas so it stays aligned with the callout overlay.
      const width = element.clientWidth, height = element.clientHeight;
      if (!width || !height) return;
      // Render at the transformed size so the scaled hero artwork stays sharp.
      renderer.setPixelRatio(Math.min(window.devicePixelRatio * element.getBoundingClientRect().width / width, 2));
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.zoom = 1.2 * Math.min(1, camera.aspect) * (width < 480 ? 0.88 : 1);
      camera.updateProjectionMatrix();
      render();
    });
    resize.observe(element);
    const timer = createTimer({ autoplay: !reduced.matches, onUpdate: render });
    let visible = true;
    const sync = () => {
      const running = visible && !document.hidden && !reduced.matches;
      previousFrame = performance.now();
      if (running) timer.resume(); else { timer.pause(); render(); }
    };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); });
    observer.observe(element);
    document.addEventListener("visibilitychange", sync);
    reduced.addEventListener("change", sync);
    render();
    return () => {
      resize.disconnect(); observer.disconnect(); timer.cancel();
      element.removeEventListener("pointermove", move);
      element.removeEventListener("pointerleave", leave);
      element.removeEventListener("pointercancel", leave);
      document.removeEventListener("visibilitychange", sync);
      reduced.removeEventListener("change", sync);
      const disposed = new Set<{ dispose: () => void }>();
      scene.traverse(object => {
        if (object instanceof THREE.Mesh) {
          disposed.add(object.geometry);
          (Array.isArray(object.material) ? object.material : [object.material]).forEach(m => disposed.add(m));
        }
      });
      disposed.forEach(item => item.dispose());
      scene.environment?.dispose(); pmrem.dispose(); room.dispose();
      renderer.dispose(); renderer.domElement.remove();
    };
  }, []);

  return (
    <div className="inspection-artifact spool-scan" aria-hidden="true">
      <div ref={host} className="artifact-canvas" />
      <div className="artifact-callouts">
        <svg className="artifact-callout-lines" viewBox="0 0 100 100" preserveAspectRatio="none" focusable="false">
          {CALLOUTS.map(([label], i) => <path key={label} ref={(el) => { lines.current[i] = el; }} />)}
          {CALLOUTS.map(([label], i) => <circle key={label} ref={(el) => { dots.current[i] = el; }} r="0.65" />)}
        </svg>
        {CALLOUTS.map(([label, spec], i) => (
          <span key={label} className={`artifact-callout artifact-callout--${["inspection", "training", "calibration", "certification"][i]}`}>
            {label}<span className="artifact-callout-spec">{spec}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
