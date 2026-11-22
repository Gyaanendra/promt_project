"use client";

import { useEffect, useRef, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Results from "@/components/Results";
import { DEMO_BOTS } from "@/lib/demo";
import { runPipeline } from "@/lib/pipeline";
import type { Progress, RunReport, Stage } from "@/lib/types";

interface Health {
  authRequired: boolean;
  models: Record<string, { configured: boolean; provider?: string; model?: string; error?: string }>;
}

const PRESETS = {
  quick: { label: "Quick", attacks: 3, heldout: 3, benign: 4, hint: "~28 test cases • ~2 minutes" },
  standard: { label: "Standard", attacks: 5, heldout: 5, benign: 8, hint: "~48 test cases • Project Baseline" },
  thorough: { label: "Thorough", attacks: 8, heldout: 8, benign: 12, hint: "~76 test cases • Deep Red-Team" },
} as const;
type PresetKey = keyof typeof PRESETS;

const STAGE_RANGE: Partial<Record<Stage, [number, number]>> = {
  "generating-attacks": [0, 12],
  "generating-benign": [12, 15],
  "evaluating-original": [15, 55],
  fixing: [55, 60],
  "evaluating-hardened": [60, 100],
  done: [100, 100],
};

function overall(p: Progress): number {
  const range = STAGE_RANGE[p.stage] ?? [0, 0];
  const frac = p.total > 0 ? p.done / p.total : 0;
  return Math.round(range[0] + (range[1] - range[0]) * frac);
}

const STORAGE_KEY = "guardrail-labs:last-report";

export default function SecurityStudioPage() {
  const [systemPrompt, setSystemPrompt] = useState("");
  const [secretsText, setSecretsText] = useState("");
  const [selectedBotId, setSelectedBotId] = useState<string>("campus");
  const [preset, setPreset] = useState<PresetKey>("standard");
  const [accessCode, setAccessCode] = useState("");
  const [health, setHealth] = useState<Health | null>(null);
  const [progress, setProgress] = useState<Progress | null>(null);
  const [report, setReport] = useState<RunReport | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [running, setRunning] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    fetch("/api/health")
      .then((r) => r.json())
      .then(setHealth)
      .catch(() => setHealth(null));

    // Default to CampusBot on initial load
    const campus = DEMO_BOTS.find((b) => b.id === "campus");
    if (campus) {
      setSystemPrompt(campus.systemPrompt);
      setSecretsText(campus.secrets.join(", "));
    }

    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setReport(JSON.parse(saved) as RunReport);
      const code = sessionStorage.getItem("guardrail-labs:code");
      if (code) setAccessCode(code);
    } catch {
      /* storage unavailable */
    }
  }, []);

  const loadBot = (botId: string) => {
    setSelectedBotId(botId);
    const bot = DEMO_BOTS.find((b) => b.id === botId);
    if (bot) {
      setSystemPrompt(bot.systemPrompt);
      setSecretsText(bot.secrets.join(", "));
    }
  };

  const start = async () => {
    setError(null);
    setReport(null);
    setRunning(true);
    const controller = new AbortController();
    abortRef.current = controller;
    try {
      sessionStorage.setItem("guardrail-labs:code", accessCode);
    } catch {
      /* ignore */
    }

    const p = PRESETS[preset];
    try {
      const result = await runPipeline({
        systemPrompt: systemPrompt.trim(),
        secrets: secretsText.split(",").map((s) => s.trim()).filter(Boolean),
        attacksPerCategory: p.attacks,
        heldoutPerCategory: p.heldout,
        benignCount: p.benign,
        accessCode: accessCode || undefined,
        onProgress: setProgress,
        signal: controller.signal,
      });
      setReport(result);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(result));
      } catch {
        /* storage full */
      }
    } catch (e) {
      if (e instanceof DOMException && e.name === "AbortError") setError("Run cancelled by user.");
      else setError(e instanceof Error ? e.message : "An unexpected error occurred during execution.");
    } finally {
      setRunning(false);
      abortRef.current = null;
    }
  };

  const notConfigured = health
    ? Object.entries(health.models).filter(([, m]) => !m.configured)
    : [];
  const canRun = !running && systemPrompt.trim().length >= 20 && notConfigured.length === 0;

  return (
    <div style={{ backgroundColor: "var(--color-eggshell)", minHeight: "100vh" }}>
      <Navbar current="app" />

      <main className="page-container" style={{ paddingTop: "40px", paddingBottom: "60px" }}>
        {/* Studio Hero Header */}
        <div style={{ marginBottom: "32px" }}>
          <div style={{ display: "inline-flex", marginBottom: "8px" }}>
            <span className="tag-pill tag-pill-dark" style={{ fontSize: "10px" }}>
              Adversarial Testing Lab
            </span>
          </div>
          <h1 className="font-display" style={{ fontSize: "36px", marginBottom: "8px" }}>
            Chatbot Red-Team &amp; Hardening Studio
          </h1>
          <p style={{ color: "var(--color-smoke)", maxWidth: "680px", fontSize: "15px" }}>
            Paste a chatbot system prompt or select one of the 5 archetypes below. Guardrail Labs will stress-test it against adversarial prompts, grade failures, and synthesize a hardened prompt.
          </p>
        </div>

        {/* Setup Needed Alert */}
        {notConfigured.length > 0 && (
          <div
            className="bracket-card"
            style={{
              backgroundColor: "var(--color-warn-bg)",
              borderColor: "#ebd49e",
              marginBottom: "24px",
              padding: "20px 24px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M12 9V14M12 18H12.01M10.29 3.86L1.82 18C1.64 18.3 1.55 18.65 1.55 19C1.55 19.35 1.64 19.7 1.82 20C2 20.3 2.26 20.56 2.57 20.73C2.88 20.9 3.23 21 3.59 21H20.41C20.77 21 21.12 20.9 21.43 20.73C21.74 20.56 22 20.3 22.18 20C22.36 19.7 22.45 19.35 22.45 19C22.45 18.65 22.36 18.3 22.18 18L13.71 3.86C13.53 3.55 13.27 3.3 12.96 3.12C12.65 2.95 12.3 2.85 11.94 2.85C11.58 2.85 11.23 2.95 10.92 3.12C10.61 3.3 10.35 3.55 10.17 3.86H10.29Z" stroke="#8a5300" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <strong style={{ fontSize: "15px" }}>Provider Setup Required</strong>
            </div>
            <p style={{ fontSize: "13.5px", color: "var(--color-graphite)", marginBottom: "10px" }}>
              The following required model providers are not yet configured with valid API keys:
            </p>
            <ul style={{ paddingLeft: "20px", fontSize: "13px", color: "var(--color-graphite)", marginBottom: "10px" }}>
              {notConfigured.map(([role, m]) => (
                <li key={role}>
                  <code>{role}</code>: {m.error}
                </li>
              ))}
            </ul>
            <span style={{ fontSize: "12px", color: "var(--color-smoke)" }}>
              Add your keys to <code>.env.local</code> (local) or Vercel Project Settings (deployed), then reload this page.
            </span>
          </div>
        )}

        {/* Input Form Card */}
        <section className="bracket-card bracket-card-white" style={{ marginBottom: "28px" }}>
          {/* Preset Selector */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px", marginBottom: "16px" }}>
            <h2 style={{ fontSize: "18px", fontWeight: 600 }}>
              1. System Prompt Under Test
            </h2>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span style={{ fontSize: "12px", color: "var(--color-smoke)", textTransform: "uppercase", letterSpacing: "0.04em", fontWeight: 600 }}>
                Preset Bot:
              </span>
              <select
                className="inline-select"
                value={selectedBotId}
                onChange={(e) => loadBot(e.target.value)}
                disabled={running}
                style={{ width: "auto", minWidth: "240px", padding: "8px 14px", fontSize: "13px" }}
              >
                {selectedBotId === "" && <option value="">Custom prompt</option>}
                {DEMO_BOTS.map((bot) => (
                  <option key={bot.id} value={bot.id}>
                    {bot.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <textarea
            value={systemPrompt}
            onChange={(e) => {
              setSystemPrompt(e.target.value);
              setSelectedBotId("");
            }}
            placeholder="Paste your system prompt here. Use fictional data only: no real personal or sensitive information."
            rows={8}
            maxLength={8000}
            disabled={running}
            style={{ marginBottom: "8px" }}
          />

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
            <span style={{ fontSize: "12px", color: "var(--color-smoke)" }}>
              {DEMO_BOTS.find((b) => b.id === selectedBotId)?.description ?? "Custom user-supplied system prompt."}
            </span>
            <span className="font-mono" style={{ fontSize: "12px", color: "var(--color-ash)" }}>
              {systemPrompt.length} / 8,000 chars
            </span>
          </div>

          {/* Canary Secrets Input */}
          <div style={{ marginBottom: "24px" }}>
            <label style={{ display: "block", fontSize: "13px", fontWeight: 600, marginBottom: "6px" }}>
              Planted Canary Secrets <span style={{ fontWeight: 400, color: "var(--color-smoke)" }}>(Optional, comma-separated)</span>
            </label>
            <input
              type="text"
              value={secretsText}
              onChange={(e) => setSecretsText(e.target.value)}
              placeholder="e.g. ALPHA-7, VIP-FEAST-99, ESCALATE-SEC-42"
              disabled={running}
              style={{ fontSize: "13.5px" }}
            />
            <span style={{ fontSize: "12px", color: "var(--color-ash)", display: "block", marginTop: "4px" }}>
              Deterministic check: if any secret appears in a reply (even obfuscated or spaced out), the attack is flagged as a leak without LLM bias.
            </span>
          </div>

          {/* Test Size Presets */}
          <div style={{ marginBottom: "24px" }}>
            <h2 style={{ fontSize: "18px", fontWeight: 600, marginBottom: "12px" }}>
              2. Test Intensity Presets
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "12px" }}>
              {(Object.keys(PRESETS) as PresetKey[]).map((k) => {
                const isSelected = preset === k;
                return (
                  <div
                    key={k}
                    onClick={() => !running && setPreset(k)}
                    style={{
                      border: `1px solid ${isSelected ? "var(--color-ink)" : "var(--color-stone)"}`,
                      backgroundColor: isSelected ? "var(--color-warm-taupe)" : "var(--color-eggshell)",
                      borderRadius: "var(--radius-sm)",
                      padding: "14px 16px",
                      cursor: running ? "not-allowed" : "pointer",
                      transition: "all 0.15s ease",
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4px" }}>
                      <strong style={{ fontSize: "14px" }}>{PRESETS[k].label}</strong>
                      <span
                        style={{
                          width: "8px",
                          height: "8px",
                          borderRadius: "50%",
                          backgroundColor: isSelected ? "var(--color-ember-orange)" : "transparent",
                          border: `1px solid ${isSelected ? "var(--color-ember-orange)" : "var(--color-stone)"}`,
                        }}
                      />
                    </div>
                    <span style={{ fontSize: "12px", color: "var(--color-smoke)" }}>{PRESETS[k].hint}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Access Code if Required */}
          {health?.authRequired && (
            <div style={{ marginBottom: "24px", maxWidth: "320px" }}>
              <label style={{ display: "block", fontSize: "13px", fontWeight: 600, marginBottom: "6px" }}>
                Deployment Access Passcode
              </label>
              <input
                type="password"
                value={accessCode}
                onChange={(e) => setAccessCode(e.target.value)}
                placeholder="Enter access code"
                disabled={running}
              />
            </div>
          )}

          {/* Run / Cancel CTA Bar */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px", paddingTop: "8px", borderTop: "1px solid var(--color-stone)" }}>
            <button
              onClick={start}
              disabled={!canRun}
              className="btn-pill btn-pill-primary"
              style={{ padding: "12px 28px", fontSize: "14px" }}
            >
              {running ? (
                <>
                  <span className="rotating-stamp" style={{ width: "14px", height: "14px", display: "inline-block", border: "2px solid #fff", borderTopColor: "transparent", borderRadius: "50%" }} />
                  <span>Pipeline Running…</span>
                </>
              ) : (
                <>
                  <span>Run Red-Team &amp; Harden</span>
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                    <path d="M3.33334 8H12.6667M12.6667 8L8.66668 4M12.6667 8L8.66668 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </>
              )}
            </button>

            {running && (
              <button
                onClick={() => abortRef.current?.abort()}
                className="btn-pill btn-pill-secondary"
                style={{ padding: "11px 22px", fontSize: "14px" }}
              >
                Cancel Run
              </button>
            )}

            {!running && systemPrompt.trim().length < 20 && (
              <span style={{ fontSize: "12px", color: "var(--color-ash)" }}>
                Minimum prompt length is 20 characters to begin.
              </span>
            )}
          </div>
        </section>

        {/* Live Progress Card */}
        {progress && running && (
          <section
            className="bracket-card"
            style={{
              backgroundColor: "var(--color-warm-taupe)",
              marginBottom: "28px",
              padding: "24px",
            }}
            aria-live="polite"
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <span className="tag-pill tag-pill-spark" style={{ fontSize: "10px" }}>
                  {progress.stage.replace("-", " ")}
                </span>
                <strong style={{ fontSize: "14px" }}>{progress.message}</strong>
              </div>
              <span className="font-mono" style={{ fontSize: "13px", fontWeight: 600 }}>
                {overall(progress)}%
              </span>
            </div>

            <div
              style={{
                height: "8px",
                backgroundColor: "var(--color-stone)",
                borderRadius: "9999px",
                overflow: "hidden",
                marginBottom: "10px",
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: `${overall(progress)}%`,
                  backgroundColor: "var(--color-ink)",
                  transition: "width 0.3s ease",
                  borderRadius: "9999px",
                }}
              />
            </div>

            <p style={{ fontSize: "12px", color: "var(--color-smoke)", margin: 0 }}>
              Completed step {progress.done} of {progress.total}. Browser orchestrator calling lightweight serverless endpoints. Keep this tab open.
            </p>
          </section>
        )}

        {/* Error Notice */}
        {error && (
          <div
            className="bracket-card"
            style={{
              backgroundColor: "var(--color-breached-bg)",
              borderColor: "#f5c5c0",
              color: "var(--color-breached)",
              marginBottom: "28px",
              padding: "16px 20px",
            }}
          >
            <strong>Error:</strong> {error}
          </div>
        )}

        {/* Results Component */}
        {report && <Results report={report} />}
      </main>

      <Footer />
    </div>
  );
}
