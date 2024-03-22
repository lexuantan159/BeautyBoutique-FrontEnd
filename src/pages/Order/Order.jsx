import React, {useContext, useState} from "react";
import OrderItem from "../../components/modal/OrderItem";
import {GiTakeMyMoney} from "react-icons/gi";
import {MdOutlineDeliveryDining, MdOutlineFreeCancellation} from "react-icons/md";
import {LiaFileInvoiceDollarSolid} from "react-icons/lia";
import {useMutation, useQuery, useQueryClient} from "react-query";
import * as orderService from "../../services/order";
import MethodContext from "../../context/methodProvider";

const Order = () => {

    const {notify, formatNumber} = useContext(MethodContext)
    const [paramObject, setParamObject] = useState({pageSize: 6, pageNo: 1})
    const [orderItem, setOrderItem] = useState({})
    const [status, setStatus] = useState(null)
    const accessToken = localStorage.getItem('token');
    const statusMapping = {
        "Đang Giao Hàng": 5,
        "Đã Giao Hàng": 3
    };
    const queryClient = useQueryClient();
    const {
        data: orders
    } = useQuery(["all-orders", paramObject], () => orderService.getAllOrder(accessToken, paramObject));

    const {
        data: summaryOrders
    } = useQuery(["summary-orders", paramObject], () => orderService.getSummaryOrder(accessToken));

    const handleApprove = async ({orderId, isAccept}) => {
        return await orderService.approveOrder(accessToken, {orderId, isAccept})
    }

    const handleChangeStatus = async ({statusId, orderItemId}) => {
        return await orderService.changeStatus(accessToken, {statusId, orderItemId: orderItemId})
    }

    const {mutate} = useMutation({
        mutationFn: (body) => {
            return handleApprove(body)
        },
        onSuccess: (data) => {
            if (data?.status !== 200) {
                notify("Approve order fail!", "error");
            } else {
                notify("Approve order successfully!", "success");
                queryClient.invalidateQueries({queryKey: ["all-orders", paramObject]});
            }
        },
        onError: (err) => {
            notify("Approve order fail!", "error");
        }
    });

    const {mutate: mutateChangeStatus} = useMutation({
        mutationFn: (body) => {
            return handleChangeStatus(body)
        },
        onSuccess: (data, variables, context) => {
            if (data?.status !== 200) {
                notify("Change order status fail!", "error");
            } else {
                notify("Change order status successfully!", "success");
                queryClient.invalidateQueries({queryKey: ["all-orders", paramObject]});
            }
        },
        onError: (err) => {
            notify("Change order status fail!", "error");
        }
    });


    return (
        <div className="relative h-screen mx-5 pt-8 fill-available">
            <h1 className="text-center font-bold text-3xl bg-gradient-to-r from-red-400 to-red-800 text-transparent bg-clip-text">Approve
                Order</h1>
            <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  gap-5 mt-10">
                <div
                    className="p-3 border-[0.5px] border-gray-400 rounded-lg text-black bg-white flex items-center mt-5 md:mt-0 ">
                    <LiaFileInvoiceDollarSolid className="text-5xl text-red-400 mx-2"/>
                    <div className="">
                        <p className="text-xl font-bold">{summaryOrders?.data?.totalOrders || "0"}</p>
                        <p className="font-medium text-xs text-gray-300">Total Orders</p>
                    </div>
                </div>

                <div
                    className="p-3 border-[0.5px] border-gray-400 rounded-lg text-black bg-white flex items-center mt-5 md:mt-0">
                    <MdOutlineFreeCancellation className="text-5xl text-red-400 mx-2"/>
                    <div className="">
                        <p className="text-xl font-bold">{summaryOrders?.data?.cancelledOrders || "0"}</p>
                        <p className="font-medium text-xs text-gray-300">Total Canceled</p>
                    </div>
                </div>

                <div
                    className="p-3 border-[0.5px] border-gray-400 rounded-lg text-black bg-white flex items-center mt-5 md:mt-0">
                    <MdOutlineDeliveryDining className="text-5xl text-red-400 mx-2"/>
                    <div className="">
                        <p className="text-xl font-bold">{summaryOrders?.data?.deliveredOrders || "0"}</p>
                        <p className="font-medium text-xs text-gray-300">Total Delivery</p>
                    </div>
                </div>

                <div
                    className="p-3 border-[0.5px] border-gray-400 rounded-lg text-black bg-white flex items-center mt-5 md:mt-0">
                    <GiTakeMyMoney className="text-5xl text-red-400 mx-2"/>
                    <div className="">
                        <p className="text-xl font-bold">${formatNumber(summaryOrders?.data?.totalPrice)}</p>
                        <p className="font-medium text-xs text-gray-300">Total Revenue</p>
                    </div>
                </div>
            </div>

            <div className="mt-5 rounded-lg max-h-[450px]">
                <table className="w-full shadow-lg rounded-lg bg-white">
                    <thead className="">
                    <tr className="w-full grid grid-cols-12 py-1 bg-gray-300 rounded-t-lg pb-2">
                        <td className="px-2 text-center uppercase font-medium text-sm col-span-2  md:col-span-1">Id</td>
                        <td className="px-2 text-center uppercase font-medium text-sm hidden md:block md:col-span-2">Delivery</td>
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
                    {orders?.data?.orderHistories?.length > 0 ?
                        orders.data?.orderHistories?.map((order, index) => {
                            return (
                                <tr key={order?.id}
                                    className={`w-full grid grid-cols-12 items-center py-1 hover:cursor-pointer border-b-2 border-gray-300`}
                                    onClick={() => {
                                        setOrderItem(order)
                                        document.getElementById('my_modal_5').showModal()
                                    }}>
                                    <td className="truncate px-2 text-center font-medium text-sm col-span-2  md:col-span-1">#{order?.id}</td>
                                    <td className="truncate px-2 text-center font-medium text-sm hidden md:block md:col-span-2">{order?.delivery?.deliveryMethod}</td>
                                    <td className="truncate px-2 text-center font-medium text-sm col-span-3  md:col-span-3">{formatNumber(order?.totalPrice)}$
                                    </td>
                                    <td className="truncate px-2 text-center font-medium text-sm col-span-3 md:col-span-3"
                                        onClick={(e) => {
                                            e.stopPropagation()
                                        }}
                                    >
                                        <select
                                            onChange={async (e) => {
                                                const selectedStatus = e.target.value;
                                                const statusId = statusMapping[selectedStatus];
                                                await mutateChangeStatus({statusId, orderItemId: order?.id})
                                            }}
                                            value={status || order?.orderStatus?.statusName}
                                            className="select select-accent w-full max-w-xs border-none focus:outline-none py-1">
                                            <option disabled
                                                    selected>{status || order?.orderStatus?.statusName}</option>
                                            {
                                                order?.orderStatus?.id === 2 && <>
                                                    <option value="Đang Giao Hàng">Đang Giao Hàng</option>
                                                    <option value="Đã Giao Hàng">Đã Giao Hàng</option>
                                                </>
                                            }
                                        </select>
                                    </td>
                                    <td className="px-2 text-center font-medium text-sm col-span-4 md:col-span-3 sm:flex sm:justify-around sm:items-center py-1 ">
                                        {
                                            order?.orderStatus?.id === 1 ? <>
                                                <button
                                                    onClick={async (e) => {
                                                        e.stopPropagation();
                                                        await mutate({orderId: order?.id, isAccept: true})
                                                    }}
                                                    className="ml-2 lg:ml-0 w-20 sm:w-24  py-2 border-none text-green-500 bg-green-200/40 rounded-lg  transition-all">
                                                    Accept
                                                </button>
                                                <button
                                                    onClick={async (e) => {
                                                        e.stopPropagation();
                                                        await mutate({orderId: order?.id, isAccept: false})
                                                    }}
                                                    className="mt-2 sm:mt-0 ml-2 lg:ml-0 w-20 sm:w-24  py-2 border-none text-red-500 bg-red-200/40 rounded-lg  transition-all">
                                                    Reject
                                                </button>
                                            </> : <p className="text-xm text-red-400">Đã Xử Lý</p>
                                        }

                                    </td>
                                </tr>
                            )
                        }) : <div className="flex flex-col justify-center items-center">
                            <img className="w-[200px] h-[200px] mt-10"
                                 src="https://cdni.iconscout.com/illustration/premium/thumb/man-receiving-canceled-orders-back-4438793-3718471.png"
                                 alt=""/>
                            <p className="text-lg font-bold mb-10">No orders yet!</p>
                        </div>
                    }
                    </tbody>
                </table>
                <OrderItem infoOrderItem={orderItem}/>
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 join grid grid-cols-2 ">
                    <button
                        onClick={() => {
                            setParamObject({
                                ...paramObject,
                                pageNo: paramObject?.pageNo - 1 === 0 ? 1 : paramObject?.pageNo - 1
                            })
                        }}
                        className="join-item btn btn-outline hover:bg-red-400 hover:text-white border-red-400 hover:border-red-400">Previous
                        page
                    </button>
                    <button
                        onClick={() => {
                            setParamObject({
                                ...paramObject,
                                pageNo: paramObject?.pageNo + 1
                            })
                        }}
                        className="join-item btn btn-outline hover:bg-red-400 hover:text-white border-red-400 hover:border-red-400">Next
                    </button>
                </div>
            </div>
        </div>)
}

export default Order

