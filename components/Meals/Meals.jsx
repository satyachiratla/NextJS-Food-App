"use client";

import MealItem from "./MealItem";
import { motion } from "framer-motion";
import { addItemToCart } from "@redux-store/slices/cartSlice";
import { useDispatch } from "react-redux";
import { useGetFoodItemsQuery } from "@redux-store/apis/foodItemsApi";

// const meals = [
//   {
//     id: 1,
//     name: "Chicken Biryani",
//     description:
//       "Doused in black gold from the Malabar Coast, these fleshy chicken pieces are vessels of goodness that crack open spicy pepper in your taste buds.",
//     price: 250,
//     image: "/assets/items/chickenbiryani.jpeg",
//   },
//   {
//     id: 2,
//     name: "Chicken Lollipop",
//     description:
//       "Most loved by kids, this juicy frenched chicken winglet promises a lollypop of flavor filled with oomph and tanginess.",
//     price: 320,
//     image: "/assets/items/lollipop.jpg",
//   },
//   {
//     id: 3,
//     name: "Prawn 65 (8Pcs)",
//     description:
//       "Succulent prawns marinated in a tangy mixture, marrying the salt of the sea with zest and crunchy.",
//     price: 349,
//     image: "/assets/items/prawn65.webp",
//   },
//   {
//     id: 4,
//     name: "Prawn Mutton Biryani",
//     description:
//       "Spl. Mutton Biryani (3 pieces mutton) + Spl Ennai Kathrikai + Curd Raitha + Signature Bread Halwa + 1 Spl Sweet Paan)",
//     price: 449,
//     image: "/assets/items/prawnsbiryani.jpg",
//   },
//   {
//     id: 5,
//     name: "Chicken 65 (3 leg Pcs)",
//     description:
//       "An entree beloved by the South Indian populace, attributed to the spice of red chillies and the crunch of curry leaves – chicken leg pieces are marinated and fried to attain the perfect balance between soft and crunchy.",
//     price: 280,
//     image: "/assets/items/chicken65.jpeg",
//   },
//   {
//     id: 6,
//     name: "Mutton Sukka",
//     description:
//       "A Maduraikaaran’s dream – Tender Goat meat, slow cooked in sauteed onions and freshly ground aromatic spices resulting in a semi dry kadai of flavourful harmony",
//     price: 380,
//     image: "/assets/items/muttonsukka.jpeg",
//   },
// ];

export default function Meals() {
  const dispatch = useDispatch();
  const { data: meals } = useGetFoodItemsQuery();

  const addItemToCartHandler = (cartData) => {
    dispatch(addItemToCart(cartData));
  };

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

  return (
    <motion.ul
      variants={container}
      initial="hidden"
      animate="visible"
      className="mb-10 mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3"
    >
      {meals?.foodItems.map((meal) => (
        <motion.div variants={item} key={meal._id}>
          <MealItem
            key={meal._id}
            id={meal._id}
            name={meal.name}
            desc={meal.description}
            price={meal.price}
            image={meal.image}
            onAddToCart={addItemToCartHandler}
          />
        </motion.div>
      ))}
    </motion.ul>
  );
}
