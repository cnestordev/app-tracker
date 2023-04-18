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
    updateApplications: (state, action) => {
      state.applications = [...state.applications, action.payload];
    },
    replaceApplication: (state, action) => {
      const updatedApplication = action.payload;
      const index = state.applications.findIndex(
        (app) => app._id === updatedApplication._id
      );
      if (index !== -1) {
        state.applications[index] = updatedApplication;
      }
    },
  },
});

export const {
  login,
  logout,
  updateUserTheme,
  updateCategories,
  updateApplications,
  replaceApplication,
} = userSlice.actions;

export default userSlice.reducer;
