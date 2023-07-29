"use client";

import { useContext, useState } from "react";
import CartContext from "@store/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";

export default function Cart() {
  const cartCtx = useContext(CartContext);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();

  const { items, totalAmount } = cartCtx;

  const cartVariants = {
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

  const checkoutVariants = {
    hidden: {
      y: 250,
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: { delay: 0.2, duration: 0.5 },
    },
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const orderSubmitHandler = async (userData) => {
    setIsSubmitting(true);
    toast.loading("Placing Order 🚀", { id: "1" });

    try {
      const response = await fetch("api/orders/new", {
        method: "POST",
        body: JSON.stringify({
          userId: session?.user.id,
          user: userData,
          orderedItems: items,
          totalAmount: totalAmount,
          date: new Date(),
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        toast.success("Order placed Successfully 😃", { id: "1" });
        router.push("/orders");
      }

      setIsSubmitting(false);
    } catch (error) {
      toast.error("Failed to place Order 😞", { id: "1" });
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  let content;

  if (items.length === 0) {
    content = (
      <p className="text-cyan-500 font-noto text-lg tracking-wide">
        No items added Yet! <br></br> Please checkout our menu add items that
        you like...
      </p>
    );
  } else {
    content = (
      <>
        <ul className="space-y-5">
          {items.map((item) => (
            <CartItem
              key={item.id}
              name={item.name}
              price={item.price}
              amount={item.amount}
              onAdd={cartItemAddHandler.bind(null, item)}
              onRemove={cartItemRemoveHandler.bind(null, item.id)}
            />
          ))}
        </ul>
        <div className="mt-4 flex justify-center items-center">
          <span className="font-bold text-2xl text-cyan-500 tracking-wider items-center pr-4">
            Total Amount:
          </span>
          <span className="font-semibold text-zinc-100 font-inter text-2xl">
            ₹{totalAmount}
          </span>
        </div>
      </>
    );
  }

  return (
    <>
      <motion.div
        variants={cartVariants}
        initial="hidden"
        animate="visible"
        className="mt-8 rounded-xl shadow p-8 text-white bg-sky-950"
      >
        {content}
      </motion.div>
      <motion.div
        variants={checkoutVariants}
        initial="hidden"
        animate="visible"
      >
        <Checkout onAddOrder={orderSubmitHandler} isSubmitting={isSubmitting} />
      </motion.div>
    </>
  );
}
