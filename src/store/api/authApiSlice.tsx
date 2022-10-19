import { apiSlice } from "./apiSlice";

interface LoginData {
  email: string;
  password: string;
}

interface TokenData {
  accessToken: string;
}

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<TokenData, LoginData>({
      query: ({ email, password }) => ({
        url: "/auth/login",
        method: "POST",
        body: { email, password },
      }),
    }),
  }),
});

export const { useLoginMutation } = authApiSlice;
