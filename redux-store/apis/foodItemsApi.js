import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const foodItemsApi = createApi({
  reducerPath: "foodItemsApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL }),
  tagTypes: ["FoodItems", "Categories"],
  endpoints: (builder) => ({
    getFoodItems: builder.query({
      query: () => "fooditems",
      providesTags: ["FoodItems"],
    }),
    getCategories: builder.query({
      query: () => "categories",
      providesTags: ["Categories"],
    }),
    getFoodItemsByCategory: builder.query({
      query: (categoryName) => `fooditems/category/${categoryName}`,
      providesTags: ["FoodItems"],
    }),
  }),
});

export const {
  useGetFoodItemsQuery,
  useGetCategoriesQuery,
  useGetFoodItemsByCategoryQuery,
} = foodItemsApi;
