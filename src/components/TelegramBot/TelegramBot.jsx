import React from "react";
import "./TelegramBot.css";
import Button from "../Hero/Button/Button";

const TelegramBot = () => {
  const handleOpenTelegram = () => {
    window.open("https://t.me/parq_prices_bot", "_blank");
  };

  return (
    <section className="telegram-bot">
      <div className="container">
        <div className="telegram-content">
          <div className="telegram-mockup">
            <div className="telegram-window">
              <div className="telegram-header">
                <div className="telegram-avatar">🤖</div>
                <div className="telegram-info">
                  <h4>Parq Prices Bot</h4>
                  <span className="telegram-status">Online</span>
                </div>
              </div>

              <div className="telegram-messages">
                <div className="message bot">
                  <div className="message-bubble">
                    👋 Hey! I'm Parq Bot. Send me a location and I'll show you
                    nearby parking prices!
                  </div>
                </div>

                <div className="message user">
                  <div className="message-bubble">
                    📍 Dizengoff Center, Tel Aviv
                  </div>
                </div>

                <div className="message bot">
                  <div className="message-bubble">
                    Found 3 parking options near Dizengoff Center:
                    <div className="parking-list-telegram">
                      <div className="parking-item-telegram">
                        🅿️ Dizengoff Center Parking
                        <span className="price">₪20/hour</span>
                      </div>
                      <div className="parking-item-telegram">
                        🅿️ Gordon Beach Parking
                        <span className="price">₪15/hour</span>
                      </div>
                      <div className="parking-item-telegram">
                        🅿️ Ben Yehuda Street
                        <span className="price">₪12/hour</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>

              <div className="telegram-input">
                <input type="text" placeholder="Type a message..." />
                <button
                  className="send-button"
                  onClick={(e) => {
                    e.preventDefault();
                    window.open("https://t.me/parq_prices_bot", "_blank");
                  }}
                >
                  ➤
                </button>
              </div>
            </div>
          </div>

          <div className="telegram-info-section">
            <div className="telegram-badge">
              <svg width="40" height="40" viewBox="0 0 240 240" fill="none">
                <circle cx="120" cy="120" r="120" fill="#3498db" />
                <path
                  d="M182 76L164 167c-1.3 6.5-5.3 8.1-10.8 5.1l-30-22.1-14.5 14
       c-1.6 1.6-3 3-6.2 3l2.2-31.3 57-51.6c2.5-2.3-.5-3.6-3.9-1.3l-70 44.1-30.2-9.4
       c-6.6-2.1-6.7-6.6 1.4-9.8l117.8-45.4c5.4-2 10.1 1.3 8.3 9.6Z"
                  fill="white"
                />
              </svg>

              <span>Telegram Bot</span>
            </div>

            <h2>Get Parking Prices on Telegram</h2>
            <p className="telegram-description">
              No app? No problem! Use our Telegram bot to get instant parking
              prices. Just send a location and get real-time parking information
              directly in your chat.
            </p>

            <div className="telegram-features">
              <div className="feature">
                <span className="feature-icon">⚡</span>
                <span className="feature-text">Instant responses</span>
              </div>
              <div className="feature">
                <span className="feature-icon">📍</span>
                <span className="feature-text">Location-based search</span>
              </div>
              <div className="feature">
                <span className="feature-icon">💰</span>
                <span className="feature-text">Real-time prices</span>
              </div>
              <div className="feature">
                <span className="feature-icon">🔄</span>
                <span className="feature-text">Always updated</span>
              </div>
            </div>

            <Button variant="primary" size="large" onClick={handleOpenTelegram}>
              Start Chat with @parq_prices_bot
            </Button>

            <p className="telegram-hint">
              Click to open Telegram and start chatting
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TelegramBot;
