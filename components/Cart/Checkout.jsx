"use client";

import CartContext from "@store/cart-context";
import { useContext, useRef, useState } from "react";

const isEmpty = (value) => value.trim() === "";
const isFiveChars = (value) => value.trim().length === 6;

export default function Checkout({ onAddOrder, isSubmitting }) {
  const [formInputsValidity, setFormInputsValidity] = useState({
    name: true,
    address: true,
    landmark: true,
    pincode: true,
  });

  const cartCtx = useContext(CartContext);
  const nameRef = useRef();
  const addressRef = useRef();
  const landmarkRef = useRef();
  const codeRef = useRef();

  const addOrder = (e) => {
    e.preventDefault();

    if (cartCtx.items.length === 0) {
      alert("Please add items to the cart!");
      setFormInputsValidity({
        name: true,
        address: true,
        landmark: true,
        pincode: true,
      });
      return;
    }

    const enteredName = nameRef.current.value;
    const enteredAddress = addressRef.current.value;
    const enteredLandmark = landmarkRef.current.value;
    const enteredPincode = codeRef.current.value;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredAddressIsValid = !isEmpty(enteredAddress);
    const enteredLandmarkIsValid = !isEmpty(enteredLandmark);
    const enteredPincodeIsValid = isFiveChars(enteredPincode);

    setFormInputsValidity({
      name: enteredNameIsValid,
      address: enteredAddressIsValid,
      landmark: enteredLandmarkIsValid,
      pincode: enteredPincodeIsValid,
    });

    const formIsValid =
      enteredNameIsValid &&
      enteredAddressIsValid &&
      enteredLandmarkIsValid &&
      enteredPincodeIsValid;

    if (!formIsValid) {
      return;
    }

    onAddOrder({
      enteredName,
      enteredAddress,
      enteredLandmark,
      enteredPincode,
    });
  };

  return (
    <section className="mt-12 bg-slate-800 rounded-lg p-8 mb-8">
      <h1 className="text-center text-sky-500 text-2xl font-semibold font-satoshi tracking-wider border-b border-gray-400/50 pb-2">
        Place Order
      </h1>
      <form
        onSubmit={addOrder}
        className="mt-6 flex flex-col space-y-3 mx-auto max-w-md"
      >
        <label className="text-lg text-white font-noto">Your Name</label>
        <input
          ref={nameRef}
          type="text"
          className={`${
            formInputsValidity.name ? "form_input" : "form_invalid"
          }`}
        />
        <label className="text-lg text-white font-noto">Address</label>
        <input
          ref={addressRef}
          type="text"
          className={`${
            formInputsValidity.address ? "form_input" : "form_invalid"
          }`}
        />
        <label className="text-lg text-white font-noto">Landmark</label>
        <input
          ref={landmarkRef}
          type="text"
          className={`${
            formInputsValidity.landmark ? "form_input" : "form_invalid"
          }`}
        />
        <label className="text-lg text-white font-noto">Pincode</label>
        <input
          ref={codeRef}
          type="number"
          className={`${
            formInputsValidity.pincode ? "form_input" : "form_invalid"
          }`}
        />
        <button className="black_btn w-[60%] mx-auto md:w-[50%]">
          {isSubmitting ? `${"Proceeding to Order"}` : "Proceed to Order"}
        </button>
      </form>
    </section>
  );
}
