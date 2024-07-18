"use client";
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginPage = () => {
  const router = useRouter();
  const [errorObj, setErrorObj] = useState({});
  const [formData, setFormData] = useState({
    username: '',
    currentUser: '',
    userPhone: '',
    userPass: '',
    conFirmPass: '',
  });
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
    validatePassword(formData.userPass);
  }, [formData.userPass]);

  const validatePassword = (password) => {
    setPasswordCriteria({
      length: password.length >= 8,
      lowercase: /[a-z]/.test(password),
      uppercase: /[A-Z]/.test(password),
      number: /[0-9]/.test(password),
      specialChar: /[!@#$%^&*()]/.test(password),
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setErrorObj((prevErrors) => ({ ...prevErrors, [name]: '' }));

    if (name === 'username') validateEmail(value);
    if (name === 'userPhone') validatePhone(value);
    if (name === 'conFirmPass') validateConfirmPassword(value);
  };

  const validateEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email)) {
      setErrorObj((prev) => ({ ...prev, username: 'Please Enter Valid email' }));
    }
  };

  const validatePhone = (phone) => {
    const phonePattern = /^\d{1,10}$/;
    if (!phonePattern.test(phone)) {
      setErrorObj((prev) => ({ ...prev, userPhone: 'Please Enter Valid Phone' }));
    }
  };

  const validateConfirmPassword = (confirmPassword) => {
    if (formData.userPass !== confirmPassword) {
      setErrorObj((prev) => ({ ...prev, conFirmPass: 'Password is not matching' }));
    }
  };

  const userSignUp = (e) => {
    e.preventDefault();
    let isValid = true;
    let errors = {};

    Object.keys(formData).forEach((key) => {
      if (!formData[key]) {
        errors[key] = 'This field is required';
        isValid = false;
      }
    });
    const phonePattern = /^\d{1,10}$/;
    if (!phonePattern.test(formData.userPhone)) {
      errors.userPhone = 'Please Enter Valid Phone';
      isValid = false
    }
    if ( formData.userPhone.length < 10){
      errors.userPhone = 'Phone number must be 10 digits';
      isValid = false;
     }
    if (!errors.username && !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.username)) {
      errors.username = 'Please Enter Valid email';
      isValid = false;
    }

    if (formData.userPass && formData.userPass !== formData.conFirmPass) {
      errors.conFirmPass = 'Password is not matching';
      isValid = false;
    }

    setErrorObj(errors);
    if (isValid) {
      setUserDataIntoLocal();
    }
  };

  const setUserDataIntoLocal = () => {
    let oldUsers = localStorage.getItem('usersList');
    oldUsers = oldUsers ? JSON.parse(oldUsers) : [];
    if (!checkIsUserRegister(oldUsers)) {
      let usersList = [...oldUsers, formData];
      localStorage.setItem('usersList', JSON.stringify(usersList));
      toast.success('User Registred successfully')
      setErrorObj({})
      setFormData({ username: '',
        currentUser: '',
        userPhone: '',
        userPass: '',
        conFirmPass: '',})
      // router.push('/')
    }
  };

  const checkIsUserRegister = (users) => {
    const userExists = users.some((user) => user.username === formData.username);
    if (userExists) {
      setErrorObj({ username: 'User is already registered with this Email' });
    }
    return userExists;
  };

  return (
    <div className="login-container flex min-h-screen justify-center items-center px-4 ">
       <ToastContainer theme="colored" />
      <div className="login-form bg-white shadow-md rounded-lg p-5 max-w-md w-full flex flex-col border-gray-400">
        <h4 className="text-2xl font-bold text-center text-black">Sign Up</h4>
        <p className="text-gray-500 text-center mb-5">Enter your Registration details below</p>
        <form className="flex flex-col space-y-2" onSubmit={userSignUp}>
          <label htmlFor="currentUser" className="text-sm font-medium text-black">
            Name
          </label>
          <input
            type="text"
            id="currentUser"
            name="currentUser"
            value={formData.currentUser}
            placeholder="Name"
            className={`rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black ${errorObj.currentUser ? 'border-red-400' : ''}`}
            onChange={handleInputChange}
          />
          {errorObj.currentUser && (
            <span className="text-red-500 text-sm mt-1">
              <small>{errorObj.currentUser}</small>
            </span>
          )}

          <label htmlFor="username" className="text-sm font-medium text-black">
            Email
          </label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Email"
            className={`rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black ${errorObj.username ? 'border-red-400' : ''}`}
            value={formData.username}
            onChange={handleInputChange}
          />
          {errorObj.username && (
            <span className="text-red-500 text-sm mt-1">
              <small>{errorObj.username}</small>
            </span>
          )}

          <label htmlFor="userPhone" className="text-sm font-medium text-black">
            Phone
          </label>
          <input
            type="text"
            id="userPhone"
            name="userPhone"
            placeholder="Phone"
            className={`rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black ${errorObj.userPhone ? 'border-red-400' : ''}`}
            value={formData.userPhone}
            onChange={handleInputChange}
            maxLength={10}
          />
          {errorObj.userPhone && (
            <span className="text-red-500 text-sm mt-1">
              <small>{errorObj.userPhone}</small>
            </span>
          )}

          <label htmlFor="userPass" className="text-sm font-medium text-black">
            Password
          </label>
          <input
            type="password"
            id="userPass"
            name="userPass"
            placeholder="Password"
            className={`rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black ${errorObj.userPass ? 'border-red-400' : ''}`}
            value={formData.userPass}
            onChange={handleInputChange}
          />
          {errorObj.userPass && !formData.userPass && (
            <span className="text-red-500 text-sm">
              <small>{errorObj.userPass}</small>
            </span>
          )}
          {formData.userPass && (
            <div className="text-gray-500 text-sm mt-2">
              <p className={passwordCriteria.length ? 'text-green-500' : 'text-red-500'}>&#x2714; At least 8 characters</p>
              <p className={passwordCriteria.lowercase ? 'text-green-500' : 'text-red-500'}>&#x2714; Lowercase letter</p>
              <p className={passwordCriteria.uppercase ? 'text-green-500' : 'text-red-500'}>&#x2714; Uppercase letter</p>
              <p className={passwordCriteria.number ? 'text-green-500' : 'text-red-500'}>&#x2714; Number</p>
              <p className={passwordCriteria.specialChar ? 'text-green-500' : 'text-red-500'}>&#x2714; Special character</p>
            </div>
          )}

          <label htmlFor="conFirmPass" className="text-sm font-medium text-black">
            Confirm Password
          </label>
          <input
            type="password"
            id="conFirmPass"
            name="conFirmPass"
            placeholder="Confirm Password"
            className={`rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black ${ formData.userPass && errorObj.conFirmPass ? 'border-red-400' : ''}`}
            value={formData.conFirmPass}
            onChange={handleInputChange}
          />
          {formData.userPass &&  errorObj.conFirmPass && (
            <span className="text-red-500 text-sm mt-2">
              <small>{errorObj.conFirmPass}</small>
            </span>
          )}

          <button type="submit" className="bg-indigo-600 text-white rounded-md p-2 hover:bg-indigo-700">
            Sign up
          </button>
        </form>

        <div className="flex items-center justify-center mt-6">
          <p className="text-gray-500 text-sm mr-2">If already have account</p>
          <p onClick={() => router.push('/')} className="text-indigo-600 hover:underline cursor-pointer">
            Sign In
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
