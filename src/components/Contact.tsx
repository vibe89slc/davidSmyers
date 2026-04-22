import { useState, type FormEvent } from "react"
import { contactContent, site } from "../content/siteContent"
import { Reveal } from "./Reveal"

export function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const mailto = `mailto:${site.contact.email}?subject=${encodeURIComponent("Inquiry from website")}`

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section id="contact" aria-labelledby="contact-heading" className="border-b border-ds-border/60">
      <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 sm:py-20">
        <h2
          id="contact-heading"
          className="font-serif text-3xl font-semibold [text-wrap:balance] sm:text-4xl"
        >
          Contact & newsletter
        </h2>
        <p className="mt-3 max-w-2xl text-ds-muted [text-wrap:pretty]">{contactContent.intro}</p>
        <div className="mt-10 grid gap-10 lg:grid-cols-2">
          <Reveal>
            <div>
              <h3 className="text-lg font-semibold text-ds-gold">Direct</h3>
              <p className="mt-2 text-ds-muted">
                <a href={mailto} className="text-ds-text underline decoration-ds-gold/50 underline-offset-2 hover:decoration-ds-gold">
                  {site.contact.email}
                </a>
              </p>
              <p className="mt-2 text-sm text-ds-muted">{site.location}</p>
            </div>
          </Reveal>
          <Reveal>
            <div>
              <h3 className="text-lg font-semibold text-ds-gold">Newsletter</h3>
              <p className="mt-2 text-sm text-ds-muted">Occasional news on new books, essays, and events.</p>
              {submitted ? (
                <p
                  className="mt-4 rounded-md border border-ds-jade/40 bg-ds-jade/15 px-4 py-3 text-ds-text"
                  role="status"
                >
                  Thank you — you’re on the list.
                </p>
              ) : (
                <form className="mt-4 space-y-3" onSubmit={onSubmit} noValidate>
                  <div>
                    <label htmlFor="newsletter-email" className="block text-sm font-medium text-ds-text">
                      Email
                    </label>
                    <input
                      id="newsletter-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="Email address"
                      className="mt-1 w-full min-h-[48px] rounded-md border border-ds-border bg-ds-elevated px-3 text-ds-text placeholder:text-ds-muted/70"
                    />
                  </div>
                  <button
                    type="submit"
                    className="inline-flex min-h-[48px] min-w-[48px] items-center justify-center rounded-md border border-ds-gold/60 bg-ds-surface/80 px-4 py-2 text-sm font-semibold text-ds-gold transition hover:bg-ds-gold/10"
                    aria-label="Sign up for the newsletter"
                  >
                    Sign up
                  </button>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
