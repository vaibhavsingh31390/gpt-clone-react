/* eslint-disable react/prop-types */
import user from "./../../../assets/media/images/user.png";
import styles from "./AccountChatButton.module.css";
import AuthContext from "./../../../store/auth-context";
import { useContext, useEffect, useRef, useState } from "react";
import {
  faCreditCard,
  faGear,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
function AccountChatButton({
  fn1 = () => {},
  fn2 = () => {},
  fn3 = () => {},
  fnSp = () => {},
  profileImage = user,
  menuState = false,
}) {
  const [active, setActive] = useState(false);
  const ctx = useContext(AuthContext);
  const handleClickFn1 = (e) => {
    e.preventDefault();
    fn1(e);
    setTimeout(() => {
      setActive((prev) => !prev);
    }, 150);
  };
  const handleClickFn2 = (e) => {
    e.preventDefault();
    fn2(e);
  };
  const handleClickFn3 = async (e) => {
    e.preventDefault();
    fn3(e);
  };

  const handleClickFnSp = async (e) => {
    e.preventDefault();
    fnSp(e);
  };

  return (
    <>
      <div className={`${styles["account--button--wrapper"]} py-2 px-2`}>
        <button
          className={`${styles["account-button"]} w-100`}
          onClick={handleClickFn1}
        >
          <div className={styles["gpt-cl-logo"]}>
            <img src={profileImage} alt="gpt-cl" height={30} width={30} />
            <div className={styles["gpt-cl-btn-txt"]}>{ctx.user.name}</div>

            <div
              className={`${styles["gpt-cl-btn-action"]} ${
                active ? styles["active"] : ""
              } ${!menuState.menuOpen ? "d-none" : ""}`}
            >
              <ul className={`${styles["gpt-cl-btn-action-list"]} p-0 m-0`}>
                <li
                  className={styles["gpt-cl-btn-action-list-item"]}
                  onClick={handleClickFn2}
                >
                  <FontAwesomeIcon icon={faGear} /> Settings
                </li>
                <li
                  className={styles["gpt-cl-btn-action-list-item"]}
                  onClick={handleClickFnSp}
                >
                  <FontAwesomeIcon icon={faCreditCard} />
                  Credits
                </li>
                <li
                  className={styles["gpt-cl-btn-action-list-item"]}
                  onClick={handleClickFn3}
                >
                  <FontAwesomeIcon icon={faRightFromBracket} />
                  Logout
                </li>
              </ul>
            </div>
          </div>
        </button>
      </div>
    </>
  );
}

export default AccountChatButton;
