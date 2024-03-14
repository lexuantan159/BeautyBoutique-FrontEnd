import React, { useContext, useState, useEffect } from 'react'
import logo from "../../public/img/logo.jpg";
import MethodContext from '../../context/methodProvider';
import * as voucherApi from '../../services/voucher'

const Voucher = () => {
    const { formatDateTime } = useContext(MethodContext)
    const [vouchers, setVouchers] = useState([]);
    const [voucherView, setVoucherView] = useState({})
    useEffect(() => {
        const fetchData = async () => {
            try {
                const vouchersData = await voucherApi.getAllVoucher();
                setVouchers(vouchersData.voucherList);
                console.log(vouchersData);
            } catch (error) {
                console.error('Error fetching blogposts:', error);
            }
        };
        fetchData();
    }, []);

    const handleSaveVoucherForUser = async (userId, voucherId) => {
        const saveVou = await voucherApi.saveVoucher(userId, voucherId)
        console.log(saveVou);
    }

    return (

        <div className='w-full h-auto pt-32 bg-[#F5F6F6] '>
            {vouchers.map((voucher) => {
                return (
                    <div className='flex items-center justify-center p-4  '>
                        <div className='w-[50%] h-52 bg-[#F8EFEA] rounded-xl shadow-lg border '>
                            <div className='h-full flex items-center justify-center '>
                                <div className='w-1/4 flex items-center justify-center'>
                                    <div className="avatar relative">
                                        <div className="md:w-40 sm:w-24 rounded-full ">
                                            <img src={logo} />
                                        </div>
                                        <div className='bg-white md:h-16 md:w-16 sm:h-8 sm:w-8 rounded-full absolute top-[-20px] right-0 '>
                                            <span className='block p-2 sm:text-sm md:text-base'>UP TO {voucher.discount * 100} %</span>
                                        </div>
                                    </div>
                                </div>
                                <div className='w-1/2 h-full flex items-center justify-center'>
                                    <div>
                                        <span className='block md:text-6xl sm:text-4xl font-island-moments font-semibold text-rose-400' >VOUCHER</span>

                                        <div className='text-center'>
                                            <span className='font-serif mr-2'>Discount :</span>
                                            <span className='font-island-moments font-semibold text-2xl'>{voucher.discount * 100} %</span>

                                        </div>
                                        <div className='text-center'>
                                            <span className='font-serif text-xl'>Remaining :<span className='text-violet-900 text-xl font-semibold'>{voucher?.quantity - voucher?.numUsedVoucher}</span> </span>
                                        </div>
                                        <div className=' grid grid-cols-2 gap-4'>
                                            <div className='text-center'>
                                                <span className='font-serif'>Start Day : {voucher.startDate}</span>
                                            </div>
                                            <div className='text-center'>
                                                <span className='font-serif'>End Day : {voucher.endDate}</span>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                <div className='w-1/4 h-full flex items-center justify-center'>
                                    <div>
                                        {voucher && (voucher.quantity - voucher.numUsedVoucher > 0 ? (
                                            <button className="btn btn-accent mb-6" onClick={() => handleSaveVoucherForUser(1, voucher.id)}>
                                                Save Voucher
                                            </button>
                                        ) : (
                                            <button className="btn btn-accent mb-6 " disabled>
                                                Voucher Sold Out
                                            </button>
                                        ))}

                                        <button className="btn btn-neutral px-5"
                                            onClick={() => {
                                                setVoucherView(voucher)
                                                document.getElementById('my_modal_2').showModal()
                                            }}
                                        >
                                            View Details</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })}

            <dialog id="my_modal_2" className="modal ">
                <div className="modal-box w-10/12 max-w-4xl bg-gradient-to-r from-fuchsia-50 via-pink-100 to-pink-200 ">
                    <div className='w-full flex items-center justify-center'>
                        <div className='w-[30%]'>
                            <div className="avatar relative">
                                <div className="md:w-56 sm:w-24 rounded-full ">
                                    <img src={logo} />
                                </div>
                                <div className='bg-white md:h-16 md:w-16 sm:h-8 sm:w-8 rounded-full absolute top-[-20px] right-0 '>
                                    <span className='block p-2 sm:text-sm md:text-base'>UP TO {voucherView?.discount * 100} %</span>
                                </div>
                            </div>
                        </div>
                        <div>
                            <span className='block md:text-6xl sm:text-4xl font-island-moments font-semibold text-center text-rose-400' >VOUCHER</span>
                            <div className='ml-4 text-center'>
                                <span className='font-island-moments text-5xl text-blue-500'> {voucherView?.title}</span>
                            </div>
                            <div className='text-center ml-4'>
                                <span className='text-purple-900 text-5xl font-medium'>{voucherView?.discount * 100} %</span>
                            </div>
                            <div className='grid grid-cols-2 gap-4'>
                                <div className='text-start ml-4'>
                                    <span className='font-serif text-xl'>Start Day :<span className='text-violet-900 text-xl font-semibold'>{voucherView?.startDate}</span> </span>
                                </div>
                                <div className='text-start ml-4'>
                                    <span className='font-serif text-xl'>End Day :<span className='text-violet-900 text-xl font-semibold'>{voucherView?.endDate}</span> </span>
                                </div>
                            </div>
                            <div className='grid grid-cols-2 gap-4'>
                                <div className='text-start ml-4'>
                                    <span className='font-serif text-xl'>Remaining :<span className='text-violet-900 text-xl font-semibold'>{voucherView?.quantity - voucherView?.numUsedVoucher}</span> </span>
                                </div>
                                <div className='text-start ml-4'>
                                    <span className='font-serif text-xl'>Quantity Used :<span className='text-violet-900 text-xl font-semibold'>{voucherView?.numUsedVoucher}</span> </span>
                                </div>
                            </div>
                            <div className='grid grid-cols-2 gap-4'>
                                <div className='text-start ml-4'>
                                    <span className='font-serif text-xl'>Maximum Discount :<span className='text-violet-900 text-xl font-semibold'>{voucherView?.maximumDiscount} $</span> </span>
                                </div>
                                <div className='text-start ml-4'>
                                    <span className='font-serif text-xl'>Minimum Order :<span className='text-violet-900 text-xl font-semibold'>{voucherView?.minimumOrder} $</span> </span>
                                </div>
                            </div>
                            <div className='text-start ml-4'>
                                <div className='font-serif text-xl'>Content :</div>
                                <div className='font-serif text-xl text-center'> {voucherView?.content}</div>
                            </div>

                        </div>
                    </div>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>

        </div >
    )
}

export default Voucher