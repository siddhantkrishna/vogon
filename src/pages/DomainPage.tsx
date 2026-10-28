import { VortexProjectCard } from "@/sections/ProductsSection";
import { PragyaProjectCard } from "@/sections/PragyaProjectCard";
import { Reveal } from "@/components/motion";
import { useSeo } from "@/components/ui";
import { VogonIcon } from "@/components/VogonIcon";
import { Link, useParams } from "react-router-dom";
import SpaceComingSoon from "./SpaceComingSoon";

const domains = {
  air: {
    index: "02",
    title: "Air",
    headline: "INTELLIGENCE IN FLIGHT.",
    summary:
      "Exploring autonomous flight, aerospace systems, sensing and control technologies for complex aerial environments.",
    image: "/images/autonomous.jpg",
    related: "/technologies/autonomous-systems",
    relatedLabel: "Explore autonomous systems",
  },
  land: {
    index: "03",
    title: "Land",
    headline: "ENGINEERED FOR THE REAL WORLD.",
    summary:
      "Exploring robotics, machine perception and intelligent physical systems for challenging terrestrial environments.",
    image: "/images/robotics.jpg",
    related: "/technologies/advanced-robotics",
    relatedLabel: "Explore advanced robotics",
  },
  sea: {
    index: "04",
    title: "Sea",
    headline: "BEYOND THE HORIZON.",
    summary:
      "Exploring the engineering challenges of maritime sensing, autonomous navigation and reliable systems in demanding environments.",
    image: "/images/horizon.jpg",
    related: "/technologies",
    relatedLabel: "Explore technology focus areas",
  },
  software: {
    index: "05",
    title: "Software",
    headline: "INTELLIGENCE AT THE CORE.",
    summary:
      "Exploring artificial intelligence, machine perception, simulation and software-defined systems across physical domains.",
    image: "/images/intelligence.jpg",
    related: "/technologies/artificial-intelligence",
    relatedLabel: "Explore artificial intelligence",
  },
};


/** PLUTO is an independent data-intelligence platform hosted at pluto.vogon.in. */
function PlutoProjectCard() {
  const connections = [
    [180, 260, 310, 148], [180, 260, 325, 346], [310, 148, 490, 112],
    [310, 148, 470, 240], [325, 346, 470, 240], [325, 346, 540, 390],
    [490, 112, 645, 173], [490, 112, 725, 72], [470, 240, 645, 173],
    [470, 240, 655, 332], [540, 390, 655, 332], [645, 173, 755, 241],
    [645, 173, 725, 72], [655, 332, 755, 241], [755, 241, 820, 130],
    [725, 72, 820, 130], [655, 332, 820, 392], [755, 241, 820, 392],
  ] as const;
  const points = [
    [180, 260], [310, 148], [325, 346], [490, 112], [470, 240],
    [540, 390], [645, 173], [655, 332], [725, 72], [755, 241],
    [820, 130], [820, 392],
  ] as const;

  return (
    <a
      href="https://pluto.vogon.in"
      className="vortex-project-card group mt-[clamp(70px,9vw,140px)]"
      aria-label="Explore PLUTO — Data Intelligence Platform by VOGON"
    >
      <div className="vortex-project-art">
        <svg
          viewBox="0 0 900 480"
          fill="none"
          aria-hidden="true"
          focusable="false"
          className="pointer-events-none absolute -right-[4%] top-1/2 h-full w-[74%] -translate-y-1/2 opacity-90 transition-transform duration-700 group-hover:scale-[1.025] max-md:-right-[55%] max-md:w-[150%]"
        >
          <defs>
            <radialGradient id="pluto-glow">
              <stop stopColor="#f5f5f2" stopOpacity=".085" />
              <stop offset="1" stopColor="#f5f5f2" stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx="540" cy="240" r="325" fill="url(#pluto-glow)" />
          <g stroke="#f5f5f2" strokeOpacity=".075" strokeWidth=".8">
            {Array.from({ length: 12 }, (_, i) => (
              <path key={`vertical-${i}`} d={`M${i * 80} 0V480`} />
            ))}
            {Array.from({ length: 7 }, (_, i) => (
              <path key={`horizontal-${i}`} d={`M0 ${i * 80}H900`} />
            ))}
            <circle cx="470" cy="240" r="165" strokeDasharray="2 9" />
            <circle cx="470" cy="240" r="280" strokeDasharray="2 12" />
          </g>
          <g stroke="#f5f5f2" strokeWidth="1">
            {connections.map(([x1, y1, x2, y2], i) => (
              <line
                key={i}
                x1={x1} y1={y1} x2={x2} y2={y2}
                strokeOpacity={i % 4 === 0 ? ".43" : ".18"}
              />
            ))}
          </g>
          {points.map(([x, y], i) => (
            <g key={i}>
              <circle cx={x} cy={y} r={i === 4 ? 19 : i % 3 === 0 ? 9 : 5} stroke="#f5f5f2" strokeOpacity={i === 4 ? ".56" : ".2"} strokeWidth="1" />
              <circle cx={x} cy={y} r={i === 4 ? 4 : 2.5} fill={i === 4 ? "#e8622c" : "#f5f5f2"} fillOpacity={i === 4 ? "1" : ".75"} />
            </g>
          ))}
          <g stroke="#f5f5f2" strokeOpacity=".3">
            <path d="M440 240h60M470 210v60M760 84h45v-25M192 370h-48v35" />
          </g>
        </svg>
        <div className="vortex-project-art-meta eyebrow">
          <span>VOGON / SOFTWARE / PLUTO</span>
          <span>DATA INTELLIGENCE / IN DEVELOPMENT</span>
        </div>
        <span className="vortex-project-word" aria-hidden="true">PLUTO</span>
        <span className="vortex-project-art-caption eyebrow">DATA INTELLIGENCE PLATFORM BY VOGON</span>
        <span className="vortex-project-art-note eyebrow">RELATIONSHIP NETWORK / CONCEPT STUDY</span>
      </div>
      <div className="vortex-project-details">
        <p className="eyebrow">PLUTO / BY VOGON <span className="vortex-status">In development / External platform</span></p>
        <div className="vortex-project-description">
          <div>
            <h3 className="display-md">PLUTO</h3>
            <p className="body mt-4 max-w-xl">A connected data infrastructure for institutions — bringing documents, datasets and media into a searchable, governed environment.</p>
            <p className="body mt-3 max-w-xl text-paper/80">Data ingestion and indexing are in development. AI-powered relationship discovery and analysis are planned.</p>
          </div>
          <span className="label flex shrink-0 items-center gap-5">Explore system <span className="arrow arrow-x" aria-hidden="true"><VogonIcon name="arrow-right" /></span></span>
        </div>
      </div>
    </a>
  );
}

