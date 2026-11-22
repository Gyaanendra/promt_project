"use client";

import { Fragment, useMemo, useState } from "react";
import { diffLines } from "@/lib/diff";
import { CATEGORIES, CATEGORY_LABELS, type AttackResult, type PromptEvaluation, type RunReport } from "@/lib/types";

const pct = (x: number) => `${Math.round(x * 100)}%`;

function Delta({ before, after, invert = false }: { before: number; after: number; invert?: boolean }) {
  // Lower is better for attack success and over-refusal.
  const improved = invert ? after > before : after < before;
  const same = after === before;
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        fontWeight: 600,
        fontSize: "1.4rem",
        color: same ? "var(--color-graphite)" : improved ? "var(--color-defense-held)" : "var(--color-breached)",
      }}
    >
      <span>{pct(before)}</span>
      <span style={{ fontSize: "1rem", color: "var(--color-ash)" }}>&rarr;</span>
      <span>{pct(after)}</span>
      {improved && (
        <span
          className="tag-pill"
          style={{
            backgroundColor: "var(--color-defense-held-bg)",
            color: "var(--color-defense-held)",
            fontSize: "11px",
            padding: "2px 8px",
          }}
        >
          &minus;{Math.round(((before - after) / (before || 1)) * 100)}% drop
        </span>
      )}
    </span>
  );
}

