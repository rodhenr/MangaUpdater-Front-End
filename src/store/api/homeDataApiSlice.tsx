import { apiSlice } from "./apiSlice";

interface MangaData {
  image: string;
  name: string;
  author: string;
  sources: {
    mangaId: string;
    chapter: string;
    id: string;
    linkId: string;
    lastChapter: string;
    scan: string;
    date: Date;
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
