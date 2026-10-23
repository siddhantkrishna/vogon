import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

export function CinematicHero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoFailed, setVideoFailed] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.loop = true;

    const playVideo = async () => {
      try {
        await video.play();
      } catch {
        setVideoFailed(true);
      }
    };

    const onPlaying = () => setVideoFailed(false);
    const onError = () => setVideoFailed(true);

    const onVisibility = () => {
      if (!document.hidden) void playVideo();
    };

    video.addEventListener("playing", onPlaying);
    video.addEventListener("error", onError);
    document.addEventListener("visibilitychange", onVisibility);

    void playVideo();

    return () => {
      video.removeEventListener("playing", onPlaying);
      video.removeEventListener("error", onError);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <section className="vogon-film-hero" aria-label="VOGON introduction">
      <div className="vogon-film-media">
        <video
          ref={videoRef}
          src="/videos/hero.mp4"
          className="vogon-film-video"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
        />
      </div>

      <div className="vogon-film-shade" aria-hidden="true" />

      <div className="vogon-film-main">
        <div className="vogon-film-headline">
          <p className="vogon-film-eyebrow">
            VOGON / DEFENCE & AEROSPACE
          </p>

          <h1>
            ENGINEERING
            <span>THE FUTURE</span>
            OF DEFENCE.
          </h1>
        </div>

        <div className="vogon-film-bottom">
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

      {videoFailed && (
        <button
          type="button"
          className="vogon-film-retry"
          onClick={() => {
            const video = videoRef.current;
            if (!video) return;
            setVideoFailed(false);
            video.load();
            void video.play().catch(() => setVideoFailed(true));
          }}
        >
          PLAY FILM
        </button>
      )}

      <div className="vogon-film-bottom-rule" aria-hidden="true" />
    </section>
  );
}
