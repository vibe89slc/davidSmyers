import { site } from "../content/siteContent"

export function SiteFooter() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-ds-border/60 bg-ds-surface/50 py-8">
      <div className="mx-auto flex max-w-5xl flex-col items-start justify-between gap-4 px-4 sm:flex-row sm:items-center sm:px-6">
        <p className="text-sm text-ds-muted">
          © {year} {site.name}. All rights reserved.
        </p>
        <a
          href={site.links.hustlersHandbookAmazon}
          className="text-sm font-medium text-ds-gold underline-offset-2 hover:underline"
          rel="noopener noreferrer"
          target="_blank"
        >
          The Hustler’s Handbook on Amazon
        </a>
      </div>
    </footer>
  )
}
