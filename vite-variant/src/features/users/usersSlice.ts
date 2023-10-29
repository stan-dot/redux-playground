import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { RootState } from "../../app/store"
export const fetchUsers = createAsyncThunk("", async () => {
  setTimeout(() => {
    const initialState = [
      { id: "0", name: "Tianna Jenkins" },
      { id: "1", name: "Kevin Grant" },
      { id: "2", name: "Madison Price" },
    ]
    return initialState
  }, 1000)
})

const usersSlice = createSlice({
  name: "users",
  initialState: [],
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      return action.payload
    })
  },
})

export default usersSlice.reducer

export const selectAllUsers = (state: RootState) => state.users

export const selectUserById = (state: RootState, userId: stringq) =>
  state.users.find((user) => user.id === userId)
