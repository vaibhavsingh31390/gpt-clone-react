/* eslint-disable react/prop-types */
import { useContext, useReducer } from "react";
import History from "./../History/History";
import AccountChatButton from "./../Functional/AccountChatButton";
import NewChatButton from "./../Functional/NewChatButton";
import "./SideBar.css";
import { UserProfileActionsReducer } from "./../../../Utils/reducers-methods.js";
import { Col } from "react-bootstrap";
import ChatContext from "./../../../store/chat-context.js";
import {
  handleCreditRequests,
  handleGenerateRandomBase64,
  handleLogoutRequest,
} from "./../../../Utils/methods.js";
import AuthContext from "./../../../store/auth-context.js";
import { SidebarContext } from "./../../../store/SidebarContextProvide.jsx";

function SideBar() {
  const authCtx = useContext(AuthContext);
  const chatCtx = useContext(ChatContext);
  const sidebatCtx = useContext(SidebarContext);
  const menu = { menuOpen: false };
  const [userAction, userActionDispatch] = useReducer(
    UserProfileActionsReducer,
    { menu }
  );
  const handleNewChat = () => {
    authCtx.groupId = handleGenerateRandomBase64();
    chatCtx.newChatAction();
    sidebatCtx.isMobile ? sidebatCtx.handleSideBar() : "";
  };
  const handleUserMenu = () => {
    userActionDispatch({ type: "TOGGLE_MENU" });
  };
  const handleSettings = () => {
    userActionDispatch({ type: "SETTING" });
  };
  const handleCreditsReq = async () => {
    await handleCreditRequests(authCtx);
  };
  const handleLogout = async () => {
    await handleLogoutRequest(authCtx);
    userActionDispatch({ type: "LOGOUT" });
    window.location.reload();
  };
  return (
    <Col md={12} lg={12} sm={12}>
      <div className="gpt-cl-sidebar py-0 px-0">
        <div className="gpt-cl-sidebar-top">
          <NewChatButton fn={handleNewChat} />
          <History />
        </div>
        <div className="gpt-cl-sidebar-bottom">
          <AccountChatButton
            name={"testing"}
            menuState={userAction}
            fn1={handleUserMenu}
            fn2={handleSettings}
            fn3={handleLogout}
            fnSp={handleCreditsReq}
          />
        </div>
      </div>
    </Col>
  );
}

export default SideBar;
