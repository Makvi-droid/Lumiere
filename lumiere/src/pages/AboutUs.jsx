import React from 'react';
import { assets } from '../products-page/assets/assets';

const AboutUs = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-5">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-800 mb-4 animate__animated animate__fadeInDown">
          About Lumiere
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8 animate__animated animate__fadeInUp">
          At Lumiere, we believe that every piece of jewelry tells a story. Our exquisite collection of rings, necklaces, and earrings is crafted with love and attention to detail, designed to make you shine on every occasion.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden transform transition-transform duration-500 hover:scale-105 animate__animated animate__fadeInLeft">
          <img
            className="w-full h-48 object-cover"
            src={assets.ring10} // Replace with your ring image
            alt="Rings"
          />
          <div className="p-5">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Rings</h2>
            <p className="text-gray-600">
              Discover our stunning collection of rings, each crafted to symbolize love and elegance.
            </p>
          </div>
        </div>
        <div className="bg-white shadow-lg rounded-lg overflow-hidden transform transition-transform duration-500 hover:scale-105 animate__animated animate__fadeInRight">
          <img
            className="w-full h-48 object-cover"
            src={assets.necklace10}// Replace with your necklace image
            alt="Necklaces"
          />
          <div className="p-5">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Necklaces</h2>
            <p className="text-gray-600">
              Our necklaces are designed to add a touch of elegance to any outfit, perfect for any occasion.
            </p>
          </div>
        </div>
        <div className="bg-white shadow-lg rounded-lg overflow-hidden transform transition-transform duration-500 hover:scale-105 animate__animated animate__fadeInLeft">
          <img
            className="w-full h-48 object-cover"
            src={assets.earring10} // Replace with your earrings image
            alt="Earrings"
          />
          <div className="p-5">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Earrings</h2>
            <p className="text-gray-600">
              Our earrings are crafted to dazzle and delight, making every moment special.
            </p>
          </div>
        </div>
      </div>
      <div className="mt-10 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 animate__animated animate__fadeInUp">
          Join Us in Celebrating Elegance
        </h2>
        <p className="text-gray-600 animate__animated animate__fadeInUp">
          Explore our collection and let your jewelry tell your story.
        </p>
      </div>
    </div>
  );
};

export default AboutUs;