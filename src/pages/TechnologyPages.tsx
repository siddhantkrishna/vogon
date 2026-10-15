import { Link, useParams } from "react-router-dom";
import { projects, technologies } from "@/content/site";
import { PageHero } from "@/components/PageHero";
import { DrawRule, MaskedTextReveal, Reveal, RevealImage } from "@/components/motion";
import { ConceptTag, SectionEyebrow, useSeo } from "@/components/ui";
import { FinalCta, ProjectCard } from "@/sections/HomeSections";
import NotFound from "./NotFound";
import { cn } from "@/utils/cn";

export function TechnologiesPage() {
  useSeo({
    title: "Technologies",
    description: "VOGON's technology focus areas: autonomous systems, aerospace technologies, artificial intelligence and advanced robotics.",
    path: "/technologies",
  });
  return (
    <>
      <PageHero
        eyebrow="Technologies"
        lines={["Intelligence", "meets engineering."]}
        intro="Four interlocking focus areas. Each is a discipline in its own right; together they form the foundation for autonomous, intelligent physical systems."
      />
      <section aria-label="Technology focus areas" className="bg-ink pb-28 md:pb-40">
        <div className="shell">
          <DrawRule />
          {technologies.map((t, i) => (
            <Link
              key={t.slug}
              to={`/technologies/${t.slug}`}
              className="group grid-12 items-center gap-y-6 border-b border-line py-10 md:py-14"
            >
              <span className="eyebrow col-span-1 self-start md:col-span-1 md:pt-3">{t.index}</span>
              <div className="col-span-3 md:col-span-6">
                <h2 className="display-md transition-transform duration-500 ease-[var(--ease-expo)] md:group-hover:translate-x-3">{t.title}</h2>
                <p className="eyebrow mt-4">{t.kicker}</p>
                <p className="body mt-6 max-w-md">{t.short}</p>
              </div>
              <div className={cn("col-span-4 md:col-span-4 md:col-start-8", i % 2 && "md:col-span-5 md:col-start-8")}>
                <RevealImage src={t.image} alt={t.imageAlt} className="aspect-[16/10]" />
              </div>
              <span aria-hidden className="arrow col-span-4 hidden justify-self-end text-2xl md:col-span-1 md:block">
                ↗
              </span>
            </Link>
          ))}
          <p className="eyebrow mt-10 max-w-xl normal-case tracking-normal">
            These are proposed focus areas of research and development. They do not describe fielded products. All imagery is
            conceptual.
          </p>
        </div>
      </section>
      <FinalCta lines={["Engineered for", "complex environments."]} magnetic={false} />
    </>
  );
}

