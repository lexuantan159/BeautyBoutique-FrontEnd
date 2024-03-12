import React, {useContext} from "react";
import MethodContext from "../../context/methodProvider"
import {useQuery} from "react-query";
import * as cartService from "../../services/cart";
import  logo from "../../public/img/logo.jpg";


const ModalVoucher = ({vouchers = [] , conditionApply}) => {
    const {notify} = useContext(MethodContext)

    const handleApplyVoucher = () => {
        if(conditionApply < 0 ) {
            notify("Cannot apply voucher as your cart is empty!" ,"error")
            return;
        }

    }

    return (<>
        <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle  ">
            <div className="modal-box rounded-lg overflow-y-scroll no-scrollbar">
                <h3 className="font-bold text-xl text-center text-red-400 uppercase">Voucher</h3>
                <h2 className="font-medium text-lg">Voucher hot!</h2>
                <div className="mt-3 w-full max-h-[350px] overflow-y-scroll no-scrollbar">
                    {vouchers?.length > 0 && vouchers?.map((item, index) => {
                        return (
                            <div
                                key={item?.id}
                                className="w-full mt-2 grid grid-cols-12 border-[0.5px] border-gray-400 rounded-lg hover:bg-[#FFF7F9] hover:border-red-500 hover:cursor-pointer transition-all">
                                <div className="col-span-3 w-full h-[100px]">
                                    <img className="p-1 w-full h-full object-cover"
                                         src={logo}
                                         alt="logo"/>
                                </div>
                                <div
                                    className="w-full relative col-span-9 pl-2 border-r-dash border-gray-400 p-2 flex flex-col justify-between">
                                    <p className="absolute top-2 right-4 font-semibold text-center ">{item?.voucher?.discount * 100}%</p>
                                    <p className="text-lg font-medium ">{item?.voucher?.title}</p>
                                    <p className="truncate">{item?.voucher?.content}</p>
                                    <div className="flex items-center justify-between">
                                        <p className="text-sm text-gray italic">{item?.voucher?.startDate} - {item?.voucher?.endDate}</p>
                                        <p className="text-sm text-red-500 font-semibold hover:underline hover:cursor-pointer "
                                        onClick={() => handleApplyVoucher}
                                        >Apply</p>
                                    </div>
                                </div>
                            </div>)
                    })}


                </div>

                <div className="modal-action">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn px-6 py-2 min-h-0 h-auto hover:bg-red-500 hover:text-white outline-none">Close
                        </button>
                    </form>
                </div>
            </div>
        </dialog>
    </>)
}

export default ModalVoucher