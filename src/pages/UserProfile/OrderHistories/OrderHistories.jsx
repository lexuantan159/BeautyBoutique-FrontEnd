import React, {useState, useContext, useEffect} from "react";
import OrderItem from "../../../components/modal/OrderItem";
import {useMutation, useQuery, useQueryClient} from "react-query";
import * as orderService from "../../../services/order";
import MethodContext from "../../../context/methodProvider";
import {TbFilter} from "react-icons/tb";
import {useLocation, useNavigate} from "react-router-dom";

const OrderHistories = () => {
    const accessToken = localStorage.getItem("token");
    const {notify, formatNumber, toastUpdateLoadingId,formatDateTime} = useContext(MethodContext)
    const queryClient = useQueryClient();
    const [paramObject, setParamObject] = useState({pageSize: 6, pageNo: 1})
    const location = useLocation();
    const navigate = useNavigate();
    const {
        data: orders
    } = useQuery(["orders", paramObject], () => orderService.getOrderHistories(accessToken, paramObject));
    const [orderItem, setOrderItem] = useState({});

    const handleCancel = async ({orderId}) => {
        return await orderService.cancelOrder(accessToken, {orderId})
    }

    useEffect(() => {
        if (location.state?.toastMessage !== '') {
            toastUpdateLoadingId(location.state?.toastMessage, location.state?.statusMessage, location?.state?.id);
            navigate(location.pathname, {replace: true, state: {}});
        }
    }, []);

    const {mutate} = useMutation({
        mutationFn: (body) => {
            return handleCancel(body)
        },
        onSuccess: (data) => {
            if (data?.status !== 200) {
                notify("Cancel order fail!", "error");
            } else {
                notify("Cancel order successfully!", "success");
                queryClient.invalidateQueries({queryKey: ["orders"]});
            }
        },
        onError: (err) => {
            notify("Cancel order fail!", "error");
        }
    });


    return (
        <div className="overflow-x-auto ">
            <div className="relative mt-5 rounded-lg h-screen">
                <h1 className="text-center font-bold text-3xl bg-gradient-to-r from-red-400 to-red-800 text-transparent bg-clip-text">Approve
                    Order</h1>
                {
                    orders?.data?.orderHistories?.length > 0 ?
                        <>
                            <table className="w-full shadow-lg rounded-lg bg-white mt-8">
                                <thead className="">
                                <tr className="w-full grid grid-cols-12 py-1 bg-gray-300 rounded-t-lg pb-2">
                                    <td className="px-2 text-center uppercase font-medium text-sm col-span-2 md:col-span-1 flex items-center gap-4 justify-center hover:cursor-pointer"
                                        onClick={() => {
                                            setParamObject(prevState => ({
                                                ...prevState,
                                                sortBy: "id",
                                                sortDir: paramObject?.sortDir === "ASC" ? "DESC" : "ASC"
                                            }))
                                        }}
                                    >Id
                                        <TbFilter/>
                                    </td>
                                    <td className="px-2 text-center uppercase font-medium text-sm hidden md:col-span-2 md:flex items-center gap-4 justify-center hover:cursor-pointer"
                                        onClick={() => {
                                            setParamObject(prevState => ({
                                                ...prevState,
                                                sortBy: "id",
                                                sortDir: paramObject?.sortDir === "ASC" ? "DESC" : "ASC"
                                            }))
                                        }}>Created At
                                        <TbFilter/>
                                    </td>
                                    <td className="px-2 text-center uppercase font-medium text-sm col-span-3  md:col-span-3 flex items-center gap-4 justify-center hover:cursor-pointer"
                                        onClick={() => {
                                            setParamObject(prevState => ({
                                                ...prevState,
                                                sortBy: "totalPrice",
                                                sortDir: paramObject?.sortDir === "ASC" ? "DESC" : "ASC"
                                            }))
                                        }}
                                    >Total
                                        Price
                                        <TbFilter/>
                                    </td>
                                    <td className="px-2 text-center uppercase font-medium text-sm col-span-3 md:col-span-3">Order
                                        Status
                                    </td>
                                    <td className="px-2 text-center uppercase font-medium text-sm col-span-4 md:col-span-3">Action</td>
                                </tr>
                                </thead>
                                <tbody className="">
                                {
                                    orders.data?.orderHistories?.map((order, index) => {
                                        return (
                                            <tr key={order?.id}
                                                className={`w-full grid grid-cols-12 items-center py-1 hover:cursor-pointer border-b-2 border-gray-300`}
                                                onClick={() => {
                                                    setOrderItem(order)
                                                    document.getElementById('my_modal_5').showModal()
                                                }}>
                                                <td className="truncate px-2 text-center font-medium text-sm col-span-2  md:col-span-1">#{order?.id}</td>
                                                <td className="truncate px-2 text-center font-medium text-sm hidden md:block md:col-span-2">{formatDateTime(order?.createdAt)}</td>
                                                <td className="truncate px-2 text-center font-medium text-sm col-span-3  md:col-span-3">{formatNumber(order?.totalPrice)}$
                                                </td>
                                                <td className="truncate px-2 text-center font-medium text-sm col-span-3 md:col-span-3"
                                                    onClick={(e) => {
                                                        e.stopPropagation()
                                                    }}
                                                >
                                                    <select
                                                        value={order?.orderStatus?.statusName}
                                                        className="select select-accent w-full max-w-xs border-none focus:outline-none py-1">
                                                        <option disabled selected>
                                                            {order?.orderStatus?.statusName}
                                                        </option>
                                                    </select>
                                                </td>
                                                <td className="px-2 text-center font-medium text-sm col-span-4 md:col-span-3 sm:flex sm:justify-around sm:items-center py-1 ">
                                                    {
                                                        order?.orderStatus?.id === 1 ?
                                                            <button
                                                                onClick={async (e) => {
                                                                    e.stopPropagation();
                                                                    await mutate({orderId: order?.id})
                                                                }}
                                                                className="ml-2 lg:ml-0 w-20 sm:w-24  py-2 border-none text-red-500 bg-red-200/40 rounded-lg  transition-all">
                                                                Cancel Order
                                                            </button>
                                                            : <p className="text-xm text-red-400">Not Action</p>
                                                    }

                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                                </tbody>
                            </table>
                        </> :
                        <div className="flex flex-col justify-center items-center">
                            <img className="w-[200px] h-[200px] mt-10"
                                 src="https://cdni.iconscout.com/illustration/premium/thumb/man-receiving-canceled-orders-back-4438793-3718471.png"
                                 alt=""/>
                            <p className="text-lg font-bold mb-10">No orders yet!</p>
                        </div>
                }
                <OrderItem infoOrderItem={orderItem}/>
                <div className="absolute bottom-16 left-1/2 -translate-x-1/2 join grid grid-cols-2 ">
                    <button
                        onClick={async () => {
                            await setParamObject({
                                ...paramObject,
                                pageNo: paramObject?.pageNo - 1 === 0 ? 1 : paramObject?.pageNo - 1
                            })
                        }}
                        className="join-item btn btn-outline hover:bg-red-400 hover:text-white border-red-400 hover:border-red-400">Previous
                        page
                    </button>
                    <button
                        onClick={async () => {
                            await setParamObject({
                                ...paramObject,
                                pageNo: paramObject?.pageNo + 1
                            })
                        }}
                        className="join-item btn btn-outline hover:bg-red-400 hover:text-white border-red-400 hover:border-red-400">Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OrderHistories;
