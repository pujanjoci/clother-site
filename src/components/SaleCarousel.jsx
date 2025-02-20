import { useState } from "react";
import SliderComponent from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ShoppingBag, ShoppingCart } from "lucide-react";
import { Button } from "./ui/button"; // Adjusted path to point to Button.jsx

// Import images statically
import redDress from "../assets/Sales/SaleItem/red-dress.png";
import blueJeans from "../assets/Sales/SaleItem/blue-jeans.png";
import blackJacket from "../assets/Sales/SaleItem/black-jacket.png";
import whiteTshirt from "../assets/Sales/SaleItem/white-tshirt.png";
import greenHoodie from "../assets/Sales/SaleItem/green-hoodie.png";
import yellowSkirt from "../assets/Sales/SaleItem/yellow-skirt.png";
import brownBoots from "../assets/Sales/SaleItem/brown-boots.png";
import purpleSweater from "../assets/Sales/SaleItem/purple-sweater.png";
import greyShorts from "../assets/Sales/SaleItem/grey-shorts.png";
import pinkScarf from "../assets/Sales/SaleItem/pink-scarf.png";

// Import the SaleItem JSON data
import SaleItem from "../data/SalesItem.json";

const SaleCarousel = () => {
  const [salesItems, setSalesItems] = useState(SaleItem); // Correct use of useState

  // Map image names to imports
  const imageMap = {
    "red-dress.png": redDress,
    "blue-jeans.png": blueJeans,
    "black-jacket.png": blackJacket,
    "white-tshirt.png": whiteTshirt,
    "green-hoodie.png": greenHoodie,
    "yellow-skirt.png": yellowSkirt,
    "brown-boots.png": brownBoots,
    "purple-sweater.png": purpleSweater,
    "grey-shorts.png": greyShorts,
    "pink-scarf.png": pinkScarf,
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 2,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1.1,
          slidesToScroll: 1,
          centerMode: true,
        },
      },
    ],
  };

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <h2 className="text-3xl font-serif hover:underline hover:cursor-text text-center mb-6">On Sale Now</h2>
      <SliderComponent {...settings}>
        {salesItems.map((item) => (
          <div key={item.id} className="p-2 flex justify-center">
            <div className="bg-neutral-300 shadow-lg rounded-lg overflow-hidden flex flex-col items-center relative p-2 w-56">
              <Button variant="outline" size="icon" className="bg-neutral-50 shadow-md absolute top-1 right-1" aria-label="View item">
                <ShoppingBag className="h-4 w-4" />
              </Button>
              <img
                // Use the mapped image
                src={imageMap[item.image]}
                alt={item.name}
                className="w-[100%] object-cover rounded-md" // Image takes 60% of the container
                onError={(e) => {
                  // Hide image if it fails to load
                  e.target.style.display = 'none'; // No fallback, just hide the image
                }}
              />
              <h3 className="text-lg font-semibold">{item.name}</h3>
              <p className="text-red-500 font-bold">{item.price}</p>
              <Button variant="outline" size="sm" className="bg-neutral-50 shadow-md mt-2 w-full">
                <ShoppingCart className="h-4 w-4 mr-2" />
                Add to Cart
              </Button>
            </div>
          </div>
        ))}
      </SliderComponent>
    </div>
  );
};

export default SaleCarousel;
