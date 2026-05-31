import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// base "/bracketkit/" for GitHub Pages project site (hrmasss.github.io/bracketkit).
// Switch to "/" if a custom apex domain (e.g. bracketkit.hojayfa.dev) is used.
export default defineConfig({
  base: process.env.PAGES_BASE ?? "/bracketkit/",
  plugins: [react()],
})
