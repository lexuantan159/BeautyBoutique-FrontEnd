import { Modal, Table, Button } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import * as voucherApi from '../../../service/voucher'
import CRUVoucher from './CRUVoucher';
import { HiOutlineExclamationCircle } from 'react-icons/hi';

const ManageVoucher = () => {
    const [vouchers, setVouchers] = useState([]);
    const [isOpenForm, setIsOpenForm] = useState({ index: null, isOpen: false });
    const [change, setChange] = useState(true)
    const [openModal, setOpenModal] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const vouchersData = await voucherApi.getAllVoucher();
                setVouchers(vouchersData.voucherList);
                console.log(vouchersData.voucherList);
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
        <div data-theme="pastel" className='w-full h-auto bg-white flex items-center justify-center m-4'>
            <div className='w-80%'>
                <div className='flex items-center justify-center p-4 m-4'>
                    <span className='text-[#F6CBD1] text-3xl font-bold'>
                        Manage vouchers and promotions
                    </span>
                </div>
                <div className=' flex items-center justify-end m-4'>
                    <div>
                        <button className="btn btn-outline btn-success" onClick={() => setIsOpenForm({ index: null, isOpen: true })}>Add new vouchers</button>
                    </div>
                    {
                        isOpenForm.index === null && isOpenForm.isOpen && <CRUVoucher closeModal={setIsOpenForm} isOpenForm={isOpenForm} setChange={setChange} change={change} voucher={null}></CRUVoucher>
                    }
                </div>
                <div className="overflow-x-auto shadow-lg">
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
                            {vouchers.map((voucher, index) => {
                                return (
                                    <Table.Row className="bg-white ">
                                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 ">
                                            {voucher.title}
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
                                                        <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                                                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
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
