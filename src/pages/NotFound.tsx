import { AnimatedLink, useSeo } from "@/components/ui";

export default function NotFound() {
  useSeo({ title: "Page not found", path: "/404" });
  return (
    <section className="flex min-h-svh items-end bg-ink pb-20 pt-40">
      <div className="shell">
        <p className="eyebrow mb-8">Error 404 — Signal lost</p>
        <h1 className="display-xl mb-12">
          Off the
          <br />
          known map.
        </h1>
        <AnimatedLink to="/" arrow="→">
          Return home
        </AnimatedLink>
      </div>
    </section>
  );
}
