import { useState } from "react";
import DeleteModal from "./DeleteModal";

export default function OrderItem({ order, date, onDelete }) {
  const totalPrice = order.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const [openModal, setOpenModal] = useState(false);

  const openModalHandler = () => {
    setOpenModal(true);
  };

  const closeModalHandler = () => {
    setOpenModal(false);
  };

  return (
    <>
     { openModal && <DeleteModal onCancel={closeModalHandler} onDelete={onDelete} /> }
      {!openModal && (
        <li className="rounded-lg shadow-md p-4 mb-4 bg-gray-900 flex flex-col justify-between md:flex-row">
          <div>
            <h2 className="text-lg font-bold font-inter mb-2 text-orange-500">
              Order:
            </h2>
            <ul className="md:h-[70px] md:bg-gray-800 md:px-2 md:py-2 rounded md:overflow-scroll no-scrollbar">
              {order.map((item) => (
                <li key={item.id} className="mb-1 text-white font-lunasima">
                  {item.name} x{" "}
                  <span className="text-red-300">{item.amount}</span> - ₹
                  {item.price * item.quantity}
                </li>
              ))}
            </ul>
            <p className="mt-2 font-bold font-satoshi text-cyan-500">
              Total Price: ₹{totalPrice}
            </p>
          </div>
          <div className="mt-2 text-sm text-cyan-600 flex flex-col justify-between">
            <div>
              <h3 className="font-bold text-lg text-neutral-50">
                Order Placed
              </h3>
              <p className="font-medium text-gray-300 text-base">{date}</p>
            </div>
            <button onClick={openModalHandler} className="black_btn mx-auto">
              Delete
            </button>
          </div>
        </li>
      )}
    </>
  );
}
