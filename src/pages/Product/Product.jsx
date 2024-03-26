import React, { useEffect, useState } from 'react';
import * as productApi from '../../services/product';
import { Pagination } from "flowbite-react";
import ProductItem from '../../components/products/ProductItem';

const Product = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoryID, setCategoryID] = useState('');
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let getProduct;
        if (categoryID === '') {
          getProduct = await productApi.getProduct();
        } else {
          getProduct = await productApi.getProductByCategory(categoryID);
        }
        const totalProducts = getProduct.data.length;
        const itemsPerPage = 12;
        const pages = Math.ceil(totalProducts / itemsPerPage);
        setTotalPages(pages);
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = Math.min(startIndex + itemsPerPage, totalProducts);
        const productsForPage = getProduct.data.slice(startIndex, endIndex);
        setProducts(productsForPage);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [categoryID, currentPage]);

  useEffect(() => {
    const fetchDataCategory = async () => {
      try {
        const getCategory = await productApi.getCategory();
        setCategories(getCategory.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchDataCategory();
  }, []);

  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="mb-14">
      <div className="max-w-[1230px] px-[30px] mx-auto py-5">
        <div className="w-full mx-auto h-full flex justify-center items-center border shadow-md rounded-lg py-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7">
            <button
              className="font-inter font-semibold text-center text-[16px] hover:text-red-500 transition-all"
              onClick={() => { setCategoryID(''); }}
            >
              All Product
            </button>
            {categories?.map(item => {
              return (
                <div className="flex items-center justify-center">
                  <button
                    className="font-inter font-semibold text-center text-[16px] hover:text-red-500 transition-all"
                    onClick={() => {
                      setCategoryID(item.id);
                    }}
                  >
                    {item.categoryName}{' '}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <div className="w-[1230px] px-[30px] mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map(item => (
              <ProductItem key={item.id} infoProduct={item} />
            ))}
          </div>
          <div className="flex overflow-x-auto sm:justify-center">
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} showIcons />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
