import React, { useState, useEffect } from 'react';
import PageHeader from '../components/common/PageHeader';
import './PageStyles.css';

function PovesteaPage() {
  // 1. Create state variables to hold our data, loading status, and any errors
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 2. Use useEffect to fetch data when the component loads
  useEffect(() => {
    const fetchPageData = async () => {
      try {
        // This request will be proxied to http://localhost:8000/api/povestea
        const response = await fetch('/api/povestea');
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        
        const data = await response.json();
        setPageData(data); // Store the received data in our state
      } catch (err) {
        setError(err.message); // Store any error message
      } finally {
        setLoading(false); // We are done loading, whether it succeeded or failed
      }
    };

    fetchPageData();
  }, []); // The empty array [] means this effect runs only once

  // 3. Render content based on the current state
  const renderContent = () => {
    if (loading) {
      return <p className="loading">Se încarcă povestea noastră...</p>;
    }
    
    if (error) {
      return <p className="error">Eroare: {error}</p>;
    }
    
    if (pageData) {
      return (
        <div className="content-section">
          {/* We are now using the data from the API! */}
          <h2 className="content-title">{pageData.title}</h2>
          
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
          </div>
        </div>
      );
    }
    
    return null; // Return nothing if there's no data for some reason
  };

  return (
    <div className="page-container">
      <PageHeader pageTitle="Povestea noastra" />
      <main className="page-content">
        {renderContent()}
      </main>
    </div>
  );
}

export default PovesteaPage;