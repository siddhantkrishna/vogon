import { useRef, type ElementType, type ReactNode, type CSSProperties } from "react";
import { gsap, ScrollTrigger, useIsoLayoutEffect, useReducedMotion } from "@/lib/motion";
import { cn } from "@/utils/cn";

/* ------------------------------------------------------------------ */
/* MaskedTextReveal — lines rise from overflow-hidden masks            */
/* ------------------------------------------------------------------ */
type MaskedProps = {
  lines: string[];
  as?: ElementType;
  className?: string;
  delay?: number;
  stagger?: number;
  /** "scroll" reveals on enter, "load" plays immediately */
  trigger?: "scroll" | "load";
  start?: string;
  id?: string;
};

export function MaskedTextReveal({
  lines,
  as: Tag = "h2",
  className,
  delay = 0,
  stagger = 0.09,
  trigger = "scroll",
  start = "top 85%",
  id,
}: MaskedProps) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useIsoLayoutEffect(() => {
    if (reduced || !ref.current) return;
    const ctx = gsap.context(() => {
      const inner = ref.current!.querySelectorAll("[data-line-inner]");
      gsap.fromTo(
        inner,
        { yPercent: 112 },
        {
          yPercent: 0,
          duration: 1.05,
          ease: "expo.out",
          stagger,
          delay,
          scrollTrigger: trigger === "scroll" ? { trigger: ref.current, start, once: true } : undefined,
        },
      );
    }, ref);
    return () => ctx.revert();
  }, [reduced, trigger, delay, stagger, start]);

  return (
    <Tag ref={ref} id={id} className={className}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.06em] -mb-[0.06em]">
          <span data-line-inner className="block will-change-transform">
            {line}
          </span>
        </span>
      ))}
    </Tag>
  );
}

/* ------------------------------------------------------------------ */
/* Reveal — opacity + translate on scroll                              */
/* ------------------------------------------------------------------ */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 24,
  as: Tag = "div",
  stagger,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: ElementType;
  /** If set, children elements stagger individually */
  stagger?: number;
}) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  useIsoLayoutEffect(() => {
    if (reduced || !ref.current) return;
    const ctx = gsap.context(() => {
      const targets = stagger ? ref.current!.children : ref.current;
      gsap.fromTo(
        targets,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          delay,
          stagger: stagger ?? 0,
          ease: "expo.out",
          scrollTrigger: { trigger: ref.current, start: "top 88%", once: true },
        },
      );
    }, ref);
    return () => ctx.revert();
  }, [reduced, delay, y, stagger]);
  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}

/* ------------------------------------------------------------------ */
/* RevealImage — vertical clip-path mask with settling scale           */
/* ------------------------------------------------------------------ */
export function RevealImage({
  src,
  alt,
  className,
  imgClassName,
  direction = "up",
  eager = false,
  style,
}: {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  direction?: "up" | "down";
  eager?: boolean;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  useIsoLayoutEffect(() => {
    if (reduced || !ref.current) return;
    const ctx = gsap.context(() => {
      const from = direction === "up" ? "inset(100% 0% 0% 0%)" : "inset(0% 0% 100% 0%)";
      const tl = gsap.timeline({ scrollTrigger: { trigger: ref.current, start: "top 85%", once: true } });
      tl.fromTo(ref.current, { clipPath: from }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.1, ease: "expo.inOut" });
      // Scale the wrapper (not the <SiteImage>) so CSS hover zoom on the image keeps working
      tl.fromTo(ref.current!.querySelector(".media-zoom"), { scale: 1.18 }, { scale: 1, duration: 1.6, ease: "expo.out", clearProps: "transform" }, 0.1);
    }, ref);
    return () => ctx.revert();
  }, [reduced, direction]);
  return (
    <div ref={ref} className={cn("relative overflow-hidden bg-surface", className)} style={style}>
      <div className="media-zoom h-full w-full overflow-hidden">
        <img
          src={src}
          alt={alt}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          className={cn("img-cover", imgClassName)}
        />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* ParallaxMedia — background drifts relative to scroll               */
/* ------------------------------------------------------------------ */
export function ParallaxMedia({
  src,
  alt,
  className,
  amount = 12,
  overlay = "bg-black/40",
}: {
  src: string;
  alt: string;
  className?: string;
  amount?: number;
  overlay?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  useIsoLayoutEffect(() => {
    if (reduced || !ref.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current!.querySelector("img"),
        { yPercent: -amount },
        {
          yPercent: amount,
          ease: "none",
          scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom top", scrub: true },
        },
      );
    }, ref);
    return () => ctx.revert();
  }, [reduced, amount]);
  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className="absolute inset-x-0 top-[-15%] h-[130%] w-full object-cover"
      />
      <div className={cn("absolute inset-0", overlay)} />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* DrawRule — horizontal line draws on scroll                          */
/* ------------------------------------------------------------------ */
export function DrawRule({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  useIsoLayoutEffect(() => {
    if (reduced || !ref.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 1.2, ease: "expo.inOut", scrollTrigger: { trigger: ref.current, start: "top 92%", once: true } },
      );
    }, ref);
    return () => ctx.revert();
  }, [reduced]);
  return <div ref={ref} aria-hidden className={cn("rule", className)} />;
}

/* ------------------------------------------------------------------ */
/* Magnetic — used sparingly on 1–2 hero CTAs (desktop, fine pointer)  */
/* ------------------------------------------------------------------ */
export function Magnetic({ children, strength = 0.25 }: { children: ReactNode; strength?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();
  useIsoLayoutEffect(() => {
    const el = ref.current;
    if (!el || reduced || !window.matchMedia("(pointer: fine)").matches) return;
    const xTo = gsap.quickTo(el, "x", { duration: 0.6, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.6, ease: "power3.out" });
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      xTo((e.clientX - (r.left + r.width / 2)) * strength);
      yTo((e.clientY - (r.top + r.height / 2)) * strength);
    };
    const leave = () => {
      xTo(0);
      yTo(0);
    };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
    };
  }, [reduced, strength]);
  return (
    <span ref={ref} className="inline-block">
      {children}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* ScrollProgress — thin hairline at top of viewport                   */
/* ------------------------------------------------------------------ */
export function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);
  useIsoLayoutEffect(() => {
    const st = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
        if (ref.current) ref.current.style.transform = `scaleX(${self.progress})`;
      },
    });
    return () => st.kill();
  }, []);
  return (
    <div aria-hidden className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-px">
      <div ref={ref} className="h-full origin-left bg-paper/70" style={{ transform: "scaleX(0)" }} />
    </div>
  );
}
