import api from "../Interceptor/api";

const authEndpoint = "authenticated";

const unauthEndpoint = "unauthenticated";

export const signUp = (body) => api.post(`${unauthEndpoint}/sign-up`, body);

export const signIn = (body) => api.post(`${unauthEndpoint}/sign-in`, body);

export const getDashboardData = () =>
  api.get(`${authEndpoint}/admin/dashboard`);

export const subscribeApi = (employeeData) =>
  api.post(`${authEndpoint}/employee/subscribe`, employeeData); //    /Employee

export const skipMealApi = (employeeData) =>
  api.post(`${authEndpoint}/employee/skip-meal`, employeeData); //      skipMeal        Isse dekhna bcz admin using same

export const getUserSkipMealDates = () =>
  api.get(`${authEndpoint}/employee/skip-meal-date`);

export const viewEmployeeMealSkipsDates = () =>
  api.get(`${authEndpoint}/admin/view-employee-meal-skip`);

export const deleteUserSkipMealDates = (params) =>
  api.delete(
    `${authEndpoint}/employee/delete-skip-meal-date?${params.toString()}`
  );

export const adminDeleteUserSkipMealDates = (params) =>
  api.delete(
    `${authEndpoint}/admin/delete-employee-meal-skip?${params.toString()}`
  );

export const skipMealEveryone = (obj) =>
  api.post(`${authEndpoint}/admin/skip-meal`, obj);

export const getAllSkipMealDate = () =>
  api.get(`${authEndpoint}/admin/get-all-skip-meal`);

export const deleteSkipMealEveryone = (params) =>
  api.delete(
    `${authEndpoint}/admin/delete-single-all-skip-meal?${params.toString()}`
  );

export const getMealRecord = () => api.get(`${authEndpoint}/admin/meal-record`);

export const dropDownFilterReport = (params) =>
  api.get(
    `${authEndpoint}/admin/meal-record-dropdown-filter?${params.toString()}`
  );

export const getEmployeeData = () => api.get(`${authEndpoint}/admin/details`);

export const dropDownFilterAdminEmployee = (params) =>
  api.get(`${authEndpoint}/admin/details-dropdown-filter?${params.toString()}`);

export const handleSubscriptionAdminEmployee = (obj) =>
  api.patch(`${authEndpoint}/admin/details`, obj);

export const getPriceContribution = () =>
  api.get(`${authEndpoint}/admin/meal-cont`);

export const updatePriceCont = (updatePercent) =>
  api.patch(`${authEndpoint}/admin/meal-cont`, updatePercent);

export const getMealPrice = () => api.get(`${authEndpoint}/admin/meal-price`);

export const updateMealPrice = (obj) =>
  api.patch(`${authEndpoint}/admin/meal-price`, obj);

export const getMealComplaints = () =>
  api.get(`${authEndpoint}/admin/meal-complaint`);

export const addMealComplaint = (obj) =>
  api.post(`${authEndpoint}/employee/meal-complaint`, obj);

export const resolveMealComplaint = (obj) =>
  api.patch(`${authEndpoint}/admin/meal-complaint`, obj);

export const additionalMealReq = (obj) =>
  api.post(`${authEndpoint}/admin/additional-meal`, obj);
