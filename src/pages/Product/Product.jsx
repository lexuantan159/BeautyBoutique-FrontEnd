import React, { useEffect, useState } from "react";
import * as productApi from "../../services/product";
import { Card } from "flowbite-react";
const Product = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoryID, setCategoryID] = useState('');

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
    <div className="w-full ">
      <div className="flex items-center justify-center">
        <div className="mx-auto w-[1200px] h-16 flex justify-around items-center border shadow-md rounded-lg mt-4 ">
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
        <div className="w-[70%]">
          <div className="grid grid-cols-4 gap-4">
            {products.map((item) => {
              return (
                <>
                  <Card
                    className="max-w-sm"
                    imgAlt={item.productName}
                    imgSrc={item.images[0].imageUrl}
                  >
                    <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                      {item.productName}
                    </h5>

                    <div className="flex items-center justify-between">
                      <span className="text-3xl font-bold text-gray-900 dark:text-white">
                        ${item.salePrice}
                      </span>
                      <button
                        href="#"
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