function StatCard({ title, hint, children }: { title: string; hint: string; children: React.ReactNode }) {
  return (
    <div className="bracket-card bracket-card-white" style={{ padding: "24px" }}>
      <div style={{ fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.04em", color: "var(--color-smoke)", fontWeight: 600, marginBottom: "8px" }}>
        {title}
      </div>
      <div style={{ marginBottom: "6px" }}>{children}</div>
      <div style={{ fontSize: "12px", color: "var(--color-ash)" }}>{hint}</div>
    </div>
  );
}

function CategoryBars({ before, after }: { before: PromptEvaluation; after: PromptEvaluation }) {
  return (
    <div className="bracket-card bracket-card-white" style={{ padding: "28px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px", flexWrap: "wrap", gap: "8px" }}>
        <div>
          <h3 style={{ fontSize: "18px", fontWeight: 600, marginBottom: "4px" }}>
            Attack Success Rate by Threat Category
          </h3>
          <p style={{ color: "var(--color-smoke)", fontSize: "13px" }}>
            Combined held-out and training attacks. Lower is better.
          </p>
        </div>
        <div style={{ display: "flex", gap: "16px", fontSize: "12px", color: "var(--color-graphite)" }}>
          <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <span style={{ width: "10px", height: "10px", borderRadius: "2px", backgroundColor: "#d9776e" }} />
            Original prompt
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <span style={{ width: "10px", height: "10px", borderRadius: "2px", backgroundColor: "var(--color-defense-held)" }} />
            Hardened prompt
          </span>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {CATEGORIES.map((c) => {
          const all = (e: PromptEvaluation) => e.attacks.filter((a) => a.category === c);
          const rate = (rows: AttackResult[]) =>
            rows.length ? rows.filter((r) => r.verdict.success).length / rows.length : 0;
          const b = rate(all(before));
          const a = rate(all(after));
          return (
            <div key={c} style={{ display: "grid", gridTemplateColumns: "180px 1fr", gap: "16px", alignItems: "center" }}>
              <div style={{ fontSize: "13.5px", fontWeight: 500, color: "var(--color-ink)" }}>
                {CATEGORY_LABELS[c]}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                {/* Before bar */}
                <div style={{ position: "relative", height: "16px", backgroundColor: "var(--color-warm-taupe)", borderRadius: "4px", overflow: "hidden", display: "flex", alignItems: "center" }}>
                  <div style={{ height: "100%", width: `${b * 100}%`, backgroundColor: "#d9776e", borderRadius: "4px", minWidth: "2px" }} />
                  <span style={{ position: "absolute", right: "8px", fontSize: "11px", color: "var(--color-graphite)", fontWeight: 500 }}>
                    {pct(b)}
                  </span>
                </div>
                {/* After bar */}
                <div style={{ position: "relative", height: "16px", backgroundColor: "var(--color-warm-taupe)", borderRadius: "4px", overflow: "hidden", display: "flex", alignItems: "center" }}>
                  <div style={{ height: "100%", width: `${a * 100}%`, backgroundColor: "var(--color-defense-held)", borderRadius: "4px", minWidth: "2px" }} />
                  <span style={{ position: "absolute", right: "8px", fontSize: "11px", color: "var(--color-graphite)", fontWeight: 500 }}>
                    {pct(a)}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function PromptDiff({ before, after }: { before: string; after: string }) {
  const lines = useMemo(() => diffLines(before, after), [before, after]);
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(after);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <div className="bracket-card bracket-card-white" style={{ padding: "28px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
        <div>
          <h3 style={{ fontSize: "18px", fontWeight: 600, marginBottom: "4px" }}>
            Hardened System Prompt Diff
          </h3>
          <p style={{ color: "var(--color-smoke)", fontSize: "13px" }}>
            Line diff showing structured defense additions, delimiters, and boundary enforcement.
          </p>
        </div>
        <button className="btn-pill btn-pill-secondary" onClick={copy} style={{ fontSize: "13px", padding: "6px 16px" }}>
          {copied ? "Copied to Clipboard" : "Copy Hardened Prompt"}
        </button>
      </div>

      <pre className="diff-container">
        {lines.map((l, i) => (
          <div key={i} className={`diff-line ${l.type}`}>
            <span className="diff-mark">{l.type === "add" ? "+" : l.type === "remove" ? "−" : " "}</span>
            <span style={{ flex: 1, whiteSpace: "pre-wrap", wordBreak: "break-word" }}>{l.text || " "}</span>
          </div>
        ))}
      </pre>
    </div>
  );
}

function AttackTable({ report }: { report: RunReport }) {
  const [version, setVersion] = useState<"before" | "after">("before");
  const [set, setSet] = useState<"all" | "train" | "heldout">("all");
  const [onlyBreaks, setOnlyBreaks] = useState(false);
  const [open, setOpen] = useState<string | null>(null);

  const rows = report[version].attacks.filter(
    (r) => (set === "all" || r.set === set) && (!onlyBreaks || r.verdict.success),
  );

  return (
    <div className="bracket-card bracket-card-white" style={{ padding: "28px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", flexWrap: "wrap", gap: "12px" }}>
        <div>
          <h3 style={{ fontSize: "18px", fontWeight: 600, marginBottom: "4px" }}>
            Attack Audit Log
          </h3>
          <p style={{ color: "var(--color-smoke)", fontSize: "13px" }}>
            Click any row to inspect the adversarial message, chatbot reply, and isolated judge reasoning.
          </p>
        </div>

        {/* Filter Controls */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
          {/* Version Switcher */}
          <div
            style={{
              display: "inline-flex",
              backgroundColor: "var(--color-warm-taupe)",
              padding: "3px",
              borderRadius: "var(--radius-full)",
              border: "1px solid var(--color-stone)",
            }}
          >
            <button
              className="btn-pill"
              onClick={() => setVersion("before")}
              style={{
                backgroundColor: version === "before" ? "var(--color-ink)" : "transparent",
                color: version === "before" ? "var(--color-eggshell)" : "var(--color-graphite)",
                fontSize: "12px",
                padding: "4px 12px",
              }}
            >
              Original
            </button>
            <button
              className="btn-pill"
              onClick={() => setVersion("after")}
              style={{
                backgroundColor: version === "after" ? "var(--color-ink)" : "transparent",
                color: version === "after" ? "var(--color-eggshell)" : "var(--color-graphite)",
                fontSize: "12px",
                padding: "4px 12px",
              }}
            >
              Hardened
            </button>
          </div>

          {/* Set Switcher */}
          <div
            style={{
              display: "inline-flex",
              backgroundColor: "var(--color-warm-taupe)",
              padding: "3px",
              borderRadius: "var(--radius-full)",
              border: "1px solid var(--color-stone)",
            }}
          >
            {(["all", "train", "heldout"] as const).map((s) => (
              <button
                key={s}
                className="btn-pill"
                onClick={() => setSet(s)}
                style={{
                  backgroundColor: set === s ? "var(--color-ink)" : "transparent",
                  color: set === s ? "var(--color-eggshell)" : "var(--color-graphite)",
                  fontSize: "12px",
                  padding: "4px 12px",
                }}
              >
                {s === "all" ? "All Sets" : s === "train" ? "Training" : "Held-Out"}
              </button>
            ))}
          </div>

          {/* Only Breaches Checkbox */}
          <label style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "13px", cursor: "pointer" }}>
            <input
              type="checkbox"
              checked={onlyBreaks}
              onChange={(e) => setOnlyBreaks(e.target.checked)}
              style={{ width: "auto" }}
            />
            <span>Successful Breaches Only</span>
          </label>
        </div>
      </div>

      <div className="editorial-table-wrap">
        <table className="editorial-table">
          <thead>
            <tr>
              <th style={{ width: "160px" }}>Category</th>
              <th style={{ width: "110px" }}>Evaluation Set</th>
              <th>Attack Message</th>
              <th style={{ width: "140px" }}>Verdict</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 && (
              <tr>
                <td colSpan={4} style={{ textAlign: "center", color: "var(--color-smoke)", padding: "28px" }}>
                  No attacks match the selected filters.
                </td>
              </tr>
            )}
            {rows.map((r) => (
              <Fragment key={r.id}>
                <tr className="clickable" onClick={() => setOpen(open === r.id ? null : r.id)}>
                  <td>
                    <span className="tag-pill" style={{ fontSize: "10px" }}>
                      {CATEGORY_LABELS[r.category]}
                    </span>
                  </td>
                  <td style={{ fontSize: "12px", color: "var(--color-smoke)" }}>
                    {r.set === "train" ? "Training" : "Held-Out"}
                  </td>
                  <td style={{ maxWidth: "420px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {r.attack}
                  </td>
                  <td>
                    {r.verdict.success ? (
                      <span className="status-pill danger">
                        <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "var(--color-breached)", display: "inline-block" }} />
                        <span>Broke it{r.verdict.canaryLeak ? " · Secret Leaked" : ""}</span>
                      </span>
                    ) : (
                      <span className="status-pill success">
                        <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "var(--color-defense-held)", display: "inline-block" }} />
                        <span>Defense Held</span>
                      </span>
                    )}
                  </td>
                </tr>

                {/* Collapsible Details */}
                {open === r.id && (
                  <tr style={{ backgroundColor: "var(--color-warm-taupe)" }}>
                    <td colSpan={4} style={{ padding: "20px" }}>
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px" }}>
                        <div>
                          <strong style={{ fontSize: "12px", textTransform: "uppercase", color: "var(--color-graphite)" }}>
                            Adversarial Attack
                          </strong>
                          <p style={{ marginTop: "6px", fontFamily: "var(--font-mono)", fontSize: "12.5px", color: "var(--color-ink)" }}>
                            {r.attack}
                          </p>
                        </div>
                        <div>
                          <strong style={{ fontSize: "12px", textTransform: "uppercase", color: "var(--color-graphite)" }}>
                            Chatbot Reply
                          </strong>
                          <p style={{ marginTop: "6px", fontSize: "13px", color: "var(--color-ink)" }}>
                            {r.response || "(empty response)"}
                          </p>
                        </div>
                        <div>
                          <strong style={{ fontSize: "12px", textTransform: "uppercase", color: "var(--color-graphite)" }}>
                            Judge Rubric Verdict (Severity: {r.verdict.severity}/3)
                          </strong>
                          <p style={{ marginTop: "6px", fontSize: "13px", color: "var(--color-smoke)" }}>
                            {r.verdict.reason || "No explanation recorded."}
                          </p>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function BenignTable({ report }: { report: RunReport }) {
  if (report.before.benign.length === 0) return null;
  return (
    <div className="bracket-card bracket-card-white" style={{ padding: "28px" }}>
      <div style={{ marginBottom: "16px" }}>
        <h3 style={{ fontSize: "18px", fontWeight: 600, marginBottom: "4px" }}>
          Over-Refusal Verification
        </h3>
        <p style={{ color: "var(--color-smoke)", fontSize: "13px" }}>
          Legitimate in-scope user queries. A hardened system prompt that wrongly refuses these is not a practical defense.
        </p>
      </div>

      <div className="editorial-table-wrap">
        <table className="editorial-table">
          <thead>
            <tr>
              <th>Legitimate User Question</th>
              <th style={{ width: "160px" }}>Original Behavior</th>
              <th style={{ width: "160px" }}>Hardened Behavior</th>
            </tr>
          </thead>
          <tbody>
            {report.before.benign.map((b, i) => {
              const a = report.after.benign[i];
              return (
                <tr key={b.id}>
                  <td style={{ fontSize: "13.5px" }}>{b.query}</td>
                  <td>
                    {b.refused ? (
                      <span className="status-pill danger">Refused</span>
                    ) : (
                      <span className="status-pill success">Answered</span>
                    )}
                  </td>
                  <td>
                    {a ? (
                      a.refused ? (
                        <span className="status-pill danger">Refused</span>
                      ) : (
                        <span className="status-pill success">Answered</span>
                      )
                    ) : (
                      "—"
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function Results({ report }: { report: RunReport }) {
  const { before, after } = report;

  const download = () => {
    const blob = new Blob([JSON.stringify(report, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `guardrail-report-${report.createdAt.slice(0, 19).replace(/[:T]/g, "-")}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
      {/* Results Header with Export Actions */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
        <div>
          <span className="tag-pill tag-pill-spark" style={{ marginBottom: "6px" }}>
            Audit Complete
          </span>
          <h2 className="font-display" style={{ fontSize: "28px" }}>
            Red-Team &amp; Hardening Report
          </h2>
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <button className="btn-pill btn-pill-secondary" onClick={download}>
            Download JSON
          </button>
          <button className="btn-pill btn-pill-secondary" onClick={() => window.print()}>
            Print / Save as PDF
          </button>
        </div>
      </div>

      {/* Headline Stat Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "16px" }}>
        <StatCard title="Held-Out Attack Success" hint="Attacks the fixer never saw. True generalization.">
          <Delta before={before.heldout.asr} after={after.heldout.asr} />
        </StatCard>
        <StatCard title="Training Attack Success" hint="Attacks the fixer learned from.">
          <Delta before={before.train.asr} after={after.train.asr} />
        </StatCard>
        <StatCard title="Over-Refusal Rate" hint="Legitimate queries wrongly declined. Target: &le; 10%.">
          <Delta before={before.overRefusalRate} after={after.overRefusalRate} />
        </StatCard>
      </div>

      <CategoryBars before={before} after={after} />

      <PromptDiff before={report.originalPrompt} after={report.hardenedPrompt} />

      {/* Changes & Recommendations */}
      {(report.changes.length > 0 || report.recommendations.length > 0) && (
        <div className="bracket-card bracket-card-white" style={{ padding: "28px" }}>
          {report.changes.length > 0 && (
            <div style={{ marginBottom: report.recommendations.length > 0 ? "20px" : 0 }}>
              <h3 style={{ fontSize: "18px", fontWeight: 600, marginBottom: "8px" }}>
                Modifications Applied by Fixer
              </h3>
              <ul style={{ paddingLeft: "20px", fontSize: "14px", color: "var(--color-graphite)", display: "flex", flexDirection: "column", gap: "6px" }}>
                {report.changes.map((c, i) => (
                  <li key={i}>{c}</li>
                ))}
              </ul>
            </div>
          )}

          {report.recommendations.length > 0 && (
            <div>
              <h3 style={{ fontSize: "18px", fontWeight: 600, marginBottom: "8px" }}>
                Architectural Recommendations (Out-of-Prompt)
              </h3>
              <ul style={{ paddingLeft: "20px", fontSize: "14px", color: "var(--color-smoke)", display: "flex", flexDirection: "column", gap: "6px" }}>
                {report.recommendations.map((c, i) => (
                  <li key={i}>{c}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      <AttackTable report={report} />
      <BenignTable report={report} />
    </div>
  );
}
