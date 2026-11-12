import { useEffect, useRef } from "react";
import { architecture, createDust, project, qualityFor } from "./architecture";

const desktopDust = createDust(350);
const mobileDust = createDust(180);

function ArchitectureFallback({ mobile = false }: { mobile?: boolean }) {
  const width = mobile ? 390 : 1440,
    height = mobile ? 844 : 900;
  const dust = mobile ? mobileDust : desktopDust;
  return (
    <svg
      className={`architecture-fallback ${mobile ? "is-mobile" : "is-desktop"}`}
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="xMidYMid slice"
    >
      <g fill="#dcebe5" opacity=".35">
        {dust.map((dot, index) => (
          <circle key={index} cx={dot.x * width} cy={dot.y * height} r={dot.radius} />
        ))}
      </g>
      <g fill="none" stroke="#aecfc2">
        {architecture.strokes.map((stroke, index) => (
          <polyline
            key={index}
            points={stroke.points
              .map((point) => {
                const p = project(point, width, height);
                return `${p.x},${p.y}`;
              })
              .join(" ")}
            strokeWidth={stroke.weight * 0.7}
            opacity={stroke.kind === "frame" ? 0.5 : 0.3}
          />
        ))}
      </g>
    </svg>
  );
}

export function DigitalArchitecture() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fieldRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current,
      field = fieldRef.current;
    if (!canvas || !field) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;
    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    let width = 1,
      height = 1,
      frame = 0,
      lastFrame = -Infinity,
      elapsed = 0,
      lastTime = 0;
    let visible = true;
    let quality = qualityFor(1440, 900);
    let dust = createDust(quality.count);

    const draw = (time: number, settled = false) => {
      ctx.clearRect(0, 0, width, height);
      const progress = settled ? 1 : Math.min(1, Math.max(0, (time - 0.4) / 2.1));
      const connections = settled ? 1 : Math.min(1, Math.max(0, (time - 2.5) / 1.5));
      for (const dot of dust) {
        const x = dot.x * width + Math.sin(time * 0.06 + dot.phase) * (2 + dot.depth * 6);
        const y = dot.y * height + Math.cos(time * 0.045 + dot.phase) * (2 + dot.depth * 4);
        const alpha =
          0.18 +
          dot.depth * 0.23 +
          Math.pow((Math.sin(time * 0.32 + dot.phase) + 1) / 2, 16) * 0.16;
        ctx.fillStyle = `rgba(220,235,229,${alpha})`;
        ctx.beginPath();
        ctx.arc(x, y, dot.radius, 0, Math.PI * 2);
        ctx.fill();
      }
      architecture.strokes.forEach((stroke, index) => {
        const formed = Math.min(
          1,
          Math.max(0, progress * 1.7 - (index / architecture.strokes.length) * 0.7),
        );
        const strength =
          stroke.kind === "connection"
            ? 0.08 + connections * 0.21
            : stroke.kind === "frame"
              ? 0.16 + formed * 0.43
              : 0.08 + formed * 0.28;
        const points = stroke.points.map((point) =>
          project(point, width, height, settled ? 0 : time),
        );
        ctx.beginPath();
        points.forEach((point, i) =>
          i ? ctx.lineTo(point.x, point.y) : ctx.moveTo(point.x, point.y),
        );
        ctx.strokeStyle = `rgba(174,207,194,${strength})`;
        ctx.lineWidth = stroke.weight * (stroke.kind === "frame" ? 0.9 : 0.7);
        ctx.stroke();
        if (stroke.kind === "connection" && connections > 0) {
          const position = ((time * 0.065 + index * 0.29) % 1) * (points.length - 1);
          const segment = Math.floor(position),
            f = position - segment;
          const a = points[segment],
            b = points[Math.min(segment + 1, points.length - 1)];
          const x = a.x + (b.x - a.x) * f,
            y = a.y + (b.y - a.y) * f;
          ctx.fillStyle = `rgba(217,240,227,${connections * 0.65})`;
          ctx.beginPath();
          ctx.arc(x, y, 1.25, 0, Math.PI * 2);
          ctx.fill();
        }
      });
      architecture.nodes.forEach((node, index) => {
        const point = project(node, width, height, settled ? 0 : time);
        const light = 0.5 + 0.5 * Math.sin(time * 0.55 + index * 2.1);
        ctx.fillStyle = `rgba(220,242,231,${0.35 + light * 0.42})`;
        ctx.beginPath();
        ctx.arc(point.x, point.y, index < 9 ? 1.1 : 1.65, 0, Math.PI * 2);
        ctx.fill();
        if (index >= 9) {
          ctx.strokeStyle = `rgba(168,215,197,${light * 0.13})`;
          ctx.lineWidth = 0.6;
          ctx.beginPath();
          ctx.arc(point.x, point.y, 4 + light * 2, 0, Math.PI * 2);
          ctx.stroke();
        }
      });
      field.dataset.ready = "true";
    };

    const tick = (now: number) => {
      if (lastTime) elapsed += Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;
      if (now - lastFrame >= 1000 / quality.fps) {
        draw(elapsed);
        lastFrame = now;
      }
      frame = requestAnimationFrame(tick);
    };
    const sync = () => {
      cancelAnimationFrame(frame);
      lastTime = 0;
      if (motion.matches) {
        draw(0, true);
        return;
      }
      if (visible && !document.hidden) frame = requestAnimationFrame(tick);
    };
    const resize = () => {
      const bounds = field.getBoundingClientRect();
      width = bounds.width;
      height = bounds.height;
      quality = qualityFor(width, height, devicePixelRatio || 1);
      dust = createDust(quality.count);
      canvas.width = Math.round(width * quality.dpr);
      canvas.height = Math.round(height * quality.dpr);
      ctx.setTransform(quality.dpr, 0, 0, quality.dpr, 0, 0);
      draw(elapsed, motion.matches);
    };
    const resizeObserver = new ResizeObserver(resize);
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        sync();
      },
      { threshold: 0 },
    );
    resize();
    resizeObserver.observe(field);
    observer.observe(field);
    motion.addEventListener("change", sync);
    document.addEventListener("visibilitychange", sync);
    sync();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      resizeObserver.disconnect();
      motion.removeEventListener("change", sync);
      document.removeEventListener("visibilitychange", sync);
      delete field.dataset.ready;
    };
  }, []);

  return (
    <div className="architecture-field" ref={fieldRef} aria-hidden="true">
      <ArchitectureFallback />
      <ArchitectureFallback mobile />
      <canvas ref={canvasRef} />
    </div>
  );
}
