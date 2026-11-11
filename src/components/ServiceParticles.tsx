import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";

type Point = [number, number];
type Segment = [number, number, number, number];

// Original diagrams sampled into points, never rendered as words or solid icons.
function diagrams(): Segment[][] {
  const rect = (x: number, y: number, w: number, h: number): Segment[] => [
    [x, y, x + w, y], [x + w, y, x + w, y + h],
    [x + w, y + h, x, y + h], [x, y + h, x, y],
  ];
  const browser = (x: number, y: number, w: number, h: number): Segment[] => [
    ...rect(x, y, w, h), [x, y + 30, x + w, y + 30],
    ...rect(x + 25, y + 60, w * .43, h * .42),
    [x + w * .57, y + 66, x + w - 25, y + 66],
    [x + w * .57, y + 87, x + w - 45, y + 87],
    ...rect(x + w * .57, y + 116, w * .26, 24),
    [x + 25, y + h - 30, x + w - 25, y + h - 30],
  ];
  const phone = (x: number, y: number): Segment[] => [
    ...rect(x, y, 122, 225), [x + 40, y + 17, x + 82, y + 17],
    ...rect(x + 15, y + 45, 92, 65),
    [x + 24, y + 96, x + 43, y + 79], [x + 43, y + 79, x + 63, y + 88],
    [x + 63, y + 88, x + 94, y + 60],
    ...[137, 162, 187].flatMap(d => [[x + 17, y + d, x + 104, y + d] as Segment]),
    [x + 42, y + 211, x + 80, y + 211],
  ];
  const buildings = (x: number, y: number): Segment[] => {
    const lines: Segment[] = [];
    [0, 92, 184].forEach((dx, i) => {
      const height = [148, 235, 180][i];
      lines.push(...rect(x + dx, y - height, 72, height));
      for (let row = 28; row < height - 15; row += 32) {
        lines.push(...rect(x + dx + 16, y - height + row, 10, 10), ...rect(x + dx + 46, y - height + row, 10, 10));
      }
    });
    lines.push([x - 25, y, x + 280, y]);
    return lines;
  };
  const dashboard: Segment[] = [
    ...rect(240, 210, 450, 280), [240, 242, 690, 242], [290, 242, 290, 490],
    ...rect(315, 266, 94, 44), ...rect(435, 266, 94, 44), ...rect(555, 266, 109, 44),
    ...[42, 72, 58, 100, 124, 152].flatMap((h, i) => rect(325 + i * 53, 463 - h, 27, h)),
  ];
  const network: Segment[] = [];
  const nodes: Point[] = [[450, 330], [240, 190], [650, 150], [730, 400], [490, 570], [200, 480]];
  nodes.forEach(([x, y], i) => {
    network.push(...rect(x - 26, y - 26, 52, 52));
    if (i) network.push([450, 330, x, y]);
    const next = nodes[(i + 1) % nodes.length];
    network.push([x, y, next[0], next[1]]);
  });
  return [
    [...browser(100, 125, 425, 265), ...phone(650, 160), ...buildings(380, 620)],
    [...dashboard, ...phone(745, 310), ...browser(100, 65, 270, 165)],
    [...network, ...phone(800, 190), ...buildings(65, 660)],
  ];
}

function sample(lines: Segment[], count: number): Float32Array {
  const lengths = lines.map(([x, y, x2, y2]) => Math.hypot(x2 - x, y2 - y));
  const total = lengths.reduce((a, b) => a + b, 0);
  const points = new Float32Array(count * 2);
  let segment = 0;
  let start = 0;
  for (let i = 0; i < count; i++) {
    const distance = (i + .5) / count * total;
    while (segment < lines.length - 1 && distance > start + lengths[segment]) start += lengths[segment++];
    const t = (distance - start) / lengths[segment];
    const [x, y, x2, y2] = lines[segment];
    // A narrow cloud gives each diagram volume instead of a solid dotted outline.
    points[i * 2] = x + (x2 - x) * t + Math.sin(i * 17.13) * 3.5;
    points[i * 2 + 1] = y + (y2 - y) * t + Math.cos(i * 13.71) * 3.5;
  }
  return points;
}

