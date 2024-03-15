import React from "react";
import {RiDeleteBinLine} from "react-icons/ri";

const OrderItem = ({infoOrderItem}) => {

    return (
        <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle w-[80%] mx-auto">
            <div className="modal-box relative left-0 right-0 overflow-y-scroll no-scrollbar rounded-lg sm:max-w-full">
                <form method="dialog">
                    <button
                        className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 border-none outline-none">✕
                    </button>
                </form>
                <h3 className="font-bold text-xl text-center uppercase">Order Detail</h3>

                <h2 className="font-medium text-[16px]">Ship Detail</h2>
                <div className="mt-2 p-2 border-[1px] border-red-500 rounded-lg hover:cursor-pointer">
                    <p className="">Nguyen Van A</p>
                    <p className="">031653515135</p>
                    <p className="truncate">194 Tô hiệu, P Hoa minh, Q Liên Chiểu, Đà Nẵng, TP Đà Nẵng</p>
                </div>

                <h2 className="font-medium text-[16px]">Products</h2>
                <div className="mt-2 w-full ">
                    <div
                        className="bg-white col-span-12 lg:col-span-8 rounded-lg shadow-lg max-h-[270px] border-[0.2px] border-gray-300 overflow-y-scroll no-scrollbar">
                        <div className="border-b-[1px] border-gray-200 flex gap-4 p-3 mb-3">
                            <img
                                src="https://design4users.com/wp-content/uploads/2020/08/tasty-burger-ui-design-delivery-screens-tubik.png"
                                alt="sdfsdfsfdgdf" className="w-[86px] h-[86px] object-cover rounded"/>
                            <div className="w-full flex justify-between items-center">
                                <p className="block ">Name Product</p>
                                <div className="flex flex-col">
                                    <p className="block"><span className="font-medium">6</span> $(trị
                                        giá 72 $)</p>
                                    <p className="block">Qty: 12</p>
                                </div>

                            </div>
                        </div>

                        <div className="border-b-[1px] border-gray-200 flex gap-4 p-3 mb-3">
                            <img
                                src="https://design4users.com/wp-content/uploads/2020/08/tasty-burger-ui-design-delivery-screens-tubik.png"
                                alt="sdfsdfsfdgdf" className="w-[86px] h-[86px] object-cover rounded"/>
                            <div className="w-full flex justify-between items-center">
                                <p className="block ">Name Product</p>
                                <div className="flex flex-col">
                                    <p className="block"><span className="font-medium">6</span> $(trị
                                        giá 72 $)</p>
                                    <p className="block">Qty: 12</p>
                                </div>

                            </div>
                        </div>

                        <div className="border-b-[1px] border-gray-200 flex gap-4 p-3 mb-3">
                            <img
                                src="https://design4users.com/wp-content/uploads/2020/08/tasty-burger-ui-design-delivery-screens-tubik.png"
                                alt="sdfsdfsfdgdf" className="w-[86px] h-[86px] object-cover rounded"/>
                            <div className="w-full flex justify-between items-center">
                                <p className="block ">Name Product</p>
                                <div className="flex flex-col">
                                    <p className="block"><span className="font-medium">6</span> $(trị
                                        giá 72 $)</p>
                                    <p className="block">Qty: 12</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex justify-between mt-2">
                    <div>
                        <h2 className="font-medium text-[16px]">Payment: Zalo Pay</h2>
                        <h2 className="font-medium text-[16px]">Delivery: J&T</h2>
                    </div>
                    <h2 className="block font-medium text-[16px] text-left text-red-400">Total price: 72$</h2>
                </div>

                <div className="modal-action">
                    <form method="dialog">
                        <button className="btn px-6 py-2 min-h-0 h-auto hover:bg-red-500 hover:text-white">Close
                        </button>
                    </form>
                </div>
            </div>
        </dialog>)
}

export default OrderItem