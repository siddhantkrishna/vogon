import { VogonIcon } from "@/components/VogonIcon";
import { capabilities, img, milestones, roles, team } from "@/content/site";
import { PageHero } from "@/components/PageHero";
import { DrawRule, MaskedTextReveal, ParallaxMedia, Reveal, RevealImage } from "@/components/motion";
import { ConceptTag, SectionEyebrow, useSeo } from "@/components/ui";
import { CapabilityIndex } from "@/sections/CapabilityIndex";
import { FinalCta, principles } from "@/sections/HomeSections";
import { InquiryForm, careersFields } from "@/components/InquiryForm";
import { cn } from "@/utils/cn";

/* ------------------------------------------------------------------ */
/* /capabilities                                                       */
/* ------------------------------------------------------------------ */
export function CapabilitiesPage() {
  useSeo({
    title: "Capabilities",
    description: "VOGON's engineering competencies and intended capabilities across AI, autonomy, embedded systems, robotics, aerospace and simulation.",
    path: "/capabilities",
  });
  return (
    <>
      <PageHero
        eyebrow="Capabilities"
        lines={["Depth across", "the full stack."]}
        intro="The competencies VOGON is building — from silicon to airframe. Presented as areas of focus and intended capability, not as validated or fielded systems."
      />
      <CapabilityIndex withHeader={false} />

      <section aria-label="Capability detail" className="border-t border-line bg-ink-2 py-28 md:py-40">
        <div className="shell">
          {capabilities.map((c, i) => (
            <article key={c.index} className="grid-12 items-center gap-y-8 border-b border-line py-14 first:pt-0 md:py-20">
              <div className={cn("col-span-4 md:col-span-5", i % 2 ? "md:order-2 md:col-start-8" : "")}>
                <RevealImage src={c.image} alt="" className="aspect-[4/3]" />
              </div>
              <div className={cn("col-span-4 md:col-span-5", i % 2 ? "md:order-1 md:col-start-1" : "md:col-start-7")}>
                <p className="eyebrow mb-6">{c.index} / 06 — Area of focus</p>
                <h2 className="display-md mb-6">{c.title}</h2>
                <p className="body-lg mb-8">{c.text}</p>
                <ul className="grid grid-cols-2 gap-px bg-line">
                  {c.points.map((p) => (
                    <li key={p} className="bg-ink-2 py-3 pr-3 text-[14px] text-paper/80">
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
          <ConceptTag className="mt-10 block">All imagery conceptual</ConceptTag>
        </div>
      </section>
      <FinalCta lines={["Precision is", "a discipline."]} magnetic={false} />
    </>
  );
}

/* ------------------------------------------------------------------ */
/* /company                                                            */
/* ------------------------------------------------------------------ */
const values = [
  { t: "Rigour", d: "Claims are earned through evidence. We say what we have tested, and nothing more." },
  { t: "Ownership", d: "Small teams own problems end to end — from first analysis to field data." },
  { t: "Craft", d: "Precision in engineering is reflected in precision everywhere: code, hardware, documentation." },
  { t: "Responsibility", d: "We build technology with serious consequences, and treat that seriously." },
];

export function CompanyPage() {
  useSeo({
    title: "Company",
    description: "VOGON's mission, philosophy and values — an independent Indian engineering company built for the next era.",
    path: "/company",
  });
  return (
    <>
      <PageHero
        eyebrow="Company"
        lines={["Building the", "next generation."]}
        intro="VOGON is an independent Indian technology company focused on autonomous systems, aerospace engineering, artificial intelligence and advanced robotics."
        image={img("facility")}
        imageAlt="Conceptual aerospace hangar at night"
      />

      <section aria-labelledby="mission" className="bg-ink py-28 md:py-44">
        <div className="shell grid-12 gap-y-10">
          <SectionEyebrow index="01" className="col-span-4 md:col-span-3">
            Mission
          </SectionEyebrow>
          <div className="col-span-4 md:col-span-9">
            <MaskedTextReveal id="mission" lines={["To engineer", "intelligent systems", "that hold up in", "the real world."]} className="display-lg" />
            <Reveal className="mt-14 grid gap-8 md:grid-cols-2">
              <p className="body-lg">
                Critical technologies are converging: computation is moving to the edge, autonomy is becoming practical, and
                physical systems are becoming software-defined.
              </p>
              <p className="body-lg">
                VOGON exists to work at that convergence — combining research depth with disciplined systems engineering.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section aria-labelledby="phil" className="border-t border-line bg-ink-2 py-28 md:py-40">
        <div className="shell grid-12 gap-y-12">
          <div className="col-span-4 md:col-span-5">
            <SectionEyebrow index="02" className="mb-8">
              Philosophy
            </SectionEyebrow>
            <h2 id="phil" className="display-md mb-10">
              First principles. Real-world systems.
            </h2>
            <ParallaxMedia src={img("engineering")} alt="Conceptual electronics close-up" className="aspect-square" overlay="bg-black/20" />
          </div>
          <ol className="col-span-4 md:col-span-6 md:col-start-7 md:pt-24">
            {principles.map((p, i) => (
              <Reveal as="li" key={p.t} className="border-t border-line py-7">
                <p className="eyebrow mb-3">0{i + 1}</p>
                <h3 className="mb-2 text-2xl font-medium tracking-[-0.02em]">{p.t}</h3>
                <p className="body">{p.d}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="values" className="bg-ink py-28 md:py-40">
        <div className="shell">
          <SectionEyebrow index="03" className="mb-8">
            Values
          </SectionEyebrow>
          <h2 id="values" className="sr-only">
            Values
          </h2>
          <div className="grid grid-cols-1 border-t border-line sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <Reveal key={v.t} delay={i * 0.06} className="border-b border-line py-10 sm:pr-8 lg:border-b-0 lg:border-r lg:px-8 lg:first:pl-0 lg:last:border-r-0">
                <h3 className="display-md mb-6">{v.t}</h3>
                <p className="body">{v.d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="india" className="relative overflow-hidden border-t border-line bg-ink">
        <ParallaxMedia src={img("horizon")} alt="" className="absolute inset-0" overlay="bg-black/50" />
        <div className="shell relative py-32 md:py-48">
          <SectionEyebrow index="04" className="mb-8">
            Home
          </SectionEyebrow>
          <MaskedTextReveal id="india" lines={["Engineered", "in India."]} className="display-xl" />
          <Reveal className="mt-12 max-w-xl">
            <p className="body-lg text-paper/85">
              India is home to one of the world's deepest pools of engineering talent. VOGON is built here, with the ambition to
              set a global standard for how advanced systems are designed and built.
            </p>
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="team" className="bg-ink py-28 md:py-36">
        <div className="shell grid-12 gap-y-12">
          <div className="col-span-4 md:col-span-6">
            <SectionEyebrow index="05" className="mb-6">
              Team
            </SectionEyebrow>
            <h2 id="team" className="display-md mb-8">
              People
            </h2>
            {team.length ? (
              <ul>
                {team.map((m) => (
                  <li key={m.name} className="flex justify-between border-t border-line py-4">
                    <span>{m.name}</span>
                    <span className="eyebrow">{m.role}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="body border-t border-line pt-6">Team profiles will be published here once verified.</p>
            )}
          </div>
          <div className="col-span-4 md:col-span-5 md:col-start-8">
            <SectionEyebrow index="06" className="mb-6">
              Milestones
            </SectionEyebrow>
            <h2 className="display-md mb-8">Timeline</h2>
            {milestones.length ? (
              <ol>
                {milestones.map((m) => (
                  <li key={m.year + m.text} className="grid grid-cols-[80px_1fr] border-t border-line py-4">
                    <span className="eyebrow">{m.year}</span>
                    <span>{m.text}</span>
                  </li>
                ))}
              </ol>
            ) : (
              <p className="body border-t border-line pt-6">Verified milestones will be added as they are achieved.</p>
            )}
          </div>
        </div>
      </section>
      <FinalCta magnetic={false} />
    </>
  );
}

/* ------------------------------------------------------------------ */
/* /careers                                                            */
/* ------------------------------------------------------------------ */
const working = [
  { t: "Hard problems", d: "Work spans software, intelligence and physical hardware — rarely just one." },
  { t: "Small teams", d: "High ownership, direct communication and minimal process overhead." },
  { t: "Build and test", d: "Ideas are proven on benches, in simulation and in the field." },
  { t: "Long horizon", d: "We optimise for durable engineering, not short-term optics." },
];

export function CareersPage() {
  useSeo({
    title: "Careers",
    description: "Build what comes next. Work on difficult engineering problems at the intersection of software, intelligence and physical systems.",
    path: "/careers",
  });
  return (
    <>
      <PageHero
        eyebrow="Careers"
        lines={["Build what", "comes next."]}
        intro="Work on difficult engineering problems at the intersection of software, intelligence, and physical systems."
        image={img("robotics")}
        imageAlt="Conceptual robotic arm in a laboratory"
      />

      <section aria-labelledby="how" className="bg-ink py-28 md:py-40">
        <div className="shell">
          <div className="grid-12 mb-16 gap-y-6">
            <SectionEyebrow index="01" className="col-span-4 md:col-span-3">
              How we work
            </SectionEyebrow>
            <MaskedTextReveal id="how" lines={["Engineers first.", "Always."]} className="display-lg col-span-4 md:col-span-9" />
          </div>
          <DrawRule />
          <div className="grid-12">
            {working.map((w, i) => (
              <Reveal key={w.t} delay={i * 0.06} className="col-span-4 border-b border-line py-10 md:col-span-6 lg:col-span-3 lg:border-b-0 lg:pr-6">
                <p className="eyebrow mb-10">0{i + 1}</p>
                <h3 className="mb-3 text-2xl font-medium tracking-[-0.02em]">{w.t}</h3>
                <p className="body">{w.d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="roles" className="border-t border-line bg-ink-2 py-28 md:py-36">
        <div className="shell grid-12 gap-y-10">
          <SectionEyebrow index="02" className="col-span-4 md:col-span-3">
            Open roles
          </SectionEyebrow>
          <div className="col-span-4 md:col-span-9">
            <h2 id="roles" className="display-md mb-10">
              Current openings
            </h2>
            {roles.length ? (
              <ul className="border-t border-line">
                {roles.map((r) => (
                  <li key={r.title} className="border-b border-line">
                    <a href={r.href} className="group flex flex-col gap-2 py-6 md:flex-row md:items-center md:justify-between">
                      <span className="text-2xl font-medium">{r.title}</span>
                      <span className="eyebrow">
                        {r.team} — {r.location} — {r.type} <span className="arrow"><VogonIcon name="arrow-up-right" /></span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="border-t border-line pt-8">
                <p className="body-lg max-w-2xl">
                  There are no specific openings listed right now. If you are an exceptional engineer and want to work on these
                  problems, introduce yourself below — we read every submission.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      <section aria-labelledby="apply" className="bg-ink py-28 md:py-40">
        <div className="shell grid-12 gap-y-14">
          <div className="col-span-4 md:col-span-4">
            <SectionEyebrow index="03" className="mb-8">
              General interest
            </SectionEyebrow>
            <h2 id="apply" className="display-md mb-6">
              Introduce yourself.
            </h2>
            <p className="body max-w-sm">
              Share what you have built and what you want to build. Please link to work rather than attaching files.
            </p>
          </div>
          <div className="relative col-span-4 md:col-span-7 md:col-start-6">
            <InquiryForm kind="careers" fields={careersFields} submitLabel="Submit interest" />
          </div>
        </div>
      </section>
    </>
  );
}
