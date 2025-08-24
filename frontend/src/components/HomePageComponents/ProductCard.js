import React from 'react';
import './ProductCard.css';

// We make this component reusable with props
const ProductCard = ({ title, description, image, hasCarousel }) => {
    return (
        <div className="product-card">
            <div className="product-image-container">
                <img src={image} alt={title} className="product-image" />
                {/* We only show arrows if hasCarousel is true */}
                {hasCarousel && (
                <>
                <button className="carousel-arrow left"> </button>
                <button className="carousel-arrow right"> </button>
                </>
            )}
            </div>
        <div className="product-info">
            <h3 className="product-title">{title}</h3>
            <p className="product-description">{description}</p>
        </div>
        </div>
        );
        };
export default ProductCard;