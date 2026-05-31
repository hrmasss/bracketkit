import { useCallback, useState } from "react"

function useCopy() {
  const [copied, setCopied] = useState(false)
  const copy = useCallback((text: string) => {
    void navigator.clipboard?.writeText(text).then(() => {
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1600)
    })
  }, [])
  return { copied, copy }
}

function CopyIcon({ copied }: { copied: boolean }) {
  return copied ? (
    <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="9" width="13" height="13" rx="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  )
}

export function CodeBlock({ code, lang }: { code: string; lang?: string }) {
  const { copied, copy } = useCopy()
  return (
    <div className="code">
      {lang ? <span className="code-lang">{lang}</span> : null}
      <button
        aria-label={copied ? "Copied" : "Copy"}
        className="copy-btn"
        onClick={() => copy(code)}
        type="button"
      >
        <CopyIcon copied={copied} />
      </button>
      <pre>
        <code>{code}</code>
      </pre>
    </div>
  )
}

export type PackageManager = "pnpm" | "npm" | "yarn" | "bun"
const ORDER: PackageManager[] = ["pnpm", "npm", "yarn", "bun"]

export function InstallTabs({
  commands,
}: {
  commands: Record<PackageManager, string>
}) {
  const [pm, setPm] = useState<PackageManager>("pnpm")
  const { copied, copy } = useCopy()
  return (
    <div className="install">
      <div className="install-tabs" role="tablist">
        {ORDER.map((key) => (
          <button
            aria-selected={pm === key}
            className={`install-tab${pm === key ? " is-active" : ""}`}
            key={key}
            onClick={() => setPm(key)}
            role="tab"
            type="button"
          >
            {key}
          </button>
        ))}
      </div>
      <div className="install-cmd">
        <span className="prompt">$</span>
        <code>{commands[pm]}</code>
        <button
          aria-label={copied ? "Copied" : "Copy"}
          className="copy-btn"
          onClick={() => copy(commands[pm])}
          type="button"
        >
          <CopyIcon copied={copied} />
        </button>
      </div>
    </div>
  )
}

export function Section({
  id,
  eyebrow,
  title,
  children,
}: {
  id?: string
  eyebrow?: string
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="section" id={id}>
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h2 className="section-title">{title}</h2>
      {children}
    </section>
  )
}
