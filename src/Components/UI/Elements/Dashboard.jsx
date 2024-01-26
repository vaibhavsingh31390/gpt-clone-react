/* eslint-disable react/prop-types */
import { faBars } from "@fortawesome/free-solid-svg-icons";
import "./Dashboard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Col } from "react-bootstrap";
import { useContext } from "react";
import { SidebarContext } from "./../../../store/SidebarContextProvide";
function Dashboard(props) {
  const sidebarCtx = useContext(SidebarContext);
  return (
    <Col md={12} lg={12} sm={12} className="p-0">
      <div
        className={`gpt-cl-dashboard${
          sidebarCtx.toggle ? " toggle-mode" : ""
        } ${sidebarCtx.standByClass}`}
      >
        {props.children}
        <div
          className="menu-toggle-wrapper"
          onClick={(e) => {
            sidebarCtx.handleSideBar(e);
          }}
        >
          <FontAwesomeIcon icon={faBars} size="2x" />
        </div>
      </div>
    </Col>
  );
}

export default Dashboard;
