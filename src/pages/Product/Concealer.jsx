import React from "react";
import "./PRD.css";
import { NavLink } from 'react-router-dom';

// TextComponent.js
const TextComponent = () => {
  return (
    <div className="text-container">
      <p className="custom-text">Products &gt; Face Makeup &gt; Concearler</p>
    </div>
  );
};

// FrameComponent.js
const FrameComponent = () => {
  return (
    <div className="frame-container">
      <div className="frame">
      <NavLink to='/foundation'>
        <p className="frame-text">Foundation</p>
        </NavLink>
      <NavLink to='/makeupbase'>
        <p className="frame-text">Makeup Base</p>
        </NavLink>
      <NavLink to='/power&pact'>
        <p className="frame-text">Powder &amp; Pact</p>
        </NavLink>
      <NavLink to='/concealer'>
        <p className="frame-text">Concealer</p>
        </NavLink>
      <NavLink to='/cushion'>
        <p className="frame-text">Cushion</p>
        </NavLink>
      <NavLink to='/blusher&highlighter'>
        <p className="frame-text">Blusher &amp; Highlighter</p>
        </NavLink>
      </div>
    </div>
  );
};

//ProductStatistic.js
const ProductStatistics = () => {
  const products = [
    {
      id: 1,
      name: "Mask Fit Red Cushion (9 colors)",
      image: "01.jpg",
      originalPrice: 25.0,
      discountPercent: 10,
    },
    {
      id: 2,
      name: "Dont Settle",
      image: "02.jpg",
      originalPrice: 19.0,
      discountPercent: 25,
    },
    {
      id: 3,
      name: "Play Bento (5 colors)",
      image: "03.jpg",
      originalPrice: 28.0,
      discountPercent: 30,
    },
    {
      id: 4,
      name: "Whipped Dream (4 color)",
      image: "04.jpg",
      originalPrice: 21.0,
      discountPercent: 25,
    },
    {
      id: 5,
      name: "Product 1",
      image: "05.jpg",
      originalPrice: 30.99,
      discountPercent: 10,
    },
    {
      id: 6,
      name: "Product 2",
      image: "06.jpg",
      originalPrice: 40.49,
      discountPercent: 20,
    },
    {
      id: 7,
      name: "Product 3",
      image: "07.jpg",
      originalPrice: 35.99,
      discountPercent: 15,
    },
    {
      id: 8,
      name: "Product 4",
      image: "08.jpg",
      originalPrice: 28.99,
      discountPercent: 5,
    },
    {
      id: 9,
      name: "Product 1",
      image: "09.jpg",
      originalPrice: 30.99,
      discountPercent: 10,
    },
    {
      id: 10,
      name: "Product 2",
      image: "10.jpg",
      originalPrice: 40.49,
      discountPercent: 20,
    },
    {
      id: 11,
      name: "Product 3",
      image: "11.jpg",
      originalPrice: 35.99,
      discountPercent: 15,
    },
    {
      id: 12,
      name: "Product 4",
      image: "12.jpg",
      originalPrice: 28.99,
      discountPercent: 5,
    },
    {
      id: 13,
      name: "Product 1",
      image: "13.jpg",
      originalPrice: 30.99,
      discountPercent: 10,
    },
    {
      id: 14,
      name: "Product 2",
      image: "14.jpg",
      originalPrice: 40.49,
      discountPercent: 20,
    },
    {
      id: 15,
      name: "Product 3",
      image: "15.jpg",
      originalPrice: 35.99,
      discountPercent: 15,
    },
    {
      id: 16,
      name: "Product 4",
      image: "16.jpg",
      originalPrice: 28.99,
      discountPercent: 5,
    },
  ];

  return (
    <div className="max-w-[1200px] mx-auto ">
      <div className="grid grid-cols-4 gap-4 text-center">
        {products.map((product) => (
          <ProductItem product={product} />
        ))}
      </div>
    </div>
  );
};

const calculateDiscountedPrice = (originalPrice, discountPercent) => {
  const discountAmount = (originalPrice * discountPercent) / 100;
  return (originalPrice - discountAmount).toFixed(2);
};

function ProductItem({ product }) {
  return (
    <>
      <div className="w-40 flex item-center flex-col mx-auto" key={product.id}>
        <img
          className="w-full self-center"
          src={require(`../../images/Foundation/${product.image}`)}
          alt={product.name}
        />
        <div className="flex flex-col justify-center text-center">
          <p>{product.name}</p>
          <p>Original Price: ${product.originalPrice}</p>
          <p>Discount: {product.discountPercent}%</p>
          <p>
            Discounted Price: $
            {calculateDiscountedPrice(
              product.originalPrice,
              product.discountPercent
            )}
          </p>
        </div>
      </div>
    </>
  );
}

export default function Concealer() {
  return (
    <div className="px-20">
      <TextComponent />
      <FrameComponent />
      <ProductStatistics />
    </div>
  );
}

