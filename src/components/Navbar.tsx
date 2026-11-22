import Link from "next/link";

interface NavbarProps {
  current?: "landing" | "app";
}

export default function Navbar({ current = "landing" }: NavbarProps) {
  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        backgroundColor: "rgba(253, 252, 252, 0.92)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderBottom: "1px solid var(--color-stone)",
        height: "64px",
        display: "flex",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "1640px",
          margin: "0 auto",
          padding: "0 clamp(20px, 3.5vw, 64px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Brand Logo & Wordmark */}
        <Link
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            textDecoration: "none",
            color: "var(--color-ink)",
          }}
        >
          {/* Bauhaus Geometric Symbol */}
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <rect x="2" y="2" width="20" height="20" rx="4" stroke="black" strokeWidth="1.75" />
            <circle cx="12" cy="12" r="5" stroke="black" strokeWidth="1.75" />
            <line x1="12" y1="2" x2="12" y2="7" stroke="black" strokeWidth="1.75" />
            <line x1="12" y1="17" x2="12" y2="22" stroke="black" strokeWidth="1.75" />
            <circle cx="12" cy="12" r="1.5" fill="var(--color-ember-orange)" />
          </svg>
          <span style={{ fontWeight: 600, fontSize: "16px", letterSpacing: "-0.02em" }}>
            Guardrail Labs
          </span>
          <span className="tag-pill" style={{ fontSize: "10px", padding: "2px 8px" }}>
            v2.0
          </span>
        </Link>

        {/* Center Nav Pills (on Landing page) */}
        {current === "landing" ? (
          <nav
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              backgroundColor: "var(--color-warm-taupe)",
              padding: "4px 8px",
              borderRadius: "var(--radius-full)",
              border: "1px solid var(--color-stone)",
            }}
            className="desktop-only"
          >
            <a href="#threats" className="btn-pill btn-pill-ghost" style={{ fontSize: "13px", padding: "5px 12px" }}>
              Threat Taxonomy
            </a>
            <a href="#architecture" className="btn-pill btn-pill-ghost" style={{ fontSize: "13px", padding: "5px 12px" }}>
              Architecture
            </a>
            <a href="#interactive-demo" className="btn-pill btn-pill-ghost" style={{ fontSize: "13px", padding: "5px 12px" }}>
              Live Demo
            </a>
            <a href="#benchmarks" className="btn-pill btn-pill-ghost" style={{ fontSize: "13px", padding: "5px 12px" }}>
              Benchmarks
            </a>
          </nav>
        ) : (
          <nav style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ fontSize: "13px", color: "var(--color-smoke)" }}>
              Automated Red-Teaming Studio
            </span>
          </nav>
        )}

        {/* Action Button */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          {current === "landing" ? (
            <Link href="/app" className="btn-pill btn-pill-primary">
              <span>Launch Studio</span>
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M3.33334 8H12.6667M12.6667 8L8.66668 4M12.6667 8L8.66668 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          ) : (
            <Link href="/" className="btn-pill btn-pill-secondary">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M12.6667 8H3.33334M3.33334 8L7.33334 12M3.33334 8L7.33334 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>Back to Overview</span>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
