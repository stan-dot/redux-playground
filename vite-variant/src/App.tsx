import logo from "./logo.svg"
import { Counter } from "./features/counter/Counter"
import "./App.css"
import { PostsList } from "./features/posts/PostsList"
import { AddPostForm } from "./features/posts/AddPostForm"
import { SinglePostPage } from "./features/posts/SinglePostPage"
import { EditPostForm } from "./features/posts/EditPostForm"

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Counter />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <span>
          <span>Learn </span>
          <a
            className="App-link"
            href="https://reactjs.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React
          </a>
          <span>, </span>
          <a
            className="App-link"
            href="https://redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux
          </a>
          <span>, </span>
          <a
            className="App-link"
            href="https://redux-toolkit.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux Toolkit
          </a>
          ,<span> and </span>
          <a
            className="App-link"
            href="https://react-redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React Redux
          </a>
        </span>
      </header>
      <div>
        <AddPostForm />
        <PostsList />

        {/* <h3> ere single post page</h3>
        <SinglePostPage postId={"1"} /> */}
        {/* <h3> edit form</h3>
        <EditPostForm postId={"2"} /> */}
      </div>
    </div>
  )
}

export default App
