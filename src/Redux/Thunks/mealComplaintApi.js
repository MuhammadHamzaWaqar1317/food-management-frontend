import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addMealComplaint,
  resolveMealComplaint,
  getMealComplaints,
} from "../../Api/Endpoints/ApiEndpoints";

export const createMealComplaint = createAsyncThunk(
  "addMealComplaint",
  async (body, { rejectWithValue }) => {
    try {
      const res = await addMealComplaint(body);
      console.log(res);
      //   return { res, message: res?.response?.data?.error };
      return { data: res.data, status: res.status };
    } catch (error) {
      console.log(error);
      return rejectWithValue({
        message: error?.response?.data?.error ?? `Failed to Create Record`,
        abc: "abc",
      });
    }
  }
);

export const addressMealComplaint = createAsyncThunk(
  "addressMealComplaint",
  async (body, { rejectWithValue }) => {
    try {
      const res = await resolveMealComplaint(body);
      console.log(res);
      //   return { res, message: res?.response?.data?.error };
      return { data: res.data, status: res.status, id: body.id };
    } catch (error) {
      console.log(error);
      return rejectWithValue({
        message:
          error?.response?.data?.error ?? `Failed to Resolve Meal Complaint`,
        abc: "abc",
      });
    }
  }
);

export const fetchMealComplaints = createAsyncThunk(
  "fetchMealComplaints",
  async (body, { rejectWithValue }) => {
    try {
      const res = await getMealComplaints();
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
