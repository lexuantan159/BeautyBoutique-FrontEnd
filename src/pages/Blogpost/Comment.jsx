import React, { useContext, useEffect, useState } from 'react'
import { FiSend } from "react-icons/fi";
import { Button } from 'flowbite-react';
import { ToastContainer, toast } from 'react-toastify';
import { Spinner } from '@material-tailwind/react';


const Comment = ({ commentss }) => {

    const [loading, setLoading] = useState(false);

    const [comments, setComments] = useState([{
        name: 'Pham Yen Ngoc',
        avatar_url: 'https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg',
        id: 1,
        date: '26/02/2024',
        content: 'I love all the product from Stylekorean. They provide only the authentic products to customers. I can say Stylekorean is the most trustful website for everyone who is interested in Korean cosmetics. I love all the product from Stylekorean. They provide only the authentic products to customers. I can say Stylekorean is the most trustful website for everyone who is interested in Korean cosmetics.'
    },
    {
        name: 'Bun Ca',
        avatar_url: 'https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg',
        id: 2,
        date: '26/02/2022',
        content: ' et dapibus neque pretium. Sed pulvinar ligula et urna aliquam, non lacinia arcu consectetur. Nunc eget risus id lorem sollicitudin pulvinar. Sed viverra sodales risus, eget condimentum nisi consectetur vel. Cras nec faucibus nulla. Nullam sed dui in neque tempus sagittis. Nulla placerat ligula ac massa feugiat, a tempor ex aliquet.'
    },
    {
        name: 'Bun Bo',
        avatar_url: 'https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg',
        id: 3,
        date: '26/02/2022',
        content: 'Been using it every day and my skin looks fantastic after just a few weeks of use. Love the texture so much.'
    },
    {
        name: 'Bong Lan Trung Muoi',
        avatar_url: 'https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg',
        id: 4,
        date: '26/02/2022',
        content: 'I relly excited to use beauty of joasen serum ! I relly excited to use beauty of joasen serum ! I relly excited to use beauty of joasen serum ! I relly excited to use beauty of joasen serum ! I relly excited to use beauty of joasen serum ! I relly excited to use beauty of joasen serum ! I relly excited to use beauty of joasen serum ! I relly excited to use beauty of joasen serum !'
    },
    {
        name: 'Lasea',
        avatar_url: 'https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg',
        id: 4,
        date: '26/02/2022',
        content: 'I got this for my mom & brother. Both have a deep medium complexion & acne scars. This product helped with their overall complextion by making it brighter & more even toned. '
    }
    ]);

    const [newComment, setNewComment] = useState('');


    return (
        <>
            <ToastContainer />
            <div className='w-full h-auto'>
                <div className='flex items-start justify-center m-2'>
                    <div className="avatar-group -space-x-6 rtl:space-x-reverse w-[10%]">
                        <div className="avatar">
                            <div className="w-12">
                                <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                            </div>
                        </div>
                    </div>
                    <div class="flex py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 w-[80%]">
                        <textarea
                            id="comment"
                            rows="1"
                            onChange={(e) => setNewComment(e.target.value)}
                            value={newComment}
                            className="textarea textarea-accent w-[90%]"
                            placeholder="Write Your Comment..."
                            required
                        ></textarea>
                        <div className='flex items-center justify-center ml-4'>
                            <Button gradientMonochrome="lime"
                                // onClick={postComment} 
                                disabled={loading}>
                                {loading ? (
                                    <div className="flex items-center justify-center">
                                        <Spinner className="h-6 w-6 mr-4" /> <span>Loading...</span>
                                    </div>
                                ) : (<FiSend />
                                )}
                            </Button>
                        </div>
                    </div>
                </div>
                {comments.map((comment) => (
                    <>
                        <div key={comment.id} className='flex items-start justify-center'>
                            <div className='w-4/5 flex items-start justify-center'>
                                <div className='w-[90%] border bg-gray-100 p-1 rounded-xl my-2'>
                                    <div className=' avatar-group'>
                                        <div className='avatar'>
                                            <div className='w-10'>
                                                <img src={comment.avatar_url} alt='Avatar' />
                                            </div>
                                        </div>
                                        <div className='ml-2'>
                                            <h1 className='text-base font-semibold'>{comment.name}</h1>
                                            <h1 className='text-sm'>{comment.date}</h1>
                                        </div>

                                    </div>
                                    <div className='px-2'>
                                        <h2>{comment.content}</h2>
                                    </div>
                                    {/* {auth.id === comment.user_id && ( */}
                                    <div className='flex items-end justify-end'>
                                        <button className='text-xs mx-2 text-red-500'
                                        // onClick={() => deleteComment(comment.id)}
                                        >
                                            Delete</button>
                                    </div>
                                    {/* )} */}

                                </div>

                            </div>

                        </div>

                    </>
                ))}



            </div>
        </>
    )
}

export default Comment