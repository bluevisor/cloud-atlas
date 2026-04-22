import { useActiveSnapPage } from "@/hooks/useActiveSnapPage";

const SnapProgress = () => {
  const { activeIndex, total, goToPage } = useActiveSnapPage();

  if (total <= 1) return null;

  return (
    <div
      className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col gap-3"
      aria-label="Page progress"
    >
      {Array.from({ length: total }).map((_, i) => (
        <button
          key={i}
          onClick={() => goToPage(i)}
          aria-label={`Go to page ${i + 1}`}
          aria-current={i === activeIndex}
          className={`w-2 h-2 rounded-full transition-all duration-300 ${
            i === activeIndex
              ? "bg-primary scale-150"
              : "bg-muted-foreground/40 hover:bg-muted-foreground"
          }`}
        />
      ))}
    </div>
  );
};

export default SnapProgress;
