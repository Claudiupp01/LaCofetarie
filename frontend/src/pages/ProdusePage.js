import React, { useState, useEffect } from 'react';
import PageHeader from '../components/common/PageHeader';
import './PageStyles.css';

function ProdusePage({ onHomeClick }) {
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Filter states
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });

  useEffect(() => {
    fetchPageData();
  }, []);

  const fetchPageData = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/produse');
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      setPageData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Filter functions
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setSelectedSubcategory(null); // Reset subcategory when category changes
  };

  const handleSubcategorySelect = (subcategory) => {
    setSelectedSubcategory(subcategory);
  };

  const clearFilters = () => {
    setSelectedCategory(null);
    setSelectedSubcategory(null);
    setSearchTerm('');
    setPriceRange({ min: '', max: '' });
  };

  // Get filtered products
  const getFilteredProducts = () => {
    if (!pageData?.categories) return [];

    let products = [];
    
    // If category is selected, get products from that category
    if (selectedCategory) {
      const category = pageData.categories.find(cat => cat.id === selectedCategory);
      if (category) {
        if (selectedSubcategory) {
          // If subcategory is selected, get products from that subcategory
          const subcategory = category.subcategories.find(sub => sub.id === selectedSubcategory);
          if (subcategory) {
            products = subcategory.products;
          }
        } else {
          // If only category is selected, get all products from all subcategories
          category.subcategories.forEach(sub => {
            products = [...products, ...sub.products];
          });
        }
      }
    } else {
      // If no category selected, get all products from all categories
      pageData.categories.forEach(category => {
        category.subcategories.forEach(sub => {
          products = [...products, ...sub.products];
        });
      });
    }

    // Apply search filter
    if (searchTerm) {
      products = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply price filter
    if (priceRange.min || priceRange.max) {
      products = products.filter(product => {
        const price = parseFloat(product.price.replace(/[^\d.]/g, ''));
        if (priceRange.min && price < parseFloat(priceRange.min)) return false;
        if (priceRange.max && price > parseFloat(priceRange.max)) return false;
        return true;
      });
    }

    return products;
  };

  const filteredProducts = getFilteredProducts();

  if (loading) return <div className="page-container"><PageHeader pageTitle="Produse" onHomeClick={onHomeClick} /><p className="loading">Se încarcă produsele...</p></div>;
  if (error) return <div className="page-container"><PageHeader pageTitle="Produse" onHomeClick={onHomeClick} /><p className="error">Eroare: {error}</p></div>;

  return (
    <div className="page-container">
      <PageHeader pageTitle="Produse" onHomeClick={onHomeClick} />
      
      <main className="page-content">
        <div className="products-container">
          {/* Filters Section */}
          <aside className="filters-sidebar">
            <div className="filters-header">
              <h3>Filtre</h3>
              <button className="clear-filters-btn" onClick={clearFilters}>
                Șterge filtrele
              </button>
            </div>

            {/* Search Filter */}
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

            {/* Price Range Filter */}
            <div className="filter-section">
              <h4>Interval de preț (RON)</h4>
              <div className="price-inputs">
                <input
                  type="number"
                  placeholder="Min"
                  value={priceRange.min}
                  onChange={(e) => setPriceRange(prev => ({ ...prev, min: e.target.value }))}
                  className="price-input"
                />
                <span>-</span>
                <input
                  type="number"
                  placeholder="Max"
                  value={priceRange.max}
                  onChange={(e) => setPriceRange(prev => ({ ...prev, max: e.target.value }))}
                  className="price-input"
                />
              </div>
            </div>

            {/* Categories Filter */}
            <div className="filter-section">
              <h4>Categorii</h4>
              <div className="categories-list">
                {pageData?.categories?.map((category) => (
                  <div key={category.id} className="category-item">
                    <button
                      className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
                      onClick={() => handleCategorySelect(category.id)}
                    >
                      {category.name}
                    </button>
                    
                    {/* Subcategories */}
                    {selectedCategory === category.id && (
                      <div className="subcategories-list">
                        {category.subcategories.map((subcategory) => (
                          <button
                            key={subcategory.id}
                            className={`subcategory-btn ${selectedSubcategory === subcategory.id ? 'active' : ''}`}
                            onClick={() => handleSubcategorySelect(subcategory.id)}
                          >
                            {subcategory.name}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </aside>

          {/* Products Display */}
          <section className="products-display">
            <div className="products-header">
              <h2>Produse {selectedCategory && `- ${pageData.categories.find(c => c.id === selectedCategory)?.name}`} {selectedSubcategory && `- ${pageData.categories.find(c => c.id === selectedCategory)?.subcategories.find(s => s.id === selectedSubcategory)?.name}`}</h2>
              <p className="products-count">{filteredProducts.length} produse găsite</p>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="no-products">
                <p>Nu s-au găsit produse cu filtrele selectate.</p>
                <button className="clear-filters-btn" onClick={clearFilters}>
                  Șterge toate filtrele
                </button>
              </div>
            ) : (
              <div className="products-grid">
                {filteredProducts.map((product) => (
                  <div key={product.id} className="product-card">
                    <div className="product-image">
                      <img src={product.image} alt={product.name} />
                    </div>
                    <div className="product-info">
                      <h3 className="product-name">{product.name}</h3>
                      <p className="product-description">{product.description}</p>
                      <div className="product-price">{product.price}</div>
                      <button className="product-order-btn">Comandă</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}

export default ProdusePage;
