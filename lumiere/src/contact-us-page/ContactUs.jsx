import React from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.3, duration: 1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const ContactUs = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-white to-[#fdfcf7] text-[#020029] px-6 py-20 overflow-hidden" style={{justifyContent:"center", alignItems:"center", display:"flex"}}>
      {/* Background Blobs */}
      <div className="absolute -top-32 -left-24 w-96 h-96 bg-[#dcf500] opacity-20 blur-[120px] rounded-full z-0 animate-pulse" />
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-[#f5f500] opacity-20 blur-[100px] rounded-full z-0 animate-spin-slow" />

      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="relative z-10 max-w-5xl mx-auto text-center"
      >
        <motion.h1
          variants={itemVariants}
          className="text-5xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-[#020029] to-[#7c6b00] text-transparent bg-clip-text"
        >
          Contact Lumière
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto mb-16"
        >
          Got questions or simply want to connect? Let us bring some sparkle to your inbox or day!
        </motion.p>

        <div className="grid md:grid-cols-3 gap-10 text-left px-4">
          {[{
            icon: <Phone size={36} />,
            label: "Phone",
            value: "+63 987 6543 210"
          }, {
            icon: <Mail size={36} />,
            label: "Email",
            value: "lumierejewelry@gmail.com"
          }, {
            icon: <MapPin size={36} />,
            label: "Location",
            value: "123 Sparkle Street, Gem City, CA"
          }].map(({ icon, label, value }, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-white/60 backdrop-blur-md p-6 rounded-2xl shadow-md hover:shadow-lg transition duration-300"
              whileHover={{ scale: 1.03 }}
            >
              <div className="text-[#000226] mb-4">{icon}</div>
              <h3 className="text-xl font-semibold mb-1">{label}</h3>
              <p className="text-gray-700 text-lg">{value}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default ContactUs;
