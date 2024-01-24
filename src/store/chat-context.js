import React from "react";

const ChatContext = React.createContext({
  messages: [],
  itemListAction: () => {},
  itemListDeleteAction: () => {},
  inputSubmitAction: () => {},
  newChatAction: () => {},
  newChatResponse: () => {},
});

export default ChatContext;
