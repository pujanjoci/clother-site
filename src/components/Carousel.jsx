import React, { useState, useEffect, useRef } from 'react';

// Import WebP banners
import banner1 from '../assets/banner/1.webp';
import banner2 from '../assets/banner/2.webp';
import banner3 from '../assets/banner/3.webp';
import banner4 from '../assets/banner/4.webp';
import banner5 from '../assets/banner/5.webp';

import mobileBanner1 from '../assets/banner/Mobile-1.webp';
import mobileBanner2 from '../assets/banner/Mobile-2.webp';
import mobileBanner3 from '../assets/banner/Mobile-3.webp';
import mobileBanner4 from '../assets/banner/Mobile-4.webp';
import mobileBanner5 from '../assets/banner/Mobile-5.webp';

const desktopBanners = [banner1, banner2, banner3, banner4, banner5];
const mobileBanners = [mobileBanner1, mobileBanner2, mobileBanner3, mobileBanner4, mobileBanner5];

const BannerCarousel = () => {
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const carouselRef = useRef(null);
  const timerRef = useRef(null);

  const checkIsMobile = () => {
    setIsMobile(window.innerWidth <= 768); // Adjust breakpoint as needed
  };

  useEffect(() => {
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  const banners = isMobile ? mobileBanners : desktopBanners;

  const preloadImages = (images) => {
    const promises = images.map((src) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = src;
        img.onload = resolve;
        img.onerror = reject;
      });
    });
    return Promise.all(promises);
  };

  useEffect(() => {
    preloadImages([...desktopBanners, ...mobileBanners])
      .then(() => setIsLoaded(true))
      .catch((err) => console.error('Error preloading images:', err));
  }, []);

  const resetTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrentBannerIndex((prevIndex) => (prevIndex + 1) % banners.length);
    }, 5000);
  };

  useEffect(() => {
    if (isLoaded) {
      resetTimer();
    }
    return () => clearInterval(timerRef.current); // Cleanup the interval on unmount
  }, [banners, isLoaded]);

  const goToBanner = (index) => {
    setCurrentBannerIndex(index);
    resetTimer();
  };

  const nextBanner = () => {
    setCurrentBannerIndex((prevIndex) => (prevIndex + 1) % banners.length);
    resetTimer();
  };

  const prevBanner = () => {
    setCurrentBannerIndex((prevIndex) => (prevIndex - 1 + banners.length) % banners.length);
    resetTimer();
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.clientX);
    if (carouselRef.current) {
      carouselRef.current.style.cursor = 'grabbing';
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
      carouselRef.current.style.cursor = 'grab';
    }
  };

  const handleTouchStart = (e) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
    if (carouselRef.current) {
      carouselRef.current.style.cursor = 'grabbing';
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
  className="relative flex flex-col items-center justify-center w-full md:w-[1423px] h-96 overflow-hidden mx-auto"
  ref={carouselRef}
  onMouseDown={handleMouseDown}
  onMouseMove={handleMouseMove}
  onMouseUp={handleMouseUp}
  onMouseLeave={handleMouseUp}
  onTouchStart={handleTouchStart}
  onTouchMove={handleTouchMove}
  onTouchEnd={handleTouchEnd}
  style={{ cursor: 'grab' }}
>
  {/* Current Banner Image */}
  <img
    src={banners[currentBannerIndex]}
    alt={`Banner ${currentBannerIndex + 1}`}
    className={`w-full md:w-[1520px] h-full object-cover ${isMobile ? '' : 'aspect-[16/9]'}`}
  />

  {/* Dots for navigation */}
  <div className="absolute bottom-4 flex space-x-2">
    {banners.map((_, index) => (
      <button
        key={index}
        className={`w-2 h-2 rounded-full transition-all duration-300 ease-in-out ${
          index === currentBannerIndex ? 'bg-blue-500 scale-125' : 'bg-gray-300'
        }`}
        onClick={() => goToBanner(index)}
      ></button>
    ))}
  </div>

  {/* Left and Right Controls */}
  <button
    className="absolute left-4 bg-black bg-opacity-50 text-white p-2 rounded-full"
    onClick={prevBanner}
    aria-label="Previous banner"
  >
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="text-white" viewBox="0 0 24 24">
      <path d="M14 19l-7-7 7-7" />
    </svg>
  </button>

  <button
    className="absolute right-4 bg-black bg-opacity-50 text-white p-2 rounded-full"
    onClick={nextBanner}
    aria-label="Next banner"
  >
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="text-white" viewBox="0 0 24 24">
      <path d="M10 5l7 7-7 7" />
    </svg>
  </button>
</div>
  );
};

export default BannerCarousel;
