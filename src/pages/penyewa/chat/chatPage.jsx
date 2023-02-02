import React, { useState } from "react";
import { Button, Col, Container, Nav, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

import Profile from "../../../components/profile";
import PencariRoutes from "../../../routes/pencari";

import ChatField from "./chatField";
import { socket } from "../../pencari/chat/chatPage";

import PenyewaLayout from "../../../layouts/penyewa.layout";
export default function ChatPagePenyewa() {
  const [roomChat, setRoomChat] = useState([
    {
      image: "/none_avatar.png",
      idSeller: 2,
      idBuyer: 3,
      sellerName: "Kos Adifa",
      room: 1,
      lastchat: "pesann",
      status: "unread",
    },
    {
      image: "/none_avatar.png",
      idSeller: 2,
      idBuyer: 3,
      sellerName: "Kos Adifa2",
      room: 2,
      lastchat: "pesann",
      status: "unread",
    },
  ]);
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = ({ roomChosen }) => {
    if (roomChosen) {
      setRoom(roomChosen);
      socket.emit("join_room", roomChosen);
    }
    setShowChat(true);
  };

  return (
    <>
      <PenyewaLayout>
        <Container className="mt-2" id="chat">
          <Nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/" className="text-decoration-none">
                  Home
                </Link>
              </li>
              <li className="breadcrumb-item">
                <Link to="/profile" className="text-decoration-none">
                  User Pencari Kos
                </Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Chat
              </li>
            </ol>
          </Nav>
          <Row className="mt-md-5 ">
            <Col className="mb-3">
              <Profile routes={PencariRoutes} />
            </Col>
            <Col xs={12} lg={9} className="border rounded">
              <Container>
                <div
                  className="d-flex flex-column"
                  style={{ widht: "100vw", height: "60vh" }}
                >
                  <h6 className="fw-bold m-5">Chat</h6>
                  <div className="row">
                    <div
                      className="col-4  p-3 "
                      style={{
                        overflow: "scroll",
                        overflowX: "hidden",
                        height: "450px",
                      }}
                    >
                      {roomChat ? (
                        roomChat.map((room, index) => {
                          return (
                            <Button
                              key={index}
                              roompick={room.room}
                              value={room.room}
                              variant="link"
                              className="w-100 p-0 text-decoration-none"
                              onClick={(e) =>
                                joinRoom({ roomChosen: room.room })
                              }
                            >
                              <div className="d-flex border rounded p-2 align-items-center mb-1 ">
                                <img
                                  src="/none_avatar.png"
                                  alt=""
                                  className=""
                                  style={{ width: "48px", height: "48px" }}
                                ></img>
                                <div className="ms-2">
                                  <h6 className="mb-0 ms-1">
                                    {room.sellerName}
                                  </h6>
                                  <p className="mb-0">Pesan....</p>
                                </div>
                              </div>
                            </Button>
                          );
                        })
                      ) : (
                        <></>
                      )}
                    </div>
                    <div className="col-8">
                      {!showChat ? (
                        <>
                          <img
                            src="https://assets.tokopedia.net/assets-tokopedia-lite/v2/zeus/kratos/349f0f78.png"
                            alt=""
                            className="w-100"
                          ></img>
                        </>
                      ) : (
                        <ChatField
                          socket={socket}
                          room={room}
                          user={roomChat[room - 1]}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </Container>
            </Col>
          </Row>
        </Container>
      </PenyewaLayout>
    </>
  );
}
