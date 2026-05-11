import Image from "next/image";
import { IntakeForm } from "@/components/IntakeForm";

/** Filler trainer photo — swap for your own file, e.g. `src="/chase-hero.jpg"` in `public/`. */
const HERO_TRAINER =
  "https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&w=1200&q=80";

/** Replace with your own photo in `public/` and swap to `src="/your-photo.jpg"`. */
const INTAKE_HERO =
  "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=1400&q=80";

export default function Home() {
  return (
    <main>
      <section className="relative flex min-h-[calc(100dvh-4rem)] flex-col overflow-hidden border-b border-border bg-stone-900 text-stone-50">
        <div
          className="pointer-events-none absolute inset-0 z-0 opacity-40"
          style={{
            backgroundImage:
              "radial-gradient(ellipse 80% 50% at 50% -20%, rgb(5 150 105 / 0.35), transparent)",
          }}
        />
        <div className="relative z-10 flex min-h-0 flex-1 flex-col justify-center">
          <div className="mx-auto grid w-full max-w-5xl content-start gap-8 px-4 py-10 sm:gap-10 sm:px-6 sm:py-12 lg:grid-cols-2 lg:items-center lg:gap-12 lg:py-10">
          <div className="min-w-0">
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

          <figure className="relative mx-auto aspect-[3/4] w-full max-w-[280px] shrink-0 overflow-hidden rounded-2xl border border-stone-600/40 shadow-2xl shadow-black/50 sm:max-w-[320px] lg:mx-0 lg:max-h-[min(420px,calc(100dvh-9rem))] lg:max-w-[min(100%,360px)] lg:justify-self-end lg:aspect-[3/4]">
            <Image
              src={HERO_TRAINER}
              alt="Chase Williams, personal trainer (placeholder photo)"
              fill
              sizes="(max-width: 1024px) 320px, 360px"
              className="object-cover object-[center_15%]"
              priority
            />
            <div
              className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-stone-950/70 via-stone-950/10 to-transparent"
              aria-hidden
            />
          </figure>
          </div>
        </div>
      </section>

      <section
        id="about"
        className="flex min-h-[calc(100dvh-4rem)] flex-col scroll-mt-20 border-b border-border bg-background"
      >
        <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col justify-center px-4 py-12 sm:px-6 sm:py-16">
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
        </div>
      </section>

      <section
        id="program"
        className="flex min-h-[calc(100dvh-4rem)] flex-col border-y border-border bg-stone-100/60"
      >
        <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col justify-center px-4 py-12 sm:px-6 sm:py-16">
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
        className="flex min-h-[calc(100dvh-4rem)] flex-col scroll-mt-20 border-t border-border bg-background lg:border-t-0"
      >
        <div className="mx-auto grid min-h-0 w-full max-w-6xl flex-1 grid-cols-1 gap-6 px-4 py-8 sm:px-6 sm:py-10 lg:grid-cols-2 lg:gap-0 lg:px-8 lg:py-6">
          <figure className="relative isolate h-52 w-full overflow-hidden rounded-2xl bg-stone-200 sm:h-60 lg:h-full lg:min-h-0 lg:rounded-none lg:rounded-l-2xl">
            <Image
              src={INTAKE_HERO}
              alt="Strength training in the gym"
              fill
              className="object-cover"
              sizes="(max-width: 1023px) 100vw, 50vw"
              priority={false}
            />
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-stone-950/50 via-transparent to-stone-950/20 lg:bg-gradient-to-r"
              aria-hidden
            />
          </figure>

          <div className="flex min-h-0 flex-col lg:h-full lg:border-y lg:border-r lg:border-border lg:rounded-r-2xl lg:bg-background lg:px-8 lg:py-8 xl:px-10">
            <header className="shrink-0">
              <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                Get started
              </h2>
              <p className="mt-1.5 max-w-xl text-sm text-muted leading-snug sm:text-base sm:leading-relaxed">
                A few quick questions. When you send, I get a text with your
                answers and follow up personally—usually the same day.
              </p>
            </header>
            <div className="mt-4 flex min-h-[20rem] flex-1 flex-col sm:mt-5 lg:min-h-0">
              <IntakeForm />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
