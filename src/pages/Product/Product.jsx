import React, { useEffect, useState } from "react";
import * as productApi from "../../services/product";
import { Card } from "flowbite-react";
import { NavLink } from 'react-router-dom';
import  * as cartApi from "../../services/cart";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoryID, setCategoryID] = useState('');
  const [accessToken, setAccessToken] = useState('abc');

  const handleAddToCart = async(id) => {
    try {
      const addtocart = await cartApi.addToCart(accessToken, id )
    } catch (error) {
      
    }
  }

  useEffect(() => {
    try {
      const fetchData = async () => {
        if(categoryID === ''){
          const getProduct = await productApi.getProduct();
          setProducts(getProduct.data);
        }else{
          const getProduct = await productApi.getProductByCategory(categoryID)
          setProducts(getProduct.data);
        }
      };
      fetchData();
      console.log(products);
    } catch (error) {
      console.log(error);
    }
  }, [categoryID]);

  useEffect(() => {
    try {
      const fetchDataCategory = async () => {
        const getCategory = await productApi.getCategory();
        setCategories(getCategory.data);
      };
      fetchDataCategory();
      console.log(categories);
    } catch (error) {
      console.log(error);
    }
  }, []);
  return (
    <div className="w-full mx-auto ">
      <div className="flex items-center justify-center">
        <div className="mx-auto w-[1200px] h-16 flex justify-around items-center border shadow-md rounded-lg mt-5 mb-5 ">
          <div className=" w-full mx-auto h-full flex justify-center items-center">
          <div className="grid grid-cols-7">
            <button className="font-inter font-semibold text-center text-[16px] hover:text-red-500" onClick={() =>{setCategoryID('')}}> All Product </button>
            {categories.map((item) => {
              return(
                <div className="flex items-center justify-center">
                <button className="font-inter font-semibold text-center text-[16px] hover:text-red-500" onClick={() =>{setCategoryID(item.id)}}>{item.categoryName} </button>
                </div>
              )
            })}
          </div>

          </div>
        </div>

      </div>

      <div className="flex items-center justify-center">
        <div className="w-[1200px]">
          <div className="grid grid-cols-4 gap-6">
            {products.map((item) => {
              return (
                <>
                  <Card>
                    <NavLink to={`${item.id}`}>
                    <div >
                      <img src={item.images[0].imageUrl} alt={item.productName} className="" />
                    </div>
                
                    <h5 className="text-xl h-[80px] font-semibold tracking-tight text-gray-900 dark:text-white">
                      {item.productName}
                    </h5>
                </NavLink>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-gray-900 dark:text-white ">
                        ${item.salePrice.toFixed(2)}
                      </span>
                      <button
                        onClick={() => {handleAddToCart(item.id)}}
                        className="rounded-lg bg-cyan-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
                      >
                        Add to cart
                      </button>
                    </div>
                  </Card>
                 
                </>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
