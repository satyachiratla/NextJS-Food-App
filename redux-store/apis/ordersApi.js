import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./apiConfig";

export const ordersApi = createApi({
  reducerPath: "ordersApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Orders"],
  endpoints: (builder) => ({
    getOrdersByUserId: builder.query({
      query: (userId) => `/orders/user/${userId}`,
      providesTags: ["Orders"],
    }),
    getOrderByOrderId: builder.query({
      query: (orderId) => `/orders/${orderId}`,
      providesTags: ["Orders"],
    }),
    addOrder: builder.mutation({
      query: (orderData) => ({
        url: "/orders",
        method: "POST",
        body: orderData,
      }),
      invalidatesTags: ["Orders"],
    }),
    deleteOrder: builder.mutation({
      query: (oid) => ({
        url: `orders/${oid}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Orders"],
    }),
  }),
});

export const {
  useGetOrdersByUserIdQuery,
  useGetOrderByOrderIdQuery,
  useAddOrderMutation,
  useDeleteOrderMutation,
} = ordersApi;
