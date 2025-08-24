import React, { useState, useEffect } from 'react';
import PageHeader from '../components/common/PageHeader';
import './PageStyles.css';

function ProdusePage() {
  // States for API data
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // States for filtering
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchPageData = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/produse');
        if (!response.ok) throw new Error('Failed to fetch products');
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

  const getFilteredProducts = () => {
    if (!pageData?.categories) return [];
    let allProducts = pageData.categories.flatMap((cat) =>
      cat.subcategories.flatMap((sub) =>
        selectedCategory === null || selectedCategory === cat.id
          ? sub.products
          : []
      )
    );

    if (searchTerm) {
      allProducts = allProducts.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    return allProducts;
  };

  const filteredProducts = getFilteredProducts();

  const renderContent = () => {
    if (loading) return <p className="loading">Se încarcă produsele...</p>;
    if (error) return <p className="error">Eroare: {error}</p>;
    if (pageData)
      return (
        <div className="products-container">
          <aside className="filters-sidebar">
            <div className="filters-header">
              <h3>Filtre</h3>
              <button
                className="clear-filters-btn"
                onClick={() => {
                  setSelectedCategory(null);
                  setSearchTerm('');
                }}
              >
                Șterge filtrele
              </button>
            </div>
            <div className="filter-section">
              <h4>Căutare</h4>
              <input
                type="text"
                placeholder="Caută produse..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
            <div className="filter-section">
              <h4>Categorii</h4>
              <div className="categories-list">
                {pageData.categories.map((category) => (
                  <button
                    key={category.id}
                    className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
                    onClick={() =>
                      setSelectedCategory(
                        category.id === selectedCategory ? null : category.id
                      )
                    }
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
          </aside>
          <section className="products-display">
            <div className="products-header">
              <h2>
                {selectedCategory
                  ? pageData.categories.find((c) => c.id === selectedCategory)
                      .name
                  : 'Toate Produsele'}
              </h2>
              <p className="products-count">
                {filteredProducts.length} produse găsite
              </p>
            </div>
            {filteredProducts.length > 0 ? (
              <div className="products-grid">
                {filteredProducts.map((product) => (
                  <div key={product.id} className="product-card">
                    <div
                      className="product-image"
                      style={{ backgroundImage: `url(${product.image})` }}
                    ></div>
                    <div className="product-info">
                      <h3 className="product-name">{product.name}</h3>
                      <p className="product-description">
                        {product.description}
                      </p>
                      <div className="product-price">{product.price}</div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p>Nu s-au găsit produse cu filtrele selectate.</p>
            )}
          </section>
        </div>
      );
    return null;
  };

  return (
    <div className="page-container">
      <PageHeader pageTitle="Produsele noastre" />
      <main className="page-content">{renderContent()}</main>
    </div>
  );
}

export default ProdusePage;
