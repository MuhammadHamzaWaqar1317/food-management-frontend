import { createAsyncThunk } from "@reduxjs/toolkit";
import { getDashboardData } from "../../Api/Endpoints/ApiEndpoints";

export const fetchDashData = createAsyncThunk(
  "dashboardData",
  async (body, { rejectWithValue }) => {
    try {
      const res = await getDashboardData();
      console.log(res);

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
