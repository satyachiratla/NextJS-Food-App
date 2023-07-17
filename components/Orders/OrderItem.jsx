export default function OrderItem({ name, price, date }) {
  return (
    <li className="border border-gray-100 text-white rounded-md bg-gray-900 p-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="pb-3 font-lunasima">{name}</h1>
          <h3 className="text-cyan-500">Total Price: ₹{price}</h3>
        </div>
        <div>
          <h2 className="pb-3">Order Placed</h2>
          <span className="">{date}</span>
        </div>
      </div>
      {/* <div className="mt-4">
        <button onClick={handleDelete} className="black_btn mx-auto">Delete</button>
      </div> */}
    </li>
  );
}
