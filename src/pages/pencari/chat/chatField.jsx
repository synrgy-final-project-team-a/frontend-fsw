import React, { useEffect, useRef, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import { useDispatch, useSelector } from "react-redux";
import { useGetHistoryChatMutation } from "../../../store/apis/chat";
import { addHistoryChat } from "../../../store/slices/chatSlice";

export default function ChatField({ socket, room, header }) {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const userData = useSelector((state) => state.user.current);
  const [
    getHistoryChatHit,
    {
      isLoading: isLoadingHistoryChat,
      isError: isErrorHistoryChat,
      error: errorHistoryChat,
      isSuccess: isSuccessHistoryChat,
      data: dataHistoryChat,
    },
  ] = useGetHistoryChatMutation();

  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const chatRef = useRef({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    try {
      getHistoryChatHit({ token: token.access_token, body: { roomId: room } });
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }, [room]);

  useEffect(() => {
    if (isSuccessHistoryChat) {
      setMessageList(dataHistoryChat.data);
      dispatch(addHistoryChat(dataHistoryChat));
    }

    if (isErrorHistoryChat) {
      console.log("error");
      console.log(errorHistoryChat);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoadingHistoryChat]);

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageDataSend = {
        roomId: room,
        message: currentMessage,
        sender: token.access_token,
      };
      const messageData = {
        roomId: room,
        message: currentMessage,
        sender_id: userData.id,
      };
      await socket.emit("send-message", messageDataSend);
      setMessageList((list) => [...list, messageData]);

      chatRef.current = messageData;
      setCurrentMessage("");
    }
  };
  useEffect(() => {
    socket.on("receive-message", (data) => {
      if (!chatRef.current.created_at) {
        chatRef.current = data;
        setMessageList((list) => [...list, data]);
      }
      if (chatRef.current.created_at) {
        if (chatRef.current.created_at !== data.created_at) {
          chatRef.current = data;
          setMessageList((list) => [...list, data]);
        }
      }
    });
  }, [socket]);
  return (
    <>
      <div className="d-flex flex-column p-3 window-chat card">
        <div className="d-flex align-items-center mb-3  p-2 rounded chat-header">
          <img
            src={header.avatar}
            alt=""
            className=""
            style={{ width: "48px", height: "48px" }}
          ></img>
          <div className="ms-2">
            <h6 className="mb-0">{header.nameKos}</h6>
          </div>
        </div>
        <div className="chat-body">
          <ScrollToBottom className="message-container">
            {messageList.map((messageContent, index) => {
              return (
                <div
                  key={index}
                  className="message"
                  id={userData.id != messageContent.sender_id ? "you" : "other"}
                >
                  <div>
                    <div className="message-content">
                      <p>{messageContent.message}</p>
                    </div>
                    <p
                      className="align-self-end ms-1 mb-1"
                      style={{ width: "50px" }}
                    >
                      {messageContent.createdat}
                    </p>
                  </div>
                </div>
              );
            })}
          </ScrollToBottom>
        </div>
        <div className="chat-footer ">
          <input
            type="text"
            value={currentMessage}
            placeholder="Hey..."
            onChange={(event) => {
              setCurrentMessage(event.target.value);
            }}
            onKeyPress={(event) => {
              event.key === "Enter" && sendMessage();
            }}
          />
          <button onClick={sendMessage}>&#9658;</button>
        </div>
      </div>
    </>
  );
}
