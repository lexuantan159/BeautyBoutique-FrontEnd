import {PiNewspaperClippingLight} from "react-icons/pi";
import {GoChevronRight} from "react-icons/go";
import {useQuery} from "react-query";
import * as cartService from "../../services/cart"
import {useEffect, useState} from "react";
import CartItem from "../../components/cart/CartItem";

const Cart = () => {
    const [action, setAction] = useState(false)
    const {
        data: cart,
        isFetching,
        isLoading,
        error,
        isError
    } = useQuery(["cart", action], () => cartService.getCart({userId: 1}));



    return (<>
        <div className="max-w-[1200px] grid grid-cols-12 gap-2 mt-40 mx-10 lg:px-4 lg:mx-auto ">
            <h1 className="col-span-12 font-bold text-xl">My Cart <span className="font-normal">(2 san pham)</span></h1>
            <div className="bg-white col-span-12 lg:col-span-8 rounded-lg shadow-lg max-h-[430px] overflow-y-scroll no-scrollbar">
                {isLoading ? <div>Loading....</div> : cart.status === 200 && cart.data.carts.map((item) => {
                    return (<CartItem key={item?.id} item={item} actionChange={setAction} action={action}/>)
                })}
            </div>
            <div className="bg-white col-span-12 lg:col-span-4 flex-grow mt-5 lg:mt-0 ">
                <div className="w-full flex justify-between gap-2 ">
                    <button type="button"
                            className="w-full text-center bg-white border py-3 px-4 rounded font-bold hover:opacity-90 mr-3 shadow-lg ">
                        Add Other
                    </button>
                    <button type="button"
                            className="w-full text-center bg-red-500 hover:bg-[#FF9FA0] text-white font-bold py-3 px-4 rounded hover:text-white shadow-lg transition-all">
                        Payment
                    </button>
                </div>
                <div className="w-full mt-4 bg-white rounded-lg shadow-md px-3 pb-3 ">
                    <p className="flex items-center py-3 text-lg"><PiNewspaperClippingLight
                        className="pr-4 text-black"/>Voucher
                    </p>
                    <button
                        className="w-full flex items-center justify-between text-gray-300  text-left py-2 px-3 border-[1px] rounded-lg border-gray-400 mb-2">Code
                        Discount <GoChevronRight className="text-xl"/>
                    </button>
                    <p className="p-3 bg-gray-200 text-black rounded-lg border-[0.5px] border-gray-300">Nhận ngay quà
                        trị giá 200K cho đơn hàng từ 500K
                        tại Lixibox (HSD: 30/06/2024</p>
                </div>
                <div className="w-full mt-4 bg-white rounded-lg shadow-md px-3 mb-2">
                    <div className="mx-3 mb-3 flex justify-between items-center border-b-[1px] border-gray-300">
                        <p className="py-2 ">Price </p>
                        <p className="py-2 ">12$ </p>
                    </div>
                    <div className="mx-3 mb-3 flex justify-between items-center border-b-[1px] border-gray-300">
                        <p className="py-2 ">Discount </p>
                        <p className="py-2 ">20% </p>
                    </div>
                    <div className="mx-3 mb-3 flex justify-between items-center text-[#FF9FA0]">
                        <p className="py-2 ">Total </p>
                        <p className="py-2 ">8$ </p>
                    </div>
                </div>
            </div>
        </div>
    </>)
}

export default Cart;