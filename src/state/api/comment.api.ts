import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { WEBSITE_URL } from "@/lib/name";
import type { comment } from "@/types/index";

export const commentApi = createApi({
  reducerPath: "commentApi",
  baseQuery: fetchBaseQuery({
    baseUrl:
      `https://psychic-barnacle-vgwj747wxqjc6xx7-3000.app.github.dev/api/comment`,
  }),
  tagTypes: ["comment"],
  endpoints: (builder) => ({
    getComments: builder.query<comment[], void>({
      query: () => ({
        url: "/read",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          postId: "d116ded5-268f-4971-a85a-0c9925a0af03",
        }),
      }),
      providesTags: ["comment"],
    }),
    getComment: builder.query<comment, string>({
      query: (commentId) => ({
        url: "/read",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          postId: "d116ded5-268f-4971-a85a-0c9925a0af03",
          commentId: commentId,
        }),
      }),
      providesTags: ["comment"],
    }),
    addComment: builder.mutation<comment, comment>({
      query: (comment) => ({
        url: "/create",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(comment),
      }),
      invalidatesTags: ["comment"],
    }),
    updateComment: builder.mutation<comment, comment>({
      query: (comment) => ({
        url: "/update",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(comment),
      }),
      invalidatesTags: ["comment"],
    }),
    deleteComment: builder.mutation<comment, comment>({
      query: (comment) => ({
        url: "/delete",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(comment),
      }),
      invalidatesTags: ["comment"],
    }),
  }),
});

export const {
  useGetCommentsQuery,
  useGetCommentQuery,
  useAddCommentMutation,
  useUpdateCommentMutation,
  useDeleteCommentMutation,
} = commentApi;
