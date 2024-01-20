/* eslint-disable react/prop-types */
import ReactDOM from "react-dom";
import { ToastContainer } from "react-toastify";
import "./toaster.css";
import "react-toastify/dist/ReactToastify.css";
const ToasterContainer = () => {
  return (
    <>
      <ToastContainer />
    </>
  );
};

const ToastPortal = () => {
  return ReactDOM.createPortal(
    <ToasterContainer />,
    document.getElementById("alerts")
  );
};

export default ToastPortal;
