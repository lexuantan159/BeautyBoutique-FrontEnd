import { Carousel } from 'flowbite-react'
import React from 'react'

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
            <div>
                <div class="container mt-12 mx-auto">
                    <section class="text-center">
                        <div class="pb-12 flex flex-wrap justify-center">
                            <div class="w-full shrink-0 grow-0 basis-auto px-3 md:w-10/12">
                                <div class="relative mb-6 overflow-hidden rounded-lg bg-cover bg-no-repeat shadow-lg dark:shadow-black/20"
                                    data-te-ripple-init data-te-ripple-color="light">
                                    <img src="https://mdbcdn.b-cdn.net/img/new/slides/080.jpg" class="w-full" />
                                    <a href="#!">
                                        <div
                                            class="absolute top-0 right-0 bottom-0 left-0 h-full w-full overflow-hidden bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-100 bg-[hsla(0,0%,98.4%,.15)]">
                                        </div>
                                    </a>
                                </div>
                            </div>
                            <div class="w-full shrink-0 grow-0 basis-auto px-3 md:w-8/12 xl:w-6/12">
                                <h5 class="mb-3 text-lg font-bold">
                                    This is a very long post title
                                </h5>
                                <p class="mb-4 text-neutral-500 dark:text-neutral-300">
                                    <small>Published <u>15.01.2022</u> by
                                        <a href="#!">Anna Maria Doe</a></small>
                                </p>
                                <p class="mb-6">
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa
                                    atque hic, officiis blanditiis accusantium veritatis ullam?
                                    Maiores atque autem velit officiis molestiae voluptates suscipit
                                    eligendi, vero expedita sequi, doloremque modi?
                                </p>
                                <a data-te-ripple-init data-te-ripple-color="light"
                                    class="inline-block rounded-full bg-primary px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                                    href="" role="button">Read more</a>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
}

export default Home