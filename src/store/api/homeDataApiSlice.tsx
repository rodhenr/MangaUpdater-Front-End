import { apiSlice } from "./apiSlice";

interface MangaData {
  image: string;
  name: string;
  author: string;
  genres: string;
  sources: {
    sourceID: string;
    pathID: string;
    chapter: string;
    date: Date;
    scanlator: string;
  };
}

export const homeDataApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMangas: builder.query<MangaData, void>({
      query: () => ({
        url: "/api/manga",
        method: "GET",
      }),
      providesTags: ["Data"],
    }),
  }),
});

export const { useGetMangasQuery } = homeDataApiSlice;
