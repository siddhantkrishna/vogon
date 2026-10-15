import { useRef } from "react";
import { Link } from "react-router-dom";
import { gsap, useIsoLayoutEffect, useReducedMotion } from "@/lib/motion";
import { img } from "@/content/site";
import { ConceptTag } from "@/components/ui";
import { Magnetic } from "@/components/motion";
import { cn } from "@/utils/cn";

export function CinematicHero() {
  const wrap = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useIsoLayoutEffect(() => {
    if (reduced || !wrap.current) return;
    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(wrap.current);

      /* --- Load choreography: image → headline lines → copy → CTA --- */
      const intro = gsap.timeline({ defaults: { ease: "expo.out" } });
      intro
        .fromTo(q("[data-hero-img]"), { opacity: 0, scale: 1.08 }, { opacity: 1, scale: 1, duration: 2.8, ease: "power2.out" })
        .fromTo(q("[data-line-inner]"), { yPercent: 112 }, { yPercent: 0, duration: 1.15, stagger: 0.12 }, 0.55)
        .fromTo(q("[data-hero-copy]"), { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 1 }, 1.15)
        .fromTo(q("[data-hero-cta]"), { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.9 }, 1.45)
        .fromTo(q("[data-hero-meta]"), { opacity: 0 }, { opacity: 1, duration: 1 }, 1.6);

      /* --- Scroll choreography while pinned --- */
      const tl = gsap.timeline({
        scrollTrigger: { trigger: wrap.current, start: "top top", end: "bottom bottom", scrub: 0.6 },
      });
      tl.to(q("[data-hero-bg]"), { scale: 1.12, yPercent: 4, ease: "none" }, 0)
        .to(q("[data-hero-atmo]"), { yPercent: -18, ease: "none" }, 0)
        .to(q("[data-hero-content]"), { y: -90, opacity: 0, ease: "power1.in" }, 0)
        .to(q("[data-hero-meta]"), { opacity: 0, ease: "none" }, 0)
        .to(q("[data-hero-dark]"), { opacity: 0.75, ease: "none" }, 0);
    }, wrap);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section ref={wrap} aria-label="Introduction" className={cn("relative", reduced ? "h-svh" : "h-[150svh] md:h-[175svh]")}>
      <div className="sticky top-0 h-svh min-h-[560px] overflow-hidden bg-ink grain">
        {/* Background layer (scroll scale) */}
        <div data-hero-bg className="absolute inset-0 will-change-transform">
          <img
            data-hero-img
            src={img("hero")}
            alt="Conceptual artwork: an unmarked autonomous aircraft silhouetted above Earth's atmospheric horizon"
            fetchPriority="high"
            decoding="async"
            className="img-cover vogon-hero-image"
          />
        </div>
        {/* Atmospheric layer — moves at a different rate for depth */}
        <div
          data-hero-atmo
          aria-hidden
          className="absolute inset-x-0 bottom-[-20%] h-[70%] bg-[radial-gradient(60%_50%_at_70%_40%,rgba(232,98,44,0.08),transparent_70%)]"
        />
        {/* Legibility gradients */}
        <div aria-hidden className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/70 to-transparent" />
        <div aria-hidden className="absolute inset-x-0 bottom-0 h-[65%] bg-gradient-to-t from-black via-black/60 to-transparent" />
        <div data-hero-dark aria-hidden className="absolute inset-0 bg-ink opacity-0" />

        {/* Content */}
        <div className="shell relative flex h-full flex-col justify-end pb-12 md:pb-16">
          <div data-hero-content className="grid-12 items-end gap-y-8">
            <div className="col-span-4 md:col-span-9 xl:col-span-8">
              <h1 className="display-xl vogon-hero-title text-paper">
                {["Engineering the next", "frontier of defence."].map((l) => (
                  <span key={l} className="block overflow-hidden pb-[0.06em] -mb-[0.06em]">
                    <span data-line-inner className="block will-change-transform">
                      {l}
                    </span>
                  </span>
                ))}
              </h1>
            </div>
            <div className="col-span-4 flex flex-col gap-8 md:col-span-5 md:col-start-1 lg:col-span-4 lg:col-start-1">
              <p data-hero-copy className="body-lg max-w-md text-paper/80">
                An independent Indian technology company advancing intelligent systems, autonomous platforms, and next-generation
                engineering.
              </p>
            </div>
            <div data-hero-cta className="col-span-4 md:col-span-4 md:col-start-9 md:justify-self-end">
              <Magnetic>
                <Link to="/technologies" className="btn group min-w-[240px] vogon-interactive">
                  <span>Explore VOGON</span>
                  <span aria-hidden className="arrow">
                    ↗
                  </span>
                </Link>
              </Magnetic>
            </div>
          </div>

          <div data-hero-meta className="mt-10 hidden items-center justify-between border-t border-white/10 pt-5 md:flex">
            <span className="eyebrow">Autonomous systems / Aerospace / Intelligence / Robotics</span>
            <ConceptTag>Conceptual artwork — not a VOGON product</ConceptTag>
            <span className="eyebrow flex items-center gap-3">
              Scroll
              <span aria-hidden className="relative block h-6 w-px overflow-hidden bg-white/15">
                <span className="absolute inset-x-0 top-0 h-2 animate-[scrollcue_1.8s_ease-in-out_infinite] bg-paper" />
              </span>
            </span>
          </div>
        </div>
      </div>
      <style>{`@keyframes scrollcue{0%{transform:translateY(-100%)}100%{transform:translateY(300%)}}`}</style>
    </section>
  );
}
