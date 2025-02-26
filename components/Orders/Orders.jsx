"use client";

import Skeleton from "@components/UI/Skeleton";
import OrderItems from "./OrderItems";
import { useGetOrdersByUserIdQuery } from "@redux-store/apis/ordersApi";
import useUser from "@hooks/useUser";
import OrderItem from "./OrderItem";

export default function Orders() {
  const { userId } = useUser();
  const { data: orders, isLoading } = useGetOrdersByUserIdQuery(userId);

  console.log("orders--->", orders);

  let content;

  if (orders?.orders?.length > 0 && !isLoading) {
    content = (
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {orders?.orders?.map((order) => (
          <OrderItem
            key={order._id}
            id={order._id}
            orderItems={order?.items}
            date={order?.createdAt}
          />
        ))}
      </div>
    );
  } else if (!isLoading && orders?.orders?.length === 0) {
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