export default function DomainPage() {
  const { domain } = useParams();
  const seo: Record<string, { title: string; description: string }> = {
    space: { title: "Space & Aerospace Research", description: "VOGON explores space and aerospace engineering as a future research direction." },
    air: { title: "Air Systems Research", description: "VOGON explores aerial autonomy, sensing and flight control." },
    land: { title: "Land Robotics & Intelligent Systems", description: "VOGON explores robotics, machine perception and intelligent terrestrial systems." },
    sea: { title: "Maritime Autonomous Systems", description: "VOGON explores maritime sensing, autonomy and engineering." },
    software: { title: "VOGON Software — VORTEX, PLUTO & PRAGYA", description: "Explore VOGON software: VORTEX, PLUTO data intelligence, and PRAGYA scientific AI." },
  };
  useSeo({ title: seo[domain || ""]?.title || "Domain not found", description: seo[domain || ""]?.description, path: domain ? `/domains/${domain}` : "/domains" });

  if (domain === "space") return <SpaceComingSoon />;

  const content = domains[domain as keyof typeof domains];

  if (!content) {
    return (
      <section className="shell min-h-screen pt-40">
        <h1 className="display-lg">Domain not found.</h1>
        <Link to="/" className="mt-8 inline-block underline">
          Return home
        </Link>
      </section>
    );
  }

  return (
    <article className="vogon-domain-page">
      <div className="shell vogon-domain-intro">
        <div className="vogon-domain-meta">
          <span>VOGON / DOMAINS</span>
          <span>{content.index} / 05</span>
        </div>

        <h1>{content.title}</h1>

        <div className="vogon-domain-intro-bottom">
          <h2>{content.headline}</h2>
          <p>{content.summary}</p>
        </div>
      </div>

      {domain === "software" ? (
        <section
          className="shell border-t border-line pb-24 pt-12 md:pb-36"
          aria-labelledby="software-project-heading"
        >
          <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
            <h2 id="software-project-heading" className="eyebrow">
              VOGON / SOFTWARE SYSTEMS
            </h2>
            <span className="eyebrow">003 SYSTEMS / VORTEX + PLUTO + PRAGYA</span>
          </div>
          <VortexProjectCard />
          <Reveal><PlutoProjectCard /></Reveal>
          <Reveal><PragyaProjectCard /></Reveal>
        </section>
      ) : (
        <div className="vogon-domain-image">
          <img
            src={content.image}
            alt={`Conceptual imagery for VOGON ${content.title}`}
          />
          <span>CONCEPTUAL IMAGERY — NOT A VOGON PRODUCT</span>
        </div>
      )}

      <div className="shell vogon-domain-footer">
        <div>
          <span className="vogon-domain-small">TECHNOLOGY FOCUS</span>
          <p>Research-led. Engineering-driven.</p>
        </div>

        <Link to={content.related}>
          {content.relatedLabel} <span aria-hidden="true"><VogonIcon name="arrow-up-right" /></span>
        </Link>
      </div>
    </article>
  );
}
