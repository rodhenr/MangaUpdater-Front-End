import { apiSlice } from "./apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    uploadAvatar: builder.mutation<string, FormData>({
      query: (file) => ({
        url: "/api/user/avatar",
        method: "POST",
        body: file,
      }),
      invalidatesTags: ["User"],
    }),
    getAvatar: builder.query<string, void>({
      query: () => ({
        url: "/api/user",
        method: "GET",
      }),
      providesTags: ["User"],
    }),
  }),
});

export const { useUploadAvatarMutation, useGetAvatarQuery } = userApiSlice;
