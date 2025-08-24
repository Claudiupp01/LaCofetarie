import React, { useState } from 'react'; // Import useState here
import './CreationsSection.css'; // We will add styles here

const CreationsSection = () => {
  // All carousel logic now lives inside this component
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 5;

  const handleCarouselNext = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const handleCarouselPrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  };

  const handleDotClick = (index) => {
    setCurrentSlide(index);
  };

  return (
    <section className="bakery-showcase">
      <h2 className="showcase-title">Creațiile noastre</h2>
      <div className="pastry-grid">
        <div className="pastry-card">
          <div className="cake-carousel">
            <button
              className="carousel-arrow carousel-left"
              onClick={handleCarouselPrev}
            >
              ‹
            </button>
            <div className="carousel-container">
              <div
                className="carousel-track"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                <div className="carousel-slide">
                  <img src="/images/cakes/blue cake.jpeg" alt="Blue Cake" />
                </div>
                <div className="carousel-slide">
                  <img src="/images/cakes/brown cake.jpeg" alt="Brown Cake" />
                </div>
                <div className="carousel-slide">
                  <img src="/images/cakes/dark cake.jpeg" alt="Dark Cake" />
                </div>
                <div className="carousel-slide">
                  <img src="/images/cakes/pink cake.jpeg" alt="Pink Cake" />
                </div>
                <div className="carousel-slide">
                  <img src="/images/cakes/purple cake.jpeg" alt="Purple Cake" />
                </div>
              </div>
            </div>
            <button
              className="carousel-arrow carousel-right"
              onClick={handleCarouselNext}
            >
              ›
            </button>
            <div className="carousel-dots">
              {[...Array(totalSlides).keys()].map((index) => (
                <span
                  key={index}
                  className={`carousel-dot ${currentSlide === index ? 'active' : ''}`}
                  onClick={() => handleDotClick(index)}
                />
              ))}
            </div>
          </div>
          <h3>Prăjituri de casă</h3>
          <p>
            Rețete tradiționale românești transmise din generație în generație
          </p>
        </div>

        {/* The other pastry cards */}
        <div className="pastry-card">
          <div className="pastry-image cake-2"></div>
          <h3>Torturi de nuntă</h3>
          <p>Creații unice pentru momentele tale speciale</p>
        </div>
        <div className="pastry-card">
          <div className="pastry-image cake-3"></div>
          <h3>Biscuiți artizanali</h3>
          <p>Fiecare biscuit este o operă de artă culinară</p>
        </div>
        <div className="pastry-card">
          <div className="pastry-image cake-4"></div>
          <h3>Bomboane handmade</h3>
          <p>Dulciuri rafinate cu ingrediente de cea mai înaltă calitate</p>
        </div>
        <div className="pastry-card">
          <div className="pastry-image cake-5"></div>
          <h3>Croissante proaspete</h3>
          <p>Croissante cu unt, preparate zilnic în bucătăria noastră</p>
        </div>
        <div className="pastry-card">
          <div className="pastry-image cake-6"></div>
          <h3>Eclere clasice</h3>
          <p>Eclere cu cremă de vanilie și glazură de ciocolată</p>
        </div>
      </div>
    </section>
  );
};

export default CreationsSection;