export function TechnologyDetailPage() {
  const { slug } = useParams();
  const tech = technologies.find((t) => t.slug === slug);
  useSeo({
    title: tech ? tech.title : "Not found",
    description: tech?.short,
    path: `/technologies/${slug}`,
  });
  if (!tech) return <NotFound />;

  const idx = technologies.indexOf(tech);
  const next = technologies[(idx + 1) % technologies.length];
  const related = projects.filter((p) => tech.related.includes(p.slug));

  return (
    <>
      <PageHero
        eyebrow={`Technologies / ${tech.kicker}`}
        index={tech.index}
        lines={[tech.title + "."]}
        intro={tech.short}
        image={tech.image}
        imageAlt={tech.imageAlt}
      />

      {/* Overview */}
      <section aria-labelledby="ov" className="bg-ink py-28 md:py-40">
        <div className="shell grid-12 gap-y-10">
          <SectionEyebrow index="01" className="col-span-4 md:col-span-3">
            Overview
          </SectionEyebrow>
          <div className="col-span-4 md:col-span-8">
            <h2 id="ov" className="sr-only">
              Overview
            </h2>
            <Reveal stagger={0.1} className="space-y-8">
              {tech.overview.map((p, i) => (
                <p key={i} className={i === 0 ? "text-[clamp(1.4rem,2.6vw,2.4rem)] leading-[1.2] tracking-[-0.02em]" : "body-lg"}>
                  {p}
                </p>
              ))}
            </Reveal>
          </div>
        </div>
      </section>

      {/* Challenges */}
      <section aria-labelledby="ch" className="border-t border-line bg-ink-2 py-28 md:py-36">
        <div className="shell">
          <div className="grid-12 mb-16 gap-y-6">
            <SectionEyebrow index="02" className="col-span-4 md:col-span-3">
              Research challenges
            </SectionEyebrow>
            <MaskedTextReveal id="ch" lines={["The hard problems."]} className="display-lg col-span-4 md:col-span-9" />
          </div>
          <Reveal stagger={0.08} className="grid grid-cols-1 gap-px bg-line md:grid-cols-3">
            {tech.challenges.map((c, i) => (
              <div key={c.title} className="bg-ink-2 p-0 py-8 md:p-10">
                <p className="eyebrow mb-16">0{i + 1}</p>
                <h3 className="mb-4 text-2xl font-medium tracking-[-0.02em]">{c.title}</h3>
                <p className="body">{c.text}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Disciplines */}
      <section aria-labelledby="dis" className="bg-ink py-28 md:py-36">
        <div className="shell grid-12 gap-y-10">
          <SectionEyebrow index="03" className="col-span-4 md:col-span-3">
            Engineering disciplines
          </SectionEyebrow>
          <h2 id="dis" className="sr-only">
            Engineering disciplines
          </h2>
          <ul className="col-span-4 md:col-span-9">
            {tech.disciplines.map((d) => (
              <Reveal as="li" key={d} className="flex items-baseline justify-between border-b border-line py-5">
                <span className="text-[clamp(1.5rem,3.4vw,3rem)] font-medium uppercase leading-none tracking-[-0.03em]">{d}</span>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Approach */}
      <section aria-labelledby="ap" className="border-t border-line bg-ink py-28 md:py-36">
        <div className="shell">
          <div className="grid-12 mb-16 gap-y-6">
            <SectionEyebrow index="04" className="col-span-4 md:col-span-3">
              Development approach
            </SectionEyebrow>
            <MaskedTextReveal id="ap" lines={["Model. Simulate.", "Prove."]} className="display-lg col-span-4 md:col-span-9" />
          </div>
          <ol className="grid-12 gap-y-10">
            {tech.approach.map((a, i) => (
              <Reveal as="li" key={a.step} delay={i * 0.08} className="col-span-4 border-t border-paper/60 pt-6 md:col-span-4">
                <p className="eyebrow mb-8 text-paper">{a.step}</p>
                <h3 className="mb-3 text-2xl font-medium uppercase tracking-[-0.02em]">{a.title}</h3>
                <p className="body max-w-xs">{a.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {related.length > 0 && (
        <section aria-labelledby="rel" className="border-t border-line bg-ink-2 py-28 md:py-36">
          <div className="shell">
            <div className="mb-14 flex items-end justify-between">
              <h2 id="rel" className="display-md">
                Related research
              </h2>
              <ConceptTag className="hidden md:inline">Sample projects</ConceptTag>
            </div>
            <div className="grid-12 gap-y-14">
              {related.map((p) => (
                <div key={p.slug} className="col-span-4 md:col-span-6">
                  <ProjectCard project={p} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Next */}
      <Link to={`/technologies/${next.slug}`} className="group relative block overflow-hidden border-t border-line">
        <img src={next.image} alt="" loading="lazy" className="img-cover absolute inset-0 opacity-30 transition-[opacity,transform] duration-1000 group-hover:scale-[1.03] group-hover:opacity-45" />
        <div className="shell relative flex min-h-[46svh] flex-col justify-end py-14">
          <p className="eyebrow mb-4">Next — {next.index}</p>
          <p className="display-lg flex items-end justify-between gap-6">
            <span>{next.title}</span>
            <span aria-hidden className="arrow arrow-x text-[0.6em]">
              →
            </span>
          </p>
        </div>
      </Link>
      <FinalCta lines={["Discuss this", "focus area."]} magnetic={false} />
    </>
  );
}
