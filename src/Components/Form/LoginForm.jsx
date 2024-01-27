/* eslint-disable react/no-unescaped-entities */
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./form.module.css";
import CustomInput from "./../UI/Elements/CustomInput";
import CustomButton from "./../UI/Elements/CustomButton";
import useSetActive from "./../../Hooks/ActiveHook.js";
import routes from "./../../Utils/Routes.js";
import ToastService from "./../UI/Toaster/ToastService.jsx";
const LoginForm = () => {
  const userEmailRef = useRef(null);
  const userPassRef = useRef(null);
  const activeHook = useSetActive();
  const [loading, setLoading] = useState(false);
  const loginHandler = async (e) => {
    e.preventDefault();
    alert("I was triggered");
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (userEmailRef.current.value === "") {
      return ToastService("Email is required.", false);
    } else if (userPassRef.current.value === "") {
      return ToastService("Password is required.", false);
    } else if (!passwordRegex.test(userPassRef.current.value)) {
      return ToastService("Invalid password format.", false);
    }
    try {
      setLoading(true);
      alert("I was triggered before reuqest");

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
      alert("I was triggered aster request");

      if (!response.ok) {
        const data = await response.json();
        setLoading(false);
        alert("I was triggered in error case");

        return ToastService(data.Message, false);
      }

      if (response.ok) {
        alert("I was triggered on success");
        const data = await response.json();
        localStorage.setItem("jwt", data.payload.token);
        localStorage.setItem("user_data", JSON.stringify(data.payload.users));
        ToastService("Logged in successfully.", true);
        setTimeout(() => {
          window.location.reload();
        }, 500);
        setLoading(false);
        console.log(data);
      }
    } catch (error) {
      alert("I was triggered on catch block", error);
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
            loader={loading}
            onClickHandler={(e) => {
              loginHandler(e);
            }}
          />
        </form>
      </div>
    </>
  );
};

export default LoginForm;
