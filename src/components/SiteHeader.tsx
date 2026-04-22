import { useId, useState } from "react"
import { site } from "../content/siteContent"

const nameParts = site.name.split(" ")
const firstN = nameParts[0] ?? site.name
const lastN = nameParts[1] ?? ""

const nav = [
  { href: "#about", label: "About" },
  { href: "#books", label: "Books" },
  { href: "#music", label: "Music" },
  { href: "#contact", label: "Contact" },
] as const

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const navId = useId()

  return (
    <header className="sticky top-0 z-50 border-b border-ds-border/90 bg-ds-elevated/80 shadow-[0_1px_0_0_rgba(28,25,22,0.06)] backdrop-blur-md">
      <div className="relative mx-auto flex max-w-6xl items-center justify-between gap-2 px-4 py-3 sm:px-6 sm:py-4">
        <a
          href="#top"
          className="group min-w-0 max-w-[min(100%,20rem)] shrink pr-1 focus:outline-offset-4"
        >
          <span
            className="block font-serif text-[clamp(1.4rem,4.2vw,2.6rem)] font-semibold leading-[0.9] tracking-[-0.02em] text-ds-ink"
            style={{ textShadow: "0 1px 0 rgba(255,255,255,0.4)" }}
          >
            {firstN}
            {lastN ? (
              <>
                <br aria-hidden="true" />
                <span className="text-ds-coral">{lastN}</span>
              </>
            ) : null}
          </span>
          <span className="mt-0.5 block font-mono text-[0.6rem] font-medium uppercase tracking-[0.32em] text-ds-coral/90 sm:mt-1 sm:text-[0.7rem]">
            author · music · spirit
          </span>
        </a>
        <button
          type="button"
          className="inline-flex min-h-[44px] min-w-[44px] shrink-0 items-center justify-center rounded-md border border-ds-border p-2 text-ds-text md:hidden"
          aria-expanded={open}
          aria-controls={navId}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <span aria-hidden className="flex flex-col gap-1.5">
            <span
              className={`h-0.5 w-6 rounded bg-ds-ink/70 transition ${open ? "translate-y-2 rotate-45" : ""}`}
            />
            <span
              className={`h-0.5 w-6 rounded bg-ds-ink/70 transition ${open ? "opacity-0" : ""}`}
            />
            <span
              className={`h-0.5 w-6 rounded bg-ds-ink/70 transition ${open ? "-translate-y-2 -rotate-45" : ""}`}
            />
          </span>
        </button>
        <nav
          id={navId}
          className={`absolute right-4 top-full z-50 mt-1 w-[min(100vw-2rem,20rem)] flex-col gap-1 rounded-lg border border-ds-border bg-ds-elevated/95 p-3 shadow-lg backdrop-blur-sm md:static md:mt-0 md:flex md:w-auto md:flex-row md:items-center md:gap-7 md:border-0 md:bg-transparent md:p-0 md:shadow-none ${
            open ? "flex" : "hidden md:flex"
          }`}
        >
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-2 text-ds-text transition hover:bg-ds-surface/90 hover:text-ds-coral"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </a>
          ))}
          <a
            href={site.links.hustlersHandbookAmazon}
            className="mt-1 inline-flex min-h-[44px] w-full items-center justify-center rounded-sm border-2 border-ds-ink bg-ds-ink font-mono text-xs font-medium uppercase tracking-widest text-ds-elevated transition hover:bg-ds-ink/90 md:hidden"
            rel="noopener noreferrer"
            target="_blank"
            onClick={() => setOpen(false)}
          >
            Get the book
          </a>
        </nav>
        <a
          href={site.links.hustlersHandbookAmazon}
          className="hidden min-h-[44px] min-w-0 shrink-0 items-center justify-center rounded-sm border-2 border-ds-ink bg-ds-ink px-3 py-2 text-center font-mono text-xs font-medium uppercase tracking-widest text-ds-elevated transition hover:bg-ds-ink/90 sm:inline-flex"
          rel="noopener noreferrer"
          target="_blank"
        >
          Book
        </a>
      </div>
    </header>
  )
}
