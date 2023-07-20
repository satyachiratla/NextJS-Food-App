export default function OrderItem({ order, date, id, onDelete }) {
  const totalPrice = order.reduce(
    (acc, item) => acc + item.price * item.amount,
    0
  );

  const deleteHandler = async () => {
    try {
      await fetch(`/api/orders/${id}`, { method: "DELETE" });
      onDelete(id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="border rounded-lg shadow-md p-4 mb-4 bg-gray-900 flex flex-col justify-between md:flex-row">
      <div>
        <h2 className="text-lg font-bold font-inter mb-2 text-orange-500">
          Order:
        </h2>
        <ul className="md:h-14 md:bg-gray-800 md:pr-2 rounded md:overflow-scroll">
          {order.map((item) => (
            <li key={item.id} className="mb-1 text-white font-lunasima">
              {item.name} x <span className="text-red-300">{item.amount}</span> - ₹{item.price * item.amount}
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
        <button onClick={deleteHandler} className="black_btn mx-auto">
          Delete
        </button>
      </div>
    </div>
    // <li className="border border-gray-100 text-white rounded-md bg-gray-900 px-6 pt-6 pb-3">
    //   <div className="flex justify-between items-center">
    //     <div>
    //       <h1 className="pb-3 font-lunasima">{name}</h1>
    //       <h3 className="text-cyan-500">Total Price: ₹{price}</h3>
    //     </div>
    //     <div>
    //       <h2 className="pb-3">Order Placed</h2>
    //       <span className="">{date}</span>
    //     </div>
    //   </div>
    //   <div className="mt-4">
    //     <button onClick={handleDelete} className="black_btn mx-auto">Delete</button>
    //   </div>
    // </li>
  );
}
