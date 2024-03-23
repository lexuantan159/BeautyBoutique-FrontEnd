import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import * as productApi from '../../services/product';
import { FaCheckCircle } from 'react-icons/fa';
import Comment from '../Blogpost/Comment';
import { Button } from 'flowbite-react';
import * as cartApi from '../../services/cart';
import MethodContext from "../../context/methodProvider";
const Product_Detail = () => {
  // ScrollToDetail
  const scrollToDetail = () => {
    const detailSection = document.getElementById('detailSection');
    if (detailSection) {
      detailSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  // ScrollToShipping
  const scrollToShipping = () => {
    const shippingSection = document.getElementById('shippingSection');
    if (shippingSection) {
      shippingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  // ScrollToreview
  const scrollToReview = () => {
    const reviewSection = document.getElementById('reviewSection');
    if (reviewSection) {
      reviewSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  //
  const [quantity, setQuantity] = useState(1);
  const Token = localStorage.getItem('token');
  const { notify } = useContext(MethodContext)
  const [product, setProduct] = useState('');
  const [change, setChange] = useState(true);
  const { id } = useParams();
  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };
  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  useEffect(() => {
    try {
      console.log(id);
      const fetchDataProduct = async () => {
        const getProduct = await productApi.getProductById(id);
        console.log(getProduct.data);
        setProduct(getProduct.data);
      };
      fetchDataProduct();
    } catch (error) {
      console.log(error);
    }
  }, [id]);

  const handleAddToCart = async () => {
    try {
      const params = { productId: id, quantity: quantity }
      const addCart = await cartApi.addToCart(Token, params);
      if (addCart?.status === 200) {
        notify(addCart?.data, "success")
      }
      else {
        notify(addCart.error.data)
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-[1200px] mx-auto">
      <scrollToShipping />
      <scrollToReview />
      <scrollToDetail />
      <div className="flex ">
        {product && product?.images && product?.images.length > 0 ? (
          <div className="flex">
            <img
              src={product?.images[0]?.imageUrl}
              alt=""
              width={405}
              height={405}
              style={{ marginLeft: '150px', paddingTop: '32px' }}
            />
          </div>
        ) : (
          <p>Loading...</p>
        )}
        <div style={{ marginLeft: 'auto', marginRight: 'auto' }}>
          <p
            style={{
              marginLeft: '3px',
              paddingTop: '26px',
              fontSize: '20px',
              fontWeight: '600',
              fontFamily: '"Roboto", sans-serif;',
            }}
          >
            {' '}
            {product?.productName}
          </p>

          <td className="py-4" colSpan={2}>
            <table
              style={{
                width: '100%',
                borderTop: '1px solid #dddddd',
                borderBottom: '1px solid #dddddd',
                marginRight: '120px',
              }}
            >
              <tbody>
                <tr>
                  <td
                    style={{ height: '16px', width: '390px' }}
                    colSpan={2}
                  ></td>
                </tr>
                <tr>
                  <td style={{ width: '70px' }}>PRICE</td>
                  <td>
                    <div style={{ display: 'inline' }}>
                      <span style={{ color: '#323232', fontSize: '24px', fontWeight: 'bold', }}>
                        {product?.salePrice} USD
                      </span>
                      &nbsp;&nbsp;&nbsp;
                      <span style={{ color: '#ee2f49', fontSize: '24px', fontWeight: 'bold', }} >
                        {((100 * (product?.actualPrice - product?.salePrice)) / product?.actualPrice).toFixed(0)} %
                      </span>
                    </div>
                    <div style={{ clear: 'both' }}></div>
                  </td>
                </tr>
                <tr>
                  <td style={{ paddingTop: '10px' }}>RETAIL</td>
                  <td style={{ paddingTop: '10px' }}>
                    <span style={{ textDecoration: 'line-through' }}>
                      {product?.actualPrice} USD
                    </span>
                    ( You saved{' '}{(product?.actualPrice - product?.salePrice).toFixed(2)} USD )
                  </td>
                </tr>
                <td>QTY</td>
                <td className="pt-[20px] pb-[20px] flex ">
                  <Button.Group>
                    <Button onClick={handleDecrease} color="gray" className="text-sm"
                    >
                      {' '}
                      -{' '}
                    </Button>
                    <Button color="gray"> {quantity} </Button>
                    <Button
                      onClick={handleIncrease}
                      color="gray"
                      className="text-sm"
                    >
                      {' '}
                      +{' '}
                    </Button>
                  </Button.Group>
                </td>
              </tbody>
            </table>
          </td>
          <div className="w-full flex text-right">
            <p style={{ paddingTop: '8px' }}>TOTAL PRICE</p>
            <p
              style={{ color: '#323232', fontSize: '24px', fontWeight: 'bold' }}
            >
              &nbsp;&nbsp;&nbsp; {(product?.salePrice * quantity).toFixed(2)} USD
              &nbsp;&nbsp;&nbsp;
            </p>
            <p style={{ paddingTop: '8px' }}>
              {' '}
              ( You saved{' '}
              {((product?.actualPrice - product?.salePrice) * quantity).toFixed(
                2
              )}{' '}
              USD )
            </p>
          </div>
          <div className="flex pt-[20px]">
            <button
              style={{
                width: '238px',
                height: '42.5px',
                backgroundColor: '#ee2f49',
                color: '#FFFFFF',
                textAlign: 'center',
                fontSize: '16px',
                fontWeight: 'bold',
                lineHeight: '42.5px',
              }}
              onClick={() => {
                handleAddToCart();
              }}
            >
              ADD TO CART
            </button>
            <div
              style={{
                width: '238px',
                height: '42.5px',
                backgroundColor: 'white',
                color: 'black',
                border: '0.5px solid black',
                textAlign: 'center',
                fontSize: '16px',
                fontWeight: 'bold',
                lineHeight: '42.5px',
                cursor: 'pointer',
                marginLeft: '30px',
              }}
            >
              {' '}
              ADD TO WISH LIST
            </div>
          </div>
          <div style={{ display: 'flex', paddingTop: '12px' }}>
            <p
              style={{
                fontFamily: '"Roboto", sans-serif',
                color: '#323232',
                fontSize: '13px',
              }}
            >
              &gt; 100% Authentic Product Guarantee
            </p>
            <p className="text-green-500 ml-1">
              <FaCheckCircle />
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto items-center">
        <div style={{ height: '65px', display: 'flex', paddingTop: '30px' }}>
          <a onClick={scrollToDetail}>
            <p
              style={{
                width: '90px',
                height: '50px',
                textAlign: 'center',
                borderTop: '1px solid #ccc',
                borderRight: '1px solid #ccc',
                borderLeft: '1px solid #ccc',
              }}
            >
              DETAIL
            </p>
          </a>

          <a onClick={scrollToReview}>
            <p style={{ width: '90px', textAlign: 'center' }}>REVIEW</p>
          </a>

          <a onClick={scrollToShipping}>
            <p style={{ width: '90px', textAlign: 'center' }}>SHIPPING</p>
          </a>
        </div>

        <div id="detailSection">
          <div
            style={{
              width: '1200px',
              borderLeft: '1px solid #ccc',
              borderRight: '1px solid #ccc',
              borderBottom: '1px solid #ccc',
              borderTop: '1px solid #ccc',
              margin: '0 0 40px',
              position: 'relative',
              zIndex: 4,
              background: '#fff',
              boxShadow: '5px 5px 0px 0px #f0f0f0',
            }}
          >
            <div style={{ width: '100%', marginLeft: '32px', paddingTop: '20px', fontWeight: 'bold', fontSize: '16pt', color: '#000', fontFamily: '-webkit-pictograph, "Playfair Display", serif', padding: '0 0 5px', }}
            >
              {' '}
              Description
            </div>
            <div
              style={{
                width: '100%',
                marginLeft: '32px',
                paddingRight: '40px',
                paddingBottom: '20px',
              }}
            >
              {' '}
              {product?.description}
            </div>
          </div>
        </div>

        <div id="shippingSection">
          <div style={{ height: '55px', display: 'flex', paddingTop: '-20px' }}>
            <p
              style={{
                width: '10%',
                height: '50px',
                textAlign: 'center',
                borderTop: '1px solid #ccc',
                borderRight: '1px solid #ccc',
                borderLeft: '1px solid #ccc',
              }}
            >
              {' '}
              SHIPPING{' '}
            </p>
          </div>
          <div>
            <div
              style={{
                width: '1200px',
                marginTop: '-20px',
                borderLeft: '1px solid #ccc',
                borderRight: '1px solid #ccc',
                borderBottom: '1px solid #ccc',
                borderTop: '1px solid #ccc',
                margin: '-20 0 40px',
                position: 'relative',
                zIndex: 4,
                background: '#fff',
                boxShadow: '5px 5px 0px 0px #f0f0f0',
              }}
            >
              <div
                style={{
                  width: '100%',
                  marginLeft: '32px',
                  paddingTop: '20px',
                  fontWeight: 'bold',
                  fontSize: '16pt',
                  color: '#000',
                  fontFamily: '-webkit-pictograph, "Playfair Display", serif',
                  padding: '0 0 5px',
                }}
              >
                {' '}
                Shipping Information
              </div>
              <div
                style={{
                  width: '100%',
                  marginLeft: '32px',
                  paddingRight: '40px',
                  paddingBottom: '20px',
                }}
              >
                - StyleKorean is an authorized retailer. <br />
                - All parcels from StyleKorean are shipped from Korea. <br />
                - This item cannot be shipped to certain countries or regions.{' '}
                <br />
                - We are unable to ship to the following address: P.O. Box, APO,
                FPO, DPO. <br />
              </div>
            </div>
          </div>
        </div>

        <input
          type="radio"
          name="my_tabs_2"
          role="tab"
          className="tab"
          aria-label=""
        />
        <div>
          <div id="reviewSection">
            <div style={{ height: '25px', display: 'flex', paddingTop: '5px' }}>
              <p
                style={{
                  paddingBottom: '40px',
                  width: '10%',
                  height: '50px',
                  textAlign: 'center',
                  borderTop: '1px solid #ccc',
                  borderRight: '1px solid #ccc',
                  borderLeft: '1px solid #ccc',
                }}
              >
                {' '}
                REVIEW{' '}
              </p>
            </div>
            <div>
              <div
                style={{
                  width: '1200px',
                  marginTop: '18px',
                  borderLeft: '1px solid #ccc',
                  borderRight: '1px solid #ccc',
                  borderBottom: '1px solid #ccc',
                  borderTop: '1px solid #ccc',
                  margin: '-20 0 40px',
                  position: 'relative',
                  zIndex: 4,
                  background: '#fff',
                  boxShadow: '5px 5px 0px 0px #f0f0f0',
                }}
              >
                <div
                  style={{
                    width: 'full',
                    margin: '-20 0 40px',
                    position: 'relative',
                    zIndex: 4,
                    background: '#fff',
                    paddingBottom: '20px',
                  }}
                >
                  <Comment
                    commentId={id}
                    index={1}
                    setChange={setChange}
                    change={change}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product_Detail;
