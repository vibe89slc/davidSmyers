import { books, type BookItem } from "../content/siteContent"
import { renderSimpleMarkdown } from "../lib/markdownish"
import { Reveal } from "./Reveal"

type BooksProps = {
  onUpcomingBookInfo: () => void
}

export function Books({ onUpcomingBookInfo }: BooksProps) {
  return (
    <section id="books" aria-labelledby="books-heading" className="border-b border-ds-border/60">
      <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 sm:py-20">
        <h2
          id="books-heading"
          className="font-serif text-3xl font-semibold [text-wrap:balance] sm:text-4xl"
        >
          Books
        </h2>
        <p className="mt-3 max-w-2xl text-ds-muted [text-wrap:pretty]">
          Memoir, spiritual work, and practical guides — in print, ebook, and audio where
          available.
        </p>
        <ul className="mt-10 grid list-none gap-6 sm:grid-cols-2" role="list">
          {books.map((b) => (
            <li key={b.id} className="h-full min-h-0">
              <Reveal className="h-full">
                <BookCard book={b} onUpcomingBookInfo={onUpcomingBookInfo} />
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function BookCard({ book, onUpcomingBookInfo }: { book: BookItem; onUpcomingBookInfo: () => void }) {
  const isComing = book.status === "comingSoon"
  return (
    <article
      className={`group flex h-full flex-col rounded-lg border p-5 transition ${
        isComing
          ? "border-ds-gold/50 bg-ds-elevated/80 shadow-[0_0_0_1px_rgba(184,149,106,0.2)]"
          : "border-ds-border bg-ds-elevated/60 hover:border-ds-gold/40"
      }`}
    >
      <h3 className="font-serif text-xl font-semibold text-ds-text [text-wrap:balance]">
        {book.title}
        {book.year ? (
          <span className="ml-1 text-base font-normal text-ds-muted">({book.year})</span>
        ) : null}
      </h3>
      {book.publisher ? (
        <p className="mt-1 text-sm text-ds-gold">{book.publisher}</p>
      ) : null}
      <p
        className="mt-3 flex-1 text-ds-muted [text-wrap:pretty]"
        dangerouslySetInnerHTML={{ __html: renderSimpleMarkdown(book.blurb) }}
      />
      <div className="mt-5">
        {book.ctaUrl === "demo:upcoming" ? (
          <button
            type="button"
            onClick={onUpcomingBookInfo}
            className="inline-flex min-h-[44px] w-full min-w-0 items-center justify-center rounded-md border border-ds-gold/70 bg-ds-surface/80 px-4 py-2 text-center text-sm font-semibold text-ds-gold transition group-hover:bg-ds-gold/10"
            aria-label="Pre-order: details for the upcoming book"
          >
            {book.ctaLabel}
          </button>
        ) : book.ctaUrl.startsWith("http://") ||
          book.ctaUrl.startsWith("https://") ||
          book.ctaUrl.startsWith("mailto:") ? (
          <a
            href={book.ctaUrl}
            className="inline-flex min-h-[44px] w-full min-w-0 items-center justify-center rounded-md bg-ds-accent px-4 py-2 text-center text-sm font-semibold text-white transition hover:bg-ds-accent-hover"
            rel={book.ctaExternal ? "noopener noreferrer" : undefined}
            target={book.ctaExternal ? "_blank" : undefined}
          >
            {book.ctaLabel}
          </a>
        ) : (
          <a
            href={book.ctaUrl}
            className="inline-flex min-h-[44px] w-full min-w-0 items-center justify-center rounded-md border border-ds-border bg-ds-surface/80 px-4 py-2 text-center text-sm font-semibold text-ds-text transition hover:border-ds-gold/50"
          >
            {book.ctaLabel}
          </a>
        )}
      </div>
    </article>
  )
}
