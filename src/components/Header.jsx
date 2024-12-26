import React, { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useNavigate } from 'react-router-dom';
import Subheader from '../components/Subheader';  // Import Subheader component

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubheaderOpen, setIsSubheaderOpen] = useState(false);  // State for subheader visibility
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleClothesClick = () => {
    if (isMobile) {
      setIsOpen(false); // Close the menu on mobile
      navigate('/cm'); // Redirect to /cm on mobile
    } else {
      setIsSubheaderOpen(!isSubheaderOpen); // Toggle subheader on desktop
    }
  };

  const handleNavigationClick = (path) => {
    if (isMobile) {
      setIsOpen(false); // Close the mobile menu after navigation
    }
    navigate(path); // Navigate to the provided path
  };

  const handleOutsideClick = (event) => {
    if (event.target.id === 'mobileMenu') {
      setIsOpen(false); // Close the menu when clicked outside
    }
  };

  return (
    <>
      <header className="bg-white shadow-md relative z-30">
        <div className="container mx-auto flex justify-between items-center py-4 px-6">
          <div className="text-2xl font-bold text-gray-800 font-serif">
            Clother
          </div>

          <div className="hidden md:flex justify-end flex-grow space-x-6 items-center">
            <nav className="flex space-x-6">
              <button onClick={() => handleNavigationClick('/')} className="text-gray-600 hover:text-gray-800">Home</button>
              <button onClick={() => handleNavigationClick('/about')} className="text-gray-600 hover:text-gray-800">About</button>
              <div className="relative flex items-center">
                <button
                  onClick={handleClothesClick}
                  className="text-gray-600 hover:text-gray-800 flex items-center"
                >
                  {/* New SVG Icon for right pointing (>) */}
                  <svg
                    className={`h-4 w-4 transform transition-transform duration-200 ${isSubheaderOpen ? 'rotate-90' : ''}`}  // Rotate when subheader is open
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                  Clothes
                </button>
              </div>
            </nav>
            <div className="ml-auto">
              <button onClick={() => handleNavigationClick('/contact')} className="border bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-600/10 hover:border-neutral-600 hover:text-neutral-600 transition duration-150">
                Contact
              </button>
            </div>
          </div>

          <div className="md:hidden">
            <button type="button" onClick={toggleMenu} className="text-gray-600 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-600">
              {isOpen ? (
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"/>
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>

      {isSubheaderOpen && (
        <div className="transition-all duration-300 ease-in-out">
          <Subheader />  {/* Render Subheader when open */}
        </div>
      )}

      {isOpen && (
        <div
          id="mobileMenu"
          onClick={handleOutsideClick}
          className="fixed inset-0 bg-black bg-opacity-50 z-20 flex justify-end pt-12"
        >
          <div className="bg-white w-2/5 h-full p-6 space-y-6 transform transition-transform duration-300 ease-in-out">
            {/* Vertical Menu Items */}
            <nav className="flex flex-col space-y-4">
              <button onClick={() => handleNavigationClick('/')} className="text-gray-800 hover:bg-gray-700 px-6 py-3 rounded-md text-base font-medium">Home</button>
              <button onClick={() => handleNavigationClick('/about')} className="text-gray-800 hover:bg-gray-700 px-6 py-3 rounded-md text-base font-medium">About</button>
              <button onClick={handleClothesClick} className="text-gray-800 hover:bg-gray-700 px-6 py-3 rounded-md text-base font-medium">Clothes</button>
              <button onClick={() => handleNavigationClick('/contact')} className="border border-blue-600 text-black px-6 py-3 rounded-md text-base font-medium hover:bg-blue-600/10">Contact</button>
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
