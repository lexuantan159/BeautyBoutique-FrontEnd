import React, {useContext, useState, useEffect} from 'react';
import {RiDeleteBinLine} from 'react-icons/ri';
import * as cartService from '../../services/cart';
import MethodContext from '../../context/methodProvider';
import {debounce} from 'lodash';
import {Link} from 'react-router-dom';

const CartItem = ({item, actionChange, action, noneBorder = false}) => {
    const type = {
        INCREASE: 'increase',
        DECREASE: 'decrease',
        INPUT: 'input',
    };

    const {notify} = useContext(MethodContext);
    const [quantity, setQuantity] = useState(item?.quantity || 0);
    const [cartItem, setCartItem] = useState({
        price: item?.product?.salePrice,
        totalPrice: item?.totalPrice,
    });
    const accessToken = localStorage.getItem('token');


    const handleDeleteItem = async () => {
        let params = {userId: 1, cartItemId: item.id,}
        const responseDeleteItem = await cartService.deleteCartItem(accessToken, params)
        responseDeleteItem?.status === 200 && actionChange(!action)
        responseDeleteItem?.status === 200 && notify("Delete cart item successfully!", "success");
    }

    const handleUpdateItem = async (typeAction, newQuantity) => {
        let params = {userId: 1, cartItemId: item.id,}
        // handle set type of action
        if (typeAction === type.INCREASE) {
            params = {...params, quantity: quantity + 1}
            setQuantity(params.quantity);
        } else if (typeAction === type.DECREASE) {
            if (quantity - 1 === 0) {
                notify("Cannot decrease quantity!", "error")
                return;
            }
            params = {...params, quantity: quantity - 1}
            setQuantity(params.quantity);
        } else {
            params = {...params, quantity: newQuantity}
        }
        const responseIncreaseItem = await cartService.updateCartItem(accessToken, params);
        responseIncreaseItem?.status === 200 && actionChange(!action)
    }


    const updateQuantity = debounce((newQuantity) => {
                handleUpdateItem(type.INPUT, newQuantity)
            }, 1000
        )
    ;

    const handleChangeQuantity = (event) => {
        const input = event.target.value;
        // check number
        if (/^\d*$/.test(input)) {
            const newQuantity = parseInt(input);
            if (newQuantity >= 0 && !isNaN(newQuantity)) {
                setQuantity(newQuantity);
                setCartItem(prevState => ({...prevState, totalPrice: prevState.price * newQuantity}));
                updateQuantity(newQuantity);
            } else {
                notify("Quantity must be a positive number!", "error");
            }
        } else {
            notify("Please enter a valid number!", "error");
        }
    };


    return (
        <>
            <div className={`${!noneBorder && "border-b-[2px] border-gray-200 "} flex gap-4 px-3 pb-3 mb-3`}>
                <Link to={"/"}>
                    <img
                        src={item?.product?.images[0]?.imageUrl}
                        alt={item?.product?.productName} className="w-[86px] h-[86px] object-cover"/>
                </Link>
                <div className="w-full flex flex-col justify-between">
                    <p className="block ">{item?.product?.productName}</p>
                    <p className="block"><span className="font-medium">{cartItem?.price}</span> ₫(trị
                        giá {cartItem?.totalPrice} ₫)</p>
                    <form className="w-full mx-auto flex justify-between">
                        <div className="flex items-center">
                            <button type="button" id="decrement-button" data-input-counter-decrement="counter-input"
                                    className="flex-shrink-0 bg-gray-100 dark:bg-gray-700 hover:bg-[#FF9FA0] hover:text-white inline-flex items-center justify-center border border-gray-300 rounded-md h-7 w-7 transition-all "
                                    onClick={() => handleUpdateItem(type.DECREASE)}
                            >
                                <svg className="w-2.5 h-2.5 text-gray-900 hover:text-white" aria-hidden="true"
                                     xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                          strokeWidth="2" d="M1 1h16"/>
                                </svg>
                            </button>
                            <input type="text" id="counter-input" dataInputCounter
                                   className="flex-shrink-0 text-gray-900 active:border-none bg-transparent text-sm font-normal max-w-[2.5rem] text-center focus:none outline-none "
                                   value={quantity}
                                   onChange={(e) => handleChangeQuantity(e)}
                                   required/>
                            <button type="button" id="increment-button" data-input-counter-increment="counter-input"
                                    className="flex-shrink-0 bg-gray-100 dark:bg-gray-700 hover:bg-[#FF9FA0] hover:text-white inline-flex items-center justify-center border border-gray-300 rounded-md h-7 w-7 transition-all "
                                    onClick={() => handleUpdateItem(type.INCREASE)}
                            >
                                <svg className="w-2.5 h-2.5 text-gray-900 hover:text-white" aria-hidden="true"
                                     xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                          strokeWidth="2" d="M9 1v16M1 9h16"/>
                                </svg>
                            </button>
                        </div>
                        <button type="button" id="decrement-button" data-input-counter-decrement="counter-input"
                                className="bg-gray-100 h-7 px-3 rounded flex items-center hover:text-white hover:bg-red-500 mr-4 transition-all"
                                onClick={() => handleDeleteItem()}
                        >
                            <RiDeleteBinLine className="mr-2"/>
                            Delete
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default CartItem;
