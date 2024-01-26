import React from "react";

const ChatContext = React.createContext({
  messages: [],
  list: [],
  itemListAction: () => {},
  itemListFetch: () => {},
  itemListDeleteAction: () => {},
  inputSubmitAction: () => {},
  newChatAction: () => {},
  newChatResponse: () => {},
});

export default ChatContext;
