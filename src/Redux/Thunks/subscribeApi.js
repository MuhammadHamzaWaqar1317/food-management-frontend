import { createAsyncThunk } from "@reduxjs/toolkit";
import { subscribeApi } from "../../Api/Endpoints/ApiEndpoints";

export const subscribeUser = createAsyncThunk(
  "subUser",
  async (body, { rejectWithValue }) => {
    try {
      const res = await subscribeApi(body);
      console.log(res);

      return { res, message: res?.data?.message };
    } catch (error) {
      console.log(error);
      return rejectWithValue({
        message: error?.response?.data?.error ?? `Failed to Create Record`,
        abc: "abc",
      });
    }
  }
);
