"use client";

import CategoriesSkeleton from "@components/UI/CategoriesSkeleton";
import Link from "@node_modules/next/link";
import { useGetCategoriesQuery } from "@redux-store/apis/foodItemsApi";
import { motion } from "framer-motion";

const categoryDescriptions = {
  Rolls:
    "Soft wraps filled with flavorful ingredients, perfect for on-the-go bites.",
  Starters: "Crispy, savory, and packed with flavors to kickstart your meal.",
  Biryanis: "Fragrant, spiced rice layered with tender meat or veggies.",
  Noodles: "Slurpy, stir-fried, and loaded with bold, savory flavors.",
  FriedRice: "Wok-tossed rice with aromatic spices and fresh ingredients.",
};

export default function Categories() {
  const { data: categories, isLoading: isCategoriesLoading } =
    useGetCategoriesQuery();

  const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  const categoryVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: { delay: 0.2, duration: 0.5 },
    },
  };

  return (
    <>
      <motion.h1
        variants={categoryVariants}
        initial="hidden"
        animate="visible"
        className="text-center font-hind font-bold text-amber-600 text-[1.8rem] tracking-wide md:text-3xl"
      >
        Categories
      </motion.h1>
      <motion.ul
        variants={container}
        initial="hidden"
        animate="visible"
        className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 my-8"
      >
        {isCategoriesLoading ? (
          <>
            {[...Array(5).keys()].map((n) => (
              <CategoriesSkeleton key={n} />
            ))}
          </>
        ) : (
          categories?.categories?.map((category) => (
            <motion.li variants={item} key={category._id}>
              <div
                className="card text-primary-content w-96 h-56 bg-cover bg-center rounded-lg shadow-lg"
                style={{
                  backgroundImage: `url(${category.banner})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="card-body bg-black/50 rounded-lg">
                  <h2 className="card-title text-white">{category.name}</h2>
                  <p className="text-white">
                    {categoryDescriptions[category.name] ||
                      "Delicious and satisfying for every craving."}
                  </p>
                  <div className="card-actions justify-end">
                    <Link
                      href={`/meals/${category.name
                        .toLowerCase()
                        .replace(" ", "-")}`}
                      className="btn bg-white text-black"
                    >
                      Choose
                    </Link>
                  </div>
                </div>
              </div>
            </motion.li>
          ))
        )}
      </motion.ul>
    </>
  );
}
