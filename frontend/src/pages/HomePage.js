import React from 'react';
import './HomePage.css';
import WelcomeSection from '../components/HomePageComponents/WelcomeSection';
import CreationsSection from '../components/HomePageComponents/CreationsSection';
import AboutSection from '../components/HomePageComponents/AboutSection';

const HomePage = () => {
  return (
    <main className="app-main">
      <WelcomeSection />
      <CreationsSection />
      <AboutSection />
    </main>
  );
};

export default HomePage;
