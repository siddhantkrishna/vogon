import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { projects, technologies } from "@/content/site";
import { PageHero } from "@/components/PageHero";
import { DrawRule, MaskedTextReveal, Reveal, RevealImage } from "@/components/motion";
import { AnimatedLink, ConceptTag, SectionEyebrow, useSeo } from "@/components/ui";
import { FinalCta } from "@/sections/HomeSections";
import NotFound from "./NotFound";
import { cn } from "@/utils/cn";

function PlaceholderNotice() {
  return (
    <div role="note" className="border border-line p-5 md:p-6">
      <p className="eyebrow mb-2 text-paper">Placeholder content</p>
      <p className="body text-[14px]">
        The projects below are clearly identified sample entries used to demonstrate structure. They are not real VOGON
        programmes, achievements or products, and will be replaced with verified information.
      </p>
    </div>
  );
}

export function ResearchPage() {
  useSeo({
    title: "Research & Development",
    description: "An index of VOGON research directions across autonomous flight, perception and robotics.",
    path: "/research",
  });
  const [open, setOpen] = useState<string | null>(projects[0].slug);

  return (
    <>
      <PageHero
        eyebrow="Research & development"
        lines={["Questions worth", "years of work."]}
        intro="Research at VOGON begins with a precisely framed technical question and progresses through simulation, prototyping and instrumented test."
      >
        <PlaceholderNotice />
      </PageHero>

      <section aria-label="Research index" className="bg-ink pb-28 md:pb-40">
        <div className="shell">
          <div className="mb-4 hidden grid-cols-12 gap-8 md:grid">
            <span className="eyebrow col-span-1">No.</span>
            <span className="eyebrow col-span-5">Project</span>
            <span className="eyebrow col-span-4">Category</span>
            <span className="eyebrow col-span-2 text-right">Status</span>
          </div>
          <DrawRule />
          <ul>
            {projects.map((p, i) => {
              const isOpen = open === p.slug;
              return (
                <li key={p.slug} className="border-b border-line">
                  <h2>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={`story-${p.slug}`}
                      onClick={() => setOpen(isOpen ? null : p.slug)}
                      className={cn(
                        "grid w-full grid-cols-[40px_1fr_24px] items-center gap-4 py-8 text-left transition-colors md:grid-cols-12 md:gap-8",
                        isOpen ? "text-paper" : "text-paper/60 hover:text-paper",
                      )}
                    >
                      <span className="eyebrow md:col-span-1">0{i + 1}</span>
                      <span className="text-[clamp(1.4rem,3vw,2.75rem)] font-medium uppercase leading-none tracking-[-0.03em] md:col-span-5">
                        {p.name}
                      </span>
                      <span className="eyebrow hidden md:col-span-4 md:block">{p.category}</span>
                      <span className="flex items-center justify-end gap-4 md:col-span-2">
                        <span className="eyebrow hidden md:inline">{p.status}</span>
                        <span aria-hidden className={cn("text-xl transition-transform duration-300", isOpen && "rotate-45")}>
                          +
                        </span>
                      </span>
                    </button>
                  </h2>
                  <div id={`story-${p.slug}`} hidden={!isOpen} className="pb-12">
                    <div className="grid-12 gap-y-8">
                      <div className="col-span-4 md:col-span-7 md:col-start-2">
                        <img src={p.image} alt={p.imageAlt} loading="lazy" className="aspect-[16/9] w-full object-cover" />
                        <ConceptTag className="mt-3 block">Sample project — conceptual imagery</ConceptTag>
                      </div>
                      <div className="col-span-4 flex flex-col justify-between gap-8 md:col-span-4">
                        <div>
                          <p className="eyebrow mb-4 md:hidden">{p.category}</p>
                          <p className="body-lg">{p.summary}</p>
                        </div>
                        <AnimatedLink to={`/research/${p.slug}`} arrow="→">
                          Read project story
                        </AnimatedLink>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
      <FinalCta lines={["Collaborate on", "hard problems."]} magnetic={false} />
    </>
  );
}

export function ResearchDetailPage() {
  const { slug } = useParams();
  const p = projects.find((x) => x.slug === slug);
  useSeo({ title: p ? p.name : "Not found", description: p?.summary, path: `/research/${slug}` });
  if (!p) return <NotFound />;
  const techs = technologies.filter((t) => p.technologies.includes(t.slug));
  const idx = projects.indexOf(p);
  const next = projects[(idx + 1) % projects.length];

  return (
    <>
      <PageHero eyebrow={`Research / ${p.category}`} lines={[p.name + "."]} intro={p.summary} image={p.image} imageAlt={p.imageAlt} />

      <section aria-label="Project details" className="bg-ink py-24 md:py-36">
        <div className="shell grid-12 gap-y-14">
          <aside className="col-span-4 md:col-span-3">
            <dl className="space-y-6 md:sticky md:top-28">
              {[
                ["Category", p.category],
                ["Status", p.status],
                ["Content", p.placeholder ? "Sample — conceptual placeholder" : "Verified"],
              ].map(([k, v]) => (
                <div key={k} className="border-t border-line pt-4">
                  <dt className="eyebrow mb-1">{k}</dt>
                  <dd className="text-[15px] text-paper">{v}</dd>
                </div>
              ))}
              <div className="border-t border-line pt-4">
                <dt className="eyebrow mb-2">Focus areas</dt>
                <dd className="flex flex-col gap-2">
                  {techs.map((t) => (
                    <Link key={t.slug} to={`/technologies/${t.slug}`} className="u-link w-fit text-[15px]">
                      {t.title}
                    </Link>
                  ))}
                </dd>
              </div>
            </dl>
          </aside>
          <div className="col-span-4 md:col-span-8 md:col-start-5">
            {p.placeholder && (
              <div className="mb-16">
                <PlaceholderNotice />
              </div>
            )}
            {p.sections.map((s, i) => (
              <article key={s.title} className="mb-20 last:mb-0">
                <SectionEyebrow index={`0${i + 1}`} className="mb-6">
                  {s.title}
                </SectionEyebrow>
                <Reveal>
                  <p className="text-[clamp(1.4rem,2.6vw,2.3rem)] leading-[1.2] tracking-[-0.02em]">{s.text}</p>
                </Reveal>
                {i === 0 && (
                  <RevealImage src={techs[0]?.image ?? p.image} alt={techs[0]?.imageAlt ?? p.imageAlt} className="mt-14 aspect-[16/9]" />
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      <Link to={`/research/${next.slug}`} className="group block border-t border-line bg-ink-2">
        <div className="shell flex min-h-[36svh] flex-col justify-end py-14">
          <p className="eyebrow mb-4">Next project</p>
          <MaskedTextReveal as="p" lines={[next.name]} className="display-lg" />
          <span aria-hidden className="arrow arrow-x label mt-6">
            View →
          </span>
        </div>
      </Link>
      <FinalCta lines={["Talk to the", "engineering team."]} magnetic={false} />
    </>
  );
}
