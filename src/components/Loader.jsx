import React, { useState, useEffect } from 'react';
import loaderGif from '../assets/Loader/loader.gif'; // Import the loader.gif
import './Loader.css'; // Import the CSS file

const Loader = () => {
  const [loading, setLoading] = useState(true); // Track loading state

  useEffect(() => {
    const handlePageLoad = () => {
      setLoading(false); // Set loading to false when the page is fully loaded
    };

    // Listen for the window 'load' event to detect when the page has finished loading
    window.addEventListener('load', handlePageLoad);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('load', handlePageLoad);
    };
  }, []);

  // Render the loader only when loading is true
  return (
    loading && (
      <div className="loader-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <img src={loaderGif} alt="Loading..." className="loader-gif" style={{ width: '100px', height: '100px' }} />
      </div>
    )
  );
};

export default Loader;
