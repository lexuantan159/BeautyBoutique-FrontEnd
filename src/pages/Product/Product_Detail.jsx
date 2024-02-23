import React from "react";
import "./PRD.css";
import { NavLink } from 'react-router-dom';
import { useParams } from "react-router-dom";
import { calculateNewValue } from "@testing-library/user-event/dist/utils";
const product =[
  // Category
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
  //Foundation
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
  // Makeup Base

  // Power & Pact

  // Concealer

  // Cushion

  // Blusher & Highlighter
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
]
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
export default function ProductDetail() {
// TextComponent.js
  const TextComponent = () => {
  return (
    <div className="text-container">
      <p className="custom-text">Products &gt; Face Makeup &gt; Foundation &gt; {prd.name}</p>
    </div>
  );
};
  const params = useParams();
  const productId = params.productId;
  const prd = product.find(prd =>prd.id===+productId);
  return (
    <div className="px-20">
      <TextComponent /> 
      <FrameComponent /> 

      <a href="/Category" style={{display: 'block', fontSize: '14px', textDecoration: 'underline',paddingTop: '7px',marginLeft:'80px'}}>Go [Face Makeup] HOME</a>
      <div className="flex ">
        <img src={require(`../../images/Face Makeup/${prd.image}`)} alt=""
          width={405} height={405} style={{ marginLeft:'120px', paddingTop:'32px' }}/>
        <p style={{ marginLeft:'120px', paddingTop:'26px', fontSize: '20px', fontWeight: '600', fontFamily: '"Roboto", sans-serif;'}}> {prd.name}</p>
        
        <td className="py-4" colSpan={2}>
  <input type="hidden" id="it_price" className="VN" value="22.50" />
  <table style={{ width: '100%', borderTop: '1px solid #dddddd' }}>
    <tbody>
      <tr>
        <td style={{ height: '16px' }} colSpan={2}></td>
      </tr>
      <tr>
        <td style={{ width: '70px' }}>PRICE</td>
        <td>
          <div style={{ display: 'inline' }}>
            <span style={{ color: '#323232', fontSize: '24px', fontWeight: 'bold' }}>{prd.originalPrice} USD</span>&nbsp;&nbsp;&nbsp;
            <span style={{ color: '#ee2f49', fontSize: '24px', fontWeight: 'bold' }}>{prd.discountPercent}%</span>
          </div>
          <div className="cb"></div>
          <input type="hidden" id="it_price" value="22.50" />
          <div style={{ clear: 'both' }}></div>
          <div></div>
        </td>
      </tr>
      <tr>
        <td style={{ paddingTop: '10px' }}>RETAIL</td>
        <td style={{ paddingTop: '10px' }}>
          
        </td>
      </tr>
    </tbody>
  </table>
</td>

      </div>
    </div>
  );
}
