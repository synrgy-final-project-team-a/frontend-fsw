import React, { useState, useRef, useEffect } from "react";
import { Button, Col, Container, Nav, Row, Spinner } from "react-bootstrap";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Profile from "../../../components/profile";
import PencariRoutes from "../../../routes/pencari";
import io from "socket.io-client";
import ChatField from "./chatField";
import PencariLayout from "../../../layouts/pencari.layout";
import { useDispatch, useSelector } from "react-redux";
import { useGetListRoomChatMutation } from "../../../store/apis/chat";
import { addlistRoomChat } from "../../../store/slices/chatSlice";

export const socket = io.connect("http://localhost:8090");

// module.esport = socket;
export default function ChatPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const newChat = useSelector((state) => state.chat.newChat);
  const listRoomChat = useSelector((state) => state.chat.listRoomChat);
  const token = useSelector((state) => state.auth.token);

  const [
    getListRoomHit,
    {
      isLoading: isLoadingListRoom,
      isError: isErrorListRoom,
      error: errorListRoom,
      isSuccess: isSuccessListRoom,
      data: dataListRoom,
    },
  ] = useGetListRoomChatMutation();

  const [roomChat, setRoomChat] = useState([]);
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [header, setHeader] = useState({});
  const listRoamRef = useRef({});
  useEffect(() => {
    setLoading(true);
    try {
      getListRoomHit({ token: token.access_token });
    } catch (error) {
      console.log(error);
    }
    if (searchParams.get("newChat")) {
      const nameKos = searchParams.get("nameKost");
      const avatar = searchParams.get("avatar");

      socket.emit("join-room", {
        roomId: newChat.data.room_id,
        token: token.access_token,
      });

      setHeader({ nameKos: nameKos, avatar: avatar });
      setRoom(newChat.data.room_id);
      setShowChat(true);
    }

    // join socket list room chat
    socket.emit("load-room-chat", { token: token.access_token });
  }, []);

  useEffect(() => {
    if (isSuccessListRoom) {
      setRoomChat(dataListRoom.data);
      dispatch(addlistRoomChat(dataListRoom));
      console.log(dataListRoom.data);
      listRoamRef.curent = dataListRoom.data;
    }

    if (isErrorListRoom) {
      console.log("error");
      console.log(errorListRoom);
    }
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoadingListRoom]);

  // ntar ini list room chat ketika chaat masuk
  useEffect(() => {
    // setLoading(true);
    socket.on("load-room-chat", (data) => {
      console.log(roomChat);
      console.log(data.data);
      setRoomChat(data.data);
    });
  }, [socket]);

  const joinRoom = ({ roomId, nameKos, avatar, urutan }) => {
    if (roomChat[urutan].status_message === null) {
      // roomChat[urutan].status_message = "READED";
      const statusIcon = document.getElementById(`status${urutan}`);
      statusIcon.classList.add("visually-hidden");
    }

    if (roomId) {
      setHeader({ nameKos: nameKos, avatar: avatar });
      setRoom(roomId);
      socket.emit("join-room", { token: token.access_token, roomId });
    }
    setShowChat(true);
  };
  // console.log(roomChat);
  return (
    <>
      <PencariLayout>
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
                      {loading ? (
                        <Spinner animation="border" role="status">
                          <span className="visually-hidden"></span>
                        </Spinner>
                      ) : roomChat ? (
                        roomChat.map((room, index) => {
                          return (
                            <Button
                              key={index}
                              variant="link"
                              className="w-100 p-0 text-decoration-none"
                              onClick={(e) =>
                                joinRoom({
                                  urutan: index,
                                  roomId: room.room_id,
                                  nameKos: room.kost_name,
                                  avatar: room.kost_photo_1,
                                })
                              }
                            >
                              <div className="d-flex border rounded p-2 align-items-center mb-1 w-100">
                                <img
                                  src={room.kost_photo_1}
                                  alt=""
                                  className=""
                                  style={{ width: "48px", height: "48px" }}
                                ></img>
                                <div className="ms-2 d-flex flex-column w-100">
                                  <h6 className="mb-0 ms-1 text-start">
                                    {!room ? (
                                      <></>
                                    ) : room.kost_name.length > 20 ? (
                                      room.kost_name.substring(1, 19) + "..."
                                    ) : (
                                      room.kost_name
                                    )}
                                  </h6>
                                  <p className="mb-0 ms-1 text-start fs-6">
                                    pesan : {room.message}
                                  </p>
                                </div>
                                <span
                                  className={
                                    room.status_message === "READED"
                                      ? "visually-hidden translate-middle p-2 bg-danger border border-light rounded-circle"
                                      : " translate-middle p-2 bg-danger border border-light rounded-circle"
                                  }
                                  id={`status${index}`}
                                >
                                  <span className="visually-hidden">
                                    {"New alerts"}
                                  </span>
                                </span>
                              </div>
                            </Button>
                          );
                        })
                      ) : (
                        <>Tidak ada riwayat Chat</>
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
                          header={header}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </Container>
            </Col>
          </Row>
        </Container>
      </PencariLayout>
    </>
  );
}
