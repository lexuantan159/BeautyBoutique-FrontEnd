import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as request from '../../services/login.js';
import bgLogin from '../../public/img/bg_login.jpg';
import { Button } from 'flowbite-react';

function ResetPassword() {
  const [username, setUsername] = useState('');
  const [otp, setOtp] = useState('');
  const navigate = useNavigate();
  const [showAdditionalInput, setShowAdditionalInput] = useState(false);
  const [a, setA] = useState(null); // State để lưu trữ giá trị a

  async function handleSubmit(e) {
    e.preventDefault();
    const response = await request.otp(username);
    setShowAdditionalInput(true);
    alert(`Một liên kết đặt lại mật khẩu đã được gửi đến ${username}`);
    setA(response.data); // Cập nhật giá trị của a
    console.log('gia tri a:', response.data); // Log giá trị phản hồi vào console
  }

  async function handleCheckotp(e) {
    e.preventDefault();
    var b = otp;
    console.log('gia tri a2:', a);
    console.log('gia tri b:', b);
    if (a && a.toString() === b && b.toString()) {
      await request.reset(username);
      alert('Đã gửi mật khẩu mới đến email của bạn');
    } else {
      alert('OTP không đúng');
    }
  }

  return (
    <div className="max-w-screen h-screen ">
      <img
        src={bgLogin}
        alt="congtua"
        className="relative object-cover h-full w-full"
      />
      {!showAdditionalInput ? (
        <form
          className="py-8 px-4 absolute top-[20%] left-[55%] w-1/3 h-2/4 bg-white rounded-lg"
          onSubmit={handleSubmit}
        >
          <p className="text-center uppercase text-slate-500 text-2xl">
            Authentication
          </p>
          <div className="flex flex-col gap-3 mt-6">
            <label className="text-slate-500 text-md" htmlFor="username">
              Enter your user name
            </label>
            <input
              className="rounded-md h-9 outline-none px-2 dark:bg-white border-[1px] border-slate-400 text-slate-500"
              placeholder="e.g 012313"
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
            />
            <button
              className="text-white bg-[#f77ebb] px-2 py-2 rounded-lg focus:outline-none hover:translate-x-1 hover:-translate-y-1 duration-300 transition"
              type="submit"
            >
              SEND OTP
            </button>
          </div>
        </form>
      ) : (
        <form className="py-8 px-4 absolute top-[20%] left-[55%] w-1/3 h-2/4 bg-white rounded-lg">
          <p className="text-center text-slate-500 text-xl">
            Please check your email and enter the OPT you have received
          </p>
          <div className="flex flex-col gap-3 mt-6">
            <label className="text-slate-500 text-md" htmlFor="additionalInput">
              OTP
            </label>
            <input
              className="rounded-md h-9 outline-none px-2 dark:bg-white border-[1px] border-slate-400 text-slate-500"
              type="text"
              id="otp"
              name="otp"
              value={otp}
              onChange={e => setOtp(e.target.value)}
            />
            <button
              className="text-white bg-[#f77ebb] px-2 py-2 rounded-lg focus:outline-none hover:translate-x-1 hover:-translate-y-1 duration-300 transition"
              type="button"
              onClick={handleCheckotp}
            >
              Xác nhận OTP
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default ResetPassword;
