import { useRef } from "react";
import { gsap, useIsoLayoutEffect, useMediaQuery, useReducedMotion } from "@/lib/motion";
import { img } from "@/content/site";
import { ConceptTag } from "@/components/ui";

const steps = [
  { word: "Perception.", caption: "Sensing the world with fidelity", image: img("autonomous"), alt: "Conceptual aircraft silhouette at dusk" },
  { word: "Autonomy.", caption: "Engineering that decides", image: img("aerospace"), alt: "Precision turbine assembly detail" },
  { word: "Precision.", caption: "Navigation by computation", image: img("perception"), alt: "Grayscale terrain with navigation overlay", hud: true },
  { word: "Engineered for the real world.", caption: "From model to field", image: img("horizon"), alt: "Earth's atmospheric horizon at dawn" },
];

/** Original vector overlay suggesting computer-vision tracking — decorative only. */
function VisionOverlay() {
  return (
    <svg aria-hidden className="absolute inset-0 h-full w-full" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" fill="none">
      <g stroke="rgba(245,245,242,0.55)" strokeWidth="1">
        <path d="M640 330 h40 M640 330 v40 M960 330 h-40 M960 330 v40 M640 570 h40 M640 570 v-40 M960 570 h-40 M960 570 v-40" />
        <circle cx="800" cy="450" r="4" fill="rgba(245,245,242,0.9)" />
        <path d="M800 410 v20 M800 470 v20 M760 450 h20 M820 450 h20" />
        <rect x="1110" y="230" width="90" height="70" strokeDasharray="4 6" />
        <rect x="330" y="610" width="120" height="80" strokeDasharray="4 6" />
        <path d="M0 450 H560 M1040 450 H1600" strokeOpacity="0.25" />
      </g>
      <g fill="rgba(245,245,242,0.7)" fontFamily="IBM Plex Mono, monospace" fontSize="12" letterSpacing="2">
        <text x="1110" y="220">TRK 02</text>
        <text x="330" y="600">TRK 07</text>
        <text x="660" y="315">LOCK</text>
      </g>
    </svg>
  );
}

export function PinnedStorySequence() {
  const wrap = useRef<HTMLElement>(null);
  const counter = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();
  const desktop = useMediaQuery("(min-width: 768px)");
  const pinned = desktop && !reduced;

  useIsoLayoutEffect(() => {
    if (!pinned || !wrap.current) return;
    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(wrap.current);
      const imgs = q("[data-story-img]");
      const words = q("[data-story-word]");
      const ticks = q("[data-story-tick]");
      gsap.set(imgs.slice(1), { opacity: 0, scale: 1.08 });
      gsap.set(words.slice(1), { opacity: 0, yPercent: 40 });

      const tl = gsap.timeline({
        defaults: { ease: "power2.inOut" },
        scrollTrigger: {
          trigger: wrap.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.8,
          onUpdate: (self) => {
            const i = Math.min(steps.length - 1, Math.floor(self.progress * steps.length * 0.999));
            if (counter.current) counter.current.textContent = `0${i + 1}`;
            ticks.forEach((t, ti) => ((t as HTMLElement).style.opacity = ti <= i ? "1" : "0.25"));
          },
        },
      });
      tl.to(imgs[0], { scale: 1.06, duration: 1, ease: "none" }, 0);
      for (let i = 1; i < steps.length; i++) {
        const at = i;
        tl.to(words[i - 1], { opacity: 0, yPercent: -40, duration: 0.35 }, at - 0.35)
          .to(imgs[i], { opacity: 1, scale: 1, duration: 0.6 }, at - 0.3)
          .to(imgs[i - 1], { opacity: 0.0, duration: 0.6 }, at - 0.1)
          .to(words[i], { opacity: 1, yPercent: 0, duration: 0.4 }, at + 0.05);
      }
      tl.to({}, { duration: 0.6 });
    }, wrap);
    return () => ctx.revert();
  }, [pinned]);

  if (!pinned) {
    return (
      <section aria-label="Perception, autonomy, precision" className="bg-ink">
        {steps.map((s, i) => (
          <div key={s.word} className="relative h-[85svh] min-h-[480px] overflow-hidden">
            <img src={s.image} alt={s.alt} loading="lazy" decoding="async" className="img-cover absolute inset-0" />
            {s.hud && <VisionOverlay />}
            <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/30" />
            <div className="shell relative flex h-full flex-col justify-end pb-12">
              <p className="eyebrow mb-4">0{i + 1} / 04 — {s.caption}</p>
              <h3 className="display-lg max-w-3xl">{s.word}</h3>
            </div>
          </div>
        ))}
      </section>
    );
  }

  return (
    <section ref={wrap} aria-label="Perception, autonomy, precision" className="relative h-[420vh] bg-ink">
      <div className="sticky top-0 h-svh overflow-hidden grain">
        {steps.map((s, i) => (
          <div key={s.word} data-story-img className="absolute inset-0 will-change-[opacity,transform]">
            <img src={s.image} alt={s.alt} loading="lazy" decoding="async" className="img-cover" />
            {s.hud && <VisionOverlay />}
            <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/50" />
            {i === 0 && <div aria-hidden className="absolute inset-0 bg-black/10" />}
          </div>
        ))}

        <div className="shell relative flex h-full flex-col justify-between pb-14 pt-32">
          <div className="flex items-start justify-between">
            <p className="eyebrow">03 / Systems in motion</p>
            <p className="eyebrow tabular-nums">
              <span ref={counter} className="text-paper">
                01
              </span>{" "}
              / 04
            </p>
          </div>

          <div className="relative h-[clamp(8rem,22vw,20rem)]">
            {steps.map((s) => (
              <h3 key={s.word} data-story-word className="display-xl absolute inset-x-0 bottom-0 max-w-5xl will-change-transform">
                {s.word}
              </h3>
            ))}
          </div>

          <div className="flex items-end justify-between gap-8 border-t border-white/15 pt-5">
            <div className="flex gap-2" aria-hidden>
              {steps.map((s, i) => (
                <span key={s.word} data-story-tick className="h-px w-12 bg-paper transition-opacity duration-300" style={{ opacity: i === 0 ? 1 : 0.25 }} />
              ))}
            </div>
            <ConceptTag>Conceptual imagery</ConceptTag>
          </div>
        </div>
      </div>
    </section>
  );
}
