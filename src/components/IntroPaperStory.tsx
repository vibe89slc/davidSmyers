import { useEffect, useState } from "react"
import { useReducedMotion } from "framer-motion"
import { introContent, site } from "../content/siteContent"

const DETAIL_L_CH_MS = 38
const DETAIL = introContent.detail
const DETAIL_CODA = introContent.detailClosing

type Props = {
  labelId: string
  /** When true, show the full blurb; stops animating. */
  revealAll: boolean
  /** When true, the handwritten blurb can begin (e.g. after cursive name finishes). */
  startHandwriting: boolean
}

/**
 * Ruled-paper area: “The author of” + book title and cover are static; only the
 * paragraph below the image animates as handwriting, one letter at a time.
 */
/** Wavy pen path in 0–100 × 0–8 space; two strokes read as a quick scribble pass. */
const CODA_SCRIBBLE_D =
  "M0,5.4 C9,2.6 20,6.0 30,3.1 C40,0.4 52,4.9 64,2.0 C76,0.3 88,3.6 100,1.9 M2,5.9 C11,4.0 22,5.2 34,3.8 C46,2.2 58,4.4 70,2.6 C82,0.8 94,3.1 98,2.4"

export function IntroPaperStory({ labelId, revealAll, startHandwriting }: Props) {
  const reduce = useReducedMotion() === true
  const [dI, setDI] = useState(0)
  const [codaI, setCodaI] = useState(0)

  const applyFull = () => {
    setDI(DETAIL.length)
    setCodaI(DETAIL_CODA.length)
  }

  useEffect(() => {
    if (revealAll || reduce) {
      applyFull()
    }
  }, [revealAll, reduce])

  useEffect(() => {
    if (revealAll || reduce) return
    if (!startHandwriting) {
      setDI(0)
      setCodaI(0)
      return
    }
    setDI(0)
    setCodaI(0)
    const p = { d: 0, c: 0 }
    const ids: number[] = []
    const q = (fn: () => void, ms: number) => {
      const id = window.setTimeout(fn, ms)
      ids.push(id)
    }
    const step = () => {
      if (p.d < DETAIL.length) {
        p.d += 1
        setDI(p.d)
        q(step, DETAIL_L_CH_MS)
      } else if (p.c < DETAIL_CODA.length) {
        p.c += 1
        setCodaI(p.c)
        q(step, DETAIL_L_CH_MS)
      }
    }
    q(step, 80)
    return () => {
      ids.forEach(clearTimeout)
    }
  }, [revealAll, reduce, startHandwriting])

  return (
    <>
      <div
        className="text-left"
        aria-live="polite"
        aria-atomic="true"
        style={{ paddingLeft: "max(0.4rem, 3.5%)" }}
      >
        <p
          className="min-h-[0.7rem] font-mono text-[0.65rem] font-medium uppercase tracking-[0.2em] text-ds-muted"
          id={labelId}
        >
          {introContent.authorLead}
        </p>
        <h2 className="mt-1.5 min-h-[1.2em] font-mono text-[clamp(0.95rem,3.4vw,1.35rem)] font-semibold leading-tight text-ds-ink [text-wrap:balance] sm:mt-2">
          {introContent.priorTitle}
        </h2>
      </div>

      <div className="flex w-full flex-col items-center justify-center gap-0 px-0 sm:px-1">
        <div className="flex h-[clamp(9.5rem,28svh,15.75rem)] w-full max-w-[18rem] items-center justify-center sm:h-[clamp(10.125rem,30svh,15.75rem)] sm:max-w-[20.25rem]">
          <img
            src={site.coverImage.src}
            alt={site.coverImage.alt}
            width={300}
            height={480}
            className="max-h-full w-auto max-w-full object-contain [filter:drop-shadow(0_2px_6px_rgba(28,25,22,0.12))]"
            loading="eager"
            fetchPriority="high"
          />
        </div>
      </div>

      <p
        className="intro-handwriting intro-handwriting--body [text-wrap:pretty]"
        aria-live="polite"
        aria-atomic="true"
      >
        <span className="text-ds-ink/88">{DETAIL.slice(0, dI)}</span>
        {dI < DETAIL.length ? (
          <span className="text-transparent select-none" aria-hidden>
            {DETAIL.slice(dI)}
          </span>
        ) : null}
      </p>
      <p
        className="intro-handwriting intro-handwriting-coda [text-wrap:pretty]"
        aria-live="polite"
        aria-atomic="true"
      >
        <span className="intro-coda-line">
          <span className="text-ds-ink/88">{DETAIL_CODA.slice(0, codaI)}</span>
          {codaI < DETAIL_CODA.length ? (
            <span className="text-transparent select-none" aria-hidden>
              {DETAIL_CODA.slice(codaI)}
            </span>
          ) : null}
          <svg
            className={
              codaI === DETAIL_CODA.length && DETAIL_CODA.length > 0
                ? "intro-coda-scribble intro-coda-scribble--drawn"
                : "intro-coda-scribble"
            }
            viewBox="0 0 100 8"
            preserveAspectRatio="none"
            aria-hidden
          >
            <path
              pathLength="1"
              d={CODA_SCRIBBLE_D}
              strokeWidth="2.15"
            />
          </svg>
        </span>
      </p>
    </>
  )
}
