import { useId, useRef } from "react";
import { Link } from "react-router-dom";
import { VogonIcon } from "@/components/VogonIcon";
import { gsap, ScrollTrigger, useIsoLayoutEffect, useReducedMotion } from "@/lib/motion";

// Fixed positions keep the sky stable across renders and route transitions.
const stars = Array.from({ length: 58 }, (_, index) => ({
  x: Number(((index * 137.508 + 31) % 1600).toFixed(2)),
  y: Number(((index * 83.719 + 47) % 730).toFixed(2)),
  radius: index % 9 === 0 ? 1.05 : 0.55,
  opacity: 0.18 + (index % 5) * 0.1,
}));

export default function SpaceComingSoon() {
  const heroRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const id = useId().replace(/:/g, "");

  useIsoLayoutEffect(() => {
    const hero = heroRef.current;
    if (!hero || reducedMotion) return;

    const ctx = gsap.context(() => {
      const select = gsap.utils.selector(hero);
      const intro = gsap.timeline({ defaults: { ease: "power2.inOut" } });

      gsap.set(select("[data-space-atmosphere], [data-space-stars], [data-space-copy], [data-space-back]"), { opacity: 0 });
      gsap.set(select("[data-space-word]"), { yPercent: 115 });
      gsap.set(select("[data-space-orbit]"), { strokeDashoffset: 1 });

      intro
        .to(select("[data-space-atmosphere]"), { opacity: 1, duration: 2.8 }, 0.25)
        .to(select("[data-space-stars]"), { opacity: 1, duration: 2.4, stagger: 0.3 }, 0.9)
        .to(select("[data-space-orbit]"), { strokeDashoffset: 0, duration: 3.4, ease: "power1.inOut" }, 1.3)
        .to(select("[data-space-word]"), { yPercent: 0, duration: 1.6, stagger: 0.13, ease: "power4.out" }, 1.8)
        .to(select("[data-space-copy]"), { opacity: 1, duration: 1.3, stagger: 0.25 }, 2.65)
        .to(select("[data-space-back]"), { opacity: 1, duration: 1.1 }, 3.5);

      // Nested layers separate ambient drift from scroll-driven transforms.
      const ambient = gsap.timeline({ repeat: -1, yoyo: true, paused: true })
        .to(select("[data-space-drift]"), { y: -9, x: 4, duration: 22, ease: "sine.inOut" }, 0)
        .to(select("[data-space-near]"), { x: -5, y: 3, duration: 22, ease: "sine.inOut" }, 0);

      gsap.to(select("[data-space-depth]"), {
        yPercent: 12,
        ease: "none",
        scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: 0.8 },
      });
      gsap.to(select("[data-space-stars-depth]"), {
        yPercent: 5,
        ease: "none",
        scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: 0.8 },
      });

      // Pause perpetual work when the scene is offscreen or the tab is hidden.
      let inView = true;
      const syncPlayback = () => {
        const active = inView && !document.hidden;
        ambient.paused(!active);
        intro.paused(!active);
      };
      ScrollTrigger.create({
        trigger: hero,
        start: "top bottom",
        end: "bottom top",
        onToggle: (self) => { inView = self.isActive; syncPlayback(); },
      });
      document.addEventListener("visibilitychange", syncPlayback);
      syncPlayback();
      return () => document.removeEventListener("visibilitychange", syncPlayback);
    }, hero);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section ref={heroRef} className="vogon-space" aria-labelledby="space-title">
      <div className="vogon-space-sky" aria-hidden="true">
        <div className="vogon-space-stars-depth" data-space-stars-depth>
          {[0, 1].map((layer) => (
            <svg key={layer} className="vogon-space-stars" viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice" data-space-stars>
              <g {...(layer === 1 ? { "data-space-near": "" } : {})}>
                {stars.filter((_, index) => index % 2 === layer).map((star, index) => (
                  <circle key={index} cx={star.x} cy={star.y} r={star.radius} fill="#d5dfeb" opacity={star.opacity} />
                ))}
              </g>
            </svg>
          ))}
        </div>

        <div className="vogon-space-depth" data-space-depth>
          <div className="vogon-space-drift" data-space-drift>
            <div className="vogon-space-atmosphere" data-space-atmosphere>
              <svg className="vogon-space-planet" viewBox="0 0 1600 1000" preserveAspectRatio="none">
                <defs>
                  <radialGradient id={`${id}-light`} cx="65%" cy="62%" r="40%" gradientTransform="translate(0 .37) scale(1 .4)">
                    <stop offset="0" stopColor="#466984" stopOpacity=".27" />
                    <stop offset=".42" stopColor="#20384e" stopOpacity=".15" />
                    <stop offset="1" stopColor="#000" stopOpacity="0" />
                  </radialGradient>
                  <linearGradient id={`${id}-surface`} x1="0" y1="0" x2=".1" y2="1">
                    <stop offset="0" stopColor="#060c12" />
                    <stop offset=".28" stopColor="#020407" />
                    <stop offset="1" stopColor="#000" />
                  </linearGradient>
                  <linearGradient id={`${id}-limb`}>
                    <stop offset="0" stopColor="#192b3a" stopOpacity="0" />
                    <stop offset=".37" stopColor="#50738c" stopOpacity=".18" />
                    <stop offset=".65" stopColor="#a3bfce" stopOpacity=".65" />
                    <stop offset="1" stopColor="#152d43" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path d="M-200 1000 Q800 260 1800 1000" fill="none" stroke={`url(#${id}-limb)`} strokeWidth="30" opacity=".035" />
                <path d="M-200 1000 Q800 260 1800 1000" fill="none" stroke={`url(#${id}-limb)`} strokeWidth="14" opacity=".09" />
                <path d="M-200 1000 Q800 260 1800 1000" fill="none" stroke={`url(#${id}-limb)`} strokeWidth="5" opacity=".22" />
                <path d="M-200 1000 Q800 260 1800 1000 Z" fill={`url(#${id}-surface)`} stroke={`url(#${id}-limb)`} strokeWidth="1" vectorEffect="non-scaling-stroke" />
                <rect width="1600" height="1000" fill={`url(#${id}-light)`} />
              </svg>
            </div>
            <svg className="vogon-space-orbit" viewBox="0 0 1600 1000" preserveAspectRatio="none">
              <defs>
                <linearGradient id={`${id}-orbit`} x1="0" y1="1" x2="1" y2="0">
                  <stop offset="0" stopColor="#aec0cc" stopOpacity="0" />
                  <stop offset=".4" stopColor="#aec0cc" stopOpacity=".28" />
                  <stop offset=".72" stopColor="#aec0cc" stopOpacity=".18" />
                  <stop offset="1" stopColor="#aec0cc" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path data-space-orbit d="M-100 935 C270 935 1140 710 1650 280" pathLength="1" strokeDasharray="1 1" fill="none" stroke={`url(#${id}-orbit)`} strokeWidth=".7" vectorEffect="non-scaling-stroke" />
            </svg>
          </div>
        </div>
        <div className="vogon-space-vignette" />
      </div>

      <div className="vogon-space-content">
        <p className="vogon-space-eyebrow" data-space-copy>VOGON / SPACE SYSTEMS</p>
        <h1 id="space-title" className="vogon-space-title" aria-label="Coming soon">
          <span className="vogon-space-mask"><span data-space-word aria-hidden="true">COMING</span></span>{" "}
          <span className="vogon-space-mask"><span data-space-word aria-hidden="true">SOON</span></span>
        </h1>
        <p className="vogon-space-tagline" data-space-copy>THE NEXT FRONTIER IS TAKING SHAPE.</p>
      </div>

      <div className="vogon-space-bottom" data-space-back>
        <Link to="/" className="vogon-space-back">
          <VogonIcon name="arrow-right" size={15} />
          <span>BACK TO VOGON</span>
        </Link>
      </div>
    </section>
  );
}
