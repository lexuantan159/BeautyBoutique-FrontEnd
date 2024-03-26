import React, { useEffect, useState } from "react";
import * as productApi from "../../services/product";
import ProductItem from "../../components/products/ProductItem";

const Product = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [categoryID, setCategoryID] = useState("");

    useEffect(() => {
        try {
            const fetchData = async () => {
                if (categoryID === "") {
                    const getProduct = await productApi.getProduct();
                    setProducts(getProduct.data);
                } else {
                    const getProduct = await productApi.getProductByCategory(
                        categoryID
                    );
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
        <div className="mb-14 text-slate-500">
            <div className="max-w-[1230px] px-[30px] mx-auto py-5">
                <div className="w-full mx-auto h-full flex justify-center items-center border shadow-md rounded-lg py-4">
                    <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7">
                        <button
                            className="font-inter font-semibold text-center text-[16px] hover:text-red-500 transition-all"
                            onClick={() => {
                                setCategoryID("");
                            }}
                        >
                            {" "}
                            All Product
                        </button>
                        {categories?.map((item) => {
                            return (
                                <div className="flex items-center justify-center">
                                    <button
                                        className="font-inter font-semibold text-center text-[16px] hover:text-red-500 transition-all"
                                        onClick={() => {
                                            setCategoryID(item.id);
                                        }}
                                    >
                                        {item.categoryName}{" "}
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
                        {products?.map((item) => {
                            return (
                                <ProductItem
                                    key={item?.id}
                                    infoProduct={item}
                                />
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Product;
