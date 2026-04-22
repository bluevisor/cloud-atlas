import { useState, useMemo, useCallback, useEffect } from "react";
import { clouds, getRandomPracticeImage } from "@/data/clouds";
import SiteHeader from "@/components/SiteHeader";
import { CheckCircle, XCircle, RotateCcw, ArrowRight } from "lucide-react";

const SCORE_EXCELLENT = 8;
const SCORE_GOOD = 5;

interface Question {
  image: string;
  correctId: string;
  correctName: string;
  options: { id: string; name: string }[];
}

function generateQuiz(count: number = 10): Question[] {
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

const QuizPage = () => {
  const [quiz, setQuiz] = useState(() => generateQuiz());
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [answers, setAnswers] = useState<(boolean | null)[]>(Array(10).fill(null));
  const [finished, setFinished] = useState(false);

  const question = quiz[currentQ];
  const score = useMemo(() => answers.filter((a) => a === true).length, [answers]);

  const handleSelect = useCallback(
    (id: string) => {
      if (selected) return;
      setSelected(id);
      const correct = id === question.correctId;
      setAnswers((prev) => {
        const next = [...prev];
        next[currentQ] = correct;
        return next;
      });
    },
    [selected, question.correctId, currentQ]
  );

  const handleNext = useCallback(() => {
    if (currentQ < quiz.length - 1) {
      setCurrentQ((q) => q + 1);
      setSelected(null);
    } else {
      setFinished(true);
    }
  }, [currentQ, quiz.length]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const idx = ["1", "2", "3", "4"].indexOf(e.key);
      if (idx !== -1 && idx < question.options.length) {
        handleSelect(question.options[idx].id);
      } else if ((e.key === "Enter" || e.key === "ArrowRight") && selected) {
        handleNext();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [handleSelect, handleNext, question.options, selected]);

  const restart = () => {
    setQuiz(generateQuiz());
    setCurrentQ(0);
    setSelected(null);
    setAnswers(Array(10).fill(null));
    setFinished(false);
  };

  if (finished) {
    const label =
      score >= SCORE_EXCELLENT
        ? "Excellent!"
        : score >= SCORE_GOOD
        ? "Good Effort"
        : "Keep Studying";

    return (
      <div className="min-h-screen bg-background">
        <SiteHeader />
        <section className="pt-32 px-6">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-display text-[clamp(2.5rem,5vw,5rem)] leading-[0.9] mb-8">
              {score >= SCORE_EXCELLENT ? (
                <span className="text-primary">{label}</span>
              ) : (
                label
              )}
            </h1>
            <p className="text-[clamp(3rem,6vw,6rem)] text-display leading-[1] mb-4">
              {score}
              <span className="text-muted-foreground text-[0.4em]">/{quiz.length}</span>
            </p>
            <p className="text-muted-foreground mb-12">
              You correctly identified {score} out of {quiz.length} cloud types.
            </p>

            {/* Review grid */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-12">
              {quiz.map((q, i) => (
                <div
                  key={i}
                  className={`aspect-square overflow-hidden relative border-2 ${
                    answers[i] ? "border-green-500" : "border-red-500"
                  }`}
                >
                  <img
                    src={q.image}
                    alt={q.correctName}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-background/80 p-1">
                    <p className="text-[10px] truncate">{q.correctName}</p>
                  </div>
                  <div className="absolute top-1 right-1">
                    {answers[i] ? (
                      <CheckCircle size={14} className="text-green-500" />
                    ) : (
                      <XCircle size={14} className="text-red-500" />
                    )}
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={restart}
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 text-sm tracking-[0.12em] uppercase transition-opacity hover:opacity-90"
            >
              <RotateCcw size={14} /> Try Again
            </button>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-background overflow-hidden">
      <SiteHeader />

      <div className="flex flex-col flex-1 min-h-0 pt-20 pb-6 px-6">
        {/* Progress */}
        <div className="max-w-3xl mx-auto w-full mb-4 flex-shrink-0">
          <div className="flex items-center justify-between mb-3">
            <p className="text-muted-foreground text-sm tracking-[0.2em] uppercase">
              Question {currentQ + 1} of {quiz.length}
            </p>
            <p className="text-sm text-muted-foreground">
              Score: <span className="text-primary">{score}</span>
            </p>
          </div>
          <div className="h-px bg-border">
            <div
              className="h-full bg-primary transition-all duration-500"
              style={{
                width: `${((currentQ + (selected ? 1 : 0)) / quiz.length) * 100}%`,
              }}
            />
          </div>
        </div>

        <div className="flex flex-col flex-1 min-h-0 max-w-3xl mx-auto w-full">
          <h2 className="text-display text-xl mb-3 flex-shrink-0">Identify this cloud type</h2>

          {/* Image fills available space */}
          <div className="relative flex-1 min-h-0 overflow-hidden mb-4">
            <img
              src={question.image}
              alt="Identify this cloud"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>

          {/* Answer buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 flex-shrink-0">
            {question.options.map((opt, idx) => {
              let state = "";
              if (selected) {
                if (opt.id === question.correctId) state = "correct";
                else if (opt.id === selected) state = "wrong";
              }

              return (
                <button
                  key={opt.id}
                  onClick={() => handleSelect(opt.id)}
                  disabled={!!selected}
                  className={`p-3 text-left border transition-all duration-300 flex items-center gap-3 ${
                    state === "correct"
                      ? "border-green-500 bg-green-500/10"
                      : state === "wrong"
                      ? "border-red-500 bg-red-500/10"
                      : selected
                      ? "border-border opacity-40"
                      : "border-border hover:border-primary"
                  }`}
                >
                  <span className="text-xs text-muted-foreground border border-border w-5 h-5 flex items-center justify-center flex-shrink-0">
                    {idx + 1}
                  </span>
                  <span className="text-display text-base flex-1">{opt.name}</span>
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

          <div className="text-center mt-3 flex-shrink-0">
            <button
              onClick={handleNext}
              disabled={!selected}
              className={`inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 text-sm tracking-[0.12em] uppercase transition-opacity ${
                selected ? "opacity-100 hover:opacity-90" : "opacity-0 pointer-events-none"
              }`}
            >
              {currentQ < quiz.length - 1 ? (
                <>Next Question <ArrowRight size={14} /></>
              ) : (
                "See Results"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizPage;
