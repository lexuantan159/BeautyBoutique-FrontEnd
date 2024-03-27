import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as request from "../../services/login.js";
import bgLogin from "../../public/img/bg_login.jpg";
import { toast } from "react-toastify";

function ResetPassword() {
    const [username, setUsername] = useState("");
    const [otp, setOtp] = useState("");
    const navigate = useNavigate();
    const [isProcessing, setIsProcessing] = useState(false);
    const [showAdditionalInput, setShowAdditionalInput] = useState(false);
    const [a, setA] = useState(null); // State để lưu trữ giá trị a

    async function handleSubmit(e) {
        e.preventDefault();
        let response;
        try {
            setIsProcessing(() => true);
            response = await request.otp(username);
        } catch (e) {
            toast.error(e.message);
        } finally {
            setIsProcessing(false);
        }
        setShowAdditionalInput(true);
        toast.success(`A mail have sent to ${username}'s email address`);
        setA(response.data); // Cập nhật giá trị của a
        console.log("gia tri a:", response.data); // Log giá trị phản hồi vào console
    }

    async function handleCheckotp(e) {
        e.preventDefault();
        var b = otp;
        if (a && a.toString() === b && b.toString()) {
            setIsProcessing(() => true);
            await request.reset(username);
            setIsProcessing(() => false);
            setTimeout(() => {
                toast.success("Đã gửi mật khẩu mới đến email của bạn");
                navigate("/login");
            }, 300);
        } else {
            toast.error("OTP không đúng");
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
                        <label
                            className="text-slate-500 text-md"
                            htmlFor="username"
                        >
                            Enter your user name
                        </label>
                        <input
                            className="rounded-md h-9 outline-none px-2 dark:bg-white border-[1px] border-slate-400 text-slate-500"
                            placeholder="e.g 012313"
                            type="text"
                            id="username"
                            name="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                        {isProcessing ? (
                            <button className="text-white bg-[#f77ebb] px-2 py-2 rounded-lg focus:outline-none flex justify-center">
                                <svg
                                    aria-hidden="true"
                                    className={`w-8 h-8 text-gray-200 animate-spin dark:text-white fill-slate-400`}
                                    viewBox="0 0 100 101"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                        fill="currentColor"
                                    />
                                    <path
                                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                        fill="currentFill"
                                    />
                                </svg>
                            </button>
                        ) : (
                            <button
                                className="text-white bg-[#f77ebb] px-2 py-2 rounded-lg focus:outline-none hover:translate-x-1 hover:-translate-y-1 duration-300 transition"
                                type="submit"
                            >
                                SEND OTP
                            </button>
                        )}
                    </div>
                </form>
            ) : (
                <form className="py-8 px-4 absolute top-[20%] left-[55%] w-1/3 h-2/4 bg-white rounded-lg">
                    <p className="text-center text-slate-500 text-xl">
                        Please check your email and enter the OPT you have
                        received
                    </p>
                    <div className="flex flex-col gap-3 mt-6">
                        <label
                            className="text-slate-500 text-md"
                            htmlFor="additionalInput"
                        >
                            OTP
                        </label>
                        <input
                            className="rounded-md h-9 outline-none px-2 dark:bg-white border-[1px] border-slate-400 text-slate-500"
                            type="text"
                            id="otp"
                            name="otp"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                        />
                        {isProcessing ? (
                            <button className="text-white bg-[#f77ebb] px-2 py-2 rounded-lg focus:outline-none flex justify-center">
                                <svg
                                    aria-hidden="true"
                                    className={`w-8 h-8 text-gray-200 animate-spin dark:text-white fill-slate-400`}
                                    viewBox="0 0 100 101"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                        fill="currentColor"
                                    />
                                    <path
                                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                        fill="currentFill"
                                    />
                                </svg>
                            </button>
                        ) : (
                            <button
                                className="text-white bg-[#f77ebb] px-2 py-2 rounded-lg focus:outline-none hover:translate-x-1 hover:-translate-y-1 duration-300 transition"
                                type="button"
                                onClick={handleCheckotp}
                            >
                                Xác nhận OTP
                            </button>
                        )}
                    </div>
                </form>
            )}
        </div>
    );
}

export default ResetPassword;
