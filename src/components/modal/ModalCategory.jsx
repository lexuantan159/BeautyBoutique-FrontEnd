import React, { useContext, useEffect, useState } from 'react';
import { CategoryContext } from '../product/CategoryComponent.jsx';
import * as request from '../../services/product.js';

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

const ModalCategory = ({ type }) => {
  const { current } = useContext(CategoryContext);
  const [category, setCategory] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    async function fetchData() {
      setIsLoading(() => true);
      const { data } = await request.getCategoryById(current.id);
      setIsLoading(() => false);
      setCategory(() => data);
    }
    fetchData();
  }, [current]);

  return (
    <>
      <dialog
        id={`modal_${type}`}
        className="modal modal-bottom sm:modal-middle w-[60%] mx-auto"
        onClose={() => {}}
      >
        <div className=" dark:bg-white  modal-box relative left-0 right-0 overflow-y-scroll no-scrollbar rounded-lg sm:max-w-full">
          <form method="dialog">
            <button className="bt n btn-sm btn-circle btn-ghost absolute right-2 top-2 border-none outline-none">
              ✕
            </button>
          </form>
          {isLoading ? (
            <></>
          ) : (
            <div>
              <h3 className="font-bold text-xl text-center uppercase">
                {category ? `${type} Detail` : `Add new ${type}`}
              </h3>
              {/* this div display image of product and label - input to update product */}
              <div className="flex gap-3 flex-col text-slate-500">
                <div className="flex gap-4 items-end">
                  {/* <img
                className="w-20 rounded-lg shadow-lg"
                src={require(`../../images/FaceMakeup/${product?.image}`)}
                alt={product?.name}
              /> */}
                  <label className="font-semibold" htmlFor="product-image">
                    Change image
                  </label>
                  <input type="file" name="product-image" />
                </div>
                <LabelInfo
                  label={`${type.charAt(0).toUpperCase() + type.slice(1)} name`}
                  info={category?.categoryName || ''}
                />
              </div>
            </div>
          )}
          <div className="modal-action">
            <form method="dialog">
              <button className="border-0 btn px-6 py-2 text-slate-800 min-h-0 h-auto bg-slate-400 hover:bg-red-500 hover:text-white">
                Close
              </button>
            </form>
            <button className="border-2 border-green-500 btn px-6 py-2 min-h-0 h-auto bg-white   text-slate-700  hover:text-white hover:bg-green-500 hover:border-white">
              {category ? 'Update' : 'Create'}
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default ModalCategory;
