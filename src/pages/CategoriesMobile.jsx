import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Change to useNavigate

const CategoriesMobile = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate(); // Update to useNavigate

  useEffect(() => {
    // Check if the screen width is less than or equal to 768px (mobile)
    const isMobile = window.innerWidth <= 768;

    if (!isMobile) {
      // If it's a desktop, redirect to the home page
      navigate('/home'); // Replace history.push with navigate
    } else {
      // Otherwise, load the categories (for mobile)
      fetch('/data/categories.json')
        .then((response) => response.json())
        .then((data) => setCategories(data));
    }

    // Optionally, listen for window resize to adjust if the user switches device type during the session
    const handleResize = () => {
      if (window.innerWidth > 768) {
        navigate('/home'); // Replace history.push with navigate
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [navigate]);

  return (
    <div>
      <h1>Select a Category</h1>
      <ul>
        {categories.map((category) => (
          <li key={category.id}>
            <button>{category.name}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoriesMobile;
