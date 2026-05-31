import { Bracket, type BracketRound } from "bracketkit"

type Team = { name: string; seed: number; score?: number } | null
type Match = { id: string; home: Team; away: Team }

const t = (name: string, seed: number, score?: number): Team => ({ name, seed, score })
const mt = (id: string, home: Team, away: Team): Match => ({ id, home, away })

export const demoRounds: BracketRound<Match>[] = [
  {
    id: "r16",
    name: "Round of 16",
    matches: [
      mt("r16-1", t("Falcons", 1, 3), t("Otters", 16, 1)),
      mt("r16-2", t("Pumas", 8, 2), t("Ravens", 9, 0)),
      mt("r16-3", t("Sharks", 5, 1), t("Bisons", 12, 2)),
      mt("r16-4", t("Comets", 4, 4), t("Foxes", 13, 2)),
      mt("r16-5", t("Titans", 6, 2), t("Wolves", 11, 1)),
      mt("r16-6", t("Drakes", 3, 3), t("Hornets", 14, 1)),
      mt("r16-7", t("Lynx", 7, 0), t("Cobras", 10, 2)),
      mt("r16-8", t("Vipers", 2, 5), t("Storm", 15, 0)),
    ],
  },
  {
    id: "qf",
    name: "Quarter-finals",
    matches: [
      mt("qf-1", t("Falcons", 1, 2), t("Pumas", 8, 1)),
      mt("qf-2", t("Bisons", 12, 0), t("Comets", 4, 1)),
      mt("qf-3", t("Titans", 6, 1), t("Drakes", 3, 3)),
      mt("qf-4", t("Cobras", 10, 1), t("Vipers", 2, 2)),
    ],
  },
  {
    id: "sf",
    name: "Semi-finals",
    matches: [
      mt("sf-1", t("Falcons", 1, 2), t("Comets", 4, 0)),
      mt("sf-2", t("Drakes", 3, 1), t("Vipers", 2, 3)),
    ],
  },
  {
    id: "f",
    name: "Final",
    matches: [mt("f-1", t("Falcons", 1, 4), t("Vipers", 2, 2))],
  },
]

function TeamRow({ team, won }: { team: Team; won: boolean }) {
  return (
    <div className={`team${won ? " team--won" : ""}`}>
      <span className="seed">{team?.seed ?? "–"}</span>
      <span className="name">{team?.name ?? "TBD"}</span>
      <span className="score">{team?.score ?? "–"}</span>
    </div>
  )
}

function MatchCard({ match }: { match: Match }) {
  const { home, away } = match
  const hs = home?.score
  const as = away?.score
  const decided = hs != null && as != null
  return (
    <div className="match">
      <TeamRow team={home} won={decided && hs! > as!} />
      <TeamRow team={away} won={decided && as! > hs!} />
    </div>
  )
}

export function Demo() {
  return (
    <div className="board">
      <Bracket
        rounds={demoRounds}
        renderRoundHeader={(r) => <div className="round-header">{r.name}</div>}
        renderMatch={(match: Match) => <MatchCard match={match} />}
        matchWidth={188}
        connectorWidth={36}
      />
    </div>
  )
}
