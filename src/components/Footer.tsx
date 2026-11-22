import Link from "next/link";

export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "var(--color-warm-taupe)",
        borderTop: "1px solid var(--color-stone)",
        padding: "64px 0 40px",
        marginTop: "80px",
      }}
    >
      <div className="page-container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "40px",
            marginBottom: "48px",
          }}
        >
          {/* Col 1: Brand & Purpose */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "14px" }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <rect x="2" y="2" width="20" height="20" rx="4" stroke="black" strokeWidth="1.75" />
                <circle cx="12" cy="12" r="5" stroke="black" strokeWidth="1.75" />
                <line x1="12" y1="2" x2="12" y2="7" stroke="black" strokeWidth="1.75" />
                <line x1="12" y1="17" x2="12" y2="22" stroke="black" strokeWidth="1.75" />
              </svg>
              <span style={{ fontWeight: 600, fontSize: "16px", letterSpacing: "-0.02em" }}>
                Guardrail Labs
              </span>
            </div>
            <p style={{ color: "var(--color-smoke)", fontSize: "13.5px", lineHeight: "1.6" }}>
              Automated adversarial testing and prompt hardening system. Measurable defense against OWASP LLM01 Prompt Injection and LLM07 System Prompt Leakage.
            </p>
          </div>

          {/* Col 2: Academic Specs */}
          <div>
            <h4 style={{ fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--color-graphite)", marginBottom: "14px", fontWeight: 600 }}>
              Course & Project
            </h4>
            <ul style={{ listStyle: "none", fontSize: "13.5px", color: "var(--color-smoke)", display: "flex", flexDirection: "column", gap: "8px" }}>
              <li><strong>Course:</strong> Prompt Engineering (SCSE4041)</li>
              <li><strong>Problem Pool:</strong> ID C23</li>
              <li><strong>Faculty Reviewer:</strong> Dr. B D Mazumdar</li>
              <li><strong>Evaluation:</strong> Double-blind $\kappa \ge 0.81$</li>
            </ul>
          </div>

          {/* Col 3: Research Team */}
          <div>
            <h4 style={{ fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--color-graphite)", marginBottom: "14px", fontWeight: 600 }}>
              Team Context Window
            </h4>
            <ul style={{ listStyle: "none", fontSize: "13.5px", color: "var(--color-smoke)", display: "flex", flexDirection: "column", gap: "8px" }}>
              <li>Devansh Kumar (Lead, Orchestration)</li>
              <li>Ayush Anand (Attacker & Taxonomy)</li>
              <li>Gyanendra Prakash (Judge & Validation)</li>
              <li>Ankit Gupta (Fixer & UI Design)</li>
            </ul>
          </div>

          {/* Col 4: Quick Actions */}
          <div>
            <h4 style={{ fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--color-graphite)", marginBottom: "14px", fontWeight: 600 }}>
              Resources & Artifacts
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <Link href="/app" className="btn-pill btn-pill-primary" style={{ fontSize: "13px", padding: "8px 18px", width: "fit-content" }}>
                Launch Security Studio →
              </Link>
              <span style={{ fontSize: "12px", color: "var(--color-ash)" }}>
                Zero real PII testing • Fictional data only
              </span>
            </div>
          </div>
        </div>

        <div className="hairline-divider" style={{ margin: "24px 0" }} />

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "12px",
            fontSize: "12px",
            color: "var(--color-ash)",
          }}
        >
          <span>© 2026 Guardrail Labs • Bauhaus Editorial System • Vercel Deployed</span>
          <span>Tested on Anthropic Claude, Google Gemini & Groq Llama-3.1</span>
        </div>
      </div>
    </footer>
  );
}
