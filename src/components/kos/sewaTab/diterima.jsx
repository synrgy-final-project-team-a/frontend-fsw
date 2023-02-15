import React, { useEffect } from "react";
import { Button, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAddRoomChatMutation } from "../../../store/apis/chat";
import { createChat } from "../../../store/slices/chatSlice";

export default function Diterima() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const transaksi = useSelector((state) => state.transaksi);

  const [
    addNewChat,
    {
      isLoading: isLoadingNewChat,
      isError: isErrorNewChat,
      error: errorNewChat,
      isSuccess: isSuccessNewChat,
      data: dataNewChat,
    },
  ] = useAddRoomChatMutation();

  const onClickNewChatHandler = (e) => {
    e.preventDefault();

    if (Object.keys(token).length === 0) {
      toast.error("Login terlebih dahulu!", {
        position: "top-center",
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "light",
      });
      return;
    }

    const idKos = transaksi.kost_id;

    addNewChat({ token: token.access_token, body: { kostId: idKos } });
  };

  useEffect(() => {
    if (isSuccessNewChat) {
      dispatch(createChat(dataNewChat));
      navigate(
        `/chat?newChat=true&nameKost=${transaksi.kost_name}&avatar=${transaksi.front_building_photo}`
      );
    }

    if (isErrorNewChat) {
      console.log("error");
      console.log(errorNewChat);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoadingNewChat]);

  return (
    <>
      <Container>
        <div className="d-flex flex-column justify-content-center text-center">
          <h2>Tempati Kosanmu </h2>
          <h4 className="text-center m-auto" style={{ maxWidth: "820px" }}>
            Yeeay, Pembayaranmu diterima, silahkan hubung pemilik kos untuk
            mengkonfirmasi kedatanganmu{" "}
          </h4>
          <img
            src="/image10.png"
            alt=""
            className="img-fluid m-auto image-sewa"
          ></img>
          <Button
            variant="outline-primary"
            type="submit"
            className="w-sm-25 w-xs-50 m-auto mb-5 fw-bold"
            onClick={onClickNewChatHandler}
            disabled={isLoadingNewChat}
          >
            Hubungi Penyewa Kos
          </Button>
        </div>
      </Container>
    </>
  );
}
