import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { assets } from "./assets/assets";

export default function FeaturedJewelrySection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const featuredCollections = [
    {
      id: 1,
      title: "Timeless Elegance",
      description: "Discover our exquisite collection of handcrafted jewelry pieces designed to last generations.",
      image: assets.ring9,
      category: "Rings",
    },
    {
      id: 2,
      title: "Spring Radiance",
      description: "Vibrant gemstones and delicate designs inspired by nature's springtime renewal.",
      image: assets.necklace9,
      category: "Necklaces",
    },
    {
      id: 3,
      title: "Modern Minimalist",
      description: "Clean lines and contemporary designs for the sophisticated modern aesthetic.",
      image: assets.earring9,
      category: "Earrings",
    },
  ];

  useEffect(() => {
    setIsVisible(true);
    
    const interval = setInterval(() => {
      setActiveIndex((current) => 
        current === featuredCollections.length - 1 ? 0 : current + 1
      );
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  const handlePrevious = () => {
    setActiveIndex((current) => 
      current === 0 ? featuredCollections.length - 1 : current - 1
    );
  };

  const handleNext = () => {
    setActiveIndex((current) => 
      current === featuredCollections.length - 1 ? 0 : current + 1
    );
  };

  return (
    <div className={`w-full bg-gray-50 py-16 overflow-hidden transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-serif font-medium text-gray-900 flex items-center">
            <Sparkles className="h-6 w-6 mr-2 text-amber-500" />
            Featured Collections
          </h2>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">
              {activeIndex + 1} / {featuredCollections.length}
            </span>
            <div className="flex">
              <button 
                onClick={handlePrevious}
                className="p-2 rounded-l-md bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 transition-colors"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button 
                onClick={handleNext}
                className="p-2 rounded-r-md bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 transition-colors border-l-0"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="relative h-96">
          {featuredCollections.map((collection, index) => (
            <div
              key={collection.id}
              className={`absolute inset-0 transition-all duration-700 transform ${
                index === activeIndex 
                  ? 'opacity-100 translate-x-0' 
                  : index < activeIndex 
                    ? 'opacity-0 -translate-x-full' 
                    : 'opacity-0 translate-x-full'
              }`}
            >
              <div className="flex flex-col md:flex-row h-full bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="md:w-1/2 relative overflow-hidden">
                  <img 
                    src={collection.image}
                    alt={collection.title}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 bg-amber-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {collection.category}
                  </div>
                </div>
                <div className="md:w-1/2 p-8 flex flex-col justify-center">
                  <h3 className="text-2xl font-serif font-medium text-gray-900 mb-4">{collection.title}</h3>
                  <p className="text-gray-600 mb-8">{collection.description}</p>
                  <div className="animate-pulse">
                   
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          {featuredCollections.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`mx-1 h-2 w-2 rounded-full transition-all duration-300 ${
                index === activeIndex ? 'bg-amber-500 w-8' : 'bg-gray-300'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}