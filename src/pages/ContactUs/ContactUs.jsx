import React from 'react';

import { FiPhoneCall } from 'react-icons/fi';
import { MdOutlineMailOutline } from 'react-icons/md';
import { FaLocationDot } from 'react-icons/fa6';

export function ContactUs() {
  return (
    <div>
      <div>
        <h1 className="text-center uppercase font-bold text-slate-600 text-2xl">
          contact us
        </h1>
        <p className="text-center font-semibold text-slate-500">
          Any question or remakes? Just write us a message!
        </p>
      </div>
      <div className="grid grid-cols-3 gap-8 p-8">
        <div className="bg-[#5fadf7] text-white font-bold text-xl text-center flex gap-3 flex-col rounded-xl py-4">
          <p>Contact Infomation</p>
          <p className="font-medium text-sm">
            Say something to start live chat!
          </p>
          <div className="flex flex-col my-auto gap-8">
            <div className="grid grid-cols-3 ">
              <p className="mx-auto text-lg">
                <FiPhoneCall />
              </p>
              <p className="col-span-2 font-medium text-base text-left">
                +84-342-454-133
              </p>
            </div>
            <div className="grid grid-cols-3 ">
              <p className="mx-auto text-lg">
                <MdOutlineMailOutline />
              </p>
              <p className="col-span-2 font-medium text-base text-left">
                Email
              </p>
            </div>
            <div className="grid grid-cols-3 ">
              <p className="mx-auto text-lg">
                <FaLocationDot />
              </p>
              <p className="col-span-2 font-medium text-base text-left">
                123 Vo Chi Cong
              </p>
            </div>
          </div>
        </div>
        <form className=" flex flex-col col-span-2 w-3/4">
          <div className="flex flex-col text-slate-500 font-medium gap-2 mt-4">
            <label>Your name</label>
            <input
              type="text"
              className="bg-slate-100 p-1 ring-1 focus:ring-slate-200 ring-offset-0 focus:outline-none rounded ring-slate-200 placeholder:font-normal"
              placeholder="Enter your name here"
            />
          </div>
          <div className="flex flex-col text-slate-500 font-medium gap-2 mt-4">
            <label>Email</label>
            <input
              type="email"
              placeholder="your-email@example.com"
              className="bg-slate-100 p-1 ring-1 focus:ring-slate-200 ring-offset-0 focus:outline-none rounded ring-slate-200 placeholder:font-normal"
            />
          </div>
          <div className="flex flex-col text-slate-500 font-medium gap-2 mt-4">
            <label>Phone Number</label>
            <input
              type="text"
              className="bg-slate-100 p-1 ring-1 focus:ring-slate-200 ring-offset-0 focus:outline-none rounded ring-slate-200 placeholder:font-normal"
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
              className="bg-slate-100 p-2 rounded ring-1 ring-slate-200 focus:ring-slate-200 focus:outline-none placeholder:font-normal"
              placeholder="Enter your message here"
            ></textarea>
          </div>
          <button
            className="rounded bg-[#5fadf7] text-white font-medium px-4 py-2 mt-4 self-end"
            type="submit"
          >
            Send message
          </button>
        </form>
      </div>
    </div>
  );
}