export function ServiceParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pausedRef = useRef(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d", { alpha: true });
    if (!context) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let width = 0, height = 0, count = 0;
    let targets: Float32Array[] = [];
    let frame = 0, last = 0, time = 0;
    let visible = true;
    let disposed = false;
    const shapes = diagrams();

    function paint() {
      if (!context || !canvas) return;
      context.clearRect(0, 0, width, height);
      const chapter = time / 10;
      const current = Math.floor(chapter) % targets.length;
      const progress = Math.max(0, Math.min(1, ((chapter % 1) - .56) / .44));
      const blend = progress * progress * (3 - 2 * progress);
      const scatter = Math.sin(blend * Math.PI) * 50;
      const source = targets[current], destination = targets[(current + 1) % targets.length];
      const scale = Math.min(width * (width < 768 ? 1.15 : .82) / 1000, height * .8 / 700);
      const centerX = width * (width < 768 ? .64 : .74);
      const centerY = height * (width < 768 ? .36 : .45);
      canvas.dataset.design = String(current);
      for (let i = 0; i < count; i++) {
        const phase = i * 2.39996;
        const drift = motion.matches ? 0 : Math.sin(time * .65 + phase) * 2;
        const x = centerX + (source[i * 2] * (1 - blend) + destination[i * 2] * blend - 500 + Math.cos(phase) * scatter + drift) * scale;
        const y = centerY + (source[i * 2 + 1] * (1 - blend) + destination[i * 2 + 1] * blend - 350 + Math.sin(phase) * scatter + drift) * scale;
        const fade = Math.min(1, Math.max(.08, (x / width - .15) / .55));
        context.globalAlpha = fade * (width < 768 ? .27 : .58) * (.5 + (i % 7) / 14);
        context.fillStyle = i % 4 ? "#A4C68A" : "#a39aac";
        const size = i % 13 === 0 ? 2 : 1.15;
        context.fillRect(x, y, size, size);
      }
      context.globalAlpha = 1;
    }

    function tick(now: number) {
      frame = 0;
      if (disposed || !visible || document.hidden || motion.matches || pausedRef.current) { last = 0; return; }
      if (last) time += Math.min((now - last) / 1000, .05);
      last = now;
      paint();
      frame = requestAnimationFrame(tick);
    }
    function resume() {
      if (!frame && !disposed) frame = requestAnimationFrame(tick);
    }
    function resize() {
      if (!canvas || !context) return;
      const bounds = canvas.getBoundingClientRect();
      width = bounds.width; height = bounds.height;
      const ratio = Math.min(devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(width * ratio); canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      const nextCount = width < 768 ? 2200 : 5200;
      if (count !== nextCount) { count = nextCount; targets = shapes.map(shape => sample(shape, count)); }
      canvas.dataset.particles = String(count);
      paint(); resume();
    }
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; if (visible) resume(); }, { threshold: .01 });
    observer.observe(canvas);
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    document.addEventListener("visibilitychange", resume);
    motion.addEventListener("change", resize);
    canvas.addEventListener("particle-playback", resume);
    resize();
    return () => {
      disposed = true; cancelAnimationFrame(frame);
      observer.disconnect(); resizeObserver.disconnect();
      document.removeEventListener("visibilitychange", resume);
      motion.removeEventListener("change", resize);
      canvas.removeEventListener("particle-playback", resume);
    };
  }, []);

  function toggle() {
    pausedRef.current = !pausedRef.current;
    setPaused(pausedRef.current);
    canvasRef.current?.dispatchEvent(new Event("particle-playback"));
  }

  return <>
    <canvas ref={canvasRef} aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full" />
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,hsl(var(--background)/.72),transparent_80%)]" />
    <button type="button" onClick={toggle} aria-label={paused ? "Play background animation" : "Pause background animation"} aria-pressed={paused} className="absolute bottom-5 right-6 z-20 grid h-10 w-10 place-items-center rounded-full border border-border/60 bg-background/50 text-muted-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring motion-reduce:hidden">
      {paused ? <Play className="h-3 w-3" aria-hidden="true" /> : <Pause className="h-3 w-3" aria-hidden="true" />}
    </button>
  </>;
}
