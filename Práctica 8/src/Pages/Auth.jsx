import { API_AUTH } from '../services/constants.js';

import { redirect, useNavigate } from 'react-router';
import { verify } from '../services/auth.js';

import { useState } from 'react';

export async function loader() {
  const user = await verify();
  if (user) {
    console.log('User logged in', user);
    return redirect('/');
  }
  return null;
}

function Login() {

  const navigate = useNavigate();

  const [register, setRegister] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [disabled, setDisabled] = useState(false);

  const [isVisible, setIsVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [messageStatus, setMessageStatus] = useState(false);

  const showAlert = (message, status) => {
    setMessage(message);
    setMessageStatus(status);
    setIsVisible(true);
    setTimeout(() => {
      setIsVisible(false);
    }, 3000); // 3 seconds
  };


  const handleSubmit = async (e) => {
    setDisabled(true);
    e.preventDefault();
    const response = await fetch(`${API_AUTH}/${register ? 'register' : 'login'}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });
    if(register) {
      if (response.status === 201) {
        const data = await response.json();
        setRegister(false);
        setUsername('');
        setPassword('');
        showAlert('User created successfully', true);
      } else {
        const error = await response.json();
        showAlert(error.error, false);
      }

    } else {
      if (response.status === 200) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
        navigate('/');
      } else {
        const error = await response.json();
        showAlert(error.error, false);
      }
    }
    setDisabled(false);
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 h-screen">
      <div className="w-full sm:max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md h-full sm:h-auto">
        <h1 className='text-4xl font-bold text-center text-lime-600'>Tasks</h1>
        <h2 className="text-2xl font-bold text-center text-gray-800">{ register ? 'Register' : 'Login'}</h2>
        <p className={` ${!messageStatus ? 'bg-red-800' : 'bg-lime-600'} text-white p-2 rounded-lg text-center ${isVisible ? 'block' : 'hidden'} `}> {message} </p>
        <form className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="username"
              id="username"
              className="w-full px-4 py-2 mt-1 text-gray-900 bg-gray-100 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 mt-1 text-gray-900 bg-gray-100 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            onClick={handleSubmit}
            className={`w-full px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={disabled}
          >
            {register ? 'Register' : 'Login'}
          </button>
        </form>
        <p className="text-sm text-center text-gray-600">
          {register ? 'Already have an account? ' : 'Don\'t have an account? '}
          <button onClick={() => setRegister(!register)} className="text-blue-500 hover:underline">
            {register ? 'Login' : 'Register'}
          </button>
        </p>
      </div>
    </div>
  );
}

export default Login
