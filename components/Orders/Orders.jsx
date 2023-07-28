"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Skeleton from "@components/UI/Skeleton";
import OrderItems from "./OrderItems";
import { toast } from "react-hot-toast";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchOrders = async () => {
      setIsLoading(true);
      toast.loading("Fetching Orders 🚀", { id: "1" });
      const res = await fetch(`/api/users/${session?.user.id}/orders`, {
        next: { revalidate: 10 },
      });
      toast.success("Orders fetched Successfully 😀", { id: "1" });
      if (!res.ok) {
        toast.error("Failed to fetch Orders 😞", { id: "1" });
        throw new Error("Failed to fetch Orders!");
      }
      const data = await res.json();
      setOrders(data);
      setIsLoading(false);
    };

    if (session?.user.id) fetchOrders();
  }, [session]);

  const deleteHandler = async (order) => {
    try {
      toast.loading("Deleting Order 🚀", { id: "1" });
      await fetch(`/api/orders/${order._id}`, { method: "DELETE" });
      toast.success("Order deleted Successfully 🙂", { id: "1" });
      const filteredOrders = orders.filter((o) => o._id !== order._id);
      setOrders(filteredOrders);
    } catch (error) {
      toast.error("Failed to delete Order!", { id: "1" });
      console.log(error);
    }
  };

  let content;

  if (orders.length > 0 && !isLoading) {
    content = (
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {orders.map((order) => (
          <OrderItems
            key={order._id}
            orderItems={[order.orderedItems]}
            date={order.date}
            handleDelete={() => deleteHandler(order)}
          />
        ))}
      </div>
    );
  } else if (!isLoading && orders.length < 1) {
    content = (
      <p className="mt-8 max-w-xl mx-auto rounded-xl bg-teal-800 p-6 text-cyan-400 font-noto text-lg tracking-wide">
        No Orders placed Yet! <br /> Explore our menu and customize your order
        for a delightful dining experience.
      </p>
    );
  } else if (isLoading) {
    content = (
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {[...Array(4).keys()].map((n) => (
          <Skeleton key={n} />
        ))}
      </div>
    );
  }

  return <>{content}</>;
}
