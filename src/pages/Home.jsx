import Carousel from '../components/Carousel';
import Board1 from '../components/Board1';
import SalesContainer from '../components/SalesContainer';
import SaleCarousel from '../components/SaleCarousel';

import Footer from '../components/Footer';

const Home = () => {
  return (
    <div>
      <Carousel />
      <Board1 />
      <SalesContainer />
      <SaleCarousel />

      <Footer />
    </div>
  );
}

export default Home;
