"use client";

import { useLanguage } from "@/components/LanguageContext";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();

  return (
    <footer
      id="footer"
      style={{
        borderTop: "1px solid var(--card-border)",
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
            style={{ fontSize: "1.15rem", fontWeight: "900", fontFamily: "var(--font-outfit)", letterSpacing: "-0.03em", color: "var(--fg-color)" }}
          >
            Yichi<span style={{ color: "var(--orange)" }}>.</span>
          </a>
          <p style={{ color: "var(--fg-subtle)", fontSize: "0.82rem", fontWeight: "500" }}>
            Data Engineer · Changhua, Taiwan
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
                style={{ color: "var(--fg-subtle)", fontSize: "0.85rem", fontWeight: "600", transition: "color 0.2s", letterSpacing: "0.03em" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--orange)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--fg-subtle)")}
              >
                {link.label}
              </a>
            ))}
          </div>
          <p style={{ color: "var(--fg-subtle)", fontSize: "0.78rem" }}>
            © {currentYear} Yichi Nien. {t("footer_text")}
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
