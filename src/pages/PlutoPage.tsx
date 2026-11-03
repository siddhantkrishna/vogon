import { Link } from "react-router-dom";
import { PageHero } from "@/components/PageHero";
import { VogonIcon } from "@/components/VogonIcon";
import { DrawRule, MaskedTextReveal, Reveal } from "@/components/motion";
import { AnimatedLink, SectionEyebrow, useSeo } from "@/components/ui";
import { pluto } from "@/content/site";

const built = [
  {
    index: "01",
    title: "Institutions and workspaces.",
    text: "A multi-institution foundation with organization-scoped workspaces, membership management and invitations.",
    meta: "Institutional structure / Memberships",
  },
  {
    index: "02",
    title: "Access with boundaries.",
    text: "Account authentication, session controls, permissions and tenant-scoped database access provide the core governance model.",
    meta: "Authentication / Access control",
  },
  {
    index: "03",
    title: "A catalog for context.",
    text: "Catalog metadata gives teams a structured way to describe and organize their information. Full-text search and document indexing are not yet available.",
    meta: "Catalog records / Metadata",
  },
] as const;

const planned = [
  {
    index: "01",
    title: "Connect the sources.",
    text: "File ingestion, extraction, durable storage and source connectors are being developed. The deployed web application does not currently process large documents or synchronize external sources.",
  },
  {
    index: "02",
    title: "Make information searchable.",
    text: "Indexing, search and previews will let authorized teams navigate documents and datasets across a governed environment. These are not yet operational.",
  },
  {
    index: "03",
    title: "Find what the records conceal.",
    text: "AI-assisted relationship mapping, anomaly detection and bottleneck discovery are the longer-term direction, not features represented as available today.",
  },
] as const;

function OpenPluto({ light = false }: { light?: boolean }) {
  return (
    <a href={pluto.appUrl} target="_blank" rel="noopener noreferrer" className={light ? "btn group" : "btn group"}>
      <span>OPEN PLUTO<span className="sr-only"> (opens the application in a new tab)</span></span>
      <span className="arrow" aria-hidden="true"><VogonIcon name="arrow-up-right" /></span>
    </a>
  );
}

