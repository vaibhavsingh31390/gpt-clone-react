/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import React from "react";
import { Form } from "react-bootstrap";
import styles from "./CustomInput.module.css";

const CustomInput = React.forwardRef((props, ref) => {
  const {
    type = "text",
    name = "",
    placeholder = "Enter text",
    label,
  } = props.options || {};
  return (
    <Form.Group className="mb-2">
      {label !== "" ? (
        <Form.Label className={styles["custom-input-label"]}>
          {label}
        </Form.Label>
      ) : (
        ""
      )}

      <Form.Control
        type={type}
        name={name}
        ref={ref}
        className={styles["custom-input"]}
        placeholder={placeholder}
      />
    </Form.Group>
  );
});

export default CustomInput;
