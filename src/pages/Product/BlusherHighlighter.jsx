import React from "react";
import "./PRD.css";
import { NavLink } from 'react-router-dom';

// TextComponent.js
const TextComponent = () => {
  return (
    <div className="text-container">
      <p className="custom-text">
        Products &gt;{' '}
        <NavLink to='/category' className="hover:text-red-500">Face Makeup</NavLink>{' '}
        &gt;{' '}
        <NavLink to='/blusher&highlighter' className="hover:text-red-500">Blusher Highlighter</NavLink>
      </p>
    </div>
  );
};

// FrameComponent.js
// FrameComponent.js
const FrameComponent = () => {
  return (
    <div className="frame-container">
      <div className="frame">
      <div className="frame2 hover:text-red-500">
      <NavLink to='/foundation'>
        <p className="frame-text">Foundation</p>
        </NavLink>
     </div>
     <div className="frame2 hover:text-red-500">
      <NavLink to='/makeupbase'>
        <p className="frame-text">Makeup Base</p>
        </NavLink>
      </div>
      <div className="frame2 hover:text-red-500">
      <NavLink to='/power&pact'>
        <p className="frame-text">Powder &amp; Pact</p>
        </NavLink>
      </div>
      <div className="frame2 hover:text-red-500">
      <NavLink to='/concealer'>
        <p className="frame-text">Concealer</p>
        </NavLink>
      </div>
      <div className="frame2 hover:text-red-500">
      <NavLink to='/cushion'>
        <p className="frame-text">Cushion</p>
        </NavLink>
      </div>
      <div className="frame2 hover:text-red-500">
      <NavLink to='/blusher&highlighter'>
        <p className="frame-text">Blusher &amp; Highlighter</p>
        </NavLink>
      </div>
      </div>
    </div>
  );
};

//ProductStatistic.js
const ProductStatistics = () => {
  const products = [
    {
      id: 1,
      name: "Play Bento",
      image: "01.jpg",
      originalPrice: 28.00,
      discountPercent: 5,
    },
    {
      id: 2,
      name: "Whipped Dream",
      image: "02.jpg",
      originalPrice: 21.00,
      discountPercent: 5,
    },
    {
      id: 3,
      name: "Cheeky Stamp",
      image: "03.jpg",
      originalPrice: 27.00,
      discountPercent: 10,
    },
    {
      id: 4,
      name: "Lip&Cheek Healthy Balm",
      image: "04.jpg",
      originalPrice: 17.00,
      discountPercent: 24,
    },
    {
      id: 5,
      name: "Flutter Blusher",
      image: "05.jpg",
      originalPrice: 16.00,
      discountPercent: 20,
    },
    {
      id: 6,
      name: "Moist Ampoule Blusher",
      image: "06.jpg",
      originalPrice: 14.00,
      discountPercent: 18,
    },
    {
      id: 7,
      name: "Pure Blushed Sunshine Cheek",
      image: "07.jpg",
      originalPrice: 8.00,
      discountPercent: 30,
    },
    {
      id: 8,
      name: "Liquid Care Cheek",
      image: "08.jpg",
      originalPrice: 21.00,
      discountPercent: 10,
    },
    {
      id: 9,
      name: "Prism Highlighter",
      image: "09.jpg",
      originalPrice: 24.00,
      discountPercent: 10,
    },
    {
      id: 10,
      name: "Blur-Finish All That Moments Blusher",
      image: "10.jpg",
      originalPrice: 19.00,
      discountPercent: 50,
    },
    {
      id: 11,
      name: "Contour Powder",
      image: "11.jpg",
      originalPrice: 23.00,
      discountPercent: 22,
    },
    {
      id: 12,
      name: "Soft Cream Cheek",
      image: "12.jpg",
      originalPrice: 17.00,
      discountPercent: 15,
    },
    {
      id: 13,
      name: "Better Than Cheek",
      image: "13.jpg",
      originalPrice: 12.00,
      discountPercent: 20,
    },
    {
      id: 14,
      name: "Art Class By Rodin Shading",
      image: "14.jpg",
      originalPrice: 19.00,
      discountPercent: 26,
    },
    {
      id: 15,
      name: "Better Than Shape",
      image: "15.jpg",
      originalPrice: 15.00,
      discountPercent: 20,
    },
    {
      id: 16,
      name: "Juicy-Pang Water Blusher",
      image: "16.jpg",
      originalPrice: 6.90,
      discountPercent: 13,
    },
    {
      id: 17,
      name: "Pastel Blusher #CR02",
      image: "17.jpg",
      originalPrice: 8.00,
      discountPercent: 6,
    },
    {
      id: 18,
      name: "Art Class By Rodin Blusher",
      image: "18.jpg",
      originalPrice: 19.00,
      discountPercent: 13,
    },
    {
      id: 19,
      name: "Juicy-Pang Jelly Blusher",
      image: "19.jpg",
      originalPrice: 10.08,
      discountPercent: 18,
    },
    {
      id: 20,
      name: "See Through Veilighter",
      image: "20.jpg",
      originalPrice: 14.00,
      discountPercent: 20,
    },
    {
      id: 21,
      name: "Pure Blushed Sunshine Cheek",
      image: "21.jpg",
      originalPrice: 9.00,
      discountPercent: 28,
    },
    {
      id: 22,
      name: "Prism Highlighter Duo",
      image: "22.jpg",
      originalPrice: 27.60,
      discountPercent: 28,
    },
    {
      id: 23,
      name: "Vegan Face All Palette",
      image: "23.jpg",
      originalPrice: 27.20,
      discountPercent: 15,
    },
    {
      id: 24,
      name: "Soft Cream Cheek",
      image: "24.jpg",
      originalPrice: 17.00,
      discountPercent: 15,
    },
    {
      id: 25,
      name: "Urban Pearlsation Natural Powder Blusher",
      image: "25.jpg",
      originalPrice: 17.00,
      discountPercent: 30,
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
        <NavLink to={`${product.id}`}>
          <img
            className="w-full self-center"
            src={require(`../../images/BlusherHighlighter/${product.image}`)}
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
        </NavLink>
      </div>
    </>
  );
}

export default function BlusherHighlighter() {
  return (
    <div className="px-20">
      <TextComponent />
      <FrameComponent />
      <ProductStatistics />
    </div>
  );
}