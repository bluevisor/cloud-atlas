import { describe, it, expect } from "vitest";
import { clouds, getRandomPracticeImage } from "@/data/clouds";

// Inline generateChallenge so we can test it directly without importing the component
function generateChallenge(cloudId?: string) {
  const cloud = cloudId
    ? clouds.find((c) => c.id === cloudId)
    : clouds[Math.floor(Math.random() * clouds.length)];

  const target = cloud ?? clouds[Math.floor(Math.random() * clouds.length)];

  const wrong = clouds
    .filter((c) => c.id !== target.id)
    .sort(() => Math.random() - 0.5)
    .slice(0, 3);

  const options = [
    ...wrong.map((w) => ({ id: w.id, name: w.name })),
    { id: target.id, name: target.name },
  ].sort(() => Math.random() - 0.5);

  return {
    cloudId: target.id,
    cloudName: target.name,
    image: getRandomPracticeImage(target),
    options,
  };
}

describe("generateChallenge", () => {
  it("produces exactly 4 options", () => {
    const c = generateChallenge();
    expect(c.options).toHaveLength(4);
  });

  it("the correct answer is always among the options", () => {
    for (let i = 0; i < 20; i++) {
      const c = generateChallenge();
      const ids = c.options.map((o) => o.id);
      expect(ids).toContain(c.cloudId);
    }
  });

  it("options have no duplicates", () => {
    for (let i = 0; i < 20; i++) {
      const c = generateChallenge();
      const ids = c.options.map((o) => o.id);
      expect(new Set(ids).size).toBe(ids.length);
    }
  });

  it("uses a real cloud image as the challenge image", () => {
    for (let i = 0; i < 10; i++) {
      const c = generateChallenge();
      expect(c.image).toBeTruthy();
      expect(typeof c.image).toBe("string");
    }
  });

  it("respects a seed cloud id when provided (deterministic target)", () => {
    const targetIds = ["cumulonimbus", "cirrus", "stratus"];
    for (const id of targetIds) {
      const c = generateChallenge(id);
      expect(c.cloudId).toBe(id);
      expect(c.options.map((o) => o.id)).toContain(id);
    }
  });

  it("falls back to random when seed cloud id is unknown", () => {
    const c = generateChallenge("not-a-real-cloud");
    const validIds = new Set(clouds.map((cloud) => cloud.id));
    expect(validIds.has(c.cloudId)).toBe(true);
  });

  it("randomizes target across calls when no seed is given", () => {
    const ids = new Set<string>();
    for (let i = 0; i < 50; i++) {
      ids.add(generateChallenge().cloudId);
    }
    // With 10 clouds and 50 trials, we should see at least 3 distinct ids
    expect(ids.size).toBeGreaterThanOrEqual(3);
  });

  it("each option's name matches a real cloud name in the dataset", () => {
    const validNames = new Set(clouds.map((c) => c.name));
    for (let i = 0; i < 20; i++) {
      const c = generateChallenge();
      c.options.forEach((opt) => {
        expect(validNames.has(opt.name)).toBe(true);
      });
    }
  });
});
