import React, { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from 'react-router-dom';
import { useLoginUserMutation } from '../../redux/service/user';
import './login.css';

const LoginForm = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loginUser, { isLoading }] = useLoginUserMutation();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const data = await loginUser({ username, password }).unwrap();
      console.log(data);
      if (data.message === "Login successfull") {
        localStorage.setItem('userName', username);
        navigate('/dashboard');
      } else {
        setError('Login failed, please try again.');
      }
    } catch (error) {
      setError(error.data ? error.data.message : error.message);
    }
  };

  return (
    <section className='relative flex items-center justify-evenly w-full h-full bg-gradient-to-r from-green-400 via-sky-500 to-sky-900 animate-gradient-xxl'>

      <div className='login w-[17rem] h-[21rem] rounded-tr-3xl rounded-bl-3xl shadow-2xl p-8 flex flex-col gap-y-4 mt-6 bg-white'>
        <form onSubmit={handleSubmit} className="space-y-4 w-full flex flex-col justify-center">
          <h2 className="font-bold text-center text-lg">Login</h2>
          {error && <p className="text-red-500 text-center">{error}</p>}
          <div>
            <label className="block text-black mb-1">Username</label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-black mb-1">Password</label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
            </div>
          </div>
          <button
            className="w-full bg-blue-500 py-2 rounded-md hover:bg-blue-600 transition duration-300"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </section>
  );
}

export default LoginForm;
