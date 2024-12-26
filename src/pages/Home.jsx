import React from 'react';
import Carousel from '../components/Carousel';
import Board1 from '../components/Board1';
import SalesContainer from '../components/SalesContainer';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div>
      <Carousel />
      <Board1 />
      <SalesContainer />
      <Footer />
    </div>
  );
}

export default Home;
