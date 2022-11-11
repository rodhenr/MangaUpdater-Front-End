import { apiSlice } from "./apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    uploadAvatar: builder.mutation<void, FormData>({
      query: (file) => ({
        url: "/api/user/avatar",
        method: "POST",
        body: file,
      }),
    }),
  }),
});

export const { useUploadAvatarMutation } = userApiSlice;
