/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import React from "react";
import { Form } from "react-bootstrap";
import styles from "./CustomTextarea.module.css"; // You may want to create a separate CSS file

const CustomTextarea = React.forwardRef((props, ref) => {
  const { name = "", placeholder = "Enter text", label } = props.options || {};

  return (
    <Form.Group className="mb-2">
      {label !== "" ? (
        <Form.Label className={styles["custom-textarea-label"]}>
          {label}
        </Form.Label>
      ) : (
        ""
      )}

      <Form.Control
        as="textarea"
        name={name}
        ref={ref}
        className={styles["custom-textarea"]}
        placeholder={placeholder}
      />
    </Form.Group>
  );
});

export default CustomTextarea;
