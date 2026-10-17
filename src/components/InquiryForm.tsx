import { VogonIcon } from "@/components/VogonIcon";
import { useRef, useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { site } from "@/content/site";
import { cn } from "@/utils/cn";

/* ------------------------------------------------------------------ */
/* Schema-driven validation — mirrored server-side in /api/contact.js  */
/* ------------------------------------------------------------------ */
type FieldDef = {
  name: string;
  label: string;
  type?: "text" | "email" | "textarea" | "select" | "url";
  required?: boolean;
  options?: string[];
  placeholder?: string;
  autoComplete?: string;
  max: number;
  min?: number;
  span?: "full" | "half";
};

const FREE_MAIL = /@(gmail|yahoo|hotmail|outlook|live|aol|icloud|proton|protonmail|rediffmail)\./i;

function validate(fields: FieldDef[], values: Record<string, string>, professional: boolean) {
  const errors: Record<string, string> = {};
  for (const f of fields) {
    const v = (values[f.name] ?? "").trim();
    if (f.required && !v) {
      errors[f.name] = `${f.label} is required.`;
      continue;
    }
    if (!v) continue;
    if (f.min && v.length < f.min) errors[f.name] = `${f.label} must be at least ${f.min} characters.`;
    else if (v.length > f.max) errors[f.name] = `${f.label} must be under ${f.max} characters.`;
    else if (f.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) errors[f.name] = "Enter a valid email address.";
    else if (f.type === "email" && professional && FREE_MAIL.test(v))
      errors[f.name] = "Please use your professional (organisation) email address.";
    else if (f.type === "url" && !/^https?:\/\/\S+\.\S+/.test(v)) errors[f.name] = "Enter a full URL beginning with https://";
    else if (f.type === "select" && f.options && !f.options.includes(v)) errors[f.name] = `Select a ${f.label.toLowerCase()}.`;
  }
  return errors;
}

type Status = { state: "idle" | "submitting" | "success" | "error"; message?: string };

export function InquiryForm({
  kind,
  fields,
  submitLabel,
  professionalEmail = false,
}: {
  kind: "contact" | "careers";
  fields: FieldDef[];
  submitLabel: string;
  professionalEmail?: boolean;
}) {
  const [values, setValues] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [consent, setConsent] = useState(false);
  const [consentError, setConsentError] = useState("");
  const [status, setStatus] = useState<Status>({ state: "idle" });
  const startedAt = useRef(Date.now());
  const formRef = useRef<HTMLFormElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);

  const set = (name: string, v: string) => {
    setValues((s) => ({ ...s, [name]: v }));
    if (errors[name]) setErrors((e) => ({ ...e, [name]: "" }));
  };

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status.state === "submitting") return;
    const errs = validate(fields, values, professionalEmail);
    setErrors(errs);
    setConsentError(consent ? "" : "Please confirm you have read the privacy policy.");
    const firstInvalid = fields.find((f) => errs[f.name]);
    if (firstInvalid || !consent) {
      const target = firstInvalid ? `[name="${firstInvalid.name}"]` : '[name="consent"]';
      formRef.current?.querySelector<HTMLElement>(target)?.focus();
      return;
    }

    const honeypot = (formRef.current?.elements.namedItem("website_url") as HTMLInputElement | null)?.value ?? "";
    setStatus({ state: "submitting" });
    try {
      const controller = new AbortController();
      const timeout = window.setTimeout(() => controller.abort(), 15000);
      const res = await fetch(site.formEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ kind, ...values, website_url: honeypot, elapsedMs: Date.now() - startedAt.current }),
        signal: controller.signal,
      });
      window.clearTimeout(timeout);
      let data: { ok?: boolean; error?: string; errors?: Record<string, string> } = {};
      try {
        data = await res.json();
      } catch {
        /* non-JSON response */
      }
      if (!res.ok || !data.ok) {
        if (data.errors) setErrors(data.errors);
        throw new Error(
          data.error ||
            (res.status === 404 || res.status === 405
              ? "The submission service is not available on this deployment yet. Please try again later."
              : `Submission failed (status ${res.status}).`),
        );
      }
      setStatus({ state: "success", message: "Received. Your message has been delivered to the VOGON team." });
      setValues({});
      setConsent(false);
    } catch (err) {
      const msg =
        err instanceof DOMException && err.name === "AbortError"
          ? "The request timed out. Please check your connection and try again."
          : err instanceof Error
            ? err.message
            : "Something went wrong. Please try again.";
      setStatus({ state: "error", message: `${msg} Your entries have been kept.` });
    } finally {
      requestAnimationFrame(() => statusRef.current?.focus());
    }
  }

  if (status.state === "success") {
    return (
      <div ref={statusRef} tabIndex={-1} role="status" className="border-t border-paper pt-10 outline-none">
        <p className="eyebrow mb-6 text-paper">Transmission complete</p>
        <p className="display-md mb-8">Thank you.</p>
        <p className="body-lg max-w-lg">{status.message}</p>
        <button type="button" className="u-link label mt-10" onClick={() => setStatus({ state: "idle" })}>
          Send another <span className="arrow arrow-x"><VogonIcon name="arrow-right" /></span>
        </button>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate aria-describedby="form-note" className="grid grid-cols-1 gap-x-10 gap-y-10 md:grid-cols-2">
      {fields.map((f) => {
        const id = `${kind}-${f.name}`;
        const err = errors[f.name];
        const common = {
          id,
          name: f.name,
          value: values[f.name] ?? "",
          "aria-invalid": err ? true : undefined,
          "aria-describedby": err ? `${id}-err` : undefined,
          "aria-required": f.required || undefined,
          maxLength: f.max,
        } as const;
        return (
          <div key={f.name} className={cn(f.span === "half" ? "md:col-span-1" : "md:col-span-2")}>
            <label htmlFor={id} className="eyebrow flex justify-between">
              <span>
                {f.label}
                {f.required ? <span aria-hidden> *</span> : <span className="text-paper/40"> (optional)</span>}
              </span>
              {f.type === "textarea" && (
                <span aria-hidden className="tabular-nums">
                  {(values[f.name] ?? "").length}/{f.max}
                </span>
              )}
            </label>
            {f.type === "textarea" ? (
              <textarea {...common} rows={6} placeholder={f.placeholder} className="field resize-y" onChange={(e) => set(f.name, e.target.value)} />
            ) : f.type === "select" ? (
              <select {...common} className="field appearance-none bg-ink" onChange={(e) => set(f.name, e.target.value)}>
                <option value="">Select…</option>
                {f.options!.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
            ) : (
              <input
                {...common}
                type={f.type ?? "text"}
                autoComplete={f.autoComplete}
                placeholder={f.placeholder}
                className="field"
                onChange={(e) => set(f.name, e.target.value)}
              />
            )}
            {err && (
              <p id={`${id}-err`} className="mt-2 text-[13px] text-signal">
                {err}
              </p>
            )}
          </div>
        );
      })}

      {/* Honeypot — hidden from humans and assistive tech */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={`${kind}-website_url`}>Leave this field empty</label>
        <input id={`${kind}-website_url`} name="website_url" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="md:col-span-2">
        <label className="flex cursor-pointer items-start gap-4">
          <input
            type="checkbox"
            name="consent"
            checked={consent}
            onChange={(e) => {
              setConsent(e.target.checked);
              setConsentError("");
            }}
            aria-invalid={consentError ? true : undefined}
            aria-describedby={consentError ? `${kind}-consent-err` : undefined}
            className="mt-1 h-4 w-4 shrink-0 appearance-none border border-line checked:border-paper checked:bg-paper focus-visible:outline-1"
          />
          <span className="body text-[14px]">
            I agree that VOGON may process the information above to respond to this inquiry, as described in the{" "}
            <Link to="/privacy" className="text-paper underline underline-offset-4">
              privacy policy
            </Link>
            .
          </span>
        </label>
        {consentError && (
          <p id={`${kind}-consent-err`} className="mt-2 text-[13px] text-signal">
            {consentError}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-6 border-t border-line pt-8 md:col-span-2 md:flex-row md:items-center md:justify-between">
        <p id="form-note" className="eyebrow max-w-md normal-case tracking-normal">
          Fields marked * are required. Please do not submit classified, export-controlled or sensitive personal information.
        </p>
        <button type="submit" disabled={status.state === "submitting"} className="btn group min-w-[240px] disabled:opacity-50">
          <span>{status.state === "submitting" ? "Sending…" : submitLabel}</span>
          <span aria-hidden className="arrow arrow-x">
            <VogonIcon name="arrow-right" />
          </span>
        </button>
      </div>

      <div ref={statusRef} tabIndex={-1} aria-live="assertive" className="outline-none md:col-span-2">
        {status.state === "error" && (
          <p role="alert" className="border-l-2 border-signal pl-4 text-[14px] text-paper/90">
            {status.message}
          </p>
        )}
      </div>
    </form>
  );
}

export const contactFields: FieldDef[] = [
  { name: "name", label: "Full name", required: true, autoComplete: "name", max: 120, min: 2, span: "half" },
  { name: "email", label: "Professional email", type: "email", required: true, autoComplete: "email", max: 200, span: "half" },
  { name: "organization", label: "Organization", autoComplete: "organization", max: 160, span: "half" },
  {
    name: "inquiryType",
    label: "Inquiry type",
    type: "select",
    required: true,
    max: 60,
    span: "half",
    options: ["General inquiry", "Research collaboration", "Partnership", "Media", "Careers", "Other"],
  },
  { name: "message", label: "Message", type: "textarea", required: true, max: 4000, min: 20, placeholder: "Tell us briefly about your inquiry." },
];

export const careersFields: FieldDef[] = [
  { name: "name", label: "Full name", required: true, autoComplete: "name", max: 120, min: 2, span: "half" },
  { name: "email", label: "Email", type: "email", required: true, autoComplete: "email", max: 200, span: "half" },
  {
    name: "discipline",
    label: "Discipline",
    type: "select",
    required: true,
    max: 60,
    span: "half",
    options: ["Software", "AI / ML", "Embedded & electronics", "Robotics & controls", "Aerospace & mechanical", "Operations", "Other"],
  },
  { name: "profileUrl", label: "Portfolio / LinkedIn / GitHub", type: "url", max: 300, span: "half", placeholder: "https://" },
  { name: "message", label: "What do you want to build?", type: "textarea", required: true, max: 4000, min: 40 },
];
