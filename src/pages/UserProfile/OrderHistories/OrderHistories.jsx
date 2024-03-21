import React, {useState, useCallback, useEffect, useRef, useContext} from "react";
import {IoIosSearch} from "react-icons/io";
import {CiCircleRemove} from "react-icons/ci";
import {FaCloudUploadAlt, FaTimes} from "react-icons/fa";
import {useDropzone} from "react-dropzone";
import {useNavigate} from "react-router-dom";
import {useDebounce} from "@uidotdev/usehooks";
import OrderItem from "../../../components/modal/OrderItem";
import {useQuery} from "react-query";
import * as orderService from "../../../services/order";
import MethodContext from "../../../context/methodProvider";

const PRODUCT_URL = "/product";

const OrderHistories = () => {
    const [showForm, setShowForm] = useState(false);
    const [images, setImages] = useState([]);
    const accessToken = localStorage.getItem("token");
    const [pagination, setPagination] = useState({
        page: 1,
        totalPage: 2,
    });
    const {notify, formatNumber} = useContext(MethodContext)
    const {
        data: orders
    } = useQuery(["orders", {}], () => orderService.getOrderHistories(accessToken));

    const [products, setProducts] = useState([]);
    const token = localStorage.getItem("access-token");
    const tokenRf = localStorage.getItem("refresh-token");
    const [values, setValues] = useState({
        id: "",
        productName: "",
        description: "",
        startingPrice: 0,
        categoryId: "",
        censorId: "",
    });
    const [centos, setCentos] = useState([]);
    const [categories, setCategories] = useState([]);
    const navigation = useNavigate();
    const [productName, setProductName] = useState("");
    const debouncedSearchTerm = useDebounce(productName, 500);

    const onDrop = useCallback((acceptedFiles) => {
        setImages((prevImages) => [...prevImages, ...acceptedFiles]);
    }, []);

    const removeImage = (indexToRemove) => {
        setImages((prevImages) => prevImages.filter((_, index) => index !== indexToRemove));
    };

    const {getRootProps, getInputProps, acceptedFiles} = useDropzone({
        onDrop,
        accept: "image/*", // Specify accepted file types
        multiple: true, // Allow multiple files to be dropped
    });


    return (
        <div className="overflow-x-auto ">
            <div className="mt-5 rounded-lg max-h-full">
                {
                    orders?.data?.orderHistories?.length > 0 ?
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
                            {
                                orders.data?.orderHistories?.map((order, index) => {
                                    return (
                                        <tr key={order?.id}
                                            className={`w-full grid grid-cols-12 items-center py-1 hover:cursor-pointer border-b-2 border-gray-300`}
                                            onClick={() => {
                                                // setOrderItem(order)
                                                document.getElementById('my_modal_5').showModal()
                                            }}>
                                            <td className="truncate px-2 text-center font-medium text-sm col-span-2  md:col-span-1">{order?.id}</td>
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
                                                        // const statusId = statusMapping[selectedStatus];
                                                        // await mutateChangeStatus({statusId, orderItemId: order?.id})
                                                    }}
                                                    // value={status || order?.orderStatus?.statusName}
                                                    className="select select-accent w-full max-w-xs border-none focus:outline-none py-1">
                                                    <option disabled
                                                            selected>
                                                        {/*{status || order?.orderStatus?.statusName}*/}
                                                    </option>
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
                                                                // await mutate({orderId: order?.id, isAccept: true})
                                                            }}
                                                            className="ml-2 lg:ml-0 w-20 sm:w-24  py-2 border-none text-green-500 bg-green-200/40 rounded-lg  transition-all">
                                                            Accept
                                                        </button>
                                                        <button
                                                            onClick={async (e) => {
                                                                e.stopPropagation();
                                                                // await mutate({orderId: order?.id, isAccept: false})
                                                            }}
                                                            className="mt-2 sm:mt-0 ml-2 lg:ml-0 w-20 sm:w-24  py-2 border-none text-red-500 bg-red-200/40 rounded-lg  transition-all">
                                                            Reject
                                                        </button>
                                                    </> : <p className="text-xm text-red-400">Đã Xử Lý</p>
                                                }

                                            </td>
                                        </tr>
                                    )
                                })
                            }
                            </tbody>
                        </table> :
                        <div className="flex flex-col justify-center items-center">
                            <img className="w-[200px] h-[200px] mt-10"
                                 src="https://cdni.iconscout.com/illustration/premium/thumb/man-receiving-canceled-orders-back-4438793-3718471.png"
                                 alt=""/>
                            <p className="text-lg font-bold mb-10">No orders yet!</p>
                        </div>
                }
                <OrderItem infoOrderItem={{}}/>
            </div>
        </div>
    );
};

export default OrderHistories;
