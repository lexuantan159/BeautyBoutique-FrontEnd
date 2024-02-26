import React, {useState} from 'react'
import {GoChevronDown, GoChevronRight} from "react-icons/go";
import {MdOutlineAddLocationAlt, MdOutlineLocalShipping, MdOutlinePayments} from "react-icons/md";
import {GrAdd} from "react-icons/gr";
import {motion} from "framer-motion"

const ShipDetail = () => {

    const [isExpanded, setIsExpanded] = useState(false);

    const handleClick = () => {
        setIsExpanded(!isExpanded);
    };

    const container = {
        hidden: {opacity: 0, height: "0px", backgroundColor: "white"},
        show: {
            opacity: 1,
            height: "85px",
            transition: {
                easing: "linear",
            }
        }
    }

    const itemCross = {
        hidden: {opacity: 1, rotate: 0},
        show: {opacity: 1, rotate: 90}
    }
    const item = {
        hidden: {opacity: 0},
        show: {
            opacity: 1,
            transition: {
                easing: "linear",
            }
        }
    }

    return (<>
            <div className="max-w-[1200px] grid grid-cols-12 gap-5 mt-40 mx-auto">
                <h1 className="col-span-12 font-bold text-xl">Ship Detail <span className="font-normal"></span></h1>
                <div className="bg-white col-span-8 max-h-[430px] overflow-y-scroll no-scrollbar">
                    <div className="p-3 mb-3 rounded-lg border-[0.2px] border-gray-300 shadow-lg">
                        <p className="flex items-center text-lg font-bold"><MdOutlineAddLocationAlt
                            className="mr-2"/> Address </p>
                        <div className="grid grid-cols-2 gap-4 mt-3">
                            <div className="p-3 border-[1px] border-red-500 rounded-lg hover:cursor-pointer ">
                                <p className="">Nguyen Van A</p>
                                <p className="">031653515135</p>
                                <p className="truncate">194 Tô hiệu, P Hoa minh, Q Liên Chiểu, Đà Nẵng, TP Đà Nẵng</p>
                            </div>
                            <div className="p-3 border-[1px] border-gray-300 rounded-lg hover:cursor-pointer ">
                                <p className="">Nguyen Van A</p>
                                <p className="">031653515135</p>
                                <p className="truncate">194 Tô hiệu, P Hoa minh, Q Liên Chiểu, Đà Nẵng, TP Đà Nẵng</p>
                            </div>
                            <div
                                className="p-3 flex flex-col items-center justify-center border-[1px] border-gray-300 border-dashed rounded-lg hover:cursor-pointer">
                                <GrAdd/>
                                <p className="text-gray-300 mt-2">Add new address</p>
                            </div>
                        </div>
                    </div>
                    {/**/}
                    {/*<div*/}
                    {/*    className="p-3 mb-3 flex justify-between items-center rounded-lg shadow-lg border-[0.2px] border-gray-300">*/}
                    {/*    <p className="flex items-center "><MdOutlineLocalShipping className="mr-2"/> METHOD SHIPPING</p>*/}
                    {/*    <GoChevronRight className="text-xl"/>*/}
                    {/*</div>*/}

                    <motion.div
                        initial="show"
                        onClick={handleClick}
                        className="p-3 mb-3 rounded-lg shadow-lg border-[0.2px] border-gray-300">
                        <motion.div
                            className="flex justify-between items-center cursor-pointer"
                        >
                            <motion.p className="flex items-center">
                                <MdOutlineLocalShipping className="mr-2"/> METHOD SHIPPING
                            </motion.p>
                            <motion.p animate={isExpanded ? itemCross.show : itemCross.hidden}
                            >
                                <GoChevronRight className="text-xl"/>
                            </motion.p>
                        </motion.div>
                        <motion.div
                            initial="hidden"
                            variants={container}
                            animate={isExpanded ? "show" : "hidden"}
                            className={`${isExpanded ? "block mt-2" : "hidden"}`}
                        >
                            <motion.p variants={item}
                                      className={isExpanded ? "block text-lg rounded hover:bg-gray-300 py-2 px-3 " : "hidden"}>Thanh
                                Toan Khi Nhan
                                Hang
                            </motion.p>
                            <motion.p variants={item}
                                      className={isExpanded ? "block text-lg rounded hover:bg-gray-300 py-2 px-3 " : "hidden"}>Zalo
                                Pay
                            </motion.p>
                        </motion.div>
                    </motion.div>
                    <div
                        className="p-3 mb-3 flex justify-between items-center rounded-lg shadow-lg border-[0.2px] border-gray-300">
                        <p className="flex items-center "><MdOutlinePayments className="mr-2"/> METHOD PAYMENT</p>
                        <GoChevronRight className="text-xl"/>
                    </div>
                </div>
                <div className="bg-white col-span-4 flex-grow">
                    <div className="w-full flex justify-between gap-2 ">
                        <button type="button"
                                className="w-full text-center bg-white border py-3 px-4 rounded font-bold hover:opacity-90 mr-3">
                            Add Other
                        </button>
                        <button type="button"
                                className="w-full text-center bg-[#FF9FA0] text-white font-bold py-3 px-4 rounded hover:text-white">
                            Payment
                        </button>
                    </div>
                    <div
                        className="w-full mt-4 bg-white rounded-lg shadow-md px-3 pb-3 max-h-[260px] overflow-y-scroll no-scrollbar">
                        <div className="flex gap-4 p-3 mb-3">
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
                        <div className="flex gap-4 p-3 mb-3">
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
                        <div className="flex gap-4 p-3 mb-3">
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
                    <div className="w-full mt-4 bg-white rounded-lg shadow-md px-3 mb-2">
                        <div className="mx-3 mb-3 flex justify-between items-center border-b-[1px] border-gray-300">
                            <p className="py-2 ">Price </p>
                            <p className="py-2 ">12$ </p>
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
        </>
    )
}
export default ShipDetail