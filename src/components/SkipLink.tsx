type SkipLinkProps = {
  introPending?: boolean
  onDismissIntro?: () => void
}

export function SkipLink({ introPending, onDismissIntro }: SkipLinkProps) {
  return (
    <a
      href="#main-content"
      onClick={(e) => {
        if (introPending && onDismissIntro) {
          e.preventDefault()
          onDismissIntro()
          queueMicrotask(() => {
            document.getElementById("main-content")?.focus()
          })
        }
      }}
      className={
        "absolute left-[-9999px] bg-ds-elevated px-4 py-2 font-sans text-ds-text shadow-lg " +
        "focus:left-4 focus:top-4 focus:outline-none " +
        (introPending ? "z-[310]" : "z-[100]")
      }
    >
      Skip to main content
    </a>
  )
}
