import { useEffect, useId, useRef } from "react"

export type InfoDialogContent = { title: string; message: string } | null

type DemoDialogProps = {
  content: InfoDialogContent
  onClose: () => void
}

export function DemoDialog({ content, onClose }: DemoDialogProps) {
  const ref = useRef<HTMLDialogElement>(null)
  const titleId = useId()
  const descId = useId()

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (content) {
      el.showModal()
    } else {
      el.close()
    }
  }, [content])

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const onDialogClose = () => onClose()
    el.addEventListener("close", onDialogClose)
    return () => el.removeEventListener("close", onDialogClose)
  }, [onClose])

  if (!content) return null

  return (
    <dialog
      ref={ref}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      aria-describedby={descId}
      className="max-w-md rounded-lg border border-ds-border bg-ds-elevated p-6 text-ds-text shadow-2xl backdrop:bg-stone-900/40"
    >
      <h2 id={titleId} className="font-serif text-2xl text-ds-gold">
        {content.title}
      </h2>
      <p id={descId} className="mt-3 text-ds-muted">
        {content.message}
      </p>
      <div className="mt-6 flex flex-wrap justify-end gap-2">
        <button
          type="button"
          onClick={onClose}
          className="rounded-md border border-ds-border bg-ds-surface px-4 py-2 text-ds-text transition hover:border-ds-gold"
        >
          Close
        </button>
      </div>
    </dialog>
  )
}
