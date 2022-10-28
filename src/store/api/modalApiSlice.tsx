import { apiSlice } from "./apiSlice";

export interface Sources {
  sourceID: string;
  pathID: string;
  chapter: string;
  date: Date;
  scanlator: string;
  follow: boolean;
  sourceName: string;
}

export interface DataModal {
  id: string;
  image: string;
  name: string;
  genres: string[];
  author: string;
  sources: Sources[];
}

export const modalApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getModalManga: builder.query<DataModal, string>({
      query: (mangaID) => ({
        url: `/api/manga/modal?mangaID=${mangaID}`,
        method: "GET",
      }),
      providesTags: ["Modal"],
    }),
  }),
});

export const { useGetModalMangaQuery } = modalApiSlice;
