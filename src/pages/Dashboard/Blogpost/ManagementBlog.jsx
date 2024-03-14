import React, { useContext, useEffect, useState } from 'react'
import * as blogApi from '../../../services/blogpost'
import MethodContext from '../../../context/methodProvider';
import CreateAndUpdateBlog from '../../Blogpost/CreateAndUpdateBlog';
import { Button, Modal, Table } from 'flowbite-react';
import { icons } from '../../../utils/icons';

const ManagementBlog = () => {

    const [blogposts, setBlogposts] = useState([]);
    const [change, setChange] = useState()
    const [openModal, setOpenModal] = useState(false);
    const { formatDateTime, deleteImage } = useContext(MethodContext)
    const [isOpenForm, setIsOpenForm] = useState({ index: null, isOpen: false });
    const [editBlogpost, setEditBlogpost] = useState(null);
    const [deleteItem, setDeleteItem] = useState({ isDelete: false })


    useEffect(() => {
        const fetchData = async () => {
            try {
                const bloggData = await blogApi.getAllBlogPost()
                setBlogposts(bloggData.blogList)
                console.log(bloggData.blogList);
            } catch (error) {
                console.error('Error fetching blogposts:', error);
            }
        };
        fetchData();
    }, [change]);

    const deleteBlogPost = async (id, userId) => {
        try {
            const deleteBlog = await blogApi.deleteBlog(id, userId)
            if (deleteBlog === 200) {
                console.log("Delete successfully");
            }
            else {
                console.log("Delete failed");
            }
        } catch (error) {

        }
    }

    const handleDelete = async (id, userId, imageIds) => {
        await deleteImage(imageIds)
        await deleteBlogPost(id, userId)
        setChange(!change)
    }
    useEffect(() => {
        if (deleteItem.isDelete) {
            handleDelete(deleteItem.id, deleteItem.userId, deleteItem.imageIds)
            setDeleteItem({ isDelete: false })
        }
    }, [deleteItem.isDelete])

    const openDeleteModal = (id, userId, imageIds) => {
        setDeleteItem(preDeleteItem => ({ ...preDeleteItem, id: id, userId: userId, imageIds: imageIds }))
        setOpenModal(true)
    }


    const handleOpenModalEdit = (blogpost) => {
        console.log(blogpost);
        setEditBlogpost(blogpost);
        setIsOpenForm({ index: blogpost.id, isOpen: true });
    };
    return (
        <div data-theme="pastel" className='w-full h-auto bg-white flex items-center justify-center m-4'>
            <div className='w-[95%]'>
                <div className='flex items-center justify-center p-4 m-4'>
                    <span className='text-[#F6CBD1] text-3xl font-bold '>
                        Manage BLog Post
                    </span>
                </div>
                <div className=' flex items-center justify-end m-4'>
                    <div>
                        <button className="btn btn-outline btn-success"
                            onClick={() => setIsOpenForm({ index: null, isOpen: true })}>Add new BLog</button>
                    </div>
                    {
                        isOpenForm.index === null && isOpenForm.isOpen && <CreateAndUpdateBlog closeModal={setIsOpenForm} isOpenForm={isOpenForm} setChange={setChange} change={change} blogpost={null}></CreateAndUpdateBlog>
                    }
                </div>
                <div className="overflow-x-auto shadow-lg">
                    <Table hoverable>
                        <Table.Head>
                            <Table.HeadCell>Title</Table.HeadCell>
                            <Table.HeadCell>Content</Table.HeadCell>
                            <Table.HeadCell>Auth</Table.HeadCell>
                            <Table.HeadCell>Create Date</Table.HeadCell>
                            <Table.HeadCell>
                                <span className="sr-only w-10">Edit</span>
                            </Table.HeadCell>
                            <Table.HeadCell>
                                <span className="sr-only w-10">Delete</span>
                            </Table.HeadCell>
                        </Table.Head>
                        <Table.Body className="divide-y">
                            {blogposts.map((blogpost) => {
                                return (
                                    <Table.Row className="bg-white ">
                                        <Table.Cell className="font-medium text-gray-900 ">
                                            {blogpost.title}
                                        </Table.Cell>
                                        <Table.Cell> {blogpost.content}</Table.Cell>
                                        <Table.Cell> {blogpost.user.userName}</Table.Cell>
                                        <Table.Cell> {formatDateTime(blogpost.createDate)}</Table.Cell>
                                        <Table.Cell>
                                            <button className="btn btn-outline btn-warning"
                                                onClick={() => {
                                                    handleOpenModalEdit(blogpost)
                                                }}>Edit</button>
                                            {editBlogpost && (
                                                <CreateAndUpdateBlog
                                                    closeModal={() => {
                                                        setIsOpenForm({ index: null, isOpen: false });
                                                        setEditBlogpost(null); // Đóng modal và xóa thông tin về blogpost được chỉnh sửa
                                                    }}
                                                    isOpenForm={isOpenForm}
                                                    setChange={setChange}
                                                    change={change}
                                                    blogpost={editBlogpost}
                                                />
                                            )}
                                        </Table.Cell>
                                        <Table.Cell>
                                            <button className="btn btn-outline btn-error"
                                                onClick={() => openDeleteModal(blogpost.id, blogpost.user.id, blogpost.images)}>Delete</button>
                                            <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
                                                <Modal.Header />
                                                <Modal.Body>
                                                    <div className="text-center">
                                                        <icons.HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 " />
                                                        <h3 className="mb-5 text-lg font-normal text-gray-500 ">
                                                            Are you sure you want to delete this blog post?
                                                        </h3>
                                                        <div className="flex justify-center gap-4">
                                                            <Button color="failure" onClick={() => {
                                                                setDeleteItem(preDeleteItem => ({ ...preDeleteItem, isDelete: true }))
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

export default ManagementBlog
