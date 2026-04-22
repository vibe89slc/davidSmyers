import type { ReactNode } from "react"
import { musicContent } from "../content/siteContent"

function IconAppleMusic() {
  return (
    <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24" aria-hidden>
      <rect width="24" height="24" fill="#fa243c" rx="4.2" />
      <ellipse cx="7.1" cy="16.2" fill="#fff" rx="1.4" ry="1.1" transform="rotate(-8 7.1 16.2)" />
      <path fill="none" stroke="#fff" strokeLinecap="round" strokeWidth="1.35" d="M8.1 16V5" />
    </svg>
  )
}

function IconSpotify() {
  return (
    <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24" aria-hidden>
      <path fill="#1ed760" d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.6 0 12 0z" />
      <g fill="none" stroke="#fff" strokeLinecap="round" strokeWidth="1.2">
        <path d="M6.1 7.1Q12.1 4.1 16.1 4.1" />
        <path d="M4.1 9.1Q12.1 6.1 18.1 6.1" />
        <path d="M3.1 12.1Q12.1 8.1 20.1 8.1" />
      </g>
    </svg>
  )
}

function IconYouTube() {
  return (
    <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24" aria-hidden>
      <rect width="24" height="24" fill="#f00" rx="4" />
      <path fill="#fff" d="M8.1 5.1v12.1L17.1 11.1z" />
    </svg>
  )
}

const btnClass =
  "inline-flex min-h-[48px] w-full min-w-0 max-w-sm flex-1 items-center justify-center gap-2.5 rounded-md border-2 border-ds-border/80 bg-ds-elevated px-4 py-2.5 text-left text-sm font-semibold text-ds-ink shadow-sm sm:max-w-xs sm:text-base"

/**
 * Inert “streaming” row: looks like service buttons; does not navigate.
 */
export function MusicPlatformButtons() {
  const rows: { label: string; icon: ReactNode; aria: string }[] = [
    {
      label: musicContent.onApple,
      icon: <IconAppleMusic />,
      aria: musicContent.onApple,
    },
    {
      label: musicContent.onSpotify,
      icon: <IconSpotify />,
      aria: musicContent.onSpotify,
    },
    {
      label: musicContent.onYouTube,
      icon: <IconYouTube />,
      aria: musicContent.onYouTube,
    },
  ]

  return (
    <div className="mt-8">
      <div
        className="flex flex-col flex-wrap items-stretch justify-start gap-3 sm:flex-row sm:items-center"
        role="group"
        aria-label="Music streaming: Apple Music, Spotify, and YouTube"
      >
        {rows.map((row) => (
          <button
            key={row.label}
            type="button"
            tabIndex={-1}
            className={btnClass}
            aria-disabled="true"
            aria-label={row.aria}
            onClick={(e) => e.preventDefault()}
          >
            {row.icon}
            <span className="whitespace-nowrap">{row.label}</span>
          </button>
        ))}
      </div>
      <p className="mt-3 text-sm text-ds-muted [text-wrap:pretty]">{musicContent.platformNote}</p>
    </div>
  )
}
