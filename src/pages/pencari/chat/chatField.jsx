import React, { useEffect, useRef, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";

export default function ChatField({ socket, room, user }) {
  console.log(room);
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const chatRef = useRef({});

  // const data1 = [
  //   {
  //     id: 1,
  //     room_id: 1,
  //     message: "cekk1234",
  //     sender: 2,
  //     status: "isread",
  //     createdat: "12:23",
  //   },
  //   {
  //     id: 2,
  //     room_id: 1,
  //     message: "dicek",
  //     sender: 1,
  //     status: "isread",
  //     createdat: "12:24",
  //   },
  // ];
  // const data2 = [
  //   {
  //     id: 1,
  //     room_id: 1,
  //     message: "apa",
  //     sender: 1,
  //     status: "isread",
  //     createdat: "12:23",
  //   },
  //   {
  //     id: 2,
  //     room_id: 1,
  //     message: "ei",
  //     sender: 2,
  //     status: "isread",
  //     createdat: "12:24",
  //   },
  // ];
  // useEffect(() => {
  //   if (room === 1) {
  //     chatRef.history = data1;
  //     console.log(chatRef);
  //   }
  //   if (room === 2) {
  //     chatRef.history = data2;
  //     console.log(chatRef);
  //   }
  // }, [room]);

  const userid = 2;

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        // id: 2,
        room_id: room,
        message: currentMessage,
        sender: userid,
        status: null,
        createdat:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes() +
          ":" +
          new Date(Date.now()).getSeconds(),
      };
      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      // chatRef.history.push(messageData);
      chatRef.current = messageData;
      setCurrentMessage("");
    }
  };
  useEffect(() => {
    socket.on("receive_message", (data) => {
      console.log(data);
      if (!chatRef.current.createdat) {
        chatRef.current = data;
        // chatRef.history.push(data);
        setMessageList((list) => [...list, data]);
      }
      if (chatRef.current.createdat) {
        if (chatRef.current.createdat !== data.createdat) {
          chatRef.current = data;
          // chatRef.history.push(data);
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
            src="/none_avatar.png"
            alt=""
            className=""
            style={{ width: "48px", height: "48px" }}
          ></img>
          <div className="ms-2">
            <h6 className="mb-0">Kos adifa</h6>
          </div>
        </div>
        <div className="chat-body">
          <ScrollToBottom className="message-container">
            {messageList.map((messageContent, index) => {
              return (
                <div
                  key={index}
                  className="message"
                  id={userid === messageContent.sender ? "other" : "you"}
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
