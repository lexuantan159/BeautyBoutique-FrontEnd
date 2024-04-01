import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as request from "../../services/login.js";
import bgLogin from "../../public/img/bg_login.jpg";
import { toast } from "react-toastify";

function LoginForm() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    async function handleSubmit(e) {
        try {
            e.preventDefault();
            await request.login(username, password);
            toast("Login successful");
            const user = await request.getUser();
            console.log(user);
            if (user?.role?.roleName === "ADMIN") {
                setTimeout(navigate("/admin/product"), 600);
                console.log("user la admin");
            } else {
                setTimeout(navigate("/"), 600);
                console.log("user la user");
            }
        } catch (err) {
            toast.error(err.message);
        }
    }

    return (
        <div className="max-w-screen h-screen ">
            <img
                src={bgLogin}
                alt="...."
                className="relative object-cover h-full w-full"
            />
            <div className="bg-white opacity-90 shadow-md rounded-lg px-8 pb-8 w-full max-w-md absolute top-[20%] right-[8%] ">
                <h1 className="text-2xl font-bold text-center py-4 text-gray-500">
                    Sign in
                </h1>
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="flex flex-col">
                        <label
                            htmlFor="email"
                            className="text-sm font-medium text-gray-500 mb-2"
                        >
                            User name
                        </label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            className="rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 w-full dark:bg-white dark:text-slate-600"
                            onChange={(e) => {
                                setUsername(() => e.target.value);
                            }}
                        />
                    </div>
                    <div className="flex flex-col">
                        <label
                            htmlFor="password"
                            className="text-sm font-medium text-gray-500 mb-2"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 w-full  dark:bg-white dark:text-slate-600"
                            onChange={(e) => {
                                setPassword(() => e.target.value);
                            }}
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <Link
                            to="/forget"
                            className="text-sm text-blue-400 hover:underline"
                        >
                            Forget password?
                        </Link>
                        <Link
                            to="/register"
                            className="text-sm text-blue-400 hover:underline"
                        >
                            Register
                        </Link>
                    </div>
                    <button
                        type="submit"
                        className="bg-[#f77ebb] text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 w-full"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}

export default LoginForm;
