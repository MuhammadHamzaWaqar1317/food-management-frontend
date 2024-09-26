import { createSlice } from "@reduxjs/toolkit";
import {
  fetchPriceCont,
  updatePriceContribution,
  updateSingleMealPrice,
} from "../Thunks/priceContApi";

import { showError, showSuccess } from "../../Components/Toaster";

const initialState = {
  status: "initails sub api status",
  message: "",
  tableData: [],
  singleMealPrice: 0,
  companyCont: 0,
  grandTotal: 0,
};

const priceContSlice = createSlice({
  name: "priceContSlice", //dashData before
  initialState,
  reducers: {
    defaultApiStatus: (state, action) => {
      state.status = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchPriceCont.fulfilled, (state, action) => {
      state.status = "success";
      state.singleMealPrice = action.payload.mealPrice;
      state.tableData = action.payload.contribution?.map((item) => {
        const { companyContPercent, empContPercent, level, _id } = item;
        return {
          companyContPercent,
          empContPercent,
          level: `Level ${level}`,
          companyContDollar: companyContPercent * state.singleMealPrice,
          empContDollar: empContPercent * state.singleMealPrice,
          _id,
        };
      });
    });
    builder.addCase(fetchPriceCont.rejected, (state, action) => {
      showError("Failed to Fetch");
    });
    ////////////////////        updatePriceContribution      //////////////////
    builder.addCase(updatePriceContribution.fulfilled, (state, action) => {
      const { companyContPercent, empContPercent, level } = action.payload.body;

      state.tableData = state.tableData?.map((item) => {
        if (item._id == action.payload.body.contributionId) {
          return {
            ...item,
            empContPercent,
            companyContPercent,
            companyContDollar: companyContPercent * state.singleMealPrice,
            empContDollar: empContPercent * state.singleMealPrice,
          };
        }
        return item;
      });
    });
    builder.addCase(updatePriceContribution.rejected, (state, action) => {
      showError(action.payload?.message);
    });

    // ////////////////////        updateSingleMealPrice      //////////////////
    builder.addCase(updateSingleMealPrice.fulfilled, (state, action) => {
      state.singleMealPrice = action.payload.body.singleMealPrice;
      state.tableData = state.tableData?.map((item) => {
        return {
          ...item,
          companyContDollar: item.companyContPercent * state.singleMealPrice,
          empContDollar: item.empContPercent * state.singleMealPrice,
        };
      });
    });
    builder.addCase(updateSingleMealPrice.rejected, (state, action) => {
      showError(action.payload?.message);
    });
  },
});

export const { defaultApiStatus } = priceContSlice.actions;

export default priceContSlice.reducer;
