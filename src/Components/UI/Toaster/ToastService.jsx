import { toast } from "react-toastify";

const ToastService = (message, type = true) => {
  console.log(message, type);
  const toastOptions = {
    position: toast.POSITION.TOP_RIGHT,
    autoClose: 3500,
    hideProgressBar: false,
    pauseOnHover: true,
    toastId: type ? "toaster--success" : "toaster--error",
  };

  type
    ? toast.success(message, toastOptions)
    : toast.error(message, toastOptions);
};

export default ToastService;
