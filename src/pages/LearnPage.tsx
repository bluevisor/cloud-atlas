import { clouds, categoryLabels } from "@/data/clouds";
import SiteHeader from "@/components/SiteHeader";
import SnapProgress from "@/components/SnapProgress";

const LearnPage = () => {
  const ordered = (["high", "middle", "low", "vertical"] as const).flatMap(
    (cat) => clouds.filter((c) => c.category === cat),
  );

  return (
    <div className="bg-background">
      <SiteHeader />
      <SnapProgress />

      {/* Intro page */}
      <section className="snap-page flex items-center px-6 pt-20">
        <div className="max-w-7xl mx-auto w-full">
          <p className="text-muted-foreground text-sm tracking-[0.2em] uppercase mb-6">
            Learning Module
          </p>
          <h1 className="text-display text-[clamp(2.5rem,5vw,5rem)] leading-[0.9] mb-6">
            Cloud <span className="text-primary">Types</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl text-lg leading-relaxed mb-12">
            Study all 10 cloud types organized by altitude. Each type includes
            visual reference, key characteristics, and aviation significance.
          </p>
          <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground">
            Scroll to begin — {ordered.length} types ahead
          </p>
        </div>
      </section>

      {ordered.map((cloud, i) => (
        <section
          key={cloud.id}
          id={cloud.id}
          className="snap-page flex items-center px-6 py-20"
        >
          <article className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className={`${i % 2 === 1 ? "lg:order-2" : ""}`}>
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={cloud.image}
                  alt={cloud.name}
                  loading="lazy"
                  width={768}
                  height={512}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className={`${i % 2 === 1 ? "lg:order-1" : ""}`}>
              <div className="flex items-center gap-3 mb-3 text-xs tracking-[0.2em] uppercase">
                <span className="text-muted-foreground">
                  {categoryLabels[cloud.category]}
                </span>
                <span className="text-border">/</span>
                <span className="text-primary">{cloud.altitude}</span>
              </div>
              <h3 className="text-display text-[clamp(2rem,3vw,3.5rem)] leading-[1] mb-2">
                {cloud.name}{" "}
                <span className="text-muted-foreground font-normal text-[0.5em]">
                  {cloud.chineseName}
                </span>
              </h3>
              <p className="text-sm italic text-muted-foreground mb-6">
                {cloud.rootWord}
              </p>
              <p className="text-muted-foreground leading-relaxed mb-8">
                {cloud.description}
              </p>

              <div className="mb-8">
                <h4 className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-4">
                  Key Characteristics
                </h4>
                <ul className="space-y-2">
                  {cloud.characteristics.map((c) => (
                    <li
                      key={c}
                      className="flex items-start gap-3 text-sm"
                    >
                      <span className="w-1 h-1 rounded-full bg-primary mt-2 flex-shrink-0" />
                      {c}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-muted p-6 rounded-sm">
                <h4 className="text-xs tracking-[0.2em] uppercase text-primary mb-3">
                  Aviation Significance
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {cloud.aviationSignificance}
                </p>
              </div>
            </div>
          </article>
        </section>
      ))}
    </div>
  );
};

export default LearnPage;
