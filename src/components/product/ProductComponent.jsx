import React, { createContext, useContext, useEffect, useState } from 'react';
import * as request from '../../services/product.js';
import { BsFillTrash3Fill } from 'react-icons/bs';
import ModalDelete from '../modal/ModalDelete.jsx';
import ModalProduct from '../modal/ModalProduct.jsx';
import { Button } from 'flowbite-react';
import { IoMdAddCircleOutline } from 'react-icons/io';
import Spinner from '../../pages/Dashboard/Product/Spinner.jsx';

function ProductInline({ product, setProduct }) {
  const { setCurrentProduct } = useContext(ManageProductContext);
  const [isLoading, setIsloading] = useState(true);
  function handleDelete(e) {
    e.stopPropagation();
    document.getElementById('modal_delete').showModal();
  }

  return (
    <div
      className="grid grid-cols-4 hover:bg-slate-200 py-2"
      onClick={() => {
        setCurrentProduct(() => product);
        document.getElementById('modal_product')?.showModal();
      }}
    >
      <div className="mx-auto flex items-center">
        {isLoading && <Spinner />}
        <img
          className="w-20 rounded-lg shadow-lg"
          src={`${product.images[0].imageUrl}`}
          alt={product.name}
          onLoad={() => setIsloading(false)}
        />
      </div>
      <div className="m-auto">{product.productName}</div>
      <div className="m-auto">{product.quantity ?? 0}</div>
      <div
        id="delete"
        className="flex justify-center items-center w-full text-slate-400 hover:text-red-500 font-medium text-xl ease-in duration-200 hover:scale-110"
        onClick={handleDelete}
      >
        <BsFillTrash3Fill />
      </div>
    </div>
  );
}
export const HeaderPage = ({ info, type = 'user' }) => {
  const { setCreate, setCurrentProduct } = useContext(ManageProductContext);
  return (
    <div>
      <div className="flex justify-between items-end px-4 mb-4">
        <div className="text-center text-3xl font-semibold mb-4 pt-10 font-roboto ml-4">
          {info} Manage
        </div>
        <div>
          <label className="input input-bordered flex items-center gap-2 dark:bg-white">
            <input
              type="text"
              className="grow dark:bg-white"
              placeholder="Search"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 opacity-70 dark:bg-white"
            >
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd"
              />
            </svg>
          </label>
        </div>
        <div>
          <Button
            onClick={() => {
              setCreate(() => true);
              setCurrentProduct(() => {});
              document.getElementById(`modal_${type}`)?.showModal();
            }}
          >
            <div className="flex gap-2">
              <IoMdAddCircleOutline size={20} />
              <div>Add new {info.toLowerCase()}</div>
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
};
export const HeaderInfo = ({ headers }) => {
  const numHeaders = headers.length;
  return (
    <div className={`grid grid-cols-${numHeaders} mb-4`}>
      {headers?.map(header => (
        <div className="mx-auto text-lg font-semibold" key={header}>
          {header}
        </div>
      ))}
    </div>
  );
};
export const ListItem = ({ children }) => {
  return <div className="flex flex-col gap-2 mb-4">{children}</div>;
};
export const ManageProductContext = createContext();
export function MangageListProduct() {
  const [currentProduct, setCurrentProduct] = useState({});
  const [products, setProducts] = useState([]);
  const [create, setCreate] = useState(false);
  useEffect(() => {
    async function getProducts() {
      const { data } = await request.getProduct();
      if (data) {
        setProducts(() => data);
      }
    }
    getProducts();
  }, []);
  return (
    <ManageProductContext.Provider
      value={{ currentProduct, setCurrentProduct, create, setCreate }}
    >
      <div className="text-slate-500 bg-white">
        <HeaderPage info="Product" type="product" />
        <HeaderInfo headers={['Image', 'Name', 'Quantity', 'Delete']} />
        <ListItem>
          {products?.map(product => (
            <ProductInline product={product} key={product.id} />
          ))}
        </ListItem>
        <ModalProduct />
        <ModalDelete info="product" />
      </div>
    </ManageProductContext.Provider>
  );
}
