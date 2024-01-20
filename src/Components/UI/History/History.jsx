import { useCallback, useContext, useEffect, useState } from "react";
import styles from "./History.module.css";
import routes from "./../../../Utils/Routes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import AuthContext from "./../../../store/auth-context";
import ChatContext from "./../../../store/chat-context";

function History() {
  const chatCtx = useContext(ChatContext);
  const [data, setData] = useState(null);
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
        setData(data.payload.data);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    fetchChats();
  }, [fetchChats]);

  const handleChatHistoryItemDelete = (id) => {
    console.log("ITEM CLICKED FOR DELETE", id);
  };
  const handleChatHistoryItem = (id) => {
    console.log("ITEM CLICKED", id);
    chatCtx.itemListAction();
  };

  return (
    <>
      <ul className={`${styles["history-list"]} mt-2 py-0 px-2`}>
        {data
          ? data.map((list, index) => (
              <li
                className={`${styles["history-list-item"]}`}
                key={index}
                onClick={() => {
                  handleChatHistoryItem(list.conversationId);
                }}
              >
                <div className={`${styles["history-list-item-text"]}`}>
                  {list.message.length > 25
                    ? list.message.substring(0, 20) + "..."
                    : list.message}
                </div>
                <div
                  className={`${styles["history-list-item-actions"]}`}
                  onClick={() => {
                    handleChatHistoryItemDelete(list.conversationId);
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
