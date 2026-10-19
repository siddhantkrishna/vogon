import { Link } from "react-router-dom";
import { useRef } from "react";
import { gsap, useIsoLayoutEffect, useReducedMotion } from "@/lib/motion";

const groups = [
  {
    title: "EXPLORE",
    links: [
      { label: "Space", to: "/domains/space" },
      { label: "Air", to: "/domains/air" },
      { label: "Land", to: "/domains/land" },
      { label: "Sea", to: "/domains/sea" },
      { label: "Software", to: "/domains/software" },
    ],
  },
  {
    title: "TECHNOLOGY",
    links: [
      { label: "Technologies", to: "/technologies" },
      { label: "Capabilities", to: "/capabilities" },
      { label: "Research", to: "/research" },
      { label: "VORTEX", to: "/vortex" },
    ],
  },
  {
    title: "COMPANY",
    links: [
      { label: "About", to: "/company" },
      { label: "Careers", to: "/careers" },
      { label: "Contact", to: "/contact" },
    ],
  },
];

export function SiteFooter() {
  const year = new Date().getFullYear();
  const brandRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useIsoLayoutEffect(() => {
    if (!brandRef.current || reduced) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".vogon-footer-brandmark",
        { yPercent: 12, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 1.4,
          ease: "expo.out",
          scrollTrigger: {
            trigger: brandRef.current,
            start: "top 92%",
            once: true,
          },
        }
      );
    }, brandRef);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <footer className="vogon-editorial-footer">

      <div className="vogon-footer-top">

        <div className="vogon-footer-navigation">

          {groups.map((group) => (
            <nav key={group.title} aria-label={group.title}>
              <h2 className="vogon-footer-label">
                {group.title}
              </h2>

              <ul>
                {group.links.map((link) => (
                  <li key={link.to}>
                    <Link to={link.to}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div className="vogon-footer-contact">
            <h2 className="vogon-footer-label">
              INQUIRIES
            </h2>

            <a href="mailto:s@vogon.in">
              s@vogon.in
            </a>

            <div className="vogon-footer-contact-action">
              <Link to="/contact">
                START A CONVERSATION
                <span aria-hidden="true">↗</span>
              </Link>
            </div>

            <p>
              DEFENCE / AEROSPACE / INTELLIGENCE
            </p>
          </div>

        </div>

        <div className="vogon-footer-meta">

          <span>
            © {year} VOGON
          </span>

          <span>
            INDEPENDENT ENGINEERING COMPANY
          </span>

          <div>
            <Link to="/privacy">PRIVACY</Link>
            <Link to="/terms">TERMS</Link>
            <Link to="/admin">ADMIN</Link>
          </div>

        </div>

      </div>

      <div className="vogon-footer-brand-section" ref={brandRef}>

        <div className="vogon-footer-brand-top">
          <span>ENGINEERING THE NEXT FRONTIER.</span>
          <span>VOGON / INDIA</span>
        </div>

        <div className="vogon-footer-brand-title">
          <h2>
            BUILT FOR
            <br />
            WHAT COMES NEXT.
          </h2>
        </div>

        <div className="vogon-footer-brand-wrapper">

          <div
            className="vogon-footer-brandmark"
            role="img"
            aria-label="VOGON"
          />

        </div>

        <div className="vogon-footer-brand-bottom">
          <span>
            AUTONOMY. INTELLIGENCE. ENGINEERING.
          </span>

          <a href="#top" onClick={(e) => {
            e.preventDefault();
            window.scrollTo({
              top: 0,
              behavior: window.matchMedia(
                "(prefers-reduced-motion: reduce)"
              ).matches ? "instant" : "smooth",
            });
          }}>
            BACK TO TOP ↑
          </a>
        </div>

      </div>

    </footer>
  );
}
