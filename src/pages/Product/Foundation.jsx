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
        <NavLink to='/foundation' className="hover:text-red-500">Foundation</NavLink>
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
      name: "Rich Gold Double Wear Radiance Foundation SPF 50",
      image: "01.jpg",
      originalPrice: 24.00,
      discountPercent: 10,
    },
    {
      id: 2,
      name: "Shimmering Petit BB",
      image: "02.jpg",
      originalPrice: 5.80,
      discountPercent: 10,
    },
    {
      id: 3,
      name: "Dew Wear Foundation",
      image: "03.jpg",
      originalPrice: 36.00,
      discountPercent: 15,
    },
    {
      id: 4,
      name: "Kill Cover Founwear Foundation",
      image: "04.jpg",
      originalPrice: 16.00,
      discountPercent: 6,
    },
    {
      id: 5,
      name: "Brilliance Fit Glow Foundation",
      image: "05.jpg",
      originalPrice: 20.00,
      discountPercent: 10,
    },
    {
      id: 6,
      name: "Wink Sun Base 50ml",
      image: "06.jpg",
      originalPrice: 20.00,
      discountPercent: 10,
    },
    {
      id: 7,
      name: "Wink Foundation",
      image: "07.jpg",
      originalPrice: 40.00,
      discountPercent: 10,
    },
    {
      id: 8,
      name: "MBB Boomer 40ml",
      image: "08.jpg",
      originalPrice: 14.00,
      discountPercent: 46,
    },
    {
      id: 9,
      name: "Pro Tailor Be Glow Foundation SPF27 PA++ 30g",
      image: "09.jpg",
      originalPrice: 40.00,
      discountPercent: 10,
    },
    {
      id: 10,
      name: "8 Peptide Foundation 100g",
      image: "10.jpg",
      originalPrice: 15.00,
      discountPercent: 10,
    },
    {
      id: 11,
      name: "Bloom Foundation",
      image: "11.jpg",
      originalPrice: 42.00,
      discountPercent: 10,
    },
    {
      id: 12,
      name: "Double Serum Balm Foundation",
      image: "12.jpg",
      originalPrice: 39.00,
      discountPercent: 20,
    },
    {
      id: 13,
      name: "Layered Cover Foundation",
      image: "13.jpg",
      originalPrice: 29.00,
      discountPercent: 30,
    },
    {
      id: 14,
      name: "Wooncho Blur Matte Foundation",
      image: "14.jpg",
      originalPrice: 32.00,
      discountPercent: 20,
    },
    {
      id: 15,
      name: "Wooncho Blue Glowy Foundation",
      image: "15.jpg",
      originalPrice: 32.00,
      discountPercent: 15,
    },
    {
      id: 16,
      name: "M Choboyang BB Cream 50ml",
      image: "16.jpg",
      originalPrice: 27.00,
      discountPercent: 22,
    },
    {
      id: 17,
      name: "Kill Cover Founwear Foundation SPF30 PA+++",
      image: "17.jpg",
      originalPrice: 34.00,
      discountPercent: 6,
    },
    {
      id: 18,
      name: "Moringa Ceramide BB Cream SPF30 PA+++",
      image: "18.jpg",
      originalPrice: 22.00,
      discountPercent: 45,
    },
    {
      id: 19,
      name: "Pro-Tailor Be Glow Stick Foundation",
      image: "19.jpg",
      originalPrice: 28.00,
      discountPercent: 10,
    },
    {
      id: 20,
      name: "Neo Foundation Matte",
      image: "20.jpg",
      originalPrice: 58.00,
      discountPercent: 15,
    },
    {
      id: 21,
      name: "Double Lasting Foundation #21W1 Beige",
      image: "21.jpg",
      originalPrice: 39.00,
      discountPercent: 10,
    },
    {
      id: 22,
      name: "Radiance Perfect-Fit Foundation #N23 SPF30 PA++ 35ml",
      image: "22.jpg",
      originalPrice: 40.49,
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
        <NavLink to={`${product.id}`}>
          <img
            className="w-full self-center"
            src={require(`../../images/Foundation/${product.image}`)}
            alt={product.name}
          />
          <div className="flex flex-col justify-center text-center ">
            <p>{product.name}</p>
            <strike className="text-gray-400 font-normal text-base"> {product.originalPrice} USD </strike>
            <p className="text-neutral-1000 font-semibold text-lg">
              <span className="text-red-600 font-semibold text-lg"> {product.discountPercent}% &nbsp;</span>
              {calculateDiscountedPrice(product.originalPrice, product.discountPercent)} USD
            </p>
          </div>
        </NavLink>

      </div>
    </>
  );
}

export default function Foundation() {
  return (
    <div className="px-20">
      <TextComponent />
      <FrameComponent />
      <ProductStatistics />
    </div>
  );
}