import React, {useContext, useEffect, useState} from 'react'
import {MdOutlineAddLocationAlt} from "react-icons/md";
import {GrAdd} from "react-icons/gr";
import DropList from "../../components/animation/DropList";
import ShipDetailItem from "../../components/modal/ShipDetailItem";
import {Link, useNavigate, useParams} from "react-router-dom";
import {useQuery} from "react-query";
import * as shipDetailService from "../../services/shipDetail";
import * as cartService from "../../services/cart";
import * as orderServices from "../../services/order";
import VoucherCom from "../../components/voucher/VoucherCom";
import MethodContext from "../../context/methodProvider";

const ShipDetail = () => {
    const [action, setAction] = useState(false)
    const [shipDetail, setShipDetail] = useState({id: 1})
    const [methodShipping, setMethodShipping] = useState({id: 0})
    const [methodPayment, setMethodPayment] = useState({id: 0})
    const [totalPrice, setTotalPrice] = useState(0)
    const [voucher, setVoucher] = useState({discount: 0})
    const [isLoadingPayment, setIsLoadingPayment] = useState(false);
    const [paramsOrder, setParamsOrder] = useState({});
    const [paramsPayment, setParamsPayment] = useState({});
    const {notify, formatNumber, toastLoadingId, toastUpdateLoadingId} = useContext(MethodContext)
    const navigate = useNavigate();
    const accessToken = localStorage.getItem('token');
    const {
        data: shipDetails,
        isLoading,
    } = useQuery(["shipDetails"], () => shipDetailService.getShipDetails(accessToken));
    const {
        data: cartData,
    } = useQuery(["cart", action], () => cartService.getCart(accessToken, {}));


    useEffect(() => {
        const totalPriceIn = cartData?.data?.totalPrice;
        if (voucher && voucher.discount) {
            const discount = voucher?.discount
            setTotalPrice(totalPriceIn - (totalPriceIn * discount));
        } else {
            setTotalPrice(totalPriceIn);
        }
    }, [cartData, voucher]);

    const {cartItemIds} = useParams();
    const [cartItem, setCartItem] = useState([])

    useEffect(() => {
        if (!accessToken || accessToken === 'undefined') {
            navigate('/login');
        }
        console.log(cartItemIds)
        const cartItemIdArray = cartItemIds.split(',').map(Number);
        setCartItem(cartItemIdArray)
    }, [])


    useEffect(() => {
        setParamsOrder(prevState => ({
            ...prevState,
            shipDetailId: shipDetail?.id,
            deliveryId: methodShipping?.id,
            paymentId: methodPayment?.id,
            voucherId: voucher?.id,
        }));
    }, [shipDetail, methodShipping, methodPayment, voucher]);

    const isErrorInput = () => {
        if (!shipDetail?.id) {
            notify("You need enter ship detail!", "error")
            return true;
        }
        if (methodShipping?.id === 0) {
            notify("You need enter method shipping!", "error")
            return true;
        }
        if (methodPayment?.id === 0) {
            notify("You need enter method payment!", "error")
            return true;
        }

        setParamsOrder(prevState => ({
            ...prevState,
            shipDetailId: shipDetail?.id,
            deliveryId: methodShipping?.id,
            paymentId: methodPayment?.id,
            voucherId: voucher?.id ? voucher?.id : null,
        }))
        console.log(paramsOrder)
        return false;
    }


    const handlePayment = async () => {
        // handle validation input
        if (isErrorInput())
            return;
        console.log(methodPayment)
        const id = toastLoadingId("Transaction in progress...")
        setIsLoadingPayment(true);
        // if payment not by zalopay
        if (methodPayment?.id === 1) {
            const responseCreateOrder = await orderServices.createOrder(accessToken, paramsOrder, cartItem);
            if (responseCreateOrder.status === 201) {
                setIsLoadingPayment(false)
                navigate('/profile/order-histories', {
                    state: {
                        id: id,
                        toastMessage: "Order successfully!",
                        statusMessage: "success"
                    }
                })
            } else {
                console.log(responseCreateOrder)
                if (responseCreateOrder?.response?.data?.message === "Not enough quantity in stock!") {
                    toastUpdateLoadingId("Not enough quantity in stock!", "error", id);
                } else {
                    toastUpdateLoadingId("Create order fail!", "error", id);
                }
                setIsLoadingPayment(false)
            }
            return;
        }

        let paymentSuccessful = false;
        const responseCreatePayment = await orderServices.createPayment(accessToken, paramsPayment, cartItem)
        console.log(responseCreatePayment)
        if (responseCreatePayment?.status === 201) {
            console.log(responseCreatePayment)
            const paymentUrl = responseCreatePayment?.data?.paymentUrl
            console.log(paymentUrl)
            const zpTransToken = responseCreatePayment?.data?.zpTransToken
            setParamsOrder(prevState => ({
                ...prevState,
                zpTransToken: zpTransToken
            }));
            // link to page payment
            window.open(paymentUrl, '_blank');
            // set up interval
            const intervalID = setInterval(async () => {
                if (paymentSuccessful) {
                    // clear interval
                    clearInterval(intervalID);
                    setIsLoadingPayment(false)
                    navigate('/profile/order-histories', {
                        state: {
                            id: id,
                            toastMessage: "Transaction successfully!",
                            statusMessage: "success"
                        }
                    })
                    return;
                }
                const responseCreateOrder = await orderServices.createOrder(accessToken, paramsOrder, cartItem);
                console.log(responseCreateOrder)
                if (responseCreateOrder.status === 201) {
                    paymentSuccessful = true;
                }
            }, 5000); // each 5 seconds

            // set timeout to stop after 15 minutes
            setTimeout(() => {
                clearInterval(intervalID); // stop interval
                setIsLoadingPayment(false)
                console.log("Dừng thực hiện sau 15 phút!");
            }, 15 * 60 * 1000); // 15 minutes * 60 second/minute * 1000 ms/second
        } else {
            if (responseCreatePayment?.response?.data?.message === "Not enough quantity in stock!") {
                toastUpdateLoadingId("Not enough quantity in stock!", "error", id);
            } else {
                toastUpdateLoadingId("Transaction failed!", "error", id);
            }
            setIsLoadingPayment(false)
        }
    }

    return (<>
            <div className="max-w-[1200px] grid grid-cols-12 gap-5 mt-40 mx-10 lg:px-2 lg:mx-auto">
                <h1 className="col-span-12 font-semibold text-xl">Ship Detail</h1>
                <div className="bg-white col-span-12 lg:col-span-8  overflow-y-scroll no-scrollbar">
                    <div className="p-3 mb-3 rounded-lg border-[0.2px] border-gray-300 shadow-lg">
                        <p className="flex items-center text-lg font-bold"><MdOutlineAddLocationAlt
                            className="mr-2"/> Address </p>
                        <div className="grid grid-cols-2 gap-4 mt-3">
                            {
                                isLoading ? <div>LOADING...</div> :
                                    shipDetails?.status === 200 && shipDetails?.data?.shipDetails.length > 0 ?
                                        shipDetails?.data?.shipDetails.slice(0, 3).map(item => {
                                            return (
                                                <div
                                                    key={item?.id}
                                                    onClick={() => setShipDetail(item)}
                                                    className={`p-3 border-[1px] hover:border-[#FF9FA0] rounded-lg hover:cursor-pointer ${shipDetail?.id === item?.id && "border-[#FF9FA0]"} transition-all`}>
                                                    <p className="">{item?.fullName}</p>
                                                    <p className="">{item?.phoneNumber}</p>
                                                    <p className="truncate">{item?.address}</p>
                                                </div>)
                                        }) : <div>Not Address</div>

                            }
                            <div
                                className="p-3 flex flex-col items-center justify-center border-[1px] border-gray-300 hover:border-[#FF9FA0] border-dashed rounded-lg hover:cursor-pointer"
                                onClick={() => document.getElementById('my_modal_4').showModal()}
                            >
                                <GrAdd/>
                                <p className="text-gray-300 mt-2">Add new address</p>
                            </div>
                        </div>

                        <ShipDetailItem shipDetails={shipDetails?.data?.shipDetails} itemShip={shipDetail}
                                        setItemShip={setShipDetail}/>
                    </div>
                    {/*Method*/}
                    <DropList title={"method shipping"} listItem={[{id: 1, name: "GHTK"}, {id: 2, name: "J&T"}]}
                              type={"shipping"} setItem={setMethodShipping}></DropList>
                    <DropList title={"method payment"}
                              listItem={[{id: 1, name: "Thanh Toan Khi Nhan Hang"}, {id: 2, name: "Zalo Pay"}]}
                              type={"payment"} setItem={setMethodPayment}></DropList>

                </div>
                <div className="bg-white col-span-12 lg:col-span-4 flex-grow">
                    <div className="w-full flex justify-between gap-2">
                        <Link to="/cart" relative={"route"} className="w-full">
                            <button type="button"
                                    className="w-full text-center bg-white hover:bg-red-500 hover:text-white border-[1px] border-red-400 py-3 px-4 rounded font-bold mr-3 shadow-lg transition-all">
                                Cart
                            </button>
                        </Link>
                        <button type="button"
                                onClick={handlePayment}
                                className="w-full text-center bg-red-500 hover:bg-white hover:border-[1px] hover:border-red-400 hover:text-black text-white font-bold py-3 px-4 rounded shadow-lg transition-all">
                            {isLoadingPayment ?
                                <span className="loading loading-spinner loading-xs text-white"></span> : "Payment"}

                        </button>
                    </div>
                    <div
                        className="w-full mt-4 bg-white rounded-lg shadow-md p-3 max-h-[260px] overflow-y-scroll no-scrollbar border-[0.2px] border-gray-300">
                        {isLoading ? <span
                            className="loading loading-dots loading-lg text-xl "></span> : (cartData.status === 200 && cartData?.data?.carts.length > 0) && cartData?.data?.carts.map((item) => {
                            return (<Link to="/">
                                <div key={item?.product?.id}
                                     className="flex gap-4 p-2 mb-2 border-[0.2px] border-white hover:border-[#FF9FA0] rounded-lg transition-all">
                                    <img
                                        src={item?.product?.images[0]?.imageUrl}
                                        alt={item?.product?.productName} className="w-[66px] h-[66px] object-cover"/>
                                    <div className="w-full flex flex-col justify-between">
                                        <p className="block text-sm">{item?.product?.productName}</p>
                                        <p className="block text-sm"><span
                                            className="font-medium">{item?.product?.actualPrice}</span> ₫(total price
                                            {item?.product?.salePrice}
                                            ₫)</p>
                                    </div>
                                </div>
                            </Link>)
                        })
                        }

                    </div>

                    {/*Voucher*/}
                    <VoucherCom conditionApply={totalPrice} voucherActive={setVoucher}
                                voucherDetail={voucher}/>
                    <div className="w-full mt-4 bg-white rounded-lg shadow-md px-3 mb-2 border-[0.2px] border-gray-300">
                        <div className="mx-3 mb-3 flex justify-between items-center border-b-[1px] border-gray-300">
                            <p className="py-2 ">Price </p>
                            <p className="py-2 ">{formatNumber(cartData?.data?.totalPrice)}$ </p>
                        </div>
                        <div className="mx-3 mb-3 flex justify-between items-center border-b-[1px] border-gray-300">
                            <p className="py-2 ">Discount </p>
                            <p className="py-2 ">{voucher?.discount * 100}% </p>
                        </div>
                        <div className="mx-3 mb-3 flex justify-between items-center text-red-400">
                            <p className="py-2 ">Total </p>
                            <p className="py-2 ">{formatNumber(totalPrice)}$ </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ShipDetail
