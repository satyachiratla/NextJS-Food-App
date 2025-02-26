import { redirect } from "@node_modules/next/dist/server/api-utils";
import { logout, setCredentials } from "@redux-store/slices/authSlice";
import { fetchBaseQuery } from "@reduxjs/toolkit/query";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
  credentials: "include",
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("token");

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 500) {
    console.log("sending refresh token");
    const refreshToken = localStorage.getItem("refreshToken");
    console.log("refreshToken--->", refreshToken);
    if (!refreshToken) {
      api.dispatch(logout());
      redirect("/");
      return result;
    }

    const refreshResult = await baseQuery(
      {
        url: "/users/user/refresh-token",
        method: "POST",
        body: { refreshToken },
      },
      api,
      extraOptions
    );
    console.log("refreshResult--->", refreshResult);

    if (refreshResult?.data) {
      const data = refreshResult.data;
      // const userId = api.getState().auth.userId;
      const userId = localStorage.getItem("userId");
      console.log("api", api.getState());
      console.log("userId", userId);
      const newToken = data.token;
      console.log("oldToken", localStorage.getItem("token"));
      console.log("newToken", newToken);

      api.dispatch(
        setCredentials({
          userId,
          token: newToken,
          refreshToken,
        })
      );

      result = await baseQuery(args, api, extraOptions);
    } else {
      console.log("refresh token failed");
      api.dispatch(logout());
      redirect("/");
    }
  }

  return result;
};

export { baseQuery, baseQueryWithReauth };
