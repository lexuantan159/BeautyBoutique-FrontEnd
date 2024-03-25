import React from 'react';

import { FiPhoneCall } from 'react-icons/fi';
import { MdOutlineMailOutline } from 'react-icons/md';
import { FaLocationDot } from 'react-icons/fa6';

export default function ContactUs() {
    return (
        <div className="max-w-[1230px] px-[30px] mx-auto">
            <div className="grid grid-cols-10 gap-5 p-8">
                <div
                    className="col-span-3 w-full bg-red-400 text-white font-bold text-xl text-center flex flex-col justify-start gap-3 rounded-xl py-4">
                    <p className="uppercase">Contact Information</p>
                    <p className="font-medium text-sm">
                        Say something to start live chat!
                    </p>
                    <div className="flex flex-col gap-8 mt-3">
                        <div className="flex items-center justify-center gap-3">
                            <FiPhoneCall />
                            <p className="col-span-2 mb-1 font-medium text-base text-left">
                                +84-342-454-133
                            </p>
                        </div>
                        <div className="flex items-center justify-center gap-3">
                            <MdOutlineMailOutline />
                            <p className="col-span-2 mb-1 font-medium text-base text-left">
                                BeautyBoutique@gmail.com
                            </p>
                        </div>
                        <div className="flex items-center justify-center gap-3">
                            <FaLocationDot />
                            <p className="col-span-2 mb-1 font-medium text-base text-left">
                                123 Vo Chi Cong
                            </p>
                        </div>
                    </div>
                </div>
                <form className="col-span-7 flex flex-col">
                    <div>
                        <h1 className="text-center uppercase font-bold text-slate-600 text-2xl">
                            contact us
                        </h1>
                        <p className="text-center font-semibold text-slate-500">
                            Any question or remakes? Just write us a message!
                        </p>
                    </div>
                    <div className="flex flex-col text-slate-500 font-medium gap-2 mt-4">
                        <label>Your name</label>
                        <input
                            type="text"
                            className="bg-slate-100 px-3 py-2 ring-1 focus:ring-slate-200 ring-offset-0 focus:outline-none rounded ring-slate-200 placeholder:font-normal"
                            placeholder="Enter your name here"
                        />
                    </div>
                    <div className="flex flex-col text-slate-500 font-medium gap-2 mt-4">
                        <label>Email</label>
                        <input
                            type="email"
                            placeholder="your-email@example.com"
                            className="bg-slate-100 px-3 py-2 ring-1 focus:ring-slate-200 ring-offset-0 focus:outline-none rounded ring-slate-200 placeholder:font-normal"
                        />
                    </div>
                    <div className="flex flex-col text-slate-500 font-medium gap-2 mt-4">
                        <label>Phone Number</label>
                        <input
                            type="text"
                            className="bg-slate-100 px-3 py-2 ring-1 focus:ring-slate-200 ring-offset-0 focus:outline-none rounded ring-slate-200 placeholder:font-normal"
                            placeholder="+84-***-***-***"
                        />
                    </div>
                    <div className="flex flex-col text-slate-500 font-medium gap-2 mt-4">
                        <label>Message</label>
                        <textarea
                            name="message"
                            id="message"
                            cols="30"
                            rows="10"
                            className="bg-slate-100 px-3 py-2 rounded ring-1 ring-slate-200 focus:ring-slate-200 focus:outline-none placeholder:font-normal"
                            placeholder="Enter your message here"
                        ></textarea>
                    </div>
                    <button
                        className="rounded bg-red-400 hover:opacity-90 text-white font-medium px-4 py-2 mt-4 self-end"
                        type="submit"
                    >
                        Send message
                    </button>
                </form>
            </div>
        </div>
    );
}

