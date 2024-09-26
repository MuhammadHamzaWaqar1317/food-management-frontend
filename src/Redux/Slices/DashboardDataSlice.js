import { createSlice } from "@reduxjs/toolkit";
import { fetchDashData } from "../Thunks/adminDashApi";
import { showError } from "../../Components/Toaster";

const initialState = {
  status: "initails sub api status",
  message: "",
  cardData: {},
  chartData: [],
};

const dashboardDataSlice = createSlice({
  name: "dashboardData",
  initialState,
  reducers: {
    defaultApiStatus: (state, action) => {
      state.status = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchDashData.fulfilled, (state, action) => {
      state.status = "success";
      console.log(
        parseInt(action.payload.data.monthlyMealReport[0].month) == 7,
        typeof parseInt(action.payload.data.monthlyMealReport[0].month)
      );

      const { dinner, lunch, singleMealPrice, subscribed, monthlyMealReport } =
        action.payload.data;
      state.cardData = { dinner, lunch, singleMealPrice, subscribed };
      state.chartData = monthlyMealReport;

      for (let i = monthlyMealReport.length; i < 12; i++) {
        state.chartData.push({ month_name: "" });
      }
    });
    builder.addCase(fetchDashData.rejected, (state, action) => {
      state.status = "failed";
      state.message = action.payload?.message;
      console.log(action, "failed action");
      showError(action.payload?.message);
    });
  },
});

export const { defaultApiStatus } = dashboardDataSlice.actions;

export default dashboardDataSlice.reducer;
