import { createSlice } from "@reduxjs/toolkit";
import { fetchMealRecord, dropDownFilter } from "../Thunks/mealRecordApi";
import { showError } from "../../Components/Toaster";

const reportCalculation = (data, state) => {
  state.employeeCont = data?.reduce((acc, item) => acc + item.empContDollar, 0);
  state.companyCont = data?.reduce(
    (acc, item) => acc + item.companyContDollar,
    0
  );
  state.grandTotal = state.employeeCont + state.companyCont;
};

const initialState = {
  status: "initails sub api status",
  message: "",
  data: [],
  employeeCont: 0,
  companyCont: 0,
  grandTotal: 0,
};

const mealRecordSlice = createSlice({
  name: "mealRecord", //dashData before
  initialState,
  reducers: {
    defaultApiStatus: (state, action) => {
      state.status = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchMealRecord.fulfilled, (state, action) => {
      state.status = "success";
      console.log("meal Record", action.payload.data);

      state.data = action.payload.data;
      reportCalculation(action.payload.data, state);
    });
    builder.addCase(fetchMealRecord.rejected, (state, action) => {
      state.status = "failed";
      state.message = action.payload?.message;
      showError(action.payload?.message);
    });
    ////////////////////        DropdownFilter      //////////////////
    builder.addCase(dropDownFilter.fulfilled, (state, action) => {
      state.status = "success";
      console.log(action.payload, "dropdown Filter");
      state.data = action.payload.data;
      reportCalculation(action.payload.data, state);
    });
    builder.addCase(dropDownFilter.rejected, (state, action) => {
      state.status = "failed";
      state.message = action.payload?.message;
      showError(action.payload?.message);
    });
  },
});

export const { defaultApiStatus } = mealRecordSlice.actions;

export default mealRecordSlice.reducer;
