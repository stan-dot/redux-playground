// Import the RTK Query methods from the React-specific entry point
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define our single API slice object
export const apiSlice = createApi({
  // The cache reducer expects to be added at `state.api` (already default - this is optional)
  reducerPath: "api",
  // All of our requests will have URLs starting with '/fakeApi'
  baseQuery: fetchBaseQuery({ baseUrl: "/fakeApi" }),
  tagTypes: ["Post"],
  // The "endpoints" represent operations and requests for this server
  endpoints: (builder) => ({
    // The `getPosts` endpoint is a "query" operation that returns data
    getUsers: builder.query({ query: () => "/users" }),
    getPosts: builder.query({
      // The URL for the request is '/fakeApi/posts'
      query: () => "/posts",
      providesTags: (result = [], error, arg) => [
        "Post",
        ...result.map(({ id }) => ({ type: "Post", id })),
      ],
    }),
    getPost: builder.query({
      query: (postId) => `/posts/${postId}`,
      providesTags: (result, error, arg) => [{ type: "Post", id: arg }],
    }),
    addNewPost: builder.mutation({
      query: (initialPost) => ({
        url: "/posts",
        method: "POST",
        body: initialPost,
      }),
      invalidatesTags: ["Post"],
    }),
    editPost: builder.mutation({
      query: (post) => ({
        url: `/posts/${post.id}`,
        method: "PATCH",
        body: post,
      }),
      providesTags: (_result, _error, arg) => [{ type: "Post", id: arg }],
    }),
    addReaction: builder.mutation({
      query: ({ postId, reaction }) => ({
        url: `posts/${postId}/reactions`,
        method: "POST",
        body: { reaction },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Post", id: arg.postId },
      ],
    }),
    async onQueryStarted({ postId, reaction }, { dispatch, queryFulfilled }) {
      const patchResult = dispatch(
        apiSlice.util.updateQueryData("getPosts", undefined, (draft) => {
          const post = draft.find((post) => post.id === postId);
          if (post) {
            post.reactions[reaction]++;
          }
        })
      );
      try {
        await queryFulfilled;
      } catch {
        patchResult.undo();
      }
    },
  }),
});

// Export the auto-generated hook for the `getPosts` query endpoint
export const {
  useGetPostsQuery,
  useGetPostQuery,
  useAddNewPostMutation,
  useEditPostMutation,
  useAddReactionMutation,
} = apiSlice;
