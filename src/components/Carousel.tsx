import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { IMAGE_BASE_URL } from "../config/config";
import { Card } from "@/components/ui/card";
import { ArrowLeftCircle, ArrowRightCircle } from "lucide-react";
import { Offer } from "../config/types";

function CarouselComponent({ offers }: { offers: Offer[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(
    window.innerWidth >= 1024 ? 2 : 1
  );

  // Update items per page when screen resizes
  useEffect(() => {
    const handleResize = () => {
      setItemsPerPage(window.innerWidth >= 1024 ? 2 : 1);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalPages = Math.ceil(offers.length / itemsPerPage);

  // Autoplay every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1 >= totalPages ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(timer);
  }, [totalPages]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1 >= totalPages ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 < 0 ? totalPages - 1 : prev - 1));
  };

  // Get visible items
  const visibleOffers = offers.slice(
    currentIndex * itemsPerPage,
    currentIndex * itemsPerPage + itemsPerPage
  );

  return (
    <div className="w-[95%] mx-auto my-6 relative">
      {/* Slides */}
      <div className="flex gap-4 justify-center">
        {visibleOffers.map((offer: Offer) => (
          <Link
            key={offer.id}
            to={
              offer.product
                ? `/product/${offer.product}`
                : `/company/${offer.company}`
            }
            className="flex-1"
          >
            <Card className="py-0 overflow-hidden shadow-md rounded-xl hover:shadow-lg transition h-44 sm:h-56 md:h-72">
              <img
                src={IMAGE_BASE_URL + offer.image}
                alt={offer.product ? "" : `${offer.company}`}
                className="w-full h-full object-cover"
              />
            </Card>
          </Link>
        ))}
      </div>

      {/* Controls */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-2 -translate-y-1/2 bg-black/40 text-white px-2 py-1 rounded-full hover:bg-black/60"
      >
        <ArrowLeftCircle />
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-2 -translate-y-1/2 bg-black/40 text-white px-2 py-1 rounded-full hover:bg-black/60"
      >
        <ArrowRightCircle />
      </button>
    </div>
  );
}

export default CarouselComponent;
