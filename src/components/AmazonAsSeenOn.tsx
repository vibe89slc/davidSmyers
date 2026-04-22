import { site } from "../content/siteContent"

const TEXT = "#131921"
const SMILE = "#FF9900"

/** Small “amazon” + orange smile (not official mark) for compact CTAs. */
export function AmazonWordmarkLockup({ className = "" }: { className?: string }) {
  return (
    <span className={`relative inline-flex items-end ${className}`} aria-hidden>
      <span
        className="text-[0.75rem] font-extrabold leading-none tracking-tight [font-family:system-ui,Segoe_UI,Roboto,Helvetica_Neue,Arial,sans-serif] lowercase sm:text-[0.8rem]"
        style={{ color: TEXT }}
      >
        amazon
      </span>
      <svg
        className="mb-px w-[2.1rem] sm:w-9"
        viewBox="0 0 92 7"
        fill="none"
        aria-hidden
      >
        <path
          d="M1.5 0.5 C24 4.2 50 4.5 90.5 0.8"
          stroke={SMILE}
          strokeWidth="2.2"
          strokeLinecap="round"
        />
      </svg>
    </span>
  )
}

type Props = {
  className?: string
}

/**
 * "Available on Amazon" — standard retail phrasing; text wordmark + simple orange curve
 * (not Amazon’s official logo). For production, confirm trademark / affiliate guidelines.
 */
export function AmazonAsSeenOn({ className = "" }: Props) {
  return (
    <a
      href={site.links.hustlersHandbookAmazon}
      rel="noopener noreferrer"
      target="_blank"
      className={`group inline-flex max-w-full flex-col items-center gap-1.5 sm:flex-row sm:items-end sm:gap-2.5 ${className}`}
      aria-label="The Hustler’s Handbook — available on Amazon (opens in new tab)"
    >
      <span className="text-[0.65rem] font-sans font-semibold uppercase tracking-[0.22em] text-ds-muted">
        Available on
      </span>
      <span className="relative inline-block" aria-hidden>
        <span
          className="block text-[1.5rem] font-extrabold leading-none tracking-tight [font-family:system-ui,Segoe_UI,Roboto,Helvetica_Neue,Arial,sans-serif] lowercase sm:text-[1.7rem]"
          style={{ color: TEXT }}
        >
          amazon
        </span>
        <svg
          className="mt-0.5 w-[4.3rem] sm:w-[4.7rem]"
          viewBox="0 0 92 7"
          fill="none"
        >
          <path
            d="M1.5 0.5 C24 4.2 50 4.5 90.5 0.8"
            stroke={SMILE}
            strokeWidth="2.2"
            strokeLinecap="round"
          />
        </svg>
      </span>
    </a>
  )
}
