import { createSlice } from "@reduxjs/toolkit";
import { additionalMeal } from "../Thunks/additionalMealApi";
import { showError, showSuccess } from "../../Components/Toaster";

const initialState = {
  status: "initails sub api status",
  message: "",
};

const additionalMealSlice = createSlice({
  name: "additionalMealSlice",
  initialState,
  reducers: {
    defaultApiStatus: (state, action) => {
      state.status = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(additionalMeal.fulfilled, (state, action) => {
      console.log("additional Meal success");

      console.log(action);
      state.status = "success";
      showSuccess("Record Created Successfully");
    });
    builder.addCase(additionalMeal.rejected, (state, action) => {
      console.log("additional Meal failed");
      state.status = "failed";
      state.message = action.payload?.message;
      console.log(action, "failed action");
      showError(action.payload?.message);
    });
  },
});

export const { defaultApiStatus } = additionalMealSlice.actions;

export default additionalMealSlice.reducer;
