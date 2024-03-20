import React, { useContext, useEffect, useState } from 'react';
import { ManageProductContext } from '../product/ProductComponent.jsx';
import * as request from '../../services/product.js';
import Spinner from '../../pages/Dashboard/Product/Spinner.jsx';

const LabelInfo = ({ label, info, description = false }) => {
  const [data, setData] = useState(info);

  const style =
    'dark:bg-white ring-1 ring-slate-400 rounded-lg py-1 px-2 focus:outline-none';
  return (
    <div className="grid grid-cols-2 items-end max-w-lg">
      <label className="font-semibold" htmlFor="product-name">
        {label}
      </label>
      {!description ? (
        <input
          className={style}
          type="text"
          value={data}
          onChange={e => setData(e.target.value)}
          key={info}
        />
      ) : (
        <textarea
          className={style}
          value={data}
          onChange={e => setData(e.target.value)}
        ></textarea>
      )}
    </div>
  );
};

const ModalProduct = () => {
  const { currentProduct, create, setCreate } =
    useContext(ManageProductContext);
  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  useEffect(() => {
    async function fetchData() {
      setIsLoading(() => true);
      if (!create && currentProduct) {
        const { data } = await request.getProductById(currentProduct?.id);
        setProduct(() => data);
      } else {
        await delay(10);
        setProduct(() => {});
      }
      setIsLoading(() => false);
    }
    fetchData();
  }, [currentProduct, create]);
  console.log(product, create);
  return (
    <>
      <dialog
        id="modal_product"
        className="modal modal-bottom sm:modal-middle w-[60%] mx-auto"
        onClose={() => setCreate(() => false)}
      >
        <div className=" dark:bg-white  modal-box relative left-0 right-0 overflow-y-scroll no-scrollbar rounded-lg sm:max-w-full">
          <form method="dialog">
            <button className="bt n btn-sm btn-circle btn-ghost absolute right-2 top-2 border-none outline-none">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-xl text-center uppercase">
            {product ? 'Product Detail' : 'Add new product'}
          </h3>
          {/* this div display image of product and label - input to update product */}
          {isLoading ? (
            <Spinner />
          ) : (
            <div>
              <div className="flex gap-3 flex-col text-slate-500">
                <div className="flex gap-4 items-end">
                  <img
                    className="w-20 rounded-lg shadow-lg"
                    src={product?.images?.[0]?.imageUrl}
                    alt={product?.name}
                    key={product?.images?.[0]?.imageUrl}
                  />
                  <label className="font-semibold" htmlFor="product-image">
                    Change image
                  </label>
                  <input type="file" name="product-image" />
                </div>
                <LabelInfo
                  label="Product name"
                  info={product?.productName || ''}
                />
                <LabelInfo
                  label="Product quantity"
                  info={product?.quantity || ''}
                />
                <LabelInfo
                  label="Actual price"
                  info={product?.actualPrice || ''}
                />
                <LabelInfo label="Sale Price" info={product?.salePrice || ''} />
                <LabelInfo
                  label="Brand"
                  info={product?.brand?.brandName || ''}
                />
                <LabelInfo
                  label="Category"
                  info={product?.category?.categoryName || ''}
                />
                <LabelInfo
                  description={true}
                  label="Description"
                  info={product?.description || ''}
                />
              </div>
            </div>
          )}
          <div className="modal-action flex items-center">
            <form method="dialog">
              <button className="border-0 btn px-6 py-2 text-slate-800 min-h-0 h-auto bg-slate-400 hover:bg-red-500 hover:text-white">
                Close
              </button>
            </form>
            <button className="border-2 border-green-500 btn px-6 py-2 min-h-0 h-auto bg-white   text-slate-700  hover:text-white hover:bg-green-500 hover:border-white">
              {product ? 'Update' : 'Create'}
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default ModalProduct;