import Image from "next/image";
import Link from "next/link";

/** Place your file at `public/logo.png` (or change the path below). */
const LOGO_SRC = "/logo.png";

const nav = [
  { href: "#about", label: "About" },
  { href: "#program", label: "Program" },
  { href: "#intake", label: "Get started" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-background/95 backdrop-blur-md">
      <div className="flex h-24 w-full min-w-0 items-center justify-between gap-3">
        <div className="shrink-0 pl-4 sm:pl-5 lg:pl-6">
          <Link
            href="/"
            className="relative block h-[4.25rem] w-[min(calc(100vw-10rem),19rem)] sm:h-20 sm:w-[min(calc(100vw-12rem),24rem)] lg:w-[32rem]"
            aria-label="Chase Williams Training — home"
          >
            <Image
              src={LOGO_SRC}
              alt=""
              fill
              className="object-contain object-left [filter:contrast(1.05)]"
              sizes="(max-width:640px) 288px, (max-width:1024px) 352px, 480px"
              priority
            />
          </Link>
        </div>
        <nav className="flex shrink-0 items-center gap-0.5 pr-3 sm:gap-1 sm:pr-4 lg:pr-[max(1.5rem,calc((100vw-64rem)/2+1.5rem))]">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-lg px-2.5 py-2 text-sm font-semibold text-stone-600 transition-colors hover:bg-stone-100 hover:text-foreground sm:px-3 sm:text-base"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
