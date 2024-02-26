import React from 'react'
import { Footer } from 'flowbite-react';
import { BsDribbble, BsFacebook, BsGithub, BsInstagram, BsTwitter } from 'react-icons/bs';
import logo from "../../public/img/logo.jpg";

const footer = () => {
    return (
        <div className=' w-full flex items-center justify-center bg-[#F5F6F6]'>
            <div className='w-4/5'>
                <Footer container>
                    <div className="w-full">
                        <div className="grid w-full justify-between sm:flex sm:justify-between md:flex md:grid-cols-1">
                            <div className='flex items-center justify-center'>
                                <div>
                                    <div className="avatar">
                                        <div className="w-36 rounded-full">
                                            <img alt={"logo"} src={logo} />
                                        </div>
                                    </div>
                                    <div className="self-center whitespace-nowrap text-xl font-semibold text-black">BEAUTY BOUTIQUE</div>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-8 sm:mt-4 sm:grid-cols-3 sm:gap-6">
                                <div>
                                    <Footer.Title title="about" />
                                    <Footer.LinkGroup col>
                                        <Footer.Link href="#">Flowbite</Footer.Link>
                                        <Footer.Link href="#">Tailwind CSS</Footer.Link>
                                    </Footer.LinkGroup>
                                </div>
                                <div>
                                    <Footer.Title title="Follow us" />
                                    <Footer.LinkGroup col>
                                        <Footer.Link href="#">Github</Footer.Link>
                                        <Footer.Link href="#">Discord</Footer.Link>
                                    </Footer.LinkGroup>
                                </div>
                                <div>
                                    <Footer.Title title="Legal" />
                                    <Footer.LinkGroup col>
                                        <Footer.Link href="#">Privacy Policy</Footer.Link>
                                        <Footer.Link href="#">Terms &amp; Conditions</Footer.Link>
                                    </Footer.LinkGroup>
                                </div>
                            </div>
                        </div>
                        <Footer.Divider />
                        <div className="w-full sm:flex sm:items-center sm:justify-between">
                            <Footer.Copyright href="#" by="Group 5 FPT Intenship" />
                            <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
                                <Footer.Icon href="#" icon={BsFacebook} />
                                <Footer.Icon href="#" icon={BsInstagram} />
                                <Footer.Icon href="#" icon={BsTwitter} />
                                <Footer.Icon href="#" icon={BsGithub} />
                                <Footer.Icon href="#" icon={BsDribbble} />
                            </div>
                        </div>
                    </div>
                </Footer>
            </div>
        </div>
    );
}
export default footer
