import React from 'react';
import '../styles/LandingPage.css';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <main className="main-content">
        <section className="hero">
          <div className="hero-text">
            <h1>Welcome to MyHealth</h1>
            <p>Your health, our priority. Explore our services and get the best care.</p>
            <a href="/appointments" className="cta-button">Book an Appointment</a>
          </div>
        </section>
        <section className="features">
          <div className="container">
            <h2>Our Services</h2>
            <div className="feature-cards">
              <div className="feature-card">
                <h3>Expert Doctors</h3>
                <p>Our team of experienced doctors is here to provide you with the best medical care.</p>
              </div>
              <div className="feature-card">
                <h3>Comprehensive Care</h3>
                <p>We offer a range of services to ensure all your healthcare needs are met.</p>
              </div>
              <div className="feature-card">
                <h3>Convenient Appointments</h3>
                <p>Book and manage your appointments easily with our user-friendly system.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default LandingPage;
