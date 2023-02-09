import React, { useState, useEffect } from "react";
import { Button, Col, Container, Nav, Row, Spinner } from "react-bootstrap";
import { Link, useLocation, useSearchParams } from "react-router-dom";

import Profile from "../../../components/profile";
import PencariRoutes from "../../../routes/pencari";

import ChatField from "./chatField";
import { socket } from "../../pencari/chat/chatPage";
import { useDispatch, useSelector } from "react-redux";
import PenyewaLayout from "../../../layouts/penyewa.layout";
import { useGetListRoomChatMutation } from "../../../store/apis/chat";
import { addlistRoomChat } from "../../../store/slices/chatSlice";
export default function ChatPagePenyewa() {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  let location = useLocation();
  const newChat = useSelector((state) => state.chat.newChat);
  const listRoomChat = useSelector((state) => state.chat.listRoomChat);

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

  const token = useSelector((state) => state.auth.token);
  const [roomChat, setRoomChat] = useState([]);
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const [loading, setLoading] = useState(false);
  const [header, setHeader] = useState({});

  useEffect(() => {
    // Google Analytics
    if (location.pathname != "/penyewa/profile/chat") {
      console.log(location);
    }
  }, [location]);
  useEffect(() => {
    setLoading(true);
    try {
      getListRoomHit({ token: token.access_token });
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (isSuccessListRoom) {
      setRoomChat(dataListRoom.data);
      dispatch(addlistRoomChat(dataListRoom));
    }

    if (isErrorListRoom) {
      console.log("error");
      console.log(errorListRoom);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoadingListRoom]);

  const joinRoom = ({ roomId, nameKos, avatar }) => {
    if (roomId) {
      setHeader({ nameKos: nameKos, avatar: avatar });
      setRoom(roomId);
      socket.emit("join-room", { token: token.access_token, roomId });
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
                      {loading ? (
                        <Spinner animation="border" role="status">
                          <span className="visually-hidden">Loading...</span>
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
                                  roomId: room.room_id,
                                  nameKos: room.seeker_name,
                                  avatar: room.seeker_avatar,
                                })
                              }
                            >
                              <div className="d-flex border rounded p-2 align-items-center mb-1 ">
                                <img
                                  src={room.seeker_avatar}
                                  alt=""
                                  className=""
                                  style={{ width: "48px", height: "48px" }}
                                ></img>
                                <div className="ms-2">
                                  <h6 className="mb-0 ms-1">
                                    {room.seeker_name.length > 20
                                      ? room.seeker_name.substring(1, 19) +
                                        "..."
                                      : room.seeker_name}
                                  </h6>
                                  <p className="mb-0 ms-0">
                                    {" "}
                                    {room.kost_name.length > 20
                                      ? room.kost_name.substring(1, 19) + "..."
                                      : room.kost_name}
                                  </p>
                                </div>
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
      </PenyewaLayout>
    </>
  );
}