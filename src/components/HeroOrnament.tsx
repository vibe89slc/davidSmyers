/**
 * Full-bleed hero decoration — organic curves, soft washes, and a light dot veil.
 * Colors come from @theme in index.css.
 */
export function HeroOrnament() {
  return (
    <svg
      className="pointer-events-none absolute inset-0 z-0 h-full w-full"
      viewBox="0 0 1600 900"
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <defs>
        <radialGradient id="hero-wash-coral" cx="18%" cy="12%" r="0.75">
          <stop offset="0%" stopColor="var(--color-ds-coral)" stopOpacity="0.22" />
          <stop offset="55%" stopColor="var(--color-ds-coral)" stopOpacity="0.04" />
          <stop offset="100%" stopColor="var(--color-ds-coral)" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="hero-wash-jade" cx="88%" cy="78%" r="0.65">
          <stop offset="0%" stopColor="var(--color-ds-jade)" stopOpacity="0.14" />
          <stop offset="50%" stopColor="var(--color-ds-jade)" stopOpacity="0.04" />
          <stop offset="100%" stopColor="var(--color-ds-jade)" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="hero-wash-gold" cx="52%" cy="48%" r="0.4">
          <stop offset="0%" stopColor="var(--color-ds-gold)" stopOpacity="0.1" />
          <stop offset="100%" stopColor="var(--color-ds-gold)" stopOpacity="0" />
        </radialGradient>
        <pattern
          id="hero-dot-veil"
          width="24"
          height="24"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="1.2" cy="1.2" r="0.7" fill="var(--color-ds-ink)" opacity="0.035" />
        </pattern>
        <pattern
          id="hero-ruled-whisper"
          width="32"
          height="32"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M0 8 H32 M0 16 H32 M0 24 H32"
            stroke="var(--color-ds-jade)"
            strokeOpacity="0.06"
            strokeWidth="0.5"
            fill="none"
          />
        </pattern>
        <linearGradient id="hero-flow-stroke" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="var(--color-ds-coral)" stopOpacity="0.5" />
          <stop offset="50%" stopColor="var(--color-ds-jade)" stopOpacity="0.35" />
          <stop offset="100%" stopColor="var(--color-ds-coral)" stopOpacity="0.25" />
        </linearGradient>
      </defs>

      <rect width="100%" height="100%" fill="url(#hero-dot-veil)" />
      <rect
        width="100%"
        height="100%"
        fill="url(#hero-ruled-whisper)"
        opacity="0.55"
      />

      <ellipse
        cx="280"
        cy="120"
        rx="520"
        ry="360"
        fill="url(#hero-wash-coral)"
        transform="rotate(-8 280 120)"
      />
      <ellipse
        cx="1320"
        cy="720"
        rx="480"
        ry="400"
        fill="url(#hero-wash-jade)"
        transform="rotate(12 1320 720)"
      />
      <ellipse
        cx="820"
        cy="400"
        rx="360"
        ry="220"
        fill="url(#hero-wash-gold)"
        transform="rotate(-3 820 400)"
      />

      <g
        className="mix-blend-multiply"
        fill="none"
        stroke="url(#hero-flow-stroke)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.1"
        opacity="0.55"
      >
        <path d="M -40 180 C 220 40, 420 360, 680 200 S 1200 80, 1680 220" />
        <path
          d="M 200 920 C 380 720, 520 800, 720 600 S 1040 400, 1400 520"
          opacity="0.7"
        />
        <path
          d="M 1240 -30 C 1100 120, 1280 280, 1120 420 S 900 620, 1080 780"
          opacity="0.65"
        />
      </g>

      <g
        fill="none"
        stroke="var(--color-ds-ink)"
        strokeOpacity="0.07"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      >
        <path d="M 60 120 Q 400 60, 720 100 T 1400 40" />
        <path
          d="M 0 300 C 300 360, 600 200, 900 300 S 1500 240, 1600 320"
        />
        <path d="M 200 600 Q 500 700, 800 640 T 1500 680" />
      </g>
    </svg>
  )
}
