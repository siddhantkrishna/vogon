import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { gsap, useIsoLayoutEffect, useReducedMotion } from "@/lib/motion";
import { img } from "@/content/site";

export function CinematicHero() {
  const section = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoReady, setVideoReady] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;

    const play = () => {
      video.play().catch(() => {
        setVideoReady(false);
      });
    };

    const onReady = () => {
      setVideoReady(true);
      play();
    };

    video.addEventListener("loadeddata", onReady);
    video.addEventListener("canplay", onReady);

    if (video.readyState >= 2) onReady();
    else video.load();

    document.addEventListener("visibilitychange", play);

    return () => {
      video.removeEventListener("loadeddata", onReady);
      video.removeEventListener("canplay", onReady);
      document.removeEventListener("visibilitychange", play);
    };
  }, []);

  useIsoLayoutEffect(() => {
    if (!section.current || reduced) return;

    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(section.current);

      const intro = gsap.timeline({
        defaults: { ease: "power3.out" }
      });

      intro
        .fromTo(q("[data-vogon-video]"),
          { scale: 1.08, opacity: 0 },
          { scale: 1, opacity: 1, duration: 2.4 }
        )
        .fromTo(q("[data-vogon-title]"),
          { y: 80, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.3 },
          0.45
        )
        .fromTo(q("[data-vogon-info]"),
          { y: 25, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9 },
          1
        );

      gsap.to(q("[data-vogon-video]"), {
        scale: 1.12,
        ease: "none",
        scrollTrigger: {
          trigger: section.current,
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });

      gsap.to(q("[data-vogon-title]"), {
        y: -90,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: section.current,
          start: "top top",
          end: "80% top",
          scrub: true
        }
      });
    }, section);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      ref={section}
      className="vogon-film-hero"
      aria-label="VOGON introduction"
    >
      <div data-vogon-video className="vogon-film-media">
        <video
          ref={videoRef}
          className="vogon-film-video"
          style={{ opacity: videoReady ? 1 : 0 }}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={img("hero")}
          aria-hidden="true"
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>

        <img
          src={img("hero")}
          alt=""
          className="vogon-film-poster"
          aria-hidden="true"
        />
      </div>

      <div className="vogon-film-shade" aria-hidden="true" />

      <div className="vogon-film-main">
        <div data-vogon-title className="vogon-film-headline">
          <p className="vogon-film-eyebrow">
            VOGON / DEFENCE & AEROSPACE
          </p>

          <h1>
            ENGINEERING
            <span>THE FUTURE</span>
            OF DEFENCE.
          </h1>
        </div>

        <div data-vogon-info className="vogon-film-bottom">
          <div className="vogon-film-statement">
            <span>INTELLIGENCE</span>
            <span>AUTONOMY</span>
            <span>ENGINEERING</span>
          </div>

          <div className="vogon-film-center-mark">
            V / 001
          </div>

          <Link to="/technologies" className="vogon-film-link">
            EXPLORE TECHNOLOGIES
            <svg
              viewBox="0 0 24 24"
              width="18"
              height="18"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              aria-hidden="true"
            >
              <path d="M4 12h16M13 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>

      <div className="vogon-film-bottom-rule" aria-hidden="true" />
    </section>
  );
}
