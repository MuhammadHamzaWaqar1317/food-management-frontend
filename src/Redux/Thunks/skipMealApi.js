import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  skipMealApi,
  skipMealEveryone,
  getUserSkipMealDates,
  deleteUserSkipMealDates,
  viewEmployeeMealSkipsDates,
  adminDeleteUserSkipMealDates,
  getAllSkipMealDate,
  deleteSkipMealEveryone,
} from "../../Api/Endpoints/ApiEndpoints";
import { tokenData } from "../../Utils/decodeToken";

export const skipUserMeal = createAsyncThunk(
  "skipMealUser",
  async ({ body, successMsg, errorMsg }, { rejectWithValue }) => {
    try {
      const res = await skipMealApi(body);
      // console.log(body);
      return { data: res.data, message: successMsg, body };
    } catch (error) {
      console.log(error);
      return rejectWithValue({
        message: error?.response?.data?.error ?? errorMsg,
        abc: "abc",
      });
    }
  }
);

export const getSkipMealDates = createAsyncThunk(
  "getSkipMealDates",
  async (body, { rejectWithValue }) => {
    try {
      console.log("in api getSkipMealDates");

      // const { email } = tokenData();
      const res = await getUserSkipMealDates();
      console.log("Thunk get dates res", res);
      return { data: res.data, body };
    } catch (error) {
      console.log(error);
      return rejectWithValue({
        message: error?.response?.data?.error ?? "Failed to Fetch",
        abc: "abc",
      });
    }
  }
);

export const deleteSkipMealDates = createAsyncThunk(
  "deleteSkipMealDates",
  async (body, { rejectWithValue }) => {
    try {
      console.log("log body", body);

      const { email } = tokenData();
      const params = new URLSearchParams({ ...body, email });
      body = { ...body, email };
      const res = await deleteUserSkipMealDates(params);
      console.log("Thunk get dates res", res);
      return { data: res.data, body };
    } catch (error) {
      console.log(error);
      return rejectWithValue({
        message:
          error?.response?.data?.error ?? "Failed to Delete Meal Skip Date",
        abc: "abc",
      });
    }
  }
);

export const viewEmployeeMealSkips = createAsyncThunk(
  "viewEmployeeMealSkips",
  async (body, { rejectWithValue }) => {
    try {
      const res = await viewEmployeeMealSkipsDates();
      return { data: res.data, message: res?.response?.data?.error };
    } catch (error) {
      console.log(error);
      return rejectWithValue({
        message: error?.response?.data?.error ?? `Failed to Fetch`,
        abc: "abc",
      });
    }
  }
);

export const adminDeleteEmployeeMealSkipDate = createAsyncThunk(
  "adminDeleteEmployeeMealSkipDate",
  async (body, { rejectWithValue }) => {
    try {
      console.log(body);
      const params = new URLSearchParams(body);

      const res = await adminDeleteUserSkipMealDates(params);
      return { data: res.data, message: res?.response?.data?.error, body };
    } catch (error) {
      console.log(error);
      return rejectWithValue({
        message:
          error?.response?.data?.error ?? `Failed to Delete Meal Skip Date`,
        abc: "abc",
      });
    }
  }
);

export const skipEveryone = createAsyncThunk(
  "skipEveryone",
  async (body, { rejectWithValue }) => {
    try {
      const res = await skipMealEveryone(body);
      return { res, message: res?.response?.data?.error };
    } catch (error) {
      console.log(error);
      return rejectWithValue({
        message: error?.response?.data?.error ?? `Failed to Create Record`,
        abc: "abc",
      });
    }
  }
);

export const getAllSkipMealDates = createAsyncThunk(
  "getAllSkipMealDates",
  async (body, { rejectWithValue }) => {
    try {
      console.log("in api getSkipMealDates");

      // const { email } = tokenData();
      const res = await getAllSkipMealDate();
      console.log("Thunk get dates res", res);
      return { data: res.data, body };
    } catch (error) {
      console.log(error);
      return rejectWithValue({
        message: error?.response?.data?.error ?? "Failed to Fetch",
        abc: "abc",
      });
    }
  }
);

export const deleteSingleSkipMealEveryone = createAsyncThunk(
  "deleteSingleSkipMealEveryone",
  async (body, { rejectWithValue }) => {
    try {
      console.log(body);
      const params = new URLSearchParams(body);
      const res = await deleteSkipMealEveryone(params);
      return { data: res.data, message: res?.response?.data?.error, body };
    } catch (error) {
      console.log(error);
      return rejectWithValue({
        message:
          error?.response?.data?.error ?? `Failed to Delete Meal Skip Date`,
        abc: "abc",
      });
    }
  }
);
