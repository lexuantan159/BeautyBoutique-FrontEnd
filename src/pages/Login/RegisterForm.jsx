import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as request from '../../services/login.js';

function RegisterForm() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPasword, setConfirmPassword] = useState('');
  const navigate = useNavigate();
  async function handleSubmit(e) {
    try {
      e.preventDefault();
      // check if any fields is omitted
      if (!(username && password && email)) {
        alert('Please provide enough information');
        return;
      }
      // check if the password and confirm password is the samne
      if (password !== confirmPasword) {
        alert('Your current password did not match confirm password');
        setPassword(() => '');
        setConfirmPassword(() => '');
        return;
      }
      const dataForm = { username, email, password, retype_password: password };
      try {
        const data = await request.register(dataForm);
        alert('Register Success');
        console.log(dataForm);
        // navigate('/login');
      } catch (e) {
        console.log(e);
      }

      // console.log(username, password);
    } catch (err) {
      alert(err.message);
    } finally {
    }
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-12 px-4 bg-gray-100">
      <div className="bg-white shadow-md rounded-lg px-8 pb-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center py-4 text-gray-500">
          Sign up
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
              onChange={e => {
                setUsername(() => e.target.value);
              }}
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-500 mb-2"
            >
              Email address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 w-full dark:bg-white dark:text-slate-600"
              onChange={e => {
                setEmail(() => e.target.value);
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
              value={password}
              className="rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 w-full  dark:bg-white dark:text-slate-600"
              onChange={e => {
                setPassword(() => e.target.value);
              }}
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-500 mb-2"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPasword}
              className="rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 w-full  dark:bg-white dark:text-slate-600"
              onChange={e => {
                setConfirmPassword(() => e.target.value);
              }}
            />
          </div>
          <div className="flex items-center justify-between">
            <Link to="/login" className="text-sm text-blue-400 hover:underline">
              Already a member?
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

export default RegisterForm;
