import ReactDOM from "react-dom";
import { ToastContainer, toast } from "react-toastify";
import styles from "./toaster.module.css";
import "react-toastify/dist/ReactToastify.css";
const ToastComponent = () => {
  const triggerToast = (event, type = true) => {
    event.preventDefault();
    type
      ? toast.success("Error Notification !", {
          position: toast.POSITION.TOP_LEFT,
          autoClose: 500000,
          className: styles["toast-custom"],
        })
      : toast.error("Error Notification !", {
          position: toast.POSITION.TOP_LEFT,
          autoClose: 50000,
          className: styles["toast-custom"],
        });
  };

  return (
    <div>
      <button onClick={(e) => triggerToast(e, true)}>Show Toast</button>
      <ToastContainer />
    </div>
  );
};

const ToastPortal = () => {
  return ReactDOM.createPortal(
    <ToastComponent />,
    document.getElementById("alerts")
  );
};

export default ToastPortal;
