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

  // State to track which 4 items to show
  const [currentIndex, setCurrentIndex] = useState(0);

  // Function to cycle through the sales array
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % Math.ceil(sales.length / 4));
    }, 300000); // 5 minutes in milliseconds (300000ms)

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  // Get the 4 items to show based on the current index
  const currentSales = sales.slice(currentIndex * 4, (currentIndex + 1) * 4);

  return (
    <div className="flex justify-center items-center space-x-8 py-8">
      {currentSales.map((sale, index) => (
        <div key={index} className="flex flex-col items-center">
          <div className="w-60 h-60 bg-gray-200 flex items-center justify-center rounded-lg shadow-lg">
            <p className="text-xl font-bold text-gray-700">{sale.title}</p>
          </div>
          <p className="mt-2 text-lg text-gray-600">{sale.description}</p>
        </div>
      ))}
    </div>
  );
};

export default SalesContainer;
