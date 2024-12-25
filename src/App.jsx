import React from 'react';
import Header from './components/Header';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About'; // Import the About component
import Contact from './pages/Contact'; // Import the Contact component
import FAQ from './pages/FAQ'; // Import the FAQ component
import './index.css';

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} /> {/* Home route */}
        <Route path="/about" element={<About />} /> {/* About route */}
        <Route path="/contact" element={<Contact />} /> {/* Contact route */}
        <Route path="/faq" element={<FAQ />} /> {/* FAQ route */}
      </Routes>
    </div>
  );
}

export default App;
