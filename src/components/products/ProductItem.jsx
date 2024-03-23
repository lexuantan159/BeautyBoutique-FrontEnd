import { MdOutlineAdd } from "react-icons/md";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import * as cartApi from '../../services/cart'
import MethodContext from "../../context/methodProvider";
const ProductItem = ({ infoProduct }) => {
    const { notify } = useContext(MethodContext)
    const Token = localStorage.getItem('token');
    const quantity = 1;
    const productId = infoProduct.id;

    const addCart = async () => {
        try {
            const params = { productId: productId, quantity: quantity }
            const addToCart = await cartApi.addToCart(Token, params)
            if (addToCart?.status === 200) {
                notify(addToCart?.data, "success")
            }
            else {
                notify(addToCart.error.data)
            }
        } catch (error) {
            notify(error)
        }
    }
    return (
        <Link to={`/product/${infoProduct?.id}`}>
            <div className="w-full grid grid-rows-3 rounded-t-lg shadow">
                <div className="relative w-full row-span-2 rounded-t-lg group overflow-hidden">
                    <img
                        className="w-full h-full object-cover rounded-t-lg group-hover:scale-110 transition-all"
                        src={infoProduct.images[0]?.imageUrl} alt={infoProduct.images[0]?.id} />
                    <div
                        className="absolute inset-0 hidden group-hover:block bg-black/20 rounded-t-lg transition-all"></div>
                    <button
                        onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            addCart()
                        }}
                        className="absolute left-1/2 -translate-x-1/2 -bottom-4 opacity-0 px-2 py-1 text-[14px] font-bold text-white flex infoProducts-center rounded-lg bg-red-400 group-hover:opacity-100 group-hover:bottom-4 transition-all">
                        <MdOutlineAdd size={25}
                            className="text-white hover:rotate-180 transition-all mr-1" />
                        Add to cart
                    </button>
                </div>
                <div
                    className="bg-white px-4 pt-4 w-full border-[1px] border-gray-400 overflow-x-hidden">
                    <p className="text-[16px] font-semibold truncate">{infoProduct?.productName}</p>
                    <p className="text-[12px] font-thin uppercase truncate mt-1 overflow-hidden overflow-ellipsis line-clamp-2">
                        {infoProduct?.description}
                    </p>
                    <p className="text-[18px] font-bold mt-1">{infoProduct?.salePrice} $ <br></br> <span
                        className="text-[15px] font-normal text-gray-500">(main price {infoProduct?.salePrice} $)</span>
                    </p>
                </div>
            </div>
        </Link>
    )
}
export default ProductItem;