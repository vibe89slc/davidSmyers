import { useCallback, useState } from "react"
import { About } from "./components/About"
import { Books } from "./components/Books"
import { Contact } from "./components/Contact"
import { DemoDialog, type InfoDialogContent } from "./components/DemoDialog"
import { Hero } from "./components/Hero"
import { IntroSequence } from "./components/IntroSequence"
import { Music } from "./components/Music"
import { SiteFooter } from "./components/SiteFooter"
import { SiteHeader } from "./components/SiteHeader"
import { SkipLink } from "./components/SkipLink"

const upcomingBookInfo: NonNullable<InfoDialogContent> = {
  title: "The upcoming book",
  message:
    "Pre-order and purchase options for the new work will be listed here as soon as the title, cover, and seller links are public.",
}

export default function App() {
  const [introDone, setIntroDone] = useState(false)
  const [infoDialog, setInfoDialog] = useState<InfoDialogContent>(null)
  const closeInfoDialog = useCallback(() => setInfoDialog(null), [])

  return (
    <div className="ds-page-texture relative min-h-svh max-w-full text-ds-text">
      <SkipLink
        introPending={!introDone}
        onDismissIntro={() => setIntroDone(true)}
      />
      {!introDone && (
        <IntroSequence
          onComplete={() => setIntroDone(true)}
          onCtaAction={() => setInfoDialog(upcomingBookInfo)}
        />
      )}
      <div
        className="text-pretty"
        id="app-shell"
        inert={!introDone}
      >
        {introDone && <SiteHeader />}
        <main id="main-content" tabIndex={-1} className="max-w-full outline-none [scroll-margin-top:5rem]">
          <Hero onUpcomingBookInfo={() => setInfoDialog(upcomingBookInfo)} />
          <About />
          <Books onUpcomingBookInfo={() => setInfoDialog(upcomingBookInfo)} />
          <Music />
          <Contact />
        </main>
        <SiteFooter />
      </div>
      <DemoDialog content={infoDialog} onClose={closeInfoDialog} />
    </div>
  )
}
