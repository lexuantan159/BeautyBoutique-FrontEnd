import { Modal, Table, Button } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import * as voucherApi from '../../../services/voucher'
import CRUVoucher from './CRUVoucher';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { RiPassExpiredFill } from "react-icons/ri";
import { MdOutlineDeliveryDining } from "react-icons/md";
import { LiaFileInvoiceDollarSolid } from "react-icons/lia";
import { MdAddTask } from "react-icons/md";

const ManageVoucher = () => {
    const [vouchers, setVouchers] = useState([]);
    const [isOpenForm, setIsOpenForm] = useState({ index: null, isOpen: false });
    const [change, setChange] = useState(true)
    const [openModal, setOpenModal] = useState(false);
    const [voucherExpires, setVoucherExpires] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const vouchersData = await voucherApi.getAllVoucher();
                setVouchers(vouchersData.voucherList);
            } catch (error) {
                console.error('Error fetching blogposts:', error);
            }
        };
        fetchData();
    }, [change]);

    const deleteVoucher = async (id) => {
        try {
            const deleteVou = await voucherApi.deleteVoucher(id)
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
                            <p className="text-xl font-bold">{vouchers.length}</p>
                            <p className="font-medium text-xs text-gray-300">Total voucher</p>
                        </div>
                    </div>

                    <div
                        className="p-3 border-[0.5px] border-gray-400 rounded-lg text-black bg-white flex items-center mt-5 md:mt-0">
                        <RiPassExpiredFill className="text-5xl text-red-400 mx-2" />
                        <div className="">
                            <p className="text-xl font-bold">122</p>
                            <p className="font-medium text-xs text-gray-300">Total voucher expires</p>
                        </div>
                    </div>

                    <div
                        className="p-3 border-[0.5px] border-gray-400 rounded-lg text-black bg-white flex items-center mt-5 md:mt-0">
                        <MdOutlineDeliveryDining className="text-5xl text-red-400 mx-2" />
                        <div className="">
                            <p className="text-xl font-bold">122</p>
                            <p className="font-medium text-xs text-gray-300">Total Delivery</p>
                        </div>
                    </div>

                    <div
                        className="p-3 border-[0.5px] border-gray-400 rounded-lg text-black bg-white flex items-center mt-5 md:mt-0">
                        <MdAddTask className="text-5xl text-red-400 mx-2" />
                        <div>
                            <button className="btn btn-outline btn-success" onClick={() => setIsOpenForm({ index: null, isOpen: true })}>Add new vouchers</button>
                        </div>
                        {
                            isOpenForm.index === null && isOpenForm.isOpen && <CRUVoucher closeModal={setIsOpenForm} isOpenForm={isOpenForm} setChange={setChange} change={change} voucher={null}></CRUVoucher>
                        }
                    </div>
                </div>

                <div className="h-[500px] shadow-lg overflow-y-scroll no-scrollbar border mt-2">
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
                                        <Table.Cell> {voucher.quantity}</Table.Cell>
                                        <Table.Cell> {voucher.numUsedVoucher}</Table.Cell>
                                        <Table.Cell> {voucher.discount * 100} %</Table.Cell>
                                        <Table.Cell> {voucher.maximDiscount} $</Table.Cell>
                                        <Table.Cell> {voucher.minimumOrder} $</Table.Cell>
                                        <Table.Cell> {voucher.startDate}</Table.Cell>
                                        <Table.Cell> {voucher.endDate}</Table.Cell>
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
                                                                handleDelete(voucher.id)
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
                    <div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default ManageVoucher