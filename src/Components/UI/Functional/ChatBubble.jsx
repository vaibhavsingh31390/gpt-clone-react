import { useContext } from "react";
import "./ChatBubble.css";
import ChatContext from "./../../../store/chat-context";
import logo from "./../../../assets/media/images/logo.svg";
import user from "./../../../assets/media/images/user.png";
function ChatBubble() {
  const chatCtx = useContext(ChatContext);
  console.log(chatCtx);
  return (
    <div className="chat--messages--area">
      {chatCtx.messages && chatCtx.messages.length > 0 ? (
        <ul>
          {chatCtx.messages.map((chat, index) => (
            <li key={index}>
              <div className="img">
                <img
                  className="me-2"
                  src={chat.gpt ? logo : user}
                  alt="image"
                />
              </div>

              <div className="text">
                <b>{chat.gpt ? "GPT" : "YOU"}</b>
                <br />
                {chat.message}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        ""
      )}
    </div>
  );
}

export default ChatBubble;
