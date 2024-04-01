import {PiNewspaperClippingLight} from "react-icons/pi";
import {GoChevronRight} from "react-icons/go";
import React, {useState} from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {useQuery} from "react-query";
import * as voucherService from "../../services/voucher";
import ModalVoucher from "../modal/ModalVoucher";
import {LuTicket} from "react-icons/lu";

const VoucherCom = ({conditionApply, voucherActive, voucherDetail}) => {
    const settings = {
        dots: false,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 2000,
        speed: 200,
        slidesToShow: 1,
        slidesToScroll: 1,
        vertical: true,
        arrows: false,
    };
    const accessToken = localStorage.getItem('token');
    const {
        data: voucher,
        isLoading
    } = useQuery(["voucher"], () => voucherService.getVoucherByToken(accessToken));


    if (isLoading)
        return <span className="loading loading-dots loading-lg text-3xl flex justify-center items-center"></span>

    const handleCancelVoucher = () => {
        voucherActive({discount: 0});
    }

    return (
        <div className="w-full mt-4 bg-white rounded-lg shadow-md px-3 pb-3 border-[0.2px] border-gray-300">
            <p className="flex items-center py-3 text-lg">
                <LuTicket size={30} className="pr-2 text-black"/>
                <span> Voucher</span>
            </p>
            {/* Open the modal using document.getElementById('ID').showModal() method */}
            <button
                className="w-full flex items-center justify-between text-gray-300  text-left py-2 px-3 border-[1px] rounded-lg border-gray-400 mb-2 outline-none hover:border-[#FF9FA0]"
                onClick={() => document.getElementById('my_modal_5').showModal()}>
                {
                    voucherDetail?.discount !== 0 ? <><p
                        className="text-xm font-medium text-green-500">{voucherDetail?.discount * 100 || 0}%</p>
                        <p className="text-xm font-medium text-red-500 hover:cursor-pointer hover:underline"
                           onClick={(event) => {
                               event.stopPropagation();
                               handleCancelVoucher();
                           }}
                        >Cancel</p></> : <> Code
                        Discount <GoChevronRight className="text-xl"/></>
                }
            </button>
            <ModalVoucher vouchers={voucher ? voucher?.data?.vouchers : []} conditionApply={conditionApply}
                          voucherActive={voucherActive}/>
            {/**/}
            <div className="slider-container ">
                <Slider {...settings}>
                    {voucher?.data?.vouchers?.length > 0 && voucher?.data?.vouchers.map((item) => {
                        return (
                            <p key={item?.id}
                               className="p-3 bg-gray-200 text-black rounded-lg border-[0.5px] border-gray-300 truncate">N
                                {item?.voucher?.content}</p>
                        )
                    })}

                </Slider>
            </div>
        </div>
    )
}

export default VoucherCom