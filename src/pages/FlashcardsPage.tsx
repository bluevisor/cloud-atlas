import { useState, useEffect } from "react";
import { clouds } from "@/data/clouds";
import SiteHeader from "@/components/SiteHeader";
import { ChevronLeft, ChevronRight, RotateCcw } from "lucide-react";

const FlashcardsPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [shuffled, setShuffled] = useState(clouds);

  const current = shuffled[currentIndex];

  const next = () => {
    setFlipped(false);
    setCurrentIndex((i) => (i + 1) % shuffled.length);
  };

  const prev = () => {
    setFlipped(false);
    setCurrentIndex((i) => (i - 1 + shuffled.length) % shuffled.length);
  };

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
      else if (e.key === " ") { e.preventDefault(); setFlipped((f) => !f); }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  const shuffle = () => {
    const s = [...clouds].sort(() => Math.random() - 0.5);
    setShuffled(s);
    setCurrentIndex(0);
    setFlipped(false);
  };

  return (
    <div className="h-screen flex flex-col bg-background overflow-hidden">
      <SiteHeader />

      <div className="flex flex-col flex-1 min-h-0 px-6 pt-20 pb-6">
        <div className="max-w-3xl mx-auto text-center mb-4">
          <p className="text-muted-foreground text-sm tracking-[0.2em] uppercase mb-2">
            Flashcards
          </p>
          <h1 className="text-display text-[clamp(1.5rem,3vw,3rem)] leading-[0.9] mb-2">
            Test Your <span className="text-primary">Memory</span>
          </h1>
          <p className="text-muted-foreground text-sm">
            Click the card to flip. Image on front, name & description on back.
          </p>
        </div>

        <div className="flex flex-col flex-1 min-h-0 max-w-2xl mx-auto w-full">
          {/* Card */}
          <div
            className="relative flex-1 min-h-0 cursor-pointer mb-4"
            style={{ perspective: "1000px" }}
            onClick={() => setFlipped(!flipped)}
          >
            <div
              className="absolute inset-0 transition-transform duration-700"
              style={{
                transformStyle: "preserve-3d",
                transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
              }}
            >
              {/* Front - Image */}
              <div
                className="absolute inset-0 overflow-hidden"
                style={{ backfaceVisibility: "hidden" }}
              >
                <img
                  src={current.altImage}
                  alt="Identify this cloud"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/80 to-transparent p-6">
                  <p className="text-sm text-muted-foreground tracking-[0.15em] uppercase">
                    What cloud is this?
                  </p>
                </div>
              </div>

              {/* Back - Info */}
              <div
                className="absolute inset-0 bg-card flex flex-col items-center justify-center p-10 text-center border border-border"
                style={{
                  backfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
                }}
              >
                <p className="text-primary text-xs tracking-[0.2em] uppercase mb-4">
                  {current.altitude}
                </p>
                <h2 className="text-display text-[clamp(2rem,4vw,4rem)] leading-[1] mb-1">
                  {current.name}
                </h2>
                <p className="text-muted-foreground text-xl mb-1">{current.chineseName}</p>
                <p className="text-muted-foreground text-xs italic mb-6">{current.rootWord}</p>
                <p className="text-muted-foreground leading-relaxed max-w-md">
                  {current.shortDescription}
                </p>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between flex-shrink-0">
            <button
              onClick={prev}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ChevronLeft size={16} /> Previous
            </button>

            <div className="flex items-center gap-6">
              <span className="text-muted-foreground text-sm">
                {currentIndex + 1} / {shuffled.length}
              </span>
              <button
                onClick={shuffle}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <RotateCcw size={14} /> Shuffle
              </button>
            </div>

            <button
              onClick={next}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Next <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlashcardsPage;
