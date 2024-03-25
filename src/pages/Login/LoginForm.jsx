import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as request from "../../services/login.js";
import bgLogin from "../../public/img/bg_login.jpg";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    try {
      e.preventDefault();
      await request.login(username, password);
      alert("Login successful");
      const user = await request.getUser();
      if (user.roleName === "ADMIN") navigate("/admin");
      else navigate("/");
    } catch (err) {
      alert(err.message);
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
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="remember-me"
                name="remember-me"
                className="w-4 h-4 accent-blue-400 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              />
              <label htmlFor="remember-me" className="text-sm text-gray-700">
                Keep me signed in
              </label>
            </div>
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
            className="bg-blue-400 text-white px-4 py-2 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 w-full"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
