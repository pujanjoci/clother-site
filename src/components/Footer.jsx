import React from 'react';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();
  const handleNavigationClick = (path) => {
    navigate(`/${path}`);
  };

  return (
    <footer className="bg-gray-900 text-gray-300 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          {/* Brand and Description */}
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h1 className="text-2xl font-bold text-white">Clothify</h1>
            <p className="mt-2 text-gray-400">
              Discover the latest trends and timeless classics for your wardrobe. Shop with us and redefine your style.
            </p>
          </div>

          {/* Quick Links */}
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h2 className="text-lg font-semibold text-white">Quick Links</h2>
            <ul className="mt-2 space-y-2">
              <li>
                <button
                  onClick={() => handleNavigationClick('/shop')}
                  className="text-white px-4 rounded-md hover:underline hover:text-neutral-600 transition duration-150"
                >
                  Shop
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigationClick('/about')}
                  className="text-white px-4 rounded-md hover:underline hover:text-neutral-600 transition duration-150"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigationClick('/contact')}
                  className="ml-3 border bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-600/10 hover:border-neutral-600 hover:text-neutral-600 transition duration-150"
                >
                  Contact
                </button>
              </li>
              <li>
              <button onClick={() => handleNavigationClick('/faq')} 
              className="ml-3 border border-white text-white px-4 py-2 rounded-md hover:bg-neutral-200 hover:text-neutral-800 transition duration-150">
                FAQ
              </button>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="w-full md:w-1/3">
            <h2 className="text-lg font-semibold text-white">Follow Us</h2>
            <div className="flex mt-2 space-x-4">
              <button
                onClick={() => window.open('https://facebook.com', '_blank')}
                className="hover:text-white"
              >
                Facebook
              </button>
              <button
                onClick={() => window.open('https://instagram.com', '_blank')}
                className="hover:text-white"
              >
                Instagram
              </button>
              <button
                onClick={() => window.open('https://twitter.com', '_blank')}
                className="hover:text-white"
              >
                Twitter
              </button>
            </div>
          </div>
        </div>

        <hr className="border-gray-700 my-6" />

        {/* Copyright Section */}
        <div className="text-center">
          <p className="text-gray-500">
            &copy; {new Date().getFullYear()} Clothify. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
