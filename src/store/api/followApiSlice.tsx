import { apiSlice } from "./apiSlice";

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
  useChangeFollowMutation,
  useFollowNewMangaMutation,
  useDeleteFollowMutation,
} = modalApiSlice;
