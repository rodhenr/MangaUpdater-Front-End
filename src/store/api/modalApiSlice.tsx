import { apiSlice } from "./apiSlice";

export interface Sources {
  sourceID: string;
  pathID: string;
  chapter: string;
  date: Date;
  scanlator: string;
  follow: boolean;
}

export interface DataModal {
  id: string;
  image: string;
  name: string;
  genres: string;
  author: string;
  sources: Sources[];
}

interface FollowNew {
  mangaID: string;
  sourceID: string;
}

interface ChangeFollow {
  mangaID: string;
  sourceID: string;
  action: string;
  pathID: string;
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
    followNewManga: builder.mutation<void, FollowNew>({
      query: ({ mangaID, sourceID }) => ({
        url: "/api/follow",
        method: "POST",
        body: { mangaID, sourceID },
      }),
      invalidatesTags: ["Modal", "Data"],
    }),
    changeFollow: builder.mutation<void, ChangeFollow>({
      query: ({ action, pathID, sourceID, mangaID }) => ({
        url: "/api/follow",
        method: "PATCH",
        body: { action, pathID, sourceID, mangaID },
      }),
      invalidatesTags: ["Modal", "Data"],
    }),
    deleteFollow: builder.mutation<void, string>({
      query: (mangaID) => ({
        url: "/api/follow",
        method: "DELETE",
        body: { mangaID },
      }),
      invalidatesTags: ["Modal", "Data"],
    }),
  }),
});

export const {
  useGetModalMangaQuery,
  useChangeFollowMutation,
  useFollowNewMangaMutation,
  useDeleteFollowMutation,
} = modalApiSlice;
