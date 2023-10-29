import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit"
import { RootState } from "../../app/store"
const usersAdapter = createEntityAdapter()
const initialState = usersAdapter.getInitialState()

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
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchUsers.fulfilled, usersAdapter.setAll)
  },
})

export default usersSlice.reducer

export const { selectAll: selectAllUsers, selectById: selectUserById } =
  usersAdapter.getSelectors((state) => state.users)
