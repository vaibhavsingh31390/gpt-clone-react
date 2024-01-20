import React from "react";

const ChatContext = React.createContext({
  messages: [],
  itemListAction: () => {},
  inputSubmitAction: () => {},
  newChatAction: () => {},
  newChatResponse: () => {},
});

export default ChatContext;
