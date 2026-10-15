import type { ReactNode } from "react";
import { MaskedTextReveal, ParallaxMedia, Reveal } from "./motion";
import { ConceptTag, SectionEyebrow } from "./ui";
import { cn } from "@/utils/cn";

export function PageHero({
  eyebrow,
  index,
  lines,
  intro,
  image,
  imageAlt = "",
  children,
  compact = false,
}: {
  eyebrow: string;
  index?: string;
  lines: string[];
  intro?: ReactNode;
  image?: string;
  imageAlt?: string;
  children?: ReactNode;
  compact?: boolean;
}) {
  return (
    <section className={cn("relative overflow-hidden bg-ink", image ? "min-h-[88svh] md:min-h-svh" : "")}>
      {image && (
        <>
          <ParallaxMedia
            src={image}
            alt={imageAlt}
            className="absolute inset-0 grain"
            overlay="bg-gradient-to-t from-ink via-black/50 to-black/40"
            amount={8}
          />
        </>
      )}
      <div
        className={cn(
          "shell relative flex flex-col justify-end",
          image ? "min-h-[88svh] pb-14 pt-36 md:min-h-svh md:pb-20" : compact ? "pb-14 pt-40 md:pt-48" : "pb-20 pt-40 md:pb-28 md:pt-56",
        )}
      >
        <SectionEyebrow index={index} className="mb-8">
          {eyebrow}
        </SectionEyebrow>
        <MaskedTextReveal as="h1" trigger="load" delay={0.15} lines={lines} className="display-xl max-w-[16ch] md:max-w-none" />
        {(intro || children) && (
          <div className="grid-12 mt-12 items-end gap-y-8 md:mt-16">
            {intro && (
              <Reveal delay={0.5} className="col-span-4 md:col-span-6 lg:col-span-5">
                <p className="body-lg text-paper/80">{intro}</p>
              </Reveal>
            )}
            {children && <div className="col-span-4 md:col-span-5 md:col-start-8 md:justify-self-end">{children}</div>}
          </div>
        )}
        {image && <ConceptTag className="mt-10 block">Conceptual imagery</ConceptTag>}
      </div>
    </section>
  );
}
