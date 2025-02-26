"use client";

import { useState } from "react";
import AddressesList from "@components/Addresses/AddressesList";
import AddressForm from "@components/Addresses/AddressForm";
import useUser from "@hooks/useUser";
import { useGetAddressByUserIdQuery } from "@redux-store/apis/addressApi";

export default function AddressesPage() {
  const { userId } = useUser();
  const {
    data: addresses,
    isLoading,
    isError,
    error,
  } = useGetAddressByUserIdQuery(userId);
  const [addressId, setAddressId] = useState(null);
  console.log("Addresses", addresses);

  const openAddressFormHandler = () => {
    document.getElementById("address-form").showModal();
  };

  const onSetAddressId = (id) => {
    setAddressId(id);
  };

  return (
    <section className="mt-32 w-full">
      <h1 className="text-center text-sky-500 font-inter tracking-wider font-bold text-3xl md:text-4xl">
        Addresses
      </h1>
      <AddressesList
        addresses={addresses?.addresses}
        isLoading={isLoading}
        isError={isError}
        error={error}
        onSetAddressId={onSetAddressId}
      />
      <div className="flex justify-center mt-5">
        <button
          type="button"
          onClick={openAddressFormHandler}
          className="btn btn-info"
        >{`Add ${
          addresses?.addresses?.length === 0 ? "" : "New"
        } Address`}</button>
      </div>
      <AddressForm
        addresses={addresses?.addresses}
        addressId={addressId}
        setAddressId={setAddressId}
      />
    </section>
  );
}
