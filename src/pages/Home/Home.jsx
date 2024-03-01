import { Carousel } from 'flowbite-react'
import React from 'react'
import { Link } from 'react-router-dom';

const Home = () => {
    const products = [
        {
            id: 1,
            title: 'Shoes!',
            description: 'If a dog chews shoes whose shoes does he choose?',
            imageUrl: 'https://tecdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(73).webp'
        },
        {
            id: 2,
            title: 'Shoes!',
            description: 'If a dog chews shoes whose shoes does he choose?',
            imageUrl: 'https://tecdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(73).webp'
        },
        {
            id: 3,
            title: 'Shoes!',
            description: 'If a dog chews shoes whose shoes does he choose?',
            imageUrl: 'https://tecdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(73).webp'
        },
        {
            id: 4,
            title: 'Shoes!',
            description: 'If a dog chews shoes whose shoes does he choose?',
            imageUrl: 'https://tecdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(73).webp'
        },
        {
            id: 5,
            title: 'Shoes!',
            description: 'If a dog chews shoes whose shoes does he choose?',
            imageUrl: 'https://tecdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(73).webp'
        },
        {
            id: 6,
            title: 'Shoes!',
            description: 'If a dog chews shoes whose shoes does he choose?',
            imageUrl: 'https://tecdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(73).webp'
        },

    ];
    return (
        <div className='w-full bg-[#F5F6F6]'>
            <Link to='/voucher'>
                <div className='flex items-center justify-center'>
                    <div className='w-[80%] mt-36 flex items-center justify-center'>
                        <div className='w-full '>
                            <div className="sm:h-64 md:h-[500px] xl:h-h-[500px] h-56 rounded-lg ">
                                <Carousel>
                                    <img className='rounded-lg' src="https://firebasestorage.googleapis.com/v0/b/beautyboutique-7ebb3.appspot.com/o/Banner%2Fbanner1.png?alt=media&token=de8792a7-06e7-494a-a15c-0ee844eaa4e7" alt="" />
                                    <img className='rounded-lg' src="https://firebasestorage.googleapis.com/v0/b/beautyboutique-7ebb3.appspot.com/o/Banner%2Fbanner2.png?alt=media&token=cafe3ac2-cd7a-4481-92f4-94f3bbc84460" alt="" />
                                    <img className='rounded-lg' src="https://firebasestorage.googleapis.com/v0/b/beautyboutique-7ebb3.appspot.com/o/Banner%2Fbanner3.png?alt=media&token=eab58182-5fd7-4a26-999d-b052b1ba2b5c" alt="" />
                                    <img className='rounded-lg' src="https://firebasestorage.googleapis.com/v0/b/beautyboutique-7ebb3.appspot.com/o/Banner%2Fbanner4.png?alt=media&token=96a4e940-5ca3-4374-9731-1738926482ed" alt="" />
                                    <img className='rounded-lg' src="https://firebasestorage.googleapis.com/v0/b/beautyboutique-7ebb3.appspot.com/o/Banner%2Fbanber5.png?alt=media&token=9962b00f-f718-46a7-b977-ad18ca313212" alt="" />
                                    <img className='rounded-lg' src="https://firebasestorage.googleapis.com/v0/b/beautyboutique-7ebb3.appspot.com/o/Banner%2Fbanner6.png?alt=media&token=93b3b186-9a8c-405d-b07b-07e8c8ab178b" alt="" />
                                </Carousel>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>

            <div className='font-bold text-3xl mt-6 flex items-center justify-center'>
                <span className='text-black'>
                    VOU
                </span>
                <span className='text-red-400'>
                    CHER
                </span>
            </div>

            <div className='font-bold text-3xl mt-6 flex items-center justify-center'>
                <span className='text-black'>
                    TOP
                </span>
                <span className='text-red-400 ml-4'>
                    PRODUCT
                </span>
            </div>
            <div className='m-4 '>
                <div class="flex items-center justify-center">
                    <div class="grid xl:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 gap-4">
                        {products.map((product) => (
                            <div key={product.id} className="card w-64 bg-base-100 shadow-xl m-2">
                                <figure>
                                    <img
                                        alt="gallery"
                                        className="block h-full w-full rounded-lg object-cover object-center"
                                        src={product.imageUrl}
                                    />
                                </figure>
                                <div className="card-body">
                                    <h2 className="card-title">{product.title}</h2>
                                    <p>{product.description}</p>
                                    <div className="card-actions justify-end">
                                        <button className="btn btn-primary">Buy Now</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className='font-bold text-3xl mt-6 flex items-center justify-center'>
                <span className='text-black'>
                    BLOG
                </span>
                <span className='text-red-400 ml-4'>
                    & EXPERIENCE
                </span>
            </div>
            <Link to='/blogpost'>
                <div class="container mt-12 mx-auto">
                    <section class="text-center">
                        <div class="pb-12 flex flex-wrap justify-center">
                            <div class="w-full shrink-0 grow-0 basis-auto px-3 md:w-10/12">
                                <div class="relative mb-6 overflow-hidden rounded-lg bg-cover bg-no-repeat shadow-lg dark:shadow-black/20"
                                    data-te-ripple-init data-te-ripple-color="light">
                                    <img src="https://firebasestorage.googleapis.com/v0/b/beautyboutique-7ebb3.appspot.com/o/Banner%2Fa.jpg?alt=media&token=31d23c23-b858-4a4a-8a6c-14d740a70557" class="w-full" />

                                </div>
                            </div>
                            <div class="w-full shrink-0 grow-0 basis-auto px-3 md:w-8/12 xl:w-6/12">
                                <h5 class="mb-3 text-lg font-bold">
                                    The Ultimate Guide to Facial Skincare: Tips for Healthy, Glowing Skin
                                </h5>

                                <p class="mb-6">
                                    Taking care of your skin is essential for maintaining a healthy and radiant complexion.
                                    With the right skincare routine, you can achieve glowing skin that makes you feel confident and beautiful.
                                    Here's your ultimate guide to facial skincare, including tips and tricks for achieving and maintaining healthy skin.
                                    Understanding your skin type is crucial for selecting the right skincare products. Whether you have oily, dry, combination, or sensitive skin, tailor your skincare routine to address your specific needs.
                                    Cleansing your face twice a day helps remove dirt, oil, and impurities that can clog pores and lead to breakouts. Use a gentle cleanser suited to your skin type to maintain a clean and refreshed complexion.
                                </p>
                                <button className="btn btn-success">READMORE</button>
                            </div>
                        </div>
                    </section>
                </div>
            </Link>
        </div>
    )
}

export default Home