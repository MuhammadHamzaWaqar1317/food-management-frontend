import { createSlice } from "@reduxjs/toolkit";
import {
  skipUserMeal,
  skipEveryone,
  getSkipMealDates,
  deleteSkipMealDates,
  viewEmployeeMealSkips,
  adminDeleteEmployeeMealSkipDate,
  getAllSkipMealDates,
  deleteSingleSkipMealEveryone,
} from "../Thunks/skipMealApi";
import { showError, showSuccess } from "../../Components/Toaster";
import { constant } from "../../constants/constant";

const initialState = {
  status: "initails sub api status",
  message: "",
  userSkipMealDates: [],
  allEmployeesMealSkips: [],
  allMealSkipDates: [],
};

const skipMealSlice = createSlice({
  name: "skipMeal",
  initialState,
  reducers: {
    defaultApiStatus: (state, action) => {
      state.status = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(skipUserMeal.fulfilled, (state, action) => {
      console.log(action);
      state.status = "success";
      // state.userSkipMealDates.push();
      showSuccess(action.payload.message);
    });
    builder.addCase(skipUserMeal.rejected, (state, action) => {
      state.status = "failed";
      state.message = action.payload?.message;
      console.log(action, "failed action");
      showError(action.payload?.message);
    });

    builder.addCase(getSkipMealDates.fulfilled, (state, action) => {
      console.log(action.payload.data, "dates fetched of user");
      const {
        mealTime,
        lunch: lunchSkip,
        dinner: dinnerSkip,
      } = action.payload.data;
      console.log(mealTime.includes(constant.lunch, constant.dinner));

      if (
        mealTime.includes(constant.lunch) &&
        mealTime.includes(constant.dinner)
      ) {
        const dinner = dinnerSkip?.map((item) => {
          return { ...item, mealTime: [constant.dinner] };
        });
        const lunch = lunchSkip?.map((item) => {
          return { ...item, mealTime: [constant.lunch] };
        });
        console.log(lunch, dinner);

        state.userSkipMealDates = [...lunch, ...dinner];
      } else if (mealTime.includes(constant.lunch)) {
        console.log("lunch ");
        const lunch = lunchSkip?.map((item) => {
          return { ...item, mealTime: [constant.lunch] };
        });
        state.userSkipMealDates = lunch;
      } else if (mealTime.includes(constant.dinner)) {
        console.log(" Dinner");
        const dinner = dinnerSkip?.map((item) => {
          return { ...item, mealTime: [constant.dinner] };
        });
        state.userSkipMealDates = dinner;
      }
      state.status = "success";
      action.payload.data;
      // state.userSkipMealDates.push();
      showSuccess(action.payload.message);
    });
    builder.addCase(getSkipMealDates.rejected, (state, action) => {
      state.status = "failed";
      state.message = action.payload?.message;
      console.log(action, "failed action");
      showError(action.payload?.message);
    });

    builder.addCase(deleteSkipMealDates.fulfilled, (state, action) => {
      const { _id } = action.payload.body;
      state.status = "success";
      console.log("delete Successfull");
      state.userSkipMealDates = state.userSkipMealDates?.filter(
        (datesObj) => datesObj._id != _id
      );
      // state.userSkipMealDates.push();
      showSuccess(action.payload.message);
    });
    builder.addCase(deleteSkipMealDates.rejected, (state, action) => {
      state.status = "failed";
      state.message = action.payload?.message;
      console.log(action, "failed action");
      showError("Failed to Delete Meal");
    });

    builder.addCase(viewEmployeeMealSkips.fulfilled, (state, action) => {
      console.log(action.payload);
      state.allEmployeesMealSkips = action.payload.data;

      showSuccess(action.payload.message);
    });

    builder.addCase(viewEmployeeMealSkips.rejected, (state, action) => {
      showError(action.payload?.message);
    });

    builder.addCase(
      adminDeleteEmployeeMealSkipDate.fulfilled,
      (state, action) => {
        const { employeeId, skipDateId } = action.payload.body;
        console.log(action.payload);
        state.allEmployeesMealSkips.forEach((users) => {
          if (users.employeeId == employeeId) {
            console.log(users);
            users.mealSkips = users.mealSkips.filter(
              (dates) => dates._id != skipDateId
            );
          }
        });
        state.allEmployeesMealSkips = state.allEmployeesMealSkips?.filter(
          ({ mealSkips }) => mealSkips.length != 0
        );
      }
    );

    builder.addCase(
      adminDeleteEmployeeMealSkipDate.rejected,
      (state, action) => {
        console.log(action.payload);

        showError(action.payload?.message);
      }
    );

    builder.addCase(skipEveryone.fulfilled, (state, action) => {
      console.log(action);
      state.status = "success";
      showSuccess("Record Created Successfully");
    });

    builder.addCase(skipEveryone.rejected, (state, action) => {
      state.status = "failed";
      state.message = action.payload?.message;
      showError(action.payload?.message);
      console.log(action, "failed action");
    });

    builder.addCase(getAllSkipMealDates.fulfilled, (state, action) => {
      console.log("getAllSkipMeal", action);
      state.allMealSkipDates = action.payload.data;
      // state.status = "success";
      // showSuccess("Record Created Successfully");
    });
    builder.addCase(getAllSkipMealDates.rejected, (state, action) => {
      console.log(action);
      state.status = "success";
      showError(action.payload?.message);
    });

    builder.addCase(deleteSingleSkipMealEveryone.fulfilled, (state, action) => {
      console.log("getAllSkipMeal", action);
      const { skipDateId, mealTime } = action.payload.body;
      console.log("mealTiem", mealTime);

      state.allMealSkipDates = state.allMealSkipDates?.filter(
        (dates) => dates._id != skipDateId
      );
    });
    builder.addCase(deleteSingleSkipMealEveryone.rejected, (state, action) => {
      console.log(action);
      state.status = "success";
      showError(action.payload?.message);
    });
  },
});

export const { defaultApiStatus } = skipMealSlice.actions;

export default skipMealSlice.reducer;
