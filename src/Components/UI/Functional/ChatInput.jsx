import { useContext, useRef } from "react";
import "./ChatInput.css";
import { Form, Button } from "react-bootstrap";
import CustomTextarea from "./../elements/CustomTextarea";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpLong } from "@fortawesome/free-solid-svg-icons";
import ChatContext from "./../../../store/chat-context";
function ChatInput() {
  const chatCtx = useContext(ChatContext);
  const searchTextRef = useRef("");
  const handleSubmit = (event) => {
    event.preventDefault();
    const reqquestPayload = {
      gpt: false,
      message: searchTextRef.current.value,
    };
    searchTextRef.current.value = "";
    chatCtx.inputSubmitAction(reqquestPayload);

    // GPT API SPACE;
    setTimeout(() => {
      const demoRes = { gpt: true, message: "I am fine How Are you?" };
      chatCtx.newChatResponse(demoRes);
    }, 2000);
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
          <Button className="chat--submit--button" type="submit">
            <FontAwesomeIcon icon={faUpLong} />
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
}

export default ChatInput;
