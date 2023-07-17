"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import OrderItem from "./OrderItem";
import Skeleton from "@components/UI/Skeleton";
import NoOrders from "./NoOrders";

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

  const items = [];
  const orderedItems = orders.map((order) => order.orderedItems);

  for (const order of orderedItems) {
    for (const key in order) {
      items.push(order[key]);
    }
  }

  // const deleteHandler = async (item) => {
  //   try {
  //     await fetch(`/api/orders/${item.id}`, { method: "DELETE" });

  //     const filteredOrders = items.filter((i) => i.id !== item.id);

  //     setOrders(filteredOrders)
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  return (
    <>
      {!isLoading && <NoOrders ordersLength={orders.length === 0} />}
      <ul className="mt-8 mb-8 grid gap-x-8 gap-y-4 md:grid-cols-2 lg:grid-cols-3">
        {!isLoading &&
          items.map((item) => (
            <OrderItem
              key={item.id}
              name={item.name}
              price={item.price}
              date={fullDate}
              // handleDelete={() => deleteHandler(item)}
            />
          ))}
        {isLoading &&
          [...Array(3).keys()].map((n) => <Skeleton key={n} index={n} />)}
      </ul>
    </>
  );
}
