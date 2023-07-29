"use client";

import { motion } from "framer-motion";

export default function MealsSummary() {
  const mealsSummaryVariants = {
    hidden: {
      y: -30,
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: { delay: 0.2, duration: 0.5 },
    },
  };

  return (
    <motion.section
      variants={mealsSummaryVariants}
      initial="hidden"
      animate="visible"
      className="border border-gray-200 rounded-xl p-8 bg-slate-100 max-w-sm md:max-w-xl mx-auto my-8 text-center space-y-6"
    >
      <h2 className="font-semibold text-center text-xl tracking-wide text-[#006600] md:text-2xl">
        Delicious Food, Delivered To You
      </h2>
      <p className="text-base tracking-wide leading-6 md:text-lg">
        Choose your favorite meal from our broad selection of available meals
        and enjoy a delicious lunch or dinner at home.
      </p>
      <p className="text-md tracking-wide leading-6 md:text-lg">
        All our meals are cooked with high-quality ingredients, just-in-time and
        of course by experienced chefs!
      </p>
    </motion.section>
  );
}
