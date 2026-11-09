import { useEffect, useRef } from "react";
import * as THREE from "three";

const VERT = /* glsl */ `
  void main() {
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const FRAG = /* glsl */ `
  precision highp float;
  uniform float uTime;
  uniform vec2 uRes;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
      mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
      u.y
    );
  }

  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    mat2 rot = mat2(0.8, 0.6, -0.6, 0.8);
    for (int i = 0; i < 5; i++) {
      v += a * noise(p);
      p = rot * p * 2.0 + vec2(11.5);
      a *= 0.5;
    }
    return v;
  }

  void main() {
    vec2 uv = (gl_FragCoord.xy - 0.5 * uRes) / uRes.y;

    float t = uTime * 0.025;
    // Domain-warped fbm: nebula smoke folding into itself, always drifting
    vec2 q = vec2(
      fbm(uv * 1.6 + vec2(0.0, t)),
      fbm(uv * 1.6 + vec2(5.2, t * 0.8))
    );
    float f = fbm(uv * 2.2 + 2.5 * q + vec2(t * 0.5, -t * 0.3));

    // Deep space ramp: near-black pockets, dim court-green/grey glow
    float smoke = smoothstep(0.35, 0.95, f);
    vec3 deep = vec3(0.012, 0.020, 0.028);
    vec3 glow = vec3(0.145, 0.220, 0.190);
    vec3 col = mix(deep, glow, smoke);
    // faint cool blue in the thickest smoke
    col += vec3(0.02, 0.04, 0.06) * smoothstep(0.75, 1.0, f);

    // Vignette keeps the edges calm
    float vig = 1.0 - smoothstep(0.4, 1.3, length(uv));
    col *= mix(0.6, 1.0, vig);

    gl_FragColor = vec4(col, 1.0);
  }
`;

type Meteor = {
  mesh: THREE.Mesh;
  mat: THREE.MeshBasicMaterial;
  dir: THREE.Vector3;
  active: boolean;
  start: number;
  next: number;
};

/**
 * Page background: deep space. Always-drifting nebula smoke (domain-
 * warped fbm shader), two parallax star layers with twinkle, and
 * shooting stars streaking through every few seconds. Sits fixed
 * behind all content below the hero; the hero paints over it with
 * its own scene. Purely decorative.
 */
export function NebulaBackground() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch {
      return; // WebGL unavailable — plain background color remains
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

    // Nebula backdrop: one large shader quad far behind
    const uniforms = {
      uTime: { value: 0 },
      uRes: { value: new THREE.Vector2(mount.clientWidth, mount.clientHeight) },
    };
    const nebula = new THREE.Mesh(
      new THREE.PlaneGeometry(280, 170),
      new THREE.ShaderMaterial({
        vertexShader: VERT,
        fragmentShader: FRAG,
        uniforms,
        depthWrite: false,
      })
    );
    nebula.position.z = -90;
    scene.add(nebula);

    // Two star layers on spherical shells — different radii, speeds, sizes
    const makeStars = (count: number, rMin: number, rMax: number, size: number, opacity: number) => {
      const positions = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        const u = Math.random() * 2 - 1;
        const theta = Math.random() * Math.PI * 2;
        const r = rMin + Math.random() * (rMax - rMin);
        const s = Math.sqrt(1 - u * u);
        positions[i * 3] = r * s * Math.cos(theta);
        positions[i * 3 + 1] = r * u;
        positions[i * 3 + 2] = r * s * Math.sin(theta);
      }
      const geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      const mat = new THREE.PointsMaterial({
        color: new THREE.Color("hsl(150, 12%, 88%)"),
        size,
        sizeAttenuation: true,
        transparent: true,
        opacity,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const points = new THREE.Points(geo, mat);
      scene.add(points);
      return { geo, mat, points };
    };

    const farStars = makeStars(1200, 80, 140, 0.22, 0.55);
    const nearStars = makeStars(500, 40, 65, 0.4, 0.85);

    // Shooting stars: a small pool of streaks that fire on a schedule
    const meteors: Meteor[] = [];
    const meteorGeo = new THREE.PlaneGeometry(8, 0.09);
    for (let i = 0; i < 3; i++) {
      const mat = new THREE.MeshBasicMaterial({
        color: new THREE.Color("hsl(150, 40%, 85%)"),
        transparent: true,
        opacity: 0,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        side: THREE.DoubleSide,
      });
      const mesh = new THREE.Mesh(meteorGeo, mat);
      mesh.visible = false;
      mesh.position.z = -10;
      scene.add(mesh);
      meteors.push({
        mesh,
        mat,
        dir: new THREE.Vector3(),
        active: false,
        start: 0,
        next: 1.5 + i * 2.5 + Math.random() * 3,
      });
    }

    const launchMeteor = (m: Meteor, t: number) => {
      m.active = true;
      m.start = t;
      m.mesh.visible = true;
      m.mesh.position.set(-40 + Math.random() * 80, 18 + Math.random() * 30, -10);
      // Diagonal streak, mostly downward-left or down-right
      const angle = Math.PI + (Math.random() - 0.5) * 0.9; // ~180° ± 26°
      m.dir.set(Math.cos(angle), Math.sin(angle) * 0.6, 0).normalize();
      if (Math.random() > 0.5) m.dir.x *= -1;
      m.mesh.rotation.z = Math.atan2(m.dir.y, m.dir.x);
    };

    const onResize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      uniforms.uRes.value.set(w, h);
      if (reduced) renderer.render(scene, camera);
    };
    window.addEventListener("resize", onResize);

    let raf = 0;
    const clock = new THREE.Clock();
    const animate = () => {
      raf = requestAnimationFrame(animate);
      const dt = clock.getDelta();
      const t = clock.elapsedTime;

      uniforms.uTime.value = t;

      farStars.points.rotation.y = t * 0.006;
      nearStars.points.rotation.y = -t * 0.011;
      nearStars.points.rotation.x = t * 0.004;
      farStars.mat.opacity = 0.45 + Math.sin(t * 0.7) * 0.12;
      nearStars.mat.opacity = 0.7 + Math.sin(t * 1.3 + 1.7) * 0.15;

      for (const m of meteors) {
        if (!m.active) {
          if (t >= m.next) launchMeteor(m, t);
          continue;
        }
        const life = (t - m.start) / 1.4; // 1.4s streak
        if (life >= 1) {
          m.active = false;
          m.mesh.visible = false;
          m.mat.opacity = 0;
          m.next = t + 2.5 + Math.random() * 5;
          continue;
        }
        m.mesh.position.addScaledVector(m.dir, dt * 55);
        // Fade in fast, fade out smooth
        m.mat.opacity = life < 0.15 ? life / 0.15 : 1 - (life - 0.15) / 0.85;
      }

      renderer.render(scene, camera);
    };

    if (reduced) {
      renderer.render(scene, camera); // one static frame
    } else {
      animate();
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      farStars.geo.dispose();
      farStars.mat.dispose();
      nearStars.geo.dispose();
      nearStars.mat.dispose();
      for (const m of meteors) m.mat.dispose();
      meteorGeo.dispose();
      nebula.geometry.dispose();
      (nebula.material as THREE.Material).dispose();
      renderer.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0"
    />
  );
}
