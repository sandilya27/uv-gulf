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
    const metal = new THREE.MeshStandardMaterial({ color: 0x377b9b, metalness: 0.8, roughness: 0.28 });
    const glow = new THREE.MeshBasicMaterial({ color: 0x76d8ff });
    const geometry = new THREE.BoxGeometry(0.47, 0.47, 0.47);
    const pieces: THREE.Mesh[] = [];
    for (let x = -1; x <= 1; x++) for (let y = -1; y <= 1; y++) for (let z = -1; z <= 1; z++) {
      if (x === 0 && y === 0 && z === 0) continue;
      const piece = new THREE.Mesh(geometry, metal);
      piece.position.set(x * 0.53, y * 0.53, z * 0.53);
      pieces.push(piece);
      core.add(piece);
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
    const render = () => renderer.render(scene, camera);
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
    </div>
  );
}

