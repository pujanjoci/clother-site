import React, { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useNavigate } from 'react-router-dom';
import Subheader from './Subheader'; // Import the Subheader component
import SubheaderMobile from './SubheaderMobile'; // Import the SubheaderMobile component

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showSubheader, setShowSubheader] = useState(false);
  const [showSubheaderMobile, setShowSubheaderMobile] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleClothesClick = () => {
    if (isMobile) {
      setShowSubheaderMobile(!showSubheaderMobile); // Toggle SubheaderMobile component on mobile
    } else {
      setShowSubheader(!showSubheader); // Toggle Subheader component on desktop
    }
  };

  return (
    <>
      <header className="bg-white shadow-md relative z-10">
        <div className="container mx-auto flex justify-between items-center py-4 px-6">
          <div className="text-2xl font-bold text-gray-800 font-serif">
            Clother
          </div>

          <div className="hidden md:flex justify-end flex-grow space-x-6 items-center">
            <nav className="flex space-x-6">
              {/* Use navigate to redirect */}
              <button
                onClick={() => navigate('/')}
                className="text-gray-600 hover:text-gray-800"
              >
                Home
              </button>
              <button
                onClick={() => navigate('/about')}
                className="text-gray-600 hover:text-gray-800"
              >
                About
              </button>
              <div className="relative">
                <button
                  onClick={handleClothesClick}
                  className="text-gray-600 hover:text-gray-800 flex items-center"
                >
                  Clothes
                  <svg
                    className={`ml-1 h-4 w-4 transform ${
                      showSubheader ? 'rotate-180' : 'rotate-0'
                    } transition-transform duration-200`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
              </div>
            </nav>
            <div className="ml-auto">
              <button
                onClick={() => navigate('/contact')}
                className="border bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-600/10 hover:border-neutral-600 hover:text-neutral-600 transition duration-150"
              >
                Contact
              </button>
              <button
                onClick={() => navigate('/faq')}
                className="border border-neutral-600 text-neutral-500 px-4 py-2 rounded-md hover:bg-neutral-700 hover:text-white ml-2 transition duration-150"
              >
                FAQ
              </button>
            </div>
          </div>

          <div className="md:hidden justify-self-end">
            <button
              type="button"
              onClick={toggleMenu}
              className="text-gray-600 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-600"
            >
              {isOpen ? (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden absolute z-10">
            <nav className="px-2 pt-2 pb-4 space-y-1 sm:px-3 text-center">
              <button
                onClick={() => navigate('/')}
                className="block text-gray-600 hover:bg-gray-200 px-3 py-2 rounded-md text-base font-medium"
              >
                Home
              </button>
              <button
                onClick={() => navigate('/about')}
                className="block text-gray-600 hover:bg-gray-200 px-3 py-2 rounded-md text-base font-medium"
              >
                About
              </button>
              <button
                onClick={handleClothesClick}
                className="block text-gray-600 hover:bg-gray-200 px-3 py-2 rounded-md text-base font-medium cursor-pointer"
              >
                Clothes
              </button>
              <button
                onClick={() => navigate('/contact')}
                className="block border bg-blue-600 text-white px-3 py-2 rounded-md text-base font-medium hover:bg-blue-600/10 hover:border-neutral-500 hover:text-neutral-600"
              >
                Contact
              </button>
              <button
                onClick={() => navigate('/faq')}
                className="block border border-neutral-600 text-neutral-600 px-3 py-2 rounded-md text-base font-medium hover:bg-neutral-600 hover:text-white"
              >
                FAQ
              </button>
            </nav>
          </div>
        )}
      </header>

      {!isMobile && showSubheader && <Subheader />}
      {isMobile && showSubheaderMobile && <SubheaderMobile />}
    </>
  );
};

export default Header;
