"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <main
      style={{
        position: "relative",
        width: "100vw",
        minHeight: "100vh",
        backgroundColor: "#ffffff",
        color: "#0a0a0a",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "clamp(16px, 2.5vw, 36px) clamp(20px, 4vw, 56px)",
        userSelect: "none",
        fontFamily: "var(--font-sans, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif)",
        boxSizing: "border-box",
        overflowX: "hidden",
      }}
    >
      {/* ==================== TOP BAR ==================== */}
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          zIndex: 20,
        }}
      >
        {/* Brand Lockup */}
        <Link
          href="/"
          style={{
            textDecoration: "none",
            color: "#0a0a0a",
            display: "inline-flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <div
            style={{
              width: "22px",
              height: "22px",
              border: "1.75px solid #0a0a0a",
              borderRadius: "4px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "#0a0a0a" }} />
          </div>
          <span style={{ fontSize: "14px", fontWeight: 700, letterSpacing: "-0.015em" }}>
            Guardrail Labs
          </span>
        </Link>

        {/* Monospace Error Badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontSize: "11px",
            fontFamily: "var(--font-mono, monospace)",
            color: "#55504a",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            border: "1px solid #ebe8e4",
            padding: "5px 14px",
            borderRadius: "9999px",
            backgroundColor: "#faf8f5",
          }}
        >
          <span
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              backgroundColor: "#e02e24",
              display: "inline-block",
              boxShadow: "0 0 8px rgba(224, 46, 36, 0.4)",
            }}
          />
          <span>Status 404 • Route Swept Away</span>
        </div>
      </header>

      {/* ==================== CENTER STAGE: COMBINED EDITORIAL COMPOSITION ==================== */}
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          maxWidth: "1380px",
          margin: "0 auto",
          position: "relative",
          zIndex: 10,
          padding: "clamp(12px, 2vw, 28px) 0",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "clamp(24px, 4vw, 56px)",
            width: "100%",
          }}
        >
          {/* LEFT: Punchy Editorial Headline & Copy from Image 2 */}
          <div
            style={{
              flex: "1 1 360px",
              maxWidth: "460px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "flex-start",
              zIndex: 15,
            }}
          >
            {/* Bold Headline */}
            <h1
              style={{
                fontSize: "clamp(68px, 8.5vw, 116px)",
                fontWeight: 900,
                lineHeight: 0.88,
                letterSpacing: "-0.045em",
                color: "#0a0a0a",
                margin: "0 0 clamp(18px, 2.4vw, 32px) 0",
              }}
            >
              F*ck!
            </h1>

            {/* Subtitle Message */}
            <p
              style={{
                fontSize: "clamp(16px, 1.8vw, 20px)",
                fontWeight: 400,
                lineHeight: 1.48,
                color: "#4a453e",
                margin: "0 0 16px 0",
                letterSpacing: "-0.01em",
              }}
            >
              It looks like mom has been cleaning our website again so we can&apos;t find this page at the moment.
            </p>

            <p
              style={{
                fontSize: "clamp(13.5px, 1.3vw, 15px)",
                fontWeight: 400,
                lineHeight: 1.5,
                color: "#857e75",
                margin: "0 0 clamp(24px, 3.2vw, 40px) 0",
              }}
            >
              If you would be so kind as to go back until we find it. Thanks!
            </p>

            {/* Red Action Link with Animated Arrow */}
            <Link
              href="/"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                color: "#e02e24",
                textDecoration: "none",
                fontSize: "clamp(17px, 1.8vw, 20px)",
                fontWeight: 700,
                letterSpacing: "-0.015em",
                padding: "8px 0",
                transition: "all 0.18s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#b81e15";
                const arrow = e.currentTarget.querySelector(".nav-arrow-icon") as HTMLElement;
                if (arrow) arrow.style.transform = "translateX(5px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "#e02e24";
                const arrow = e.currentTarget.querySelector(".nav-arrow-icon") as HTMLElement;
                if (arrow) arrow.style.transform = "translateX(0)";
              }}
            >
              <svg
                className="nav-arrow-icon"
                width="20"
                height="20"
                viewBox="0 0 16 16"
                fill="none"
                style={{
                  display: "inline-block",
                  transition: "transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
                }}
              >
                <path
                  d="M3.33334 8H12.6667M12.6667 8L8.66668 4M12.6667 8L8.66668 12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span
                style={{
                  borderBottom: "2px solid currentColor",
                  paddingBottom: "3px",
                }}
              >
                Go back
              </span>
            </Link>
          </div>

          {/* RIGHT: Combined Monumental Artwork (404 Newspaper Man + 1950s Vacuum Mom) */}
          <div
            style={{
              flex: "1 1 520px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              maxHeight: "calc(100vh - 180px)",
            }}
          >
            <div
              style={{
                position: "relative",
                width: "100%",
                maxWidth: "840px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                src="/404/combined-404.png?v=2"
                alt="404 Error Collage: Businessman hiding behind newspaper titled OH NO! IT'S inside 404, with 1950s mom vacuuming the numerals"
                style={{
                  width: "100%",
                  height: "auto",
                  maxHeight: "calc(100vh - 190px)",
                  objectFit: "contain",
                  filter: "contrast(1.05) brightness(0.99)",
                  userSelect: "none",
                  pointerEvents: "none",
                  border: "none",
                  outline: "none",
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ==================== BOTTOM BASELINE ==================== */}
      <footer
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "16px",
          width: "100%",
          paddingTop: "14px",
          borderTop: "1px solid #f0ede8",
          fontSize: "12px",
          color: "#999288",
          zIndex: 20,
        }}
      >
        <div>
          <span>Guardrail Labs</span>
          <span style={{ margin: "0 8px" }}>•</span>
          <span>SCSE4041 Prompt Engineering</span>
          <span style={{ margin: "0 8px" }}>•</span>
          <span>Problem Pool C23</span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <Link href="/" style={{ color: "#33312e", textDecoration: "none", fontWeight: 500 }}>
            Home
          </Link>
          <Link href="/app" style={{ color: "#33312e", textDecoration: "none", fontWeight: 500 }}>
            Launch Studio
          </Link>
          <a
            href="/ContextWindow_TechnicalReport.pdf"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#33312e", textDecoration: "none", fontWeight: 500 }}
          >
            Technical Report (PDF)
          </a>
        </div>
      </footer>
    </main>
  );
}
