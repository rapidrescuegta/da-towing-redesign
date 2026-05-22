import Link from "next/link";

// Custom branded 404. Visitors land here for any missing route and get the
// dispatch phone number front-and-centre rather than a generic Next default.

export default function NotFound() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(ellipse at top, #151D35 0%, #070B14 60%)",
        color: "#FAF8F0",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "32px",
        fontFamily:
          "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      }}
    >
      <div style={{ maxWidth: 520, textAlign: "center" }}>
        <div
          style={{
            display: "inline-block",
            padding: "8px 14px",
            borderRadius: 8,
            background: "linear-gradient(135deg,#F5C842,#D4A017,#B8860B)",
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
            fontSize: 72,
            fontWeight: 900,
            margin: "0 0 4px",
            background:
              "linear-gradient(135deg,#F5C842,#D4A017,#B8860B)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            letterSpacing: "-0.04em",
          }}
        >
          404
        </h1>
        <h2
          style={{
            fontSize: 24,
            fontWeight: 800,
            margin: "0 0 12px",
            letterSpacing: "-0.02em",
          }}
        >
          That page is off the road.
        </h2>
        <p style={{ color: "#CBD5E1", margin: "0 0 28px", fontSize: 15 }}>
          The link you followed doesn&apos;t exist anymore. Need a tow?
          Our dispatch line is open 24/7.
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
              background: "linear-gradient(135deg,#F5C842,#D4A017,#B8860B)",
              color: "#070B14",
              fontWeight: 700,
              textDecoration: "none",
              fontSize: 15,
            }}
          >
            Call 705-795-0993
          </a>
          <Link
            href="/"
            style={{
              padding: "12px 22px",
              borderRadius: 14,
              background: "transparent",
              color: "#FAF8F0",
              border: "1px solid #243054",
              fontWeight: 600,
              fontSize: 15,
              textDecoration: "none",
            }}
          >
            Back to home
          </Link>
        </div>
      </div>
    </main>
  );
}
