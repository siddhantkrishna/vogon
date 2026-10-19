import LandFilm from "@/pages/LandFilm";
import DomainPage from "@/pages/DomainPage";
import AdminPage from "@/pages/AdminPage";
import { useEffect, type ReactNode } from "react";
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { ReducedMotionProvider, ScrollTrigger } from "@/lib/motion";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ScrollProgress } from "@/components/motion";
import HomePage from "@/pages/HomePage";
import VortexPage from "@/pages/VortexPage";
import { TechnologiesPage, TechnologyDetailPage } from "@/pages/TechnologyPages";
import { ResearchDetailPage, ResearchPage } from "@/pages/ResearchPages";
import { CapabilitiesPage, CareersPage, CompanyPage } from "@/pages/CompanyPages";
import { ContactPage, PrivacyPage, TermsPage } from "@/pages/ContactLegal";
import NotFound from "@/pages/NotFound";

/** Fast route transition: scroll reset, focus management, trigger refresh. */
function PageTransition({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    const main = document.getElementById("main");
    main?.focus({ preventScroll: true });
    const id = window.setTimeout(() => ScrollTrigger.refresh(), 120);
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);

    let frame = 0;
    const onImageReady = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    };

    window.addEventListener("vogon:image-ready", onImageReady);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("vogon:image-ready", onImageReady);
      window.clearTimeout(id);
      window.removeEventListener("load", onLoad);
    };
  }, [pathname]);
  return (
    <div key={pathname} className="page-enter">
      {children}
    </div>
  );
}

function Shell() {
  const { pathname } = useLocation();
  if (pathname.startsWith("/admin")) return <AdminPage />;
  return (
    <>
      <a href="#main" className="skip-link" onClick={(e) => { e.preventDefault(); document.getElementById("main")?.focus(); }}>
        Skip to content
      </a>
      <ScrollProgress />
      <SiteHeader />
      <main id="main" tabIndex={-1} className="outline-none">
        <PageTransition>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<Navigate to="/domains/software" replace />} />
            <Route path="/vortex" element={<VortexPage />} />
            <Route path="/domains/land" element={<LandFilm />} />
            <Route path="/domains/:domain" element={<DomainPage />} />
            <Route path="/technologies" element={<TechnologiesPage />} />
            <Route path="/technologies/:slug" element={<TechnologyDetailPage />} />
            <Route path="/capabilities" element={<CapabilitiesPage />} />
            <Route path="/research" element={<ResearchPage />} />
            <Route path="/research/:slug" element={<ResearchDetailPage />} />
            <Route path="/company" element={<CompanyPage />} />
            <Route path="/careers" element={<CareersPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </PageTransition>
      </main>
      <SiteFooter />
    </>
  );
}

export default function App() {
  return (
    <ReducedMotionProvider>
      <BrowserRouter>
        <Shell />
      </BrowserRouter>
    </ReducedMotionProvider>
  );
}
