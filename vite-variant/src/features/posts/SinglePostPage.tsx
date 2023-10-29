import { useAppSelector } from "../../app/hooks"
import { selectPostById } from "./postSlice"

export const SinglePostPage = ({ postId }: { postId: string }) => {
  // const { postId } = match.params

  const post = useAppSelector((state) => selectPostById(state, postId))

  if (!post) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    )
  }

  return (
    <section>
      <article className="post">
        <h2>{post.title}</h2>
        <p className="post-content">{post.content}</p>
      </article>
    </section>
  )
}
