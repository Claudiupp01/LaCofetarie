import React, { useState, useEffect } from 'react';
import PageHeader from '../components/common/PageHeader';
import './PageStyles.css';

function PovesteaPage({ onHomeClick }) {
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPageData();
  }, []);

  const fetchPageData = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/povestea');
      if (!response.ok) {
        throw new Error('Failed to fetch page data');
      }
      const data = await response.json();
      setPageData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <PageHeader pageTitle="Povestea noastra" onHomeClick={onHomeClick} />
      
      <main className="page-content">
        {loading && <p className="loading">Se încarcă povestea noastră...</p>}
        {error && <p className="error">Eroare: {error}</p>}
        
        {pageData && (
          <div className="content-section">
            <h2 className="content-title">{pageData.title}</h2>
            <p className="content-description">{pageData.description}</p>
            <div className="content-body">
              <p>{pageData.content}</p>
              
              <div className="story-content">
                <h3>Începuturile noastre</h3>
                <p>
                  La Cofetarie a început ca o visare simplă în bucătăria bunicii noastre, 
                  unde aromele de vanilie și ciocolată se amestecau cu râsetele copilăriei. 
                  Fiecare rețetă transmisă din generație în generație aduce cu ea o poveste, 
                  o amintire, o emoție.
                </p>
                
                <h3>Pasiunea pentru perfecțiune</h3>
                <p>
                  În fiecare zi, echipa noastră dedicată transformă ingredientele cele mai 
                  proaspete în creații culinare care nu doar că satisfac pofta, ci și 
                  inima. Fiecare prăjitură, fiecare biscuit, fiecare bomboană este 
                  creată cu grijă și dragoste.
                </p>
                
                <h3>Viitorul nostru</h3>
                <p>
                  De la începuturile modeste până la ziua de azi, visul nostru rămâne 
                  același: să aducem bucurie și sărbători în fiecare casă prin 
                  dulciurile noastre delicioase.
                </p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default PovesteaPage;
