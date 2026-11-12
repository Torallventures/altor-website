import { describe, expect, it } from "vitest";
import { getService, services } from "@/data/services";

describe("services data", () => {
  it("exposes the five offerings the business sells", () => {
    expect(services).toHaveLength(5);
    expect(services.map((s) => s.title)).toEqual([
      "Residential Community Websites",
      "Business Websites",
      "Business Apps",
      "Custom Management Systems",
      "Anything Digital",
    ]);
  });

  it("has unique slugs and complete copy on every service", () => {
    const slugs = services.map((s) => s.slug);
    expect(new Set(slugs).size).toBe(slugs.length);

    for (const s of services) {
      expect(s.title.length).toBeGreaterThan(3);
      expect(s.tagline.length).toBeGreaterThan(10);
      expect(s.overview.length).toBeGreaterThan(40);
      expect(s.story.length).toBeGreaterThan(0);
      expect(s.features.length).toBeGreaterThanOrEqual(4);
      expect(s.idealFor.length).toBeGreaterThan(20);
    }
  });

  it("resolves any advertised slug to a real service", () => {
    expect(getService("business-websites")?.title).toBe("Business Websites");
    expect(getService("does-not-exist")).toBeUndefined();
  });
});
