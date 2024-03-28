import React, { useContext, useEffect, useState } from 'react';
import { icons } from '../../utils/icons';
import Comment from './Comment';
import * as blogApi from '../../services/blogpost';
import * as likeApi from '../../services/like';
import * as productApi from '../../services/product'
import ImageBlog from './ImageBlog';
import MethodContext from '../../context/methodProvider';
import CreateAndUpdateBlog from './CreateAndUpdateBlog';
import { Modal, Dropdown, Button } from 'flowbite-react';
import { Link } from 'react-router-dom';

const Blogpost = () => {

  const [openModal, setOpenModal] = useState(false);
  const { formatDateTime, deleteImage, notify } = useContext(MethodContext)
  const [isOpenForm, setIsOpenForm] = useState({ index: null, isOpen: false });
  const [blogposts, setBlogposts] = useState([]);
  const [change, setChange] = useState(true)
  const [deleteItem, setDeleteItem] = useState({ isDelete: false })
  const [blogCommentId, setBlogCommentId] = useState('')
  const [editBlogpost, setEditBlogpost] = useState(null);
  const Token = localStorage.getItem('token');
  const [liked, setLiked] = useState(false);
  const [products, setProducts] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const bloggData = await blogApi.getAllBlogPost()
        setBlogposts(bloggData?.blogList)
        console.log(bloggData);
        const getProduct = await productApi.getProduct()
        setProducts(getProduct?.data)
      } catch (error) {
        console.error('Error fetching blogposts:', error);
      }
    };
    fetchData();
    console.log(blogposts);

  }, [change]);

  const deleteBlogPost = async (id) => {
    try {
      const deleteBlog = await blogApi.deleteBlog(id, Token)
      if (deleteBlog === 200) {
        notify("Delete blog succesfuly", "success")
      }
      else {
        notify("Delete failed");
      }
    } catch (error) {

    }
  }

  const handleDelete = async (id, imageIds) => {
    await deleteImage(imageIds)
    await deleteBlogPost(id, Token)
    setChange(!change)
  }
  useEffect(() => {
    if (deleteItem?.isDelete) {
      handleDelete(deleteItem?.id, deleteItem?.imageIds)
      setDeleteItem({ isDelete: false })
    }
  }, [deleteItem?.isDelete])

  const openDeleteModal = (id, userId, imageIds) => {
    setDeleteItem(preDeleteItem => ({
      ...preDeleteItem,
      id: id,
      userId: userId,
      imageIds: imageIds,
    }));
    setOpenModal(true);
  };

  const handleModalComment = id => {
    setBlogCommentId(id);
    document.getElementById('my_modal_2_1').showModal();
    setChange(!change);
  };
  const handleOpenModalEdit = blogpost => {
    console.log(blogpost);
    setEditBlogpost(blogpost);
    setIsOpenForm({ index: blogpost.id, isOpen: true });
  };

  // like 

  const handleLikeClick = async (id) => {
    const isLike = await likeApi.userIsLike(Token, id);
    console.log(isLike);
    if (isLike?.data) {
      const remove = await likeApi.removeLike(Token, id);
      setChange(!change)
    } else {
      const add = await likeApi.addLike(Token, id);
      setChange(!change)
    }
  };

  return (
    <div className='w-[1200px] mx-auto '>
      <div className='grid grid-cols-12 gap-4'>
        <div className='col-span-4'>
          <div className='w-full flex items-center justify-center mt-10'>
            <div className='w-[90%] '>
              <h1
                class="font-extrabold text-red-400 text-3xl "
              >
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
                          <p className='text-base font-semibold whitespace-nowrap overflow-hidden overflow-ellipsis '>
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
          <div className='pt-4 flex items-center justify-center'>
            <div className='w-full h-20 border border-solid flex items-center justify-center shadow-md rounded-xl bg-white'>
              <div className="avatar online mr-4">
                <div className="w-16 rounded-full">
                  <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" alt='' />
                </div>
              </div>
              <input
                onClick={() => setIsOpenForm({ index: null, isOpen: true })}
                type="text"
                placeholder="What are you thinking ? "
                className="input input-bordered input-warning w-full max-w-2xl focus:outline-none" />
              {
                isOpenForm.index === null && isOpenForm.isOpen && <CreateAndUpdateBlog closeModal={setIsOpenForm} isOpenForm={isOpenForm} setChange={setChange} change={change} blogpost={null}></CreateAndUpdateBlog>
              }
            </div>
          </div>
          <div className='w-full'>
            {blogposts.length <= 0 ? (
              <div className="flex flex-col justify-center items-center">
                <img className="w-[200px] h-[200px] mt-10"
                  src="https://cdni.iconscout.com/illustration/premium/thumb/man-receiving-canceled-orders-back-4438793-3718471.png"
                  alt="" />
                <p className="text-lg font-bold mb-10">No block post yet!</p>
              </div>
            ) : (
              <>
                {blogposts?.map((blogpost) => {
                  return (
                    <div className='m-4' key={blogpost?.id}>
                      <div class="bg-white rounded shadow-lg max-w-full mx-auto ">
                        <header class="p-4 flex justify-between">
                          <div className='w-1/2'>
                            <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" alt='' className="float-left rounded-full w-10 h-10 m-1 mr-3" />
                            <div>
                              <h3 theme='pastel' class="text-lg font-bold">{blogpost?.user?.fullName}</h3>
                              <p class="text-sm text-gray-600">{formatDateTime(blogpost?.createDate)}</p>
                            </div>
                          </div>
                          <div className='w-[5%] font-bold text-xl p-2 cursor-pointer'>
                            <Dropdown label=""
                              renderTrigger={() => <span><icons.HiOutlineDotsVertical /></span>}
                              size="sm"
                              className='bg-blue-100 font-semibold text-base text-black'>
                              <Dropdown.Item onClick={() => openDeleteModal(blogpost?.id, blogpost?.user?.id, blogpost?.images)}>Delete Blog</Dropdown.Item>
                              <Dropdown.Item
                                onClick={() => { handleOpenModalEdit(blogpost) }}>
                                Edit Blog
                              </Dropdown.Item>
                            </Dropdown>
                            {editBlogpost && (
                              <CreateAndUpdateBlog
                                closeModal={() => {
                                  setIsOpenForm({ index: null, isOpen: false });
                                  setEditBlogpost(null);
                                }}
                                isOpenForm={isOpenForm}
                                setChange={setChange}
                                change={change}
                                blogpost={editBlogpost}
                              />
                            )}
                          </div>
                        </header>
                        <section >
                          <div className='flex items-center justify-center'>
                            <span className='text-lg w-[75%] font-semibold text-center max-sm:text-base'>
                              {blogpost?.title}
                            </span>
                          </div>
                          <div className='w-full'>
                            <ImageBlog imageUrls={blogpost?.images} />
                          </div>
                          <div className='flex items-center justify-center'>
                            <div className='w-[90%] shadow-lg rounded-sm flex items-center justify-center'>
                              <div className="collapse rounded-lg bg-gray-100">
                                <input type="checkbox" />
                                <div className="collapse-title text-base font-medium truncate">
                                  {blogpost?.content}
                                </div>
                                <div className="collapse-content">
                                  <p style={{ whiteSpace: 'pre-line' }}>
                                    {blogpost?.content}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </section>

                        <footer class="p-4">
                          <div className="grid grid-cols-3">
                            <div className="flex items-center justify-center">
                              <span
                                className="py-2 px-6 rounded-md cursor-pointer hover:bg-blue-300 font-semibold flex items-center justify-center"
                                onClick={() => { handleLikeClick(blogpost?.id) }}
                              >
                                <span className="mr-2 ">
                                  {liked ? (
                                    <icons.FcLike />
                                  ) : (
                                    <icons.FcLikePlaceholder />
                                  )}
                                </span>
                                <span>{(blogpost?.likeEntities).length} Like</span>
                              </span>
                            </div>
                            <div className="flex items-center justify-center">
                              <div
                                className="py-2 px-6 rounded-md cursor-pointer hover:bg-blue-300 font-semibold flex items-center justify-center"
                                onClick={() => {
                                  handleModalComment(blogpost?.id);
                                }}
                              >
                                <span className="mr-2 ">
                                  <icons.AiOutlineComment />
                                </span>
                                <span>Comment</span>
                              </div>
                            </div>
                            <div className="flex items-center justify-center">
                              <div className="py-2 px-6 rounded-md cursor-pointer hover:bg-blue-300 font-semibold flex items-center justify-center">
                                <span className="mr-2 ">
                                  <icons.BiShare />
                                </span>
                                <span>Share</span>
                              </div>
                            </div>
                          </div>
                        </footer>
                      </div>
                    </div>
                  );
                })}
              </>
            )}


          </div>

        </div>

        <dialog id="my_modal_2_1" className="modal z-50">
          <div className="modal-box w-10/12 max-w-5xl no-scrollbar">
            <Comment
              index={2}
              commentId={blogCommentId}
              setChange={setChange}
              change={change}
            />
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
      </div>
      <div>
        <Modal
          show={openModal}
          size="md"
          onClose={() => setOpenModal(false)}
          popup
        >
          <Modal.Header />
          <Modal.Body>
            <div className="text-center">
              <icons.HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 " />
              <h3 className="mb-5 text-lg font-normal text-gray-500 ">
                Are you sure you want to delete this blog post?
              </h3>
              <div className="flex justify-center gap-4">
                <Button
                  color="failure"
                  onClick={() => {
                    setDeleteItem(preDeleteItem => ({
                      ...preDeleteItem,
                      isDelete: true,
                    }));
                    setOpenModal(false);
                  }}
                >
                  {"Yes, I'm sure"}
                </Button>
                <Button color="gray" onClick={() => setOpenModal(false)}>
                  No, cancel
                </Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
};

export default Blogpost;