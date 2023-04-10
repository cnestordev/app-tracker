import { createSlice } from "@reduxjs/toolkit";

const defaultMessage = {
  message: "",
  type: "warning",
  isDisplayed: false,
};

export const messageSlice = createSlice({
  name: "message",
  initialState: defaultMessage,
  reducers: {
    setMessage: (state, action) => {
      console.log(action.payload);
      state.message = action.payload.message;
      state.isDisplayed = true;
      state.type = action.payload.type;
    },
    resetMessage: (state) => {
      return defaultMessage;
    },
  },
});

export const { setMessage, resetMessage } = messageSlice.actions;

export default messageSlice.reducer;
