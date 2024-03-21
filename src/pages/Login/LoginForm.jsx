import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as request from '../../services/login.js';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  async function handleSubmit(e) {
    try {
      e.preventDefault();
      const data = await request.login(username, password);
      alert(
        'Login successful',
        setTimeout(() => {
          navigate('/');
        }, 300)
      );
    } catch (err) {
      alert(err.message);
    } finally {
    }
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-12 px-4 bg-gray-100">
      <div className="bg-white shadow-md rounded-lg px-8 pb-8 w-full max-w-md">
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
              onChange={e => {
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
              onChange={e => {
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
            <Link to="/" className="text-sm text-blue-400 hover:underline">
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

export default LoginForm;
