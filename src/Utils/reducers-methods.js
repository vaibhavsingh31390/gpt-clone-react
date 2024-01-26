export function UserProfileActionsReducer(state, action) {
  switch (action.type) {
    case "LOGOUT":
      localStorage.removeItem("jwt");
      localStorage.removeItem("user_data");
      return {
        ...state,
        menuOpen: !state.menuOpen,
      };
    case "TOGGLE_MENU":
      return {
        ...state,
        menuOpen: !state.menuOpen,
      };
    case "SETTING":
      return {
        ...state,
        menuOpen: !state.menuOpen,
      };
    default:
      return state;
  }
}

export function ChatReducer(state, action) {
  switch (action.type) {
    case "ITEM_LIST_FETCH": {
      console.log("ITEM_LIST_FETCH");
      const data = action.payload;
      console.log(data);
      return {
        ...state,
        list: data,
      };
    }
    case "ITEM_LIST":
      console.log("ITEM_LIST", state, action.payload);
      return state;

    case "ITEM_LIST_DELETE": {
      console.log("ITEM_LIST_DELETE", state, action.payload);
      const { list } = state;
      const updatedMsg = list.filter(
        (msg) => msg.conversationId !== action.payload
      );
      return {
        ...state,
        list: updatedMsg,
      };
    }
    case "INPUT_SUBMIT": {
      console.log("INPUT_SUBMIT", state);
      const { messages } = state;
      let updatedMsg;
      if (messages.length >= 2) {
        updatedMsg = [...messages, action.payload];
      } else {
        updatedMsg = [action.payload];
      }
      return {
        ...state,
        messages: updatedMsg,
      };
    }

    case "RESPONSE": {
      const { messages } = state;
      const updatedMsg = [...messages, action.payload];
      return {
        ...state,
        messages: updatedMsg,
      };
    }

    case "NEW_CHAT": {
      console.log("NEW_CHAT", state);
      return {
        ...state,
        messages: [
          {
            gpt: true,
            message: "How may I help you today ?",
          },
        ],
      };
    }

    default:
      return state;
  }
}
