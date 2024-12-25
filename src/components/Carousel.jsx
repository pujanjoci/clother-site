import React, { useState, useEffect, useRef } from 'react';

const banners = [
  'https://via.placeholder.com/1920x1080?text=Banner+1',
  'https://via.placeholder.com/1920x1080?text=Banner+2',
  'https://via.placeholder.com/1920x1080?text=Banner+3',
  'https://via.placeholder.com/1920x1080?text=Banner+4',
  'https://via.placeholder.com/1920x1080?text=Banner+5',
];

const BannerCarousel = () => {
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const carouselRef = useRef(null);

  // Automatically cycle banners every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBannerIndex((prevIndex) => (prevIndex + 1) % banners.length);
    }, 5000);

    return () => clearInterval(interval); // Cleanup the interval on unmount
  }, []);

  const goToBanner = (index) => {
    setCurrentBannerIndex(index);
  };

  const nextBanner = () => {
    setCurrentBannerIndex((prevIndex) => (prevIndex + 1) % banners.length);
  };

  const prevBanner = () => {
    setCurrentBannerIndex((prevIndex) => (prevIndex - 1 + banners.length) % banners.length);
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.clientX);
    if (carouselRef.current) {
      carouselRef.current.style.cursor = 'grabbing'; // Cursor changes to grabbing
    }
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;

    const diff = e.clientX - startX;
    if (diff > 50) {
      prevBanner();
      setIsDragging(false);
      resetCursor();
    } else if (diff < -50) {
      nextBanner();
      setIsDragging(false);
      resetCursor();
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    resetCursor();
  };

  const resetCursor = () => {
    if (carouselRef.current) {
      carouselRef.current.style.cursor = 'grab'; // Reset to open hand
    }
  };

  // Touch event handlers
  const handleTouchStart = (e) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
    if (carouselRef.current) {
      carouselRef.current.style.cursor = 'grabbing'; // Cursor changes to grabbing
    }
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;

    const diff = e.touches[0].clientX - startX;
    if (diff > 50) {
      prevBanner();
      setIsDragging(false);
      resetCursor();
    } else if (diff < -50) {
      nextBanner();
      setIsDragging(false);
      resetCursor();
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    resetCursor();
  };

  return (
    <div
      className="relative flex flex-col items-center justify-center w-full h-96 overflow-hidden"
      ref={carouselRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{ cursor: 'grab' }} // Default to open hand
    >
      {/* Current Banner Image */}
      <img
        src={banners[currentBannerIndex]}
        alt={`Banner ${currentBannerIndex + 1}`}
        className="w-full h-full object-cover"
      />

      {/* Dots for navigation */}
      <div className="absolute bottom-4 flex space-x-2">
        {banners.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ease-in-out ${
              index === currentBannerIndex
                ? 'bg-blue-500 scale-125'
                : 'bg-gray-300'
            }`}
            onClick={() => goToBanner(index)}
          ></button>
        ))}
      </div>

      {/* Left and Right Controls with custom SVG icons */}
      <button
        className="absolute left-4 bg-black bg-opacity-50 text-white p-2 rounded-full"
        onClick={prevBanner}
        aria-label="Previous banner"
      >
        {/* Left Arrow SVG */}
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="text-white" viewBox="0 0 24 24">
          <path d="M14 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        className="absolute right-4 bg-black bg-opacity-50 text-white p-2 rounded-full"
        onClick={nextBanner}
        aria-label="Next banner"
      >
        {/* Right Arrow SVG */}
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="text-white" viewBox="0 0 24 24">
          <path d="M10 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
};

export default BannerCarousel;
