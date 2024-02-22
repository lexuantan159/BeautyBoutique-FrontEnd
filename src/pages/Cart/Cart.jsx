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
            <div
                className="bg-white col-span-12 lg:col-span-8 rounded-lg shadow-lg max-h-[430px] overflow-y-scroll no-scrollbar border-[0.2px] border-gray-300">
                {isLoading ? <div>Loading....</div> : cart.status === 200 && cart.data.carts.map((item) => {
                    return (<CartItem key={item?.id} item={item} actionChange={setAction} action={action}/>)
                })}
            </div>
            <div className="bg-white col-span-12 lg:col-span-4 flex-grow mt-5 lg:mt-0 ">
                <div className="w-full flex justify-between gap-2">
                    <button type="button"
                            className="w-full text-center bg-white border py-3 px-4 rounded font-bold hover:opacity-90 mr-3 shadow-lg ">
                        Add Other
                    </button>
                    <button type="button"
                            className="w-full text-center bg-red-500 hover:bg-[#FF9FA0] text-white font-bold py-3 px-4 rounded hover:text-white shadow-lg transition-all">
                        Payment
                    </button>
                </div>
                <div className="w-full mt-4 bg-white rounded-lg shadow-md px-3 pb-3 border-[0.2px] border-gray-300">
                    <p className="flex items-center py-3 text-lg"><PiNewspaperClippingLight
                        className="pr-4 text-black"/>Voucher
                    </p>
                    {/* Open the modal using document.getElementById('ID').showModal() method */}
                    <button
                        className="w-full flex items-center justify-between text-gray-300  text-left py-2 px-3 border-[1px] rounded-lg border-gray-400 mb-2 outline-none hover:border-[#FF9FA0]"
                        onClick={() => document.getElementById('my_modal_5').showModal()}>
                        Code
                        Discount <GoChevronRight className="text-xl"/>
                    </button>
                    <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle  ">
                        <div className="modal-box rounded-lg overflow-y-scroll no-scrollbar">
                            <h3 className="font-bold text-xl text-center uppercase">Voucher</h3>
                            <h2 className="font-medium text-lg">Voucher hot!</h2>
                            <div className="mt-3 w-full ">
                                <div
                                    className="w-full mt-2 grid grid-cols-12 border-[0.5px] border-gray-400 rounded-lg hover:bg-[#FFF7F9] hover:border-red-500 hover:cursor-pointer transition-all">
                                    <div className="col-span-3 w-full h-[100px]">
                                        <img className="p-2 w-full h-full object-cover"
                                             src="https://img.pikbest.com/ai/illus_our/20230418/64e0e89c52dec903ce07bb1821b4bcc8.jpg!w700wp"
                                             alt=""/>
                                    </div>
                                    <div className="w-full col-span-9 pl-2 border-r-dash border-gray-400 p-2 flex flex-col justify-between">
                                        <p className="text-lg font-medium ">Name Voucher</p>
                                        <p className="truncate">loremsdfasfasdfajfwibskadfiwaefsdfasfasdlkjfahskfjahsdfjkashfjksdhk</p>
                                        <div className="flex items-center justify-between">
                                            <p className="text-sm text-gray italic">01/01/2024 - 02/02/2024</p>
                                            <p className="text-sm text-red-500 font-medium ">Apply</p>
                                        </div>
                                    </div>
                                </div>

                            </div>

                            <div className="modal-action">
                                <form method="dialog">
                                    {/* if there is a button in form, it will close the modal */}
                                    <button className="btn px-6 py-2 min-h-0 h-auto hover:bg-red-500 hover:text-white">Close</button>
                                </form>
                            </div>
                        </div>
                    </dialog>
                    {/**/}
                    <p className="p-3 bg-gray-200 text-black rounded-lg border-[0.5px] border-gray-300">Nhận ngay quà
                        trị giá 200K cho đơn hàng từ 500K
                        tại Lixibox (HSD: 30/06/2024</p>
                </div>
                <div className="w-full mt-4 bg-white rounded-lg shadow-md px-3 mb-2 border-[0.2px] border-gray-300">
                    <div className="mx-3 mb-3 flex justify-between items-center border-b-[1px] border-gray-300">
                        <p className="py-2 ">Price </p>
                        <p className="py-2 ">{cart?.data?.totalPrice}$ </p>
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