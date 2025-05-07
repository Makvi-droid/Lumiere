import React from 'react';
import { motion } from 'framer-motion';
import { Gem, Heart, Users, ShieldCheck, Sparkles } from 'lucide-react';

const AboutUs = () => {
  return (
    <div className="bg-white text-gray-800 min-h-screen py-20 px-6 md:px-16 font-sans">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-6xl mx-auto text-center"
      >
        <h1 className="text-5xl font-extrabold mb-4 tracking-tight" style={{ color: "#020530", fontFamily: "DM Serif Display" }}>
          About Lumière
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed">
          Lumière is more than a jewelry brand — it's a radiant expression of elegance, identity, and timeless charm. We craft rings, necklaces, and earrings that speak to the soul.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-10 max-w-7xl mx-auto mb-24">
        {features.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.2, duration: 0.6 }}
            className="bg-white border border-gray-200 p-8 rounded-3xl text-center shadow-md hover:shadow-lg transition duration-300"
            style={{background:"#020530"}}>
            <div className="flex justify-center mb-4 text-[#dcf500]">{item.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
            <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
          </motion.div>
        ))}
      </div>

      {/* Mission Section */}
      <motion.section
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-5xl mx-auto text-center mb-20"
      >
        <h2 className="text-3xl font-bold mb-4 text-[#dcf500]">Our Mission</h2>
        <p className="text-gray-600 leading-relaxed max-w-3xl mx-auto">
          We believe in celebrating individuality through jewelry that illuminates who you are. At Lumière, our mission is to make premium, sustainable jewelry accessible — empowering people to shine in their own unique way.
        </p>
      </motion.section>

      {/* Team Section */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="bg-gray-100 p-12 rounded-3xl max-w-6xl mx-auto"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">The Lumière Team</h2>
        <p className="text-gray-600 leading-relaxed text-center max-w-3xl mx-auto">
          Behind Lumière is a passionate team of artists, gem experts, and designers. Each creation is born from collaboration, experience, and a shared love for beauty.
        </p>
      </motion.section>
    </div>
  );
};

const features = [
  {
    icon: <Gem size={40} />,
    title: 'Luxury Materials',
    description: 'Ethically sourced gemstones and premium metals selected with precision and care.',
  },
  {
    icon: <Heart size={40} />,
    title: 'Emotional Design',
    description: 'Jewelry that holds meaning, memories, and personal connection — crafted with love.',
  },
  {
    icon: <Users size={40} />,
    title: 'Customer-Focused',
    description: 'Our community is at the heart of everything — from design to delivery.',
  },
  {
    icon: <Sparkles size={40} />,
    title: 'Handcrafted Shine',
    description: 'Every item is delicately handmade, ensuring uniqueness and personal charm.',
  },
  {
    icon: <ShieldCheck size={40} />,
    title: 'Sustainably Made',
    description: 'Eco-conscious practices and long-lasting pieces that you can wear with pride.',
  },
  {
    icon: <Gem size={40} />,
    title: 'Timeless Appeal',
    description: 'Not trendy — timeless. Styles that never fade and always elevate.',
  },
];

export default AboutUs;
