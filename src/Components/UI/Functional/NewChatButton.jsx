/* eslint-disable react/prop-types */
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from "./../../../assets/media/images/logo.svg";
import styles from "./NewChatButton.module.css";
function NewChatButton({ fn = () => {} }) {
  return (
    <div className={`${styles["chat--button--wrapper"]} py-3 px-2`}>
      <button
        className={`${styles["chat-button"]} py-2 px-2 w-100`}
        onClick={(e) => {
          fn(e);
        }}
      >
        <div className={styles["gpt-cl-logo"]}>
          <img src={logo} alt="gpt-cl" height={30} width={30} />
          <div className={styles["gpt-cl-btn-txt"]}>New Chat</div>
        </div>
        <FontAwesomeIcon icon={faPenToSquare} size="1x" />
      </button>
    </div>
  );
}

export default NewChatButton;
