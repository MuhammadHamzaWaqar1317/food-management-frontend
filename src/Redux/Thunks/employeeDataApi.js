import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  dropDownFilterAdminEmployee,
  handleSubscriptionAdminEmployee,
  getEmployeeData,
} from "../../Api/Endpoints/ApiEndpoints";

export const fetchEmployeeData = createAsyncThunk(
  "fetchEmployeeData",
  async (body, { rejectWithValue }) => {
    try {
      const res = await getEmployeeData();
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

export const dropDownFilterEmployee = createAsyncThunk(
  "dropDownFilterEmployee",
  async (body, { rejectWithValue }) => {
    try {
      const res = await dropDownFilterAdminEmployee(body);
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

export const handleEmployeeSubscription = createAsyncThunk(
  "handleEmployeeSubscription",
  async (body, { rejectWithValue }) => {
    try {
      console.log("in sub thunks");
      const res = await handleSubscriptionAdminEmployee(body);
      console.log("sub res", res);
      //   return { res, message: res?.response?.data?.error };
      return { data: res.data, status: res.status, body };
    } catch (error) {
      console.log(error);
      return rejectWithValue({
        message: error?.response?.data?.error ?? `Failed to Fetch`,
        abc: "abc",
      });
    }
  }
);