export default function PlutoPage() {
  useSeo({
    title: "PLUTO — Data Intelligence Platform by VOGON",
    description: "PLUTO is VOGON's multi-institution data-governance and intelligence platform. Core access and catalog services are implemented; ingestion, search and AI analysis are in development.",
    path: pluto.path,
  });

  return (
    <article className="bg-ink">
      <PageHero
        eyebrow="VOGON / SOFTWARE / DATA INTELLIGENCE"
        index="003"
        lines={["PROJECT PLUTO."]}
        intro="Available now: institutional workspaces, access control and catalog metadata. Ingestion, search and AI-powered relationship analysis are still under development."
        image={pluto.image}
        imageAlt="Illustrative system diagram showing institutional data connected through a governance and catalog layer"
        imageLabel="Illustrative architecture / Not a live application screenshot"
      >
        <div className="flex flex-col items-start gap-4">
          <OpenPluto />
          <p className="eyebrow text-paper/70">Platform in active development / Account required</p>
        </div>
      </PageHero>

      <section id="pluto-overview" className="shell py-24 md:py-36" aria-labelledby="pluto-overview-title">
        <div className="grid-12 gap-y-10">
          <SectionEyebrow className="col-span-4 md:col-span-3" index="01">The platform</SectionEyebrow>
          <div className="col-span-4 md:col-span-9">
            <MaskedTextReveal id="pluto-overview-title" lines={["One foundation.", "Many sources of truth."]} className="display-lg" />
            <Reveal className="mt-10 grid gap-8 md:mt-14 md:grid-cols-2 md:gap-16">
              <p className="body-lg">{pluto.summary}</p>
              <p className="body">PLUTO is built around institutional ownership, structured workspaces and controlled access. Its current Next.js and PostgreSQL foundation manages accounts, institutions and catalog information. The larger ambition is to turn disconnected records into traceable intelligence.</p>
            </Reveal>
          </div>
        </div>
        <DrawRule className="mt-16 md:mt-24" />
        <dl className="grid gap-x-8 gap-y-8 py-8 md:grid-cols-4">
          {[
            ["System", "Data intelligence"],
            ["Architecture", "Next.js / PostgreSQL"],
            ["Current stage", "Governance foundation built"],
            ["Access", "Authenticated platform"],
          ].map(([name, value]) => (
            <div key={name}><dt className="eyebrow mb-3">{name}</dt><dd className="text-[15px] text-paper">{value}</dd></div>
          ))}
        </dl>
      </section>

      <section className="border-y border-line bg-ink-2 py-24 md:py-36" aria-labelledby="pluto-built-title">
        <div className="shell grid-12 gap-y-14">
          <div className="col-span-4 md:col-span-4">
            <div className="md:sticky md:top-32">
              <SectionEyebrow className="mb-10" index="02">Implemented foundation</SectionEyebrow>
              <MaskedTextReveal id="pluto-built-title" lines={["Governance", "before intelligence."]} className="display-lg" />
              <p className="body mt-8 max-w-sm">These capabilities exist in the application codebase. Their presence does not imply that the planned data-processing or AI-analysis pipeline is deployed.</p>
            </div>
          </div>
          <ol className="col-span-4 md:col-span-7 md:col-start-6">
            {built.map((item) => (
              <Reveal as="li" key={item.index} className="grid grid-cols-[38px_1fr] gap-5 border-t border-line py-9 md:gap-8">
                <span className="eyebrow">{item.index}</span>
                <div>
                  <h3 className="text-[clamp(1.5rem,2.5vw,2.6rem)] font-medium tracking-[-0.035em]">{item.title}</h3>
                  <p className="body mt-5 max-w-xl">{item.text}</p>
                  <p className="eyebrow mt-7">{item.meta}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="shell py-24 md:py-36" aria-labelledby="pluto-roadmap-title">
        <div className="grid-12 gap-y-10">
          <SectionEyebrow index="03" className="col-span-4 md:col-span-3">The development direction</SectionEyebrow>
          <div className="col-span-4 md:col-span-9">
            <MaskedTextReveal id="pluto-roadmap-title" lines={["From raw data", "to useful signals."]} className="display-lg" />
            <p className="body mt-8 max-w-xl">The next layers are planned or being built. They should not be confused with available functionality.</p>
          </div>
        </div>
        <ol className="mt-16 grid gap-8 md:mt-20 md:grid-cols-3">
          {planned.map((item) => (
            <Reveal as="li" key={item.index} className="border-t border-line pt-7">
              <p className="eyebrow mb-8">PHASE {item.index} / IN DEVELOPMENT</p>
              <h3 className="mb-5 text-[clamp(1.5rem,2.2vw,2.3rem)] font-medium leading-tight tracking-[-0.03em]">{item.title}</h3>
              <p className="body">{item.text}</p>
            </Reveal>
          ))}
        </ol>
      </section>

      <section className="border-t border-line bg-ink-2 py-24 md:py-36" aria-labelledby="pluto-access-title">
        <div className="shell">
          <SectionEyebrow index="003" className="mb-10">VOGON / PLUTO</SectionEyebrow>
          <MaskedTextReveal id="pluto-access-title" lines={["Information, organized.", "Intelligence, in progress."]} className="display-xl" />
          <DrawRule className="mt-14 md:mt-20" />
          <div className="flex flex-col gap-8 pt-9 md:flex-row md:items-start md:justify-between">
            <div className="max-w-xl">
              <p className="body-lg">Open the PLUTO platform to access its current institutional workspace. Document ingestion, unified search and AI relationship analysis remain under development.</p>
              <p className="eyebrow mt-6">Access subject to account and platform permissions</p>
            </div>
            <OpenPluto />
          </div>
          <div className="mt-14 flex flex-wrap gap-8">
            <AnimatedLink to="/domains/software" arrow="→">Back to Software</AnimatedLink>
            <Link to="/research" className="u-link text-[15px]">All VOGON research</Link>
          </div>
        </div>
      </section>
    </article>
  );
}
