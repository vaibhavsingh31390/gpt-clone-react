/* eslint-disable react/no-unescaped-entities */
import { useRef } from "react";
import { Link } from "react-router-dom";
import styles from "./form.module.css";
import CustomInput from "./../UI/Elements/CustomInput";
import CustomButton from "./../UI/Elements/CustomButton";
import useSetActive from "./../../Hooks/ActiveHook.js";
import routes from "./../../Utils/Routes.js";
const LoginForm = () => {
  const userEmailRef = useRef(null);
  const userPassRef = useRef(null);
  const activeHook = useSetActive();
  const loginHandler = async (e) => {
    e.preventDefault();
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
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("jwt", data.payload.token);
        localStorage.setItem("user_data", JSON.stringify(data.payload.users));
        setTimeout(() => {
          window.location.reload();
        }, 500);
        console.log(data);
      }
    } catch (error) {
      console.log(error);
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
          />
        </form>
      </div>
    </>
  );
};

export default LoginForm;
