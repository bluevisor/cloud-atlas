import { clouds, categoryLabels } from "@/data/clouds";
import SiteHeader from "@/components/SiteHeader";

const LearnPage = () => {
  const categories = ["high", "middle", "low", "vertical"] as const;

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <section className="pt-32 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          <p className="text-muted-foreground text-sm tracking-[0.2em] uppercase mb-6">
            Learning Module
          </p>
          <h1 className="text-display text-[clamp(2.5rem,5vw,5rem)] leading-[0.9] mb-6">
            Cloud <span className="text-primary">Types</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl text-lg leading-relaxed">
            Study all 10 cloud types organized by altitude. Each type includes
            visual reference, key characteristics, and aviation significance.
          </p>
        </div>
      </section>

      {categories.map((cat) => {
        const catClouds = clouds.filter((c) => c.category === cat);
        if (catClouds.length === 0) return null;
        return (
          <section key={cat} className="px-6 pb-24">
            <div className="max-w-7xl mx-auto">
              <div className="border-t border-border pt-8 mb-12">
                <h2 className="text-display text-3xl">
                  {categoryLabels[cat]}
                </h2>
              </div>

              <div className="space-y-24">
                {catClouds.map((cloud, i) => (
                  <article
                    key={cloud.id}
                    id={cloud.id}
                    className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-start ${
                      i % 2 === 1 ? "lg:direction-rtl" : ""
                    }`}
                  >
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
                      <p className="text-primary text-xs tracking-[0.2em] uppercase mb-3">
                        {cloud.altitude}
                      </p>
                      <h3 className="text-display text-[clamp(2rem,3vw,3.5rem)] leading-[1] mb-6">
                        {cloud.name}
                      </h3>
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
                ))}
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
};

export default LearnPage;
