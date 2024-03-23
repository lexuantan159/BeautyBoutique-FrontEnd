import { Card, Carousel } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import * as productApi from '../../services/product';
import { MdOutlineAdd } from 'react-icons/md';
import ProductItem from '../../components/products/ProductItem';

const Home = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    try {
      const fetchData = async () => {
        const getProduct = await productApi.getProduct();
        setProducts(getProduct.data);
      };
      fetchData();
      // console.log(products);
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div className="max-w-[1230px] px-[30px] mx-auto">
      <Link to="/voucher">
        <div className="w-full flex items-center justify-center">
          <div className="w-full mt-4 flex items-center justify-center">
            <div className="w-full ">
              <div className="sm:h-64 md:h-[500px] xl:h-h-[500px] h-56 rounded-lg ">
                <Carousel>
                  <img
                    className="rounded-lg"
                    src="https://firebasestorage.googleapis.com/v0/b/beautyboutique-7ebb3.appspot.com/o/Banner%2Fbanner1.png?alt=media&token=de8792a7-06e7-494a-a15c-0ee844eaa4e7"
                    alt=""
                  />
                  <img
                    className="rounded-lg"
                    src="https://firebasestorage.googleapis.com/v0/b/beautyboutique-7ebb3.appspot.com/o/Banner%2Fbanner2.png?alt=media&token=cafe3ac2-cd7a-4481-92f4-94f3bbc84460"
                    alt=""
                  />
                  <img
                    className="rounded-lg"
                    src="https://firebasestorage.googleapis.com/v0/b/beautyboutique-7ebb3.appspot.com/o/Banner%2Fbanner3.png?alt=media&token=eab58182-5fd7-4a26-999d-b052b1ba2b5c"
                    alt=""
                  />
                  <img
                    className="rounded-lg"
                    src="https://firebasestorage.googleapis.com/v0/b/beautyboutique-7ebb3.appspot.com/o/Banner%2Fbanner4.png?alt=media&token=96a4e940-5ca3-4374-9731-1738926482ed"
                    alt=""
                  />
                  <img
                    className="rounded-lg"
                    src="https://firebasestorage.googleapis.com/v0/b/beautyboutique-7ebb3.appspot.com/o/Banner%2Fbanber5.png?alt=media&token=9962b00f-f718-46a7-b977-ad18ca313212"
                    alt=""
                  />
                  <img
                    className="rounded-lg"
                    src="https://firebasestorage.googleapis.com/v0/b/beautyboutique-7ebb3.appspot.com/o/Banner%2Fbanner6.png?alt=media&token=93b3b186-9a8c-405d-b07b-07e8c8ab178b"
                    alt=""
                  />
                </Carousel>
              </div>
            </div>
          </div>
        </div>
      </Link>

      <div className="font-bold text-3xl mt-6 flex items-center justify-center">
        <span className="text-black">TOP</span>
        <span className="text-red-400 ml-4">PRODUCT</span>
      </div>
      <div className="max-w-[1230px] px-[30px] my-4 mx-auto ">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products?.slice(0, 8).map(item => {
            return <ProductItem key={item?.id} infoProduct={item} />;
          })}
        </div>
      </div>
      <div className="font-bold text-3xl mt-6 flex items-center justify-center">
        <span className="text-black">VOU</span>
        <span className="text-red-400">CHER</span>
      </div>

      <div className="font-bold text-3xl mt-6 flex items-center justify-center">
        <span className="text-black">BLOG</span>
        <span className="text-red-400 ml-4">& EXPERIENCE</span>
      </div>
      <Link to="/blogpost">
        <div className="container mt-12 mx-auto">
          <section className="text-center">
            <div className="pb-12 flex flex-wrap justify-center">
              <div className="w-full shrink-0 grow-0 basis-auto px-3 md:w-10/12">
                <div
                  className="relative mb-6 overflow-hidden rounded-lg bg-cover bg-no-repeat shadow-lg dark:shadow-black/20"
                  data-te-ripple-init=""
                  data-te-ripple-color="light"
                >
                  <img
                    src="https://firebasestorage.googleapis.com/v0/b/beautyboutique-7ebb3.appspot.com/o/Banner%2Fa.jpg?alt=media&token=31d23c23-b858-4a4a-8a6c-14d740a70557"
                    alt={''}
                    className="w-full"
                  />
                </div>
              </div>
              <div className="w-full shrink-0 grow-0 basis-auto px-3 md:w-8/12 xl:w-6/12 mt-5">
                <h5 className="mb-3 text-lg font-bold">
                  The Ultimate Guide to Facial Skincare: Tips for Healthy,
                  Glowing Skin
                </h5>

                <p className="mb-6">
                  Taking care of your skin is essential for maintaining a
                  healthy and radiant complexion. With the right skincare
                  routine, you can achieve glowing skin that makes you feel
                  confident and beautiful. Here's your ultimate guide to facial
                  skincare, including tips and tricks for achieving and
                  maintaining healthy skin. Understanding your skin type is
                  crucial for selecting the right skincare products. Whether you
                  have oily, dry, combination, or sensitive skin, tailor your
                  skincare routine to address your specific needs. Cleansing
                  your face twice a day helps remove dirt, oil, and impurities
                  that can clog pores and lead to breakouts. Use a gentle
                  cleanser suited to your skin type to maintain a clean and
                  refreshed complexion.
                </p>
                <button className="btn btn-success bg-red-400 text-white uppercase border-none hover:bg-red-400">
                  READMORE
                </button>
              </div>
            </div>
          </section>
        </div>
      </Link>
    </div>
  );
};

export default Home;
