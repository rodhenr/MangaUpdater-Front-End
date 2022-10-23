import { apiSlice } from "./apiSlice";

interface LoginData {
  email: string;
  password: string;
}

interface RegisterData {
  user: string;
  password: string;
  email: string;
}

interface TokenData {
  accessToken: string;
  user: string;
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
    register: builder.mutation<void, RegisterData>({
      query: ({ email, password, user }) => ({
        url: "/auth/login",
        method: "POST",
        body: { email, password, user },
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } = authApiSlice;
