import { jwtDecode } from "jwt-decode";

export const tokenData = () => {
  const token = localStorage.getItem("token");
  const data = jwtDecode(token);
  return data;
};
