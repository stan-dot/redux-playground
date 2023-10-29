import { EntityId } from "@reduxjs/toolkit"
import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { Spinner } from "../../components/Spinner"
import { PostAuthor } from "./PostAuthor"
import { ReactionButtons } from "./ReactionButtons"
import { TimeAgo } from "./TimeAgo"
import { fetchPosts, selectPostById, selectPostIds } from "./postSlice"

let PostExcerpt = ({ postId }: { postId: EntityId }) => {
  const post = useAppSelector((state) => selectPostById(state, postId))
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
  )
}

export const PostsList = () => {
  const dispatch = useAppDispatch()
  const postStatus = useAppSelector((state) => state.posts.status)
  const error = useAppSelector((state) => state.posts.error)

  useEffect(() => {
    if (postStatus === "idle") {
      dispatch(fetchPosts())
    }
  }, [postStatus, dispatch])
  const orderedPostIds: EntityId[] = useAppSelector(selectPostIds)

  let content
  if (postStatus === "loading") {
    content = <Spinner text="loading..." />
  } else if (postStatus === "succeeded") {
    if (orderedPostIds[0] === undefined) {
      content = <p> undefined posts</p>
    } else {
      console.log(orderedPostIds)
      content = orderedPostIds.map((p) => <PostExcerpt key={p} postId={p} />)
    }
  } else if (postStatus === "failed") {
    content = <div>{error}</div>
  }
  return <section className="posts-list">{content}</section>
}
