import React from "react";
import OrderItem from "../../components/modal/OrderItem";

const Order = () => {


    return (
        <div className="mx-5 mt-10 fill-available ">
            <h1 className="text-center font-bold text-3xl">Approve Order</h1>
            <div className="flex gap-5 mt-4">
                <div className="p-3 border-[0.5px] border-gray-400 rounded-lg shadow-lg text-white bg-red-400">
                    <p className="text-lg font-bold">122 Orders</p>
                </div>
                <div className="p-3 border-[0.5px] border-gray-400 rounded-lg shadow-lg text-white bg-red-400">
                    <p className="text-lg font-bold">122 Orders</p>
                </div>
            </div>
            <div className=" mt-5">
                <table className="w-full border-[0.2px] ">
                    <tbody className="border-gray-300 rounded-lg">
                    <tr className="w-full grid grid-cols-12 py-1 bg-gray-200">
                        <td className="border-black border-r-2 px-2 text-center font-medium text-sm col-span-2  md:col-span-1">Id</td>
                        <td className="border-black border-r-2 px-2 text-center font-medium text-sm hidden md:block md:col-span-2">Product</td>
                        <td className="border-black border-r-2 px-2 text-center font-medium text-sm col-span-3  md:col-span-3">Total
                            Price
                        </td>
                        <td className="border-black border-r-2 px-2 text-center font-medium text-sm col-span-3 md:col-span-3">Ship
                            Detail
                        </td>
                        <td className="px-2 text-center font-medium text-sm col-span-4 md:col-span-3">Action</td>
                    </tr>

                    <tr className="w-full grid grid-cols-12 items-center py-1 "
                        onClick={() => document.getElementById('my_modal_5').showModal() }>
                        <td className="truncate border-black border-r-2 px-2 text-center font-medium text-sm col-span-2  md:col-span-1">Id</td>
                        <td className="truncate border-black border-r-2 px-2 text-center font-medium text-sm hidden md:block md:col-span-2">Product</td>
                        <td className="truncate border-black border-r-2 px-2 text-center font-medium text-sm col-span-3  md:col-span-3">Total
                            Price
                        </td>
                        <td className="truncate border-black border-r-2 px-2 text-center font-medium text-sm col-span-3 md:col-span-3">Ship
                            Detail
                        </td>
                        <td className="px-2 text-center font-medium text-sm col-span-4 md:col-span-3 sm:flex sm:justify-around sm:items-center py-1 ">
                            <button
                                className="ml-2 lg:ml-0 w-20 sm:w-24  py-2 border-none bg-green-400 rounded-lg text-white hover:opacity-80 transition-all">
                                Approve
                            </button>
                            <button
                                className="mt-2 sm:mt-0 ml-2 lg:ml-0 w-20 sm:w-24  py-2 border-none bg-red-500 rounded-lg text-white hover:opacity-80 transition-all">
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