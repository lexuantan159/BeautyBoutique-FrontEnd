import React, { useState, useEffect, useContext } from 'react';
import logo from '../../public/img/logo.jpg';
import * as voucherApi from '../../services/voucher';
import * as productApi from '../../services/product.js'
import MethodContext from '../../context/methodProvider.js';
import { Link } from 'react-router-dom';
import { Pagination } from 'flowbite-react';

const Voucher = () => {
  const { notify } = useContext(MethodContext);
  const [vouchers, setVouchers] = useState([]);
  const [voucherView, setVoucherView] = useState({});
  const [products, setProducts] = useState([])
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const Token = localStorage.getItem('token');
  const [filterOption, setFilterOption] = useState('Default');
  useEffect(() => {
    const fetchData = async () => {
      try {
        const vouchersData = await voucherApi.getAllVoucher();
        const totalVoucher = vouchersData.quantity;
        const itemsPerPage = 5;
        const pages = Math.ceil(totalVoucher / itemsPerPage);
        setTotalPages(pages);
        let sortedVouchers = [...vouchersData.voucherList];
        if (filterOption === 'Discount DESC') {
          sortedVouchers = sortedVouchers.sort((a, b) => b.discount - a.discount);
        } else if (filterOption === 'Discount ASC') {
          sortedVouchers = sortedVouchers.sort((a, b) => a.discount - b.discount);
        }
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = Math.min(startIndex + itemsPerPage, totalVoucher);
        const vouchersForPage = sortedVouchers.slice(startIndex, endIndex);
        setVouchers(vouchersForPage);

        // Fetch products
        const getProduct = await productApi.getProduct()
        setProducts(getProduct?.data)
      } catch (error) {
        console.error('Error fetching blogposts:', error);
      }
    };
    fetchData();
  }, [currentPage, filterOption]);

  const handleSaveVoucherForUser = async (voucherId) => {
    console.log(Token);
    const saveVou = await voucherApi.saveVoucher(Token, voucherId);
    if (saveVou.statusCode === 201) {
      notify(saveVou.message, 'success');
    } else notify(saveVou.message);
  };
  const onPageChange = (page) => {
    setCurrentPage(page);
  };
  const handleSortChange = (e) => {
    setFilterOption(e.target.value);
  };
  return (
    <div className='w-[1200px] mx-auto '>
      <div className='grid grid-cols-12 gap-4'>
        <div className='col-span-4'>
          <div className='w-full flex items-center justify-center mt-10'>
            <div className='w-[90%] '>
              <h1 className="font-extrabold text-red-400 text-3xl  my-2">
                Filter
              </h1>
              <select className="select select-secondary w-full max-w-xs mb-2 focus:outline-none"
                onChange={handleSortChange}
                value={filterOption}
              >
                <option disabled value="Default">Pick your want filter</option>
                <option value="Default">Default</option>
                <option value="Discount DESC">Discount DESC</option>
                <option value="Discount ASC">Discount ASC</option>
              </select>

              <h1 className="font-extrabold text-red-400 text-3xl ">
                Top Product
              </h1>
              {products
                .sort(() => Math.random() - 0.5)
                .slice(0, 6)
                .map((product) => (
                  <Link to={`/product/${product?.id}`}>
                    <div key={product.id}>
                      <div className='flex items-start justify-start m-4'>
                        <div className='w-16 h-16 border mr-4 rounded-lg'>
                          <img src={product?.images[0]?.imageUrl} alt="" />
                        </div>
                        <div>
                          <p className='text-base font-semibold whitespace-nowrap overflow-hidden overflow-ellipsis'>
                            {product.productName.length > 30 ? `${product.productName.substring(0, 25)}...` : product.productName}
                          </p>
                          <p className='text-base text-red-400'> $ {product?.salePrice}</p>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </div>
        <div className='col-span-8'>
          <div className="w-full h-auto relative">
            {vouchers?.map(voucher => {
              return (
                <div className="flex items-center justify-center p-4  ">
                  <div className="w-full h-52 bg-[#F8EFEA] rounded-xl shadow-lg border ">
                    <div className="h-full flex items-center justify-center ">
                      <div className="w-1/4 flex items-center justify-center">
                        <div className="avatar relative">
                          <div className="md:w-40 sm:w-24 rounded-full ">
                            <img src={logo} alt="name" />
                          </div>
                          <div className="bg-white md:h-16 md:w-16 sm:h-8 sm:w-8 rounded-full absolute top-[-20px] right-0 ">
                            <span className="block p-2 sm:text-sm md:text-base">
                              UP TO {voucher?.discount * 100} %
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="w-1/2 h-full flex items-center justify-center">
                        <div>
                          <span className="block md:text-6xl sm:text-4xl font-island-moments font-semibold text-rose-400">
                            VOUCHER
                          </span>

                          <div className="text-center">
                            <span className="font-serif mr-2">Discount :</span>
                            <span className="font-island-moments font-semibold text-2xl">
                              {voucher?.discount * 100} %
                            </span>
                          </div>
                          <div className="text-center">
                            <span className="font-serif text-xl">
                              Remaining :
                              <span className="text-violet-900 text-xl font-semibold">
                                {voucher?.quantity - voucher?.numUsedVoucher}
                              </span>{' '}
                            </span>
                          </div>
                          <div className=" grid grid-cols-2 gap-4">
                            <div className="text-center">
                              <span className="font-serif">
                                Start Day : {voucher?.startDate}
                              </span>
                            </div>
                            <div className="text-center">
                              <span className="font-serif">
                                End Day : {voucher?.endDate}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="w-1/4 h-full flex items-center justify-center">
                        <div>
                          {voucher &&
                            (voucher?.quantity - voucher?.numUsedVoucher > 0 ? (
                              <button
                                className="btn btn-accent mb-6"
                                onClick={() =>
                                  handleSaveVoucherForUser(voucher.id)
                                }
                              >
                                Save Voucher
                              </button>
                            ) : (
                              <button className="btn btn-accent mb-6 " disabled>
                                Voucher Sold Out
                              </button>
                            ))}

                          <button
                            className="btn btn-neutral px-5"
                            onClick={() => {
                              setVoucherView(voucher);
                              document.getElementById('my_modal_2').showModal();
                            }}
                          >
                            View Details
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            <div className="flex overflow-x-auto sm:justify-center mb-2 ">
              <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} showIcons />
            </div>
          </div>


          <dialog id="my_modal_2" className="modal ">
            <div className="modal-box w-10/12 max-w-4xl bg-gradient-to-r from-fuchsia-50 via-pink-100 to-pink-200 ">
              <div className="w-full flex items-center justify-center">
                <div className="w-[30%]">
                  <div className="avatar relative">
                    <div className="md:w-56 sm:w-24 rounded-full ">
                      <img src={logo} alt="sdfsd" />
                    </div>
                    <div className="bg-white md:h-16 md:w-16 sm:h-8 sm:w-8 rounded-full absolute top-[-20px] right-0 ">
                      <span className="block p-2 sm:text-sm md:text-base">
                        UP TO {voucherView?.discount * 100} %
                      </span>
                    </div>
                  </div>
                </div>
                <div>
                  <span className="block md:text-6xl sm:text-4xl font-island-moments font-semibold text-center text-rose-400">
                    VOUCHER
                  </span>
                  <div className="ml-4 text-center">
                    <span className="font-island-moments text-5xl text-blue-500">
                      {' '}
                      {voucherView?.title}
                    </span>
                  </div>
                  <div className="text-center ml-4">
                    <span className="text-purple-900 text-5xl font-medium">
                      {voucherView?.discount * 100} %
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-start ml-4">
                      <span className="font-serif text-xl">
                        Start Day :
                        <span className="text-violet-900 text-xl font-semibold">
                          {voucherView?.startDate}
                        </span>{' '}
                      </span>
                    </div>
                    <div className="text-start ml-4">
                      <span className="font-serif text-xl">
                        End Day :
                        <span className="text-violet-900 text-xl font-semibold">
                          {voucherView?.endDate}
                        </span>{' '}
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-start ml-4">
                      <span className="font-serif text-xl">
                        Remaining :
                        <span className="text-violet-900 text-xl font-semibold">
                          {voucherView?.quantity - voucherView?.numUsedVoucher}
                        </span>{' '}
                      </span>
                    </div>
                    <div className="text-start ml-4">
                      <span className="font-serif text-xl">
                        Quantity Used :
                        <span className="text-violet-900 text-xl font-semibold">
                          {voucherView?.numUsedVoucher}
                        </span>{' '}
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-start ml-4">
                      <span className="font-serif text-xl">
                        Maximum Discount :
                        <span className="text-violet-900 text-xl font-semibold">
                          {voucherView?.maximDiscount} $
                        </span>{' '}
                      </span>
                    </div>
                    <div className="text-start ml-4">
                      <span className="font-serif text-xl">
                        Minimum Order :
                        <span className="text-violet-900 text-xl font-semibold">
                          {voucherView?.minimumOrder} $
                        </span>{' '}
                      </span>
                    </div>
                  </div>
                  <div className="text-start ml-4">
                    <div className="font-serif text-xl">Content :</div>
                    <div className="font-serif text-xl text-center">
                      {' '}
                      {voucherView?.content}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <form method="dialog" className="modal-backdrop">
              <button>close</button>
            </form>
          </dialog>
        </div>
      </div>
    </div>
  );
};

export default Voucher;
