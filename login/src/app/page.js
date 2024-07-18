"use client";
import { Joti_One } from 'next/font/google';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginPage = () => {
  const router = useRouter();
  const [errorObj, setErrorObj] = useState({});
  const [username, setUserName] = useState('');
  const [userPass, setUserPass] = useState('');
  const [showPass, setShowPass] = useState('password');
  const [passwordCriteria, setPasswordCriteria] = useState({
    length: false,
    lowercase: false,
    uppercase: false,
    number: false,
    specialChar: false,
  });
  useEffect(() => {
    const token = localStorage.getItem('UserData');
    if (token) {
        router.push('/star-wars'); 
    }
}, []);

  const handlePasswordChange = (e) => {
    const { value } = e.target;
    setUserPass(value);
    // validatePassword(value);
    if (value) {
      setErrorObj((prev) => ({ ...prev, pass: '' }));
    }
  };

  const handleEmailChange = (e) => {
    const { value } = e.target;
    setUserName(value);
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (emailPattern.test(value)) {
      setErrorObj((prev) => ({ ...prev, name: '' }));
    } else {
      setErrorObj((prev) => ({ ...prev, name: 'Please Enter Valid email' }));
    }
  };

  const loginUser = (event) => {
    event.preventDefault();
    let errors = {};
    if (!username) {
      errors.name = 'This field is required';
    } else {
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailPattern.test(username)) {
        errors.name = 'Please Enter Valid email';
      }
    }

    if (!userPass) {
      errors.pass = 'This field is required';
    }

    setErrorObj(errors);

    if (Object.keys(errors).length > 0) {
      return;
    }

    const usersList = JSON.parse(localStorage.getItem('usersList')) || [];
    const user = usersList.find(
      (user) => user.username === username && user.userPass === userPass
    );
    
    if (!user) {
      toast.error('Invalid email or password')
      return;
    }

    localStorage.setItem('UserData', JSON.stringify(user));
    router.push('/star-wars');
  };

  return (
    <div className="login-container flex min-h-screen justify-center items-center px-4">
      <ToastContainer theme="colored" />
      <div className="login-form bg-white shadow-md rounded-lg p-8 max-w-md w-full flex flex-col">
        
          <h5 className="text-2xl font-bold text-center text-black">Sign in </h5>
      
        <p className="text-gray-500 text-center mb-5">Enter your details below</p>
        <form className="flex flex-col gap-4" onSubmit={loginUser}>
          <div className='flex flex-col'>
            <label htmlFor="login" className="text-sm font-medium text-black mb-2">
              Email
            </label>
            <input
              type="text"
              id="login"
              name="login"
              placeholder="Email"
              className={`rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black ${errorObj.name ? 'border-2 border-red-500' : ''}`}
              value={username}
              onChange={handleEmailChange}
            />
            {errorObj.name && (
              <span className="text-red-500 text-sm"><small>{errorObj.name}</small></span>
            )}
          </div>
          <div className='flex flex-col'>
            <label htmlFor="password" className="text-sm font-medium text-black">
              Password
            </label>
            <div className='grid grid-rows-1 grid-flow-col gap-4'>
              <input
                type={showPass}
                id="password"
                name="password"
                placeholder="Password"
                className={`rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black ${errorObj.pass ? 'border-2 border-red-500' : ''}`}
                value={userPass}
                onChange={handlePasswordChange}
              />
            </div>
            {errorObj.pass && (
              <span className="text-red-500 text-sm"><small>{errorObj.pass}</small></span>
            )}
          </div>
          {errorObj.login && (
            <span className="text-red-500 text-sm text-center"><small>{errorObj.login}</small></span>
          )}
          <button type="submit" className="bg-indigo-600 text-white rounded-md p-2 hover:bg-indigo-700">
            Login
          </button>
        </form>
        <div className="flex items-center justify-center mt-6">
          <p className="text-gray-500 text-sm mr-2">Don't have an account?</p>
          <p onClick={() => router.push('/signup')} className="text-indigo-600 hover:underline cursor-pointer">
            Sign Up
          </p>
        </div>
        <p className="text-gray-500 text-center text-sm mt-4">
          By continuing, you agree to our Privacy Policy and terms of use
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
