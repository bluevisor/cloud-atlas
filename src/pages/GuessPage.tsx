import { useState, useMemo, useCallback, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { clouds, getRandomPracticeImage } from "@/data/clouds";
import SiteHeader from "@/components/SiteHeader";
import {
  CheckCircle,
  XCircle,
  Share2,
  RefreshCw,
  Copy,
  Check,
} from "lucide-react";

interface Challenge {
  cloudId: string;
  cloudName: string;
  image: string;
  options: { id: string; name: string }[];
}

function generateChallenge(cloudId?: string): Challenge {
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

const GuessPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const seedCloud = searchParams.get("cloud") || undefined;
  const shareGuess = searchParams.get("guess") || undefined;
  const shareCorrect = searchParams.get("correct");

  const isSharedResult = Boolean(shareGuess) && shareCorrect !== null;

  const [challenge, setChallenge] = useState(() =>
    generateChallenge(isSharedResult ? seedCloud : seedCloud),
  );
  const [selected, setSelected] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  // If visiting a shared result link, pre-select the answer
  useEffect(() => {
    if (isSharedResult && shareGuess) {
      setSelected(shareGuess);
    }
  }, [isSharedResult, shareGuess]);

  const isCorrect = selected === challenge.cloudId;
  const answered = selected !== null;

  const shareUrl = useMemo(() => {
    const params = new URLSearchParams();
    params.set("cloud", challenge.cloudId);
    if (answered && selected) {
      params.set("guess", selected);
      params.set("correct", String(isCorrect));
    }
    return `${window.location.origin}/guess?${params.toString()}`;
  }, [challenge.cloudId, answered, selected, isCorrect]);

  // Set page title and meta for social sharing
  useEffect(() => {
    document.title = "Guess This Cloud — CloudAtlas";

    const setMeta = (property: string, content: string) => {
      let el = document.querySelector(
        `meta[property="${property}"]`,
      ) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute("property", property);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    setMeta("og:title", "Guess This Cloud ☁️");
    setMeta(
      "og:description",
      answered
        ? isCorrect
          ? `I correctly identified ${challenge.cloudName}! Can you?`
          : `I guessed a cloud type — can you do better?`
        : "Can you identify this cloud type? Take the challenge!",
    );
    setMeta("og:image", challenge.image);
    setMeta("og:url", shareUrl);
    setMeta("twitter:card", "summary_large_image");
  }, [challenge, answered, isCorrect, shareUrl]);

  const handleSelect = useCallback((id: string) => {
    if (selected) return;
    setSelected(id);
    // Update URL without reload — but only if not already a shared result
    if (!isSharedResult) {
      const params = new URLSearchParams(searchParams);
      params.set("cloud", challenge.cloudId);
      params.set("guess", id);
      params.set("correct", String(id === challenge.cloudId));
      setSearchParams(params, { replace: true });
    }
  }, [selected, challenge.cloudId, isSharedResult, searchParams, setSearchParams]);

  const handleShare = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for insecure contexts
      const textArea = document.createElement("textarea");
      textArea.value = shareUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [shareUrl]);

  const handleNewChallenge = () => {
    const fresh = generateChallenge();
    setChallenge(fresh);
    setSelected(null);
    setImageLoaded(false);
    setSearchParams({}, { replace: true });
  };

  // Answer labels for review
  const selectedName = challenge.options.find((o) => o.id === selected)?.name ?? "";

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SiteHeader />

      <main className="flex-1 flex flex-col items-center justify-center pt-20 pb-8 px-4">
        <div className="w-full max-w-lg">
          {/* Heading */}
          <div className="text-center mb-4">
            <p className="text-muted-foreground text-xs tracking-[0.2em] uppercase mb-2">
              Cloud Recognition Challenge
            </p>
            <h1 className="text-display text-2xl sm:text-3xl">
              Guess This <span className="text-primary">Cloud</span> ☁️
            </h1>
          </div>

          {/* Image */}
          <div className="relative aspect-[4/3] overflow-hidden mb-4 bg-muted">
            {!imageLoaded && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              </div>
            )}
            <img
              src={challenge.image}
              alt="Guess this cloud type"
              className={`w-full h-full object-cover transition-opacity duration-300 ${
                imageLoaded ? "opacity-100" : "opacity-0"
              }`}
              onLoad={() => setImageLoaded(true)}
            />
          </div>

          {/* Answer options */}
          <div className="grid grid-cols-2 gap-2 mb-4">
            {challenge.options.map((opt, idx) => {
              let state = "";
              if (answered) {
                if (opt.id === challenge.cloudId) state = "correct";
                else if (opt.id === selected) state = "wrong";
              }

              return (
                <button
                  key={opt.id}
                  onClick={() => handleSelect(opt.id)}
                  disabled={answered}
                  className={`p-3 border text-left transition-all duration-300 flex items-center gap-2 ${
                    state === "correct"
                      ? "border-green-500 bg-green-500/10"
                      : state === "wrong"
                        ? "border-red-500 bg-red-500/10"
                        : answered
                          ? "border-border opacity-40"
                          : "border-border hover:border-primary hover:bg-muted/50"
                  }`}
                >
                  <span className="text-xs text-muted-foreground border border-border w-5 h-5 flex items-center justify-center flex-shrink-0 rounded-sm">
                    {idx + 1}
                  </span>
                  <span className="text-display text-sm flex-1">{opt.name}</span>
                  {state === "correct" && (
                    <CheckCircle size={16} className="text-green-500 flex-shrink-0" />
                  )}
                  {state === "wrong" && (
                    <XCircle size={16} className="text-red-500 flex-shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Result message */}
          {answered && (
            <div
              className={`p-5 border text-center mb-4 ${
                isCorrect
                  ? "border-green-500/50 bg-green-500/5"
                  : "border-red-500/50 bg-red-500/5"
              }`}
            >
              {isCorrect ? (
                <>
                  <CheckCircle
                    size={32}
                    className="text-green-500 mx-auto mb-2"
                  />
                  <p className="text-display text-lg mb-1">Correct!</p>
                  <p className="text-muted-foreground text-sm">
                    You correctly identified{" "}
                    <strong className="text-foreground">{challenge.cloudName}</strong>.
                  </p>
                </>
              ) : (
                <>
                  <XCircle
                    size={32}
                    className="text-red-500 mx-auto mb-2"
                  />
                  <p className="text-display text-lg mb-1">Not quite!</p>
                  <p className="text-muted-foreground text-sm">
                    You guessed{" "}
                    <strong className="text-red-400">{selectedName}</strong>.
                    {" "}The correct answer is{" "}
                    <strong className="text-green-400">{challenge.cloudName}</strong>.
                  </p>
                </>
              )}
            </div>
          )}

          {/* Action buttons */}
          <div className="flex flex-wrap gap-3 justify-center">
            {answered && (
              <button
                onClick={handleShare}
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 text-sm tracking-[0.12em] uppercase transition-opacity hover:opacity-90"
              >
                {copied ? (
                  <>
                    <Check size={16} /> Copied!
                  </>
                ) : (
                  <>
                    <Share2 size={16} /> Share Result
                  </>
                )}
              </button>
            )}

            {answered && (
              <button
                onClick={handleNewChallenge}
                className="inline-flex items-center gap-2 border border-border text-foreground px-6 py-3 text-sm tracking-[0.12em] uppercase transition-all hover:border-primary hover:text-primary"
              >
                <RefreshCw size={16} /> Try Another
              </button>
            )}

            {!answered && (
              <button
                onClick={handleNewChallenge}
                className="inline-flex items-center gap-2 border border-border text-muted-foreground px-4 py-2 text-xs tracking-[0.12em] uppercase transition-all hover:border-primary hover:text-primary"
              >
                <RefreshCw size={14} /> Skip / New Cloud
              </button>
            )}
          </div>

          {/* Share preview (how it looks on social) */}
          {answered && (
            <div className="mt-8 p-4 border border-border bg-muted/30">
              <p className="text-xs text-muted-foreground tracking-[0.12em] uppercase mb-3">
                Share Preview
              </p>
              <div className="flex gap-3 items-start">
                <div className="w-16 h-16 flex-shrink-0 overflow-hidden">
                  <img
                    src={challenge.image}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-display text-sm mb-1">
                    Guess This Cloud ☁️
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {isCorrect
                      ? `I correctly identified ${challenge.cloudName}! Can you?`
                      : `I guessed ${selectedName} but it was ${challenge.cloudName}. Try your luck!`}
                  </p>
                  <p className="text-xs text-primary mt-1 truncate">
                    {shareUrl}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Learn more link */}
          <div className="text-center mt-8">
            <a
              href="/learn"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Learn all 10 cloud types →
            </a>
          </div>
        </div>
      </main>
    </div>
  );
};

export default GuessPage;
