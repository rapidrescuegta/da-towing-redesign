"use client";

// Custom global error boundary. Must define its own <html>/<body> because it
// replaces the root layout when an uncaught error reaches it. NOTE: as of
// Next 16.2.6 the synthetic /_global-error prerender still crashes upstream
// (React.useContext-null in useUntrackedPathname); this component is the
// runtime-rendered version users actually see when an error fires in prod.

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Surface to the browser console so Giuseppe / dispatch can copy it.
    console.error("[global-error]", error);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          background:
            "radial-gradient(ellipse at top, #151D35 0%, #070B14 60%)",
          color: "#FAF8F0",
          fontFamily:
            "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "32px",
        }}
      >
        <div style={{ maxWidth: 520, textAlign: "center" }}>
          <div
            style={{
              display: "inline-block",
              padding: "8px 14px",
              borderRadius: 8,
              background:
                "linear-gradient(135deg,#F5C842,#D4A017,#B8860B)",
              color: "#070B14",
              fontWeight: 700,
              fontSize: 14,
              letterSpacing: "0.05em",
              marginBottom: 24,
            }}
          >
            D&amp;A TOWING
          </div>
          <h1
            style={{
              fontSize: 32,
              fontWeight: 900,
              margin: "0 0 12px",
              letterSpacing: "-0.02em",
            }}
          >
            Something went wrong.
          </h1>
          <p style={{ color: "#CBD5E1", margin: "0 0 28px", fontSize: 15 }}>
            We hit an unexpected error. If you need a tow right now, call our
            24/7 dispatch line — we&apos;ll take care of you.
          </p>
          <div
            style={{
              display: "flex",
              gap: 12,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <a
              href="tel:7057950993"
              style={{
                display: "inline-block",
                padding: "12px 22px",
                borderRadius: 14,
                background:
                  "linear-gradient(135deg,#F5C842,#D4A017,#B8860B)",
                color: "#070B14",
                fontWeight: 700,
                textDecoration: "none",
                fontSize: 15,
              }}
            >
              Call 705-795-0993
            </a>
            <button
              type="button"
              onClick={() => reset()}
              style={{
                padding: "12px 22px",
                borderRadius: 14,
                background: "transparent",
                color: "#FAF8F0",
                border: "1px solid #243054",
                fontWeight: 600,
                fontSize: 15,
                cursor: "pointer",
              }}
            >
              Try again
            </button>
          </div>
          {error?.digest && (
            <p
              style={{
                color: "#64748B",
                fontSize: 11,
                marginTop: 28,
                fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
              }}
            >
              ref: {error.digest}
            </p>
          )}
        </div>
      </body>
    </html>
  );
}
