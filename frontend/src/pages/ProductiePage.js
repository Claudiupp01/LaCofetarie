import React, { useState, useEffect } from 'react';
import PageHeader from '../components/common/PageHeader';
import './PageStyles.css';

function ProductiePage({ onHomeClick }) {
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPageData();
  }, []);

  const fetchPageData = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/productie');
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
      <PageHeader pageTitle="Productie" onHomeClick={onHomeClick} />
      
      <main className="page-content">
        {loading && <p className="loading">Se încarcă informațiile despre producție...</p>}
        {error && <p className="error">Eroare: {error}</p>}
        
        {pageData && (
          <div className="content-section">
            <h2 className="content-title">{pageData.title}</h2>
            <p className="content-description">{pageData.description}</p>
            <div className="content-body">
              <p>{pageData.content}</p>
              
              <div className="production-content">
                <h3>Ingrediente de calitate superioară</h3>
                <p>
                  Folosim doar ingredientele cele mai proaspete și de cea mai înaltă 
                  calitate. Fiecare component este selectat cu grijă pentru a asigura 
                  gustul și textura perfectă a produselor noastre.
                </p>
                
                <h3>Procesul nostru unic</h3>
                <p>
                  Fiecare rețetă este preparată manual, cu atenție la fiecare detaliu. 
                  De la amestecarea ingredientelor până la decorarea finală, fiecare 
                  pas este executat cu pasiune și dedicare.
                </p>
                
                <h3>Controlul calității</h3>
                <p>
                  În fiecare zi, echipa noastră de control al calității verifică 
                  fiecare produs pentru a ne asigura că îndeplinește standardele 
                  noastre înalte de excelență.
                </p>
                
                <h3>Sustenabilitate</h3>
                <p>
                  Ne străduim să reducem impactul asupra mediului prin folosirea 
                  materialelor reciclabile și prin optimizarea proceselor de producție.
                </p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default ProductiePage;
