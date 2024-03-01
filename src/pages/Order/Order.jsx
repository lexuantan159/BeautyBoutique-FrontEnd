import React from "react";
import OrderItem from "../../components/modal/OrderItem";
import {GiTakeMyMoney} from "react-icons/gi";
import {MdOutlineDeliveryDining, MdOutlineFreeCancellation} from "react-icons/md";
import {LiaFileInvoiceDollarSolid} from "react-icons/lia";

const Order = () => {


    return (
        <div className="mx-5 mt-10 fill-available ">
            <h1 className="text-center font-bold text-3xl bg-gradient-to-r from-red-400 to-red-800 text-transparent bg-clip-text">Approve
                Order</h1>
            <div className="md:flex justify-start  gap-5 mt-10">
                <div
                    className="p-3 border-[0.5px] border-gray-400 rounded-lg text-black bg-white flex items-center mt-5 md:mt-0 mr-5 ">
                    <LiaFileInvoiceDollarSolid className="text-5xl text-red-400 mx-2"/>
                    <div className="">
                        <p className="text-xl font-bold">122</p>
                        <p className="font-medium text-xs text-gray-300">Total Orders</p>
                    </div>
                </div>

                <div
                    className="p-3 border-[0.5px] border-gray-400 rounded-lg text-black bg-white flex items-center mt-5 md:mt-0 mr-5">
                    <MdOutlineFreeCancellation className="text-5xl text-red-400 mx-2"/>
                    <div className="">
                        <p className="text-xl font-bold">122</p>
                        <p className="font-medium text-xs text-gray-300">Total Canceled</p>
                    </div>
                </div>

                <div
                    className="p-3 border-[0.5px] border-gray-400 rounded-lg text-black bg-white flex items-center mt-5 md:mt-0 mr-5">
                    <MdOutlineDeliveryDining className="text-5xl text-red-400 mx-2"/>
                    <div className="">
                        <p className="text-xl font-bold">122</p>
                        <p className="font-medium text-xs text-gray-300">Total Delivery</p>
                    </div>
                </div>

                <div
                    className="p-3 border-[0.5px] border-gray-400 rounded-lg text-black bg-white flex items-center mt-5 md:mt-0 mr-5">
                    <GiTakeMyMoney className="text-5xl text-red-400 mx-2"/>
                    <div className="">
                        <p className="text-xl font-bold">$122K</p>
                        <p className="font-medium text-xs text-gray-300">Total Revenue</p>
                    </div>
                </div>

            </div>
            <div className="mt-5 rounded-lg">
                <table className="w-full shadow-lg rounded-lg bg-white">
                    <thead className="">
                    <tr className="w-full grid grid-cols-12 py-1 bg-gray-300 rounded-t-lg pb-2">
                        <td className="px-2 text-center uppercase font-medium text-sm col-span-2  md:col-span-1">Id</td>
                        <td className="px-2 text-center uppercase font-medium text-sm hidden md:block md:col-span-2">Product</td>
                        <td className="px-2 text-center uppercase font-medium text-sm col-span-3  md:col-span-3">Total
                            Price
                        </td>
                        <td className="px-2 text-center uppercase font-medium text-sm col-span-3 md:col-span-3">Ship
                            Detail
                        </td>
                        <td className="px-2 text-center uppercase font-medium text-sm col-span-4 md:col-span-3">Action</td>
                    </tr>
                    </thead>
                    <tbody className="">
                    <tr className="w-full grid grid-cols-12 items-center py-1 hover:cursor-pointer border-b-2 border-gray-300"
                        onClick={() => document.getElementById('my_modal_5').showModal()}>
                        <td className="truncate px-2 text-center font-medium text-sm col-span-2  md:col-span-1">Id</td>
                        <td className="truncate px-2 text-center font-medium text-sm hidden md:block md:col-span-2">Product</td>
                        <td className="truncate px-2 text-center font-medium text-sm col-span-3  md:col-span-3">Total
                            Price
                        </td>
                        <td className="truncate px-2 text-center font-medium text-sm col-span-3 md:col-span-3">Ship
                            Detail
                        </td>
                        <td className="px-2 text-center font-medium text-sm col-span-4 md:col-span-3 sm:flex sm:justify-around sm:items-center py-1 ">
                            <button
                                className="ml-2 lg:ml-0 w-20 sm:w-24  py-2 border-none text-green-500 bg-green-200/40 rounded-lg  transition-all">
                                Approve
                            </button>
                            <button
                                className="mt-2 sm:mt-0 ml-2 lg:ml-0 w-20 sm:w-24  py-2 border-none text-red-500 bg-red-200/40 rounded-lg  transition-all">
                                Reject
                            </button>
                        </td>
                    </tr>
                    <tr className="w-full grid grid-cols-12 items-center py-1 hover:cursor-pointer"
                        onClick={() => document.getElementById('my_modal_5').showModal()}>
                        <td className="truncate px-2 text-center font-medium text-sm col-span-2  md:col-span-1">Id</td>
                        <td className="truncate px-2 text-center font-medium text-sm hidden md:block md:col-span-2">Product</td>
                        <td className="truncate px-2 text-center font-medium text-sm col-span-3  md:col-span-3">Total
                            Price
                        </td>
                        <td className="truncate px-2 text-center font-medium text-sm col-span-3 md:col-span-3">Ship
                            Detail
                        </td>
                        <td className="px-2 text-center font-medium text-sm col-span-4 md:col-span-3 sm:flex sm:justify-around sm:items-center py-1 ">
                            <button
                                className="ml-2 lg:ml-0 w-20 sm:w-24  py-2 border-none text-green-500 bg-green-200/40 rounded-lg  transition-all">
                                Approve
                            </button>
                            <button
                                className="mt-2 sm:mt-0 ml-2 lg:ml-0 w-20 sm:w-24  py-2 border-none text-red-500 bg-red-200/40 rounded-lg  transition-all">
                                Reject
                            </button>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <OrderItem/>
            </div>
        </div>)
}

export default Order