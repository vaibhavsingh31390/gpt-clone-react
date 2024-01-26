import { useCallback, useContext, useEffect } from "react";
import styles from "./History.module.css";
import routes from "./../../../Utils/Routes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import AuthContext from "./../../../store/auth-context";
import ChatContext from "./../../../store/chat-context";

function History() {
  const chatCtx = useContext(ChatContext);
  const ctx = useContext(AuthContext);
  const fetchChats = useCallback(async () => {
    try {
      const response = await fetch(`${routes.host}${routes.fetchAllChats}`, {
        method: "GET",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${ctx.jwt}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        chatCtx.itemListFetch(data.payload.data);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    fetchChats();
  }, [fetchChats]);

  const handleChatHistoryItemDelete = (id, event) => {
    event.stopPropagation();
    chatCtx.itemListDeleteAction(id);
  };
  const handleChatHistoryItem = (id) => {
    chatCtx.itemListAction(id);
  };
  return (
    <>
      <ul className={`${styles["history-list"]} mt-2 py-0 px-2`}>
        {chatCtx.list
          ? chatCtx.list.map((list, index) => (
              <li
                className={`${styles["history-list-item"]}`}
                key={index}
                onClick={() => {
                  handleChatHistoryItem(list.conversationId);
                }}
              >
                <div
                  className={`${styles["history-list-item-text"]}`}
                  title={list.message}
                >
                  {list.message.length > 25
                    ? list.message.substring(0, 23) + "..."
                    : list.message}
                </div>
                <div
                  className={`${styles["history-list-item-actions"]}`}
                  onClick={(e) => {
                    handleChatHistoryItemDelete(list.conversationId, e);
                  }}
                >
                  <FontAwesomeIcon icon={faTrash} size="xs" />
                </div>
              </li>
            ))
          : ""}
      </ul>
    </>
  );
}

export default History;
