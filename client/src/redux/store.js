import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice";
import messageReducer from "./features/messageSlice";
import applicationReducer from "./features/applicationSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    message: messageReducer,
    application: applicationReducer,
  },
});
