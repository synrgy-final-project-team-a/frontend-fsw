import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FooterComponent from "../components/footer";
import NavbarComponent from "../components/navbar";
import PenyewaRoutes from "../routes/penyewa";
import { useCurrentUserMutation } from "../store/apis/users";
import { emptyEmail, emptyToken } from "../store/slices/authSlice";
import { addUser, emptyUser } from "../store/slices/userSlice";
import { socket } from "../pages/pencari/chat/chatPage";
const PenyewaLayout = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const notifRef = useRef({});
  const [
    currentUserHit,
    {
      isLoading: isLoadingUser,
      isError: isErrorUser,
      error: errorUser,
      isSuccess: isSuccessUser,
      data: dataUser,
    },
  ] = useCurrentUserMutation();

  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    if (Object.keys(token).length === 0) {
      dispatch(emptyToken());
      dispatch(emptyEmail());
      dispatch(emptyUser());
      navigate("/login");
    } else {
      if (!token.role.includes("ROLE_TN")) {
        if (token.role.includes("ROLE_SK")) {
          navigate("/");
        }
        if (token.role.includes("ROLE_SUPERUSER")) {
          navigate("/penyewa");
        }
      }
      currentUserHit(token.access_token);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isSuccessUser) {
      // join room socket notification
      socket.emit("join_notification", "notif1234");
      dispatch(addUser(dataUser.data));
    }

    if (isErrorUser) {
      if (
        errorUser.data.hasOwnProperty("status") &&
        errorUser.data.status === "Token expired"
      ) {
        dispatch(emptyToken());
        dispatch(emptyEmail());
        dispatch(emptyUser());
        navigate("/login");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoadingUser]);

  // get notification chat
  useEffect(() => {
    console.log("harus jalan");
    socket.on("receive_notification", (data) => {
      if (!notifRef.current.createdat) {
        console.log("12");
        notifRef.current = data;
        showNotif("Pesan Masuk", data.message);
      }
      if (notifRef.current.createdat) {
        if (notifRef.current.createdat !== data.createdat) {
          console.log("12");
          notifRef.current = data;
          showNotif("Pesan Masuk", data.message);
        }
      }
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  function showNotif(title, message) {
    Notification.requestPermission(function (permission) {
      // console.log(permission);
      if (permission === "granted") {
        try {
          var icon =
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-EinguwJDjx2V4hVtNf2GtnYGp4OSVbYW9Q&usqp=CAU";
          var body = message;
          var notification = new Notification(title, { body, icon });
          notification.onclick = () => {
            notification.close();
            window.parent.focus();
          };
        } catch (e) {
          console.log(e);
        }
      }
    });
  }
  return (
    <>
      <NavbarComponent routes={PenyewaRoutes} />
      {children}
      <FooterComponent />
    </>
  );
};

export default PenyewaLayout;
