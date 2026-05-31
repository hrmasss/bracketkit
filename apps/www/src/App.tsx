import { Bracket, type BracketMatchContext, type BracketRound } from "bracketkit"

type Team = { name: string; seed: number; score?: number } | null
type Match = { id: string; home: Team; away: Team }

function m(
  id: string,
  home: Team,
  away: Team
): Match {
  return { id, home, away }
}

const t = (name: string, seed: number, score?: number): Team => ({ name, seed, score })

// A finished 16-team single-elimination bracket (R16 → Final).
const rounds: BracketRound<Match>[] = [
  {
    id: "r16",
    name: "Round of 16",
    matches: [
      m("r16-1", t("Falcons", 1, 3), t("Otters", 16, 1)),
      m("r16-2", t("Pumas", 8, 2), t("Ravens", 9, 0)),
      m("r16-3", t("Sharks", 5, 1), t("Bisons", 12, 2)),
      m("r16-4", t("Comets", 4, 4), t("Foxes", 13, 2)),
      m("r16-5", t("Titans", 6, 2), t("Wolves", 11, 1)),
      m("r16-6", t("Drakes", 3, 3), t("Hornets", 14, 1)),
      m("r16-7", t("Lynx", 7, 0), t("Cobras", 10, 2)),
      m("r16-8", t("Vipers", 2, 5), t("Storm", 15, 0)),
    ],
  },
  {
    id: "qf",
    name: "Quarter-finals",
    matches: [
      m("qf-1", t("Falcons", 1, 2), t("Pumas", 8, 1)),
      m("qf-2", t("Bisons", 12, 0), t("Comets", 4, 1)),
      m("qf-3", t("Titans", 6, 1), t("Drakes", 3, 3)),
      m("qf-4", t("Cobras", 10, 1), t("Vipers", 2, 2)),
    ],
  },
  {
    id: "sf",
    name: "Semi-finals",
    matches: [
      m("sf-1", t("Falcons", 1, 2), t("Comets", 4, 0)),
      m("sf-2", t("Drakes", 3, 1), t("Vipers", 2, 3)),
    ],
  },
  {
    id: "f",
    name: "Final",
    matches: [m("f-1", t("Falcons", 1, 4), t("Vipers", 2, 2))],
  },
]

function MatchCard({ match }: { match: Match }) {
  const { home, away } = match
  const hs = home?.score
  const as = away?.score
  const decided = hs != null && as != null
  const homeWon = decided && hs! > as!
  const awayWon = decided && as! > hs!
  return (
    <div className="match">
      <TeamRow team={home} won={homeWon} />
      <TeamRow team={away} won={awayWon} />
    </div>
  )
}

function TeamRow({ team, won }: { team: Team; won: boolean }) {
  return (
    <div className={`team${won ? " team--won" : ""}`}>
      <span className="seed">{team?.seed ?? "–"}</span>
      <span className="name">{team?.name ?? "TBD"}</span>
      <span className="score">{team?.score ?? "–"}</span>
    </div>
  )
}

export function App() {
  return (
    <main className="page">
      <header className="hero">
        <h1>
          bracket<span>kit</span>
        </h1>
        <p>
          A headless, pure-CSS React tournament bracket that renders correctly in
          Safari/WebKit. No SVG, no <code>foreignObject</code>, zero dependencies.
        </p>
        <code className="install">npm i bracketkit</code>
      </header>

      <section className="board">
        <Bracket
          rounds={rounds}
          renderRoundHeader={(r) => <div className="round-header">{r.name}</div>}
          renderMatch={(match: Match, _ctx: BracketMatchContext) => (
            <MatchCard match={match} />
          )}
          matchWidth={196}
          connectorWidth={40}
        />
      </section>
    </main>
  )
}
