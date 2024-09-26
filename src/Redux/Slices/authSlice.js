import { createSlice } from "@reduxjs/toolkit";
import { signInThunk, signUpThunk } from "../Thunks/authApi";
import { jwtDecode } from "jwt-decode";
import { showError, showSuccess } from "../../Components/Toaster";

const initialState = {
  userSkipMealDates:[]
};

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    defaultApiStatus: (state, action) => {
      state.status = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signInThunk.fulfilled, (state, action) => {
      localStorage.setItem("token", action.payload.authToken);
      action.payload.navigate("/user/sub");
    });
    builder.addCase(signInThunk.rejected, (state, action) => {});

    builder.addCase(signUpThunk.fulfilled, (state, action) => {
      localStorage.setItem("token", action.payload.authToken);
      action.payload.navigate("/user/sub");
    });
    builder.addCase(signUpThunk.rejected, (state, action) => {});
  },
});

export default authSlice.reducer;
