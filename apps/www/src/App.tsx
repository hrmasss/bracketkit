import { Demo } from "./demo"
import { CodeBlock, InstallTabs, Section } from "./ui"

const REPO = "https://github.com/hrmasss/bracketkit"
const NPM = "https://www.npmjs.com/package/bracketkit"
const REGISTRY = "https://hrmasss.github.io/bracketkit/r/bracket.json"

const libInstall = {
  pnpm: "pnpm add bracketkit",
  npm: "npm install bracketkit",
  yarn: "yarn add bracketkit",
  bun: "bun add bracketkit",
}

const shadcnInstall = {
  pnpm: `pnpm dlx shadcn@latest add ${REGISTRY}`,
  npm: `npx shadcn@latest add ${REGISTRY}`,
  yarn: `yarn dlx shadcn@latest add ${REGISTRY}`,
  bun: `bunx --bun shadcn@latest add ${REGISTRY}`,
}

const quickstart = `import { Bracket, type BracketRound } from "bracketkit"

type Match = {
  id: string
  home: string
  away: string
  homeScore?: number
  awayScore?: number
}

const rounds: BracketRound<Match>[] = [
  {
    id: "sf",
    name: "Semi-finals",
    matches: [
      { id: "sf1", home: "Lions", away: "Bears", homeScore: 2, awayScore: 1 },
      { id: "sf2", home: "Hawks", away: "Wolves", homeScore: 0, awayScore: 3 },
    ],
  },
  { id: "f", name: "Final", matches: [{ id: "f1", home: "Lions", away: "Wolves" }] },
]

export function Playoffs() {
  return (
    // any scroll container; \`color\` sets the connector color by default
    <div style={{ overflowX: "auto", color: "#64748b" }}>
      <Bracket
        rounds={rounds}
        renderRoundHeader={(round) => <h3>{round.name}</h3>}
        renderMatch={(m) => (
          <div className="match-card">
            <div>{m.home} — {m.homeScore ?? "–"}</div>
            <div>{m.away} — {m.awayScore ?? "–"}</div>
          </div>
        )}
      />
    </div>
  )
}`

const themingCode = `/* Connectors inherit currentColor; override with two CSS variables */
[data-bracket-root] {
  --bracket-connector-color: #64748b;
  --bracket-connector-width: 2px;
}

/* Every part has a stable data-attribute hook */
[data-bracket-round-header] { font-weight: 700; }
[data-bracket-match-slot]   { /* spacing, etc. */ }
[data-bracket-match]        { /* your card wrapper */ }`

function Pill({ children }: { children: React.ReactNode }) {
  return <span className="pill">{children}</span>
}

const features = [
  { t: "Works in Safari & WebKit", d: "Pure flexbox + bordered divs. No SVG, no foreignObject — so it renders correctly in Safari, iOS, WKWebView, Capacitor and Electron, where SVG brackets collapse to 0,0." },
  { t: "Truly headless", d: "bracketkit owns layout + connectors; you render the match card. No theme objects, no design lock-in — bring your own markup and styles." },
  { t: "Tiny & zero-dependency", d: "~4 KB min+gzip with react as the only peer dependency. Ships ESM, CJS and first-class TypeScript types." },
  { t: "SSR-safe", d: "No layout measurement, no window access. The tree is correct on the very first server render — perfect for Next.js and RSC." },
  { t: "Auto-aligned at any size", d: "A round's match always centers on the midpoint of its two feeders, computed with pure CSS — no JavaScript measuring or resizing." },
  { t: "Style it your way", d: "Plain CSS, CSS variables, Tailwind, or the drop-in shadcn/ui component. Theme connectors with two CSS variables." },
]

const comparison = [
  ["Renders correctly in Safari/WebKit", "Yes", "No — foreignObject bug", "No — SVG", "Yes — CSS"],
  ["Rendering technique", "CSS / flexbox", "SVG", "SVG", "CSS"],
  ["Headless (bring your own card)", "Yes", "No", "No", "Partial"],
  ["Runtime dependencies", "0", "several", "several", "a few"],
  ["Size (min+gzip)", "~4 KB", "~30 KB+", "~15 KB+", "~10 KB+"],
  ["SSR-safe", "Yes", "Partial", "Partial", "Yes"],
  ["TypeScript types", "First-class", "Yes", "Yes", "Partial"],
]

