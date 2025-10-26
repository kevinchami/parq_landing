import React, { useState, useEffect, useRef } from 'react';
import './Statistics.css';

const Statistics = () => {
  const [isVisible, setIsVisible] = useState(false);
  const statsRef = useRef(null);
  
  const stats = [
    { 
      id: 1, 
      number: 50, 
      suffix: '+',
      label: 'Parking lots with prices in Israel', 
      icon: '🅿️',
      color: 'secondary' 
    },
    { 
      id: 2, 
      number: 200, 
      suffix: '+',
      label: 'Total searches', 
      icon: '🔍',
      color: 'accent' 
    },
    { 
      id: 3, 
      number: 95, 
      suffix: '%',
      label: 'User satisfaction', 
      icon: '⭐',
      color: 'success' 
    },
    { 
      id: 4, 
      number: 24, 
      suffix: '/7',
      label: 'Available support', 
      icon: '🕐',
      color: 'primary' 
    },
  ];

  // Intersection Observer for animation trigger
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => {
      if (statsRef.current) {
        observer.unobserve(statsRef.current);
      }
    };
  }, []);

  return (
    <section className="statistics" ref={statsRef}>
      <div className="container">
        <div className="section-header">
          <h2>Parq by the Numbers</h2>
          <p>Growing every day to make parking easier for everyone</p>
        </div>

        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div 
              key={stat.id} 
              className={`stat-card ${isVisible ? 'animate' : ''}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="stat-icon">{stat.icon}</div>
              <div className="stat-content">
                <CountUp 
                  end={stat.number} 
                  suffix={stat.suffix}
                  isVisible={isVisible}
                  color={stat.color}
                />
                <p className="stat-label">{stat.label}</p>
              </div>
              <div className={`stat-background ${stat.color}`}></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Counter animation component
const CountUp = ({ end, suffix = '', isVisible, color }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    let current = 0;
    const increment = end / 50; // Divide into 50 steps
    const timer = setInterval(() => {
      current += increment;
      if (current >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, 30); // 30ms per step

    return () => clearInterval(timer);
  }, [end, isVisible]);

  return (
    <div className={`stat-number ${color}`}>
      {count}{suffix}
    </div>
  );
};

export default Statistics;