import React from 'react';
import Header from './components/Header';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import FAQ from './pages/FAQ';
import './index.css';

function App() {
  return (
    <Router basename="/clother-site/">
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} /> {/* Home route */}
          <Route path="/about" element={<About />} /> {/* About route */}
          <Route path="/contact" element={<Contact />} /> {/* Contact route */}
          <Route path="/faq" element={<FAQ />} /> {/* FAQ route */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
