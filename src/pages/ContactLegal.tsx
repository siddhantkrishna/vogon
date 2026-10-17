import { VogonIcon } from "@/components/VogonIcon";
import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { site } from "@/content/site";
import { PageHero } from "@/components/PageHero";
import { InquiryForm, contactFields } from "@/components/InquiryForm";
import { useSeo } from "@/components/ui";

/* ------------------------------------------------------------------ */
/* /contact                                                            */
/* ------------------------------------------------------------------ */
export function ContactPage() {
  useSeo({
    title: "Contact",
    description: "Contact VOGON for general inquiries, research collaboration, partnerships, media and careers.",
    path: "/contact",
  });
  return (
    <>
      <PageHero eyebrow="Contact" lines={["Start a", "conversation."]} compact />
      <section aria-label="Contact form" className="bg-ink pb-28 md:pb-40">
        <div className="shell grid-12 gap-y-14">
          <aside className="col-span-4 md:col-span-4">
            <div className="space-y-8 border-t border-line pt-6">
              <div>
                <p className="eyebrow mb-2">Inquiries</p>
                <p className="body">Research collaboration, partnerships, media, and general questions.</p>
              </div>
              <div>
                <p className="eyebrow mb-2">Response</p>
                <p className="body">Messages are delivered directly to the VOGON team.</p>
              </div>
              {site.facts.contactEmail && (
                <div>
                  <p className="eyebrow mb-2">Email</p>
                  <a className="u-link text-paper" href={`mailto:${site.facts.contactEmail}`}>
                    {site.facts.contactEmail}
                  </a>
                </div>
              )}
              <div>
                <p className="eyebrow mb-2">Careers</p>
                <Link to="/careers" className="u-link text-paper">
                  Use the careers form <span className="arrow arrow-x"><VogonIcon name="arrow-right" /></span>
                </Link>
              </div>
            </div>
          </aside>
          <div className="relative col-span-4 md:col-span-7 md:col-start-6">
            <InquiryForm kind="contact" fields={contactFields} submitLabel="Send message" professionalEmail />
          </div>
        </div>
      </section>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Legal                                                               */
/* ------------------------------------------------------------------ */
function LegalLayout({ title, eyebrow, updated, children }: { title: string[]; eyebrow: string; updated: string; children: ReactNode }) {
  return (
    <>
      <PageHero eyebrow={eyebrow} lines={title} compact />
      <section className="bg-ink pb-28 md:pb-40">
        <div className="shell grid-12 gap-y-10">
          <aside className="col-span-4 md:col-span-3">
            <div className="space-y-4 border-t border-line pt-6 md:sticky md:top-28">
              <p className="eyebrow">Last updated: {updated}</p>
              <p role="note" className="border-l-2 border-signal pl-3 text-[13px] leading-relaxed text-paper/80">
                Draft — to be reviewed by qualified legal counsel before launch.
              </p>
            </div>
          </aside>
          <article className="legal col-span-4 max-w-3xl md:col-span-8 md:col-start-5">{children}</article>
        </div>
      </section>
      <style>{`.legal h2{font-size:1.35rem;font-weight:500;letter-spacing:-0.01em;margin:3rem 0 1rem;color:#f5f5f2}.legal h2:first-child{margin-top:0}.legal p,.legal li{color:#a9a9a6;line-height:1.75;font-size:15px}.legal ul{list-style:square;padding-left:1.2rem;margin:.75rem 0}.legal li{margin:.35rem 0}.legal a{color:#f5f5f2;text-decoration:underline;text-underline-offset:4px}`}</style>
    </>
  );
}

export function PrivacyPage() {
  useSeo({ title: "Privacy Policy", description: "How VOGON handles information submitted through vogon.in.", path: "/privacy" });
  return (
    <LegalLayout eyebrow="Legal" title={["Privacy", "policy."]} updated={String(new Date().getFullYear())}>
      <h2>1. Scope</h2>
      <p>
        This policy describes how VOGON (“we”) handles information when you visit {site.domain.replace("https://", "")} (the
        “site”). It reflects the site's actual data flows as built.
      </p>
      <h2>2. Information you submit</h2>
      <p>The site has two forms: the contact form and the careers general-interest form. When you submit one, we receive:</p>
      <ul>
        <li>Contact form: full name, professional email, organisation (optional), inquiry type and message.</li>
        <li>Careers form: full name, email, discipline, an optional profile URL and your message.</li>
      </ul>
      <p>
        Submissions are validated by a server function and forwarded by email to the VOGON team through a transactional email
        provider (Resend). The site itself does not store submissions in a database.
      </p>
      <h2>3. Purpose and legal basis</h2>
      <p>
        We use submitted information solely to respond to your inquiry or evaluate your interest in working with us, on the basis of
        your consent given when submitting the form. Under India's Digital Personal Data Protection Act, 2023, you may withdraw
        consent at any time.
      </p>
      <h2>4. Spam protection</h2>
      <p>
        Forms use a hidden “honeypot” field and a minimum completion time to filter automated submissions. The server may
        temporarily process your IP address in memory to limit repeated submissions; it is not stored.
      </p>
      <h2>5. Cookies and analytics</h2>
      <p>The site does not set advertising or analytics cookies and does not include third-party tracking scripts.</p>
      <p>
        Web fonts are loaded from Google Fonts, which means your browser requests font files from Google's servers and Google
        receives your IP address as part of that request.
      </p>
      <h2>6. Hosting</h2>
      <p>The site is hosted on Vercel, which processes standard server logs (such as IP address and user agent) to operate the service.</p>
      <h2>7. Retention</h2>
      <p>Emails containing submissions are retained only as long as needed to handle the inquiry, then deleted. [Specify retention period.]</p>
      <h2>8. Your rights</h2>
      <p>
        You may request access to, correction of, or deletion of your information by contacting us through the{" "}
        <Link to="/contact">contact page</Link>.
      </p>
      <h2>9. Changes</h2>
      <p>We will update this page if our data practices change.</p>
    </LegalLayout>
  );
}

export function TermsPage() {
  useSeo({ title: "Terms of Use", description: "Terms governing use of vogon.in.", path: "/terms" });
  return (
    <LegalLayout eyebrow="Legal" title={["Terms", "of use."]} updated={String(new Date().getFullYear())}>
      <h2>1. Acceptance</h2>
      <p>By accessing this site you agree to these terms. If you do not agree, please do not use the site.</p>
      <h2>2. Informational purpose</h2>
      <p>
        Content on this site is provided for general information about VOGON's areas of focus. It does not constitute an offer,
        a representation of available products, or a description of fielded systems.
      </p>
      <h2>3. Conceptual material</h2>
      <p>
        Imagery and project entries marked as conceptual or sample are illustrative only and do not depict actual VOGON
        products, facilities or programmes.
      </p>
      <h2>4. Intellectual property</h2>
      <p>The VOGON name, wordmark, site design and content are the property of VOGON unless otherwise stated. [Confirm ownership and licensing.]</p>
      <h2>5. Submissions</h2>
      <p>
        Do not submit confidential, classified, export-controlled or otherwise sensitive information through this site. Unsolicited
        ideas are submitted without obligation of confidentiality.
      </p>
      <h2>6. Disclaimer and liability</h2>
      <p>The site is provided “as is”. To the extent permitted by law, VOGON is not liable for losses arising from use of the site. [Counsel to review.]</p>
      <h2>7. Governing law</h2>
      <p>These terms are governed by the laws of India. [Specify jurisdiction.]</p>
      <h2>8. Contact</h2>
      <p>
        Questions about these terms can be sent via the <Link to="/contact">contact page</Link>.
      </p>
    </LegalLayout>
  );
}
