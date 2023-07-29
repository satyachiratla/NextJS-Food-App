import OrderItem from "./OrderItem";
import { motion } from "framer-motion";

export default function OrderItems({ orderItems, date, handleDelete }) {
  const formattedDate = date.slice(0, 10);

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
    <motion.ul variants={container} initial="hidden" animate="visible">
      {orderItems.map((order, index) => (
        <motion.div variants={item}>
          <OrderItem
            key={index}
            order={order}
            date={formattedDate}
            onDelete={handleDelete}
          />
        </motion.div>
      ))}
    </motion.ul>
  );
}
