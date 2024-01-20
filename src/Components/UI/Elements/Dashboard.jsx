/* eslint-disable react/prop-types */
import { faBars } from "@fortawesome/free-solid-svg-icons";
import "./Dashboard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Col } from "react-bootstrap";
function Dashboard({ children }) {
  const [toggle, setToggle] = useState(false);
  const [standByClass, setStandByClass] = useState("");
  const handleSideBar = () => {
    setToggle((prev) => !prev);
    setStandByClass("stand-by");
    setTimeout(() => {
      setStandByClass("");
    }, 200);
  };
  return (
    <Col md={12} lg={12} sm={12} className="p-0">
      <div
        className={`gpt-cl-dashboard${
          toggle ? " toggle-mode" : ""
        } ${standByClass}`}
      >
        {children}
        <div
          className="menu-toggle-wrapper"
          onClick={(e) => {
            handleSideBar(e);
          }}
        >
          <FontAwesomeIcon icon={faBars} size="2x" />
        </div>
      </div>
    </Col>
  );
}

export default Dashboard;
