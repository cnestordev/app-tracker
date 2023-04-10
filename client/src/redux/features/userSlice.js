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
    },
    logout: (state) => {
      return anonymousUser;
    },
    updateUserTheme: (state, action) => {
      state.theme.type = action.payload.theme.type;
    },
  },
});

export const { login, logout, updateUserTheme } = userSlice.actions;

export default userSlice.reducer;