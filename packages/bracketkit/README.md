<div align="center">

# bracketkit

**A headless, pure-CSS tournament bracket for React that actually renders in Safari.**

No SVG. No `foreignObject`. No runtime dependencies. ~4&nbsp;KB. SSR-safe. Style it any way you like.

[![npm](https://img.shields.io/npm/v/bracketkit?color=6c5ce7&label=npm)](https://www.npmjs.com/package/bracketkit)
[![min+gzip](https://img.shields.io/badge/min%2Bgzip-~4%20kB-22c55e)](https://bundlephobia.com/package/bracketkit)
[![TypeScript](https://img.shields.io/badge/TypeScript-ready-3178c6)](https://www.npmjs.com/package/bracketkit)
[![license: MIT](https://img.shields.io/badge/license-MIT-blue)](./LICENSE)

**[🔗 Live demo & docs](https://hrmasss.github.io/bracketkit/)**

</div>

## The problem

If you've used an SVG-based React bracket library (like `@g-loot/react-tournament-brackets` or `react-tournament-bracket`), you've probably hit this in **Safari, iOS, or a WebView**:

> The bracket renders fine in Chrome, but in **Safari every match stacks at the top-left (0,0)**, piled on top of the round headers.

This is a long-standing **WebKit bug**: SVG `<foreignObject>` ignores its `x`/`y` attributes (and `transform`) and positions content relative to the *top* `<svg>` instead of itself. Libraries that lay matches out as nested `<svg>`/`<foreignObject>` therefore collapse to the origin on WebKit — which breaks brackets in **Safari, iOS Safari, WKWebView, Capacitor/Cordova apps, and Electron-on-WebKit**.

There is no CSS workaround for the SVG approach — `x`, `y`, and `transform` are all ignored on `foreignObject` in Safari.

**bracketkit doesn't use SVG at all.** It lays the bracket out with plain flexbox and a few bordered `<div>`s, so it renders pixel-identically on every engine — Chromium, Firefox, *and* WebKit.

## Why bracketkit

- 🧩 **Headless** — bracketkit owns the layout + connector lines; *you* render the match card. No theme objects to fight, no design lock-in.
- 🍏 **Works everywhere** — pure CSS (flexbox + bordered divs). Renders correctly in Safari/iOS/WKWebView/Capacitor where SVG brackets break.
- 🪶 **Tiny & zero-dependency** — ~4&nbsp;KB min+gzip, `react` as the only peer dependency. ESM + CJS + first-class types.
- ⚡ **SSR-safe** — no `useLayoutEffect` measurement, no `window` access; the tree is correct on the first server render.
- 🎨 **Style any way** — plain CSS, CSS variables, Tailwind, or the drop-in **shadcn/ui** component.
- 📐 **Auto-aligned** — a round's match always centers on the midpoint of its two feeders, at any size, with no JavaScript measuring.

## Comparison

| | **bracketkit** | @g-loot/react-tournament-brackets | react-tournament-bracket | react-brackets |
|---|:---:|:---:|:---:|:---:|
| Renders correctly in **Safari/WebKit** | ✅ | ❌ (`foreignObject` bug) | ❌ (SVG) | ✅ (CSS) |
| Rendering tech | CSS/flexbox | SVG | SVG | CSS |
| **Headless** (bring your own card) | ✅ | ❌ | ❌ | ⚠️ partial |
| Runtime dependencies | **0** | several | several | a few |
| Approx. size (min+gzip) | **~4 KB** | ~30 KB+ | ~15 KB+ | ~10 KB+ |
| SSR-safe | ✅ | ⚠️ | ⚠️ | ✅ |
| Styling | CSS vars / Tailwind / shadcn | theme object | inline | own CSS |
| TypeScript types | ✅ | ✅ | ✅ | ⚠️ |

> Honest note: `react-brackets` is also CSS-based and renders fine in Safari — bracketkit's edge there is being **headless, zero-dependency, smaller, and unopinionated about styling.**

## Install

```bash
npm i bracketkit
# or: pnpm add bracketkit / yarn add bracketkit / bun add bracketkit
```

Prefer the **shadcn/ui** workflow? Install a styled, copy-into-your-repo component (you own the code):

```bash
npx shadcn@latest add https://hrmasss.github.io/bracketkit/r/bracket.json
```

## Quick start

```tsx
import { Bracket, type BracketRound } from "bracketkit"

type Team = { name: string; score?: number; won?: boolean }
type Match = { id: string; home: Team; away: Team }

const rounds: BracketRound<Match>[] = [
  {
    id: "qf",
    name: "Quarter-finals",
    matches: [
      { id: "qf1", home: { name: "Lions", score: 2, won: true }, away: { name: "Bears", score: 1 } },
      { id: "qf2", home: { name: "Wolves", score: 0 }, away: { name: "Hawks", score: 3, won: true } },
      // ...
    ],
  },
  { id: "sf", name: "Semi-finals", matches: [/* half as many */] },
  { id: "f", name: "Final", matches: [/* one */] },
]

export function Playoffs() {
  return (
    <div style={{ overflowX: "auto", color: "#cbd5e1" /* sets connector color */ }}>
      <Bracket
        rounds={rounds}
        renderRoundHeader={(r) => <h3>{r.name}</h3>}
        renderMatch={(m) => (
          <div className="my-card">
            <Row team={m.home} />
            <Row team={m.away} />
          </div>
        )}
      />
    </div>
  )
}
```

That's it — bracketkit positions everything; your `renderMatch` controls how a match looks.

## Theming

bracketkit ships **no visual styling** beyond the structural layout. Connectors inherit `currentColor` by default and expose two CSS variables:

```css
[data-bracket-root] {
  --bracket-connector-color: #475569;
  --bracket-connector-width: 2px;
}
```

Every part also has a stable `data-*` attribute for styling hooks:
`data-bracket-root`, `data-bracket-round`, `data-bracket-round-header`,
`data-bracket-round-body`, `data-bracket-match-slot`, `data-bracket-match`,
`data-bracket-connector` (plus `data-round-index`).

## API

### `<Bracket rounds renderMatch />`

| Prop | Type | Default | Description |
|---|---|---|---|
| `rounds` | `BracketRound<TMatch>[]` | — | Rounds left-to-right; each normally has half the matches of the previous. |
| `renderMatch` | `(match, ctx) => ReactNode` | — | Renders your match card. `ctx` = `{ roundIndex, matchIndex, isFirstRound, isLastRound }`. |
| `renderRoundHeader` | `(round, i) => ReactNode` | `round.name` | Optional column header. |
| `matchWidth` | `number` | `220` | Match column width (px). |
| `connectorWidth` | `number` | `48` | Connector gutter width (px). |
| `matchGap` | `number` | `12` | Minimum vertical gap between matches (px). |

All other `div` props (`className`, `style`, …) pass through to the root.

## How it works

Each round is a flex column whose matches share equal `flex: 1` slots. Because a round has half the matches of the previous one, each match's slot spans exactly two feeder slots — so the two feeders land at **25%** and **75%** of the slot and the match itself at **50%**. The connector elbow is drawn at those same percentages with absolutely-positioned bordered `<div>`s. The maths is exact at any height, needs zero measurement, and uses no SVG — which is why it survives WebKit.

## FAQ

**Why does my React tournament bracket render at 0,0 / stacked in Safari?**
Your library positions matches with SVG `<foreignObject>`, whose `x`/`y`/`transform` Safari ignores. Switch to a CSS-based bracket like bracketkit, or stop relying on `foreignObject` positioning.

**Does it work with Next.js / SSR / React Server Components?**
Yes — it's `"use client"`-free at the layout level and does no DOM measurement, so the markup is correct on the server.

**Does it work in Capacitor / Cordova / Electron / iOS WKWebView?**
Yes — that's the whole point. Those are WebKit, where SVG brackets break and bracketkit doesn't.

**Single or double elimination?**
Single-elimination today. Double-elimination, third-place, and byes are on the roadmap.

**Can I use it without Tailwind?**
Yes — bracketkit is unstyled. Use plain CSS, CSS variables, Tailwind, or the shadcn component — your choice.

## Roadmap

- Double-elimination & third-place playoff
- Bye / uneven-round handling
- Right-to-left and top-to-bottom orientations
- Animated connector + match focus states

## License

[MIT](./LICENSE) © [hrmasss](https://github.com/hrmasss)
