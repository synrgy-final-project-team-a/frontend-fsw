import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FooterComponent from "../components/footer";
import NavbarComponent from "../components/navbar";
import PencariRoutes from "../routes/pencari";
import { useCurrentUserMutation } from "../store/apis/users";
import { emptyEmail, emptyToken } from "../store/slices/authSlice";
import { emptyKos } from "../store/slices/kosSlice";
import { addUser, emptyUser } from "../store/slices/userSlice";
import { socket } from "../pages/pencari/chat/chatPage";
import { ToastContainer } from "react-toastify";
import { useGetListbyPencariMutation } from "../store/apis/transaksi";
import { setNotifNum } from "../store/slices/decorSlice";

const PencariLayout = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [
    getListHit,
    { isLoading: loadingList, isSuccess: successList, data: dataList }
  ] = useGetListbyPencariMutation();

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
  // console.log(token);
  useEffect(() => {
    if (Object.keys(token).length !== 0) {
      if (!token.role.includes("ROLE_SK")) {
        if (token.role.includes("ROLE_TN")) {
          navigate("/penyewa");
        }
        if (token.role.includes("ROLE_SUPERUSER")) {
          navigate("/admin");
        }
      }
      currentUserHit(token.access_token);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isSuccessUser) {
      // console.log(dataUser.data);
      // join room socket notification
      socket.emit("subscribe-notification", { token: token.access_token });
      dispatch(addUser(dataUser.data));
      getListHit({ profileId: token.profile_id });
    }

    if (isErrorUser) {
      if (errorUser.hasOwnProperty('data') && errorUser.data.hasOwnProperty('status') && errorUser.data.status === "Token expired") {
        dispatch(emptyToken())
        dispatch(emptyEmail())
        dispatch(emptyUser())
        dispatch(emptyKos())
        navigate('/')
        return
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoadingUser])

  useEffect(() => {
    if (successList) {
      const filterWatched = (el) => {
        return el.watched_sk === false
      }
      const notifNum = dataList.data.content.filter(filterWatched)

      dispatch(setNotifNum(notifNum.length))
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadingList])

  useEffect(() => {
    socket.on("subscribe-notification", (data) => {
      if (!notifRef.current.created_at) {
        notifRef.current = data;
        showNotif("Pesan Masuk", data.message);
      }
      if (notifRef.current.created_at) {
        if (notifRef.current.created_at !== data.created_at) {
          // console.log("12");
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
      <ToastContainer />
      <NavbarComponent routes={PencariRoutes} />
      {children}
      <FooterComponent />
    </>
  )
}

export default PencariLayout;
