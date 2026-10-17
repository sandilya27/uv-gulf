"use client";

import { useEffect, useRef } from "react";
import { animate, createTimer, stagger } from "animejs";
import "animejs/adapters/three";
import * as THREE from "three";

export default function InspectionCore() {
  const host = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = host.current;
    if (!element) return;
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    } catch {
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    element.appendChild(renderer.domElement);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 50);
    camera.position.set(0, 0, 9);
    scene.add(new THREE.AmbientLight(0x86c9ed, 2));
    const key = new THREE.DirectionalLight(0xe3f6ff, 5);
    key.position.set(3, 5, 5);
    scene.add(key);
    const rim = new THREE.PointLight(0x18baff, 28, 15);
    rim.position.set(-3, -1, 2);
    scene.add(rim);

    const tilt = new THREE.Group();
    tilt.rotation.set(0.35, 0, -0.2);
    scene.add(tilt);
    const core = new THREE.Group();
    tilt.add(core);
    const baseColor = new THREE.Color(0x377b9b);
    const hoverColor = new THREE.Color(0xffb800);
    const highlightColor = new THREE.Color();
    const glow = new THREE.MeshBasicMaterial({ color: 0x76d8ff });
    const sphereHover = {
      direction: { value: new THREE.Vector3(0, 0, 1) },
      strength: { value: 0 },
      color: { value: hoverColor },
    };
    // Shade a local patch on the sphere instead of tinting the entire nucleus.
    glow.onBeforeCompile = (shader) => {
      shader.uniforms.uHoverDirection = sphereHover.direction;
      shader.uniforms.uHoverStrength = sphereHover.strength;
      shader.uniforms.uHoverColor = sphereHover.color;
      shader.vertexShader = shader.vertexShader.replace("#include <common>",
        "#include <common>\nvarying vec3 vSphereDirection;")
        .replace("#include <begin_vertex>",
          "#include <begin_vertex>\nvSphereDirection = normalize(position);");
      shader.fragmentShader = shader.fragmentShader.replace("#include <common>",
        "#include <common>\nvarying vec3 vSphereDirection;\nuniform vec3 uHoverDirection;\nuniform float uHoverStrength;\nuniform vec3 uHoverColor;")
        .replace("#include <color_fragment>", `#include <color_fragment>
          float hoverPatch = smoothstep(0.35, 0.95, dot(normalize(vSphereDirection), normalize(uHoverDirection)));
          diffuseColor.rgb = mix(diffuseColor.rgb, uHoverColor, hoverPatch * uHoverStrength);
        `);
    };
    const geometry = new THREE.BoxGeometry(0.47, 0.47, 0.47);
    const pieces: THREE.Mesh<THREE.BoxGeometry, THREE.MeshStandardMaterial>[] = [];
    const highlights: number[] = [];
    // Separate hover deformation from the existing assembly animation.
    const distortions: THREE.Group[] = [];
    for (let x = -1; x <= 1; x++) for (let y = -1; y <= 1; y++) for (let z = -1; z <= 1; z++) {
      if (x === 0 && y === 0 && z === 0) continue;
      const piece = new THREE.Mesh(geometry, new THREE.MeshStandardMaterial({
        color: baseColor, metalness: 0.8, roughness: 0.28,
        emissive: hoverColor, emissiveIntensity: 0,
      }));
      piece.position.set(x * 0.53, y * 0.53, z * 0.53);
      pieces.push(piece);
      highlights.push(0);
      const distortion = new THREE.Group();
      distortion.add(piece);
      distortions.push(distortion);
      core.add(distortion);
    }
    const nucleus = new THREE.Mesh(new THREE.SphereGeometry(0.36, 32, 24), glow);
    core.add(nucleus);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const animations: ReturnType<typeof animate>[] = [];
    if (!reduced.matches) {
      animations.push(animate(core, { rotateY: [0, 360], rotateZ: [0, 180], duration: 32000, loop: true, ease: "linear" }));
      pieces.forEach((piece, i) => {
        animations.push(animate(piece, {
          x: [piece.position.x, piece.position.x * 1.8],
          y: [piece.position.y, piece.position.y * 1.8],
          z: [piece.position.z, piece.position.z * 1.8],
          duration: 2600, delay: stagger(45)(piece, i, pieces),
          alternate: true, loop: true, loopDelay: 900, ease: "inOutQuint",
        }));
      });
    }
    const pointer = new THREE.Vector2();
    const projected = new THREE.Vector3();
    const sphereCenter = new THREE.Vector3();
    const sphereTarget = new THREE.Vector3();
    const sphereFacing = new THREE.Vector3();
    let hovering = false;
    let previousFrame = performance.now();
    const move = (event: PointerEvent) => {
      if (event.pointerType === "touch" || reduced.matches) return;
      const bounds = element.getBoundingClientRect();
      pointer.set((event.clientX - bounds.left) / bounds.width * 2 - 1,
        1 - (event.clientY - bounds.top) / bounds.height * 2);
      hovering = true;
    };
    const leave = () => { hovering = false; };
    element.addEventListener("pointermove", move);
    element.addEventListener("pointerleave", leave);
    element.addEventListener("pointercancel", leave);
    const render = () => {
      const now = performance.now();
      const ease = reduced.matches ? 1 : 1 - Math.exp(-Math.min(now - previousFrame, 64) / 120);
      previousFrame = now;
      const active = hovering && !reduced.matches && !document.hidden;
      tilt.rotation.x = THREE.MathUtils.lerp(tilt.rotation.x, 0.35 + (active ? -pointer.y * 0.16 : 0), ease);
      tilt.rotation.y = THREE.MathUtils.lerp(tilt.rotation.y, active ? pointer.x * 0.22 : 0, ease);
      scene.updateMatrixWorld(true);
      nucleus.getWorldPosition(sphereCenter);
      projected.copy(sphereCenter).project(camera);
      const sphereDistance = Math.hypot((projected.x - pointer.x) * camera.aspect, projected.y - pointer.y);
      const sphereStrength = active ? Math.max(0, 1 - sphereDistance / 1.2) : 0;
      sphereHover.strength.value = THREE.MathUtils.lerp(sphereHover.strength.value, sphereStrength, ease);
      if (active) {
        // Project the pointer onto the nucleus plane, biased toward its visible face.
        sphereTarget.set(pointer.x, pointer.y, projected.z).unproject(camera);
        sphereFacing.copy(camera.position).sub(sphereCenter).normalize().multiplyScalar(0.3);
        sphereTarget.add(sphereFacing);
        nucleus.worldToLocal(sphereTarget).normalize();
        sphereHover.direction.value.lerp(sphereTarget, ease).normalize();
      }
      pieces.forEach((piece, index) => {
        piece.getWorldPosition(projected).project(camera);
        const distance = Math.hypot((projected.x - pointer.x) * camera.aspect, projected.y - pointer.y);
        const force = active ? Math.pow(Math.max(0, 1 - distance / 0.65), 2) : 0;
        highlights[index] = THREE.MathUtils.lerp(highlights[index], Math.min(1, force * 1.8), ease);
        highlightColor.copy(baseColor).lerp(hoverColor, highlights[index]);
        piece.material.color.copy(highlightColor);
        piece.material.emissiveIntensity = highlights[index] * 0.35;
        const distortion = distortions[index];
        const length = piece.position.length() || 1;
        distortion.position.x = THREE.MathUtils.lerp(distortion.position.x, piece.position.x / length * force * 0.28, ease);
        distortion.position.y = THREE.MathUtils.lerp(distortion.position.y, piece.position.y / length * force * 0.28, ease);
        distortion.position.z = THREE.MathUtils.lerp(distortion.position.z, piece.position.z / length * force * 0.28, ease);
        distortion.rotation.x = THREE.MathUtils.lerp(distortion.rotation.x, force * 0.22, ease);
        distortion.rotation.z = THREE.MathUtils.lerp(distortion.rotation.z, -force * 0.18, ease);
        distortion.scale.set(1 + force * 0.1, 1 - force * 0.08, 1 + force * 0.1);
      });
      renderer.render(scene, camera);
    };
    const resize = new ResizeObserver(() => {
      const { width, height } = element.getBoundingClientRect();
      if (!width || !height) return;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      // Enlarge the artwork without changing the hero columns or copy layout.
      // Ease the zoom on narrow canvases so the expanding pieces still fit.
      camera.zoom = 1.35 * Math.min(1, camera.aspect);
      camera.updateProjectionMatrix();
      render();
    });
    resize.observe(element);
    const timer = createTimer({ autoplay: !reduced.matches, onUpdate: render });
    let visible = true;
    const sync = () => {
      const running = visible && !document.hidden && !reduced.matches;
      animations.forEach(a => running ? a.resume() : a.pause());
      if (running) timer.resume(); else { timer.pause(); render(); }
    };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); });
    observer.observe(element);
    document.addEventListener("visibilitychange", sync);
    reduced.addEventListener("change", sync);
    render();
    return () => {
      resize.disconnect(); observer.disconnect(); timer.cancel();
      animations.forEach(a => a.cancel());
      element.removeEventListener("pointermove", move);
      element.removeEventListener("pointerleave", leave);
      element.removeEventListener("pointercancel", leave);
      document.removeEventListener("visibilitychange", sync);
      reduced.removeEventListener("change", sync);
      scene.traverse(object => {
        if (object instanceof THREE.Mesh || object instanceof THREE.Points) {
          object.geometry.dispose();
          const materials = Array.isArray(object.material) ? object.material : [object.material];
          materials.forEach(material => material.dispose());
        }
      });
      renderer.dispose(); renderer.domElement.remove();
    };
  }, []);

  return (
    <div className="inspection-artifact" aria-hidden="true">
      <div ref={host} className="artifact-canvas" />
      <div className="artifact-callouts">
        <svg className="artifact-callout-lines" viewBox="0 0 100 100" preserveAspectRatio="none" focusable="false">
          <path d="M 6 15 H 30 L 40 29 M 68 34 L 78 24 H 94 M 6 76 H 26 L 36 64 M 62 72 L 72 85 H 94" />
          <circle cx="40" cy="29" r="0.65" />
          <circle cx="68" cy="34" r="0.65" />
          <circle cx="36" cy="64" r="0.65" />
          <circle cx="62" cy="72" r="0.65" />
        </svg>
        <span className="artifact-callout artifact-callout--inspection">Inspection &amp; testing</span>
        <span className="artifact-callout artifact-callout--training">Technical training</span>
        <span className="artifact-callout artifact-callout--calibration">Precision calibration</span>
        <span className="artifact-callout artifact-callout--certification">Traceable certification</span>
      </div>
    </div>
  );
}

