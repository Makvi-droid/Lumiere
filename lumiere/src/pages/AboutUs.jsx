import React, { useState, useEffect } from 'react';
import { assets } from '../products-page/assets/assets';
import { Star, Sparkles, Heart } from 'lucide-react';

const AboutUs = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
    
    // Add scroll event listener to handle animations when scrolling
    const handleScroll = () => {
      const elements = document.querySelectorAll('.scroll-animate');
      elements.forEach(element => {
        if (isElementInViewport(element)) {
          element.classList.add('animated');
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on initial load
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Helper function to check if element is in viewport
  const isElementInViewport = (el) => {
    const rect = el.getBoundingClientRect();
    return (
      rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.bottom >= 0
    );
  };

  return (
    <div className="bg-gradient-to-b from-indigo-950 to-indigo-900 text-white">
      {/* Hero Section with improved positioning */}
      <div className="relative h-screen md:h-96 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[#0e0333] opacity-80"></div>
        <div className="relative z-10 px-4">
          <div className={`text-center transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h1 className="text-4xl md:text-6xl font-bold mb-4" style={{color:"#e6e600"}}>
              About <span className="font-light text-[#e6e600]">Lumiere</span>
            </h1>
            <div className="w-24 h-1 bg-[#e6e600] mx-auto mb-6"></div>
            <p className="text-lg md:text-xl max-w-3xl mx-auto text-[#e6e600]">
              At Lumiere, we believe that every piece of jewelry tells a story. Our exquisite collection is crafted with love and attention to detail.
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full z-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="text-indigo-950">
            <path fill="currentColor" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,128C672,128,768,160,864,176C960,192,1056,192,1152,176C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
      </div>

      {/* Our Collection Section with more space */}
      <div className="container mx-auto px-4 md:px-6 pt-16 pb-12 relative z-10">
        <div className="text-center mb-16 scroll-animate">
          <h2 className={`text-3xl font-bold mb-2 inline-flex items-center transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            <Sparkles className="text-[#e6e600] mr-2" size={24} />
            Our Collection
            <Sparkles className="text-[#e6e600] ml-2" size={24} />
          </h2>
          <div className="w-16 h-1 bg-[#e6e600] mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Rings Card */}
          <div className={`group bg-indigo-900 rounded-lg overflow-hidden shadow-xl transform transition-all duration-700 hover:scale-105 hover:shadow-2xl scroll-animate ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`} style={{transitionDelay: '200ms'}}>
            <div className="relative overflow-hidden h-64">
              <img
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 "
                src={assets.ring10}
                alt="Rings"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0e0333] via-transparent to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-500"></div>
              <div className="absolute bottom-0 left-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                <div className="flex gap-2">
                  <span className="bg-[#e6e600] text-[#0e0333] text-xs font-bold px-2 py-1 rounded-full">New</span>
                  <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-bold px-2 py-1 rounded-full">Handcrafted</span>
                </div>
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-bold text-white group-hover:text-[#e6e600] transition-colors duration-300">Rings</h3>
                <Heart className="text-pink-400 group-hover:text-pink-300 transition-colors duration-300" size={20} />
              </div>
              <p className="text-gray-300">
                Discover our stunning collection of rings, each crafted to symbolize love and elegance.
              </p>
              <div className="mt-4 flex justify-between items-center">
                <div className="flex text-[#e6e600]">
                  <Star size={16} />
                  <Star size={16} />
                  <Star size={16} />
                  <Star size={16} />
                  <Star size={16} />
                </div>
              
              </div>
            </div>
          </div>

          {/* Necklaces Card */}
          <div className={`group bg-indigo-900 rounded-lg overflow-hidden shadow-xl transform transition-all duration-700 hover:scale-105 hover:shadow-2xl scroll-animate ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`} style={{transitionDelay: '400ms'}}>
            <div className="relative overflow-hidden h-64">
              <img
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                src={assets.necklace10}
                alt="Necklaces"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0e0333] via-transparent to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-500"></div>
              <div className="absolute bottom-0 left-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                <div className="flex gap-2">
                  <span className="bg-[#e6e600] text-[#0e0333] text-xs font-bold px-2 py-1 rounded-full">Popular</span>
                  <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-bold px-2 py-1 rounded-full">Premium</span>
                </div>
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-bold text-white group-hover:text-[#e6e600] transition-colors duration-300">Necklaces</h3>
                <Heart className="text-pink-400 group-hover:text-pink-300 transition-colors duration-300" size={20} />
              </div>
              <p className="text-gray-300">
                Our necklaces are designed to add a touch of elegance to any outfit, perfect for any occasion.
              </p>
              <div className="mt-4 flex justify-between items-center">
                <div className="flex text-[#e6e600]">
                  <Star size={16} />
                  <Star size={16} />
                  <Star size={16} />
                  <Star size={16} />
                  <Star size={16} />
                </div>
              
              </div>
            </div>
          </div>

          {/* Earrings Card */}
          <div className={`group bg-indigo-900 rounded-lg overflow-hidden shadow-xl transform transition-all duration-700 hover:scale-105 hover:shadow-2xl scroll-animate ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`} style={{transitionDelay: '600ms'}}>
            <div className="relative overflow-hidden h-64">
              <img
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                src={assets.earring10}
                alt="Earrings"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0e0333] via-transparent to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-500"></div>
              <div className="absolute bottom-0 left-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                <div className="flex gap-2">
                  <span className="bg-[#e6e600] text-[#0e0333] text-xs font-bold px-2 py-1 rounded-full">Featured</span>
                  <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-bold px-2 py-1 rounded-full">Limited</span>
                </div>
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-bold text-white group-hover:text-[#e6e600] transition-colors duration-300">Earrings</h3>
                <Heart className="text-pink-400 group-hover:text-pink-300 transition-colors duration-300" size={20} />
              </div>
              <p className="text-gray-300">
                Our earrings are crafted to dazzle and delight, making every moment special.
              </p>
              <div className="mt-4 flex justify-between items-center">
                <div className="flex text-[#e6e600]">
                  <Star size={16} />
                  <Star size={16} />
                  <Star size={16} />
                  <Star size={16} />
                  <Star size={16} />
                </div>
            
              </div>
            </div>
          </div>
        </div>
      </div>

    
      <div className="h-12"></div>
    </div>
  );
};

export default AboutUs;