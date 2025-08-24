import React, { useState, useEffect } from 'react';
import PageHeader from '../components/common/PageHeader';
import './PageStyles.css';

function ContactPage() {
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPageData = async () => {
      try {
        const response = await fetch('/api/contact');
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
    if (loading)
      return <p className="loading">Se încarcă informațiile de contact...</p>;
    if (error) return <p className="error">Eroare: {error}</p>;
    if (pageData)
      return (
        <div className="content-section">
          <h2 className="content-title">{pageData.title}</h2>
          <p
            style={{ textAlign: 'center', lineHeight: 1.7, fontSize: '1.1rem' }}
          >
            {pageData.description}
          </p>
          <div className="contact-content">
            <div className="contact-info">
              <h3>Informații de contact</h3>
              <div className="contact-item">
                <strong>Adresa:</strong>
                <p>
                  Strada Dulciurilor, Nr. 123
                  <br />
                  București, România
                </p>
              </div>
              <div className="contact-item">
                <strong>Telefon:</strong>
                <p>+40 21 123 45 67</p>
              </div>
              <div className="contact-item">
                <strong>Email:</strong>
                <p>info@lacofetarie.ro</p>
              </div>
            </div>
            <div className="contact-form">
              <h3>Trimite-ne un mesaj</h3>
              <form className="form">
                <div className="form-group">
                  <label htmlFor="name">Numele tău:</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Introdu numele tău"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email:</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Introdu email-ul tău"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="message">Mesajul tău:</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    placeholder="Scrie mesajul tău aici..."
                  ></textarea>
                </div>
                <button type="submit" className="submit-btn">
                  Trimite mesajul
                </button>
              </form>
            </div>
          </div>
        </div>
      );
    return null;
  };

  return (
    <div className="page-container">
      <PageHeader pageTitle="Contact" />
      <main className="page-content">{renderContent()}</main>
    </div>
  );
}

export default ContactPage;
