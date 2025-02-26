"use client";

import { useGetUserByIdQuery } from "@redux-store/apis/authApi";

const useUser = () => {
  const accessToken = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  const { data: userData, refetch } = useGetUserByIdQuery(userId);
  console.log("data: ", userData);

  const isAuthenticated = !!accessToken;

  return { isAuthenticated, userId, userData, refetch };
};

export default useUser;
