"use client";

import { useCallback, useState } from "react";

type FormState = "idle" | "submitting" | "success" | "error";

const initial = {
  fullName: "",
  email: "",
  phone: "",
  goals: "",
  experience: "",
  availability: "",
  limitations: "",
  referral: "",
  website: "",
};

const EXPERIENCE_OPTIONS = [
  "New to structured training",
  "Some gym experience",
  "Consistent for 1–2 years",
  "Advanced / competitive background",
] as const;

const STEP_COUNT = 9;

const emailOk = (s: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s.trim());

const titleClass =
  "text-lg font-medium tracking-tight text-stone-900 sm:text-xl sm:leading-snug";

export function IntakeForm() {
  const [values, setValues] = useState(initial);
  const [step, setStep] = useState(0);
  const [status, setStatus] = useState<FormState>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const canGoNext = useCallback(() => {
    switch (step) {
      case 0:
        return values.fullName.trim().length >= 2;
      case 1:
        return emailOk(values.email);
      case 2:
        return values.phone.trim().length >= 7;
      case 3:
        return values.goals.trim().length >= 8;
      case 4:
        return values.experience.length > 0;
      case 5:
        return values.availability.trim().length >= 2;
      case 6:
      case 7:
        return true;
      case 8:
        return false;
      default:
        return false;
    }
  }, [step, values]);

  const next = () => {
    if (!canGoNext() || step >= STEP_COUNT - 1) return;
    setStep((s) => s + 1);
  };

  const back = () => {
    if (step <= 0) return;
    setStep((s) => s - 1);
  };

  async function submit() {
    if (values.website) return;
    setStatus("submitting");
    setErrorMessage("");

    try {
      const res = await fetch("/api/intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: values.fullName.trim(),
          email: values.email.trim(),
          phone: values.phone.trim(),
          goals: values.goals.trim(),
          experience: values.experience,
          availability: values.availability.trim(),
          limitations: values.limitations.trim(),
          referral: values.referral.trim(),
        }),
      });

      const data = (await res.json().catch(() => ({}))) as {
        error?: string;
      };

      if (!res.ok) {
        setErrorMessage(
          data.error ?? "Something went wrong. Please try again.",
        );
        setStatus("error");
        return;
      }

      setStatus("success");
      setValues(initial);
      setStep(0);
    } catch {
      setErrorMessage("Network error. Check your connection and try again.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        className="flex min-h-0 flex-1 flex-col justify-center py-4"
        role="status"
      >
        <p className="text-xl font-medium tracking-tight text-stone-900 sm:text-2xl">
          You&apos;re on the list.
        </p>
        <p className="mt-2 max-w-md text-sm text-stone-500 leading-relaxed">
          Chase has been notified by text and will follow up using the contact
          details you shared.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 text-sm font-medium text-teal-700 transition hover:text-teal-800"
        >
          Submit another inquiry →
        </button>
      </div>
    );
  }

  const fieldClass =
    "w-full border-0 border-b border-stone-300 bg-transparent px-0 py-2 text-base text-stone-900 placeholder:text-stone-400 outline-none transition-[border-color] focus:border-teal-500";

  const textareaClass =
    "w-full rounded-md border border-stone-200/80 bg-transparent px-2.5 py-2 text-base leading-snug text-stone-900 placeholder:text-stone-400 outline-none transition-colors focus:border-teal-500";

  return (
    <div className="relative flex min-h-0 w-full flex-1 flex-col">
      <label
        className="pointer-events-none absolute -left-[9999px] top-0 h-px w-px overflow-hidden opacity-0"
        aria-hidden
      >
        Website
        <input
          tabIndex={-1}
          autoComplete="off"
          value={values.website}
          onChange={(e) =>
            setValues((v) => ({ ...v, website: e.target.value }))
          }
        />
      </label>

      <div className="mb-3 shrink-0 sm:mb-4">
        <div
          className="flex w-full items-center gap-1 sm:gap-1.5"
          role="progressbar"
          aria-valuenow={step + 1}
          aria-valuemin={1}
          aria-valuemax={STEP_COUNT}
          aria-label={`Form progress, step ${step + 1} of ${STEP_COUNT}`}
        >
          {Array.from({ length: STEP_COUNT }, (_, i) => {
            const done = i < step;
            const current = i === step;
            return (
              <span
                key={i}
                className={`h-1.5 min-w-0 flex-1 rounded-full transition-all duration-300 ease-out ${
                  done
                    ? "bg-teal-600"
                    : current
                      ? "bg-teal-500 shadow-[0_0_0_3px_rgba(13,148,136,0.22)]"
                      : "bg-stone-200"
                }`}
                aria-hidden
              />
            );
          })}
        </div>
        <div className="mt-2 flex items-baseline justify-between gap-2">
          <span className="text-xs font-medium text-stone-600 sm:text-sm">
            Question{" "}
            <span className="tabular-nums text-stone-900">{step + 1}</span>
          </span>
          <span className="text-xs tabular-nums text-stone-400 sm:text-sm">
            {STEP_COUNT} total
          </span>
        </div>
      </div>

      <div className="flex min-h-0 flex-1 flex-col">
        <div className="flex min-h-0 flex-1 flex-col justify-start pt-1 sm:pt-2">
          <div
            key={step}
            className="animate-intake-step min-h-0 w-full flex-1 overflow-y-auto overscroll-contain pr-0.5 [-webkit-overflow-scrolling:touch]"
          >
          {step === 0 && (
            <>
              <h3 className={titleClass}>What&apos;s your name?</h3>
              <label className="mt-2 block sm:mt-3">
                <span className="sr-only">Full name</span>
                <input
                  autoComplete="name"
                  value={values.fullName}
                  onChange={(e) =>
                    setValues((v) => ({ ...v, fullName: e.target.value }))
                  }
                  placeholder="First and last name"
                  className={fieldClass}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && canGoNext()) next();
                  }}
                />
              </label>
            </>
          )}

          {step === 1 && (
            <>
              <h3 className={titleClass}>Best email to reach you?</h3>
              <label className="mt-2 block sm:mt-3">
                <span className="sr-only">Email</span>
                <input
                  autoFocus
                  type="email"
                  autoComplete="email"
                  value={values.email}
                  onChange={(e) =>
                    setValues((v) => ({ ...v, email: e.target.value }))
                  }
                  placeholder="you@example.com"
                  className={fieldClass}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && canGoNext()) next();
                  }}
                />
              </label>
            </>
          )}

          {step === 2 && (
            <>
              <h3 className={titleClass}>Phone number?</h3>
              <label className="mt-2 block sm:mt-3">
                <span className="sr-only">Phone</span>
                <input
                  autoFocus
                  type="tel"
                  autoComplete="tel"
                  value={values.phone}
                  onChange={(e) =>
                    setValues((v) => ({ ...v, phone: e.target.value }))
                  }
                  placeholder="+1 …"
                  className={fieldClass}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && canGoNext()) next();
                  }}
                />
              </label>
            </>
          )}

          {step === 3 && (
            <>
              <h3 className={titleClass}>What are you working toward?</h3>
              <label className="mt-2 block sm:mt-3">
                <span className="sr-only">Goals</span>
                <textarea
                  autoFocus
                  rows={3}
                  value={values.goals}
                  onChange={(e) =>
                    setValues((v) => ({ ...v, goals: e.target.value }))
                  }
                  placeholder="Strength, recomposition, sport prep…"
                  className={`${textareaClass} min-h-[4rem] resize-y`}
                />
              </label>
            </>
          )}

          {step === 4 && (
            <>
              <h3 className={titleClass}>Training experience?</h3>
              <div className="mt-2 divide-y divide-stone-200/80 border-y border-stone-200/80 sm:mt-3">
                {EXPERIENCE_OPTIONS.map((opt) => {
                  const selected = values.experience === opt;
                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() =>
                        setValues((v) => ({ ...v, experience: opt }))
                      }
                      className={`flex w-full items-center gap-3 py-2.5 text-left text-sm transition-colors sm:gap-3.5 sm:py-3 sm:text-[15px] ${
                        selected
                          ? "text-teal-700"
                          : "text-stone-700 hover:text-stone-900"
                      }`}
                    >
                      <span
                        className={`mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full transition-colors ${
                          selected ? "bg-teal-500" : "bg-stone-300"
                        }`}
                        aria-hidden
                      />
                      <span className="leading-snug">{opt}</span>
                    </button>
                  );
                })}
              </div>
            </>
          )}

          {step === 5 && (
            <>
              <h3 className={titleClass}>When do you prefer to train?</h3>
              <label className="mt-2 block sm:mt-3">
                <span className="sr-only">Availability</span>
                <input
                  autoFocus
                  value={values.availability}
                  onChange={(e) =>
                    setValues((v) => ({ ...v, availability: e.target.value }))
                  }
                  placeholder="Weekday mornings, Tue/Thu evenings…"
                  className={fieldClass}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && canGoNext()) next();
                  }}
                />
              </label>
            </>
          )}

          {step === 6 && (
            <>
              <h3 className={titleClass}>Injuries or things to coach around?</h3>
              <p className="mt-1 text-xs text-stone-500">Optional.</p>
              <label className="mt-2 block sm:mt-3">
                <span className="sr-only">Limitations</span>
                <textarea
                  autoFocus
                  rows={3}
                  value={values.limitations}
                  onChange={(e) =>
                    setValues((v) => ({ ...v, limitations: e.target.value }))
                  }
                  placeholder="Leave blank if none."
                  className={`${textareaClass} min-h-[3.25rem] resize-y`}
                />
              </label>
            </>
          )}

          {step === 7 && (
            <>
              <h3 className={titleClass}>How did you hear about Chase?</h3>
              <p className="mt-1 text-xs text-stone-500">Optional.</p>
              <label className="mt-2 block sm:mt-3">
                <span className="sr-only">Referral</span>
                <input
                  autoFocus
                  value={values.referral}
                  onChange={(e) =>
                    setValues((v) => ({ ...v, referral: e.target.value }))
                  }
                  placeholder="Instagram, referral, search…"
                  className={fieldClass}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && canGoNext()) next();
                  }}
                />
              </label>
            </>
          )}

          {step === 8 && (
            <>
              <h3 className={titleClass}>Send your answers?</h3>
              <p className="mt-2 text-xs leading-relaxed text-stone-500 sm:text-sm">
                Chase gets a text summary and will reply at{" "}
                <span className="text-stone-800">{values.email || "—"}</span>{" "}
                · <span className="text-stone-800">{values.phone || "—"}</span>
              </p>
              {status === "error" && errorMessage && (
                <p
                  className="mt-4 border-l-2 border-red-500 pl-3 text-xs font-medium text-red-800 sm:text-sm"
                  role="alert"
                >
                  {errorMessage}
                </p>
              )}
            </>
          )}
          </div>
        </div>

        <div className="mt-auto flex shrink-0 items-center justify-between gap-4 border-t border-stone-200/70 pt-4">
          <button
            type="button"
            onClick={back}
            disabled={step === 0 || status === "submitting"}
            className="text-xs font-medium text-stone-500 transition hover:text-stone-900 disabled:pointer-events-none disabled:opacity-30 sm:text-sm"
          >
            ← Back
          </button>
          {step < 8 ? (
            <button
              type="button"
              onClick={next}
              disabled={!canGoNext()}
              className="text-xs font-semibold text-teal-700 transition hover:text-teal-800 disabled:cursor-not-allowed disabled:opacity-35 sm:text-sm"
            >
              Continue →
            </button>
          ) : (
            <button
              type="button"
              onClick={submit}
              disabled={status === "submitting"}
              className="text-xs font-semibold text-teal-700 transition hover:text-teal-800 disabled:cursor-not-allowed disabled:opacity-50 sm:text-sm"
            >
              {status === "submitting" ? "Sending…" : "Send →"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
