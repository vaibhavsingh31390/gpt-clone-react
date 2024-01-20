/* eslint-disable react/no-unescaped-entities */
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./form.module.css";
import CustomInput from "./../Elements/CustomInput";
import CustomButton from "./../Elements/CustomButton";
import useSetActive from "./../../../Hooks/ActiveHook.js";
import routes from "./../../../Utils/Routes";
import ToastService from "./../Toaster/Toaster.jsx";
const LoginForm = () => {
  const userEmailRef = useRef(null);
  const userPassRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const activeHook = useSetActive();
  const loginHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!userEmailRef.current.value) {
      userEmailRef.current.focus();
      setLoading(false);
      return ToastService("Please fill valid email.", false);
    } else if (!userPassRef.current.value) {
      userPassRef.current.focus();
      setLoading(false);
      return ToastService("Please fill valid password.", false);
    }
    try {
      const response = await fetch(`${routes.host}${routes.login}`, {
        method: "POST",
        body: JSON.stringify({
          email: userEmailRef.current.value,
          password: userPassRef.current.value,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        const data = await response.json();
        setLoading(false);
        return ToastService(data.Message, false);
      }
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("jwt", data.payload.token);
        localStorage.setItem("user_data", JSON.stringify(data.payload.users));
        ToastService(data.message, true);
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <>
      <div
        className={`${styles["auth--form--wrapper"]} ${
          activeHook ? styles.active : ""
        }`}
      >
        <h4 className={styles["auth--form--wrapper-heading"]}>Login.</h4>
        <p>Chat with finesse, powered by AI's impress!</p>
        <form>
          <CustomInput
            options={{
              type: "email",
              name: "email",
              placeholder: "enter email..",
              label: "Email",
            }}
            ref={userEmailRef}
          />
          <CustomInput
            options={{
              type: "password",
              name: "password",
              placeholder: "enter password..",
              label: "Password",
            }}
            ref={userPassRef}
          />
          <Link to="/register" className={styles["custom--link"]}>
            <p>Don't have an account?</p>
          </Link>
          <CustomButton
            type={"submit"}
            value={"Submit"}
            onClickHandler={(e) => {
              loginHandler(e);
            }}
            loader={loading}
          />
        </form>
      </div>
    </>
  );
};

export default LoginForm;
