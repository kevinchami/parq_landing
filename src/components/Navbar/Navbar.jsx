import React, { useState, useEffect } from "react";
import "./Navbar.css";
import Button from "../Hero/Button/Button";
import { openIosApp } from "../../utils/functions";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className={`navbar ${isScrolled ? "scrolled" : ""}`}>
      <div className="container">
        <div className="navbar-content">
          <div className="navbar-brand">
            <h1 className="logo">Parq</h1>
            <span className="logo-tagline">Smart Parking</span>
          </div>

          <div className={`navbar-menu ${isMobileMenuOpen ? "active" : ""}`}>
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("home");
              }}
            >
              Home
            </a>
            <a
              href="#map-section"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("map-section");
              }}
            >
              Live Map
            </a>
            <a
              href="#features"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("features");
              }}
            >
              Features
            </a>
            <a
              href="#telegram"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("telegram");
              }}
            >
              Telegram Bot
            </a>
            <Button
              variant="accent"
              size="small"
              onClick={() => openIosApp()}
            >
              Get App
            </Button>
          </div>

          <button
            className="mobile-menu-toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
