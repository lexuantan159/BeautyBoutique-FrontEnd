import React, { useContext, useEffect, useState } from 'react'
import { icons } from '../../utils/icons';
import MethodContext from '../../context/methodProvider';
import Comment from './Comment';
import InputImage from '../../components/fileinput/InputImage';
import * as blogApi from '../../service/blogpost'
import ImageBlog from './ImageBlog';

const Blogpost = () => {
    const { uploadFile } = useContext(MethodContext)
    const [imageUploads, setImageUpload] = useState([]);
    const [urlImgs, setUrlImgs] = useState([])

    const handleChange = (e) => {
        for (let i = 0; i < e.target.files.length; i++) {
            const newImage = e.target.files[i];
            newImage["id"] = Math.random();
            setImageUpload((prevState) => [...prevState, newImage]);
        }
    };
    const handlePost = async () => {
        const imageUrls = await uploadFile(imageUploads)
        setUrlImgs(imageUrls)


    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const bloggData = await blogApi.getAllBlogPost()
                console.log(bloggData.blogList);
                //setVouchers(vouchersData.voucherList);
            } catch (error) {
                console.error('Error fetching blogposts:', error);
            }
        };
        fetchData();
    }, []);

    const [blogposts, setBlogposts] = useState([
        {
            author: 'John Doe',
            date: 'January 10, 2024',
            title: 'The Art of Makeup',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam aliquet magna sed dolor rhoncus, et dapibus neque pretium. Sed pulvinar ligula et urna aliquam, non lacinia arcu consectetur. Nunc eget risus id lorem sollicitudin pulvinar. Sed viverra sodales risus, eget condimentum nisi consectetur vel. Cras nec faucibus nulla. Nullam sed dui in neque tempus sagittis. Nulla placerat ligula ac massa feugiat, a tempor ex aliquet.'
        },
        {
            author: 'Jane Smith',
            date: 'February 5, 2024',
            title: 'Beauty Tips for Every Occasion',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam aliquet magna sed dolor rhoncus, et dapibus neque pretium. Sed pulvinar ligula et urna aliquam, non lacinia arcu consectetur. Nunc eget risus id lorem sollicitudin pulvinar. Sed viverra sodales risus, eget condimentum nisi consectetur vel. Cras nec faucibus nulla. Nullam sed dui in neque tempus sagittis. Nulla placerat ligula ac massa feugiat, a tempor ex aliquet.'
        },
        {
            author: 'Michael Johnson',
            date: 'March 20, 2024',
            title: 'The Evolution of Makeup Trends',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam aliquet magna sed dolor rhoncus, et dapibus neque pretium. Sed pulvinar ligula et urna aliquam, non lacinia arcu consectetur. Nunc eget risus id lorem sollicitudin pulvinar. Sed viverra sodales risus, eget condimentum nisi consectetur vel. Cras nec faucibus nulla. Nullam sed dui in neque tempus sagittis. Nulla placerat ligula ac massa feugiat, a tempor ex aliquet.'
        },
        {
            author: 'Emily Williams',
            date: 'April 15, 2024',
            title: 'Makeup Tips for a Natural Look',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam aliquet magna sed dolor rhoncus, et dapibus neque pretium. Sed pulvinar ligula et urna aliquam, non lacinia arcu consectetur. Nunc eget risus id lorem sollicitudin pulvinar. Sed viverra sodales risus, eget condimentum nisi consectetur vel. Cras nec faucibus nulla. Nullam sed dui in neque tempus sagittis. Nulla placerat ligula ac massa feugiat, a tempor ex aliquet.'
        }
    ]);
    const [imageList, setImageList] = useState([
        'https://firebasestorage.googleapis.com/v0/b/beautyboutique-7ebb3.appspot.com/o/Blog-post%2F1.png?alt=media&token=6bd2273d-b34f-4df2-adfd-55d1e1506a48',
        'https://firebasestorage.googleapis.com/v0/b/beautyboutique-7ebb3.appspot.com/o/Blog-post%2F1.png?alt=media&token=6bd2273d-b34f-4df2-adfd-55d1e1506a48',
        'https://firebasestorage.googleapis.com/v0/b/beautyboutique-7ebb3.appspot.com/o/Blog-post%2F1.png?alt=media&token=6bd2273d-b34f-4df2-adfd-55d1e1506a48',
        'https://firebasestorage.googleapis.com/v0/b/beautyboutique-7ebb3.appspot.com/o/Blog-post%2F1.png?alt=media&token=6bd2273d-b34f-4df2-adfd-55d1e1506a48',
        'https://firebasestorage.googleapis.com/v0/b/beautyboutique-7ebb3.appspot.com/o/Blog-post%2F1.png?alt=media&token=6bd2273d-b34f-4df2-adfd-55d1e1506a48',
        'https://firebasestorage.googleapis.com/v0/b/beautyboutique-7ebb3.appspot.com/o/Blog-post%2F1.png?alt=media&token=6bd2273d-b34f-4df2-adfd-55d1e1506a48',
    ])

    const [likes, setLikes] = useState(0);
    const [liked, setLiked] = useState(false);
    const [expanded, setExpanded] = useState(false);

    const handleLikeClick = () => {
        if (!liked) {
            setLikes(likes + 1);
        } else {
            setLikes(likes - 1);
        }
        setLiked(!liked);
    };

    return (
        <div theme="pastel" className='w-full bg-[#F1F0F1]'>
            <div className='pt-28 flex items-center justify-center'>
                <div className='w-[60%] h-20 border border-solid flex items-center justify-center shadow-md rounded-xl bg-white'>
                    <div className="avatar online mr-4">
                        <div className="w-16 rounded-full">
                            <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                        </div>
                    </div>
                    <input
                        onClick={() => document.getElementById('my_modal_2').showModal()}
                        type="text"
                        placeholder="What are you thinking ? "
                        className="input input-bordered input-warning w-full max-w-2xl" />
                </div>
            </div>

            <dialog id="my_modal_2" className="modal">
                <div className="modal-box w-11/12 max-w-3xl">
                    <div className='w-full m-4'>
                        <span className='mr-4 text-black font-semibold text-xl' >Title of the article</span>

                        <input type="text"
                            placeholder="Title"
                            className="input input-bordered input-primary w-[70%]" />
                    </div>
                    <div className='w-full m-4'>
                        <span className='text-black font-semibold text-xl'>Do you have any questions or concerns about products or beauty care?</span>
                        <textarea
                            placeholder="Content"
                            className="textarea textarea-primary textarea-lg w-[95%] mt-2" ></textarea>
                    </div>
                    <div className='w-[95%] flex items-center justify-center m-4'>
                        <InputImage />
                    </div>
                    <div className='flex items-end justify-end'>
                        <button className="btn btn-outline btn-success" onClick={handlePost}>POST</button>
                    </div>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog >
            <div className='flex items-center justify-center'>
                <div className='w-[60%]'>
                    {blogposts.map((blogpost) => {
                        return (
                            <div className='m-4' key={blogpost.id}>
                                <div class="bg-white rounded shadow-lg max-w-[80%] mx-auto ">
                                    <header class="p-4 flex">
                                        <img src="https://via.placeholder.com/200" class="float-left rounded-full w-10 h-10 m-1 mr-3" />
                                        <div>
                                            <h3 theme='pastel' class="text-lg font-bold">{blogpost.author}</h3>
                                            <p class="text-sm text-gray-600">{blogpost.date}</p>
                                        </div>
                                    </header>
                                    <section >
                                        <div className='flex items-center justify-center'>
                                            <span className='text-2xl w-[75%] font-semibold flex items-start justify-start max-sm:text-base'>
                                                {blogpost.title}
                                            </span>
                                        </div>
                                        <div className='w-full'>
                                            <ImageBlog imageUrls={imageList} />
                                        </div>
                                        <div className='flex items-center justify-center'>
                                            <div className='w-[90%] bg-gray-200 border shadow-lg rounded-sm flex items-center justify-center'>
                                                <div className="collapse bg-base-200 rounded-sm">
                                                    <input type="checkbox" />
                                                    <div className="collapse-title text-base font-medium">
                                                        etc ...
                                                    </div>
                                                    <div className="collapse-content">
                                                        <p style={{ whiteSpace: 'pre-line' }}>
                                                            {blogpost.content}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </section>

                                    <footer class="p-4">
                                        <div className='grid grid-cols-3'>
                                            <div className='flex items-center justify-center'>
                                                <span className='py-2 px-6 rounded-md cursor-pointer hover:bg-blue-300 font-semibold flex items-center justify-center'
                                                    onClick={handleLikeClick}>
                                                    <span className='mr-2 '>
                                                        {liked ? <icons.FcLike /> : <icons.FcLikePlaceholder />}
                                                    </span>
                                                    <span>
                                                        {likes}  Like
                                                    </span>
                                                </span>
                                            </div>
                                            <div className='flex items-center justify-center'>
                                                <div className='py-2 px-6 rounded-md cursor-pointer hover:bg-blue-300 font-semibold flex items-center justify-center'>
                                                    <span className='mr-2 '>
                                                        <icons.AiOutlineComment />
                                                    </span>
                                                    <span>Comment</span>
                                                </div>
                                            </div>
                                            <div className='flex items-center justify-center'>
                                                <div className='py-2 px-6 rounded-md cursor-pointer hover:bg-blue-300 font-semibold flex items-center justify-center'>
                                                    <span className='mr-2 '>
                                                        <icons.BiShare />
                                                    </span>
                                                    <span>Share</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='w-full'>
                                            <Comment id={blogpost.id} />
                                        </div>
                                    </footer>
                                </div>
                            </div>
                        );
                    })}


                </div >
            </div>
        </div >
    )
}

export default Blogpost
