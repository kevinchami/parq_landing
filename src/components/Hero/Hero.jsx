import React from "react";
import "./Hero.css";
import PhoneMockup from "../PhoneMockup/PhoneMockup";
import Button from "./Button/Button";
import { openIosApp } from "../../utils/functions";

const Hero = () => {
  return (
    <section className="hero">
      <div className="container">
        <div className="hero-content">
          <div className="hero-text animate-slideInLeft">
            <h1 className="hero-title">
              Stop guessing.
              <br />
              <span className="highlight">Start saving.</span>
            </h1>
            <p className="hero-tagline">
              Real-Time Parking Prices at your fingertips
            </p>
            <p className="hero-description">
              Parq shows you real-time updated parking rates so you can compare,
              save money and park smarter. No more surprises, just smart parking
              decisions.
            </p>
            <div className="hero-buttons">
              <Button variant="primary" size="large" onClick={() => openIosApp()}>
                Download Parq
              </Button>
              <Button
                variant="secondary"
                size="large"
                onClick={() =>
                  document
                    .getElementById("map-section")
                    .scrollIntoView({ behavior: "smooth" })
                }
              >
                See it in action
              </Button>
            </div>
            <div className="hero-stats">
              <div className="stat">
                <span className="stat-number">50+</span>
                <span className="stat-label">Parking lots</span>
              </div>
              <div className="stat">
                <span className="stat-number">200+</span>
                <span className="stat-label">Total searches</span>
              </div>
            </div>
          </div>
          <div className="hero-mockup animate-slideInRight">
            <PhoneMockup />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
