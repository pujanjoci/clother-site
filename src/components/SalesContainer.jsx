import React, { useState, useEffect } from 'react';

// Import all images
import img1 from '../assets/Sales/1.webp';
import img2 from '../assets/Sales/2.webp';
import img3 from '../assets/Sales/3.webp';
import img4 from '../assets/Sales/4.webp';
import img5 from '../assets/Sales/5.webp';
import img6 from '../assets/Sales/6.webp';
import img7 from '../assets/Sales/7.webp';
import img8 from '../assets/Sales/8.webp';

const SalesContainer = () => {
  // List of imported images
  const images = [img1, img2, img3, img4, img5, img6, img7, img8];

  // Initialize state with value from localStorage or default to 0
  const [currentIndex, setCurrentIndex] = useState(() => {
    const savedIndex = localStorage.getItem('currentIndex');
    return savedIndex ? parseInt(savedIndex, 10) : 0;
  });

  // Function to cycle through the images array
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const newIndex = (prevIndex + 1) % Math.ceil(images.length / 4);
        localStorage.setItem('currentIndex', newIndex); // Save new index to localStorage
        return newIndex;
      });
    }, 300000); // 5 minutes in milliseconds (300000ms)

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, [images.length]);

  // Get the 4 images to show based on the current index
  const currentImages = images.slice(currentIndex * 4, (currentIndex + 1) * 4);

  // Conditional text based on the current index
  const displayText = currentIndex === 0 ? 'Exclusive Fits' : 'New Offers';

  return (
    <div className="max-w-[80%] mx-auto pt-1 pb-10">
      {/* Conditional Text with Handwriting Font */}
      <h2 className="text-center text-3xl font-handwriting text-neutral-900 mb-6">
        {displayText}
      </h2>
      
      {/* Image Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:gap-2 lg:grid-cols-4 gap-y-10 md:gap-y-8">
        {currentImages.map((image, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className="w-40 h-40 sm:w-60 sm:h-60 bg-gray-200 flex items-center justify-center rounded-lg shadow-lg">
              <img 
                src={image} 
                alt={`Sale ${index + 1}`} 
                className="w-full h-full object-cover rounded-lg" 
                loading="lazy" 
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SalesContainer;
