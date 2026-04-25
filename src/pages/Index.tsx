import { Link } from "react-router-dom";
import { clouds } from "@/data/clouds";
import SiteHeader from "@/components/SiteHeader";
import SnapProgress from "@/components/SnapProgress";
import { ArrowRight } from "lucide-react";

const Index = () => {
  const featured = clouds.filter((c) => c.featured);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <SnapProgress />

      {/* Hero */}
      <section className="snap-page relative flex items-center px-6">
        <div className="max-w-7xl mx-auto w-full pt-16">
          <p className="text-muted-foreground text-sm tracking-[0.2em] uppercase mb-6">
            Aviation Weather Education
          </p>
          <h1 className="text-display text-[clamp(3rem,8vw,8rem)] leading-[0.9] mb-8">
            Know Your
            <br />
            <span className="text-primary">Clouds</span>
          </h1>
          <p className="text-muted-foreground max-w-xl text-lg leading-relaxed mb-12">
            Master all 10 cloud types essential for aviation. Learn to identify,
            understand, and respect the clouds that shape our skies and flight
            conditions.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/learn"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 text-sm tracking-[0.12em] uppercase transition-all duration-300 hover:opacity-90"
            >
              Start Learning <ArrowRight size={16} />
            </Link>
            <Link
              to="/quiz"
              className="inline-flex items-center gap-2 border border-border text-foreground px-8 py-4 text-sm tracking-[0.12em] uppercase transition-all duration-300 hover:border-primary hover:text-primary"
            >
              Take the Quiz
            </Link>
            <Link
              to="/guess"
              className="inline-flex items-center gap-2 border border-border text-foreground px-8 py-4 text-sm tracking-[0.12em] uppercase transition-all duration-300 hover:border-primary hover:text-primary"
            >
              Guess This Cloud ☁️
            </Link>
          </div>
        </div>
      </section>

      {/* Featured clouds */}
      <section className="snap-page section-cream flex items-center px-6 py-24">
        <div className="max-w-7xl mx-auto w-full">
          <p className="text-sm tracking-[0.2em] uppercase mb-4 opacity-50">
            Featured
          </p>
          <h2 className="text-display text-[clamp(2rem,4vw,4rem)] leading-[1] mb-16">
            Explore Cloud Types
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featured.map((cloud) => (
              <Link
                key={cloud.id}
                to={`/learn#${cloud.id}`}
                className="group card-hover block"
              >
                <div className="aspect-[4/3] overflow-hidden mb-6">
                  <img
                    src={cloud.image}
                    alt={cloud.name}
                    loading="lazy"
                    width={768}
                    height={512}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <h3 className="text-display text-2xl mb-2">{cloud.name}</h3>
                <p className="text-sm opacity-60 leading-relaxed">
                  {cloud.shortDescription}
                </p>
              </Link>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link
              to="/learn"
              className="inline-flex items-center gap-2 text-sm tracking-[0.12em] uppercase opacity-60 hover:opacity-100 transition-opacity"
            >
              View all 10 cloud types <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* Modes + Footer */}
      <section className="snap-page flex flex-col justify-center px-6 py-24">
        <div className="max-w-7xl mx-auto w-full flex-1 flex items-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border w-full">
            {[
              {
                title: "Learn",
                desc: "In-depth descriptions, altitude data, characteristics, and aviation significance for each cloud type.",
                link: "/learn",
              },
              {
                title: "Flashcards",
                desc: "Interactive flip cards with cloud images on one side and names with descriptions on the other.",
                link: "/flashcards",
              },
              {
                title: "Quiz",
                desc: "Test your knowledge with image-based identification quizzes and scored assessments.",
                link: "/quiz",
              },
              {
                title: "Guess",
                desc: "Single-cloud challenge designed for sharing — try it, then send the link to friends and compare results.",
                link: "/guess",
              },
            ].map((mode) => (
              <Link
                key={mode.title}
                to={mode.link}
                className="group bg-background p-10 transition-colors duration-500 hover:bg-muted"
              >
                <h3 className="text-display text-3xl mb-4 group-hover:text-primary transition-colors duration-300">
                  {mode.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-8">
                  {mode.desc}
                </p>
                <span className="inline-flex items-center gap-2 text-xs tracking-[0.15em] uppercase text-muted-foreground group-hover:text-primary transition-colors">
                  Explore <ArrowRight size={12} />
                </span>
              </Link>
            ))}
          </div>
        </div>
        <footer className="border-t border-border pt-8 mt-12">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-display text-lg">
              Cloud<span className="text-primary">Atlas</span>
            </p>
            <p className="text-muted-foreground text-xs tracking-[0.1em]">
              Aviation cloud education — learn, practice, master.
            </p>
          </div>
        </footer>
      </section>
    </div>
  );
};

export default Index;
