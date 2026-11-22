"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export default function DefenseSphere() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // 1. Entrance animation
      gsap.fromTo(
        ".floating-card",
        { scale: 0.88, y: 20, autoAlpha: 0 },
        {
          scale: 1,
          y: 0,
          autoAlpha: 1,
          stagger: 0.12,
          duration: 0.85,
          ease: "back.out(1.5)",
          clearProps: "transform,opacity,visibility",
        }
      );

      gsap.fromTo(
        ".central-defense-lock",
        { scale: 0.75, autoAlpha: 0 },
        {
          scale: 1,
          autoAlpha: 1,
          duration: 1.1,
          ease: "elastic.out(1, 0.6)",
          clearProps: "transform,opacity,visibility",
        }
      );

      // 2. Rotating Stamp Seal (Continuous 360 loop)
      gsap.to(".rotating-stamp", {
        rotation: 360,
        duration: 24,
        repeat: -1,
        ease: "none",
        transformOrigin: "center center",
      });

      // 3. Central Topological Core Mesh (Slow harmonic counter-rotation)
      gsap.to(".topological-core-mesh", {
        rotation: -360,
        duration: 45,
        repeat: -1,
        ease: "none",
        transformOrigin: "160px 160px",
      });

      // 4. Subtle Outer Guardrail Orbit Breathing Loop
      gsap.to(".topological-orbit-ring", {
        scale: 1.03,
        duration: 3.6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        transformOrigin: "160px 160px",
      });

      // 5. Purposeful Floating Cards Ambient Levitation Loops
      gsap.to(".floating-card-tl", {
        y: -8,
        duration: 3.4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(".floating-card-bl", {
        y: 7,
        duration: 4.1,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 0.35,
      });

      gsap.to(".floating-card-tr", {
        y: -9,
        duration: 3.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 0.2,
      });

      gsap.to(".floating-card-br", {
        y: 6,
        duration: 4.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 0.55,
      });
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        width: "100%",
        maxWidth: "680px",
        margin: "0 auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "460px",
      }}
    >
      {/* Background Radial Glow */}
      <div
        style={{
          position: "absolute",
          width: "420px",
          height: "420px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(245, 243, 241, 0.95) 0%, rgba(253, 252, 252, 0) 70%)",
          zIndex: 1,
          pointerEvents: "none",
        }}
      />

      {/* Central Bauhaus Defense Sphere / Topological Mesh Artwork */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          width: "320px",
          height: "320px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg
          width="320"
          height="320"
          viewBox="0 0 320 320"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ width: "100%", height: "100%" }}
        >
          <defs>
            {/* Violet Spark to Ember Orange Radial Gradient as defined in Style Reference */}
            <radialGradient
              id="sphereGradient"
              cx="45%"
              cy="45%"
              r="55%"
              fx="35%"
              fy="35%"
            >
              <stop offset="0%" stopColor="#ff4704" stopOpacity="0.85" />
              <stop offset="42%" stopColor="#7a34ff" stopOpacity="0.75" />
              <stop offset="85%" stopColor="#0447ff" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0.95" />
            </radialGradient>

            <filter id="whisperBlur" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="24" result="blur" />
            </filter>
          </defs>

          {/* Compass / Architectural Crosshairs */}
          <line x1="20" y1="160" x2="300" y2="160" stroke="#ebe8e4" strokeWidth="1" strokeDasharray="3 3" />
          <line x1="160" y1="20" x2="160" y2="300" stroke="#ebe8e4" strokeWidth="1" strokeDasharray="3 3" />

          {/* Subtle Outer Guardrail Orbit Rings */}
          <circle className="topological-orbit-ring" cx="160" cy="160" r="148" stroke="#ebe8e4" strokeWidth="1" />
          <circle cx="160" cy="160" r="132" stroke="#ebe8e4" strokeWidth="1" strokeDasharray="4 4" />
          <circle cx="160" cy="160" r="110" stroke="#000000" strokeWidth="0.75" strokeOpacity="0.15" />

          {/* Glowing Product Spark Sphere */}
          <circle
            cx="160"
            cy="160"
            r="88"
            fill="url(#sphereGradient)"
            filter="url(#whisperBlur)"
            opacity="0.32"
          />

          {/* Core Generative Ink Mesh (Bauhaus generative structure) */}
          <g className="topological-core-mesh" transform="rotate(15 160 160)">
            <ellipse cx="160" cy="160" rx="92" ry="76" stroke="black" strokeWidth="1.25" fill="none" opacity="0.85" />
            <ellipse cx="160" cy="160" rx="76" ry="92" stroke="black" strokeWidth="1.25" fill="none" opacity="0.85" />
            <ellipse cx="160" cy="160" rx="60" ry="60" stroke="black" strokeWidth="1.5" fill="none" />
            <ellipse cx="160" cy="160" rx="94" ry="40" stroke="#44403b" strokeWidth="0.8" fill="none" strokeDasharray="2 3" />
            <ellipse cx="160" cy="160" rx="40" ry="94" stroke="#44403b" strokeWidth="0.8" fill="none" strokeDasharray="2 3" />
          </g>

          {/* Concentric Guardrail Nodes */}
          <circle cx="160" cy="68" r="4" fill="#0447ff" />
          <circle cx="252" cy="160" r="4" fill="#ff4704" />
          <circle cx="160" cy="252" r="4" fill="black" />
          <circle cx="68" cy="160" r="4" fill="#0447ff" />

          {/* Center Guardrail Lock Indicator */}
          <g className="central-defense-lock">
            <circle cx="160" cy="160" r="32" fill="#fdfcfc" stroke="black" strokeWidth="1.75" />
            <path
              d="M154 157V152C154 148.686 156.686 146 160 146C163.314 146 166 148.686 166 152V157M151 157H169C170.105 157 171 157.895 171 159V170C171 171.105 170.105 172 169 172H151C149.895 172 149 171.105 149 170V159C149 157.895 149.895 157 151 157Z"
              stroke="black"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        </svg>

        {/* Rotating Circular Stamp Seal */}
        <div
          style={{
            position: "absolute",
            top: "-32px",
            right: "-40px",
            width: "88px",
            height: "88px",
            pointerEvents: "none",
          }}
        >
          <svg
            viewBox="0 0 100 100"
            className="rotating-stamp"
            style={{ width: "100%", height: "100%" }}
          >
            <path
              id="stampPath"
              d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
              fill="none"
            />
            <text fontSize="8.2" fontFamily="var(--font-mono)" fill="var(--color-graphite)" letterSpacing="2.5px">
              <textPath href="#stampPath">
                • DEFENSIVE AI LAB • OWASP COMPLIANT •
              </textPath>
            </text>
            <circle cx="50" cy="50" r="12" fill="var(--color-warm-taupe)" stroke="var(--color-stone)" strokeWidth="1" />
            <path d="M50 44V56M44 50H56" stroke="black" strokeWidth="1.5" />
          </svg>
        </div>
      </div>

      {/* Floating Glassmorphic Pill Cards */}
      
      {/* 1. Top Left: Injection Shield */}
      <div
        className="floating-card floating-card-tl"
        style={{
          position: "absolute",
          top: "30px",
          left: "0",
          zIndex: 4,
          maxWidth: "240px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
          <strong style={{ fontSize: "13px", fontWeight: 600 }}>Injection Shield</strong>
        </div>
        <p style={{ fontSize: "12px", color: "var(--color-smoke)", lineHeight: 1.4 }}>
          <strong>71.4%</strong> drop in attack success on held-out tests.
        </p>
      </div>

      {/* 2. Bottom Left: Canary Vault */}
      <div
        className="floating-card floating-card-bl"
        style={{
          position: "absolute",
          bottom: "35px",
          left: "20px",
          zIndex: 4,
          maxWidth: "250px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
          <span
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              backgroundColor: "var(--color-ember-orange)",
            }}
          />
          <strong style={{ fontSize: "13px", fontWeight: 600 }}>Canary Detection</strong>
        </div>
        <p style={{ fontSize: "12px", color: "var(--color-smoke)", lineHeight: 1.4 }}>
          Deterministic extraction check: zero false negatives on hidden secrets.
        </p>
      </div>

      {/* 3. Top Right: Over-Refusal Check */}
      <div
        className="floating-card floating-card-tr"
        style={{
          position: "absolute",
          top: "40px",
          right: "0",
          zIndex: 4,
          maxWidth: "240px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
          </svg>
          <strong style={{ fontSize: "13px", fontWeight: 600 }}>Zero Over-Refusal</strong>
        </div>
        <p style={{ fontSize: "12px", color: "var(--color-smoke)", lineHeight: 1.4 }}>
          Legitimate in-scope queries answered helpfully without blanket refusals.
        </p>
      </div>

      {/* 4. Bottom Right: Multi-Model Isolation */}
      <div
        className="floating-card floating-card-br"
        style={{
          position: "absolute",
          bottom: "25px",
          right: "10px",
          zIndex: 4,
          maxWidth: "240px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
          <span
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              backgroundColor: "var(--color-violet-spark)",
            }}
          />
          <strong style={{ fontSize: "13px", fontWeight: 600 }}>Anti-Bias Scoring</strong>
        </div>
        <p style={{ fontSize: "12px", color: "var(--color-smoke)", lineHeight: 1.4 }}>
          Isolated model family for judge. Self-grading completely eliminated.
        </p>
      </div>
    </div>
  );
}
