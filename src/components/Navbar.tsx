"use client";

import { useState } from "react";
import Link from "next/link";

interface NavbarProps {
  current?: "landing" | "app";
}

export default function Navbar({ current = "landing" }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        backgroundColor: "rgba(253, 252, 252, 0.92)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderBottom: "none", // Explicitly borderless per design
        height: "54px",
        display: "flex",
        alignItems: "center",
        transition: "all 0.2s ease",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "1520px",
          margin: "0 auto",
          padding: "0 clamp(16px, 3vw, 48px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Minimalist Brand Logo & Wordmark */}
        <Link
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            textDecoration: "none",
            color: "var(--color-ink)",
            zIndex: 60,
          }}
          onClick={() => setMobileMenuOpen(false)}
        >
          {/* Bauhaus Architectural Glyph */}
          <div
            style={{
              width: "20px",
              height: "20px",
              border: "1.5px solid var(--color-ink)",
              borderRadius: "4px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: "5px",
                height: "5px",
                borderRadius: "50%",
                backgroundColor: "var(--color-ink)",
              }}
            />
          </div>
          <span style={{ fontWeight: 600, fontSize: "14.5px", letterSpacing: "-0.015em" }}>
            Guardrail Labs
          </span>
        </Link>

        {/* Desktop Inline Navigation */}
        {current === "landing" ? (
          <nav
            className="nav-desktop-links"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "28px",
            }}
          >
            <a
              href="#threats"
              style={{
                fontSize: "13px",
                color: "var(--color-graphite)",
                textDecoration: "none",
                fontWeight: 450,
                transition: "color 0.15s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-ink)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-graphite)")}
            >
              Taxonomy
            </a>
            <a
              href="#studio-overview"
              style={{
                fontSize: "13px",
                color: "var(--color-graphite)",
                textDecoration: "none",
                fontWeight: 450,
                transition: "color 0.15s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-ink)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-graphite)")}
            >
              Studio
            </a>
            <a
              href="#interactive-demo"
              style={{
                fontSize: "13px",
                color: "var(--color-graphite)",
                textDecoration: "none",
                fontWeight: 450,
                transition: "color 0.15s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-ink)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-graphite)")}
            >
              Live Audit
            </a>
            <a
              href="#benchmarks"
              style={{
                fontSize: "13px",
                color: "var(--color-graphite)",
                textDecoration: "none",
                fontWeight: 450,
                transition: "color 0.15s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-ink)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-graphite)")}
            >
              Benchmarks
            </a>
            <a
              href="/ContextWindow_TechnicalReport.pdf"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: "13px",
                color: "var(--color-graphite)",
                textDecoration: "none",
                fontWeight: 450,
                transition: "color 0.15s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-ink)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-graphite)")}
            >
              Report (PDF)
            </a>
          </nav>
        ) : (
          <nav className="nav-desktop-links" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ fontSize: "12.5px", color: "var(--color-smoke)", fontFamily: "var(--font-mono)" }}>
              Interactive Security Studio
            </span>
          </nav>
        )}

        {/* Right CTA and Mobile Hamburger Button */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          {current === "landing" ? (
            <Link
              href="/app"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                backgroundColor: "var(--color-ink)",
                color: "var(--color-eggshell)",
                padding: "6px 14px",
                borderRadius: "9999px",
                fontSize: "12.5px",
                fontWeight: 500,
                textDecoration: "none",
                transition: "all 0.15s ease",
                whiteSpace: "nowrap",
              }}
            >
              <span className="cta-full-label">Launch Studio</span>
              <span className="cta-short-label">Studio</span>
              <svg width="11" height="11" viewBox="0 0 16 16" fill="none">
                <path
                  d="M3.33334 8H12.6667M12.6667 8L8.66668 4M12.6667 8L8.66668 12"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          ) : (
            <Link
              href="/"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                backgroundColor: "transparent",
                color: "var(--color-ink)",
                padding: "5px 14px",
                borderRadius: "9999px",
                border: "1px solid var(--color-stone)",
                fontSize: "12.5px",
                fontWeight: 500,
                textDecoration: "none",
                transition: "all 0.15s ease",
              }}
            >
              <span>Back</span>
            </Link>
          )}

          {/* Mobile Hamburger Toggle Button */}
          {current === "landing" && (
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="nav-mobile-toggle"
              aria-label="Toggle navigation menu"
              style={{
                display: "none",
                width: "34px",
                height: "34px",
                borderRadius: "8px",
                border: "1px solid var(--color-stone)",
                backgroundColor: "rgba(255, 255, 255, 0.8)",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                padding: "6px",
              }}
            >
              <div style={{ display: "flex", flexDirection: "column", gap: "4px", width: "16px" }}>
                <span
                  style={{
                    height: "1.75px",
                    width: "100%",
                    backgroundColor: "var(--color-ink)",
                    transition: "transform 0.2s ease",
                    transform: mobileMenuOpen ? "translateY(5.75px) rotate(45deg)" : "none",
                  }}
                />
                <span
                  style={{
                    height: "1.75px",
                    width: "100%",
                    backgroundColor: "var(--color-ink)",
                    transition: "opacity 0.2s ease",
                    opacity: mobileMenuOpen ? 0 : 1,
                  }}
                />
                <span
                  style={{
                    height: "1.75px",
                    width: "100%",
                    backgroundColor: "var(--color-ink)",
                    transition: "transform 0.2s ease",
                    transform: mobileMenuOpen ? "translateY(-5.75px) rotate(-45deg)" : "none",
                  }}
                />
              </div>
            </button>
          )}
        </div>
      </div>

      {/* ==================== MOBILE SLIDE-DOWN DRAWER ==================== */}
      {mobileMenuOpen && (
        <div
          className="mobile-nav-drawer"
          style={{
            position: "absolute",
            top: "54px",
            left: 0,
            right: 0,
            backgroundColor: "rgba(253, 252, 252, 0.98)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            borderBottom: "1px solid var(--color-stone)",
            padding: "20px 24px 28px",
            boxShadow: "0 16px 36px rgba(0,0,0,0.08)",
            display: "flex",
            flexDirection: "column",
            gap: "18px",
            zIndex: 49,
          }}
        >
          <a
            href="#threats"
            onClick={() => setMobileMenuOpen(false)}
            style={{ fontSize: "15px", fontWeight: 500, color: "var(--color-ink)", textDecoration: "none" }}
          >
            Threat Taxonomy
          </a>
          <a
            href="#studio-overview"
            onClick={() => setMobileMenuOpen(false)}
            style={{ fontSize: "15px", fontWeight: 500, color: "var(--color-ink)", textDecoration: "none" }}
          >
            Adversarial Studio
          </a>
          <a
            href="#interactive-demo"
            onClick={() => setMobileMenuOpen(false)}
            style={{ fontSize: "15px", fontWeight: 500, color: "var(--color-ink)", textDecoration: "none" }}
          >
            Live Comparison Audit
          </a>
          <a
            href="#benchmarks"
            onClick={() => setMobileMenuOpen(false)}
            style={{ fontSize: "15px", fontWeight: 500, color: "var(--color-ink)", textDecoration: "none" }}
          >
            Academic Benchmarks
          </a>
          <a
            href="/ContextWindow_TechnicalReport.pdf"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileMenuOpen(false)}
            style={{ fontSize: "15px", fontWeight: 500, color: "var(--color-ink)", textDecoration: "none" }}
          >
            Technical Report (PDF)
          </a>
          <div style={{ paddingTop: "8px", borderTop: "1px solid var(--color-stone)" }}>
            <Link
              href="/app"
              onClick={() => setMobileMenuOpen(false)}
              className="btn-pill btn-pill-primary"
              style={{ width: "100%", justifyContent: "center" }}
            >
              <span>Launch Studio</span>
              <span>→</span>
            </Link>
          </div>
        </div>
      )}

      {/* Responsive CSS for Navbar */}
      <style jsx>{`
        .cta-short-label {
          display: none;
        }
        @media (max-width: 860px) {
          .nav-desktop-links {
            display: none !important;
          }
          .nav-mobile-toggle {
            display: inline-flex !important;
          }
          .cta-full-label {
            display: none;
          }
          .cta-short-label {
            display: inline;
          }
        }
      `}</style>
    </header>
  );
}
