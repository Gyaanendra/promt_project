"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function MindlyHero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section
      className="hero-viewport"
      style={{
        position: "relative",
        overflow: "hidden",
        paddingTop: "28px",
        paddingBottom: "80px",
        width: "100%",
      }}
    >
      {/* FULL-WIDTH CONTAINER WITH FLUID GUTTERS */}
      <div
        style={{
          width: "100%",
          maxWidth: "1680px",
          margin: "0 auto",
          padding: "0 clamp(20px, 3.5vw, 64px)",
          position: "relative",
        }}
      >
        {/* TOP RIGHT ROTATING STAMP (Fixed fluidly to top-right flank) */}
        <div
          className="hero-stamp-seal desktop-only"
          style={{
            position: "absolute",
            top: "-12px",
            right: "clamp(20px, 3.5vw, 64px)",
            width: "94px",
            height: "94px",
            pointerEvents: "none",
            zIndex: 10,
          }}
        >
          <svg viewBox="0 0 100 100" className="rotating-stamp" style={{ width: "100%", height: "100%" }}>
            <path
              id="heroStampPath"
              d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
              fill="none"
            />
            <text fontSize="7.8" fontFamily="var(--font-mono)" fill="var(--color-graphite)" letterSpacing="2.6px">
              <textPath href="#heroStampPath">
                • DEFENSIVE AI LAB • OWASP COMPLIANT •
              </textPath>
            </text>
            <circle cx="50" cy="50" r="13" fill="var(--color-eggshell)" stroke="var(--color-stone)" strokeWidth="1" />
            {/* 4-point star in center */}
            <path
              d="M50 42C50 46.5 53.5 50 58 50C53.5 50 50 53.5 50 58C50 53.5 46.5 50 42 50C46.5 50 50 46.5 50 42Z"
              fill="var(--color-ink)"
            />
          </svg>
        </div>

        {/* CENTERED HEADLINE & SUBTITLE (Matching Mindly headline) */}
        <div style={{ textAlign: "center", maxWidth: "920px", margin: "0 auto 36px" }}>
          <h1
            className="hero-headline"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(44px, 6.2vw, 82px)",
              fontWeight: 400,
              lineHeight: 1.05,
              letterSpacing: "-0.025em",
              color: "var(--color-ink)",
              marginBottom: "20px",
            }}
          >
            A safer prompt
            <br />
            <em
              style={{
                fontStyle: "italic",
                fontWeight: 400,
                color: "var(--color-graphite)",
              }}
            >
              for a bulletproof bot.
            </em>
          </h1>

          <p
            style={{
              fontSize: "17px",
              lineHeight: 1.6,
              color: "var(--color-smoke)",
              maxWidth: "640px",
              margin: "0 auto 30px",
            }}
          >
            Guardrail Labs helps you stress-test prompts, eliminate vulnerabilities, and ensure compliance &mdash; all in one automated security lab.
          </p>

          {/* DUAL PILL BUTTONS (Matching Mindly CTAs) */}
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "14px", flexWrap: "wrap" }}>
            <Link
              href="/app"
              className="btn-pill btn-pill-primary"
              style={{ padding: "13px 30px", fontSize: "15px" }}
            >
              <span>Get started free</span>
              <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                <path d="M3.33334 8H12.6667M12.6667 8L8.66668 4M12.6667 8L8.66668 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>

            <a
              href="#interactive-demo"
              className="btn-pill btn-pill-secondary"
              style={{ padding: "13px 26px", fontSize: "15px" }}
            >
              {/* Play Icon */}
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.25"/>
                <polygon points="6.5,5 11.5,8 6.5,11" fill="currentColor"/>
              </svg>
              <span>See live audit</span>
            </a>
          </div>
        </div>

        {/* FULL-WIDTH HERO STAGE */}
        <div
          className="hero-stage"
          style={{
            position: "relative",
            width: "100%",
            minHeight: "640px",
            margin: "16px 0 0 0",
          }}
        >
          {/* FLUID BEZIER CONNECTOR STRINGS ACROSS FULL WIDTH */}
          <svg
            className="hero-bezier-lines desktop-only"
            viewBox="0 0 1000 640"
            preserveAspectRatio="none"
            fill="none"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              pointerEvents: "none",
              zIndex: 1,
            }}
          >
            {/* Left curve: From left card (~17%) to expanded centerpiece halo (~36%) */}
            <path
              d="M 170 240 C 240 240, 290 330, 360 360"
              stroke="#ebe8e4"
              strokeWidth="1.5"
              strokeDasharray="4 4"
            />
            {/* Right curve: From expanded centerpiece halo (~64%) to right card (~83%) */}
            <path
              d="M 640 360 C 710 330, 760 260, 830 260"
              stroke="#ebe8e4"
              strokeWidth="1.5"
              strokeDasharray="4 4"
            />
          </svg>

          {/* LEFT OUTER FLOATING CARD (Anchored to Left Flank) */}
          <div
            className="hero-floating-card-left desktop-only"
            style={{
              position: "absolute",
              top: "140px",
              left: "clamp(12px, 2.5vw, 44px)",
              width: "216px",
              backgroundColor: "rgba(253, 252, 252, 0.95)",
              backdropFilter: "blur(14px)",
              WebkitBackdropFilter: "blur(14px)",
              border: "1px solid var(--color-stone)",
              borderRadius: "20px",
              padding: "22px 20px",
              boxShadow: "var(--shadow-floating)",
              zIndex: 5,
            }}
          >
            {/* Waveform / Shield vector icon plate */}
            <div
              style={{
                width: "38px",
                height: "38px",
                borderRadius: "10px",
                backgroundColor: "var(--color-warm-taupe)",
                border: "1px solid var(--color-stone)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "14px",
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <line x1="4" y1="12" x2="4" y2="12" stroke="black" strokeWidth="2.5" strokeLinecap="round" />
                <line x1="8" y1="7" x2="8" y2="17" stroke="black" strokeWidth="2.5" strokeLinecap="round" />
                <line x1="12" y1="3" x2="12" y2="21" stroke="black" strokeWidth="2.5" strokeLinecap="round" />
                <line x1="16" y1="8" x2="16" y2="16" stroke="black" strokeWidth="2.5" strokeLinecap="round" />
                <line x1="20" y1="12" x2="20" y2="12" stroke="black" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </div>
            <h3 style={{ fontSize: "14px", fontWeight: 600, color: "var(--color-ink)", marginBottom: "6px", lineHeight: 1.35 }}>
              Turn vulnerabilities into defenses.
            </h3>
            <p style={{ fontSize: "12px", color: "var(--color-smoke)", lineHeight: 1.5, margin: 0 }}>
              Capture prompt leaks, persona overrides, and policy bypasses.
            </p>
          </div>

          {/* BOTTOM LEFT TRUST BADGE (Anchored to Bottom-Left Flank) */}
          <div
            className="hero-trust-left desktop-only"
            style={{
              position: "absolute",
              bottom: "32px",
              left: "clamp(12px, 2.5vw, 44px)",
              zIndex: 5,
            }}
          >
            <div style={{ width: "26px", height: "1px", backgroundColor: "var(--color-ash)", marginBottom: "10px" }} />
            <div style={{ fontSize: "12px", color: "var(--color-graphite)", fontWeight: 500, marginBottom: "8px" }}>
              Trusted by 500+ AI engineers worldwide.
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              {[
                { name: "DK", bg: "#f0ece7", color: "#2d2a26" },
                { name: "AA", bg: "#e6e9ed", color: "#1f2937" },
                { name: "GP", bg: "#ebede4", color: "#2d3326" },
                { name: "AG", bg: "#ede6ed", color: "#371f37" },
              ].map((av, i) => (
                <div
                  key={i}
                  style={{
                    width: "28px",
                    height: "28px",
                    borderRadius: "50%",
                    backgroundColor: av.bg,
                    color: av.color,
                    border: "2px solid var(--color-eggshell)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "10.5px",
                    fontWeight: 600,
                    marginLeft: i === 0 ? "0" : "-8px",
                  }}
                >
                  {av.name}
                </div>
              ))}
              <div
                style={{
                  width: "28px",
                  height: "28px",
                  borderRadius: "50%",
                  backgroundColor: "var(--color-warm-taupe)",
                  border: "2px solid var(--color-eggshell)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "11px",
                  color: "var(--color-graphite)",
                  fontWeight: 600,
                  marginLeft: "-8px",
                }}
              >
                +
              </div>
            </div>
          </div>

          {/* RIGHT OUTER FLOATING CARD (Anchored to Right Flank) */}
          <div
            className="hero-floating-card-right desktop-only"
            style={{
              position: "absolute",
              top: "160px",
              right: "clamp(12px, 2.5vw, 44px)",
              width: "216px",
              backgroundColor: "rgba(253, 252, 252, 0.95)",
              backdropFilter: "blur(14px)",
              WebkitBackdropFilter: "blur(14px)",
              border: "1px solid var(--color-stone)",
              borderRadius: "20px",
              padding: "22px 20px",
              boxShadow: "var(--shadow-floating)",
              zIndex: 5,
            }}
          >
            {/* Top Avatar Group */}
            <div style={{ display: "flex", alignItems: "center", marginBottom: "14px" }}>
              {[
                { name: "BD", bg: "#e8ece8" },
                { name: "ML", bg: "#eee8e4" },
                { name: "CX", bg: "#e6eaf0" },
              ].map((u, i) => (
                <div
                  key={i}
                  style={{
                    width: "26px",
                    height: "26px",
                    borderRadius: "50%",
                    backgroundColor: u.bg,
                    border: "1.5px solid var(--color-eggshell)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "9.5px",
                    fontWeight: 600,
                    marginLeft: i === 0 ? 0 : "-6px",
                  }}
                >
                  {u.name}
                </div>
              ))}
              <div
                style={{
                  width: "26px",
                  height: "26px",
                  borderRadius: "50%",
                  backgroundColor: "var(--color-warm-taupe)",
                  border: "1.5px solid var(--color-eggshell)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "10.5px",
                  marginLeft: "-6px",
                }}
              >
                +
              </div>
            </div>
            <h3 style={{ fontSize: "14px", fontWeight: 600, color: "var(--color-ink)", marginBottom: "6px", lineHeight: 1.35 }}>
              Audited prompts, anytime, anywhere.
            </h3>
            <p style={{ fontSize: "12px", color: "var(--color-smoke)", lineHeight: 1.5, margin: 0 }}>
              Continuous held-out validation across all bot deployments.
            </p>
          </div>

          {/* BOTTOM RIGHT ACCENT (Anchored to Bottom-Right Flank) */}
          <div
            className="hero-accent-right desktop-only"
            style={{
              position: "absolute",
              bottom: "32px",
              right: "clamp(12px, 2.5vw, 44px)",
              zIndex: 5,
              textAlign: "right",
            }}
          >
            <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "6px" }}>
              <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                <path
                  d="M8 0C8 4.41828 4.41828 8 0 8C4.41828 8 8 11.5817 8 16C8 11.5817 11.5817 8 16 8C11.5817 8 8 4.41828 8 0Z"
                  fill="var(--color-ink)"
                />
              </svg>
            </div>
            <div style={{ width: "32px", height: "1px", backgroundColor: "var(--color-ash)", marginLeft: "auto", marginBottom: "8px" }} />
            <div style={{ fontSize: "12px", color: "var(--color-smoke)", lineHeight: 1.4 }}>
              Less vulnerability.
              <br />
              More certainty.
            </div>
          </div>

          {/* EXPANDED CENTERPIECE: TRANSPARENT PNG WITH NO BACKGROUND */}
          <div
            className="hero-centerpiece"
            style={{
              position: "relative",
              width: "100%",
              maxWidth: "1040px",
              margin: "0 auto",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "flex-end",
              minHeight: "620px",
              zIndex: 3,
            }}
          >
            <div
              style={{
                position: "relative",
                width: "100%",
                maxWidth: "960px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                src="/hero/guardrail-centerpiece.png"
                alt="AI Prompt Security Researcher surrounded by 3D Guardrail Panels"
                style={{
                  width: "100%",
                  height: "auto",
                  maxHeight: "660px",
                  objectFit: "contain",
                  WebkitMaskImage: "linear-gradient(to bottom, black 88%, transparent 100%)",
                  maskImage: "linear-gradient(to bottom, black 88%, transparent 100%)",
                  filter: "drop-shadow(0 14px 34px rgba(0, 0, 0, 0.06)) contrast(1.02)",
                  transform: "scale(1.08)",
                  transformOrigin: "bottom center",
                }}
              />
            </div>
          </div>
        </div>

      </div>

      {/* RESPONSIVE CSS OVERRIDES */}
      <style jsx>{`
        @media (max-width: 1180px) {
          .desktop-only {
            display: none !important;
          }
          .hero-stage {
            min-height: 460px !important;
          }
          .hero-centerpiece {
            max-width: 600px !important;
          }
        }
        @media (max-width: 680px) {
          .hero-headline {
            font-size: 38px !important;
          }
          .hero-stage {
            min-height: 360px !important;
          }
          .hero-centerpiece {
            max-width: 100% !important;
          }
        }
      `}</style>
    </section>
  );
}
