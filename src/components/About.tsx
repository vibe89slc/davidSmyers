import { aboutParagraphs, site } from "../content/siteContent"
import { renderSimpleMarkdown } from "../lib/markdownish"
import { Reveal } from "./Reveal"

const journeyLead =
  "A path from 1950s street narrative in his memoir, through years of music and teaching, to spiritual and reflective writing."

export function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="border-b border-ds-border/60 bg-ds-surface/40"
    >
      <div className="border-l-4 border-ds-coral/70 bg-amber-50/50 px-4 py-10 sm:px-6">
        <div className="mx-auto max-w-5xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-ds-coral">
            The journey
          </p>
          <p className="mt-2 max-w-2xl font-serif text-2xl text-ds-ink/90 [text-wrap:balance] sm:text-3xl">
            {journeyLead}
          </p>
        </div>
      </div>
      <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 sm:py-20">
        <h2
          id="about-heading"
          className="font-serif text-3xl font-semibold text-ds-text [text-wrap:balance] sm:text-4xl"
        >
          About {site.name}
        </h2>
        <div className="mt-8 space-y-5 text-ds-muted">
          {aboutParagraphs.map((p, i) => (
            <Reveal key={i}>
              <p
                className="[text-wrap:pretty]"
                dangerouslySetInnerHTML={{ __html: renderSimpleMarkdown(p) }}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
