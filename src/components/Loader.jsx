import React from 'react';
import './Loader.css'; // Import the CSS file

const Loader = () => {
  return (
    <div className="loader-container">
      <div className="pulse-dot dot-1"></div>
      <div className="pulse-dot dot-2"></div>
      <div className="pulse-dot dot-3"></div>
    </div>
  );
}

export default Loader;
