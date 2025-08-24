import React from 'react';
import './AboutSection.css'; // We will add styles here

const AboutSection = () => {
  return (
    <section className="welcome-section">
      <h2>Despre La Cofetarie</h2>
      <p>
        La Cofetarie este locul unde tradiția se întâlnește cu inovația, 
        unde fiecare produs este creat cu pasiune și dedicare. 
        Folosim doar ingredientele cele mai proaspete și de cea mai înaltă calitate 
        pentru a vă aduce gusturile copilăriei și a crea amintiri dulci.
      </p>
      <div className="features-highlight">
        <div className="feature-item"><span className="feature-icon">🌟</span><h4>Calitate superioară</h4><p>Ingrediente proaspete și rețete tradiționale</p></div>
        <div className="feature-item"><span className="feature-icon">🎨</span><h4>Design personalizat</h4><p>Fiecare produs este unic și creat special pentru tine</p></div>
        <div className="feature-item"><span className="feature-icon">❤️</span><h4>Pasiune și dragoste</h4><p>Pregătim fiecare dulce cu inima și cu grijă</p></div>
      </div>
    </section>
  );
};

export default AboutSection;