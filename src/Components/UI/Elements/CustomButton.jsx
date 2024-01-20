/* eslint-disable react/prop-types */
import { Button } from "react-bootstrap";
import styles from "./CustomButton.module.css";
import Loader from "./Loader";
const CustomButton = (props) => {
  return (
    <>
      <div
        className={`${styles["Button--loader"]} ${
          styles[props.customClass] || ""
        }`}
      >
        <div className={styles["Button-wrapper"]}>
          <Button
            type={props.type}
            className={styles["custom--button"]}
            onClick={(e) => props.onClickHandler(e)}
          >
            {props.value}
          </Button>
        </div>

        {props.loader ? (
          <div className={styles["loader-wrapper"]}>
            <Loader height={props.height || 20} width={props.width || 20} />{" "}
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default CustomButton;
