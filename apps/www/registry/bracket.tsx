"use client"

import { Bracket as BracketKit, type BracketRound } from "bracketkit"

import { cn } from "@/lib/utils"

export type BracketTeam = {
  name: string
  score?: number | string
  winner?: boolean
} | null

export type BracketGame = {
  id: string | number
  home: BracketTeam
  away: BracketTeam
}

function TeamRow({ team }: { team: BracketTeam }) {
  return (
    <div
      className={cn(
        "flex items-center justify-between gap-2 rounded-md px-2 py-1.5 text-sm",
        team?.winner
          ? "bg-primary/10 text-primary font-semibold"
          : "text-foreground"
      )}
    >
      <span className="truncate">{team?.name ?? "TBD"}</span>
      <span className="text-muted-foreground tabular-nums">
        {team?.score ?? "–"}
      </span>
    </div>
  )
}

export function Bracket({
  rounds,
  className,
  ...props
}: {
  rounds: BracketRound<BracketGame>[]
  className?: string
  matchWidth?: number
  connectorWidth?: number
}) {
  return (
    // `text-border` makes the connectors (which inherit currentColor) use your
    // theme's border color. Override with --bracket-connector-color if you like.
    <div className={cn("text-border overflow-x-auto", className)}>
      <BracketKit
        rounds={rounds}
        renderRoundHeader={(round) => (
          <div className="text-muted-foreground bg-muted/50 mb-2 rounded-md py-1 text-center text-xs font-semibold tracking-wide uppercase">
            {round.name}
          </div>
        )}
        renderMatch={(game) => (
          <div className="bg-card rounded-lg border p-1 shadow-sm">
            <TeamRow team={game.home} />
            <TeamRow team={game.away} />
          </div>
        )}
        {...props}
      />
    </div>
  )
}