const props = [
  ["rounds", "BracketRound<TMatch>[]", "—", "Rounds left-to-right; each normally has half the matches of the previous."],
  ["renderMatch", "(match, ctx) => ReactNode", "—", "Renders your match card. ctx = { roundIndex, matchIndex, isFirstRound, isLastRound }."],
  ["renderRoundHeader", "(round, i) => ReactNode", "round.name", "Optional column header."],
  ["matchWidth", "number", "220", "Match column width (px)."],
  ["connectorWidth", "number", "48", "Connector gutter width (px)."],
  ["matchGap", "number", "12", "Minimum vertical gap between matches (px)."],
]

const faqs = [
  ["Why does my React tournament bracket render at 0,0 / stacked in Safari?", "Your library positions matches with SVG <foreignObject>, whose x/y and transform Safari ignores — content is placed relative to the top <svg> instead, so every match collapses to the origin. bracketkit uses no SVG, so it renders correctly everywhere."],
  ["Does it work with Next.js, SSR or React Server Components?", "Yes. There's no DOM measurement and no window access, so the markup is correct on the first server render."],
  ["Does it work in Capacitor, Cordova, Electron or iOS WKWebView?", "Yes — that's the whole point. Those are WebKit, where SVG brackets break and bracketkit doesn't."],
  ["Single or double elimination?", "Single-elimination today. Double-elimination, third-place and byes are on the roadmap."],
  ["Do I need Tailwind?", "No. bracketkit is unstyled — use plain CSS, CSS variables, Tailwind, or the shadcn component. Your choice."],
]

