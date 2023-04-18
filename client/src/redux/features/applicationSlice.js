import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  role: "",
  company: "",
  location: "",
  date: "",
  source: "",
  status: "",
  commute: "",
  info: "",
  _id: null,
};

export const applicationSlice = createSlice({
  name: "application",
  initialState: initialState,
  reducers: {
    selectApplication: (state, action) => {
      state.role = action.payload.role.value;
      state.company = action.payload.company.value;
      state.location = `${action.payload.location.city.value}, ${action.payload.location.state.value}`;
      state.date = action.payload.date.value;
      state.source = action.payload.source.value;
      state.status = action.payload.status.value;
      state.commute = action.payload.commute.value;
      state.info = action.payload.info.value;
      state._id = action.payload._id;
    },
    deselectApplication: (state) => {
      return initialState;
    },
  },
});

export const { selectApplication, deselectApplication } =
  applicationSlice.actions;

export default applicationSlice.reducer;
