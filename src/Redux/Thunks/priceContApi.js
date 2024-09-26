import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getMealPrice,
  getPriceContribution,
  updatePriceCont,
  updateMealPrice,
} from "../../Api/Endpoints/ApiEndpoints";

export const fetchPriceCont = createAsyncThunk(
  "fetchPriceCont",
  async (body, { rejectWithValue }) => {
    try {
      const priceRes = await getMealPrice();
      const contRes = await getPriceContribution();
      //   console.log("priceRes", priceRes.data[0].singleMealPrice);
      //   console.log("contRes", contRes.data);
      return {
        contribution: contRes.data,
        mealPrice: priceRes.data[0].singleMealPrice,
      };
    } catch (error) {
      console.log(error);
      return rejectWithValue({
        message: error?.response?.data?.error ?? `Failed to Fetch`,
        abc: "abc",
      });
    }
  }
);

export const updateSingleMealPrice = createAsyncThunk(
  "updateSingleMealPrice",
  async (body, { rejectWithValue }) => {
    try {
      const res = await updateMealPrice(body);

      //   console.log("priceRes", priceRes.data[0].singleMealPrice);
      //   console.log("contRes", contRes.data);
      console.log(res.data);
      return { data: res.data, body };
    } catch (error) {
      console.log(error);
      return rejectWithValue({
        message: error?.response?.data?.error ?? `Failed to update Meal Price`,
        abc: "abc",
      });
    }
  }
);

export const updatePriceContribution = createAsyncThunk(
  "updatePriceContribution",
  async (body, { rejectWithValue }) => {
    try {
      const res = await updatePriceCont(body);

      //   console.log("priceRes", priceRes.data[0].singleMealPrice);
      //   console.log("contRes", contRes.data);
      return { data: res.data, body };
    } catch (error) {
      console.log(error);
      return rejectWithValue({
        message:
          error?.response?.data?.error ?? `Failed to update Price Contribution`,
        abc: "abc",
      });
    }
  }
);
