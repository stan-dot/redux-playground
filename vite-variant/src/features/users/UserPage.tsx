
import { useAppSelector } from "../../app/hooks"
import { selectAllPosts } from "../posts/postSlice"
import { selectUserById } from "../users/usersSlice"

export const UserPage = ({ userId }: { userId: string }) => {
  // const { userId } = match.params

  const user = useAppSelector((state) => selectUserById(state, userId))

  const postsForUser = useAppSelector((state) => {
    const allPosts = selectAllPosts(state)
    return allPosts.posts.filter((post) => post.user === userId)
  })


  const postTitles = postsForUser.map((post) => (
    <li key={post.id}>
      {/* <Link to={`/posts/${post.id}`}>{post.title}</Link> */}
      <p id={`/posts/${post.id}`}>{post.title}</p>
    </li>
  ))

  return (
    <section>
      <h2>{user.name}</h2>

      <ul>{postTitles}</ul>
    </section>
  )
}
