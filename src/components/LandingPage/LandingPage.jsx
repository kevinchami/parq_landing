import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Hero from '../../components/Hero/Hero';
import MapSection from '../../components/MapSection/MapSection';
import Statistics from '../../components/Statistics/Statistics';
import TelegramBot from '../../components/TelegramBot/TelegramBot';
import Benefits from '../../components/Benefits/Benefits';
import Footer from '../../components/Footer/Footer';
import './LandingPage.css';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <Navbar />
      <main>
        <div id="home">
          <Hero />
        </div>
        <MapSection />
        <Statistics />
        <div id="telegram">
          <TelegramBot />
        </div>
        <div id="features">
          <Benefits />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;