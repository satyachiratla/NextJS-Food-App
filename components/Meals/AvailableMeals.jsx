"use client";

import Meals from "./Meals";
import { motion } from "framer-motion";

export default function AvailableMeals() {
  const mealsVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: { delay: 0.2, duration: 0.5 },
    },
  };

  return (
    <div className="mt-10 md:mt-16 mx-auto">
      <motion.h1
        variants={mealsVariants}
        initial="hidden"
        animate="visible"
        className="text-center font-hind font-bold text-amber-600 text-[1.8rem] tracking-wide md:text-3xl"
      >
        Available Meals
      </motion.h1>
      <Meals />
    </div>
  );
}
