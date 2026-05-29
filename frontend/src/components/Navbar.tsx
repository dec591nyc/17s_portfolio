"use client";

import { useState, useEffect } from "react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "Projects", href: "#projects" },
    { name: "Skills", href: "#skills" },
    { name: "Experience", href: "#experience" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <nav
      id="navbar"
      style={{
        position: "fixed",
        top: 0, left: 0, right: 0,
        zIndex: 1000,
        padding: isScrolled ? "12px 5%" : "22px 5%",
        background: isScrolled ? "rgba(160, 157, 152, 0.92)" : "transparent",
        backdropFilter: isScrolled ? "blur(14px)" : "none",
        borderBottom: isScrolled ? "1px solid rgba(100,97,93,0.25)" : "1px solid transparent",
        boxShadow: isScrolled ? "0 2px 16px rgba(0,0,0,0.12)" : "none",
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
          color: "#1c1a17",
        }}
      >
        <span style={{
          width: "36px", height: "36px", borderRadius: "8px",
          background: "var(--orange)",
          display: "flex", justifyContent: "center", alignItems: "center",
          color: "#ffffff", fontWeight: "900", fontSize: "0.85rem",
          letterSpacing: "-0.02em",
        }}>
          EN
        </span>
        <span style={{ color: "#1c1a17" }}>Ethan<span style={{ color: "var(--orange)" }}>.</span></span>
      </a>

      {/* Desktop Nav */}
      <div style={{ display: "flex", gap: "28px", alignItems: "center" }} className="desktop-menu">
        {navLinks.map((link) => (
          <a
            key={link.name}
            id={`nav-link-${link.name.toLowerCase()}`}
            href={link.href}
            style={{
              fontSize: "0.82rem", fontWeight: "700", color: "#3d3b38",
              letterSpacing: "0.06em", textTransform: "uppercase",
              transition: "color 0.2s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--orange)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#3d3b38")}
          >
            {link.name}
          </a>
        ))}
        <a
          id="nav-cta"
          href="https://au.linkedin.com/in/zifuera17n9"
          target="_blank" rel="noreferrer"
          style={{
            padding: "9px 22px", borderRadius: "6px",
            background: "var(--olive)", color: "#ffffff",
            fontSize: "0.80rem", fontWeight: "700",
            letterSpacing: "0.06em", textTransform: "uppercase",
            transition: "all 0.3s ease",
            boxShadow: "0 2px 8px rgba(107,124,62,0.22)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "var(--olive-dark)";
            e.currentTarget.style.boxShadow = "0 4px 18px rgba(107,124,62,0.40)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "var(--olive)";
            e.currentTarget.style.boxShadow = "0 2px 8px rgba(107,124,62,0.22)";
          }}
        >
          Hire Me
        </a>
      </div>

      {/* Hamburger */}
      <button
        id="mobile-menu-toggle"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        aria-label="Toggle Navigation"
        style={{ display: "none", flexDirection: "column", gap: "5px", padding: "4px" }}
      >
        {[0, 1, 2].map((i) => (
          <span key={i} style={{ width: "22px", height: "2px", background: "#1c1a17", borderRadius: "2px", display: "block" }} />
        ))}
      </button>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div
          id="mobile-menu"
          style={{
            position: "fixed", top: 0, left: 0,
            width: "100vw", height: "100vh",
            backgroundColor: "var(--bg-color)",
            display: "flex", flexDirection: "column", justifyContent: "center",
            alignItems: "center", gap: "28px", zIndex: 999,
          }}
        >
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} onClick={() => setIsMobileMenuOpen(false)}
              style={{ fontSize: "2rem", fontWeight: "800", color: "#1c1a17", letterSpacing: "-0.02em" }}>
              {link.name}
            </a>
          ))}
          <a href="#contact" onClick={() => setIsMobileMenuOpen(false)}
            style={{ padding: "14px 36px", borderRadius: "6px", background: "var(--olive)", color: "#fff", fontSize: "1rem", fontWeight: "700" }}>
            Hire Me
          </a>
        </div>
      )}

      <style jsx global>{`
        @media (max-width: 768px) {
          .desktop-menu { display: none !important; }
          #mobile-menu-toggle { display: flex !important; }
        }
      `}</style>
    </nav>
  );
}
