import { createSlice } from "@reduxjs/toolkit";
import {
  createMealComplaint,
  addressMealComplaint,
  fetchMealComplaints,
} from "../Thunks/mealComplaintApi";
import { showError, showSuccess } from "../../Components/Toaster";

const initialState = {
  status: "initails sub api status",
  message: "",
  tableData: [],
};

const mealComplaintSlice = createSlice({
  name: "mealComplaint",
  initialState,
  reducers: {
    defaultApiStatus: (state, action) => {
      state.status = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createMealComplaint.fulfilled, (state, action) => {
      console.log(action);
      state.status = "success";
      console.log(state.status);
      showSuccess("Record Created Successfully");
    });
    builder.addCase(createMealComplaint.rejected, (state, action) => {
      state.status = "failed";
      state.message = action.payload?.message;
      console.log(action, "failed action");
      showError(action.payload?.message);
    });
    builder.addCase(fetchMealComplaints.fulfilled, (state, action) => {
      console.log(action);
      state.status = "success";
      console.log(state.status);
      state.tableData = action.payload.data;
    });
    builder.addCase(fetchMealComplaints.rejected, (state, action) => {
      state.status = "failed";
      state.message = action.payload?.message;
      console.log(action, "failed action");
      showError(action.payload?.message);
    });

    builder.addCase(addressMealComplaint.fulfilled, (state, action) => {
      console.log(action);
      state.status = "success";
      console.log(state.status);
      showSuccess("Meal Complaint Resolved Successfully");
      state.tableData = state.tableData?.filter(
        (item) => item._id != action.payload.id
      );
    });
    builder.addCase(addressMealComplaint.rejected, (state, action) => {
      state.status = "failed";
      state.message = action.payload?.message;
      console.log(action, "failed action");
      showError(action.payload?.message);
    });
  },
});

export const { defaultApiStatus } = mealComplaintSlice.actions;

export default mealComplaintSlice.reducer;
