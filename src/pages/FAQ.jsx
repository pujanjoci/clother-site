import React, { useState, useEffect } from "react";
import faqData from "../data/FAQData.json"; // Import the JSON data

const FAQ = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(null);

  // Scroll to top when the page is loaded or reloaded
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  // Reset selectedQuestionIndex when category changes
  useEffect(() => {
    setSelectedQuestionIndex(null); // Reset answers when category is changed
  }, [selectedCategory]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(selectedCategory === category ? null : category);
  };

  const handleQuestionClick = (index) => {
    setSelectedQuestionIndex(selectedQuestionIndex === index ? null : index);
  };

  return (
    <div className="flex">
      {/* Categories Sidebar */}
      <div className="w-56 h-[38rem] bg-gray-100 p-4 flex flex-col justify-start items-center">
        <h2 className="text-2xl font-bold mb-4">Categories</h2>
        <ul className="space-y-2 w-full">
          {faqData.map((category, index) => (
            <li
              key={index}
              className={`cursor-pointer p-2 rounded text-center hover:bg-gray-300 ${selectedCategory === category.category ? "bg-gray-300" : ""}`}
              onClick={() => handleCategoryClick(category.category)}
            >
              {category.category}
            </li>
          ))}
        </ul>
      </div>

      {/* Questions and Answers */}
      <div className="w-full md:w-3/4 p-6">
        {selectedCategory ? (
          <>
            <h2 className="text-3xl font-bold mb-6">{selectedCategory} Questions</h2>
            {faqData
              .filter((category) => category.category === selectedCategory)[0]
              .questions.map((question, index) => (
                <div key={index} className="mb-4">
                  <button
                    onClick={() => handleQuestionClick(index)}
                    className={`w-full text-left text-xl font-semibold flex items-center justify-start transition-all duration-300 ${selectedQuestionIndex === index ? 'text-black' : 'text-gray-500 hover:text-gray-900'} focus:outline-none`}
                  >
                    {/* More than symbol initially, down triangle when clicked */}
                    <span
                      className={`mr-2 transition-transform duration-300 ${selectedQuestionIndex === index ? "rotate-90" : ""}`}
                    >
                      ⮞
                    </span>
                    {question.question}
                  </button>
                  {/* Animate answer reveal with fade-in */}
                  {selectedQuestionIndex === index && (
                    <p className="mt-2 text-black opacity-100 translate-y-0 transition-all duration-1500 ease-out">
                      {question.answer}
                    </p>
                  )}
                </div>
              ))}
          </>
        ) : (
          <p className="text-xl text-gray-500">Please select a category to view questions.</p>
        )}
      </div>
    </div>
  );
};

export default FAQ;
