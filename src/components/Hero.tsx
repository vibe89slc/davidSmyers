import { useRef } from "react"
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion"
import { site } from "../content/siteContent"
import { HeroOrnament } from "./HeroOrnament"

const [first, last] = site.name.split(" ")

type HeroProps = {
  onUpcomingBookInfo: () => void
}

export function Hero({ onUpcomingBookInfo }: HeroProps) {
  const reduce = useReducedMotion()
  const sectionRef = useRef<HTMLElement | null>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })
  const imageY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 20])

  return (
    <section
      id="top"
      ref={sectionRef}
      aria-labelledby="hero-heading"
      className="relative overflow-hidden border-b border-ds-border/60"
    >
      <HeroOrnament />
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 20% 10%, rgba(200, 93, 42, 0.11) 0%, transparent 50%), linear-gradient(180deg, rgba(251, 247, 241, 0) 0%, var(--color-ds-bg) 100%)",
        }}
        aria-hidden
      />
      <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:flex-row lg:items-stretch lg:gap-12 lg:py-24">
        <div className="min-w-0 flex-1">
          <p className="font-mono text-[0.7rem] font-medium uppercase tracking-[0.32em] text-ds-coral/90 sm:text-xs">
            The work
          </p>
          <h1
            id="hero-heading"
            className="mt-2 text-[clamp(2.75rem,8vw,5rem)] font-semibold leading-[0.92] tracking-[-0.02em] text-ds-ink [text-wrap:balance]"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            <span className="block">{first}</span>
            <span className="mt-0.5 block bg-gradient-to-r from-ds-coral via-ds-coral to-ds-accent bg-clip-text text-transparent">
              {last}
            </span>
          </h1>
          <p className="mt-4 max-w-xl font-serif text-2xl font-medium italic leading-snug text-ds-ink/88 [text-wrap:balance] sm:text-3xl sm:leading-tight">
            {site.tagline}
          </p>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ds-muted [text-wrap:pretty] sm:text-xl">
            {site.subline}
          </p>
          <p className="mt-3 inline-flex rounded-sm border border-ds-jade/30 bg-ds-jade/10 px-3 py-1.5 font-mono text-xs font-medium text-ds-jade sm:text-sm">
            {site.launchBadge}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={site.links.hustlersHandbookAmazon}
              className="inline-flex min-h-[48px] min-w-[48px] items-center justify-center rounded-sm border-2 border-ds-ink bg-ds-ink px-5 py-2.5 text-center font-mono text-sm font-medium uppercase tracking-wider text-ds-elevated transition hover:bg-ds-ink/90"
              rel="noopener noreferrer"
              target="_blank"
            >
              The Hustler’s Handbook
            </a>
            <button
              type="button"
              onClick={onUpcomingBookInfo}
              className="inline-flex min-h-[48px] min-w-[48px] items-center justify-center rounded-sm border-2 border-ds-coral/50 bg-ds-elevated/50 px-5 py-2.5 text-center text-base font-medium text-ds-ink/90 transition hover:border-ds-coral hover:bg-ds-coral/5"
              aria-label="Learn about pre-order and purchase for the upcoming book"
            >
              Upcoming book — pre-order
            </button>
          </div>
        </div>
        <div className="mx-auto w-full max-w-sm shrink-0 self-center lg:self-stretch">
          <div
            className="relative h-full min-h-0 p-1 sm:max-w-none"
            style={{
              background:
                "linear-gradient(135deg, rgba(200,93,42,0.2) 0%, rgba(31,92,74,0.12) 50%, rgba(200,93,42,0.15) 100%)",
            }}
          >
            <p className="mb-1 text-center font-mono text-[10px] uppercase tracking-[0.28em] text-ds-ink/50">
              [ 1999 · memoir ]
            </p>
            {reduce ? (
              <div className="overflow-hidden border border-ds-ink/10 shadow-2xl">
                <img
                  src={site.coverImage.src}
                  alt={site.coverImage.alt}
                  className="h-auto w-full object-cover"
                  width={400}
                  height={640}
                  loading="eager"
                  fetchPriority="high"
                />
              </div>
            ) : (
              <motion.div
                style={{ y: imageY }}
                className="overflow-hidden border border-ds-ink/10 shadow-2xl will-change-transform"
              >
                <img
                  src={site.coverImage.src}
                  alt={site.coverImage.alt}
                  className="h-auto w-full object-cover"
                  width={400}
                  height={640}
                  loading="eager"
                  fetchPriority="high"
                />
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
