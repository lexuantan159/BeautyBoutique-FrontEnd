import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as productApi from "../../services/product";
import { FaCheckCircle } from "react-icons/fa";
const Product_Detail = () => {
  const [product, setProduct] = useState("");
  const { id } = useParams();

  useEffect(() => {
    console.log(id);
    try {
      const fetchDataProduct = async () => {
        const getProduct = await productApi.getProductById(id);
        console.log(getProduct);
        setProduct(getProduct.data);
      };
      fetchDataProduct();
      console.log(product);
    } catch (error) {
      console.log(error);
    }
  }, [id]);

  return (
    <div className="max-w-[1200px] mx-auto">
      <div className="flex ">
        {product && product.images && product.images.length > 0 ? (
          <div className="flex">
            <img
              src={product.images[0].imageUrl}
              alt=""
              width={405}
              height={405}
              style={{ marginLeft: "150px", paddingTop: "32px" }}
            />{" "}
          </div>
        ) : (
          <p>Loading...</p>
        )}
        <div style={{ marginLeft: "auto", marginRight: "auto" }}>
          <p
            style={{
              marginLeft: "3px",
              paddingTop: "26px",
              fontSize: "20px",
              fontWeight: "600",
              fontFamily: '"Roboto", sans-serif;',
            }}
          >
            {" "}
            {product.productName}
          </p>

          <td className="py-4" colSpan={2}>
            <table
              style={{
                width: "100%",
                borderTop: "1px solid #dddddd",
                marginRight: "120px",
              }}
            >
              <tbody>
                <tr>
                  <td
                    style={{ height: "16px", width: "390px" }}
                    colSpan={2}
                  ></td>
                </tr>
                <tr>
                  <td style={{ width: "70px" }}>PRICE</td>
                  <td>
                    <div style={{ display: "inline" }}>
                      <span
                        style={{
                          color: "#323232",
                          fontSize: "24px",
                          fontWeight: "bold",
                        }}
                      >
                        {" "}
                        {product.salePrice} USD
                      </span>
                      &nbsp;&nbsp;&nbsp;
                      <span
                        style={{
                          color: "#ee2f49",
                          fontSize: "24px",
                          fontWeight: "bold",
                        }}
                      >
                        {((100 * (product.actualPrice - product.salePrice)) /
                          product.actualPrice).toFixed(0)}
                        %
                      </span>
                    </div>
                    <div style={{ clear: "both" }}></div>
                  </td>
                </tr>
                <tr>
                  <td style={{ paddingTop: "10px" }}>RETAIL</td>
                  <td style={{ paddingTop: "10px" }}>
                    <span style={{ textDecoration: "line-through" }}>
                      {product.actualPrice} USD
                    </span>{" "}
                    ( You saved {(product.actualPrice - product.salePrice).toFixed(2)} USD )
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
          <div className="flex">
            <div
              style={{
                width: "238px",
                height: "42.5px",
                backgroundColor: "#ee2f49", 
                color: "#FFFFFF", 
                textAlign: "center",
                fontSize: "16px",
                fontWeight: "bold",
                lineHeight: "42.5px",
                cursor: "pointer",
              }}
            >
              ADD TO CART
            </div>
            <div
              style={{
                width: "238px",
                height: "42.5px",
                backgroundColor: "white", 
                color: "black",
                border: "0.5px solid black",
                textAlign: "center",
                fontSize: "16px",
                fontWeight: "bold",
                lineHeight: "42.5px",
                cursor: "pointer",
                marginLeft: "30px",
              }}
            >
              {" "}
              ADD TO WISH LIST
            </div>
          </div>
          <div style={{ display: "flex", paddingTop: "12px" }}>
            <p
              style={{
                fontFamily: '"Roboto", sans-serif',
                color: "#323232",
                fontSize: "13px",
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
    </div>
  );
};

export default Product_Detail;
