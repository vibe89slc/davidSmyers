import { musicContent } from "../content/siteContent"
import { MusicPlatformButtons } from "./MusicPlatformButtons"
import { Reveal } from "./Reveal"

export function Music() {
  return (
    <section
      id="music"
      aria-labelledby="music-heading"
      className="border-b border-ds-border/60 bg-ds-surface/30"
    >
      <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 sm:py-20">
        <h2
          id="music-heading"
          className="font-serif text-3xl font-semibold [text-wrap:balance] sm:text-4xl"
        >
          {musicContent.title}
        </h2>
        {musicContent.body.map((p, i) => (
          <Reveal key={i}>
            <p className={`text-ds-muted [text-wrap:pretty] ${i === 0 ? "mt-4" : "mt-6"}`}>
              {p}
            </p>
          </Reveal>
        ))}
        <Reveal>
          <MusicPlatformButtons />
        </Reveal>
      </div>
    </section>
  )
}
