import OrderItem from "./OrderItem";

export default function OrderItems({ orderItems, date, handleDelete }) {
  return (
    <div>
      {orderItems.map((order, index) => (
        <OrderItem
          key={index}
          order={order}
          date={date}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
}
