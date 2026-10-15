import { useState } from "react";
import { Link } from "react-router-dom";
import { capabilities } from "@/content/site";
import { DrawRule, MaskedTextReveal } from "@/components/motion";
import { ConceptTag, SectionEyebrow } from "@/components/ui";
import { cn } from "@/utils/cn";

export function CapabilityIndex({ withHeader = true }: { withHeader?: boolean }) {
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section aria-labelledby="cap-heading" className="bg-ink py-28 md:py-40">
      <div className="shell">
        {withHeader && (
          <div className="grid-12 mb-16 gap-y-6 md:mb-24">
            <SectionEyebrow index="05" className="col-span-4 md:col-span-3">
              Capabilities
            </SectionEyebrow>
            <MaskedTextReveal
              id="cap-heading"
              lines={["Areas of", "engineering focus."]}
              className="display-lg col-span-4 md:col-span-9"
              as="h2"
            />
          </div>
        )}
        {!withHeader && (
          <h2 id="cap-heading" className="sr-only">
            Capability index
          </h2>
        )}

        <div className="grid-12">
          {/* Rows */}
          <ul className="col-span-4 md:col-span-12 lg:col-span-7">
            <DrawRule />
            {capabilities.map((c, i) => {
              const isActive = active === i;
              const isOpen = open === i;
              return (
                <li key={c.index} className="border-b border-line">
                  {/* Desktop row */}
                  <Link
                    to="/capabilities"
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    className={cn(
                      "group hidden items-center gap-8 py-7 transition-colors duration-300 lg:flex",
                      isActive ? "text-paper" : "text-paper/35 hover:text-paper",
                    )}
                  >
                    <span className="eyebrow w-14 shrink-0 tabular-nums">{c.index}</span>
                    <span className="flex-1 text-[clamp(1.4rem,2.4vw,2.4rem)] font-medium uppercase leading-none tracking-[-0.025em]">
                      {c.title}
                    </span>
                    <span
                      aria-hidden
                      className={cn(
                        "text-2xl transition-all duration-500 ease-[var(--ease-expo)]",
                        isActive ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-0",
                      )}
                    >
                      →
                    </span>
                  </Link>

                  {/* Mobile accordion */}
                  <div className="lg:hidden">
                    <h3>
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        aria-controls={`cap-panel-${i}`}
                        onClick={() => setOpen(isOpen ? null : i)}
                        className="flex w-full items-center gap-5 py-6 text-left"
                      >
                        <span className="eyebrow w-8 shrink-0">{c.index}</span>
                        <span className="flex-1 text-[clamp(1.2rem,5.5vw,1.75rem)] font-medium uppercase leading-tight tracking-[-0.02em]">
                          {c.title}
                        </span>
                        <span aria-hidden className={cn("text-xl transition-transform duration-300", isOpen && "rotate-45")}>
                          +
                        </span>
                      </button>
                    </h3>
                    <div id={`cap-panel-${i}`} hidden={!isOpen} className="pb-8 pl-[52px]">
                      <p className="body mb-4">{c.text}</p>
                      <ul className="flex flex-wrap gap-x-5 gap-y-2">
                        {c.points.map((p) => (
                          <li key={p} className="eyebrow text-paper/70">
                            {p}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>

          {/* Sticky preview */}
          <div className="relative col-span-5 col-start-8 hidden lg:block">
            <div className="sticky top-28 ml-8">
              <div className="relative aspect-[4/5] overflow-hidden bg-surface">
                {capabilities.map((c, i) => (
                  <img
                    key={c.index}
                    src={c.image}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className={cn(
                      "img-cover absolute inset-0 transition-[opacity,transform] duration-[900ms] ease-[var(--ease-expo)]",
                      active === i ? "scale-100 opacity-100" : "scale-[1.06] opacity-0",
                    )}
                  />
                ))}
                <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <ConceptTag className="absolute left-5 top-5">Conceptual imagery</ConceptTag>
              </div>
              <p className="body mt-6 max-w-md text-paper/80" aria-live="polite">
                {capabilities[active].text}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
