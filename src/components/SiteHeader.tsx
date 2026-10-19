import { VogonIcon } from "@/components/VogonIcon";
import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Wordmark } from "./ui";

const primaryLinks = [
  { label: "Space", to: "/domains/space" },
  { label: "Air", to: "/domains/air" },
  { label: "Land", to: "/domains/land" },
  { label: "Sea", to: "/domains/sea" },
  { label: "Software", to: "/domains/software" },
];

const menuLinks = [
  { label: "Technologies", to: "/technologies" },
  { label: "Capabilities", to: "/capabilities" },
  { label: "Research", to: "/research" },
  { label: "Company", to: "/company" },
  { label: "Contact", to: "/contact" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const panel = panelRef.current;
    panel?.querySelector<HTMLAnchorElement>("a")?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
        return;
      }

      if (event.key !== "Tab" || !panel) return;

      const links = Array.from(
        panel.querySelectorAll<HTMLAnchorElement>("a[href]")
      );

      if (!links.length) return;

      const first = links[0];
      const last = links[links.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <>
      <header className="vogon-main-header">
        <div className="vogon-main-header-inner">
          <Link
            to="/"
            className="vogon-brand"
            aria-label="VOGON — Home"
            onClick={() => setOpen(false)}
          >
            <Wordmark className="w-full" />
          </Link>

          <nav className="vogon-primary-nav" aria-label="Primary navigation">
            {primaryLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `vogon-navigation-link ${isActive || (link.to === "/domains/software" && pathname === "/vortex") ? "is-active" : ""}`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="vogon-header-actions">
            <NavLink
              to="/careers"
              className="vogon-careers-link"
              onClick={() => setOpen(false)}
            >
              Careers
            </NavLink>

            <button
              ref={toggleRef}
              type="button"
              className="vogon-menu-toggle"
              aria-label={open ? "Close menu" : "Open more menu"}
              aria-expanded={open}
              aria-controls="vogon-expanded-menu"
              onClick={() => setOpen((value) => !value)}
            >
              <span className="vogon-menu-toggle-label">
                {open ? "Close" : "More"}
              </span>

              <span className="vogon-menu-symbol" aria-hidden="true">
                <span className="vogon-menu-line vogon-menu-line-one" />
                <span className="vogon-menu-line vogon-menu-line-two" />
              </span>
            </button>
          </div>
        </div>
      </header>

      <div
        ref={panelRef}
        id="vogon-expanded-menu"
        className="vogon-menu-panel"
        role="dialog"
        aria-modal="true"
        aria-label="VOGON navigation"
        hidden={!open}
      >
        <div className="vogon-menu-content">
          <div className="vogon-menu-heading">
            <span>VOGON / NAVIGATION</span>
            <span>ENGINEERED IN INDIA</span>
          </div>

          <div className="vogon-menu-layout">
            <div className="vogon-menu-side">
              <span>EXPLORE VOGON</span>
              <p>
                Engineering the next
                <br />
                frontier of defence.
              </p>
            </div>

            <nav aria-label="Expanded navigation">
              <div className="vogon-mobile-domains">
                {primaryLinks.filter((link) => link.to !== "/products").map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                    <span aria-hidden="true"><VogonIcon name="arrow-up-right" /></span>
                  </NavLink>
                ))}
              </div>

              {menuLinks.map((link, index) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className="vogon-menu-item"
                  onClick={() => setOpen(false)}
                >
                  <span className="vogon-menu-item-number">
                    0{index + 1}
                  </span>

                  <span className="vogon-menu-item-title">
                    {link.label}
                  </span>

                  <span className="vogon-menu-item-arrow" aria-hidden="true">
                    <VogonIcon name="arrow-up-right" />
                  </span>
                </NavLink>
              ))}

              <NavLink
                to="/careers"
                className="vogon-menu-item vogon-mobile-careers"
                onClick={() => setOpen(false)}
              >
                <span className="vogon-menu-item-number">0{menuLinks.length + 1}</span>
                <span className="vogon-menu-item-title">Careers</span>
                <span className="vogon-menu-item-arrow" aria-hidden="true"><VogonIcon name="arrow-up-right" /></span>
              </NavLink>
            </nav>
          </div>

          <div className="vogon-menu-bottom">
            <a href="mailto:s@vogon.in">S@VOGON.IN <VogonIcon name="arrow-up-right" /></a>
            <Link to="/admin" onClick={() => setOpen(false)}>
              ADMIN ACCESS <VogonIcon name="arrow-up-right" />
            </Link>
            <span>VOGON.IN — INDIA</span>
          </div>
        </div>
      </div>
    </>
  );
}
