import React, { useEffect, useRef, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";

function Chat({ socket, username, room }) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  const chatRef = useRef({});
  console.log(chatRef.current.time);
  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        author: username,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes() +
          ":" +
          new Date(Date.now()).getSeconds(),
      };

      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      chatRef.current = messageData;
      setCurrentMessage("");
      console.log(chatRef);
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      console.log(data);
      if (!chatRef.current.time) {
        console.log("sampe sini loh");
        chatRef.current = data;
        setMessageList((list) => [...list, chatRef.current]);
      }
      if (chatRef.current.time) {
        if (chatRef.current.time !== data.time) {
          console.log("sampe sini");
          chatRef.current = data;
          setMessageList((list) => [...list, chatRef.current]);
        }
      }
    });
  }, [socket]);

  // useEffect(() => {
  //   setMessageList((list) => [...list, chatRef.current]);
  // }, [chatRef.current]);

  return (
    <div className="chat-window">
      <div className="chat-header">
        <p>Live Chat</p>
      </div>
      <div className="chat-body">
        <ScrollToBottom className="message-container">
          {messageList.map((messageContent) => {
            console.log(messageContent);
            return (
              <div
                className="message"
                id={username === messageContent.author ? "you" : "other"}
              >
                <div>
                  <div className="message-content">
                    <p>{messageContent.message}</p>
                  </div>
                  <div className="message-meta">
                    <p id="time">{messageContent.time}</p>
                    <p id="author">{messageContent.author}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </ScrollToBottom>
      </div>
      <div className="chat-footer">
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
  );
}

export default Chat;
