import { EntityId } from "@reduxjs/toolkit";
import classnames from "classnames";
import { useAppSelector } from "../../app/hooks";
import { Spinner } from "../../components/Spinner";
import { PostAuthor } from "./PostAuthor";
import { ReactionButtons } from "./ReactionButtons";
import { TimeAgo } from "./TimeAgo";
import { selectPostIds } from "./postSlice";

import { useGetPostsQuery } from "../api/apiSlice";
import { Key } from "react";

let PostExcerpt = ({ post }) => {
  return (
    <article className="post-excerpt">
      <h3>{post.title}</h3>
      <div>
        <PostAuthor userId={post.user} />
        <TimeAgo timestamp={post.date} />
      </div>
      <p className="post-content">{post.content.substring(0, 100)}</p>

      <ReactionButtons post={post} />
      {/* <Link to={`/posts/${post.id}`} className="button muted-button">
        View Post
      </Link> */}
    </article>
  );
};

export const PostsList = () => {
  const {
    data: posts = [],
    isLoading,
    isSuccess,
    isError,
    error,
    refetch,
  } = useGetPostsQuery();
  // const orderedPostIds: EntityId[] = useAppSelector(selectPostIds);

  const sortedPosts = useMemo(() => {
    const sortedPosts = posts.slice();
    sortedPosts.sort((a, b) => b.date.localeCompare(a.date));
    return sortedPosts;
  }, [posts]);

  let content;
  if (isLoading) {
    content = <Spinner text="loading..." />;
  } else if (isSuccess) {
    // if (orderedPostIds[0] === undefined) {
    //   content = <p> undefined posts</p>;
    // } else {
    // console.log(orderedPostIds);
    // content = orderedPostIds.map((p) => <PostExcerpt key={p} post={p} />);
    const renderedPosts = sortedPosts.map(
      (post: { id: Key | null | undefined }) => (
        <PostExcerpt key={post.id} post={post} />
      )
    );
    const containerClassname = classnames("posts-container", {
      disabled: isFetching,
    });
    content = <div className={containerClassname}>{renderedPosts}</div>;
    // }
  } else if (isError) {
    content = <div>{error.toString()}</div>;
  }
  return (
    <section className="posts-list">
      {" "}
      <h2>Posts</h2>
      <button onClick={refetch}>Refetch Posts</button>
      {content}
    </section>
  );
};
