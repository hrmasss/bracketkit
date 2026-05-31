import * as React from "react"

/** Minimal shape a match must have — anything else is yours, surfaced back in `renderMatch`. */
export interface BracketMatch {
  id: string | number
}

/** One column of the bracket. `matches` should be ordered top-to-bottom. */
export interface BracketRound<TMatch extends BracketMatch = BracketMatch> {
  id: string | number
  /** Optional column heading (e.g. "Round of 16"). Renders a header row when any round has one. */
  name?: React.ReactNode
  matches: TMatch[]
}

export interface BracketMatchContext {
  roundIndex: number
  matchIndex: number
  isFirstRound: boolean
  isLastRound: boolean
}

export interface BracketProps<TMatch extends BracketMatch>
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  /** Rounds left-to-right. Each round normally has half the matches of the previous one. */
  rounds: BracketRound<TMatch>[]
  /** Render your own match card. bracketkit owns layout + connectors; you own the card. */
  renderMatch: (match: TMatch, ctx: BracketMatchContext) => React.ReactNode
  /** Optional custom column header. Defaults to `round.name`. */
  renderRoundHeader?: (
    round: BracketRound<TMatch>,
    roundIndex: number
  ) => React.ReactNode
  /** Width of a match card column, px. Default `220`. */
  matchWidth?: number
  /** Width of the connector gutter between rounds, px. Default `48`. */
  connectorWidth?: number
  /** Minimum vertical gap between sibling matches, px. Default `12`. */
  matchGap?: number
}

const CONNECTOR_COLOR = "var(--bracket-connector-color, currentColor)"
const CONNECTOR_WIDTH = "var(--bracket-connector-width, 1.5px)"

/**
 * A headless, pure-CSS tournament bracket.
 *
 * Unlike SVG-based bracket libraries, bracketkit positions every match with plain
 * flexbox + a couple of absolutely-positioned lines — so it renders identically on
 * every engine, including Safari/WebKit (WKWebView, Capacitor, iOS/macOS), where
 * SVG `foreignObject` x/y and transforms are ignored and matches collapse to 0,0.
 *
 * Layout: each round is a flex column whose matches share equal `flex: 1` slots, so
 * a round's match centers exactly on the midpoint of its two feeders (the feeders
 * sit at 25% / 75% of the merged slot). Connector elbows are drawn at those same
 * percentages, so the tree stays aligned at any height with no JS measurement.
 */
export function Bracket<TMatch extends BracketMatch>({
  rounds,
  renderMatch,
  renderRoundHeader,
  matchWidth = 220,
  connectorWidth = 48,
  matchGap = 12,
  style,
  ...rest
}: BracketProps<TMatch>) {
  const showHeaders =
    typeof renderRoundHeader === "function" ||
    rounds.some((round) => round.name != null)

  return (
    <div
      data-bracket-root=""
      style={{ display: "flex", alignItems: "stretch", ...style }}
      {...rest}
    >
      {rounds.map((round, roundIndex) => {
        const isFirstRound = roundIndex === 0
        const isLastRound = roundIndex === rounds.length - 1
        const gutter = isFirstRound ? 0 : connectorWidth
        return (
          <div
            data-bracket-round=""
            data-round-index={roundIndex}
            key={round.id}
            style={{
              display: "flex",
              flexDirection: "column",
              flexShrink: 0,
              width: matchWidth + gutter,
            }}
          >
            {showHeaders ? (
              <div
                data-bracket-round-header=""
                style={{ flexShrink: 0, marginLeft: gutter }}
              >
                {renderRoundHeader
                  ? renderRoundHeader(round, roundIndex)
                  : round.name}
              </div>
            ) : null}
            <div
              data-bracket-round-body=""
              style={{ display: "flex", flex: 1, flexDirection: "column" }}
            >
              {round.matches.map((match, matchIndex) => (
                <div
                  data-bracket-match-slot=""
                  key={match.id}
                  style={{
                    position: "relative",
                    display: "flex",
                    flex: 1,
                    alignItems: "center",
                    paddingLeft: gutter,
                    paddingTop: matchGap / 2,
                    paddingBottom: matchGap / 2,
                  }}
                >
                  {isFirstRound ? null : <Connector width={connectorWidth} />}
                  <div data-bracket-match="" style={{ width: matchWidth }}>
                    {renderMatch(match, {
                      roundIndex,
                      matchIndex,
                      isFirstRound,
                      isLastRound,
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}

/**
 * Connector elbow drawn in the left gutter of a (non-first-round) match slot. The
 * two feeder matches sit at 25% / 75% of this slot's height; the match itself at
 * 50%. Lines are plain bordered spans — no SVG — so WebKit places them correctly.
 */
function Connector({ width }: { width: number }) {
  const mid = width / 2
  const stub = { borderTop: `${CONNECTOR_WIDTH} solid ${CONNECTOR_COLOR}` } as const
  return (
    <div
      aria-hidden="true"
      data-bracket-connector=""
      style={{ position: "absolute", left: 0, top: 0, bottom: 0, width }}
    >
      <span style={{ position: "absolute", left: 0, top: "25%", width: mid, ...stub }} />
      <span style={{ position: "absolute", left: 0, top: "75%", width: mid, ...stub }} />
      <span
        style={{
          position: "absolute",
          left: mid,
          top: "25%",
          height: "50%",
          borderLeft: `${CONNECTOR_WIDTH} solid ${CONNECTOR_COLOR}`,
        }}
      />
      <span style={{ position: "absolute", left: mid, top: "50%", width: width - mid, ...stub }} />
    </div>
  )
}
