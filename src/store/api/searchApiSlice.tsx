import { apiSlice } from "./apiSlice";

interface Source {
  id: string;
  linkId: string;
  lastChapter: string;
  scan: string;
  date: Date;
}

interface SearchData {
  id: string;
  image: string;
  name: string;
  source: Source[];
}

export const searchApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    searchMangas: builder.query<SearchData, string>({
      query: (word) => ({
        url: `/api/search?word=${word}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useSearchMangasQuery } = searchApiSlice;
