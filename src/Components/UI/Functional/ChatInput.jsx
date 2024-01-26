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
function ChatInput() {
  const chatCtx = useContext(ChatContext);
  const authCtx = useContext(AuthContext);
  const searchTextRef = useRef("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const requestPayload = {
      gpt: false,
      message: searchTextRef.current.value,
    };
    chatCtx.inputSubmitAction(requestPayload);
    try {
      setLoading(true);
      const response = await fetch(`${routes.host}${routes.sendGPT}`, {
        method: "POST",
        body: JSON.stringify({
          text: requestPayload.message,
          groupId: authCtx.groupId,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (!response.ok) {
        const data = await response.json();
        setLoading(false);
        return ToastService(data.Message, false);
      }

      if (response.ok) {
        const data = await response.json();
        const gptRes = data.response.choices[0].message.content;
        const demoRes = { gpt: true, message: gptRes };
        chatCtx.newChatResponse(demoRes);
        searchTextRef.current.value = "";
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
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
          <Button className="chat--submit--button" type="submit">
            <FontAwesomeIcon icon={faUpLong} />
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
}

export default ChatInput;
