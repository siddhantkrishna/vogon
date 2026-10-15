import { Link } from "react-router-dom";
import { img, projects, technologies, type Project, type Technology } from "@/content/site";
import { DrawRule, Magnetic, MaskedTextReveal, ParallaxMedia, Reveal, RevealImage } from "@/components/motion";
import { AnimatedLink, ConceptTag, SectionEyebrow } from "@/components/ui";
import { cn } from "@/utils/cn";

/* ------------------------------------------------------------------ */
/* 02 — Mission                                                        */
/* ------------------------------------------------------------------ */
export function MissionSection() {
  return (
    <section aria-labelledby="mission-heading" className="relative bg-ink py-32 md:py-52">
      <div className="shell">
        <div className="grid-12 gap-y-10">
          <SectionEyebrow index="01" className="col-span-4 md:col-span-3">
            Our mission
          </SectionEyebrow>
          <MaskedTextReveal
            id="mission-heading"
            lines={["Technology that", "redefines what", "is possible."]}
            className="display-xl col-span-4 md:col-span-9"
          />
        </div>
        <div className="grid-12 mt-16 md:mt-28">
          <Reveal className="col-span-4 md:col-span-5 md:col-start-8" delay={0.15}>
            <DrawRule className="mb-8" />
            <p className="body-lg">
              VOGON explores the intersection of advanced engineering, intelligent computation, and autonomous systems to shape the
              next generation of critical technologies.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 03 — Technology showcases                                           */
/* ------------------------------------------------------------------ */
export function TechnologyShowcase({ tech, layout }: { tech: Technology; layout: "left" | "right" | "full" }) {
  if (layout === "full") {
    return (
      <Link to={`/technologies/${tech.slug}`} className="group relative block" aria-label={`${tech.title} — explore`}>
        <RevealImage src={tech.image} alt={tech.imageAlt} className="aspect-[4/5] w-full sm:aspect-[16/10] lg:aspect-[21/9]" />
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
        <div className="shell pointer-events-none absolute inset-x-0 bottom-0 pb-10 md:pb-14">
          <div className="grid-12 items-end gap-y-6">
            <div className="col-span-4 md:col-span-7">
              <p className="eyebrow mb-5 text-paper/80">{tech.index} — Focus area</p>
              <h3 className="display-lg">{tech.title}</h3>
            </div>
            <div className="col-span-4 md:col-span-4 md:col-start-9">
              <p className="body text-paper/75">{tech.short}</p>
              <span className="label mt-6 inline-flex items-center gap-3">
                Explore <span className="arrow arrow-x">→</span>
              </span>
            </div>
          </div>
        </div>
        <ConceptTag className="absolute right-[var(--gutter)] top-6" />
      </Link>
    );
  }

  const imageFirst = layout === "left";
  return (
    <div className="shell">
      <Link to={`/technologies/${tech.slug}`} className="group grid-12 items-end gap-y-8 border-t border-line pt-8 md:pt-10">
        <div className={cn("col-span-4 md:col-span-7", !imageFirst && "md:order-2 md:col-start-6")}>
          <RevealImage src={tech.image} alt={tech.imageAlt} className="aspect-[4/3] w-full" />
        </div>
        <Reveal
          delay={0.25}
          className={cn(
            "col-span-4 flex flex-col md:col-span-4 md:min-h-full md:justify-between",
            imageFirst ? "md:col-start-9" : "md:order-1 md:col-start-1",
          )}
        >
          <p className="eyebrow mb-10 md:mb-0">{tech.index} / 04</p>
          <div>
            <h3 className="display-md mb-6">{tech.title}</h3>
            <p className="body mb-8 max-w-sm">{tech.short}</p>
            <span className="label inline-flex items-center gap-3 border-b border-line pb-2 transition-colors group-hover:border-paper">
              Explore <span className="arrow arrow-x">→</span>
            </span>
          </div>
        </Reveal>
      </Link>
    </div>
  );
}

export function TechnologyDomains() {
  const layouts: ("left" | "right" | "full")[] = ["left", "right", "full", "left"];
  return (
    <section aria-labelledby="domains-heading" className="bg-ink pb-28 md:pb-40">
      <div className="shell mb-16 md:mb-24">
        <div className="grid-12 gap-y-8">
          <SectionEyebrow index="02" className="col-span-4 md:col-span-3">
            Technology domains
          </SectionEyebrow>
          <MaskedTextReveal id="domains-heading" lines={["Built for complex", "challenges."]} className="display-lg col-span-4 md:col-span-8" />
          <Reveal className="col-span-4 self-end md:col-span-1 md:text-right">
            <span className="eyebrow">Focus areas</span>
          </Reveal>
        </div>
      </div>
      <div className="flex flex-col gap-20 md:gap-32">
        {technologies.map((t, i) => (
          <TechnologyShowcase key={t.slug} tech={t} layout={layouts[i]} />
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 04 — Engineering philosophy                                         */
/* ------------------------------------------------------------------ */
export const principles = [
  { t: "Research-led", d: "Every programme starts with a precisely framed technical question, not a feature list." },
  { t: "Systems engineering", d: "We design the whole — interfaces, failure modes and lifecycle — before optimising parts." },
  { t: "Applied intelligence", d: "AI is used where it measurably improves performance, and bounded where it does not." },
  { t: "Rapid experimentation", d: "Short build–test–learn loops in simulation and on hardware." },
  { t: "Deployable reliability", d: "Robustness, maintainability and documentation are design requirements." },
];

export function PhilosophySection() {
  return (
    <section aria-labelledby="approach-heading" className="relative bg-ink py-28 md:py-44">
      <div className="shell">
        <SectionEyebrow index="04" className="mb-10 md:mb-14">The VOGON approach</SectionEyebrow>
        <MaskedTextReveal
          id="approach-heading"
          lines={["First principles.", "Real-world systems.", "Uncompromising execution."]}
          className="display-lg max-w-[18ch] md:max-w-none"
        />
        <div className="grid-12 mt-20 gap-y-14 md:mt-32">
          <ol className="col-span-4 md:col-span-6 lg:col-span-5">
            {principles.map((p, i) => (
              <Reveal as="li" key={p.t} delay={i * 0.05} className="grid grid-cols-[48px_1fr] border-t border-line py-6">
                <span className="eyebrow pt-1">0{i + 1}</span>
                <div>
                  <h3 className="mb-2 text-lg font-medium tracking-[-0.01em]">{p.t}</h3>
                  <p className="body">{p.d}</p>
                </div>
              </Reveal>
            ))}
          </ol>
          <div className="col-span-4 md:col-span-6 md:col-start-7 lg:col-span-6 lg:col-start-7">
            <ParallaxMedia
              src={img("engineering")}
              alt="Conceptual close-up of flight-control electronics in a machined housing"
              className="aspect-[4/5] w-full md:sticky md:top-24"
              overlay="bg-black/15"
            />
            <ConceptTag className="mt-4 block">Conceptual imagery</ConceptTag>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 06 — Research & development                                         */
/* ------------------------------------------------------------------ */
export function ProjectCard({ project, size = "md" }: { project: Project; size?: "lg" | "md" }) {
  return (
    <Link to={`/research/${project.slug}`} className="group block">
      <RevealImage
        src={project.image}
        alt={project.imageAlt}
        className={size === "lg" ? "aspect-[4/3] md:aspect-[16/9]" : "aspect-[4/3]"}
      />
      <div className="mt-6 flex items-start justify-between gap-6 border-b border-line pb-6">
        <div>
          <p className="eyebrow mb-3">
            {project.category} — <span className="text-paper/80">Status: {project.status}</span>
          </p>
          <h3 className={cn("font-medium uppercase tracking-[-0.025em]", size === "lg" ? "display-md" : "text-2xl md:text-3xl")}>
            {project.name}
          </h3>
          {size === "lg" && <p className="body mt-4 max-w-xl">{project.summary}</p>}
        </div>
        <span aria-hidden className="arrow mt-1 text-xl">
          ↗
        </span>
      </div>
      {project.placeholder && <ConceptTag className="mt-3 block">Sample project — conceptual placeholder</ConceptTag>}
    </Link>
  );
}

export function ResearchSection() {
  const [first, ...rest] = projects;
  return (
    <section aria-labelledby="research-heading" className="border-t border-line bg-ink-2 py-28 md:py-40">
      <div className="shell">
        <div className="grid-12 mb-16 items-end gap-y-8 md:mb-24">
          <SectionEyebrow index="06" className="col-span-4 md:col-span-3">
            Research &amp; development
          </SectionEyebrow>
          <MaskedTextReveal id="research-heading" lines={["Research", "directions."]} className="display-lg col-span-4 md:col-span-6" />
          <Reveal className="col-span-4 md:col-span-3 md:text-right">
            <AnimatedLink to="/research">All research</AnimatedLink>
          </Reveal>
        </div>
        <div className="grid-12 gap-y-16">
          <div className="col-span-4 md:col-span-12">
            <ProjectCard project={first} size="lg" />
          </div>
          {rest.map((p, i) => (
            <div key={p.slug} className={cn("col-span-4 md:col-span-6", i === 1 && "md:mt-24")}>
              <ProjectCard project={p} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 07 — About                                                          */
/* ------------------------------------------------------------------ */
export function AboutSection() {
  return (
    <section aria-labelledby="about-heading" className="bg-ink">
      <ParallaxMedia
        src={img("facility")}
        alt="Conceptual image of an aerospace assembly hangar at night"
        className="h-[70svh] min-h-[420px] md:h-[90svh]"
        overlay="bg-gradient-to-b from-black/30 via-black/20 to-ink"
      />
      <div className="shell relative -mt-40 pb-28 md:-mt-64 md:pb-40">
        <SectionEyebrow index="07" className="mb-8">
          About VOGON
        </SectionEyebrow>
        <MaskedTextReveal
          id="about-heading"
          lines={["An independent", "engineering company", "built for the next era."]}
          className="display-lg"
        />
        <div className="grid-12 mt-16 gap-y-10 md:mt-24">
          <Reveal className="col-span-4 md:col-span-5">
            <p className="body-lg">
              VOGON is an Indian technology startup. We believe the systems that will matter most in the coming decades will be
              designed by small, deeply technical teams who own the problem end to end.
            </p>
          </Reveal>
          <Reveal className="col-span-4 md:col-span-4 md:col-start-8" delay={0.1}>
            <p className="body mb-10">
              Built in India, with the conviction that world-class engineering is defined by rigour and craft — not by geography.
            </p>
            <AnimatedLink to="/company">Discover our company</AnimatedLink>
          </Reveal>
        </div>
        <ConceptTag className="mt-14 block">Image: conceptual — not a VOGON facility</ConceptTag>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 08 — Careers                                                        */
/* ------------------------------------------------------------------ */
export function CareersSection() {
  return (
    <section aria-labelledby="careers-heading" className="relative overflow-hidden border-y border-line bg-ink">
      <ParallaxMedia src={img("horizon")} alt="" className="absolute inset-0" overlay="bg-black/55" amount={8} />
      <div className="shell relative flex min-h-[90svh] flex-col justify-center py-28">
        <SectionEyebrow index="08" className="mb-8">
          Careers
        </SectionEyebrow>
        <MaskedTextReveal id="careers-heading" lines={["Build what", "comes next."]} className="display-xl" />
        <div className="grid-12 mt-14">
          <Reveal className="col-span-4 md:col-span-5">
            <p className="body-lg mb-10 text-paper/80">
              Work on difficult engineering problems at the intersection of software, intelligence, and physical systems.
            </p>
            <Link to="/careers" className="btn group">
              <span>Explore careers</span>
              <span aria-hidden className="arrow">
                ↗
              </span>
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 09 — Final CTA (also reused on inner pages)                         */
/* ------------------------------------------------------------------ */
export function FinalCta({
  lines = ["The next frontier", "starts here."],
  magnetic = true,
}: {
  lines?: string[];
  magnetic?: boolean;
}) {
  const contact = (
    <Link to="/contact" className="btn group w-full min-w-[260px] sm:w-auto">
      <span>Contact VOGON</span>
      <span aria-hidden className="arrow">
        ↗
      </span>
    </Link>
  );
  return (
    <section aria-labelledby="cta-heading" className="bg-ink py-32 md:py-48">
      <div className="shell">
        <MaskedTextReveal id="cta-heading" lines={lines} className="display-xl" />
        <DrawRule className="mt-16 md:mt-24" />
        <Reveal className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="eyebrow">Inquiries, research collaboration, careers</p>
          <div className="flex flex-col gap-4 sm:flex-row">
            {magnetic ? <Magnetic strength={0.2}>{contact}</Magnetic> : contact}
            <Link to="/technologies" className="btn btn-ghost group w-full min-w-[260px] sm:w-auto">
              <span>Explore technologies</span>
              <span aria-hidden className="arrow">
                ↗
              </span>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
