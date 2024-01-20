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
    case "ITEM_LIST":
      console.log("ITEM_LIST", state);
      return state;

    case "INPUT_SUBMIT": {
      console.log("INPUT_SUBMIT", state);
      const newChat = action.payload;
      return {
        ...state,
        messages: [newChat],
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
        messages: [],
      };
    }

    default:
      return state;
  }
}
