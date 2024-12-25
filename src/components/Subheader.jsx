import React, { useState, useRef, useEffect } from "react";
import categoriesData from "../data/Categories.json";
import { FaSearch } from "react-icons/fa";
import toast, { Toaster } from 'react-hot-toast';

const Subheader = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categories, setCategories] = useState([]);
  const [activeSelections, setActiveSelections] = useState([]);
  const [toastIds, setToastIds] = useState([]);
  const [menuStatus, setMenuStatus] = useState(false);
  const subheaderRef = useRef(null);
  const categoryMenuRef = useRef(null);
  const menuButtonRef = useRef(null);

  const toggleCategoryMenu = (category) => {
    if (menuStatus && selectedCategory === category) {
      setSelectedCategory(null);
      setCategories([]);
      setMenuStatus(false);
    } else {
      setSelectedCategory(category);
      setCategories(categoriesData[category]);
      setMenuStatus(true);
    }
  };

  const handleSubcategoryClick = (subcategory) => {
    const itemFullName = `${selectedCategory}.${subcategory}`;

    if (activeSelections.includes(itemFullName)) {
      setActiveSelections(prevSelections =>
        prevSelections.filter(item => item !== itemFullName)
      );
    } else {
      if (activeSelections.length >= 5) {
        if (toastIds.length >= 2) {
          toast.dismiss(toastIds[0]);
          setToastIds(prevToastIds => prevToastIds.slice(1));
        }
        const newToastId = toast.error("Only 5 items can be selected at a time.");
        setToastIds(prevToastIds => [...prevToastIds, newToastId]);
      } else {
        setActiveSelections(prevSelections => [...prevSelections, itemFullName]);
      }
    }
  };

  const handleClickOutside = (event) => {
    if (
      subheaderRef.current &&
      !subheaderRef.current.contains(event.target) &&
      categoryMenuRef.current &&
      !categoryMenuRef.current.contains(event.target) &&
      !menuButtonRef.current.contains(event.target)
    ) {
      setSelectedCategory(null);
      setCategories([]);
      setMenuStatus(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div
        ref={menuButtonRef}
        className="absolute left-0 right-0 bg-white border-t border-gray-300 shadow-md z-20"
      >
        <div className="container mx-auto py-4 flex justify-around" ref={subheaderRef}>
          {["men", "women", "children"].map(category => (
            <button
              key={category}
              onClick={() => toggleCategoryMenu(category)}
              className={`text-lg font-semibold text-gray-700 hover:text-gray-900 ${
                selectedCategory === category ? "text-gray-900 underline" : ""
              }`}
            >
              {category.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {selectedCategory && (
        <div
          ref={categoryMenuRef}
          className="absolute top-[135px] left-0 right-0 bg-white border-t border-gray-300 shadow-md z-20"
        >
          <div className="container mx-auto py-4">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
              Categories
            </h2>
            <div className="grid grid-cols-10 gap-4">
              {categories.map((category, index) => (
                <div
                  key={index}
                  onClick={() => handleSubcategoryClick(category)}
                  className={`text-gray-600 p-2 border border-gray-300 text-center rounded cursor-pointer hover:bg-gray-200 hover:text-gray-800 ${
                    activeSelections.includes(`${selectedCategory}.${category}`)
                      ? "bg-gray-300 text-gray-900"
                      : ""
                  }`}
                >
                  {category}
                </div>
              ))}
            </div>
          </div>

          <button className="absolute top-2 right-5 text-neutral-600 p-3 rounded-full shadow-lg hover:bg-neutral-500 hover:text-neutral-50 focus:outline-none">
            <FaSearch />
          </button>
        </div>
      )}

      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          duration: 3000,
        }}
      />
    </>
  );
};

export default Subheader;
