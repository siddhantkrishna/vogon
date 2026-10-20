import { useSeo } from "@/components/ui";
import { CinematicHero } from "@/sections/CinematicHero";
import { CapabilityIndex } from "@/sections/CapabilityIndex";
import {AboutSection, CareersSection, FinalCta, ResearchSection, } from "@/sections/HomeSections";


const defenceCompanies = [
  { name: "PALANTIR", url: "https://www.palantir.com" },
  { name: "ANDURIL", url: "https://www.anduril.com" },
  { name: "SHIELD AI", url: "https://shield.ai" },
  { name: "HELSING", url: "https://helsing.ai" },
  { name: "SARONIC", url: "https://www.saronic.com" },
  { name: "SKYDIO", url: "https://www.skydio.com" },
  { name: "EPIRUS", url: "https://www.epirusinc.com" },
  { name: "CASTELION", url: "https://www.castelion.com" },
  { name: "MACH INDUSTRIES", url: "https://www.machindustries.com" },
];

function DefenceCompaniesMarquee() {
  return (
    <section
      aria-label="Emerging defence technology companies"
      className="relative overflow-hidden bg-black py-14 md:py-20"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-black to-transparent md:w-40"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-black to-transparent md:w-40"
      />

      <div className="vogon-company-marquee flex w-max items-center">
        {[0, 1].map((copy) => (
          <div
            key={copy}
            aria-hidden={copy === 1}
            className="flex shrink-0 items-center gap-16 pr-16 md:gap-28 md:pr-28"
          >
            {defenceCompanies.map((company) => (
              <a
                key={company.name}
                href={company.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit ${company.name} website`}
                className="select-none whitespace-nowrap font-semibold tracking-[-0.045em] text-white/35 transition-colors duration-300 hover:text-white/75 focus-visible:text-white focus-visible:outline focus-visible:outline-1 focus-visible:outline-white"
                style={{
                  fontFamily: "Inter Tight, Inter, sans-serif",
                  fontSize: "clamp(20px, 2.6vw, 34px)",
                }}
              >
                {company.name}
              </a>
            ))}
          </div>
        ))}
      </div>

      <style>{`
        .vogon-company-marquee {
          animation: vogon-marquee-scroll 40s linear infinite;
          will-change: transform;
        }
        .vogon-company-marquee:hover {
          animation-play-state: paused;
        }
        @keyframes vogon-marquee-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .vogon-company-marquee {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}

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
      <DefenceCompaniesMarquee />
      <ResearchSection />
      <AboutSection />
      <CareersSection />
      <FinalCta />
    </>
  );
}
