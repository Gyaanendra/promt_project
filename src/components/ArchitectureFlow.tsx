"use client";

import { useState } from "react";

export default function ArchitectureFlow() {
  const [activeStep, setActiveStep] = useState<number>(0);

  const steps = [
    {
      id: "attacker",
      title: "1. Categorized Attack Generation",
      tag: "Threat Engine",
      model: "Strong Model (Claude / Gemini)",
      description:
        "Generates targeted adversarial vectors across 4 OWASP LLM categories (injection, extraction, persona, policy). Simultaneously creates a held-out evaluation set instructed to vary language, structure, and tactics.",
      output: '{"attacks": ["Override: developer mode active...", "..."]}',
    },
    {
      id: "target",
      title: "2. Target Model Execution",
      tag: "Sandbox Execution",
      model: "Isolated Target (Groq Llama 3.1)",
      description:
        "The chatbot under test receives its original system prompt as-is and processes the attack message. Running a separate open-source model family guarantees that the judge never grades its own reasoning style.",
      output: "Raw free-text chatbot response",
    },
    {
      id: "judge",
      title: "3. Canary & Rubric Scoring",
      tag: "Double-Blind Verification",
      model: "Deterministic + Strong Judge",
      description:
        "Deterministic canary parser inspects replies for normalized secret strings. If no canary leaks, the temperature-0 judge evaluates the response against a 5-condition rubric isolated in strict XML data delimiters.",
      output: '{"success": false, "severity": 0, "reason": "Held..."}',
    },
    {
      id: "fixer",
      title: "4. Class-Level Prompt Hardening",
      tag: "Hardening Engine",
      model: "Strong Fixer (Claude / Gemini)",
      description:
        "Feeds the top training failures to the Fixer prompt. The Fixer rewrites the system prompt to address the underlying vulnerability class, preserving persona, domain boundaries, and benign utility.",
      output: '{"hardened_prompt": "...", "changes": [...]}',
    },
  ];

  return (
    <div className="bracket-card" style={{ padding: "40px" }}>
      {/* Header matching Image 2 */}
      <div style={{ textAlign: "center", maxWidth: "640px", margin: "0 auto 40px" }}>
        <span className="tag-pill" style={{ marginBottom: "12px" }}>
          Pipeline Architecture
        </span>
        <h2 style={{ fontSize: "32px", marginBottom: "12px" }}>
          Smart Workflow Automation
        </h2>
        <p style={{ color: "var(--color-smoke)", fontSize: "15px" }}>
          Four decoupled stages running in client-orchestrated batches. Safe from serverless timeouts and free from self-grading bias.
        </p>
      </div>

      {/* Central Hub & Flow Visualization (Inspired by Image 2) */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "16px",
          position: "relative",
        }}
      >
        {steps.map((step, idx) => {
          const isActive = activeStep === idx;
          return (
            <div
              key={step.id}
              onClick={() => setActiveStep(idx)}
              style={{
                backgroundColor: isActive ? "var(--color-eggshell)" : "rgba(253, 252, 252, 0.5)",
                border: `1px solid ${isActive ? "var(--color-ink)" : "var(--color-stone)"}`,
                borderRadius: "var(--radius-card)",
                padding: "24px 20px",
                cursor: "pointer",
                transition: "all 0.2s ease",
                boxShadow: isActive ? "var(--shadow-floating)" : "none",
                transform: isActive ? "translateY(-2px)" : "none",
                position: "relative",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                <span className="tag-pill" style={{ fontSize: "10px" }}>
                  {step.tag}
                </span>
                <span
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    backgroundColor: isActive ? "var(--color-ember-orange)" : "var(--color-stone)",
                  }}
                />
              </div>

              <h3 style={{ fontSize: "16px", fontWeight: 600, marginBottom: "8px" }}>
                {step.title}
              </h3>

              <div style={{ fontSize: "12px", color: "var(--color-graphite)", fontWeight: 500, marginBottom: "10px" }}>
                {step.model}
              </div>

              <p style={{ fontSize: "13px", color: "var(--color-smoke)", lineHeight: "1.5" }}>
                {step.description}
              </p>

              <div
                style={{
                  marginTop: "16px",
                  padding: "8px 12px",
                  backgroundColor: "var(--color-warm-taupe)",
                  borderRadius: "6px",
                  fontSize: "11px",
                  fontFamily: "var(--font-mono)",
                  color: "var(--color-graphite)",
                  overflowX: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {step.output}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
