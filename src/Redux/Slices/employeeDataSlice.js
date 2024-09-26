import { createSlice } from "@reduxjs/toolkit";
import {
  handleEmployeeSubscription,
  fetchEmployeeData,
  dropDownFilterEmployee,
} from "../Thunks/employeeDataApi";
import { showError } from "../../Components/Toaster";

const initialState = {
  status: "initails sub api status",
  successMessage: "",
  errorMessage: "",
  data: [],
};

const employeeDataSlice = createSlice({
  name: "employeeData",
  initialState,
  reducers: {
    defaultApiStatus: (state, action) => {
      state.status = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchEmployeeData.fulfilled, (state, action) => {
      state.status = "success";
      state.successMessage = "default";
      state.data = action.payload.data;
      //   reportCalculation(action.payload.data, state);
    });
    builder.addCase(fetchEmployeeData.rejected, (state, action) => {
      state.status = "failed";
      state.errorMessage = action.payload?.message;
    });
    ////////////////////        DropdownFilter      //////////////////
    builder.addCase(dropDownFilterEmployee.fulfilled, (state, action) => {
      state.status = "success";
      console.log(action.payload, "dropdown Filter");
      state.data = action.payload.data;
      //   reportCalculation(action.payload.data, state);
    });
    builder.addCase(dropDownFilterEmployee.rejected, (state, action) => {
      state.status = "failed";
      state.errorMessage = action.payload?.message;
      showError(action.payload?.message);
    });

    ////////////////////        handleSubscription      //////////////////
    builder.addCase(handleEmployeeSubscription.fulfilled, (state, action) => {
      state.status = "success";
      console.log("handleEmployeeSubscription Slice", action.payload);
      const { employeeId, status, mealTime } = action.payload.body;
      state.data = state.data?.map((item) => {
        if (item.employeeId == employeeId) {
          return { ...item, status, mealTime };
        }
        return item;
      });
    });
    builder.addCase(handleEmployeeSubscription.rejected, (state, action) => {
      state.status = "failed";
      state.errorMessage = "Failed to Update Subscription";
      showError("Failed to Update Subscription");
    });
  },
});

export const { defaultApiStatus } = employeeDataSlice.actions;

export default employeeDataSlice.reducer;
