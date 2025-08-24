import React, { useState, useEffect } from 'react';
import PageHeader from '../components/common/PageHeader';
import './PageStyles.css';

function ProductiePage() {
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPageData = async () => {
      try {
        const response = await fetch('/api/productie');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setPageData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPageData();
  }, []);

  const renderContent = () => {
    if (loading) return <p className="loading">Se încarcă informațiile despre producție...</p>;
    if (error) return <p className="error">Eroare: {error}</p>;
    if (pageData) return (
      <div className="content-section">
        <h2 className="content-title">{pageData.title}</h2>
        <div className="production-content">
          <h3>Ingrediente de calitate superioară</h3>
          <p>Folosim doar ingredientele cele mai proaspete și de cea mai înaltă calitate...</p>
          <h3>Procesul nostru unic</h3>
          <p>Fiecare rețetă este preparată manual, cu atenție la fiecare detaliu...</p>
        </div>
      </div>
    );
    return null;
  };

  return (
    <div className="page-container">
      <PageHeader pageTitle="Producție" />
      <main className="page-content">
        {renderContent()}
      </main>
    </div>
  );
}

export default ProductiePage;