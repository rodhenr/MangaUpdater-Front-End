import { apiSlice } from "./apiSlice";

interface Sources {
  sourceID: string;
  pathID: string;
  chapter: string;
  date: Date;
  scanlator: string;
}

export interface Data {
  image: string;
  name: string;
  mangaID: string;
  sources: Sources[];
}

export const homeDataApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMangas: builder.query<Data[], void>({
      query: () => ({
        url: "/api/manga",
        method: "GET",
      }),
      providesTags: ["Data"],
    }),
  }),
});

export const { useGetMangasQuery } = homeDataApiSlice;
