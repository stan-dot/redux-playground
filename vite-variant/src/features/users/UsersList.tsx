import { useAppSelector } from "../../app/hooks"
import { selectAllUsers } from "./usersSlice"

export const UsersList = () => {
  const users = useAppSelector(selectAllUsers)

  const renderedUsers = users.map((user) => (
    <li key={user.id}>
      {/* <Link to={`/users/${user.id}`}>{user.name}</Link> */}
      <p> {user.name}</p>
    </li>
  ))

  return (
    <section>
      <h2>Users</h2>

      <ul>{renderedUsers}</ul>
    </section>
  )
}
