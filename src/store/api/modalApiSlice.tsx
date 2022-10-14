import { apiSlice } from "./apiSlice";

export interface Sources {
  id: string;
  linkId: string;
  lastChapter: string;
  scan: string;
  date: Date;
}

export interface DataModal {
  id: string;
  image: string;
  name: string;
  author: string;
  sources: Sources[];
  follow: boolean;
}

interface FollowNew {
  mangaId: string;
  sourceId: string;
}

interface ChangeFollow {
  mangaId: string;
  sourceId: string;
  action: string;
  linkId: string;
}

export const modalApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getModalManga: builder.query<DataModal, string>({
      query: (mangaId) => ({
        url: `/api/manga/modal?mangaId=${mangaId}`,
        method: "GET",
      }),
      providesTags: ["Modal"],
    }),
    followNewManga: builder.mutation<void, FollowNew>({
      query: ({ mangaId, sourceId }) => ({
        url: "/api/follow",
        method: "POST",
        body: { mangaId, sourceId },
      }),
      invalidatesTags: ["Modal", "Data"],
    }),
    changeFollow: builder.mutation<void, ChangeFollow>({
      query: ({ mangaId, sourceId, action, linkId }) => ({
        url: "/api/follow",
        method: "PATCH",
        body: { mangaId, sourceId, action, linkId },
      }),
      invalidatesTags: ["Modal", "Data"],
    }),
    deleteFollow: builder.mutation<void, string>({
      query: (mangaId) => ({
        url: "/api/follow",
        method: "DELETE",
        body: { mangaId },
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
