// Generates public/r/bracket.json — a shadcn registry item installable with
//   npx shadcn@latest add https://hrmasss.github.io/bracketkit/r/bracket.json
// Run via `pnpm --filter @bracketkit/www registry` (also runs before `build`).
import { mkdirSync, readFileSync, writeFileSync } from "node:fs"
import { dirname, resolve } from "node:path"
import { fileURLToPath } from "node:url"

const here = dirname(fileURLToPath(import.meta.url))
const root = resolve(here, "..")

const content = readFileSync(resolve(root, "registry/bracket.tsx"), "utf8")

const item = {
  $schema: "https://ui.shadcn.com/schema/registry-item.json",
  name: "bracket",
  type: "registry:ui",
  title: "Bracket",
  description:
    "A headless, pure-CSS tournament bracket styled with shadcn tokens. Renders correctly in Safari/WebKit (no SVG) — built on bracketkit.",
  dependencies: ["bracketkit"],
  files: [
    {
      path: "ui/bracket.tsx",
      type: "registry:ui",
      content,
    },
  ],
}

mkdirSync(resolve(root, "public/r"), { recursive: true })
writeFileSync(
  resolve(root, "public/r/bracket.json"),
  JSON.stringify(item, null, 2) + "\n"
)
console.log("wrote public/r/bracket.json")
