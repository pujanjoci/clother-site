import React, { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';

import Footer from '../components/Footer';

export default function BasicForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [remainingTime, setRemainingTime] = useState(0);

  // Array to track active toast IDs
  const toastQueue = [];

  useEffect(() => {
    const lockStartTime = localStorage.getItem('lockStartTime');
    const lockDuration = parseInt(localStorage.getItem('lockDuration'), 10) || 5 * 60 * 1000; // 5 minutes in milliseconds

    if (lockStartTime) {
      const now = new Date().getTime();
      const initialTime = parseInt(lockStartTime, 10);
      const timeElapsed = now - initialTime;
      const timeLeft = lockDuration - timeElapsed;

      if (timeLeft > 0) {
        setIsButtonDisabled(true);
        setRemainingTime(Math.ceil(timeLeft / 1000)); // Convert milliseconds to seconds
        const intervalId = setInterval(() => {
          setRemainingTime(prev => {
            if (prev <= 1) {
              clearInterval(intervalId);
              setIsButtonDisabled(false);
              localStorage.removeItem('lockStartTime');
              localStorage.removeItem('lockDuration');
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      } else {
        localStorage.removeItem('lockStartTime'); // Clear expired lockStartTime
        localStorage.removeItem('lockDuration'); // Clear expired lockDuration
      }
    }
  }, []);

  const validateForm = () => {
    if (!name && !email && !message) {
      setError('Please fill out at least one field before submitting.');
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && !emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      return false;
    }
    setError('');
    return true;
  };

  const showToast = (type, message) => {
    if (toastQueue.length >= 2) {
      // Remove the oldest toast when more than 5 toasts exist
      const oldestToastId = toastQueue.shift();
      toast.dismiss(oldestToastId);
    }

    // Add a new toast and store its ID
    const newToastId = type === 'error' ? toast.error(message) : toast.success(message);
    toastQueue.push(newToastId);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      showToast('error', 'Please fill out at least one field before submitting.');
      return;
    }

    fetch("https://formcarry.com/s/UzU-ZNYAmuk", {
      method: 'POST',
      headers: { 
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, email, message })
    })
    .then(response => response.json())
    .then(response => {
      if (response.code === 200) {
        showToast('success', "We received your submission, thank you!");
        setIsButtonDisabled(true);
        const now = new Date().getTime();
        let lockDuration = 5 * 60 * 1000; // 5 minutes in milliseconds
        const previousLockDuration = parseInt(localStorage.getItem('lockDuration'), 10);
        if (previousLockDuration) {
          lockDuration = previousLockDuration + 1 * 60 * 1000; // Increase by 1 minute
        }
        localStorage.setItem('lockStartTime', now.toString());
        localStorage.setItem('lockDuration', lockDuration.toString()); // Store updated lock duration
        setRemainingTime(lockDuration / 1000); // Set remaining time in seconds

        const intervalId = setInterval(() => {
          setRemainingTime(prev => {
            if (prev <= 1) {
              clearInterval(intervalId);
              setIsButtonDisabled(false);
              localStorage.removeItem('lockStartTime');
              localStorage.removeItem('lockDuration');
              return 0;
            }
            return prev - 1;
          });
        }, 1000);

        setName('');
        setEmail('');
        setMessage('');
        setError('');
      } else {
        setError(response.message);
        showToast('error', response.message);
      }
    })
    .catch(err => {
      setError(err.message || 'An error occurred');
      showToast('error', err.message || 'An error occurred');
    });
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div>
      <div className='h-[35rem]'>
      <Toaster />
      <form onSubmit={onSubmit} className="max-w-lg mx-auto mt-20 p-8 bg-white shadow-md rounded">
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Full Name</label>
          <input 
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your first and last name"
            className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isButtonDisabled}
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Your Email Address</label>
          <input 
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="john@doe.com"
            className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isButtonDisabled}
          />
        </div>
        
        <div className="mb-6">
          <label htmlFor="message" className="block text-gray-700 font-bold mb-2">Your Message</label>
          <textarea 
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter your message..."
            className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isButtonDisabled}
          ></textarea>
        </div>

        {error && (
          <div className="mb-4 text-red-600">
            {error}
          </div>
        )}
        
        <div>
          <button 
            type="submit"
            className={`w-full p-3 text-white font-bold rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              isButtonDisabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
            }`}
            disabled={isButtonDisabled}
          >
            {isButtonDisabled ? `Please wait ${formatTime(remainingTime)}` : 'Send'}
          </button>
        </div>
      </form>
      </div>
      <Footer />
    </div>
  );
}
