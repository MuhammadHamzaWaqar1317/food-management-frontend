import { configureStore } from "@reduxjs/toolkit";

import additionalMealSlice from "./src/Redux/Slices/additionalMealSlice";
import dashboardDataSlice from "./src/Redux/Slices/DashboardDataSlice";
import employeeDataSlice from "./src/Redux/Slices/employeeDataSlice";
import mealComplaintSlice from "./src/Redux/Slices/mealComplaintSlice";
import mealRecordSlice from "./src/Redux/Slices/mealRecordSlice";
import priceContSlice from "./src/Redux/Slices/priceContSlice";
import skipMealSlice from "./src/Redux/Slices/skipMealSlice";
import subscribeSlice from "./src/Redux/Slices/subscribeSlice";
import authSlice from "./src/Redux/Slices/authSlice";

export const store = configureStore({
  reducer: {
    subscribeSlice,
    skipMealSlice,
    mealComplaintSlice,
    dashboardDataSlice,
    mealRecordSlice,
    employeeDataSlice,
    priceContSlice,
    additionalMealSlice,
    authSlice,
  },
});
