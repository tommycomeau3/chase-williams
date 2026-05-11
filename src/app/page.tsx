import { IntakeForm } from "@/components/IntakeForm";

export default function Home() {
  return (
    <main>
      <section className="relative overflow-hidden border-b border-border bg-stone-900 text-stone-50">
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "radial-gradient(ellipse 80% 50% at 50% -20%, rgb(5 150 105 / 0.35), transparent)",
          }}
        />
        <div className="relative mx-auto max-w-5xl px-4 py-20 sm:px-6 sm:py-28">
          <p className="text-sm font-medium uppercase tracking-widest text-emerald-400/90">
            Personal training
          </p>
          <h1 className="mt-4 max-w-2xl text-4xl font-bold tracking-tight sm:text-5xl sm:leading-tight">
            Build strength and confidence with a plan built around you.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-stone-300">
            Coaching that balances smart progression, accountability, and
            life outside the gym—whether you&apos;re starting fresh or leveling
            up.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="#intake"
              className="inline-flex items-center justify-center rounded-xl bg-emerald-500 px-6 py-3.5 text-base font-semibold text-stone-950 shadow-lg shadow-emerald-900/30 transition hover:bg-emerald-400"
            >
              Start your application
            </a>
            <a
              href="#program"
              className="inline-flex items-center justify-center rounded-xl border border-stone-600 px-6 py-3.5 text-base font-semibold text-stone-100 transition hover:border-stone-500 hover:bg-stone-800/50"
            >
              See the program
            </a>
          </div>
        </div>
      </section>

      <section
        id="about"
        className="mx-auto max-w-5xl scroll-mt-20 px-4 py-16 sm:px-6 sm:py-24"
      >
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              About Chase
            </h2>
            <p className="mt-4 text-muted leading-relaxed">
              I&apos;m a certified personal trainer focused on sustainable
              strength training and conditioning. My clients range from busy
              professionals getting consistent for the first time to athletes
              who want structure and feedback they can trust.
            </p>
            <p className="mt-4 text-muted leading-relaxed">
              Sessions are intentional: we track loads, recovery, and how you
              feel week to week so progress shows up in the mirror and on the
              bar—not just on paper.
            </p>
            <ul className="mt-8 space-y-3 text-foreground">
              {[
                "NASM-CPT (placeholder — update with your real credentials)",
                "Strength & hypertrophy specialization",
                "Form-first coaching and injury-aware progressions",
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <span
                    className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-accent"
                    aria-hidden
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-border bg-surface p-8 shadow-sm">
            <h3 className="text-lg font-semibold text-foreground">
              What clients say
            </h3>
            <blockquote className="mt-4 text-muted leading-relaxed">
              &ldquo;Clear programming and someone who actually listens. I
              finally feel strong without living in the gym.&rdquo;
            </blockquote>
            <p className="mt-4 text-sm font-medium text-foreground">
              — Replace with a real testimonial
            </p>
          </div>
        </div>
      </section>

      <section
        id="program"
        className="border-y border-border bg-stone-100/60 py-16 sm:py-24"
      >
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            The program
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-muted leading-relaxed">
            A simple framework: assess, train, review. You always know why
            we&apos;re doing what we&apos;re doing—and what changes when life
            gets busy.
          </p>
          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {[
              {
                title: "Onboarding",
                body: "Movement screen, goals, schedule, and equipment access so week one feels confident, not chaotic.",
              },
              {
                title: "Training blocks",
                body: "4–6 week phases with tracked lifts and conditioning. Adjustments based on feedback and recovery.",
              },
              {
                title: "Check-ins",
                body: "Short reviews between sessions (or weekly for remote) so we stay aligned and motivated.",
              },
            ].map((card) => (
              <article
                key={card.title}
                className="rounded-2xl border border-border bg-surface p-6 shadow-sm"
              >
                <h3 className="text-lg font-semibold text-foreground">
                  {card.title}
                </h3>
                <p className="mt-3 text-sm text-muted leading-relaxed">
                  {card.body}
                </p>
              </article>
            ))}
          </div>
          <p className="mt-10 text-sm text-muted">
            Offerings, pricing, and location (studio / in-home / hybrid) are
            easy to customize in this page copy once you know how you want to
            run sessions.
          </p>
        </div>
      </section>

      <section
        id="intake"
        className="mx-auto max-w-2xl scroll-mt-20 px-4 py-16 sm:px-6 sm:py-24"
      >
        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Get started
        </h2>
        <p className="mt-4 max-w-xl text-muted leading-relaxed">
          A few quick questions. When you send, I get a text with your answers
          and follow up personally—usually the same day.
        </p>
        <div className="mt-12 sm:mt-16">
          <IntakeForm />
        </div>
      </section>
    </main>
  );
}
