import { useEffect, useId, useRef, useState } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { site } from "../content/siteContent"

const _parts = site.name.split(" ")
const first = _parts[0] ?? site.name
const last = _parts[1] ?? ""

const T1 = 1.35
const D1 = 0.05
const T2 = 1.25
const D2 = 0.55
const CLIP1_END_S = D1 + T1
const CLIP2_END_S = D2 + T2
function notifyMsAfter(hasLast: boolean) {
  return (hasLast ? CLIP2_END_S : CLIP1_END_S) * 1000 + 120
}

type Rand = {
  rot: number
  tx: number
  ty: number
  sc: number
  fs: string
}

function randomBetween(a: number, b: number) {
  return a + Math.random() * (b - a)
}

const HEADER_NAME_FS = "clamp(2.95rem, 6.8vh, 4.5rem)"

function makeRand(compact: boolean): Rand {
  if (compact) {
    return {
      rot: 0,
      tx: 0,
      ty: 0,
      sc: 1,
      fs: HEADER_NAME_FS,
    }
  }
  return {
    rot: randomBetween(-5, 3.5),
    tx: randomBetween(-0.8, 0.8),
    ty: randomBetween(-0.5, 0.5),
    sc: randomBetween(0.96, 1.04),
    fs: `${randomBetween(3.2, 4.1).toFixed(2)}rem`,
  }
}

type Props = {
  className?: string
  onDrawComplete?: () => void
  /** `header` = top of intro card; no full-screen layer. */
  layout?: "header" | "overlay"
  deemphasize?: boolean
}

const wipe1 = (uid: string) => `cursive-wipe-1-${uid}`
const wipe2 = (uid: string) => `cursive-wipe-2-${uid}`

/**
 * Stacked cursive, solid black; “draw” = clip-path sweeps in (reliable in browsers vs SVG rect clips).
 */
export function CursiveNameBackdrop({
  className = "",
  onDrawComplete,
  deemphasize = false,
  layout = "header",
}: Props) {
  const reduce = useReducedMotion()
  const uid = useId().replace(/:/g, "")
  const w1 = wipe1(uid)
  const w2 = wipe2(uid)

  const [p] = useState(() => makeRand(layout === "header"))
  const completeOnce = useRef(false)

  const hasLast = Boolean(last)
  const notifyAfter = notifyMsAfter(hasLast)

  useEffect(() => {
    if (reduce === true) {
      if (!completeOnce.current) {
        completeOnce.current = true
        onDrawComplete?.()
      }
      return
    }
    const t = window.setTimeout(() => {
      if (!completeOnce.current) {
        completeOnce.current = true
        onDrawComplete?.()
      }
    }, notifyAfter)
    return () => clearTimeout(t)
  }, [reduce, onDrawComplete, notifyAfter])

  const shell =
    layout === "header"
      ? "relative w-full flex shrink-0 flex-col items-stretch overflow-visible select-none py-0.5 sm:py-1"
      : "pointer-events-none absolute inset-0 z-0 flex items-center justify-center overflow-x-hidden overflow-y-hidden p-4 pb-6 pt-5 select-none sm:p-6 sm:pb-8 sm:pt-6"

  return (
    <motion.div
      className={`${shell} ${className}`}
      style={layout === "header" ? { overflow: "visible" } : undefined}
      aria-hidden
      initial={false}
      animate={layout === "header" ? { opacity: 1 } : { opacity: deemphasize ? 0.1 : 1 }}
      transition={layout === "header" ? undefined : { duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      <style>{`
        @keyframes ${w1} {
          to { clip-path: inset(0 0% 0 0); -webkit-clip-path: inset(0 0% 0 0); }
        }
        @keyframes ${w2} {
          to { clip-path: inset(0 0% 0 0); -webkit-clip-path: inset(0 0% 0 0); }
        }
      `}</style>
      <div
        className={
          "isolate flex w-full min-w-0 max-w-full flex-col items-center [text-align:center] " +
          (layout === "header"
            ? "h-auto min-h-0 justify-start overflow-visible"
            : "min-h-0 flex-1 justify-center")
        }
        style={{
          fontFamily: "'Great Vibes', cursive",
          color: "#000",
          fontWeight: 400,
          overflow: layout === "header" ? "visible" : undefined,
          transform: `translate(${p.tx}rem, ${p.ty}rem) rotate(${p.rot}deg) scale(${p.sc})`,
        }}
      >
        {/* “S” line stacks above the “D” at the join so the overlap is visible, not lost to clipping. */}
        <div
          className="relative z-10 mx-auto w-max max-w-[min(100%,96vw)]"
          style={
            reduce === true
              ? {
                  fontSize: p.fs,
                  clipPath: "inset(0 0% 0 0)",
                  WebkitClipPath: "inset(0 0% 0 0)",
                  padding: "0.42em 0.62em 0.1em 0.68em",
                }
              : {
                  fontSize: p.fs,
                  clipPath: "inset(0 100% 0 0)",
                  WebkitClipPath: "inset(0 100% 0 0)",
                  animation: `${w1} ${T1}s ease-out ${D1}s forwards`,
                  padding: "0.42em 0.62em 0.1em 0.68em",
                }
          }
        >
          <div
            className="whitespace-nowrap"
            style={{
              fontSize: "1em",
              lineHeight: layout === "header" ? 0.7 : 0.75,
              display: "block",
              overflow: "visible",
            }}
          >
            {first}
          </div>
        </div>
        {last ? (
          <div
            className="relative z-30 -mt-[0.38em] mx-auto w-max max-w-[min(100%,96vw)] sm:-mt-[0.44em]"
            style={
              reduce === true
                ? {
                    fontSize: p.fs,
                    clipPath: "inset(0 0% 0 0)",
                    WebkitClipPath: "inset(0 0% 0 0)",
                    padding: "0.48em 0.62em 0.3em 0.68em",
                  }
                : {
                    fontSize: p.fs,
                    clipPath: "inset(0 100% 0 0)",
                    WebkitClipPath: "inset(0 100% 0 0)",
                    animation: `${w2} ${T2}s ease-out ${D2}s forwards`,
                    padding: "0.48em 0.62em 0.3em 0.68em",
                  }
            }
          >
            <div
              className="whitespace-nowrap text-ds-coral"
              style={{
                fontSize: "1em",
                lineHeight: layout === "header" ? 0.7 : 0.75,
                display: "block",
                overflow: "visible",
              }}
            >
              {last}
            </div>
          </div>
        ) : null}
      </div>
    </motion.div>
  )
}
