export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-stone-100/80">
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        <p className="text-center text-sm text-muted">
          © {new Date().getFullYear()} Chase Williams. In-person and remote
          coaching. Reply times are typically within one business day.
        </p>
      </div>
    </footer>
  );
}
