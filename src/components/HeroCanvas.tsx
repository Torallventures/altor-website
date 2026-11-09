import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Altor hero scene: a starfield shell around a particle "data core"
 * sampled from a parametric torus-knot geometry, orbited by a faint
 * wireframe icosahedron — rendered in court green on the dark hero band.
 * Purely decorative — the DOM glow underneath ensures the hero is
 * never a black canvas.
 */
export function HeroCanvas() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch {
      return; // WebGL unavailable — CSS poster remains visible
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      50,
      mount.clientWidth / mount.clientHeight,
      0.1,
      300
    );
    camera.position.set(0, 0, 34);

    const group = new THREE.Group();
    scene.add(group);

    // Starfield: points scattered on a large spherical shell
    const starCount = 1600;
    const starPositions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      // Uniform directions on a sphere, radius jittered between 70 and 130
      const u = Math.random() * 2 - 1;
      const theta = Math.random() * Math.PI * 2;
      const r = 70 + Math.random() * 60;
      const s = Math.sqrt(1 - u * u);
      starPositions[i * 3] = r * s * Math.cos(theta);
      starPositions[i * 3 + 1] = r * u;
      starPositions[i * 3 + 2] = r * s * Math.sin(theta);
    }
    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute("position", new THREE.BufferAttribute(starPositions, 3));
    const starMat = new THREE.PointsMaterial({
      color: new THREE.Color("hsl(150, 25%, 85%)"),
      size: 0.28,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const stars = new THREE.Points(starGeo, starMat);
    group.add(stars);

    // Particle core: positions sampled from a parametric torus knot.
    // Lighter court green, additive-blended so it glows on the dark band.
    const knot = new THREE.TorusKnotGeometry(10, 3.2, 320, 48);
    const base = knot.getAttribute("position");
    const count = base.count;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = base.getX(i);
      positions[i * 3 + 1] = base.getY(i);
      positions[i * 3 + 2] = base.getZ(i);
    }
    const pointsGeo = new THREE.BufferGeometry();
    pointsGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const pointsMat = new THREE.PointsMaterial({
      color: new THREE.Color("hsl(151, 38%, 74%)"),
      size: 0.11,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const points = new THREE.Points(pointsGeo, pointsMat);
    group.add(points);

    // Inner wireframe shell
    const shell = new THREE.LineSegments(
      new THREE.WireframeGeometry(new THREE.IcosahedronGeometry(6.5, 1)),
      new THREE.LineBasicMaterial({
        color: new THREE.Color("hsl(151, 30%, 62%)"),
        transparent: true,
        opacity: 0.2,
      })
    );
    group.add(shell);

    group.rotation.x = 0.55;
    group.rotation.z = -0.25;

    // Mouse parallax (skipped for reduced motion)
    const target = { x: 0, y: 0 };
    const onPointer = (e: PointerEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      target.x = nx * 2.4;
      target.y = -ny * 1.6;
    };
    if (!reduced) window.addEventListener("pointermove", onPointer);

    const onResize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      if (reduced) renderer.render(scene, camera);
    };
    window.addEventListener("resize", onResize);

    let raf = 0;
    const clock = new THREE.Clock();
    const animate = () => {
      raf = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();
      group.rotation.y = t * 0.08;
      stars.rotation.y = t * 0.012;
      shell.rotation.y = -t * 0.12;
      shell.rotation.x = t * 0.05;
      const breathe = 1 + Math.sin(t * 0.6) * 0.03;
      points.scale.setScalar(breathe);
      pointsMat.opacity = 0.7 + Math.sin(t * 0.6) * 0.15;
      starMat.opacity = 0.65 + Math.sin(t * 0.9) * 0.15; // gentle twinkle
      camera.position.x += (target.x - camera.position.x) * 0.04;
      camera.position.y += (target.y - camera.position.y) * 0.04;
      camera.lookAt(0, 0, 0);
      renderer.render(scene, camera);
    };

    if (reduced) {
      renderer.render(scene, camera); // one static frame
    } else {
      animate();
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("resize", onResize);
      starGeo.dispose();
      starMat.dispose();
      knot.dispose();
      pointsGeo.dispose();
      pointsMat.dispose();
      shell.geometry.dispose();
      (shell.material as THREE.Material).dispose();
      renderer.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0"
    />
  );
}
