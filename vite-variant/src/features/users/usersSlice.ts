import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { apiSlice } from "../api/apiSlice";

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => "/users",
      transformResponse: (responseData) => {
        return usersAdapter.setAll(initialState, responseData);
      },
    }),
  }),
});
export const { useGetUsersQuery } = extendedApiSlice;
export const selectUsersResult = extendedApiSlice.endpoints.getUsers.select();

const usersAdapter = createEntityAdapter();
const initialState = usersAdapter.getInitialState();

export const fetchUsers = createAsyncThunk("", async () => {
  setTimeout(() => {
    const initialState = [
      { id: "0", name: "Tianna Jenkins" },
      { id: "1", name: "Kevin Grant" },
      { id: "2", name: "Madison Price" },
    ];
    return initialState;
  }, 1000);
});

// export const selectUsersResult = apiSlice.endpoints.getUsers.select();
// const emptyUsers: any[] = [];
// export const selectAllUsers = createSelector(
//   selectUsersResult,
//   (usersResult) => usersResult?.data ?? emptyUsers
// );

// export const selectUserById = createSelector(
//   selectAllUsers,
//   (state, userId) => userId,
//   (users, userId) => users.find((user) => user.id === userId)
// );

// const usersSlice = createSlice({
//   name: "users",
//   initialState,
//   reducers: {},
//   extraReducers(builder) {
//     builder.addCase(fetchUsers.fulfilled, usersAdapter.setAll);
//   },
// });

// export default usersSlice.reducer;

export const { selectAll: selectAllUsers, selectById: selectUserById } =
  usersAdapter.getSelectors((state) => selectUsersData(state) ?? initialState);
