import OrderItem from "./OrderItem";

export default function OrderItems({ orderItems, date }) {
  const formattedDate = date.slice(0, 10);

  const totalPrice = orderItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <>
      <ul>
        {orderItems.map((order, index) => (
          <OrderItem
            key={index}
            order={order}
            orders={orderItems}
            date={formattedDate}
            totalPrice={totalPrice}
          />
        ))}
      </ul>
    </>
  );
}
