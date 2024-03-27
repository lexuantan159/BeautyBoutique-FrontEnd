import React, { useEffect, useState } from 'react';
import { Modal, Table, Button, Pagination } from 'flowbite-react';
import * as voucherApi from '../../../services/voucher';
import CRUVoucher from './CRUVoucher';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { RiPassExpiredFill } from "react-icons/ri";
import { MdOutlineDeliveryDining } from "react-icons/md";
import { LiaFileInvoiceDollarSolid } from "react-icons/lia";
import { MdAddTask } from "react-icons/md";
import { CiFilter } from "react-icons/ci";


const ManageVoucher = () => {
  const [vouchers, setVouchers] = useState([]);
  const [isOpenForm, setIsOpenForm] = useState({ index: null, isOpen: false });
  const [change, setChange] = useState(true)
  const [openModal, setOpenModal] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0)
  const Token = localStorage.getItem('token');


  const [filterOption, setFilterOption] = useState('Default');
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsOpenForm({ index: null, isOpen: false })
        const vouchersData = await voucherApi.getAllVoucher();
        const totalVoucher = vouchersData.quantity;
        setTotal(totalVoucher)
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
      } catch (error) {
        console.error('Error fetching blogposts:', error);
      }
    };
    fetchData();
  }, [currentPage, filterOption, change]);

  const deleteVoucher = async (id) => {
    try {
      const deleteVou = await voucherApi.deleteVoucher(id, Token)
      if (deleteVou === 200) {
        console.log("Delete successfully");
      }
      else
        console.log("Delete failed");
    } catch (error) {
    }
  }
  const handleDelete = async (id) => {
    await deleteVoucher(id)
    setChange(!change)
  }
  const onPageChange = (page) => {
    setCurrentPage(page);
  };
  const handleSortChange = (e) => {
    setFilterOption(e.target.value);
  };

  return (
    <div className='max-h-screen mx-4 fill-availabl'>
      <div className='flex items-center justify-center pt-4 m-4'>
        <span className='text-center font-bold text-3xl bg-gradient-to-r from-red-400 to-red-800 text-transparent bg-clip-text'>
          Manage vouchers and promotions
        </span>
      </div>
      <div className='w-full'>
        <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  gap-5 mt-10">
          <div
            className="p-3 border-[0.5px] border-gray-400 rounded-lg text-black bg-white flex items-center mt-5 md:mt-0 ">
            <LiaFileInvoiceDollarSolid className="text-5xl text-red-400 mx-2" />
            <div className="">
              <p className="text-xl font-bold">{total}</p>
              <p className="font-medium text-xs text-gray-300">Total voucher</p>
            </div>
          </div>

          <div
            className="p-3 border-[0.5px] border-gray-400 rounded-lg text-black bg-white flex items-center mt-5 md:mt-0">
            <RiPassExpiredFill className="text-5xl text-red-400 mx-2" />
            <div className="">
              <p className="text-xl font-bold">{vouchers?.length}</p>
              <p className="font-medium text-xs text-gray-300">Total voucher page</p>
            </div>
          </div>

          <div
            className="p-3 border-[0.5px] border-gray-400 rounded-lg text-black bg-white flex items-center mt-5 md:mt-0">
            <CiFilter className="text-5xl text-red-400 mx-2" />
            <div className="">
              <select className="select border-red-400 select-secondary w-full max-w-xs mb-2 focus:outline-none"
                onChange={handleSortChange}
                value={filterOption}
              >
                <option value="Default">Default</option>
                <option value="Discount DESC">Discount DESC</option>
                <option value="Discount ASC">Discount ASC</option>
              </select>
            </div>
          </div>

          <div
            className="p-3 border-[0.5px] border-gray-400 rounded-lg text-black bg-white flex items-center mt-5 md:mt-0">
            <MdAddTask className="text-5xl text-red-400 mx-2" />
            <div>
              <button className="btn btn-outline border-red-400 btn-success" onClick={() => setIsOpenForm({ index: null, isOpen: true })}>Add new vouchers</button>
            </div>
            {
              isOpenForm.index === null && isOpenForm.isOpen && <CRUVoucher closeModal={setIsOpenForm} isOpenForm={isOpenForm} setChange={setChange} change={change} voucher={null}></CRUVoucher>
            }
          </div>
        </div>

        <div className="h-[550px] shadow-lg overflow-y-scroll no-scrollbar border mt-2 relative">
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell>Title</Table.HeadCell>
              <Table.HeadCell className='w-10'>Quantity</Table.HeadCell>
              <Table.HeadCell className='w-10'>Quantity used</Table.HeadCell>
              <Table.HeadCell className='w-10'>Discount</Table.HeadCell>
              <Table.HeadCell className='w-10'>Maximum Discount</Table.HeadCell>
              <Table.HeadCell className='w-10'>Minimum Order</Table.HeadCell>
              <Table.HeadCell>Start Date</Table.HeadCell>
              <Table.HeadCell>End Date</Table.HeadCell>
              <Table.HeadCell>
                <span className="sr-only w-10">Edit</span>
              </Table.HeadCell>
              <Table.HeadCell>
                <span className="sr-only w-10">Delete</span>
              </Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {vouchers?.map((voucher, index) => {
                return (
                  <Table.Row className="bg-white ">
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 ">
                      {voucher?.title}
                    </Table.Cell>
                    <Table.Cell> {voucher?.quantity}</Table.Cell>
                    <Table.Cell> {voucher?.numUsedVoucher}</Table.Cell>
                    <Table.Cell> {voucher?.discount * 100} %</Table.Cell>
                    <Table.Cell> {voucher?.maximDiscount} $</Table.Cell>
                    <Table.Cell> {voucher?.minimumOrder} $</Table.Cell>
                    <Table.Cell> {voucher?.startDate}</Table.Cell>
                    <Table.Cell> {voucher?.endDate}</Table.Cell>
                    <Table.Cell>
                      <button className="btn btn-outline btn-warning" onClick={() => setIsOpenForm({ index: voucher.id, isOpen: true })}>Edit</button>
                      {
                        isOpenForm.index === voucher.id && isOpenForm.isOpen && <CRUVoucher closeModal={setIsOpenForm} isOpenForm={isOpenForm} setChange={setChange} change={change} voucher={voucher}></CRUVoucher>
                      }
                    </Table.Cell>
                    <Table.Cell>
                      <button className="btn btn-outline btn-error" onClick={() => setOpenModal(true)} >Delete</button>
                      <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
                        <Modal.Header />
                        <Modal.Body>
                          <div className="text-center">
                            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 " />
                            <h3 className="mb-5 text-lg font-normal text-gray-500 ">
                              Are you sure you want to delete this voucher?
                            </h3>
                            <div className="flex justify-center gap-4">
                              <Button color="failure" onClick={() => {
                                handleDelete(voucher?.id)
                                setOpenModal(false)
                              }}>
                                {"Yes, I'm sure"}
                              </Button>
                              <Button color="gray" onClick={() => setOpenModal(false)}>
                                No, cancel
                              </Button>
                            </div>
                          </div>
                        </Modal.Body>
                      </Modal>
                    </Table.Cell>
                  </Table.Row>
                )
              })}

            </Table.Body>
          </Table>
          <div className="flex overflow-x-auto sm:justify-center absolute bottom-4 left-1/3">
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} showIcons />
          </div>
        </div>
      </div>
    </div>
  )
}
export default ManageVoucher;
