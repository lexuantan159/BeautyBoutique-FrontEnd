import {PiNewspaperClippingLight} from "react-icons/pi";
import {GoChevronRight} from "react-icons/go";
import React, {useState} from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {useQuery} from "react-query";
import * as voucherService from "../../services/voucher";
import ModalVoucher from "../modal/ModalVoucher";

const VoucherCom = ({conditionApply}) => {
    const settings = {
        dots: false,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 2000, // milliseconds between each slide
        speed: 200,
        slidesToShow: 1,
        slidesToScroll: 1,
        vertical: true,
        arrows: false,
    };

    const {
        data:voucher,
        isLoading
    } = useQuery(["voucher"], () => voucherService.getVoucher({userId: 1}));


    if (isLoading)
        return <span className="loading loading-dots loading-lg text-3xl flex justify-center items-center"></span>


    return (
        <div className="w-full mt-4 bg-white rounded-lg shadow-md px-3 pb-3 border-[0.2px] border-gray-300">
            <p className="flex items-center py-3 text-lg"><PiNewspaperClippingLight
                className="pr-4 text-black"/>Voucher
            </p>
            {/* Open the modal using document.getElementById('ID').showModal() method */}
            <button
                className="w-full flex items-center justify-between text-gray-300  text-left py-2 px-3 border-[1px] rounded-lg border-gray-400 mb-2 outline-none hover:border-[#FF9FA0]"
                onClick={() => document.getElementById('my_modal_5').showModal()}>
                <p className="text-xm font-medium text-green-500">20%</p>
                <p className="text-xm font-medium text-red-500 hover:cursor-pointer hover:underline">Cancel</p>
                {/*Code*/}
                {/*Discount <GoChevronRight className="text-xl"/>*/}
            </button>
            <ModalVoucher vouchers={voucher ? voucher?.data?.vouchers : [] } conditionApply = {conditionApply} />
            {/**/}
            <div className="slider-container ">
                <Slider {...settings}>
                    {voucher?.data?.vouchers?.length > 0 && voucher?.data?.vouchers.map((item) => {
                        return (
                            <p key={item?.id} className="p-3 bg-gray-200 text-black rounded-lg border-[0.5px] border-gray-300">N
                                {item?.voucher?.content}</p>
                        )
                    })}

                </Slider>
            </div>
        </div>
    )
}

export default VoucherCom