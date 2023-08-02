"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { toast } from "react-hot-toast";

export default function MealItem({
  id,
  name,
  desc,
  price,
  image,
  onAddToCart,
}) {
  const [amountIsValid, setAmountIsValid] = useState(true);
  // const [showFullText, setShowFullText] = useState(false);

  const { data: session } = useSession();

  // const maxWords = 8;
  // const words = desc.split(" ");
  // const truncatedText = words.slice(0, maxWords).join(" ");

  const inputRef = useRef();

  // const handleMouseEnter = () => {
  //   setShowFullText(true);
  // };

  // const handleMouseLeave = () => {
  //   setShowFullText(false);
  // };

  // const description = (
  //   <div>
  //     <p className="font-lunasima font-extralight">
  //       {showFullText ? desc : `${truncatedText + "..."}`}
  //     </p>
  //     {showFullText}
  //   </div>
  // );

  const submitHandler = (e) => {
    e.preventDefault();

    const enteredAmount = inputRef.current.value;
    const enteredNumber = +enteredAmount;

    if (
      enteredAmount.trim().length === 0 ||
      enteredNumber < 1 ||
      enteredNumber > 5
    ) {
      setAmountIsValid(false);
      return;
    }

    onAddToCart({
      id,
      name,
      price,
      amount: enteredNumber,
    });
    toast.success("Item Added! Please checkout the Cart🛒", { id: "1" });
  };

  return (
    <li>
      <div className="group relative cursor-pointer rounded-t-lg items-center justify-center overflow-hidden transition-shadow hover:shadow-xl hover:shadow-black/30">
        <div className="h-72 w-full md:h-72 md:w-96">
          <Image
            className="h-full w-full transition-transform duration-500 group-hover:rotate-3 group-hover:scale-125"
            src={image}
            alt="item"
            layout="fill"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent group-hover:from-black/70 group-hover:via-black/60 group-hover:to-black/70"></div>
        <div className="absolute inset-0 flex translate-y-[60%] flex-col justify-center px-9 text-center transition-all duration-500 group-hover:translate-y-0">
          <p className="mb-3 text-lg italic text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            {desc}
          </p>
        </div>
      </div>
      <div className="bg-teal-950 rounded-b-lg">
        <div className="flex items-center justify-around py-4">
          <h1 className="font-bold text-xl font-noto text-white">{name}</h1>
          <span className="font-light text-red-600 text-xl">₹{price}</span>
        </div>
        {session?.user && (
          <div className="pb-4">
            <form
              onSubmit={submitHandler}
              className="flex justify-around items-center"
            >
              <input
                ref={inputRef}
                type="number"
                min="1"
                max="5"
                step="1"
                defaultValue={1}
                className="border-2 border-gray-300 text-black rounded w-12 pl-2"
              />
              <button type="submit" className="black_btn">
                Add to Cart
              </button>
              {!amountIsValid && <p>Please enter a valid amount(1-5)</p>}
            </form>
          </div>
        )}
      </div>
    </li>
  );
}

{
  /* <li
onMouseEnter={handleMouseEnter}
onMouseLeave={handleMouseLeave}
className="relative overflow-hidden max-w-sm mx-auto h-auto w-80 bg-teal-950 text-white rounded-lg  shadow-lg transition duration-300 ease-in-out hover:scale-105 hover:bg-white hover:text-black"
>
<Image
  className="w-full h-60 rounded-t-lg"
  src={image}
  alt="item"
  height={100}
  width={100}
/>
<div className="px-6 pt-4 pb-2">
  <div className="flex justify-between items-center mb-2">
    <div className="font-bold text-xl font-noto">{name}</div>
    <span className="font-light text-red-600 text-xl">₹{price}</span>
  </div>
  {description}
</div>
{session?.user && (
  <div className="px-6 pt-2 pb-4">
    <form
      onSubmit={submitHandler}
      className="flex justify-center space-x-4"
    >
      <input
        ref={inputRef}
        type="number"
        min="1"
        max="5"
        step="1"
        defaultValue={1}
        className="border-2 border-gray-300 text-black rounded w-12 pl-2"
      />
      <button type="submit" className="black_btn">
        Add to Cart
      </button>
      {!amountIsValid && <p>Please enter a valid amount(1-5)</p>}
    </form>
  </div>
)}
</li> */
}
