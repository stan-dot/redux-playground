import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useGetPostQuery, useEditPostMutation } from "../api/apiSlice";

export const EditPostForm = ({ postId }: { postId: string }) => {
  // const { postId } = match.params

  // const post = useAppSelector((state) => selectPostById(state, postId))!;
  const { data: post } = useGetPostQuery(postId);
  const [updatePost, { isLoading }] = useEditPostMutation();
  // NOTE must always be defined

  const [title, setTitle] = useState<string>(post.title);
  const [content, setContent] = useState<string>(post.content);

  // const dispatch = useDispatch();

  const onTitleChanged = (e: React.ChangeEvent<HTMLInputElement>) =>
    setTitle(e.target.value);
  const onContentChanged = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setContent(e.target.value);

  const onSavePostClicked = () => {
    if (title && content) {
      // dispatch(postUpdated({ id: postId, title, content }));
      await updatePost({ id: postId, title, content });
    }
  };

  return (
    <section>
      <h2>Edit Post</h2>
      <form>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          placeholder="What's on your mind?"
          value={title}
          onChange={onTitleChanged}
        />
        <label htmlFor="postContent">Content:</label>
        <textarea
          id="postContent"
          name="postContent"
          value={content}
          onChange={onContentChanged}
        />
      </form>
      <button type="button" onClick={onSavePostClicked}>
        Save Post
      </button>
    </section>
  );
};
