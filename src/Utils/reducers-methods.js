import Cookies from "js-cookie";
export function UserProfileActionsReducer(state, action) {
  switch (action.type) {
    case "LOGOUT":
      localStorage.removeItem("jwt");
      localStorage.removeItem("user_data");
      Cookies.remove("jwt");
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
      const data = action.payload;
      return {
        ...state,
        list: data,
      };
    }
    case "ITEM_LIST": {
      return {
        ...state,
        messages: action.payload,
      };
    }
    case "ITEM_LIST_DELETE": {
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
