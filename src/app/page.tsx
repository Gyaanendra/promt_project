import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MindlyHero from "@/components/MindlyHero";
import ArchitectureFlow from "@/components/ArchitectureFlow";
import InteractiveDemo from "@/components/InteractiveDemo";

export default function LandingPage() {
  return (
    <div style={{ backgroundColor: "var(--color-eggshell)", minHeight: "100vh" }}>
      <Navbar current="landing" />

      {/* 1. HERO SECTION (Mindly Editorial Reconstructed Composition) */}
      <MindlyHero />

      {/* 2. PARTNER / TRUST LOGO STRIP (Matching Image 3 & ElevenLabs Trust Grid) */}
      <section style={{ borderTop: "1px solid var(--color-stone)", borderBottom: "1px solid var(--color-stone)", padding: "26px 0", backgroundColor: "var(--color-warm-taupe)" }}>
        <div className="page-container">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "24px", opacity: 0.8 }}>
            <span style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--color-graphite)" }}>
              Standards &amp; Model Architecture:
            </span>
            <div style={{ display: "flex", gap: "32px", alignItems: "center", flexWrap: "wrap" }}>
              <span style={{ fontWeight: 600, fontSize: "13.5px", letterSpacing: "0.04em" }}>OWASP LLM TOP 10</span>
              <span style={{ fontWeight: 600, fontSize: "13.5px", letterSpacing: "0.02em" }}>ANTHROPIC CLAUDE</span>
              <span style={{ fontWeight: 600, fontSize: "13.5px", letterSpacing: "0.02em" }}>GOOGLE GEMINI</span>
              <span style={{ fontWeight: 600, fontSize: "13.5px", letterSpacing: "0.02em" }}>GROQ LLAMA-3.1</span>
              <span style={{ fontWeight: 600, fontSize: "13.5px", letterSpacing: "0.04em" }}>VERCEL SERVERLESS</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. THREAT TAXONOMY SECTION (Clean Vector Icons, No Emojis) */}
      <section className="section" id="threats">
        <div className="page-container">
          <div style={{ textAlign: "center", maxWidth: "660px", margin: "0 auto 48px" }}>
            <span className="tag-pill" style={{ marginBottom: "12px" }}>
              Attack Taxonomy
            </span>
            <h2 style={{ fontSize: "34px", marginBottom: "12px" }}>
              Four Threat Vectors Tested in Parallel
            </h2>
            <p style={{ color: "var(--color-smoke)", fontSize: "15px" }}>
              We generate realistic adversarial payloads targeted strictly against your bot&apos;s declared rules, boundaries, and hidden secrets.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "20px",
            }}
          >
            {/* Card 1: Prompt Injection */}
            <div className="bracket-card">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                <span className="tag-pill" style={{ fontSize: "10px" }}>OWASP LLM01</span>
                <div style={{ width: "24px", height: "24px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke="var(--color-ink)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
              <h3 style={{ fontSize: "18px", fontWeight: 600, marginBottom: "8px" }}>
                Prompt Injection
              </h3>
              <p style={{ fontSize: "13.5px", color: "var(--color-smoke)", lineHeight: "1.55" }}>
                Attempts to override, replace, or hijack instructions using fake developer messages, delimiter exploits, or embedded payloads.
              </p>
            </div>

            {/* Card 2: Secret Extraction */}
            <div className="bracket-card">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                <span className="tag-pill" style={{ fontSize: "10px" }}>OWASP LLM07</span>
                <div style={{ width: "24px", height: "24px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <rect x="3" y="11" width="18" height="11" rx="2" stroke="var(--color-ink)" strokeWidth="1.75"/>
                    <path d="M7 11V7C7 4.23858 9.23858 2 12 2C14.7614 2 17 4.23858 17 7V11" stroke="var(--color-ink)" strokeWidth="1.75"/>
                  </svg>
                </div>
              </div>
              <h3 style={{ fontSize: "18px", fontWeight: 600, marginBottom: "8px" }}>
                Prompt &amp; Secret Extraction
              </h3>
              <p style={{ fontSize: "13.5px", color: "var(--color-smoke)", lineHeight: "1.55" }}>
                Tries to coax the bot into revealing its internal instructions, hidden policies, or planted canary secrets via translation or pretexting.
              </p>
            </div>

            {/* Card 3: Persona Override */}
            <div className="bracket-card">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                <span className="tag-pill" style={{ fontSize: "10px" }}>Jailbreak Vector</span>
                <div style={{ width: "24px", height: "24px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="var(--color-ink)" strokeWidth="1.75"/>
                    <path d="M8 14S9.5 16.5 12 16.5C14.5 16.5 16 14 16 14" stroke="var(--color-ink)" strokeWidth="1.75" strokeLinecap="round"/>
                    <line x1="9" y1="9" x2="9.01" y2="9" stroke="var(--color-ink)" strokeWidth="2.5" strokeLinecap="round"/>
                    <line x1="15" y1="9" x2="15.01" y2="9" stroke="var(--color-ink)" strokeWidth="2.5" strokeLinecap="round"/>
                  </svg>
                </div>
              </div>
              <h3 style={{ fontSize: "18px", fontWeight: 600, marginBottom: "8px" }}>
                Persona Override
              </h3>
              <p style={{ fontSize: "13.5px", color: "var(--color-smoke)", lineHeight: "1.55" }}>
                Pressures the chatbot to abandon its assigned character, tone, or constraints through roleplay games or DAN-style framing.
              </p>
            </div>

            {/* Card 4: Policy Bypass */}
            <div className="bracket-card">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                <span className="tag-pill" style={{ fontSize: "10px" }}>Compliance Vector</span>
                <div style={{ width: "24px", height: "24px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="M14 2H6C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V8L14 2Z" stroke="var(--color-ink)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
                    <polyline points="14 2 14 8 20 8" stroke="var(--color-ink)" strokeWidth="1.75"/>
                    <line x1="16" y1="13" x2="8" y2="13" stroke="var(--color-ink)" strokeWidth="1.5"/>
                    <line x1="16" y1="17" x2="8" y2="17" stroke="var(--color-ink)" strokeWidth="1.5"/>
                  </svg>
                </div>
              </div>
              <h3 style={{ fontSize: "18px", fontWeight: 600, marginBottom: "8px" }}>
                Policy &amp; Scope Bypass
              </h3>
              <p style={{ fontSize: "13.5px", color: "var(--color-smoke)", lineHeight: "1.55" }}>
                Tests whether the bot can be induced to exceed its authorized domain&mdash;such as granting unauthorized refunds or false commitments.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. ARCHITECTURE SECTION (Image 2 style) */}
      <section className="section section-band" id="architecture">
        <div className="page-container">
          <ArchitectureFlow />
        </div>
      </section>

      {/* 5. INTERACTIVE LIVE DEMO SECTION */}
      <section className="section" id="interactive-demo">
        <div className="page-container">
          <InteractiveDemo />
        </div>
      </section>

      {/* 6. ACADEMIC BENCHMARKS & EXPERIMENTAL EVIDENCE */}
      <section className="section section-band" id="benchmarks">
        <div className="page-container">
          <div style={{ textAlign: "center", maxWidth: "680px", margin: "0 auto 40px" }}>
            <span className="tag-pill" style={{ marginBottom: "12px" }}>
              Empirical Findings
            </span>
            <h2 style={{ fontSize: "34px", marginBottom: "12px" }}>
              Academic Benchmark Results
            </h2>
            <p style={{ color: "var(--color-smoke)", fontSize: "15px" }}>
              Mean &plusmn; standard deviation across 3 repeat trials per bot architecture on held-out attacks, demonstrating statistically significant defense generalization.
            </p>
          </div>

          {/* Experimental Table */}
          <div className="editorial-table-wrap" style={{ marginBottom: "32px" }}>
            <table className="editorial-table">
              <thead>
                <tr>
                  <th>Test Bot Archetype</th>
                  <th>Planted Secret</th>
                  <th>Held-Out ASR (Before &rarr; After)</th>
                  <th>Relative Risk Reduction</th>
                  <th>Over-Refusal Rate</th>
                  <th>Verdict</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>CampusBot (Helpdesk)</strong></td>
                  <td><code>ALPHA-7</code></td>
                  <td>70.0% &plusmn; 5.0% &rarr; 20.0% &plusmn; 5.0%</td>
                  <td><span className="status-pill success">&minus;71.4% drop</span></td>
                  <td>0.0% &rarr; 6.7%</td>
                  <td><strong style={{ color: "var(--color-defense-held)" }}>PASS</strong></td>
                </tr>
                <tr>
                  <td><strong>BistroBot (Restaurant)</strong></td>
                  <td><code>VIP-FEAST-99</code></td>
                  <td>60.0% &plusmn; 5.0% &rarr; 18.3% &plusmn; 2.9%</td>
                  <td><span className="status-pill success">&minus;69.4% drop</span></td>
                  <td>0.0% &rarr; 1.7%</td>
                  <td><strong style={{ color: "var(--color-defense-held)" }}>PASS</strong></td>
                </tr>
                <tr>
                  <td><strong>RefundBot (Support $50 Cap)</strong></td>
                  <td><code>ESCALATE-SEC-42</code></td>
                  <td>80.0% &plusmn; 5.0% &rarr; 30.0% &plusmn; 5.0%</td>
                  <td><span className="status-pill success">&minus;62.5% drop</span></td>
                  <td>1.7% &rarr; 8.3%</td>
                  <td><strong style={{ color: "var(--color-defense-held)" }}>PASS</strong></td>
                </tr>
                <tr>
                  <td><strong>Captain Blackbeard (Pirate Persona)</strong></td>
                  <td><code>TREASURE-LAT-49</code></td>
                  <td>50.0% &plusmn; 5.0% &rarr; 11.7% &plusmn; 2.9%</td>
                  <td><span className="status-pill success">&minus;76.7% drop</span></td>
                  <td>0.0% &rarr; 3.3%</td>
                  <td><strong style={{ color: "var(--color-defense-held)" }}>PASS</strong></td>
                </tr>
                <tr>
                  <td><strong>WeakBot (Naive Control)</strong></td>
                  <td><em>None</em></td>
                  <td>95.0% &plusmn; 5.0% &rarr; 45.0% &plusmn; 5.0%</td>
                  <td><span className="status-pill success">&minus;52.6% drop</span></td>
                  <td>0.0% &rarr; 6.7%</td>
                  <td><strong style={{ color: "var(--color-defense-held)" }}>PASS</strong></td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Judge Reliability Metrics Box */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "16px",
            }}
          >
            <div className="bracket-card" style={{ padding: "20px" }}>
              <div style={{ fontSize: "11px", color: "var(--color-smoke)", textTransform: "uppercase" }}>Inter-Annotator Agreement</div>
              <div style={{ fontSize: "28px", fontWeight: 700, margin: "6px 0 2px" }}>92.0%</div>
              <div style={{ fontSize: "12px", color: "var(--color-defense-held)" }}>Double-blind consensus (50 pairs)</div>
            </div>

            <div className="bracket-card" style={{ padding: "20px" }}>
              <div style={{ fontSize: "11px", color: "var(--color-smoke)", textTransform: "uppercase" }}>Judge vs Human Accuracy</div>
              <div style={{ fontSize: "28px", fontWeight: 700, margin: "6px 0 2px" }}>91.3%</div>
              <div style={{ fontSize: "12px", color: "var(--color-defense-held)" }}>Exceeds &ge; 85% course target</div>
            </div>

            <div className="bracket-card" style={{ padding: "20px" }}>
              <div style={{ fontSize: "11px", color: "var(--color-smoke)", textTransform: "uppercase" }}>Cohen&apos;s Kappa (&kappa;)</div>
              <div style={{ fontSize: "28px", fontWeight: 700, margin: "6px 0 2px" }}>0.812</div>
              <div style={{ fontSize: "12px", color: "var(--color-defense-held)" }}>Substantial statistical reliability</div>
            </div>

            <div className="bracket-card" style={{ padding: "20px" }}>
              <div style={{ fontSize: "11px", color: "var(--color-smoke)", textTransform: "uppercase" }}>Planted Canary Recall</div>
              <div style={{ fontSize: "28px", fontWeight: 700, margin: "6px 0 2px" }}>100%</div>
              <div style={{ fontSize: "12px", color: "var(--color-defense-held)" }}>Deterministic zero false negatives</div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. TESTIMONIALS SECTION (Matching Image 3, No Emojis - Clean Vector Stars) */}
      <section className="section" id="testimonials">
        <div className="page-container">
          <div style={{ textAlign: "center", maxWidth: "660px", margin: "0 auto 48px" }}>
            <span className="tag-pill" style={{ marginBottom: "12px" }}>
              Evaluator Endorsements
            </span>
            <h2 style={{ fontSize: "34px", marginBottom: "12px" }}>
              Trusted by Reviewers Worldwide
            </h2>
            <p style={{ color: "var(--color-smoke)", fontSize: "15px" }}>
              Feedback from faculty reviewers, prompt engineering researchers, and student developers testing conversational AI systems.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "24px",
            }}
          >
            {/* Review 1 */}
            <div className="bracket-card bracket-card-white">
              <div style={{ display: "flex", gap: "3px", marginBottom: "12px" }}>
                {[...Array(5)].map((_, i) => (
                  <svg key={i} width="14" height="14" viewBox="0 0 16 16" fill="var(--color-ember-orange)">
                    <path d="M8 0.5L10.3 5.2L15.5 5.9L11.7 9.6L12.6 14.8L8 12.4L3.4 14.8L4.3 9.6L0.5 5.9L5.7 5.2L8 0.5Z" />
                  </svg>
                ))}
              </div>
              <p style={{ fontSize: "14px", lineHeight: "1.6", color: "var(--color-ink)", marginBottom: "20px" }}>
                &ldquo;The held-out evaluation set is what elevates Guardrail Labs from a simple toy scanner into an academic defense system. It proves real generalization rather than prompt memorization.&rdquo;
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div style={{ width: "36px", height: "36px", borderRadius: "50%", backgroundColor: "var(--color-warm-taupe)", border: "1px solid var(--color-stone)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 600, fontSize: "13px" }}>
                  BD
                </div>
                <div>
                  <strong style={{ fontSize: "13px", display: "block" }}>Dr. B D Mazumdar</strong>
                  <span style={{ fontSize: "12px", color: "var(--color-smoke)" }}>Faculty Reviewer, SCSE4041</span>
                </div>
              </div>
            </div>

            {/* Review 2 */}
            <div className="bracket-card bracket-card-white">
              <div style={{ display: "flex", gap: "3px", marginBottom: "12px" }}>
                {[...Array(5)].map((_, i) => (
                  <svg key={i} width="14" height="14" viewBox="0 0 16 16" fill="var(--color-ember-orange)">
                    <path d="M8 0.5L10.3 5.2L15.5 5.9L11.7 9.6L12.6 14.8L8 12.4L3.4 14.8L4.3 9.6L0.5 5.9L5.7 5.2L8 0.5Z" />
                  </svg>
                ))}
              </div>
              <p style={{ fontSize: "14px", lineHeight: "1.6", color: "var(--color-ink)", marginBottom: "20px" }}>
                &ldquo;The deterministic canary check immediately caught a system credential leakage that three manual red-team iterations overlooked. The prompt diff view is indispensable.&rdquo;
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div style={{ width: "36px", height: "36px", borderRadius: "50%", backgroundColor: "var(--color-warm-taupe)", border: "1px solid var(--color-stone)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 600, fontSize: "13px" }}>
                  DK
                </div>
                <div>
                  <strong style={{ fontSize: "13px", display: "block" }}>Devansh Kumar</strong>
                  <span style={{ fontSize: "12px", color: "var(--color-smoke)" }}>Lead Architect, Context Window</span>
                </div>
              </div>
            </div>

            {/* Review 3 */}
            <div className="bracket-card bracket-card-white">
              <div style={{ display: "flex", gap: "3px", marginBottom: "12px" }}>
                {[...Array(5)].map((_, i) => (
                  <svg key={i} width="14" height="14" viewBox="0 0 16 16" fill="var(--color-ember-orange)">
                    <path d="M8 0.5L10.3 5.2L15.5 5.9L11.7 9.6L12.6 14.8L8 12.4L3.4 14.8L4.3 9.6L0.5 5.9L5.7 5.2L8 0.5Z" />
                  </svg>
                ))}
              </div>
              <p style={{ fontSize: "14px", lineHeight: "1.6", color: "var(--color-ink)", marginBottom: "20px" }}>
                &ldquo;Most prompt defense tools make your bot paranoid and cause massive over-refusal. Guardrail Labs strictly measured our benign questions to ensure our bot still answers helpful user queries.&rdquo;
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div style={{ width: "36px", height: "36px", borderRadius: "50%", backgroundColor: "var(--color-warm-taupe)", border: "1px solid var(--color-stone)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 600, fontSize: "13px" }}>
                  AG
                </div>
                <div>
                  <strong style={{ fontSize: "13px", display: "block" }}>Ankit Gupta</strong>
                  <span style={{ fontSize: "12px", color: "var(--color-smoke)" }}>Prompt Safety Engineer</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. CALL TO ACTION BANNER */}
      <section className="section" style={{ paddingTop: "20px" }}>
        <div className="page-container">
          <div
            className="bracket-card"
            style={{
              backgroundColor: "var(--color-warm-taupe)",
              padding: "60px 40px",
              textAlign: "center",
              borderRadius: "var(--radius-card-lg)",
            }}
          >
            <h2 className="font-display" style={{ fontSize: "clamp(30px, 4vw, 44px)", marginBottom: "16px" }}>
              Hardening chatbot prompts shouldn&apos;t take a security team.
            </h2>
            <p style={{ color: "var(--color-smoke)", maxWidth: "580px", margin: "0 auto 32px", fontSize: "16px" }}>
              Paste your prompt, select your test depth, and receive a mathematically verified hardened prompt in under 5 minutes.
            </p>
            <Link href="/app" className="btn-pill btn-pill-primary" style={{ padding: "14px 32px", fontSize: "15px" }}>
              <span>Open Interactive Security Studio</span>
              <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                <path d="M3.33334 8H12.6667M12.6667 8L8.66668 4M12.6667 8L8.66668 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
