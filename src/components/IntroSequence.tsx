import { useCallback, useEffect, useId, useRef, useState } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { AmazonWordmarkLockup } from "./AmazonAsSeenOn"
import { CursiveNameBackdrop } from "./CursiveNameBackdrop"
import { IntroAmbientField } from "./IntroAmbientField"
import { IntroPaperStory } from "./IntroPaperStory"
import { introContent, site } from "../content/siteContent"

const ease = [0.22, 1, 0.36, 1] as const

type Props = {
  onComplete: () => void
  /** Fires when Pre-order is used (same flow as the upcoming-book info dialog). */
  onCtaAction?: () => void
}

export function IntroSequence({ onComplete, onCtaAction }: Props) {
  const labelId = useId()
  const reduce = useReducedMotion() === true
  const [revealEntireIntro, setRevealEntireIntro] = useState(false)
  const [cursiveNameDone, setCursiveNameDone] = useState(reduce)
  const onCompleteRef = useRef(onComplete)
  onCompleteRef.current = onComplete
  const [exiting, setExiting] = useState(false)
  const hasFinished = useRef(false)
  const enterTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const finishIntro = useCallback(() => {
    if (hasFinished.current) return
    hasFinished.current = true
    if (enterTimeoutRef.current) {
      clearTimeout(enterTimeoutRef.current)
      enterTimeoutRef.current = null
    }
    onCompleteRef.current()
  }, [])

  const runExitThenComplete = useCallback(
    (isPreOrder: boolean) => {
      if (hasFinished.current) return
      setRevealEntireIntro(true)
      if (reduce) {
        if (isPreOrder) onCtaAction?.()
        finishIntro()
        return
      }
      setExiting(true)
      enterTimeoutRef.current = setTimeout(() => {
        if (isPreOrder) onCtaAction?.()
        finishIntro()
      }, 520)
    },
    [reduce, onCtaAction, finishIntro],
  )

  const skipIntro = useCallback(() => {
    if (exiting) return
    if (hasFinished.current) return
    runExitThenComplete(false)
  }, [exiting, runExitThenComplete])

  const preOrder = useCallback(() => {
    if (exiting) return
    if (hasFinished.current) return
    runExitThenComplete(true)
  }, [exiting, runExitThenComplete])

  const enterSite = useCallback(() => {
    if (exiting) return
    if (hasFinished.current) return
    runExitThenComplete(false)
  }, [exiting, runExitThenComplete])

  useEffect(() => {
    const esc = (e: KeyboardEvent) => {
      if (e.key === "Escape") skipIntro()
    }
    window.addEventListener("keydown", esc)
    return () => window.removeEventListener("keydown", esc)
  }, [skipIntro])

  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = ""
    }
  }, [])

  useEffect(
    () => () => {
      if (enterTimeoutRef.current) clearTimeout(enterTimeoutRef.current)
    },
    [],
  )

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={labelId}
      className="ds-intro-bg fixed inset-0 z-[200] box-border flex h-[100dvh] max-h-[100dvh] w-full max-w-[100vw] flex-col overflow-hidden"
      style={{ padding: "0 env(safe-area-inset-right) 0 env(safe-area-inset-left)" }}
    >
      <button
        type="button"
        onClick={skipIntro}
        className="pointer-events-auto relative z-[220] ml-auto mr-2 mt-[max(0.35rem,env(safe-area-inset-top))] min-h-[44px] min-w-[44px] shrink-0 rounded-sm border border-ds-ink/15 bg-ds-elevated/80 px-3 py-2 font-mono text-xs font-medium uppercase tracking-widest text-ds-muted shadow-sm backdrop-blur-sm transition hover:border-ds-coral/50 hover:text-ds-ink"
      >
        Skip
      </button>

      <div className="relative z-10 flex min-h-0 flex-1 justify-center overflow-hidden px-2 pb-2 pt-0 sm:px-3 sm:pb-3">
        <motion.div
          className="flex min-h-0 w-full min-w-0 max-w-md flex-1 flex-col"
          initial={false}
          animate={exiting ? { opacity: 0, y: 10, filter: "blur(8px)" } : { opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.5, ease }}
        >
          <div
            className="relative flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden rounded border border-ds-ink/10 bg-[#ebe4da]/90 shadow-2xl backdrop-blur-sm"
            style={{ boxShadow: "0 0 0 1px rgba(0,0,0,0.05), 0 12px 40px rgba(28, 25, 22, 0.1)" }}
          >
            <div
              className="pointer-events-none absolute left-1.5 top-1.5 z-10 h-1.5 w-6 rounded-t-sm bg-amber-100/50 sm:left-2 sm:top-2"
              aria-hidden
            />
            <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-y-auto overflow-x-clip">
              <CursiveNameBackdrop
                className="relative z-[1] shrink-0 border-b border-ds-ink/10 bg-[#f2ebe3]/60 px-1 pb-0.5 pt-1.5 sm:pt-2"
                layout="header"
                onDrawComplete={() => setCursiveNameDone(true)}
              />
              <div className="relative z-0 min-h-0 flex-1">
                <IntroAmbientField className="absolute inset-0" />
                <div className="relative z-10 min-h-0 space-y-3 px-2.5 py-2 sm:space-y-4 sm:px-3 sm:py-2.5">
                  <IntroPaperStory
                    labelId={labelId}
                    revealAll={revealEntireIntro || reduce}
                    startHandwriting={cursiveNameDone}
                  />
                </div>
              </div>
            </div>
            <div className="shrink-0 space-y-2.5 border-t border-ds-ink/10 bg-[#f0ebe4] px-2.5 py-2.5 sm:px-3 sm:py-3">
              <button
                type="button"
                onClick={enterSite}
                className="w-full min-h-[52px] rounded-sm border-2 border-ds-ink/80 bg-ds-ink py-3.5 text-center font-mono text-sm font-medium uppercase tracking-widest text-ds-elevated transition hover:bg-ds-ink/90 sm:min-h-14 sm:text-base"
                aria-label={introContent.enterSiteAriaLabel}
              >
                {introContent.enterSiteLabel}
              </button>
              <div className="flex w-full min-h-[44px] flex-row gap-2">
                <a
                  href={site.links.hustlersHandbookAmazon}
                  rel="noopener noreferrer"
                  target="_blank"
                  className="inline-flex min-h-[44px] min-w-0 flex-1 flex-row flex-wrap items-center justify-center gap-1.5 rounded-sm border border-ds-ink/20 bg-ds-elevated px-2 py-1.5 text-ds-ink shadow-sm transition hover:border-ds-ink/40"
                  aria-label={introContent.buyOnAmazonAriaLabel}
                >
                  <span className="whitespace-nowrap text-[0.6rem] font-sans font-semibold uppercase tracking-[0.15em] text-ds-muted sm:text-[0.62rem]">
                    {introContent.buyOnAmazonLabel}
                  </span>
                  <AmazonWordmarkLockup className="shrink-0" />
                </a>
                <button
                  type="button"
                  onClick={preOrder}
                  className="min-h-[44px] min-w-0 flex-1 rounded-sm border-2 border-ds-ink/30 bg-ds-elevated/80 px-2 font-mono text-[0.65rem] font-medium uppercase tracking-widest text-ds-ink transition hover:border-ds-coral/50 hover:bg-ds-elevated sm:text-xs"
                  aria-label={introContent.preOrderAriaLabel}
                >
                  {introContent.preOrderLabel}
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
