import { createSlice } from "@reduxjs/toolkit";
import { subscribeUser } from "../Thunks/subscribeApi";
import { showError, showSuccess } from "../../Components/Toaster";

const initialState = {
  status: "initails sub api status",
  message: "",
};

const subscribeSlice = createSlice({
  name: "subUser",
  initialState,
  reducers: {
    defaultApiStatus: (state, action) => {
      state.status = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(subscribeUser.fulfilled, (state, action) => {
      console.log("Sub slice", action.payload);
      state.status = "success";
      showSuccess(action.payload.message);
    });
    builder.addCase(subscribeUser.rejected, (state, action) => {
      state.status = "failed";
      state.message = action.payload?.message;
      console.log(action, "failed action");
      showError(action.payload?.message);
    });
  },
});

export const { defaultApiStatus } = subscribeSlice.actions;

export default subscribeSlice.reducer;
