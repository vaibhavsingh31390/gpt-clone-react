/* eslint-disable react/prop-types */
import { useContext, useRef, useState } from "react";
import "./ChatInput.css";
import { Form, Button } from "react-bootstrap";
import CustomTextarea from "./../Elements/CustomTextarea";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpLong } from "@fortawesome/free-solid-svg-icons";
import ChatContext from "./../../../store/chat-context";
import AuthContext from "./../../../store/auth-context.js";
import routes from "./../../../Utils/Routes";
import ToastService from "../Toaster/ToastService";
import { handleFetchCHats } from "../../../Utils/methods.js";
function ChatInput(props) {
  const chatCtx = useContext(ChatContext);
  const authCtx = useContext(AuthContext);
  const searchTextRef = useRef(null);
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (searchTextRef.current.value.length === 0) return;
    let oldMessage = "";
    if (chatCtx.messages.length > 0) {
      oldMessage = chatCtx.messages
        .filter((msg) => msg.gpt === false)
        .map((msg) => msg.message)
        .join(" ");
    }
    const requestPayload = {
      gpt: false,
      message: searchTextRef.current.value,
      id: authCtx.user.id,
    };
    chatCtx.inputSubmitAction(requestPayload);
    try {
      const text = searchTextRef.current.value;
      searchTextRef.current.value = "";
      props.setLoading(true);
      const response = await fetch(`${routes.host}${routes.sendGPT}`, {
        method: "POST",
        body: JSON.stringify({
          text: `${oldMessage} ${text}`,
          groupId: authCtx.groupId,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authCtx.jwt}`,
        },
        credentials: "include",
      });
      if (!response.ok) {
        const data = await response.json();
        props.setLoading(false);
        const msg = data.Message.split("\n");
        if (chatCtx.messages.length === 1) {
          chatCtx.newChatAction(msg[1]);
        }
        return ToastService(msg[0], false);
      }

      if (response.ok) {
        const data = await response.json();
        props.setLoading(false);
        const gptRes = data.response.choices[0].message.content;
        const demoRes = { gpt: true, message: gptRes };
        chatCtx.newChatResponse(demoRes);
        const fetch = await handleFetchCHats(authCtx);
        chatCtx.itemListFetch(fetch.payload.data);
      }
    } catch (error) {
      console.log(error);
      props.setLoading(false);
      return ToastService("Something went wrong.", false);
    }
  };

  return (
    <div className="chat--input--area d-flex align-items-center justify-content-center">
      <Form onSubmit={handleSubmit} className="w-100">
        <Form.Group className="chat--submit--input">
          <CustomTextarea
            options={{
              type: "text",
              name: "search_text",
              placeholder: "How can I help you today?",
              label: "",
            }}
            ref={searchTextRef}
          />
          <Button
            className={`chat--submit--button${
              props.loading ? " disabled-btn" : ""
            }`}
            type="submit"
          >
            <FontAwesomeIcon icon={faUpLong} />
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
}

export default ChatInput;
