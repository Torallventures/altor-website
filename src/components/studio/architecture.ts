export type Point3 = readonly [number, number, number];
export type Stroke = { points: Point3[]; weight: number; kind: "frame" | "detail" | "connection" };
export type Dust = { x: number; y: number; radius: number; depth: number; phase: number };

/** Authored interface geometry: one website, one forms surface, one operations view. */
export function createArchitecture() {
  const strokes: Stroke[] = [];
  const nodes: Point3[] = [];
  const path = (points: Point3[], kind: Stroke["kind"] = "detail", weight = 1) =>
    strokes.push({ points, kind, weight });
  const line = (x: number, y: number, z: number, length: number, weight = 1) =>
    path(
      [
        [x, y, z],
        [x + length, y, z],
      ],
      "detail",
      weight,
    );
  const rect = (
    x: number,
    y: number,
    z: number,
    w: number,
    h: number,
    kind: Stroke["kind"] = "detail",
  ) =>
    path(
      [
        [x, y, z],
        [x + w, y, z],
        [x + w, y + h, z],
        [x, y + h, z],
        [x, y, z],
      ],
      kind,
    );
  const browser = (x: number, y: number, z: number, w: number, h: number) => {
    rect(x, y, z, w, h, "frame");
    line(x, y + 23, z, w);
    for (let i = 0; i < 3; i++) nodes.push([x + 12 + i * 9, y + 12, z]);
    line(x + w * 0.4, y + 12, z, w * 0.29, 0.65);
  };
  // Public website: navigation, editorial hero, action and three feature modules.
  browser(-215, -150, 0, 470, 310);
  rect(-193, -108, 0, 17, 17);
  line(-166, -102, 0, 42, 1.2);
  line(-166, -94, 0, 30, 0.6);
  for (let i = 0; i < 3; i++) line(12 + i * 48, -100, 0, 27, 0.8);
  rect(169, -109, 0, 61, 18);
  line(-190, -58, 0, 144, 1.8);
  line(-190, -44, 0, 122, 1.8);
  for (let i = 0; i < 3; i++) line(-190, -15 + i * 9, 0, 136 - i * 15, 0.7);
  rect(-190, 30, 0, 71, 21);
  line(-177, 40, 0, 39, 0.8);
  rect(4, -68, 0, 225, 126);
  for (let i = 0; i < 7; i++)
    path(
      [
        [22 + i * 27, 57, 0],
        [22 + i * 27, -30 - i * 3, 0],
        [43 + i * 27, -48 - i * 2, 0],
        [43 + i * 27, 57, 0],
      ],
      "detail",
      0.45,
    );
  for (let i = 0; i < 3; i++) {
    const x = -190 + i * 146;
    rect(x, 83, 0, 128, 35);
    line(x, 131, 0, 91, 0.9);
    line(x, 141, 0, 64, 0.5);
  }
  // Forms surface, behind the website plane.
  browser(-20, -334, 100, 244, 142);
  line(0, -294, 100, 98, 1.3);
  for (let row = 0; row < 2; row++)
    for (let col = 0; col < 2; col++) {
      const x = col * 108,
        y = -278 + row * 34;
      line(x, y, 100, 43, 0.6);
      rect(x, y + 8, 100, 94, 17);
    }
  rect(132, -216, 100, 71, 13);
  // Operations surface, in front: sidebar, table, status cells.
  browser(-470, 122, -75, 286, 176);
  path(
    [
      [-412, 145, -75],
      [-412, 298, -75],
    ],
    "detail",
    0.65,
  );
  for (let row = 0; row < 5; row++) line(-456, 163 + row * 22, -75, row === 0 ? 31 : 23, 0.75);
  line(-396, 163, -75, 111, 1.3);
  for (let row = 0; row < 4; row++) {
    const y = 187 + row * 25;
    rect(-395, y, -75, 7, 7);
    line(-378, y + 3, -75, 73 - row * 7, 0.6);
    line(-286, y + 3, -75, 26, 0.5);
    rect(-240, y - 2, -75, 36, 12);
    line(-395, y + 16, -75, 191, 0.4);
  }
  // Routed paths connect deliberate anchors rather than every point to every point.
  path(
    [
      [120, -192, 100],
      [120, -172, 100],
      [120, -172, 0],
      [120, -150, 0],
    ],
    "connection",
  );
  path(
    [
      [-215, 58, 0],
      [-302, 58, 0],
      [-302, 95, -75],
      [-302, 122, -75],
    ],
    "connection",
  );
  path(
    [
      [255, 105, 0],
      [315, 105, 0],
      [315, 230, -75],
      [-184, 230, -75],
    ],
    "connection",
  );
  path(
    [
      [-470, 250, -75],
      [-540, 250, -75],
      [-590, 205, 0],
      [-710, 205, 0],
    ],
    "connection",
    0.45,
  );
  nodes.push(
    [120, -192, 100],
    [120, -150, 0],
    [-215, 58, 0],
    [-302, 122, -75],
    [255, 105, 0],
    [-184, 230, -75],
    [-470, 250, -75],
    [-710, 205, 0],
  );
  return { strokes, nodes };
}

export function qualityFor(width: number, height: number, pixelRatio = 1) {
  const mobile = width < 700;
  return {
    count: Math.min(
      mobile ? 260 : 1100,
      Math.max(180, Math.round((width * height) / (mobile ? 1500 : 1450))),
    ),
    dpr: Math.min(pixelRatio, mobile ? 1.5 : 2),
    fps: mobile ? 30 : 40,
  };
}

export function createDust(count: number): Dust[] {
  let state = 87319;
  const random = () => {
    state = (Math.imul(state, 1664525) + 1013904223) >>> 0;
    return state / 4294967296;
  };
  // Stratification guarantees coverage behind both the content and the scene.
  const columns = 24,
    rows = Math.ceil(count / columns);
  return Array.from({ length: count }, (_, index) => ({
    x: ((index % columns) + random()) / columns,
    y: (Math.floor(index / columns) + random()) / rows,
    radius: 0.35 + random() * 0.65,
    depth: random(),
    phase: random() * Math.PI * 2,
  }));
}

export function project(point: Point3, width: number, height: number, time = 0) {
  const mobile = width < 700;
  const yaw = -0.31 + Math.sin(time * 0.12) * 0.018;
  const pitch = 0.16 + Math.sin(time * 0.09) * 0.012;
  const x = point[0] * Math.cos(yaw) + point[2] * Math.sin(yaw);
  const depth = -point[0] * Math.sin(yaw) + point[2] * Math.cos(yaw);
  const y = point[1] * Math.cos(pitch) - depth * Math.sin(pitch);
  const z = point[1] * Math.sin(pitch) + depth * Math.cos(pitch);
  const perspective = 1150 / (1150 + z);
  const scale = mobile ? Math.min(width / 620, 0.72) : Math.min(width / 1440, height / 900) * 1.16;
  const tilt = -0.075;
  const cx = width * (mobile ? 0.55 : 0.79);
  const cy = height * (mobile ? 0.86 : 0.51);
  return {
    x: cx + (x * Math.cos(tilt) - y * Math.sin(tilt)) * perspective * scale,
    y: cy + (x * Math.sin(tilt) + y * Math.cos(tilt)) * perspective * scale,
  };
}

export const architecture = createArchitecture();
