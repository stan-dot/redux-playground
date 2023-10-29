import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { PostAuthor } from "./PostAuthor"
import { ReactionButtons } from "./ReactionButtons"
import { TimeAgo } from "./TimeAgo"
import { fetchPosts, selectAllPosts } from "./postSlice"
import { Spinner } from "../../components/Spinner"

const PostExcerpt = ({ post }) => {
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
  const posts = useAppSelector(selectAllPosts)
  const dispatch = useAppDispatch()
  const postStatus = useAppSelector((state) => state.posts.status)
  const error = useAppSelector((state) => state.posts.error)

  useEffect(() => {
    if (postStatus === "idle") {
      dispatch(fetchPosts())
    }
  }, [postStatus, dispatch])

  let content
  if (postStatus === "loading") {
    content = <Spinner text="loading..." />
  } else if (postStatus === "succeeded") {
    const orderedPosts = posts.posts
      .slice()
      .sort((a, b) => b.date.localeCompare(a.date))
    if (orderedPosts[0] === undefined) {
      content = <p> undefined posts</p>
    } else {
      console.log(orderedPosts)
      content = orderedPosts.map((p) => <PostExcerpt key={p.id} post={p} />)
    }
  } else if (postStatus === "failed") {
    content = <div>{error}</div>
  }
  return <section className="posts-list">{content}</section>
}
