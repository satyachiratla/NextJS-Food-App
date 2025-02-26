import { useState, useMemo, useEffect } from "react";
import {
  useAddAddressMutation,
  useUpdateAddressMutation,
} from "@redux-store/apis/addressApi";
import useUser from "@hooks/useUser";

export default function AddressForm({ addresses, addressId, setAddressId }) {
  const [createAddress, { isLoading: isCreatingAddress }] =
    useAddAddressMutation();
  const [updateAddress, { isLoading: isUpdatingAddress }] =
    useUpdateAddressMutation();
  const { userId } = useUser();

  const foundAddress = useMemo(() => {
    return addresses?.find((address) => address?._id === addressId);
  }, [addressId]);

  console.log("foundAddress", addressId);

  const [formData, setFormData] = useState({
    name: foundAddress?.name || "",
    address: foundAddress?.address || "",
    landmark: foundAddress?.landmark || "",
    pincode: foundAddress?.pincode || "",
    type: foundAddress?.type || "",
  });

  const btnDisabled = Object.values(formData).some((el) => el === "");

  useEffect(() => {
    if (foundAddress) {
      setFormData({
        name: foundAddress?.name,
        address: foundAddress.address,
        landmark: foundAddress?.landmark,
        pincode: foundAddress?.pincode,
        type: foundAddress?.type,
      });
    }
  }, [foundAddress]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddressType = (e) => {
    setFormData({
      ...formData,
      type: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response;

      if (addressId) {
        response = await updateAddress({
          ...formData,
          id: addressId,
          pincode: Number(formData.pincode),
          creator: userId,
        }).unwrap();
      } else {
        response = await createAddress({
          ...formData,
          creator: userId,
          pincode: Number(formData.pincode),
        }).unwrap();
      }
      console.log("Address added successfully", response);
      if (response?.address) {
        setFormData({
          name: "",
          address: "",
          landmark: "",
          pincode: "",
          type: "",
        });
        document.getElementById("address-form").close();
      }
    } catch (error) {
      console.error("Error adding address:", error);
    }
  };

  const closeModalHandler = () => {
    setFormData({
      name: "",
      address: "",
      landmark: "",
      pincode: "",
      type: "",
    });
    setAddressId(null);
  };

  return (
    <dialog id="address-form" className="modal">
      <div className="modal-box">
        <form method="dialog">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-lg">Add Address</h3>
            <button
              onClick={closeModalHandler}
              className="btn btn-sm btn-circle btn-ghost"
            >
              ✕
            </button>
          </div>
        </form>
        <form onSubmit={handleSubmit}>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Name</span>
            </div>
            <input
              type="text"
              name="name"
              placeholder="Type here"
              className="input input-bordered w-full"
              value={formData.name}
              onChange={handleChange}
            />
          </label>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Address</span>
            </div>
            <input
              type="text"
              name="address"
              placeholder="Type here"
              className="input input-bordered w-full"
              value={formData.address}
              onChange={handleChange}
            />
          </label>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Landmark</span>
            </div>
            <input
              type="text"
              name="landmark"
              placeholder="Type here"
              className="input input-bordered w-full"
              value={formData.landmark}
              onChange={handleChange}
            />
          </label>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Pincode</span>
            </div>
            <input
              type="number"
              name="pincode"
              placeholder="Type here"
              className="input input-bordered w-full"
              value={formData.pincode}
              onChange={handleChange}
            />
          </label>
          <div className="flex items-center gap-2 ml-1">
            <label className="pb-[3px]">Type: </label>
            <div className="form-control">
              <label className="label cursor-pointer space-x-2">
                <span className="label-text">Home</span>
                <input
                  type="radio"
                  name="type"
                  value="Home"
                  className="radio checked:bg-blue-500"
                  checked={formData.type === "Home"}
                  onChange={handleAddressType}
                />
              </label>
            </div>
            <div className="form-control">
              <label className="label cursor-pointer space-x-2">
                <span className="label-text">Work</span>
                <input
                  type="radio"
                  name="type"
                  value="Work"
                  className="radio checked:bg-blue-500"
                  checked={formData.type === "Work"}
                  onChange={handleAddressType}
                />
              </label>
            </div>
            <div className="form-control">
              <label className="label cursor-pointer space-x-2">
                <span className="label-text">Other</span>
                <input
                  type="radio"
                  name="type"
                  value="Other"
                  className="radio checked:bg-blue-500"
                  checked={formData.type === "Other"}
                  onChange={handleAddressType}
                />
              </label>
            </div>
          </div>
          {isCreatingAddress || isUpdatingAddress ? (
            <button className="btn btn-info w-full">
              <span className="loading loading-dots loading-lg"></span>
            </button>
          ) : (
            <button
              type="submit"
              disabled={btnDisabled}
              className="btn btn-info w-full my-2"
            >
              {addressId ? "Update" : "Add"}
            </button>
          )}
        </form>
      </div>
    </dialog>
  );
}
