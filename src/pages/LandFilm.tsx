import { useEffect, useRef } from "react";
import { useSeo } from "@/components/ui";

export default function LandFilm() {
  const ref = useRef<HTMLVideoElement>(null);

  useSeo({
    title: "Land — VOGON",
    path: "/domains/land",
  });

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;
    video.loop = true;
    video.playsInline = true;

    const play = () => {
      if (!document.hidden) {
        void video.play().catch(() => {});
      }
    };

    const visibility = () => {
      if (document.hidden) video.pause();
      else play();
    };

    play();
    document.addEventListener("visibilitychange", visibility);

    return () => {
      document.removeEventListener("visibilitychange", visibility);
      video.pause();
    };
  }, []);

  return (
    <main className="fixed inset-0 z-[100] h-dvh w-screen overflow-hidden bg-black">
      <video
        ref={ref}
        src="/videos/land.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="h-full w-full object-cover"
        aria-label="VOGON Land film"
      />
    </main>
  );
}
