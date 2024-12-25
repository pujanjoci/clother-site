import React, { useState, useEffect } from 'react';

const SalesContainer = () => {
  // List of sales
  const sales = [
    { title: 'Sale 1', description: 'Winter Collection' },
    { title: 'Sale 2', description: 'Summer Specials' },
    { title: 'Sale 3', description: 'Clearance Offers' },
    { title: 'Sale 4', description: 'Flash Deals' },
    { title: 'Sale 5', description: 'Exclusive Offers' },
    { title: 'Sale 6', description: 'New Arrivals' },
    { title: 'Sale 7', description: 'Weekend Discount' },
    { title: 'Sale 8', description: 'Holiday Specials' },
  ];

  // Initialize state with value from localStorage or default to 0
  const [currentIndex, setCurrentIndex] = useState(() => {
    const savedIndex = localStorage.getItem('currentIndex');
    return savedIndex ? parseInt(savedIndex, 10) : 0;
  });

  // Function to cycle through the sales array
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const newIndex = (prevIndex + 1) % Math.ceil(sales.length / 4);
        localStorage.setItem('currentIndex', newIndex); // Save new index to localStorage
        return newIndex;
      });
    }, 300000); // 5 minutes in milliseconds (300000ms)

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, [sales.length]);

  // Get the 4 items to show based on the current index
  const currentSales = sales.slice(currentIndex * 4, (currentIndex + 1) * 4);

  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6 py-8">
      {currentSales.map((sale, index) => (
        <div key={index} className="flex flex-col items-center">
          <div className="w-40 h-40 sm:w-60 sm:h-60 bg-gray-200 flex items-center justify-center rounded-lg shadow-lg">
            <p className="text-lg sm:text-xl font-bold text-gray-700">{sale.title}</p>
          </div>
          <p className="mt-2 text-sm sm:text-lg text-gray-600">{sale.description}</p>
        </div>
      ))}
    </div>
  );
};

export default SalesContainer;
