import React from 'react'

const Header = () => {
    return (
        <div className='w-full h-24'>
            <div className='flex space-x-4 justify-between px-8 '>
                <div>Beauty Boutique</div>
                <div>
                    <ol className='flex space-x-8'>
                        <li>Home</li>
                        <li>Products</li>
                        <li>About</li>
                        <li>Contact</li>
                        <li>Blogs</li>
                    </ol>
                </div>
                <div className='space-x-8'>
                    <button className='shadow-lg text-center px-4 py-2 rounded-xl text-black'>Sign up</button>
                    <button className='shadow-lg px-4 py-2 rounded-xl bg-cyan-400 text-black'>Sign in</button>
                </div>
            </div>
        </div>
    )
}

export default Header
