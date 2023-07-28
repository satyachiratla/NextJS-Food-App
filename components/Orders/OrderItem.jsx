export default function OrderItem({ order, date, onDelete }) {
  const totalPrice = order.reduce(
    (acc, item) => acc + item.price * item.amount,
    0
  );

  return (
    <div className="rounded-lg shadow-md p-4 mb-4 bg-gray-900 flex flex-col justify-between md:flex-row">
      <div>
        <h2 className="text-lg font-bold font-inter mb-2 text-orange-500">
          Order:
        </h2>
        <ul className="md:h-[70px] md:bg-gray-800 md:px-4 md:py-2 rounded md:overflow-scroll no-scrollbar">
          {order.map((item) => (
            <li key={item.id} className="mb-1 text-white font-lunasima">
              {item.name} x <span className="text-red-300">{item.amount}</span>{" "}
              - ₹{item.price * item.amount}
            </li>
          ))}
        </ul>
        <p className="mt-2 font-bold font-satoshi text-cyan-500">
          Total Price: ₹{totalPrice}
        </p>
      </div>
      <div className="mt-2 text-sm text-cyan-600 flex flex-col justify-between">
        <div>
          <h3 className="font-bold text-lg text-neutral-50">Order Placed</h3>
          <p className="font-medium text-gray-300 text-base">{date}</p>
        </div>
        <button onClick={onDelete} className="black_btn mx-auto">
          Delete
        </button>
      </div>
    </div>
  );
}
