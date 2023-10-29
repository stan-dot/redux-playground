import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { addNewPost, postAdded } from "./postSlice"
import { useAppSelector } from "../../app/hooks"

export const AddPostForm = () => {
  const [title, setTitle] = useState<string>("")
  const [content, setContent] = useState<string>("")
  const [userId, setUserId] = useState<string>("")

  const [addRequestStatus, setAddRequestStatus] = useState<string>("idle")
  const users = useAppSelector((state) => state.users)
  const dispatch = useDispatch()
  const onTitleChanged = (e: React.ChangeEvent<HTMLInputElement>) =>
    setTitle(e.target.value)
  const onContentChanged = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setContent(e.target.value)

  const onAuthorChanged = (e) => setUserId(e.target.value)

  const onSavePostClicked = async () => {
    if (canSave) {
      try {
        setAddRequestStatus("pending")
        await dispatch(addNewPost({ title, content, user: userId })).unwrap()
        setTitle("")
        setContent("")
        setUserId("")
      } catch (error) {
        console.error("failed to save the post: ", error)
      } finally {
        setAddRequestStatus("idle")
      }
    }
  }

  const canSave =
    [title, content, userId].every(Boolean) && addRequestStatus === "idle"

  const usersOptions = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ))

  return (
    <section>
      <h2>Add a New Post</h2>
      <form>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          value={title}
          onChange={onTitleChanged}
        />
        <label htmlFor="postAuthor">Author: </label>
        <select id="postAuthor" value={userId} onChange={onAuthorChanged}>
          <option value=""></option>
          {usersOptions}
        </select>
        <label htmlFor="postContent">Content:</label>
        <textarea
          id="postContent"
          name="postContent"
          value={content}
          onChange={onContentChanged}
        />
        <button type="button" onClick={onSavePostClicked} disabled={!canSave}>
          Save Post
        </button>
      </form>
    </section>
  )
}
