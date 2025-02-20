import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import categoriesData from '../data/Categories.json';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaSearch } from 'react-icons/fa';

import Footer from '../components/Footer';

const CategoriesMobile = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const navigate = useNavigate();
  const [toastCount, setToastCount] = useState(0);
  
  const ITEM_LIFETIME = 5 * 60 * 1000; // 5 minutes in milliseconds

  // Check localStorage for saved data and load it if valid
  useEffect(() => {
    const storedData = localStorage.getItem('selectedItems');
    const storedTime = localStorage.getItem('selectedItemsTimestamp');
    
    if (storedData && storedTime) {
      const currentTime = new Date().getTime();
      const timeDiff = currentTime - storedTime;

      // Only load data if it is within the last 5 minutes
      if (timeDiff < ITEM_LIFETIME) {
        setSelectedItems(JSON.parse(storedData));
      } else {
        localStorage.removeItem('selectedItems');
        localStorage.removeItem('selectedItemsTimestamp');
      }
    }
  }, []);

  // Save selected items to localStorage with timestamp
  const saveToLocalStorage = (items) => {
    const timestamp = new Date().getTime();
    localStorage.setItem('selectedItems', JSON.stringify(items));
    localStorage.setItem('selectedItemsTimestamp', timestamp.toString());
  };

  const handleItemSelect = (category, item) => {
    const itemIndex = selectedItems.findIndex(
      (selectedItem) => selectedItem.category === category && selectedItem.item === item
    );

    if (itemIndex > -1) {
      setSelectedItems((prevItems) => {
        const newItems = prevItems.filter((_, index) => index !== itemIndex);
        saveToLocalStorage(newItems);
        return newItems;
      });
    } else {
      if (selectedItems.length < 5) {
        setSelectedItems((prevItems) => {
          const newItems = [...prevItems, { category, item }];
          saveToLocalStorage(newItems);
          return newItems;
        });
      } else {
        toast.warning('Only 5 items at a time');
      }
    }
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const handleSearchClick = () => {
    navigate('/search', { state: { items: selectedItems } });
  };

  const resetCategorySelection = () => {
    setSelectedCategory(null);
  };

  const handleToast = (message) => {
    if (toastCount < 3) { // Limit to 3 active toasts
      toast(message);
      setToastCount((prevCount) => prevCount + 1);
    }
  };

  const handleToastClose = () => {
    if (toastCount > 0) {
      setToastCount((prevCount) => prevCount - 1);
    }
  };

  const categoryColors = {
    men: 'bg-blue-500',
    women: 'bg-pink-500',
    children: 'bg-green-500',
  };

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar
        onClose={handleToastClose}
      />

      <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">Select a Category</h1>

      {selectedItems.length > 0 && (
        <div className="mb-6 text-center">
          <button
            onClick={handleSearchClick}
            className="flex items-center justify-center bg-indigo-600 text-white p-4 rounded-full shadow-md hover:bg-indigo-700 transition duration-300"
          >
            <FaSearch className="mr-2" />
            Search Selected Items
          </button>
        </div>
      )}

      {!selectedCategory ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoriesData ? (
            Object.keys(categoriesData).map((categoryKey) => (
              <div key={categoryKey} className={`bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out`}>
                <button
                  onClick={() => handleCategorySelect(categoryKey)}
                  className={`w-full text-lg font-medium text-white p-6 rounded-t-lg ${categoryColors[categoryKey]} hover:bg-opacity-80 transition duration-300`}
                >
                  {categoryKey.charAt(0).toUpperCase() + categoryKey.slice(1)}
                </button>
              </div>
            ))
          ) : (
            <p>Loading categories...</p>
          )}
        </div>
      ) : (
        <div>
          <button
            onClick={resetCategorySelection}
            className="text-blue-500 hover:underline mb-4 inline-block"
          >
            Back to Categories
          </button>
          <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
            {selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Items
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoriesData[selectedCategory].map((item, index) => {
              const isSelected = selectedItems.some(
                (selected) => selected.category === selectedCategory && selected.item === item
              );
              return (
                <div
                  key={index}
                  className={`bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out`}
                >
                  <button
                    onClick={() => handleItemSelect(selectedCategory, item)}
                    className={`w-full text-lg font-medium p-6 rounded-b-lg ${
                      isSelected ? 'bg-indigo-300 text-white' : 'bg-gray-200 text-gray-700'
                    } hover:bg-indigo-100 transition duration-300`}
                  >
                    {item}
                  </button>
                </div>
              );
            })}
          </div>

          <div className="mt-6">
            {selectedItems.length > 0 && (
              <button
                onClick={handleSearchClick}
                className="flex items-center justify-center bg-indigo-600 text-white p-4 rounded-full shadow-md hover:bg-indigo-700 transition duration-300"
              >
                <FaSearch className="mr-2" />
                Search Selected Items
              </button>
            )}
          </div>
        </div>
      )}

      <div className="mt-6 mb-20">
        <h3 className="text-xl font-semibold text-gray-700">Selected Items:</h3>
        <ul className="list-disc pl-5">
          {selectedItems.map((selected, index) => (
            <li key={index} className="text-lg text-gray-700">
              {selected.item} ({selected.category.charAt(0).toUpperCase() + selected.category.slice(1)})
            </li>
          ))}
        </ul>
      </div>
      <Footer />
    </div>
  );
};

export default CategoriesMobile;
