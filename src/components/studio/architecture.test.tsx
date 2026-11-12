import { describe, expect, it, vi, afterEach } from "vitest";
import { act, render } from "@testing-library/react";
import { DigitalArchitecture } from "./DigitalArchitecture";
import { createDust, qualityFor, project, architecture } from "./architecture";

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

describe("Digital Architecture coverage and quality", () => {
  it.each([
    [1440, 900],
    [1920, 1080],
    [1024, 768],
    [390, 844],
    [360, 800],
  ])("covers the entire %i × %i hero", (width, height) => {
    const points = createDust(qualityFor(width, height, 3).count);
    for (let column = 0; column < 4; column++)
      for (let row = 0; row < 4; row++) {
        expect(
          points.some(
            (p) =>
              p.x >= column / 4 && p.x < (column + 1) / 4 && p.y >= row / 4 && p.y < (row + 1) / 4,
          ),
        ).toBe(true);
      }
    expect(
      architecture.strokes
        .flatMap((s) => s.points)
        .map((p) => project(p, width, height))
        .every((p) => Number.isFinite(p.x) && Number.isFinite(p.y)),
    ).toBe(true);
  });
  it("caps pixel density, point count and frame rate on small devices", () => {
    expect(qualityFor(390, 844, 3)).toEqual({ count: 219, dpr: 1.5, fps: 30 });
    expect(qualityFor(3840, 2160, 3)).toEqual({ count: 1100, dpr: 2, fps: 40 });
  });
});

function environment(reduced = false) {
  let motionChange = () => {};
  let intersection: IntersectionObserverCallback = () => {};
  const cancel = vi.fn(),
    request = vi.fn(() => 1),
    resizeDisconnect = vi.fn(),
    intersectDisconnect = vi.fn();
  const removeMotion = vi.fn();
  const motion = {
    matches: reduced,
    addEventListener: vi.fn((_event, callback) => {
      motionChange = callback;
    }),
    removeEventListener: removeMotion,
  };
  vi.stubGlobal("matchMedia", () => motion);
  vi.stubGlobal("requestAnimationFrame", request);
  vi.stubGlobal("cancelAnimationFrame", cancel);
  vi.stubGlobal(
    "ResizeObserver",
    class {
      observe() {}
      disconnect = resizeDisconnect;
    },
  );
  vi.stubGlobal(
    "IntersectionObserver",
    class {
      constructor(callback: IntersectionObserverCallback) {
        intersection = callback;
      }
      observe() {}
      disconnect = intersectDisconnect;
    },
  );
  const ctx = {
    clearRect: vi.fn(),
    setTransform: vi.fn(),
    beginPath: vi.fn(),
    arc: vi.fn(),
    fill: vi.fn(),
    moveTo: vi.fn(),
    lineTo: vi.fn(),
    stroke: vi.fn(),
  };
  vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockReturnValue(
    ctx as unknown as CanvasRenderingContext2D,
  );
  vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockReturnValue({
    width: 1440,
    height: 900,
    x: 0,
    y: 0,
    top: 0,
    bottom: 900,
    left: 0,
    right: 1440,
    toJSON: () => ({}),
  });
  return {
    request,
    cancel,
    ctx,
    motion,
    removeMotion,
    resizeDisconnect,
    intersectDisconnect,
    change: () => motionChange(),
    visibility: (visible: boolean) =>
      intersection(
        [{ isIntersecting: visible } as IntersectionObserverEntry],
        {} as IntersectionObserver,
      ),
  };
}

describe("Digital Architecture lifecycle", () => {
  it("paints a complete static scene without scheduling animation under reduced motion", () => {
    const env = environment(true);
    const { container, unmount } = render(<DigitalArchitecture />);
    expect(container.querySelector(".architecture-field")).toHaveAttribute("data-ready", "true");
    expect(env.ctx.stroke).toHaveBeenCalled();
    expect(env.request).not.toHaveBeenCalled();
    unmount();
    expect(env.removeMotion).toHaveBeenCalled();
    expect(env.resizeDisconnect).toHaveBeenCalled();
    expect(env.intersectDisconnect).toHaveBeenCalled();
  });
  it("stops offscreen, resumes onscreen and responds to a changed motion preference", () => {
    const env = environment();
    const { unmount } = render(<DigitalArchitecture />);
    env.request.mockClear();
    env.cancel.mockClear();
    act(() => env.visibility(false));
    expect(env.cancel).toHaveBeenCalled();
    expect(env.request).not.toHaveBeenCalled();
    act(() => env.visibility(true));
    expect(env.request).toHaveBeenCalledTimes(1);
    env.request.mockClear();
    env.motion.matches = true;
    act(() => env.change());
    expect(env.request).not.toHaveBeenCalled();
    unmount();
    expect(env.intersectDisconnect).toHaveBeenCalled();
  });
  it("retains an immediate SVG fallback when canvas is unavailable", () => {
    vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockReturnValue(null);
    const { container } = render(<DigitalArchitecture />);
    expect(container.querySelector(".architecture-fallback")).toBeInTheDocument();
    expect(container.querySelector(".architecture-field")).not.toHaveAttribute("data-ready");
  });
});
