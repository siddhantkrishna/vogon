import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { nav } from "@/content/site";
import { gsap, useIsoLayoutEffect, useReducedMotion } from "@/lib/motion";
import { Wordmark } from "./ui";
import { cn } from "@/utils/cn";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const logoRef = useRef<HTMLAnchorElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  // Subtle logo reveal on first load
  useIsoLayoutEffect(() => {
    if (reduced || !logoRef.current) return;
    const t = gsap.fromTo(
      logoRef.current,
      { clipPath: "inset(0 100% 0 0)", opacity: 0 },
      { clipPath: "inset(0 0% 0 0)", opacity: 1, duration: 1.3, delay: 0.35, ease: "expo.inOut" },
    );
    return () => {
      t.kill();
      gsap.set(logoRef.current, { clearProps: "all" });
    };
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,height] duration-500 ease-[var(--ease-expo)]",
          scrolled || open ? "border-b border-line bg-ink/95 h-16" : "border-b border-transparent bg-transparent h-[76px] md:h-[88px]",
        )}
      >
        <div className="shell flex h-full items-center justify-between">
          <Link ref={logoRef} to="/" className="relative z-[70] block text-paper" aria-label="VOGON — home">
            <Wordmark className="w-[112px] md:w-[132px]" />
          </Link>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-11">
              {nav.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    className={({ isActive }) =>
                      cn("u-link label transition-colors duration-200", isActive ? "text-paper" : "text-paper/70 hover:text-paper")
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-6">
            <NavLink to="/contact" className="u-link label hidden text-paper lg:inline-flex">
              <span>Contact</span>
              <span aria-hidden className="arrow arrow-x">
                →
              </span>
            </NavLink>
            <button
              type="button"
              className="relative z-[70] flex h-11 w-11 items-center justify-center lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
            >
              <span aria-hidden className="relative block h-3 w-7">
                <span
                  className={cn(
                    "absolute left-0 h-px w-full bg-paper transition-transform duration-300",
                    open ? "top-1.5 rotate-45" : "top-0",
                  )}
                />
                <span
                  className={cn(
                    "absolute left-0 h-px w-full bg-paper transition-transform duration-300",
                    open ? "top-1.5 -rotate-45" : "top-3",
                  )}
                />
              </span>
            </button>
          </div>
        </div>
      </header>
      <MobileNavigation open={open} onClose={() => setOpen(false)} />
    </>
  );
}

function MobileNavigation({ open, onClose }: { open: boolean; onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const first = ref.current?.querySelector<HTMLElement>("a");
    first?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab" && ref.current) {
        const items = ref.current.querySelectorAll<HTMLElement>("a");
        const firstEl = items[0];
        const lastEl = items[items.length - 1];
        if (e.shiftKey && document.activeElement === firstEl) {
          e.preventDefault();
          lastEl.focus();
        } else if (!e.shiftKey && document.activeElement === lastEl) {
          e.preventDefault();
          firstEl.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  const links = [...nav, { label: "Research", to: "/research" }, { label: "Contact", to: "/contact" }];

  return (
    <div
      id="mobile-nav"
      ref={ref}
      role="dialog"
      aria-modal="true"
      aria-label="Site navigation"
      hidden={!open}
      className="fixed inset-0 z-40 bg-ink lg:hidden"
    >
      <nav className="shell flex h-full flex-col justify-between pb-10 pt-28">
        <ul className="border-t border-line">
          {links.map((l, i) => (
            <li
              key={l.to}
              className="border-b border-line"
              style={{ animation: open ? `page-in 600ms var(--ease-expo) ${80 + i * 50}ms both` : undefined }}
            >
              <NavLink
                to={l.to}
                className={({ isActive }) =>
                  cn(
                    "flex items-baseline justify-between py-5 text-[clamp(1.75rem,8vw,2.75rem)] font-medium uppercase tracking-[-0.03em]",
                    isActive ? "text-paper" : "text-paper/75",
                  )
                }
              >
                <span>{l.label}</span>
                <span className="eyebrow">0{i + 1}</span>
              </NavLink>
            </li>
          ))}
        </ul>
        <p className="eyebrow">Engineered in India</p>
      </nav>
    </div>
  );
}
