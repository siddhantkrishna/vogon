import { useSeo } from "@/components/ui";
import { CinematicHero } from "@/sections/CinematicHero";
import { CapabilityIndex } from "@/sections/CapabilityIndex";
import {AboutSection, CareersSection, FinalCta, ResearchSection, } from "@/sections/HomeSections";

export default function HomePage() {
  useSeo({
    title: "VOGON — Advanced Defence & Aerospace Technology",
    description:
      "VOGON is an Indian technology startup exploring autonomous systems, aerospace engineering, artificial intelligence, and advanced robotics.",
    path: "/",
  });
  return (
    <>
      <CinematicHero />
      <CapabilityIndex />
      <ResearchSection />
      <AboutSection />
      <CareersSection />
      <FinalCta />
    </>
  );
}
