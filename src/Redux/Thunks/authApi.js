import { createAsyncThunk } from "@reduxjs/toolkit";
import { signUp, signIn } from "../../Api/Endpoints/ApiEndpoints";

export const signUpThunk = createAsyncThunk(
  "signUpThunk",
  async (body, { rejectWithValue }) => {
    try {
      const navigate = body.navigate;
      delete body["navigate"];
      const res = await signUp(body);
      return {
        authToken: res.data,
        message: res?.response?.data?.error,
        navigate,
      };
    } catch (error) {
      console.log(error);
      return rejectWithValue({
        message: error?.response?.data?.error ?? `Failed to Create User`,
      });
    }
  }
);

export const signInThunk = createAsyncThunk(
  "signInThunk",
  async (body, { rejectWithValue }) => {
    try {
      const navigate = body.navigate;
      delete body["navigate"];
      const res = await signIn(body);
      console.log("thunk sign-in", res);
      return {
        authToken: res.data,
        message: res?.response?.data?.error,
        navigate,
      };
    } catch (error) {
      console.log(error);
      return rejectWithValue({
        message: error?.response?.data?.error ?? `Failed `,
      });
    }
  }
);
