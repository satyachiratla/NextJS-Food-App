import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./apiConfig";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Auth"],
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => "users",
      providesTags: ["Auth"],
    }),
    getUserById: builder.query({
      query: (uid) => `users/${uid}`,
      providesTags: ["Auth"],
    }),
    signup: builder.mutation({
      query: (signupData) => ({
        url: "users/signup",
        method: "POST",
        body: signupData,
      }),
      invalidatesTags: ["Auth"],
    }),
    signin: builder.mutation({
      query: (signinData) => ({
        url: "users/signin",
        method: "POST",
        body: signinData,
      }),
      invalidatesTags: ["Auth"],
    }),
    updateProfile: builder.mutation({
      query: (profileData) => ({
        url: `users/${profileData.id}`,
        method: "PATCH",
        body: profileData,
      }),
      invalidatesTags: ["Auth"],
    }),
    refreshToken: builder.mutation({
      query: (tokenObj) => ({
        url: "users/user/refresh-token",
        method: "POST",
        body: tokenObj,
      }),
    }),
    forgotPassword: builder.mutation({
      query: (email) => ({
        url: "users/forgot-password",
        method: "POST",
        body: email,
      }),
    }),
    resetPassword: builder.mutation({
      query: (resetObj) => ({
        url: "users/reset-password",
        method: "POST",
        body: resetObj,
      }),
    }),
    logout: builder.mutation({
      query: (logoutObj) => ({
        url: "users/user/logout",
        method: "POST",
        body: logoutObj,
      }),
    }),
    deleteUser: builder.mutation({
      query: (uid) => ({
        url: `users/${uid}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useSignupMutation,
  useSigninMutation,
  useGetUserByIdQuery,
  useUpdateProfileMutation,
  useRefreshTokenMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useLogoutMutation,
  useDeleteUserMutation,
} = authApi;
