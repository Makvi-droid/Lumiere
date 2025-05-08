import React from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

const ExtraContent = () => {
  return (
    <section className="bg-white py-20 px-4 sm:px-10 md:px-20 lg:px-40 shadow-inner">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center"
      >
        <h2 className="text-4xl font-extrabold text-gray-800 mb-4">
          Discover the Elegance of Lumière
        </h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          At Lumière, we believe in more than just jewelry. We believe in the stories they tell,
          the moments they mark, and the confidence they inspire. Explore our artisan-crafted
          rings, necklaces, and earrings, designed to reflect your brilliance.
        </p>
      </motion.div>

      <div className="mt-16 grid md:grid-cols-3 gap-10">
        {[
          {
            title: "Timeless Design",
            description:
              "Each piece from Lumière is created with an eye for enduring elegance and a touch of modern charm.",
          },
          {
            title: "Crafted with Precision",
            description:
              "Our artisans bring decades of experience, shaping every item with meticulous attention to detail.",
          },
          {
            title: "Inspired by You",
            description:
              "Lumière collections are inspired by real stories and real people, celebrating uniqueness and grace.",
          },
        ].map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            viewport={{ once: true }}
            className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200 hover:shadow-2xl transition-shadow duration-300"
          >
            <div className="flex items-center justify-center mb-4 text-pink-500">
              <Sparkles size={32} />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {item.title}
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              {item.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ExtraContent;