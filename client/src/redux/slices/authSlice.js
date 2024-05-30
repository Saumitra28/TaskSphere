import { createSlice } from "@reduxjs/toolkit";
import {user as initialUser} from "../../assets/data";

const initialState = {
  user: initialUser,
  isSidebarOpen: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials(state, action) {
      state.user = action.payload;
      // Optionally update localStorage if needed
      // localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
    logout(state) {
      state.user = null;
      // Optionally remove from localStorage if needed
      // localStorage.removeItem("userInfo");
    },
    setOpenSidebar(state, action) {
      state.isSidebarOpen = action.payload;
    },
  },
});

export const { setCredentials, logout, setOpenSidebar } = authSlice.actions;
export default authSlice.reducer;
