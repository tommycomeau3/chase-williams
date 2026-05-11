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

export function IntakeForm() {
  const [values, setValues] = useState(initial);
  const [step, setStep] = useState(0);
  const [status, setStatus] = useState<FormState>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const progressPct = ((step + 1) / STEP_COUNT) * 100;

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
      <div className="py-4" role="status">
        <p className="text-2xl font-medium tracking-tight text-stone-900 sm:text-3xl">
          You&apos;re on the list.
        </p>
        <p className="mt-4 max-w-md text-stone-500 leading-relaxed">
          Chase has been notified by text and will follow up using the contact
          details you shared.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-10 text-sm font-medium text-teal-700 transition hover:text-teal-800"
        >
          Submit another inquiry →
        </button>
      </div>
    );
  }

  const fieldClass =
    "w-full border-0 border-b border-stone-300 bg-transparent px-0 py-3.5 text-lg text-stone-900 placeholder:text-stone-400 outline-none transition-[border-color] focus:border-teal-500";

  const textareaClass =
    "w-full rounded-lg border border-stone-200/80 bg-transparent px-3 py-3 text-lg leading-relaxed text-stone-900 placeholder:text-stone-400 outline-none transition-colors focus:border-teal-500";

  return (
    <div className="relative w-full">
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

      <div className="mb-10 sm:mb-14">
        <div className="h-[2px] w-full overflow-hidden rounded-full bg-stone-200/90">
          <div
            className="h-full rounded-full bg-teal-500 transition-[width] duration-500 ease-out"
            style={{ width: `${progressPct}%` }}
            role="progressbar"
            aria-valuenow={step + 1}
            aria-valuemin={1}
            aria-valuemax={STEP_COUNT}
          />
        </div>
        <div className="mt-4 flex items-center justify-between text-[11px] font-medium uppercase tracking-[0.18em] text-stone-400">
          <span>Intake</span>
          <span>
            {step + 1} / {STEP_COUNT}
          </span>
        </div>
      </div>

      <div className="min-h-[min(320px,55vh)] sm:min-h-[min(360px,50vh)]">
        <div key={step} className="animate-intake-step">
          {step === 0 && (
            <>
              <h3 className="text-2xl font-medium tracking-tight text-stone-900 sm:text-3xl sm:leading-snug">
                What&apos;s your name?
              </h3>
              <label className="mt-10 block sm:mt-12">
                <span className="sr-only">Full name</span>
                <input
                  autoFocus
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
              <h3 className="text-2xl font-medium tracking-tight text-stone-900 sm:text-3xl sm:leading-snug">
                Best email to reach you?
              </h3>
              <label className="mt-10 block sm:mt-12">
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
              <h3 className="text-2xl font-medium tracking-tight text-stone-900 sm:text-3xl sm:leading-snug">
                Phone number?
              </h3>
              <label className="mt-10 block sm:mt-12">
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
              <h3 className="text-2xl font-medium tracking-tight text-stone-900 sm:text-3xl sm:leading-snug">
                What are you working toward?
              </h3>
              <label className="mt-10 block sm:mt-12">
                <span className="sr-only">Goals</span>
                <textarea
                  autoFocus
                  rows={5}
                  value={values.goals}
                  onChange={(e) =>
                    setValues((v) => ({ ...v, goals: e.target.value }))
                  }
                  placeholder="Strength, recomposition, sport prep, general health…"
                  className={textareaClass}
                />
              </label>
            </>
          )}

          {step === 4 && (
            <>
              <h3 className="text-2xl font-medium tracking-tight text-stone-900 sm:text-3xl sm:leading-snug">
                Training experience?
              </h3>
              <div className="mt-8 divide-y divide-stone-200/80 border-y border-stone-200/80 sm:mt-10">
                {EXPERIENCE_OPTIONS.map((opt) => {
                  const selected = values.experience === opt;
                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() =>
                        setValues((v) => ({ ...v, experience: opt }))
                      }
                      className={`flex w-full items-center gap-4 py-4 text-left text-base transition-colors sm:py-5 ${
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
              <h3 className="text-2xl font-medium tracking-tight text-stone-900 sm:text-3xl sm:leading-snug">
                When do you prefer to train?
              </h3>
              <label className="mt-10 block sm:mt-12">
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
              <h3 className="text-2xl font-medium tracking-tight text-stone-900 sm:text-3xl sm:leading-snug">
                Injuries or things to coach around?
              </h3>
              <p className="mt-3 text-sm text-stone-500">Optional.</p>
              <label className="mt-8 block sm:mt-10">
                <span className="sr-only">Limitations</span>
                <textarea
                  autoFocus
                  rows={4}
                  value={values.limitations}
                  onChange={(e) =>
                    setValues((v) => ({ ...v, limitations: e.target.value }))
                  }
                  placeholder="Leave blank if none."
                  className={`${textareaClass} min-h-[120px]`}
                />
              </label>
            </>
          )}

          {step === 7 && (
            <>
              <h3 className="text-2xl font-medium tracking-tight text-stone-900 sm:text-3xl sm:leading-snug">
                How did you hear about Chase?
              </h3>
              <p className="mt-3 text-sm text-stone-500">Optional.</p>
              <label className="mt-8 block sm:mt-10">
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
              <h3 className="text-2xl font-medium tracking-tight text-stone-900 sm:text-3xl sm:leading-snug">
                Send your answers?
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-stone-500">
                Chase gets a text summary and will reply at{" "}
                <span className="text-stone-800">{values.email || "—"}</span>{" "}
                · <span className="text-stone-800">{values.phone || "—"}</span>
              </p>
              {status === "error" && errorMessage && (
                <p
                  className="mt-8 border-l-2 border-red-500 pl-4 text-sm font-medium text-red-800"
                  role="alert"
                >
                  {errorMessage}
                </p>
              )}
            </>
          )}
        </div>
      </div>

      <div className="mt-12 flex items-center justify-between gap-6 pt-2 sm:mt-16">
        <button
          type="button"
          onClick={back}
          disabled={step === 0 || status === "submitting"}
          className="text-sm font-medium text-stone-500 transition hover:text-stone-900 disabled:pointer-events-none disabled:opacity-30"
        >
          ← Back
        </button>
        {step < 8 ? (
          <button
            type="button"
            onClick={next}
            disabled={!canGoNext()}
            className="text-sm font-semibold text-teal-700 transition hover:text-teal-800 disabled:cursor-not-allowed disabled:opacity-35"
          >
            Continue →
          </button>
        ) : (
          <button
            type="button"
            onClick={submit}
            disabled={status === "submitting"}
            className="text-sm font-semibold text-teal-700 transition hover:text-teal-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {status === "submitting" ? "Sending…" : "Send →"}
          </button>
        )}
      </div>
    </div>
  );
}
