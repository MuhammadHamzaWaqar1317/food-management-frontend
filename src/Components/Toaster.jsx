import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const showError = (errorMsg) => {
  toast.error(errorMsg, {
    position: "top-right",
    theme: "light",
    toastId: "toastError",
    closeOnClick: true,
  });
};

export const showSuccess = (errorMsg) => {
  toast.success(errorMsg, {
    position: "top-right",
    theme: "light",
    toastId: "toastSuccess",
    closeOnClick: true,
  });
};
