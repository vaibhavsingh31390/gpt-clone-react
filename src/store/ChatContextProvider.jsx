/* eslint-disable react/prop-types */
import { useReducer } from "react";
import ChatContext from "./chat-context.js";
import { ChatReducer } from "./../Utils/reducers-methods.js";
const ChatProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ChatReducer, {
    messages: [
      {
        gpt: true,
        message: "How may I help you today ?",
      },
    ],
    list: [],
  });

  const itemListFetch = (response) => {
    dispatch({ type: "ITEM_LIST_FETCH", payload: response });
  };

  const itemListAction = (conversationId) => {
    dispatch({ type: "ITEM_LIST", payload: conversationId });
  };

  const itemListDeleteAction = (conversationId) => {
    dispatch({ type: "ITEM_LIST_DELETE", payload: conversationId });
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
    list: state.list,
    itemListAction,
    itemListFetch,
    itemListDeleteAction,
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
