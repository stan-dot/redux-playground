import React from "react";
import { RootState } from "../../app/store";
import { useAppDispatch } from "../../app/hooks";

import { useAddReactionMutation } from "../api/apiSlice";

const reactionEmoji = {
  thumbsUp: "👍",
  hooray: "🎉",
  heart: "❤️",
  rocket: "🚀",
  eyes: "👀",
};

export const ReactionButtons = ({ post }: { post: any }) => {
  // const dispatch = useAppDispatch();
  const [addReaction] = useAddReactionMutation();
  const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
    return (
      <button
        key={name}
        type="button"
        className="muted-button reaction-button"
        onClick={() =>
          // dispatch(reactionAdded({ postId: post.id, reaction: name }))
          addReaction({ postId: post.id, reaction: reactionName })
        }
      >
        {emoji} {post.reactions[name]}
      </button>
    );
  });

  return <div>{reactionButtons}</div>;
};
