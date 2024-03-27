import React, { useContext, useEffect, useState } from 'react';
import * as voucherApi from '../../../services/voucher';
import MethodContext from '../../../context/methodProvider';

const CRUVoucher = ({ closeModal, isOpenForm, setChange, change, voucher }) => {
  const { convertDate, notify } = useContext(MethodContext);
  const [id, setId] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [numUsedVoucher, setNumUsedVoucher] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [maximDiscount, setMaximDiscount] = useState(0);
  const [minimumOrder, setMinimumOrder] = useState(0);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const Token = localStorage.getItem('token');

  useEffect(() => {
    if (isOpenForm.isOpen) {
      document.getElementById('my_modal_4').showModal();
    }

    if (voucher) {
      setId(voucher.id || null);
      setTitle(voucher.title || '');
      setContent(voucher.content || '');
      setQuantity(voucher.quantity || 0);
      setNumUsedVoucher(voucher.numUsedVoucher || 0);
      setDiscount(voucher.discount || 0);
      setMaximDiscount(voucher.maximDiscount || 0);
      setMinimumOrder(voucher.minimumOrder || 0);
      setStartDate(voucher.startDate || '');
      setEndDate(voucher.endDate || '');
    }
  }, [isOpenForm.isOpen, voucher]);

  const addNewVoucher = async () => {
    try {
      const newVoucher = await voucherApi.createNewVouccher(Token, title, content, quantity, numUsedVoucher, discount, maximDiscount, minimumOrder, convertDate(startDate), convertDate(endDate))
      if (newVoucher?.status === 201) {
        notify(newVoucher.data, "success")
        closeModal({ index: null, isOpen: false })

      }
      else {
        notify(newVoucher.error.response.data)
        closeModal({ index: null, isOpen: false })

      }
    } catch (error) {
      console.error('Error fetching voucher:', error);
      closeModal({ index: null, isOpen: false })

    }
  }

  const updateVoucher = async () => {
    try {
      const updateVoucher = await voucherApi.updateVouccher(Token, id, title, content, quantity, numUsedVoucher, discount, maximDiscount, minimumOrder, convertDate(startDate), convertDate(endDate))
      if (updateVoucher?.status === 200) notify("Update succesfully", "success")
      else notify("Update failed");
      closeModal({ index: null, isOpen: false })
    } catch (error) {
      console.error('Error fetching voucher:', error);
      closeModal({ index: null, isOpen: false })

    }
  }

  const handleSubmid = async () => {
    if (!title.trim()) {
      notify("You have not entered a 'TITLE' field")
      setChange(!change)
      return
    }
    if (!discount || discount <= 0) {
      notify("You have not entered a valid 'DISCOUNT' field")
      setChange(!change)
      return
    }
    if (!quantity || quantity <= 0) {
      notify("You have not entered a valid 'QUANTITY' field")
      setChange(!change)
      return
    }
    if (!endDate) {
      notify("You have not entered a 'END DATE' field")
      setChange(!change)
      return
    }
    if (!startDate) {
      notify("You have not entered a 'START DATE' field")
      setChange(!change)
      return
    }
    if (!minimumOrder || minimumOrder <= 0) {
      notify("You have not entered a valid 'MINIMUM ORDER' field")
      setChange(!change)
      return
    }
    if (!maximDiscount || maximDiscount <= 0) {
      notify("You have not entered a valid 'MAXIMUM DISCOUNT' field")
      setChange(!change)
      return
    }
    if (voucher) {
      await updateVoucher();
    } else {
      if (new Date(startDate) < new Date()) {
        notify("Start date must be greater than or equal to today's date");
        setChange(!change)
        return;
      }
      if (new Date(endDate) < new Date(startDate)) {
        notify("End date must be greater than start date");
        setChange(!change)
        return;
      }
      await addNewVoucher();
    }
    setChange(!change)
    // closeModal({ index: null, isOpen: false })
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
                type="text" maxLength="70" placeholder="Input Title" value={title} className="input input-bordered input-primary w-full max-w-xs focus:outline-none" />
            </div>
            <div>
              <h1 className='text-start mb-2 ml-4 block font-bold'>QUANTITY</h1>
              <input
                onChange={(e) => setQuantity(e.target.value)}
                type="number" placeholder="Input Quantity" value={quantity} className="input input-bordered input-primary w-full max-w-xs focus:outline-none" />
            </div>
          </div>
          <div className='grid grid-cols-2 m-2'>
            <div>
              <h1 className='text-start mb-2 ml-4 block font-bold'>MINIMUM ORDER</h1>
              <input
                onChange={(e) => setMinimumOrder(e.target.value)}
                type="number" placeholder="Input Minimum Order $" value={minimumOrder} className="input input-bordered input-primary w-full max-w-xs focus:outline-none" />
            </div>
            <div>
              <h1 className='text-start mb-2 ml-4 block font-bold'>MAXIMUM DISCOUNT</h1>
              <input
                onChange={(e) => setMaximDiscount(e.target.value)}
                type="number" placeholder="Input maximum discount $" value={maximDiscount} className="input input-bordered input-primary w-full max-w-xs focus:outline-none" />
            </div>

          </div>
          <div className='grid grid-cols-2 m-2'>

            <div>
              <h1 className='text-start mb-2 ml-4 block font-bold'>START DATE</h1>
              <input
                onChange={(e) => { setStartDate(e.target.value); }}
                type="date" placeholder="Type here" value={startDate} className="input input-bordered input-primary w-full max-w-xs focus:outline-none" />
            </div>
            <div>
              <h1 className='text-start mb-2 ml-4 block font-bold'>END DATE</h1>
              <input
                onChange={(e) => { setEndDate(e.target.value); }}
                type="date" placeholder="Type here" value={endDate} className="input input-bordered input-primary w-full max-w-xs focus:outline-none" />
            </div>
          </div>
          <div className='grid grid-cols-2 m-2'>
            <div>
              <h1 className='text-start mb-2 ml-4 block font-bold'>DISCOUNT</h1>
              <input
                onChange={(e) => setDiscount(e.target.value)}
                type="number" placeholder="Input Discount " value={discount} className="input input-bordered input-primary w-full max-w-xs focus:outline-none" />
            </div>
            <div>
              <h1 className='text-start mb-2 ml-4 block font-bold'>CONTENT</h1>
              <textarea
                onChange={(e) => setContent(e.target.value)}
                className="textarea textarea-primary w-full max-w-xs focus:outline-none" placeholder="content" value={content}></textarea>
            </div>
          </div>
          <div className="modal-action">
            <form method="dialog">
              <button
                className="btn btn-outline btn-success m-4"
                onClick={() => handleSubmid()}
              >
                {voucher ? 'UPDATE' : 'CREATE'}
              </button>

              <button
                className="btn"
                onClick={() => closeModal({ index: null, isOpen: false })}
              >
                Close
              </button>

            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default CRUVoucher;