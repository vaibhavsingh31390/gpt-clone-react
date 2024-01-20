/* eslint-disable react/no-unescaped-entities */
import { useRef } from "react";
import { Link } from "react-router-dom";
import styles from "./form.module.css";
import CustomInput from "./../UI/Elements/CustomInput";
import CustomButton from "./../UI/Elements/CustomButton";
import useSetActive from "./../../Hooks/ActiveHook.js";
const RegisterForm = () => {
  const userNameRef = useRef(null);
  const userEmailRef = useRef(null);
  const userAgeRef = useRef(null);
  const userPassRef = useRef(null);
  const userCPassRef = useRef(null);
  const activeHook = useSetActive();
  const registerHandler = (e) => {
    e.preventDefault();
    console.log([
      userNameRef.current.value,
      userEmailRef.current.value,
      userAgeRef.current.value,
      userPassRef.current.value,
      userCPassRef.current.value,
    ]);
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
            ref={userNameRef}
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
