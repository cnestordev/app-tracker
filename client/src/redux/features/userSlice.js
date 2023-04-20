import { createSlice } from "@reduxjs/toolkit";
import { LIGHTBLUE } from "../../utils/constants";

const anonymousUser = {
  username: "anon",
  applications: [],
  _id: null,
  theme: {
    type: LIGHTBLUE,
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
    removeApplication: (state, action) => {
      const applicationId = action.payload;

      // Remove the application from the user's `applications` array
      state.applications = state.applications.filter(
        (app) => app._id !== applicationId
      );

      // Find the category that contains the application
      const category = state.categories.find((cat) =>
        cat.applications.includes(applicationId)
      );
      if (category) {
        // Remove the application from the category's `applications` array
        category.applications = category.applications.filter(
          (appId) => appId !== applicationId
        );
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
  removeApplication,
} = userSlice.actions;

export default userSlice.reducer;
