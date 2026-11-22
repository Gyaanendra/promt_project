"use client";

import { useState } from "react";
import Link from "next/link";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
    }
  };

  return (
    <footer
      style={{
        position: "relative",
        width: "100%",
        overflow: "hidden",
        backgroundColor: "var(--color-eggshell)",
      }}
    >
      {/* ==================== FULL-BLEED ARTWORK BACKGROUND WITH FLOATING CONTROLS ==================== */}
      <div
        className="footer-hero-stage"
        style={{
          position: "relative",
          width: "100%",
          minHeight: "580px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          paddingTop: "68px",
          paddingBottom: "50px",
          overflow: "hidden",
        }}
      >
        {/* Full-Bleed Fine-Art Painted Background Image */}
        <img
          src="/footer/water-portrait-v2.jpg"
          alt="Fine-art painted portrait of woman submerged in deep turquoise water with wild copper hair"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center 38%",
            zIndex: 1,
          }}
        />

        {/* Subtle Atmospheric Top Vignette to harmonize with canvas */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to bottom, rgba(253, 252, 252, 0.45) 0%, rgba(253, 252, 252, 0.1) 35%, transparent 75%)",
            pointerEvents: "none",
            zIndex: 2,
          }}
        />

        {/* Floating Content ON TOP of the Background Artwork */}
        <div
          style={{
            position: "relative",
            zIndex: 10,
            maxWidth: "760px",
            width: "100%",
            padding: "0 clamp(20px, 4vw, 48px)",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* Subtitle in the upper sky area */}
          <p
            style={{
              fontSize: "clamp(15px, 1.8vw, 18px)",
              color: "#1c241e",
              fontWeight: 500,
              maxWidth: "640px",
              margin: "0 auto 36px",
              lineHeight: "1.6",
              fontFamily: "var(--font-sans)",
              letterSpacing: "-0.01em",
              textShadow: "0 1px 16px rgba(255, 255, 255, 0.9), 0 0 4px rgba(255, 255, 255, 0.8)",
            }}
          >
            One research dispatch every month. Big ideas, clear thinking, and zero noise &mdash; for 24,000 readers who like their insights sharp and their inboxes calm.
          </p>

          {/* Floating Pill Input Bar (Placed directly on top of the artwork) */}
          <form
            onSubmit={handleSubmit}
            style={{
              display: "inline-flex",
              alignItems: "center",
              backgroundColor: "rgba(255, 255, 255, 0.88)",
              backdropFilter: "blur(18px)",
              WebkitBackdropFilter: "blur(18px)",
              border: "1px solid rgba(255, 255, 255, 0.95)",
              borderRadius: "9999px",
              padding: "5px 6px 5px 24px",
              boxShadow: "0 14px 44px rgba(0, 0, 0, 0.16)",
              maxWidth: "480px",
              width: "100%",
              marginBottom: "12px",
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
            }}
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              style={{
                flex: 1,
                border: "none",
                outline: "none",
                backgroundColor: "transparent",
                fontSize: "15px",
                color: "#111111",
                fontFamily: "var(--font-sans)",
                padding: "8px 0",
              }}
            />
            <button
              type="submit"
              style={{
                backgroundColor: "#111612",
                color: "#ffffff",
                border: "none",
                borderRadius: "9999px",
                padding: "11px 26px",
                fontSize: "13.5px",
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.15s ease",
                whiteSpace: "nowrap",
                letterSpacing: "0.02em",
              }}
            >
              {subscribed ? "Subscribed" : "Subscribe"}
            </button>
          </form>

          {/* Floating Micro Pill Badge (Right below the input bar) */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              backgroundColor: "rgba(255, 255, 255, 0.82)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              border: "1px solid rgba(255, 255, 255, 0.9)",
              borderRadius: "9999px",
              padding: "4px 16px",
              fontSize: "12px",
              color: "#3a443a",
              fontStyle: "italic",
              fontFamily: "var(--font-display)",
              boxShadow: "0 4px 16px rgba(0, 0, 0, 0.08)",
            }}
          >
            Free forever. Unsubscribe anytime.
          </div>
        </div>
      </div>

      {/* ==================== MINIMALIST FOOTER BASELINE ==================== */}
      <div
        style={{
          backgroundColor: "#f5f3f1",
          borderTop: "1px solid var(--color-stone)",
          padding: "32px 0 28px",
          position: "relative",
          zIndex: 10,
        }}
      >
        <div className="page-container">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "20px",
            }}
          >
            {/* Left: Brand & Course Spec */}
            <div style={{ display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <div
                  style={{
                    width: "18px",
                    height: "18px",
                    border: "1.5px solid var(--color-ink)",
                    borderRadius: "3px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div style={{ width: "4px", height: "4px", borderRadius: "50%", backgroundColor: "var(--color-ink)" }} />
                </div>
                <span style={{ fontWeight: 600, fontSize: "14px", letterSpacing: "-0.01em" }}>
                  Guardrail Labs
                </span>
              </div>
              <span style={{ fontSize: "12px", color: "var(--color-ash)" }}>|</span>
              <span style={{ fontSize: "12px", color: "var(--color-smoke)" }}>
                SCSE4041 Prompt Engineering • Problem Pool C23
              </span>
            </div>

            {/* Right: Team Context Window & Report Download */}
            <div style={{ display: "flex", alignItems: "center", gap: "20px", flexWrap: "wrap", fontSize: "12.5px" }}>
              <span style={{ color: "var(--color-graphite)", fontWeight: 500 }}>
                Team Context Window
              </span>
              <a
                href="/ContextWindow_TechnicalReport.pdf"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: "var(--color-ink)",
                  textDecoration: "none",
                  fontWeight: 500,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                <span>Technical Report (PDF)</span>
                <svg width="11" height="11" viewBox="0 0 16 16" fill="none">
                  <path d="M3.33334 8H12.6667M12.6667 8L8.66668 4M12.6667 8L8.66668 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
              <Link
                href="/app"
                style={{
                  color: "var(--color-ink)",
                  textDecoration: "none",
                  fontWeight: 600,
                }}
              >
                Launch Studio
              </Link>
            </div>
          </div>

          <div style={{ marginTop: "18px", paddingTop: "14px", borderTop: "1px solid rgba(235, 232, 228, 0.6)", display: "flex", justifyContent: "space-between", fontSize: "11px", color: "var(--color-ash)", flexWrap: "wrap", gap: "8px" }}>
            <span>© 2026 Guardrail Labs • Bauhaus Editorial System • Faculty Review: Dr. B D Mazumdar</span>
            <span>Zero real PII collected • Synthetic test vectors only</span>
          </div>
        </div>
      </div>
    </footer>
  );
}