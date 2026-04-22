/** Main site copy, links, and configuration. */
export const site = {
  title: "David Smyers | Author, musician, teacher",
  description:
    "Author, pianist, and teacher: memoir, music, and spiritual work — including The Hustler’s Handbook, plus a new book on the way.",
  name: "David Smyers",
  /** General region; confirm for public legal copy if required. */
  location: "Arizona",
  tagline: "From street life to spiritual wisdom",
  subline:
    "Interweaving narrative prose and metric verse in writing that moves from the street to the spirit — and matching that range in his life as a pianist and teacher.",
  launchBadge: "New book — coming soon",
  coverImage: {
    src: "/hustlers-handbook-cover.png",
    alt: "Book cover: The Hustler’s Handbook by David D. Smyers, with a vintage black-and-white group photo on the lower half.",
  },
  contact: {
    email: "hello@davidsmyers.com",
  },
  links: {
    hustlersHandbookAmazon: "https://a.co/d/08HZVk3h",
    olivePress: "https://olivepressbooks.com",
  },
} as const

export const introContent = {
  authorLead: "The author of",
  priorTitle: "The Hustler’s Handbook",
  /** 2–3 sentences for the load screen. `detail` + `detailClosing` — closing line is shown on its own row in the intro. */
  detail:
    "A memoir in prose and metric verse, rooted in 1950s street life—now also a lifelong pianist, teacher, and composer. His writing moves from the street to the spirit.",
  detailClosing: "A new book is on the way.",
  enterSiteLabel: "Enter the site",
  enterSiteAriaLabel: "Enter the main site and close this introduction",
  preOrderLabel: "Pre-order",
  preOrderAriaLabel: "Pre-order the upcoming book and go to the main site",
  /** Shown with the small amazon wordmark + smile in the button. */
  buyOnAmazonLabel: "Buy on",
  buyOnAmazonAriaLabel: "Buy on Amazon: The Hustler’s Handbook (opens in a new tab)",
} as const

export const aboutParagraphs: string[] = [
  "David Smyers is an author, pianist, and teacher. *The Hustler’s Handbook* (1999) remains his best-known book: a memoir in prose and metric verse, grounded in 1950s street life. More recent work includes *Spiritual Environmentalism: Healing Gems* and other books published in spiritual and self-help categories — check the Books section for what is in print and where to buy.",
  "He blends story with metric verse: narrative and rhythm together. In music, he is known in his own material for attention to the Aeolian mode and to classical and modal craft in composition.",
  "He is based in Arizona, with writing and music that sit at the crossroads of lived experience, craft, and spirit.",
]

export type BookItem = {
  id: string
  title: string
  year?: string
  blurb: string
  ctaLabel: string
  ctaUrl: string
  ctaExternal: boolean
  status?: "available" | "comingSoon"
  publisher?: string
}

export const books: BookItem[] = [
  {
    id: "hustlers",
    title: "The Hustler’s Handbook",
    year: "1999",
    blurb:
      "Autobiography and memoir: street narrative meets metric verse — a raw, humane account of the 1950s and a path toward spiritual awakening. His best-known work.",
    ctaLabel: "View on Amazon",
    ctaUrl: site.links.hustlersHandbookAmazon,
    ctaExternal: true,
    status: "available",
  },
  {
    id: "healing-gems",
    title: "Spiritual Environmentalism: Healing Gems",
    year: "2020",
    publisher: "Olive Press Inc.",
    blurb:
      "A short spiritual work from Olive Press (2020), described by the publisher in faith-adjacent terms. See the seller page for the current product description, formats, and reviews. Kindle and audio editions have appeared; confirm availability on Amazon or the publisher’s site.",
    ctaLabel: "Olive Press",
    ctaUrl: site.links.olivePress,
    ctaExternal: true,
    status: "available",
  },
  {
    id: "regeneration",
    title: "Regeneration",
    blurb:
      "A practical philosophy of youth and vitality through daily nutrition and lifestyle — aging as something we meet with intention, not resignation.",
    ctaLabel: "Ask about this title",
    ctaUrl: "#contact",
    ctaExternal: false,
    status: "available",
  },
  {
    id: "youth-golden",
    title: "Youth Offender’s Golden Rules of Guidance",
    blurb: "A life-skills guide offering structure and hope for young readers navigating difficulty.",
    ctaLabel: "Ask about this title",
    ctaUrl: "#contact",
    ctaExternal: false,
    status: "available",
  },
  {
    id: "elders",
    title: "Honoring Our Elders",
    blurb: "A respectful, wisdom-focused work on learning from those who came before us.",
    ctaLabel: "Ask about this title",
    ctaUrl: "#contact",
    ctaExternal: false,
    status: "available",
  },
  {
    id: "upcoming",
    title: "Forthcoming book",
    blurb:
      "A new work is in preparation. The final title, cover, and how to pre-order or buy will be announced in due course.",
    ctaLabel: "Pre-order",
    ctaUrl: "demo:upcoming",
    ctaExternal: false,
    status: "comingSoon",
  },
]

export const musicContent = {
  title: "Music & the Aeolian mode",
  body: [
    "He works as a pianist and composer. Public listings sometimes associate the names *On the Other Side* (or similar titling) and *Postcolonial Song (Homage to Percy Grainger)* with his catalog — direct links to official artist and release pages on each service can sit in this area.",
    "In interviews and his own material, the Aeolian mode has been part of how he talks about music and form. Titles, credits, and audio should always be taken from the store or label at the time of use.",
  ],
  onApple: "On Apple Music",
  onSpotify: "On Spotify",
  onYouTube: "On YouTube",
  platformNote:
    "Full links to Apple Music, Spotify, and YouTube will appear here once official artist and release URLs are set.",
} as const

export const contactContent = {
  intro:
    "For book and appearance inquiries, write to the address below. For news and new releases, use the sign-up to the right.",
} as const
