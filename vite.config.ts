import { defineConfig, loadEnv, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

/**
 * Injects public URL for Open Graph / iMessage link previews. Set
 * VITE_PUBLIC_SITE_URL in the deploy environment (e.g. https://www.example.com,
 * no trailing slash).
 */
function siteLinkPreviewHtml(publicSite: string, coverPath: string): Plugin {
  return {
    name: "site-link-preview-html",
    transformIndexHtml(template) {
      const base = publicSite.replace(/\/$/, "")
      const image = base ? `${base}${coverPath}` : coverPath
      return template
        .replace(
          /    __CANONICAL_LINE__\n/,
          base ? `    <link rel="canonical" href="${base}/" />\n` : "",
        )
        .replace(
          /    __OG_URL_LINE__\n/,
          base ? `    <meta property="og:url" content="${base}/" />\n` : "",
        )
        .replace(/__OG_IMAGE__/g, image)
    },
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "")
  const publicSite = env.VITE_PUBLIC_SITE_URL ?? ""

  return {
    plugins: [
      react(),
      tailwindcss(),
      siteLinkPreviewHtml(publicSite, "/hustlers-handbook-cover.png"),
    ],
  }
})
