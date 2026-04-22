import { useCallback, useEffect, useRef, useState } from "react";

const HEADER_HEIGHT = 64;
const OBSERVER_THRESHOLDS = [0, 0.25, 0.5, 0.75, 1];

const isTypingTarget = (target: EventTarget | null) => {
  if (!(target instanceof HTMLElement)) return false;

  return (
    target.isContentEditable ||
    target.tagName === "INPUT" ||
    target.tagName === "TEXTAREA" ||
    target.tagName === "SELECT"
  );
};

const getClosestPageIndex = (pages: HTMLElement[]) => {
  if (pages.length === 0) return 0;

  const viewportCenter = HEADER_HEIGHT + (window.innerHeight - HEADER_HEIGHT) / 2;

  return pages.reduce(
    (closest, page, index) => {
      const rect = page.getBoundingClientRect();
      const pageCenter = rect.top + rect.height / 2;
      const distance = Math.abs(pageCenter - viewportCenter);

      return distance < closest.distance ? { index, distance } : closest;
    },
    { index: 0, distance: Number.POSITIVE_INFINITY },
  ).index;
};

/**
 * Tracks which snap page is currently in view.
 *
 * Call it once per route that uses .snap-page sections. It queries the DOM
 * for every `.snap-page` element, observes them, and returns:
 *   - activeIndex: the index of the page considered "in view"
 *   - total:       how many snap pages exist on the route
 */
export function useActiveSnapPage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [total, setTotal] = useState(0);
  const pagesRef = useRef<HTMLElement[]>([]);
  const ratiosRef = useRef<Map<number, number>>(new Map());

  const goToPage = useCallback((index: number) => {
    const pages = pagesRef.current;

    if (pages.length === 0) return;

    const clampedIndex = Math.max(0, Math.min(index, pages.length - 1));
    pages[clampedIndex]?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  useEffect(() => {
    const pages = Array.from(
      document.querySelectorAll<HTMLElement>(".snap-page"),
    );
    pagesRef.current = pages;
    setTotal(pages.length);

    if (pages.length === 0) return;

    const pageIndexes = new Map(pages.map((page, index) => [page, index]));

    ratiosRef.current = new Map(pages.map((_, index) => [index, 0]));
    setActiveIndex(getClosestPageIndex(pages));

    const syncActiveIndex = () => {
      let nextIndex = getClosestPageIndex(pages);
      let maxRatio = 0;

      for (const [index, ratio] of ratiosRef.current) {
        if (ratio > maxRatio) {
          maxRatio = ratio;
          nextIndex = index;
        }
      }

      setActiveIndex((current) => (current === nextIndex ? current : nextIndex));
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = pageIndexes.get(entry.target as HTMLElement);

          if (index === undefined) return;

          ratiosRef.current.set(index, entry.isIntersecting ? entry.intersectionRatio : 0);
        });

        syncActiveIndex();
      },
      {
        threshold: OBSERVER_THRESHOLDS,
        rootMargin: `-${HEADER_HEIGHT}px 0px 0px 0px`,
      },
    );

    pages.forEach((page) => observer.observe(page));
    window.addEventListener("resize", syncActiveIndex);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", syncActiveIndex);
    };
  }, []);

  useEffect(() => {
    if (pagesRef.current.length <= 1) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.repeat || event.defaultPrevented) return;
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      if (isTypingTarget(event.target)) return;
      if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;

      event.preventDefault();

      const currentIndex = getClosestPageIndex(pagesRef.current);
      goToPage(currentIndex + (event.key === "ArrowDown" ? 1 : -1));
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goToPage]);

  return { activeIndex, total, goToPage };
}
