import React from "react";
import "./PRD.css";
import { NavLink } from 'react-router-dom';

// TextComponent.js
const TextComponent = () => {
  return (
    <div className="text-container">
      <p className="custom-text">
        Products &gt;{' '}
        <NavLink to='/category' className="hover:text-red-500">Face Makeup</NavLink>
      </p>
    </div>
  );
};


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
      name: "Mask Fit Red Cushion",
      image: "01.png",
      originalPrice: 25.0,
      discountPercent: 10,
    },
    {
      id: 2,
      name: "Dont Settle",
      image: "02.png",
      originalPrice: 19.0,
      discountPercent: 25,
    },
    {
      id: 3,
      name: "Play Bento",
      image: "03.png",
      originalPrice: 28.0,
      discountPercent: 30,
    },
    {
      id: 4,
      name: "Whipped Dream",
      image: "04.png",
      originalPrice: 21.0,
      discountPercent: 25,
    },
    {
      id: 5,
      name: "Cheeky Stamp",
      image: "05.png",
      originalPrice: 37.00,
      iscountPercent: 10,
    },
    {
      id: 6,
      name: "My Glow Cream Cushion Refill",
      image: "06.jpg",
      originalPrice: 16.00,
      discountPercent: 10,
    },
    {
      id: 7,
      name: "Mask Fit Black Cushion",
      image: "07.jpg",
      originalPrice: 36.00,
      discountPercent: 15,
    },
    {
      id: 8,
      name: "Collagen Whitening Moisture Two-way Cake",
      image: "08.jpg",
      originalPrice: 38.00,
      discountPercent: 10,
    },
    {
      id: 9,
      name: "Sebum Soak Power 5g",
      image: "09.jpg",
      originalPrice: 12.00,
      discountPercent: 20,
    },
    {
      id: 10,
      name: "Idol Cover Concealer",
      image: "10.jpg",
      originalPrice: 12.00,
      discountPercent: 10,
    },
    {
      id: 11,
      name: "Kill Cover High Glow Cushion Set (+refill)",
      image: "11.jpg",
      originalPrice: 36.00,
      discountPercent: 17,
    },
    {
      id: 12,
      name: "Shimmering Petit BB",
      image: "12.png",
      originalPrice: 5.80,
      discountPercent: 10,
    },
    {
      id: 13,
      name: "Lip&Cheek Healthy Balm",
      image: "13.png",
      originalPrice: 17.00,
      discountPercent: 24,
    },
    {
      id: 14,
      name: "Dew Wear Foundation",
      image: "14.png",
      originalPrice: 36.00,
      discountPercent: 15,
    },
    {
      id: 15,
      name: "Layered Matte Fit Cushion SPF50+ PA++",
      image: "15.png",
      originalPrice: 28.00,
      discountPercent: 30,
    },
    {
      id: 16,
      name: "Liquid Care Cheek",
      image: "16.png",
      originalPrice: 21.00,
      discountPercent: 10,
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
          src={require(`../../images/Face Makeup/${product.image}`)}
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

export default function Category() {
  return (
    <div className="px-20">
      <TextComponent />
      <FrameComponent />
      <ProductStatistics />
    </div>
  );
}
