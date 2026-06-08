"use client";

import { useState, useEffect } from "react";
import { useTheme } from "@/components/ThemeContext";
import { useLanguage } from "@/components/LanguageContext";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { locale, setLocale, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: t("nav_home"), href: "#home" },
    { name: t("nav_projects"), href: "#projects" },
    { name: t("nav_skills"), href: "#skills" },
    { name: t("nav_background"), href: "#experience" },
    { name: t("nav_contact"), href: "#contact" },
  ];

  const handleLanguageToggle = () => {
    setLocale(locale === "en" ? "zh" : "en");
  };

  return (
    <nav
      id="navbar"
      data-baseweb="navbar"
      style={{
        position: "fixed",
        top: 0, left: 0, right: 0,
        zIndex: 1000,
        padding: isScrolled ? "12px 5%" : "22px 5%",
        background: isScrolled ? "var(--bg-card)" : "transparent",
        backdropFilter: isScrolled ? "blur(14px)" : "none",
        borderBottom: isScrolled ? "1px solid var(--card-border)" : "1px solid transparent",
        boxShadow: isScrolled ? "var(--card-shadow)" : "none",
        transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      {/* Brand */}
      <a
        href="#home"
        style={{
          fontSize: "1.25rem", fontWeight: "800",
          fontFamily: "var(--font-outfit)", letterSpacing: "-0.03em",
          display: "flex", alignItems: "center", gap: "10px",
          color: "var(--fg-color)",
        }}
      >
        <span style={{
          width: "36px", height: "36px", borderRadius: "8px",
          background: "var(--orange)",
          display: "flex", justifyContent: "center", alignItems: "center",
          color: "#ffffff", fontWeight: "900", fontSize: "0.85rem",
          letterSpacing: "-0.02em",
        }}>
          YN
        </span>
        <span style={{ color: "var(--fg-color)" }}>
          Yichi<span style={{ color: "var(--orange)" }}>.</span>
        </span>
      </a>

      {/* Desktop Nav */}
      <div style={{ display: "flex", gap: "20px", alignItems: "center" }} className="desktop-menu" data-baseweb="tab-list">
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            data-baseweb="tab"
            style={{
              fontSize: "0.82rem", fontWeight: "700", color: "var(--fg-muted)",
              letterSpacing: "0.06em", textTransform: "uppercase",
              transition: "color 0.2s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--orange)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--fg-muted)")}
          >
            {link.name}
          </a>
        ))}

        {/* Vertical Divider */}
        <div style={{ width: "1px", height: "18px", background: "var(--card-border)" }} />

        {/* Theme Switcher Button */}
        <button
          onClick={toggleTheme}
          aria-label="Toggle Theme"
          data-baseweb="button"
          style={{
            width: "34px", height: "34px", borderRadius: "50%",
            display: "flex", alignItems: "center", justifyContent: "center",
            border: "1px solid var(--card-border)",
            background: "var(--bg-card-inner)",
            color: "var(--fg-color)",
            cursor: "pointer",
            fontSize: "0.95rem",
            boxShadow: "var(--card-shadow)",
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "var(--orange)";
            e.currentTarget.style.transform = "scale(1.08)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "var(--card-border)";
            e.currentTarget.style.transform = "scale(1)";
          }}
        >
          {theme === "light" ? "🌙" : "☀️"}
        </button>

        {/* Language Toggle Button */}
        <button
          onClick={handleLanguageToggle}
          aria-label="Toggle Language"
          data-baseweb="button"
          style={{
            padding: "6px 12px", borderRadius: "20px",
            display: "flex", alignItems: "center", gap: "4px",
            border: "1px solid var(--card-border)",
            background: "var(--bg-card-inner)",
            color: "var(--fg-color)",
            cursor: "pointer",
            fontSize: "0.78rem", fontWeight: "700",
            boxShadow: "var(--card-shadow)",
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "var(--olive)";
            e.currentTarget.style.transform = "scale(1.04)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "var(--card-border)";
            e.currentTarget.style.transform = "scale(1)";
          }}
        >
          🌐 {locale === "en" ? "繁中" : "EN"}
        </button>

        {/* CTA */}
        <a
          id="nav-cta"
          href="https://au.linkedin.com/in/zifuera17n9"
          target="_blank" rel="noreferrer"
          data-baseweb="button"
          style={{
            padding: "9px 22px", borderRadius: "6px",
            background: "var(--olive)", color: "#ffffff",
            fontSize: "0.80rem", fontWeight: "700",
            letterSpacing: "0.06em", textTransform: "uppercase",
            transition: "all 0.3s ease",
            boxShadow: "0 2px 8px var(--olive-glow)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "var(--olive-dark)";
            e.currentTarget.style.boxShadow = "0 4px 18px var(--olive-glow)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "var(--olive)";
            e.currentTarget.style.boxShadow = "0 2px 8px var(--olive-glow)";
          }}
        >
          {t("nav_hire_me")}
        </a>
      </div>

      {/* Hamburger Menu & Toggles for Mobile */}
      <div style={{ display: "none", alignItems: "center", gap: "10px" }} className="mobile-actions">
        {/* Theme Switcher Button */}
        <button
          onClick={toggleTheme}
          aria-label="Toggle Theme"
          data-baseweb="button"
          style={{
            width: "30px", height: "30px", borderRadius: "50%",
            display: "flex", alignItems: "center", justifyContent: "center",
            border: "1px solid var(--card-border)",
            background: "var(--bg-card-inner)",
            color: "var(--fg-color)",
            cursor: "pointer",
            fontSize: "0.85rem",
          }}
        >
          {theme === "light" ? "🌙" : "☀️"}
        </button>

        {/* Language Toggle Button */}
        <button
          onClick={handleLanguageToggle}
          aria-label="Toggle Language"
          data-baseweb="button"
          style={{
            padding: "4px 10px", borderRadius: "20px",
            display: "flex", alignItems: "center", gap: "2px",
            border: "1px solid var(--card-border)",
            background: "var(--bg-card-inner)",
            color: "var(--fg-color)",
            cursor: "pointer",
            fontSize: "0.72rem", fontWeight: "700",
          }}
        >
          🌐 {locale === "en" ? "繁中" : "EN"}
        </button>

        {/* Hamburger Toggle */}
        <button
          id="mobile-menu-toggle"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle Navigation"
          data-baseweb="button"
          style={{ display: "flex", flexDirection: "column", gap: "5px", padding: "4px" }}
        >
          {[0, 1, 2].map((i) => (
            <span key={i} style={{ width: "22px", height: "2px", background: "var(--fg-color)", borderRadius: "2px", display: "block" }} />
          ))}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div
          id="mobile-menu"
          data-baseweb="tab-list"
          style={{
            position: "fixed", top: 0, left: 0,
            width: "100vw", height: "100vh",
            backgroundColor: "var(--bg-color)",
            display: "flex", flexDirection: "column", justifyContent: "center",
            alignItems: "center", gap: "28px", zIndex: 999,
          }}
        >
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setIsMobileMenuOpen(false)}
              data-baseweb="tab"
              style={{ fontSize: "2rem", fontWeight: "800", color: "var(--fg-color)", letterSpacing: "-0.02em" }}>
              {link.name}
            </a>
          ))}
          <a href="#contact" onClick={() => setIsMobileMenuOpen(false)}
            data-baseweb="button"
            style={{ padding: "14px 36px", borderRadius: "6px", background: "var(--olive)", color: "#fff", fontSize: "1rem", fontWeight: "700" }}>
            {t("nav_hire_me")}
          </a>
        </div>
      )}

      <style jsx global>{`
        @media (max-width: 900px) {
          .desktop-menu { display: none !important; }
          .mobile-actions { display: flex !important; }
        }
      `}</style>
    </nav>
  );
}
