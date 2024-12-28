import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import FAQ from './pages/FAQ';
import CategoriesMobile from './pages/CategoriesMobile';
import Loader from './components/Loader'; // Import the Loader component
import './index.css';

function App() {
  const [isLoading, setIsLoading] = useState(true); // State to manage the loading state

  useEffect(() => {
    // Simulate a loading time for demonstration
    const timer = setTimeout(() => {
      setIsLoading(false); // After 3 seconds, set loading to false
    }, 3000); // Change the 3000ms to your desired loading duration

    // Cleanup the timer if component unmounts
    return () => clearTimeout(timer);
  }, []);

  return (
    <Router basename="/clother-site/">
      <div>
        {isLoading ? (
          <Loader /> // Show loader while loading
        ) : (
          <>
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/cm" element={<CategoriesMobile />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/faq" element={<FAQ />} />
            </Routes>
          </>
        )}
      </div>
    </Router>
  );
}

export default App;
