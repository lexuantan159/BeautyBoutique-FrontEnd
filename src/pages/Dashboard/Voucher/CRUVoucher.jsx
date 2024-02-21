import React, { useContext, useEffect, useState } from 'react'
import * as voucherApi from '../../../service/voucher'
import MethodContext from '../../../context/methodProvider';

const CRUVoucher = ({ closeModal, isOpenForm, setChange, change, voucher }) => {
    const { convertDateFormat } = useContext(MethodContext)
    const [id, setId] = useState(null);
    const [title, setTitle] = useState(null);
    const [content, setContent] = useState(null);
    const [quantity, setQuantity] = useState(null);
    const [numUsedVoucher, setNumUsedVoucher] = useState(0);
    const [discount, setDiscount] = useState(null);
    const [maximDiscount, setMaximDiscount] = useState(null);
    const [minimumOrder, setMinimumOrder] = useState(null);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);


    useEffect(() => {
        console.log('useEffect called with voucher:', voucher);
        if (isOpenForm.isOpen) {
            document.getElementById('my_modal_4').showModal();
        }

        if (voucher) {
            setId(voucher.id || null);
            setTitle(voucher.title || null);
            setContent(voucher.content || null);
            setQuantity(voucher.quantity || null);
            setNumUsedVoucher(voucher.numUsedVoucher || 0);
            setDiscount(voucher.discount || null);
            setMaximDiscount(voucher.maximDiscount || null);
            setMinimumOrder(voucher.minimumOrder || null);
            setStartDate(voucher.startDate || null);
            setEndDate(voucher.endDate || null);
        }
    }, []);


    const addNewVoucher = async () => {
        try {
            const newVoucher = await voucherApi.createNewVouccher(title, content, quantity, numUsedVoucher, discount, maximDiscount, minimumOrder, convertDateFormat(startDate), convertDateFormat(endDate))
            console.log(newVoucher);
        } catch (error) {
            console.error('Error fetching voucher:', error);
        }
    }
    const updateVoucher = async () => {
        try {
            const updateVoucher = await voucherApi.updateVouccher(id, title, content, quantity, numUsedVoucher, discount, maximDiscount, minimumOrder, convertDateFormat(startDate), convertDateFormat(endDate))
            if (updateVoucher === 200) console.log("Update succesfully");
            else console.log("Update failed");
        } catch (error) {
            console.error('Error fetching voucher:', error);
        }
    }
    const handleSubmid = async () => {
        if (title === null) return
        if (discount === null) return
        if (quantity === null) return
        if (endDate === null) return
        if (startDate === null) return
        if (minimumOrder === null) return
        if (maximDiscount === null) return
        if (voucher) {
            await updateVoucher();
        }
        else {
            await addNewVoucher();
        }
        setChange(!change)
        closeModal({ index: null, isOpen: false })
    }
    return (
        <div>
            <dialog id="my_modal_4" className="modal">
                <div className="modal-box w-6/12 max-w-5xl">

                    <h1 className='text-[#e78592] text-3xl font-bold text-center mb-4'>
                        Create New Voucher
                    </h1>
                    <div className='grid grid-cols-2 m-2'>
                        <div>
                            <h1 className='text-start mb-2 ml-4 block font-bold'>TITLE</h1>
                            <input
                                onChange={(e) => setTitle(e.target.value)}
                                type="text" maxLength="70" placeholder="Input Title" value={title} className="input input-bordered input-primary w-full max-w-xs" />
                        </div>
                        <div>
                            <h1 className='text-start mb-2 ml-4 block font-bold'>QUANTITY</h1>
                            <input
                                onChange={(e) => setQuantity(e.target.value)}
                                type="number" placeholder="Input Quantity" value={quantity} className="input input-bordered input-primary w-full max-w-xs" />
                        </div>
                    </div>
                    <div className='grid grid-cols-2 m-2'>
                        <div>
                            <h1 className='text-start mb-2 ml-4 block font-bold'>MINIMUM ORDER</h1>
                            <input
                                onChange={(e) => setMinimumOrder(e.target.value)}
                                type="number" placeholder="Input Minimum Order $" value={minimumOrder} className="input input-bordered input-primary w-full max-w-xs" />
                        </div>
                        <div>
                            <h1 className='text-start mb-2 ml-4 block font-bold'>MAXIMUM DISCOUNT</h1>
                            <input
                                onChange={(e) => setMaximDiscount(e.target.value)}
                                type="number" placeholder="Input maximum discount $" value={maximDiscount} className="input input-bordered input-primary w-full max-w-xs" />
                        </div>

                    </div>
                    <div className='grid grid-cols-2 m-2'>

                        <div>
                            <h1 className='text-start mb-2 ml-4 block font-bold'>START DATE</h1>
                            <input
                                onChange={(e) => setStartDate(e.target.value)}
                                type="date" placeholder="Type here" value={startDate} className="input input-bordered input-primary w-full max-w-xs" />
                        </div>
                        <div>
                            <h1 className='text-start mb-2 ml-4 block font-bold'>END DATE</h1>
                            <input
                                onChange={(e) => setEndDate(e.target.value)}
                                type="date" placeholder="Type here" value={endDate} className="input input-bordered input-primary w-full max-w-xs" />
                        </div>
                    </div>
                    <div className='grid grid-cols-2 m-2'>
                        <div>
                            <h1 className='text-start mb-2 ml-4 block font-bold'>DISCOUNT</h1>
                            <input
                                onChange={(e) => setDiscount(e.target.value)}
                                type="number" placeholder="Input Discount " value={discount} className="input input-bordered input-primary w-full max-w-xs" />
                        </div>
                        <div>
                            <h1 className='text-start mb-2 ml-4 block font-bold'>CONTENT</h1>
                            <textarea
                                onChange={(e) => setContent(e.target.value)}
                                className="textarea textarea-primary w-full max-w-xs" placeholder="content" value={content}></textarea>
                        </div>
                    </div>
                    <div className="modal-action">
                        <form method="dialog">
                            <button
                                className="btn btn-outline btn-success m-4"
                                onClick={() => handleSubmid()}
                            >
                                {voucher ? "UPDATE" : "CREATE"}
                            </button>

                            <button className="btn" onClick={() => closeModal({ index: null, isOpen: false })}>Close</button>
                        </form>
                    </div>
                </div>
            </dialog>

        </div>
    )
}

export default CRUVoucher
