import { createSlice } from "@reduxjs/toolkit";
import { LIGHT, BLUE } from "../../utils/constants";

const anonymousUser = {
  username: "anon",
  applications: [],
  _id: null,
  theme: {
    type: LIGHT,
    color: BLUE,
  },
  categories: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState: anonymousUser,
  reducers: {
    login: (state, action) => {
      state.username = action.payload.username;
      state._id = action.payload._id;
      state.applications = action.payload.applications;
      state.theme = action.payload.theme;
      state.categories = action.payload.categories;
    },
    logout: (state) => {
      return anonymousUser;
    },
    updateUserTheme: (state, action) => {
      state.theme.type = action.payload.theme.type;
    },
    updateCategories: (state, action) => {
      state.categories = [...state.categories, action.payload];
    },
  },
});

export const { login, logout, updateUserTheme, updateCategories } =
  userSlice.actions;

export default userSlice.reducer;
