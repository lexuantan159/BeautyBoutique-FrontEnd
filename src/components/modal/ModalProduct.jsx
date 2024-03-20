import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from 'react';
import { ManageProductContext } from '../product/ProductComponent.jsx';
import * as request from '../../services/product.js';
import Spinner from '../../pages/Dashboard/Product/Spinner.jsx';

const LabelInfo = ({ label, info, description = false, field = label }) => {
  const { dispatch } = useContext(ModalContext);
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
          value={info}
          onChange={e => dispatch({ type: field, name: e.target.value })}
        />
      ) : (
        <textarea
          className={style}
          value={info}
          onChange={e => dispatch({ type: field, name: e.target.value })}
        ></textarea>
      )}
    </div>
  );
};
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// make useReducer to handler product object that contains many properties
const initialProduct = {
  productName: 'test product',
  actualPrice: 100,
  salePrice: 100,
  description: 'sample product need to be delete',
  categoryId: 1,
  brandId: 1,
  quantity: 10,
  imageIds: 10,
  imageUrls: 10,
};
const reducer = (state, action) => {
  switch (action.type) {
    case 'productName':
      return { ...state, productName: action.name };
    case 'actualPrice':
      return { ...state, actualPrice: action.name };
    case 'salePrice':
      return { ...state, salePrice: action.name };
    case 'description':
      return { ...state, description: action.name };
    case 'categoryId':
      return { ...state, categoryId: action.name };
    case 'brandId':
      return { ...state, brandId: action.name };
    case 'quantity':
      return { ...state, quantity: action.name };
    case 'imageIds':
      return { ...state, imageIds: action.name };
    case 'imageUrls':
      return { ...state, imageUrls: action.name };
    default:
      return state;
  }
};
const ModalContext = createContext();
const ModalProduct = () => {
  const { currentProduct, create, setCreate } =
    useContext(ManageProductContext);
  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [state, dispatch] = useReducer(reducer, initialProduct);
  const handleSummit = () => {
    console.log(state);
  };
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
    <ModalContext.Provider value={{ dispatch }}>
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
                  <input
                    type="file"
                    name="product-image"
                    onChange={e => console.log(e.target?.files?.[0])}
                  />
                </div>
                <LabelInfo
                  label="Product name"
                  info={product?.productName}
                  field={'actualPrice'}
                />
                <LabelInfo label="Product quantity" info={product?.quantity} />
                <LabelInfo
                  label="Actual price"
                  info={product?.actualPrice}
                  field={'actualPrice'}
                />
                <LabelInfo
                  label="Sale Price"
                  info={product?.salePrice}
                  field={'actualPrice'}
                />
                <LabelInfo
                  label="Brand"
                  info={product?.brand?.brandName}
                  field={'actualPrice'}
                />
                <LabelInfo
                  label="Category"
                  info={product?.category?.categoryName}
                  field={'actualPrice'}
                />
                <LabelInfo
                  description={true}
                  label="Description"
                  info={product?.description}
                  field={'actualPrice'}
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
            <button
              className="border-2 border-green-500 btn px-6 py-2 min-h-0 h-auto bg-white   text-slate-700  hover:text-white hover:bg-green-500 hover:border-white"
              onClick={handleSummit}
            >
              {product ? 'Update' : 'Create'}
            </button>
          </div>
        </div>
      </dialog>
    </ModalContext.Provider>
  );
};

export default ModalProduct;