export function App() {
  return (
    <div className="app">
      <header className="nav">
        <a className="brand" href="#top">
          bracket<span>kit</span>
        </a>
        <nav className="nav-links">
          <a href="#docs">Docs</a>
          <a href="#demo">Demo</a>
          <a href={NPM} rel="noreferrer" target="_blank">npm</a>
          <a className="nav-cta" href={REPO} rel="noreferrer" target="_blank">
            GitHub ↗
          </a>
        </nav>
      </header>

      <main className="container" id="top">
        <section className="hero">
          <div className="pills">
            <Pill>🍏 Works in Safari</Pill>
            <Pill>No SVG · no foreignObject</Pill>
            <Pill>~4&nbsp;KB · zero-dep</Pill>
          </div>
          <h1>
            The React tournament bracket
            <br />
            that <span className="grad">actually renders in Safari.</span>
          </h1>
          <p className="lede">
            A headless, pure-CSS bracket for React. SVG bracket libraries break in
            Safari, iOS and WebViews — every match stacks at the top-left.{" "}
            <strong>bracketkit</strong> uses plain flexbox, so it renders pixel-perfect
            on every engine. Bring your own card; style it any way you like.
          </p>
          <div className="hero-install">
            <InstallTabs commands={libInstall} />
          </div>
          <div className="hero-actions">
            <a className="btn btn-primary" href="#demo">View the demo</a>
            <a className="btn btn-ghost" href={REPO} rel="noreferrer" target="_blank">
              Star on GitHub
            </a>
          </div>
        </section>

        <section className="demo-wrap" id="demo">
          <Demo />
          <p className="demo-caption">
            A finished 16-team bracket, rendered with bracketkit + a ~30-line custom
            card. No SVG anywhere — resize it, ship it to iOS, it just works.
          </p>
        </section>

        <section className="features">
          {features.map((f) => (
            <div className="feature" key={f.t}>
              <h3>{f.t}</h3>
              <p>{f.d}</p>
            </div>
          ))}
        </section>

        <Section eyebrow="The problem" id="docs" title="Why SVG brackets break in Safari">
          <p className="prose">
            SVG-based bracket libraries lay each match out inside a nested{" "}
            <code>&lt;foreignObject&gt;</code>. WebKit has a long-standing bug: it
            ignores <code>x</code>, <code>y</code> and <code>transform</code> on{" "}
            <code>foreignObject</code> and positions content relative to the{" "}
            <em>top</em> <code>&lt;svg&gt;</code>. The result — fine in Chrome, but in{" "}
            <strong>Safari, iOS Safari, WKWebView, Capacitor and Electron</strong> every
            match piles up at the top-left corner. There is no CSS workaround for the
            SVG approach. bracketkit sidesteps it entirely: flexbox columns with equal{" "}
            <code>flex: 1</code> slots place each match on its feeders' midpoint, and a
            few bordered <code>&lt;div&gt;</code>s draw the connectors — identical on
            Chromium, Firefox and WebKit.
          </p>
        </Section>

        <Section eyebrow="Comparison" title="bracketkit vs. the alternatives">
          <div className="table-wrap">
            <table className="cmp">
              <thead>
                <tr>
                  <th />
                  <th className="hi">bracketkit</th>
                  <th>@g-loot/<br />react-tournament-brackets</th>
                  <th>react-tournament-bracket</th>
                  <th>react-brackets</th>
                </tr>
              </thead>
              <tbody>
                {comparison.map((row) => (
                  <tr key={row[0]}>
                    {row.map((cell, i) => (
                      <td className={i === 1 ? "hi" : ""} key={i}>
                        {i === 0 ? <strong>{cell}</strong> : cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="footnote">
            <code>react-brackets</code> is also CSS-based and renders fine in Safari —
            bracketkit's edge there is being headless, zero-dependency, smaller and
            unopinionated about styling.
          </p>
        </Section>

        <Section eyebrow="Get started" title="Use the headless library">
          <p className="prose">
            Install the package and render a <code>&lt;Bracket&gt;</code>. You provide
            the data and the match card; bracketkit handles layout and connectors.
          </p>
          <InstallTabs commands={libInstall} />
          <CodeBlock code={quickstart} lang="tsx" />
        </Section>

        <Section eyebrow="shadcn/ui" title="Or drop in the styled component">
          <p className="prose">
            Prefer shadcn? Install a styled, batteries-included bracket straight into
            your project — you own the code, and it's built on the headless primitive.
          </p>
          <InstallTabs commands={shadcnInstall} />
          <p className="footnote">
            Adds a themeable <code>&lt;Bracket&gt;</code> with a match card using your
            shadcn tokens (border, card, muted, primary) plus winner highlighting.
          </p>
        </Section>

        <Section eyebrow="Theming" title="Style every part">
          <p className="prose">
            bracketkit ships no visual styling beyond layout. Connectors inherit{" "}
            <code>currentColor</code> and expose two CSS variables; every part has a
            stable <code>data-*</code> hook.
          </p>
          <CodeBlock code={themingCode} lang="css" />
        </Section>

        <Section eyebrow="API" title="<Bracket /> props">
          <div className="table-wrap">
            <table className="api">
              <thead>
                <tr>
                  <th>Prop</th>
                  <th>Type</th>
                  <th>Default</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {props.map((p) => (
                  <tr key={p[0]}>
                    <td><code>{p[0]}</code></td>
                    <td><code className="ty">{p[1]}</code></td>
                    <td><code>{p[2]}</code></td>
                    <td>{p[3]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        <Section eyebrow="FAQ" title="Frequently asked">
          <div className="faq">
            {faqs.map(([q, a]) => (
              <details key={q}>
                <summary>{q}</summary>
                <p>{a}</p>
              </details>
            ))}
          </div>
        </Section>
      </main>

      <footer className="footer">
        <div className="container footer-inner">
          <span>
            bracket<span className="grad">kit</span>
          </span>
          <span className="footer-links">
            <a href={REPO} rel="noreferrer" target="_blank">GitHub</a>
            <a href={NPM} rel="noreferrer" target="_blank">npm</a>
            <a href={`${REPO}/blob/main/LICENSE`} rel="noreferrer" target="_blank">MIT</a>
          </span>
          <span className="footer-by">
            Built by{" "}
            <a href="https://github.com/hrmasss" rel="noreferrer" target="_blank">
              hrmasss
            </a>
          </span>
        </div>
      </footer>
    </div>
  )
}
