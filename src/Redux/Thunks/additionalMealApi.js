import { createAsyncThunk } from "@reduxjs/toolkit";
import { additionalMealReq } from "../../Api/Endpoints/ApiEndpoints";

export const additionalMeal = createAsyncThunk(
  "subUser",
  async (body, { rejectWithValue }) => {
    try {
      const res = await additionalMealReq(body);
      return { res: res.data, message: res?.response?.data?.error };
    } catch (error) {
      console.log(error);
      return rejectWithValue({
        message: error?.response?.data?.error ?? `Failed to Create Record`,
        abc: "abc",
      });
    }
  }
);
