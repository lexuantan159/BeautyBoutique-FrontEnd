import React, {useEffect, useState} from 'react'
import {MdOutlineAddLocationAlt, MdOutlineLocalShipping, MdOutlinePayments} from "react-icons/md";
import {GrAdd} from "react-icons/gr";
import {motion} from "framer-motion"
import DropList from "../../components/animation/DropList";
import ShipDetailItem from "../../components/modal/ShipDetailItem";
import {Link} from "react-router-dom";
import {useQuery} from "react-query";
import * as shipDetailService from "../../services/shipDetail";
import * as cartService from "../../services/cart";
import {Navigate, useLocation} from 'react-router-dom';

const ShipDetail = () => {

    const [action, setAction] = useState(false)
    const [discount, setDiscount] = useState(0)
    const [shipDetail, setShipDetail] = useState({})
    let totalPriceWithDiscount = 0;
    const {
        data: shipDetails,
        isLoading,
    } = useQuery(["shipDetails", action], () => shipDetailService.getShipDetails({userId: 1}));
    const {
        data: cartData,
    } = useQuery(["cart", action], () => cartService.getCart({userId: 1}));
    const location = useLocation();

    console.log(shipDetails)

    useEffect(() => {
        // if (!location.state || !location.state.fromCart) {
        //     return <Navigate to="/cart"/>;
        // }

        if (cartData) {
            totalPriceWithDiscount = discount === 0 ? cartData?.data?.totalPrice : cartData?.data?.totalPrice * discount;
        }
    }, [cartData]);

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
                                        shipDetails?.data?.shipDetails.map(item => {
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
                                onClick={() => document.getElementById('my_modal_5').showModal()}
                            >
                                <GrAdd/>
                                <p className="text-gray-300 mt-2">Add new address</p>
                            </div>
                        </div>
                        <ShipDetailItem shipDetails={shipDetails?.data?.shipDetails} itemShip={shipDetail} setItemShip={setShipDetail}/>
                    </div>
                    {/*Method*/}
                    <DropList title={"method shipping"} listItem={[{id: 2, name: "J&T"}]}
                              Icon={"MdOutlineLocalShipping"}></DropList>
                    <DropList title={"method payment"}
                              listItem={[{id: 1, name: "Thanh Toan Khi Nhan Hang"}, {id: 2, name: "Zalo Pay"}]}
                              Icon={"MdOutlinePayments"}></DropList>

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
                                className="w-full text-center bg-red-500 hover:bg-white hover:border-[1px] hover:border-red-400 hover:text-black text-white font-bold py-3 px-4 rounded shadow-lg transition-all">
                            Payment
                        </button>
                    </div>
                    <div
                        className="w-full mt-4 bg-white rounded-lg shadow-md p-3 max-h-[260px] overflow-y-scroll no-scrollbar border-[0.2px] border-gray-300">
                        <div className="flex gap-4 p-2 mb-2">
                            <img
                                src="https://img.freepik.com/premium-photo/vibrant-packaging-design-skinca-stair-scene-concept-creative-design-luxury-elegant_655090-472454.jpg"
                                alt="product" className="w-[66px] h-[66px] object-cover"/>
                            <div className="w-full flex flex-col justify-between">
                                <p className="block text-sm">Nước Tẩy Trang Chacott Cleansing Water 500ml</p>
                                <p className="block text-sm"><span className="font-medium">350.000</span> ₫(trị giá
                                    650.000
                                    ₫)</p>
                            </div>
                        </div>
                        <div className="flex gap-4 p-2 mb-2">
                            <img
                                src="https://img.freepik.com/premium-photo/vibrant-packaging-design-skinca-stair-scene-concept-creative-design-luxury-elegant_655090-472454.jpg"
                                alt="product" className="w-[66px] h-[66px] object-cover"/>
                            <div className="w-full flex flex-col justify-between">
                                <p className="block text-sm">Nước Tẩy Trang Chacott Cleansing Water 500ml</p>
                                <p className="block text-sm"><span className="font-medium">350.000</span> ₫(trị giá
                                    650.000
                                    ₫)</p>
                            </div>
                        </div>
                        <div className="flex gap-4 p-2 mb-2">
                            <img
                                src="https://img.freepik.com/premium-photo/vibrant-packaging-design-skinca-stair-scene-concept-creative-design-luxury-elegant_655090-472454.jpg"
                                alt="product" className="w-[66px] h-[66px] object-cover"/>
                            <div className="w-full flex flex-col justify-between">
                                <p className="block text-sm">Nước Tẩy Trang Chacott Cleansing Water 500ml</p>
                                <p className="block text-sm"><span className="font-medium">350.000</span> ₫(trị giá
                                    650.000
                                    ₫)</p>
                            </div>
                        </div>
                    </div>
                    <div className="w-full mt-4 bg-white rounded-lg shadow-md px-3 mb-2 border-[0.2px] border-gray-300">
                        <div className="mx-3 mb-3 flex justify-between items-center border-b-[1px] border-gray-300">
                            <p className="py-2 ">Price </p>
                            <p className="py-2 ">{cartData?.totalPrice || 0}$ </p>
                        </div>
                        <div className="mx-3 mb-3 flex justify-between items-center border-b-[1px] border-gray-300">
                            <p className="py-2 ">Discount </p>
                            <p className="py-2 ">{discount}% </p>
                        </div>
                        <div className="mx-3 mb-3 flex justify-between items-center text-[#FF9FA0]">
                            <p className="py-2 ">Total </p>
                            <p className="py-2 ">{totalPriceWithDiscount}$ </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default ShipDetail