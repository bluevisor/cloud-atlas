import { useState, useMemo } from "react";
import { clouds } from "@/data/clouds";
import SiteHeader from "@/components/SiteHeader";
import { CheckCircle, XCircle, RotateCcw } from "lucide-react";

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
    const options = [...wrong.map((w) => ({ id: w.id, name: w.name })), { id: cloud.id, name: cloud.name }]
      .sort(() => Math.random() - 0.5);
    return {
      image: cloud.altImage,
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
  const [answers, setAnswers] = useState<(boolean | null)[]>(
    Array(10).fill(null)
  );
  const [finished, setFinished] = useState(false);

  const question = quiz[currentQ];
  const score = useMemo(
    () => answers.filter((a) => a === true).length,
    [answers]
  );

  const handleSelect = (id: string) => {
    if (selected) return;
    setSelected(id);
    const correct = id === question.correctId;
    const newAnswers = [...answers];
    newAnswers[currentQ] = correct;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQ < quiz.length - 1) {
      setCurrentQ(currentQ + 1);
      setSelected(null);
    } else {
      setFinished(true);
    }
  };

  const restart = () => {
    setQuiz(generateQuiz());
    setCurrentQ(0);
    setSelected(null);
    setAnswers(Array(10).fill(null));
    setFinished(false);
  };

  if (finished) {
    return (
      <div className="min-h-screen bg-background">
        <SiteHeader />
        <section className="pt-32 px-6">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-display text-[clamp(2.5rem,5vw,5rem)] leading-[0.9] mb-8">
              {score >= 8 ? (
                <>
                  <span className="text-primary">Excellent!</span>
                </>
              ) : score >= 5 ? (
                "Good Effort"
              ) : (
                "Keep Studying"
              )}
            </h1>
            <p className="text-[clamp(3rem,6vw,6rem)] text-display leading-[1] mb-4">
              {score}
              <span className="text-muted-foreground text-[0.4em]">
                /{quiz.length}
              </span>
            </p>
            <p className="text-muted-foreground mb-12">
              You correctly identified {score} out of {quiz.length} cloud types.
            </p>

            {/* Review */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-12">
              {quiz.map((q, i) => (
                <div
                  key={i}
                  className={`aspect-square overflow-hidden relative border-2 ${
                    answers[i]
                      ? "border-green-500"
                      : "border-red-500"
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
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <section className="pt-32 pb-8 px-6">
        <div className="max-w-3xl mx-auto">
          {/* Progress */}
          <div className="flex items-center justify-between mb-8">
            <p className="text-muted-foreground text-sm tracking-[0.2em] uppercase">
              Question {currentQ + 1} of {quiz.length}
            </p>
            <p className="text-sm text-muted-foreground">
              Score: <span className="text-primary">{score}</span>
            </p>
          </div>
          <div className="h-px bg-border mb-2">
            <div
              className="h-full bg-primary transition-all duration-500"
              style={{
                width: `${((currentQ + (selected ? 1 : 0)) / quiz.length) * 100}%`,
              }}
            />
          </div>
        </div>
      </section>

      <section className="px-6 pb-16">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-display text-2xl mb-8">
            Identify this cloud type
          </h2>

          <div className="aspect-video overflow-hidden mb-10">
            <img
              src={question.image}
              alt="Identify this cloud"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
            {question.options.map((opt) => {
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
                  className={`p-5 text-left border transition-all duration-300 ${
                    state === "correct"
                      ? "border-green-500 bg-green-500/10"
                      : state === "wrong"
                      ? "border-red-500 bg-red-500/10"
                      : selected
                      ? "border-border opacity-40"
                      : "border-border hover:border-primary"
                  }`}
                >
                  <span className="text-display text-lg">{opt.name}</span>
                </button>
              );
            })}
          </div>

          {selected && (
            <div className="text-center">
              <button
                onClick={handleNext}
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 text-sm tracking-[0.12em] uppercase transition-opacity hover:opacity-90"
              >
                {currentQ < quiz.length - 1 ? "Next Question" : "See Results"}
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default QuizPage;
