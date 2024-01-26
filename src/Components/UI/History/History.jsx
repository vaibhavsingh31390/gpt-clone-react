import { useCallback, useContext, useEffect, useState } from "react";
import styles from "./History.module.css";
import routes from "./../../../Utils/Routes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import AuthContext from "./../../../store/auth-context";
import ChatContext from "./../../../store/chat-context";
import {
  handleChatDeleteRequest,
  handleChatFetchRequest,
} from "./../../../Utils/methods";

function History() {
  const [getToggle, setGetToggle] = useState(false);
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
  }, [fetchChats, getToggle]);

  const handleChatHistoryItemDelete = async (id, event) => {
    event.stopPropagation();
    const mcd = await handleChatDeleteRequest(id);
    if (mcd) {
      chatCtx.itemListDeleteAction(id);
      chatCtx.newChatAction();
      setTimeout(() => {
        setGetToggle((prev) => {
          !prev;
        });
      }, 800);
    } else {
      console.log("ERROR IN DELETE");
    }
  };
  const handleChatHistoryItem = async (id) => {
    const mcd = await handleChatFetchRequest(id);
    const msgObject = mcd.data.payload.data.map((element) => {
      const userMessageObject = {
        gpt: false,
        message: element.message,
      };
      const gptResponseObject = {
        gpt: true,
        message: element.response.choices[0].message.content,
      };
      return [userMessageObject, gptResponseObject];
    });
    const flattenedArray = msgObject.flat();
    if (mcd.status) {
      chatCtx.itemListAction(flattenedArray);
      ctx.groupId = mcd.data.payload.data[0].group_id;
    } else {
      console.log("ERROR IN FETCH");
    }
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
                  handleChatHistoryItem(list.group_id);
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
                    handleChatHistoryItemDelete(list.group_id, e);
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
