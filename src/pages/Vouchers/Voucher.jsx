import React, { useContext, useState } from 'react'
import logo from "../../public/img/logo.jpg";
import MethodContext from '../../context/methodProvider';

const Voucher = () => {
    const { formatDateTime } = useContext(MethodContext)
    const initialVouchers = [
        {
            voucher_id: 1,
            title: "Discount on Electronics",
            discount: 0.15,
            minimum_order: 120,
            maximum_discount: 50,
            content: "Get 20% off on all electronics items.",
            quantity: 100,
            num_used_voucher: 0,
            start_date: "2024-02-01T00:00:00",
            end_date: "2024-02-28T23:59:59"
        },
        {
            voucher_id: 2,
            title: "Free Shipping",
            discount: 0.1,
            minimum_order: 120,
            maximum_discount: 50,
            content: "Enjoy free shipping on orders over $50.",
            quantity: 200,
            num_used_voucher: 0,
            start_date: "2024-03-01T00:00:00",
            end_date: "2024-03-31T23:59:59"
        },
        {
            voucher_id: 3,
            title: "Clothing Clearance",
            discount: 0.2,
            minimum_order: 120,
            maximum_discount: 50,
            content: "Buy one, get one free on all clothing items.",
            quantity: 150,
            num_used_voucher: 0,
            start_date: "2024-04-01T00:00:00",
            end_date: "2024-04-30T23:59:59"
        },
        {
            voucher_id: 4,
            title: "Back to School Sale",
            discount: 0.25,
            minimum_order: 120,
            maximum_discount: 50,
            content: "10% discount on all school supplies.",
            quantity: 50,
            num_used_voucher: 0,
            start_date: "2024-05-01T00:00:00",
            end_date: "2024-05-31T23:59:59"
        },
        {
            voucher_id: 5,
            title: "Summer Special",
            discount: 0.2,
            minimum_order: 120,
            maximum_discount: 50,
            content: "Buy 2, get 1 free on selected summer items.",
            quantity: 75,
            num_used_voucher: 0,
            start_date: "2024-06-01T00:00:00",
            end_date: "2024-06-30T23:59:59"
        }
    ];

    const [vouchers, setVouchers] = useState(initialVouchers);

    return (

        <div className='w-full pt-32 bg-[#F5F6F6]'>
            {vouchers.map((voucher) => {
                return (
                    <div className='flex items-center justify-center m-4'>
                        <div className='w-[50%] h-52 bg-[#F8EFEA] rounded-xl'>
                            <div className='h-full flex items-center justify-center'>
                                <div className='w-1/4 flex items-center justify-center'>
                                    <div className="avatar relative">
                                        <div className="w-40 rounded-full ">
                                            <img src={logo} />
                                        </div>
                                        <div className='bg-white h-16 w-16 rounded-full absolute top-[-20px] right-0 '>
                                            <span className='block p-2'>UP TO {voucher.discount * 100} %</span>
                                        </div>
                                    </div>
                                </div>
                                <div className='w-1/2 h-full flex items-center justify-center'>
                                    <div>
                                        <span className='block' >VOUCHER</span>
                                        <span className='block'>Discount : {voucher.discount * 100} %</span>
                                        <span className='block'>Minimum purchase : {voucher.minimum_order} $</span>
                                        <span className='block'>Maximum discount :{voucher.maximum_discount} $  </span>
                                        <span className='block'>{voucher.title}</span>
                                        <span className='block'>Start Day : {formatDateTime(voucher.start_date)}</span>
                                        <span className='block'>End Day : {formatDateTime(voucher.end_date)}</span>

                                    </div>
                                </div>
                                <div className='w-1/4 h-full flex items-center justify-center'>
                                    <div>
                                        <button className="btn btn-accent px-5 mb-6">Save Voucher</button>
                                        <button className="btn btn-neutral ">Use right away</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })}

        </div>
    )
}

export default Voucher
