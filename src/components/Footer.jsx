import React from 'react';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();

  const handleNavigationClick = (path) => {
    navigate(`/${path}`);
  };

  return (
    <footer className="bg-neutral-50 text-neutral-600 py-8 border-t border-black">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          {/* Brand and Description */}
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
          <h1 className="text-4xl md:text-2xl font-bold text-center md:text-left text-neutral-600 font-tomatoes">Clother</h1>
            <p className="md:text-lg text-xl mt-2 text-neutral-600 text-center md:text-left md:mr-10 font-sans italic">
              Discover the latest trends and timeless classics for your wardrobe. Shop with us and redefine your style.
            </p>
          </div>

          {/* Quick Links - Now horizontal */}
          <div className="w-full md:w-1/3 mb-4 md:mb-0">
            <h2 className="text-xl md:text-lg font-semibold text-center md:text-left text-neutral-600 font-tomatoes">Quick Links</h2>
            <div className="mt-2 flex space-x-4"> {/* Changed to flex and space-x-4 for horizontal alignment */}
              <button
                onClick={() => handleNavigationClick('shop')}
                className="border border-neutral-600 text-neutral-600 px-4 rounded-md hover:bg-emerald-600 hover:text-neutral-50 transition duration-150"
              >
                Shop
              </button>
              <button
                onClick={() => handleNavigationClick('about')}
                className="border border-neutral-600 text-neutral-600 px-4 rounded-md hover:bg-slate-600 hover:text-neutral-50 transition duration-150"
              >
                About Us
              </button>
              <button
                onClick={() => handleNavigationClick('contact')}
                className="ml-3 border border-neutral-500 text-neutral-600 px-4 py-2 rounded-md hover:bg-blue-600 hover:border-blue-500 hover:text-neutral-50 transition duration-150"
              >
                Contact
              </button>
              <button
                onClick={() => handleNavigationClick('faq')}
                className="ml-3 border border-neutral-600 text-neutral-600 px-4 py-2 rounded-md hover:bg-neutral-800 hover:text-neutral-50 transition duration-150"
              >
                FAQ
              </button>
            </div>
          </div>

          {/* Social Media */}
          <div className="w-full md:w-1/3">
            <h2 className="text-2xl md:text-lg font-semibold text-neutral-600 font-tomatoes">Follow Us</h2>
            <div className="flex mt-2 space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-neutral-600"
              >
                Facebook
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-neutral-600"
              >
                Instagram
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-neutral-600"
              >
                Twitter
              </a>
            </div>
          </div>
        </div>

        <hr className="border-neutral-600 my-6" />

        {/* Copyright Section */}
        <div className="text-center">
          <p className="text-neutral-600 font-tomatoes">
            &copy;2024 - {new Date().getFullYear()} Clother. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
