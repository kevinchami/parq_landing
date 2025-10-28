import React from "react";
import "./Footer.css";
import { openIosApp } from "../../utils/functions";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-logo">Parq</h3>
            <p className="footer-tagline">Real-Time Parking Prices</p>
            <p className="footer-description">
              Stop guessing, start saving. The smart way to find and compare
              parking prices.
            </p>
          </div>

          <div className="footer-section">
            <h4>Download</h4>
            <div className="download-badges">
              <a
                onClick={openIosApp}
                className="app-badge"
                style={{ cursor: "pointer" }}
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Download_on_the_App_Store_Badge.svg/640px-Download_on_the_App_Store_Badge.svg.png"
                  alt="Download on App Store"
                />
              </a>

              <div className="coming-soon-badge">
                <span>Android</span>
                <span className="badge-label">Coming Soon</span>
              </div>
            </div>
          </div>

          <div className="footer-section">
            <h4>Connect</h4>
            <div className="social-links">
              <a
                href="https://t.me/parq_prices_bot"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.161c-.18.717-1.513 6.362-1.853 7.802-.144.608-.427.811-.701.831-.598.045-1.052-.394-1.631-.773-.906-.593-1.418-.962-2.298-1.54-1.016-.667-.357-1.033.222-1.632.151-.156 2.776-2.545 2.826-2.762.007-.027.013-.127-.047-.18-.061-.053-.15-.035-.215-.02-.092.021-1.553.986-4.382 2.896-.415.284-.79.423-1.126.416-.371-.008-1.084-.21-1.614-.382-.65-.21-1.166-.321-1.121-.678.023-.186.281-.376.773-.57 3.031-1.321 5.052-2.192 6.061-2.613 2.891-1.206 3.491-1.416 3.884-1.423.086-.001.279.02.404.122.105.085.134.2.148.28.014.08.031.261.017.403z" />
                </svg>
                Telegram Bot
              </a>
            </div>
          </div>

          <div className="footer-section">
            <h4>Contact</h4>
            <p className="contact-info">
              Questions or feedback?
              <br />
              We'd love to hear from you!
            </p>
            <a href="mailto:support@parqapp.io" className="contact-email">
              parq.app.info@gmail.com
            </a>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {currentYear} Parq. All rights reserved.</p>
          <div className="footer-links">
            <a href="#">Privacy Policy</a>
            <span className="separator">•</span>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
