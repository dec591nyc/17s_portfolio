"use client";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      id="footer"
      style={{
        borderTop: "1px solid rgba(100,97,93,0.30)",
        background: "var(--bg-secondary)",
        padding: "36px 5%",
      }}
    >
      <div
        style={{
          maxWidth: "1200px", margin: "0 auto",
          display: "flex", justifyContent: "space-between",
          alignItems: "center", flexWrap: "wrap", gap: "20px",
        }}
        className="footer-content"
      >
        {/* Branding */}
        <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
          <a
            href="#home"
            style={{ fontSize: "1.15rem", fontWeight: "900", fontFamily: "var(--font-outfit)", letterSpacing: "-0.03em", color: "#1c1a17" }}
          >
            Yichi<span style={{ color: "var(--orange)" }}>.</span>
          </a>
          <p style={{ color: "#6b6865", fontSize: "0.82rem", fontWeight: "500" }}>
            Data Engineer · Adelaide, Australia
          </p>
        </div>

        {/* Links & copyright */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "10px" }} className="footer-rights">
          <div style={{ display: "flex", gap: "20px" }}>
            {[
              { label: "GitHub", href: "https://github.com/dec591nyc" },
              { label: "LinkedIn", href: "https://au.linkedin.com/in/zifuera17n9" },
            ].map((link) => (
              <a
                key={link.label}
                id={`footer-${link.label.toLowerCase()}-link`}
                href={link.href} target="_blank" rel="noreferrer"
                style={{ color: "#6b6865", fontSize: "0.85rem", fontWeight: "600", transition: "color 0.2s", letterSpacing: "0.03em" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--orange)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#6b6865")}
              >
                {link.label}
              </a>
            ))}
          </div>
          <p style={{ color: "#6b6865", fontSize: "0.78rem" }}>
            © {currentYear} Yichi Nien. All rights reserved.
          </p>
        </div>
      </div>

      <style jsx global>{`
        @media (max-width: 600px) {
          .footer-content { flex-direction: column !important; text-align: center; align-items: center !important; }
          .footer-rights { align-items: center !important; }
        }
      `}</style>
    </footer>
  );
}
