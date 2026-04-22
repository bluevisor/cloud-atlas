import { describe, it, expect } from "vitest";
import { clouds, getRandomPracticeImage } from "@/data/clouds";

// Inline generateQuiz so we can test it directly without importing the component
function generateQuiz(count: number = 10) {
  const shuffled = [...clouds].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count).map((cloud) => {
    const wrong = clouds
      .filter((c) => c.id !== cloud.id)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);
    const options = [
      ...wrong.map((w) => ({ id: w.id, name: w.name })),
      { id: cloud.id, name: cloud.name },
    ].sort(() => Math.random() - 0.5);
    return {
      image: getRandomPracticeImage(cloud),
      correctId: cloud.id,
      correctName: cloud.name,
      options,
    };
  });
}

describe("generateQuiz", () => {
  it("produces the requested number of questions", () => {
    expect(generateQuiz(10)).toHaveLength(10);
    expect(generateQuiz(5)).toHaveLength(5);
  });

  it("each question has exactly 4 options", () => {
    generateQuiz().forEach((q) => expect(q.options).toHaveLength(4));
  });

  it("the correct answer is always among the options", () => {
    generateQuiz().forEach((q) => {
      const ids = q.options.map((o) => o.id);
      expect(ids).toContain(q.correctId);
    });
  });

  it("options have no duplicates", () => {
    generateQuiz().forEach((q) => {
      const ids = q.options.map((o) => o.id);
      expect(new Set(ids).size).toBe(ids.length);
    });
  });

  it("each question references a cloud that exists in the data", () => {
    const validIds = new Set(clouds.map((c) => c.id));
    generateQuiz().forEach((q) => {
      expect(validIds.has(q.correctId)).toBe(true);
    });
  });

  it("produces different orderings across runs", () => {
    const run1 = generateQuiz().map((q) => q.correctId).join(",");
    const run2 = generateQuiz().map((q) => q.correctId).join(",");
    // With 10 items the probability both runs produce identical order is ~1/10! ≈ 0
    // Accept if they differ at least once in 3 runs
    const run3 = generateQuiz().map((q) => q.correctId).join(",");
    expect(new Set([run1, run2, run3]).size).toBeGreaterThan(1);
  });
});

describe("clouds data", () => {
  it("has exactly 10 cloud types", () => {
    expect(clouds).toHaveLength(10);
  });

  it("each cloud has a unique id", () => {
    const ids = clouds.map((c) => c.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("each cloud has required fields", () => {
    clouds.forEach((c) => {
      expect(c.id).toBeTruthy();
      expect(c.name).toBeTruthy();
      expect(c.category).toMatch(/^(high|middle|low|vertical)$/);
      expect(c.characteristics.length).toBeGreaterThan(0);
      expect(c.practiceImages).toHaveLength(4);
    });
  });

  it("exactly 3 clouds are marked as featured", () => {
    expect(clouds.filter((c) => c.featured)).toHaveLength(3);
  });
});
