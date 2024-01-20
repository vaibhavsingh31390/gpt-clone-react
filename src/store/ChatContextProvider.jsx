/* eslint-disable react/prop-types */
import { useReducer } from "react";
import ChatContext from "./chat-context.js";
import { ChatReducer } from "./../Utils/reducers-methods.js";
const ChatProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ChatReducer, {
    messages: [
      {
        gpt: false,
        message: "Lorem ipsum dolor sit amet.",
      },
      {
        gpt: true,
        message:
          "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ut, sed.",
      },
    ],
  });
  const itemListAction = () => {
    dispatch({ type: "ITEM_LIST" });
  };

  const inputSubmitAction = (message) => {
    dispatch({ type: "INPUT_SUBMIT", payload: message });
  };

  const newChatAction = () => {
    dispatch({ type: "NEW_CHAT" });
  };

  const newChatResponse = (message) => {
    dispatch({ type: "RESPONSE", payload: message });
  };

  const contextValues = {
    messages: state.messages,
    itemListAction,
    inputSubmitAction,
    newChatAction,
    newChatResponse,
  };

  return (
    <ChatContext.Provider value={contextValues}>
      {children}
    </ChatContext.Provider>
  );
};

export default ChatProvider;
