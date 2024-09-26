import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  dropDownFilterReport,
  getMealRecord,
} from "../../Api/Endpoints/ApiEndpoints";

export const fetchMealRecord = createAsyncThunk(
  "fetchMealRecord",
  async (body, { rejectWithValue }) => {
    try {
      const res = await getMealRecord();
      console.log(res);
      //   return { res, message: res?.response?.data?.error };
      return { data: res.data, status: res.status };
    } catch (error) {
      console.log(error);
      return rejectWithValue({
        message: error?.response?.data?.error ?? `Failed to Fetch`,
        abc: "abc",
      });
    }
  }
);

export const dropDownFilter = createAsyncThunk(
  "dropDownFilterRecord",
  async (body, { rejectWithValue }) => {
    try {
      const res = await dropDownFilterReport(body);
      console.log(res);
      //   return { res, message: res?.response?.data?.error };
      return { data: res.data, status: res.status };
    } catch (error) {
      console.log(error);
      return rejectWithValue({
        message: error?.response?.data?.error ?? `Failed to Fetch`,
        abc: "abc",
      });
    }
  }
);
