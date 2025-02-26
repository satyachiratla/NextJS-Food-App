import toast from "@node_modules/react-hot-toast/dist";
import { useDeleteAddressMutation } from "@redux-store/apis/addressApi";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

export default function AddressCard({ address, onSetAddressId }) {
  const [deleteAddress] = useDeleteAddressMutation();
  const openAddressFormHandler = () => {
    onSetAddressId(address?.id);
    document.getElementById("address-form").showModal();
  };

  const deleteAddressHandler = async () => {
    try {
      const response = await deleteAddress(address?._id);
      toast.success(response?.data?.message);
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };

  return (
    <div className="bg-sky-950 p-5 rounded-xl shadow-lg max-w-sm flex justify-between">
      <div>
        <h3 className="text-sky-500 font-inter font-semibold text-lg">
          {address.name}
        </h3>
        <p className="text-gray-300 font-inter text-sm">{address.address}</p>
        <p className="text-gray-300 font-inter text-sm">{address.landmark}</p>
      </div>
      <div className="flex flex-col justify-between items-end">
        <div>
          <p className="badge badge-accent">{address.type}</p>
          <p className="text-gray-300 font-inter text-sm">{address.pincode}</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="tooltip tooltip-bottom" data-tip="Edit">
            <FaEdit
              className="text-cyan-400 cursor-pointer"
              onClick={openAddressFormHandler}
            />
          </div>
          <div className="tooltip tooltip-bottom" data-tip="Delete">
            <MdDelete
              className="text-red-500 cursor-pointer"
              onClick={deleteAddressHandler}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
