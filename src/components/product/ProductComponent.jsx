import React, { createContext, useContext, useState } from 'react';
import { BsFillTrash3Fill } from 'react-icons/bs';
import ModalDelete from '../modal/ModalDelete.jsx';
import ModalProduct from '../modal/ModalProduct.jsx';
import { Button } from 'flowbite-react';
import { IoMdAddCircleOutline } from 'react-icons/io';

const testProduct = [
  {
    id: 1,
    name: 'Mask Fit Red Cushion',
    image: '01.png',
    originalPrice: 25.0,
    discountPercent: 10,
  },
  {
    id: 2,
    name: 'Dont Settle',
    image: '02.png',
    originalPrice: 19.0,
    discountPercent: 25,
  },
  {
    id: 3,
    name: 'Play Bento',
    image: '03.png',
    originalPrice: 28.0,
    discountPercent: 30,
  },
  {
    id: 4,
    name: 'Whipped Dream',
    image: '04.png',
    originalPrice: 21.0,
    discountPercent: 25,
  },
  {
    id: 5,
    name: 'Cheeky Stamp',
    image: '05.png',
    originalPrice: 37.0,
    iscountPercent: 10,
  },
  {
    id: 6,
    name: 'My Glow Cream Cushion Refill',
    image: '06.jpg',
    originalPrice: 16.0,
    discountPercent: 10,
  },
  {
    id: 7,
    name: 'Mask Fit Black Cushion',
    image: '07.jpg',
    originalPrice: 36.0,
    discountPercent: 15,
  },
  {
    id: 8,
    name: 'Collagen Whitening Moisture Two-way Cake',
    image: '08.jpg',
    originalPrice: 38.0,
    discountPercent: 10,
  },
  {
    id: 9,
    name: 'Sebum Soak Power 5g',
    image: '09.jpg',
    originalPrice: 12.0,
    discountPercent: 20,
  },
  {
    id: 10,
    name: 'Idol Cover Concealer',
    image: '10.jpg',
    originalPrice: 12.0,
    discountPercent: 10,
  },
  {
    id: 11,
    name: 'Kill Cover High Glow Cushion Set (+refill)',
    image: '11.jpg',
    originalPrice: 36.0,
    discountPercent: 17,
  },
  {
    id: 12,
    name: 'Shimmering Petit BB',
    image: '12.png',
    originalPrice: 5.8,
    discountPercent: 10,
  },
  {
    id: 13,
    name: 'Lip&Cheek Healthy Balm',
    image: '13.png',
    originalPrice: 17.0,
    discountPercent: 24,
  },
  {
    id: 14,
    name: 'Dew Wear Foundation',
    image: '14.png',
    originalPrice: 36.0,
    discountPercent: 15,
  },
  {
    id: 15,
    name: 'Layered Matte Fit Cushion SPF50+ PA++',
    image: '15.png',
    originalPrice: 28.0,
    discountPercent: 30,
  },
  {
    id: 16,
    name: 'Liquid Care Cheek',
    image: '16.png',
    originalPrice: 21.0,
    discountPercent: 10,
  },
];

function ProductInline({ product, setProduct }) {
  const { setCurrentProduct } = useContext(ManageProductContext);
  function handleDelete(e) {
    e.stopPropagation();
    document.getElementById('modal_delete').showModal();
  }

  return (
    <div
      className="grid grid-cols-4 hover:bg-slate-200"
      onClick={() => {
        setCurrentProduct(() => product);
        document.getElementById('modal_product')?.showModal();
      }}
    >
      <div className="mx-auto">
        <img
          className="w-20 rounded-lg shadow-lg"
          src={require(`../../images/FaceMakeup/${product.image}`)}
          alt={product.name}
        />
      </div>
      <div className="m-auto">{product.name}</div>
      <div className="m-auto">{product.quantiy ?? 0}</div>
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
export const HeaderPage = ({ info, setCurrentItem, type = 'user' }) => {
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
              setCurrentItem(() => {});
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
      {headers.map(header => (
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
export function MangageListProduct({ products = testProduct }) {
  const [currentProduct, setCurrentProduct] = useState({});
  return (
    <ManageProductContext.Provider
      value={{ currentProduct, setCurrentProduct }}
    >
      <div className="text-slate-500 bg-white">
        <HeaderPage
          info="Product"
          setCurrentItem={setCurrentProduct}
          type="product"
        />
        <HeaderInfo headers={['Image', 'Name', 'Quantity', 'Delete']} />
        <ListItem>
          {products.map(product => (
            <ProductInline product={product} key={product.id} />
          ))}
        </ListItem>
        <ModalProduct key={currentProduct?.id || 99} />
        <ModalDelete info="product" />
      </div>
    </ManageProductContext.Provider>
  );
}
