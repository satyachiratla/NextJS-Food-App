"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import OrderItem from "./OrderItem";
import Skeleton from "@components/UI/Skeleton";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { data: session } = useSession();

  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  const fullDate = `${day}-${month}-${year}`;

  useEffect(() => {
    const fetchOrders = async () => {
      setIsLoading(true);
      const res = await fetch(`/api/users/${session?.user.id}/orders`, {
        next: { revalidate: 10 },
      });

      if (!res.ok) throw new Error("Failed to fetch Orders!");
      const data = await res.json();
      setOrders(data);
      setIsLoading(false);
    };

    if (session?.user.id) fetchOrders();
  }, [session]);

  const orderedItems = orders.map((order) => order.orderedItems);

  const handleDeleteOrder = (deletedOrderId) => {
    const updatedOrders = orders.filter(
      (order, index) => index !== deletedOrderId
    );
    setOrders(updatedOrders);
  };

  let content;

  if (orders.length > 0 && !isLoading) {
    content = (
      <div className="mt-8 grid gap-x-4 gap-y-4 md:grid-cols-2">
        {orderedItems.map((order, index) => (
          <OrderItem
            key={index}
            id={index}
            order={order}
            date={fullDate}
            onDelete={handleDeleteOrder}
          />
        ))}
      </div>
    );
  } else if (!isLoading) {
    content = (
      <p className="mt-8 rounded-xl border border-gray-400 bg-teal-800 p-6 text-cyan-400 font-noto text-lg tracking-wide">
        No Orders placed Yet! <br /> Explore our menu and customize your order
        for a delightful dining experience.
      </p>
    );
  }

  return (
    <>
      <div className="my-8 grid gap-x-4 gap-y-4 md:grid-cols-2">
        {isLoading &&
          [...Array(3).keys()].map((n) => <Skeleton key={n} index={n} />)}
      </div>
      {content}
    </>
  );
}
