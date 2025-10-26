import React from 'react';
import './Benefits.css';

const Benefits = () => {
  const benefits = [
    {
      id: 1,
      icon: '💰',
      title: 'Save Money',
      description: 'Compare prices instantly and choose the most affordable parking option. Stop overpaying for parking.',
      color: 'success'
    },
    {
      id: 2,
      icon: '⚡',
      title: 'Save Time',
      description: 'No more driving in circles. Find available parking spots near your destination in seconds.',
      color: 'secondary'
    },
    {
      id: 3,
      icon: '📱',
      title: 'Real-Time Updates',
      description: 'Get live pricing updates and availability status. Prices change, and we keep you informed.',
      color: 'accent'
    },
    {
      id: 4,
      icon: '🗺️',
      title: 'Navigate with Ease',
      description: 'Get turn-by-turn directions to your chosen parking spot. Arrive stress-free every time.',
      color: 'primary'
    },
    {
      id: 5,
      icon: '🏆',
      title: 'Earn Rewards',
      description: 'Upload parking price photos and earn credits. Help the community while getting benefits.',
      color: 'warning'
    },
    {
      id: 6,
      icon: '🛡️',
      title: 'Park with Peace of Mind',
      description: 'Know exactly what you\'ll pay before you park. No hidden fees, no surprises.',
      color: 'danger'
    }
  ];

  return (
    <section className="benefits">
      <div className="container">
        <div className="section-header">
          <h2>Why Choose Parq?</h2>
          <p>Smart parking decisions start with the right information</p>
        </div>

        <div className="benefits-grid">
          {benefits.map((benefit, index) => (
            <div 
              key={benefit.id} 
              className={`benefit-card ${benefit.color}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="benefit-icon">{benefit.icon}</div>
              <h3>{benefit.title}</h3>
              <p>{benefit.description}</p>
              <div className="benefit-decoration"></div>
            </div>
          ))}
        </div>

        <div className="benefits-cta">
          <h3>Ready to park smarter?</h3>
          <p>Join thousands of drivers who are already saving time and money with Parq</p>
        </div>
      </div>
    </section>
  );
};

export default Benefits;