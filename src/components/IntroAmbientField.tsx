import { useId } from "react"

const JADE = "var(--color-ds-jade, #1f5c4a)"
const CORAL = "var(--color-ds-coral, #c85d2a)"
const GOLD = "var(--color-ds-gold, #6b5a3e)"

type Props = {
  className?: string
  /** Softer line contrast */
  variant?: "default" | "softer"
}

/**
 * Static ruled notebook paper (margin + lines + light wash). No motion.
 * `aria-hidden` — text lives in separate layers with real semantics.
 */
export function IntroAmbientField({ className = "", variant = "default" }: Props) {
  const id = useId().replace(/:/g, "i")
  const opacityClass = variant === "softer" ? "opacity-[0.38] sm:opacity-40" : "opacity-48 sm:opacity-50"

  return (
    <div
      className={["pointer-events-none select-none", opacityClass, className].filter(Boolean).join(" ")}
      aria-hidden
    >
      <svg
        className="h-full w-full [mix-blend-mode:multiply]"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id={`${id}-wash`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={CORAL} stopOpacity="0" />
            <stop offset="45%" stopColor={JADE} stopOpacity="0.05" />
            <stop offset="100%" stopColor={GOLD} stopOpacity="0" />
          </linearGradient>
        </defs>
        <rect width="100" height="100" fill={`url(#${id}-wash)`} opacity="0.9" />
        <g stroke={JADE} strokeLinecap="round" strokeOpacity="0.2" opacity="0.5">
          <line x1="4.5" y1="0" x2="4.5" y2="100" strokeWidth="0.25" />
          <g strokeWidth="0.2">
            {Array.from({ length: 19 }, (_, j) => {
              const y = 3.5 + j * 4.6
              return <line key={j} x1="4.5" y1={y} x2="99" y2={y} />
            })}
          </g>
        </g>
      </svg>
    </div>
  )
}
