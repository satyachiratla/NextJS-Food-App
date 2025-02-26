import { useState } from "react";
import useUser from "@hooks/useUser";
import { useGetAddressByUserIdQuery } from "@redux-store/apis/addressApi";
import { useAddOrderMutation } from "@redux-store/apis/ordersApi";
import toast from "@node_modules/react-hot-toast/dist";
import { useRouter } from "@node_modules/next/navigation";

export default function ChooseAddress({ items, totalPrice }) {
  const { userId } = useUser();
  const { data: addresses } = useGetAddressByUserIdQuery(userId);
  const [createOrder, { isLoading: isCreatingOrder }] = useAddOrderMutation();
  const [selectedAddress, setSelectedAddress] = useState(null);
  const router = useRouter();
  console.log("address", addresses);

  const handleSelectAddress = (address) => {
    setSelectedAddress(address);
  };

  const handleSubmitOrder = async (e) => {
    e.preventDefault();

    try {
      const response = await createOrder({
        items,
        totalPrice,
        address: selectedAddress?._id,
        creator: userId,
      }).unwrap();
      if (response?.order) {
        toast.success("Order placed Successfully 😃", { id: "1" });
        router.push("/orders");
      }
    } catch (err) {
      toast.error("Failed to place Order 😞", { id: "1" });
      console.error("Creating order failed", err);
    }
  };

  return (
    <section className="mt-12 bg-slate-800 rounded-lg p-8 mb-8 h-[560px] overflow-auto max-w-2xl mx-auto flex flex-col items-center">
      <h1 className="text-center text-sky-500 text-2xl font-semibold font-satoshi tracking-wider border-b border-gray-400/50 pb-2">
        Choose Your Address
      </h1>
      <ul className="pt-5 space-y-4 flex flex-col items-center">
        {addresses?.addresses?.map((address) => (
          <li
            key={address?._id}
            onClick={() => handleSelectAddress(address)}
            className={`${
              selectedAddress?._id === address?._id
                ? "bg-sky-950"
                : "bg-slate-700"
            } p-5 rounded-xl shadow-lg max-w-sm flex justify-between w-96 cursor-pointer`}
          >
            <div>
              <h3 className="text-sky-500 font-inter font-semibold text-lg">
                {address.name}
              </h3>
              <p className="text-gray-300 font-inter text-sm">
                {address.address}
              </p>
              <p className="text-gray-300 font-inter text-sm">
                {address.landmark}
              </p>
            </div>
            <div>
              <p className="badge badge-accent">{address.type}</p>
              <p className="text-gray-300 font-inter text-sm">
                {address.pincode}
              </p>
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-4">
        {isCreatingOrder ? (
          <button className="btn btn-info w-96">
            <span className="loading loading-dots loading-lg"></span>
          </button>
        ) : (
          <button
            disabled={!selectedAddress || items?.length === 0}
            type="button"
            onClick={handleSubmitOrder}
            className="btn btn-info w-96 disabled:bg-gray-600 disabled:cursor-not-allowed disabled:text-white"
          >
            Proceed to Order
          </button>
        )}
      </div>
    </section>
  );
}
