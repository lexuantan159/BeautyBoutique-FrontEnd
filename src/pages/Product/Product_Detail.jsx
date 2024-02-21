import React from 'react';
import './PRD.css';
import { NavLink, useParams } from 'react-router-dom';

// TextComponent.js
const TextComponent = () => { 
  return (
    <div style={{ position: 'absolute', top: 177, left: 28, width: 550, height: 22, display: 'flex', alignItems: 'center' }}>
      <p style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: 18, textAlign: 'left', margin: 0 }}>Products &gt; Face Makeup &gt; Foundation </p>
    </div>
  );
};

// FrameComponent.js
const FrameComponent = () => {
  return (
    <div className="frame-container">
      <div className="frame">
      <NavLink to='flijl'>
        <p className="frame-text">Foundation</p>
        </NavLink>
        <p className="frame-text">Makeup Base</p>
        <p className="frame-text">Powder &amp; Pact</p>
        <p className="frame-text">Concealer</p>
        <p className="frame-text">Cushion</p>
        <p className="frame-text">Blusher &amp; Highlighter</p>
      </div>
    </div>
  );
};

//ProductStatistic.js
const ProductStatistics = () => {
  const products = [
    { id: 1, name: 'Mask Fit Red Cushion (9 colors)', image: '01.png', originalPrice: 25.00, discountPercent: 10 },
    { id: 2, name: 'Dont Settle', image: '02.png', originalPrice: 19.00, discountPercent: 25 },
    { id: 3, name: 'Play Bento (5 colors)', image: '03.png', originalPrice: 28.00, discountPercent: 30 },
    { id: 4, name: 'Whipped Dream (4 color)', image: '04.png', originalPrice: 21.00, discountPercent: 25 },
    { id: 5, name: 'Product 1', image: '05.png', originalPrice: 30.99, discountPercent: 10 },
    { id: 6, name: 'Product 2', image: '06.jpg', originalPrice: 40.49, discountPercent: 20 },
    { id: 7, name: 'Product 3', image: '07.jpg', originalPrice: 35.99, discountPercent: 15 },
    { id: 8, name: 'Product 4', image: '08.jpg', originalPrice: 28.99, discountPercent: 5 },
    { id: 9, name: 'Product 1', image: '09.jpg', originalPrice: 30.99, discountPercent: 10 },
    { id: 10, name: 'Product 2', image: '10.jpg', originalPrice: 40.49, discountPercent: 20 },
    { id: 11, name: 'Product 3', image: '11.jpg', originalPrice: 35.99, discountPercent: 15 },
    { id: 12, name: 'Product 4', image: '12.png', originalPrice: 28.99, discountPercent: 5 },
    { id: 13, name: 'Product 1', image: '13.png', originalPrice: 30.99, discountPercent: 10 },
    { id: 14, name: 'Product 2', image: '14.png', originalPrice: 40.49, discountPercent: 20 },
    { id: 15, name: 'Product 3', image: '15.png', originalPrice: 35.99, discountPercent: 15 },
    { id: 16, name: 'Product 4', image: '16.png', originalPrice: 28.99, discountPercent: 5 },
  ];

  return (
    <div>
      <h2>Product Statistics</h2>
      <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', flexWrap: 'wrap' }}>
        {products.map((product) => (
          <div key={product.id} style={{ textAlign: 'center', marginBottom: '20px' }}>
            <img src={product.image} alt={product.name} style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
            <p>{product.name}</p>
            <p>Original Price: ${product.originalPrice}</p>
            <p>Discount: {product.discountPercent}%</p>
            <p>Discounted Price: ${calculateDiscountedPrice(product.originalPrice, product.discountPercent)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const calculateDiscountedPrice = (originalPrice, discountPercent) => {
  const discountAmount = (originalPrice * discountPercent) / 100;
  return (originalPrice - discountAmount).toFixed(2);
};

export default ProductStatistics;