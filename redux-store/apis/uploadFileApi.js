import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./apiConfig";

export const fileUploadApi = createApi({
  reducerPath: "fileUploadApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["FileUpload"],
  endpoints: (builder) => ({
    fileUpload: builder.mutation({
      query: (fileUploadData) => ({
        url: "upload",
        method: "POST",
        body: fileUploadData,
      }),
    }),
  }),
});

export const { useFileUploadMutation } = fileUploadApi;
