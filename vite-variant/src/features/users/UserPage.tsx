import { useAppSelector } from "../../app/hooks";
import { selectAllPosts } from "../posts/postSlice";
import { selectUserById } from "../users/usersSlice";

import { createSelector } from "@reduxjs/toolkit";
import { useGetPostsQuery } from "../api/apiSlice";

export const UserPage = ({ userId }: { userId: string }) => {
  // const { userId } = match.params

  const user = useAppSelector((state) => selectUserById(state, userId));
  const selectPostsForUser = useMemo(() => {
    const emptyArray: any[] = [];
    return createSelector(
      (res) => res.data,
      (res, userId) => userId,
      (data, userId) =>
        data?.filter((post) => post.user === userId) ?? emptyArray
    );
  });

  // const postsForUser = useAppSelector((state) => {
  //   const allPosts = selectAllPosts(state);
  //   return allPosts.posts.filter((post) => post.user === userId);
  // });

  const { postsForUser } = useGetPostsQuery(undefined, {
    selectFromResult: (result) => ({
      ...result,
      postsForUser: selectPostsForUser(result, userId),
    }),
  });

  const postTitles = postsForUser.map((post) => (
    <li key={post.id}>
      {/* <Link to={`/posts/${post.id}`}>{post.title}</Link> */}
      <p id={`/posts/${post.id}`}>{post.title}</p>
    </li>
  ));

  return (
    <section>
      <h2>{user.name}</h2>

      <ul>{postTitles}</ul>
    </section>
  );
};
