import OrderItem from "./OrderItem";

export default function OrderItems({ orderItems, date, handleDelete }) {

  const formattedDate = date.slice(0, 10)

  return (
    <div>
      {orderItems.map((order, index) => (
        <OrderItem
          key={index}
          order={order}
          date={formattedDate}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
}
