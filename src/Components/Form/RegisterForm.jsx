/* eslint-disable react/no-unescaped-entities */
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./form.module.css";
import routes from "./../../Utils/Routes.js";
import CustomInput from "./../UI/Elements/CustomInput";
import CustomButton from "./../UI/Elements/CustomButton";
import useSetActive from "./../../Hooks/ActiveHook.js";
import ToastService from "./../UI/Toaster/ToastService.jsx";
const RegisterForm = () => {
  const userNameRef = useRef(null);
  const userEmailRef = useRef(null);
  const userAgeRef = useRef(null);
  const userPassRef = useRef(null);
  const userCPassRef = useRef(null);
  const activeHook = useSetActive();
  const [loading, setLoading] = useState(false);
  const registerHandler = async (e) => {
    e.preventDefault();
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (userEmailRef.current.value === "") {
      return ToastService("Email is required.", false);
    } else if (userPassRef.current.value === "") {
      return ToastService("Password is required.", false);
    } else if (userNameRef.current.value === "") {
      return ToastService("Username is required.", false);
    } else if (userAgeRef.current.value === "") {
      return ToastService("Age is required.", false);
    } else if (userCPassRef.current.value === "") {
      return ToastService("Confirm Password is required.", false);
    } else if (userCPassRef.current.value !== userPassRef.current.value) {
      return ToastService(
        "Confirm Password should be same as password..",
        false
      );
    } else if (!passwordRegex.test(userPassRef.current.value)) {
      return ToastService(
        "Invalid password format\n(min. 8 char using number, char. and special char.)",
        false
      );
    }
    try {
      setLoading(true);
      const response = await fetch(`${routes.host}${routes.register}`, {
        method: "POST",
        body: JSON.stringify({
          email: userEmailRef.current.value,
          password: userPassRef.current.value,
          name: userNameRef.current.value,
          age: userAgeRef.current.value,
          cpassword: userCPassRef.current.value,
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
        ToastService("Registration successfully.", true);
        setTimeout(() => {
          window.location.reload();
        }, 500);
        setLoading(false);
      }
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
        <h4 className={styles["auth--form--wrapper-heading"]}>Register.</h4>
        <p>Chat with finesse, powered by AI's impress!</p>
        <form>
          <CustomInput
            options={{
              type: "text",
              name: "name",
              placeholder: "enter name..",
              label: "name",
            }}
            ref={userNameRef}
          />
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
              type: "date",
              name: "age",
              placeholder: "Whats your age ?",
              label: "Age",
            }}
            ref={userAgeRef}
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
          <CustomInput
            options={{
              type: "password",
              name: "cpassword",
              placeholder: "retype password..",
              label: "Confirm Password",
            }}
            ref={userCPassRef}
          />
          <Link to="/" className={styles["custom--link"]}>
            <p>Have an account already ?</p>
          </Link>
          <CustomButton
            type={"submit"}
            value={"Submit"}
            loader={loading}
            onClickHandler={(e) => {
              registerHandler(e);
            }}
          />
        </form>
      </div>
    </>
  );
};

export default RegisterForm;
