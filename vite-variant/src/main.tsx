import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./App";
import "./index.css";
import { apiSlice } from "./features/api/apiSlice";

// import { fetchUsers } from "./features/users/usersSlice";
// store.dispatch(fetchUsers());
store.dispatch(apiSlice.endpoints.getUsers.initate());
store.dispatch(extendedApiSlice.endpoints.getUsers.initate());

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
