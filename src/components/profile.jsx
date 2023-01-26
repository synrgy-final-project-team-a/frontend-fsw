import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
export default function Profile() {
  const userData = useSelector((state) => {
    return state.user.current;
  });

  return (
    <>
      <div>
        <h5 className="fw-bold">Profile</h5>
        <div className="d-flex">
          <img
            src={userData.avatar}
            className="rounded-circle me-2"
            width="50"
            height="50"
            alt="..."
          />
          <div>
            <p className="m-0 fw-bold">
              <small>{userData.first_name + " " + userData.last_name} </small>
            </p>
            <p>
              <small>{userData.phone_number}</small>
            </p>
          </div>
        </div>
        {/* kurang tanda verif */}
        <div className="d-flex align-items-center h-100 ">
          <p
            className="text-center align-middle my-auto"
            style={{ fontSize: "12px" }}
          >
            Identitas terverifikasi
          </p>

          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              opacity="0.4"
              d="M9.1335 1.71665L4.55016 3.43332C3.67516 3.76665 2.9585 4.79999 2.9585 5.74165V12.4917C2.9585 13.1667 3.40016 14.0583 3.94183 14.4583L8.52516 17.8833C9.3335 18.4917 10.6585 18.4917 11.4668 17.8833L16.0502 14.4583C16.5918 14.05 17.0335 13.1667 17.0335 12.4917V5.74165C17.0335 4.80832 16.3168 3.76665 15.4418 3.44165L10.8585 1.72499C10.3918 1.54165 9.6085 1.54165 9.1335 1.71665Z"
              fill="#056C73"
            />
            <path
              d="M8.88353 11.8581C8.72519 11.8581 8.56686 11.7998 8.44186 11.6748L7.1002 10.3331C6.85853 10.0914 6.85853 9.69144 7.1002 9.44977C7.34186 9.20811 7.74186 9.20811 7.98353 9.44977L8.88353 10.3498L12.0252 7.20811C12.2669 6.96644 12.6669 6.96644 12.9085 7.20811C13.1502 7.44977 13.1502 7.84977 12.9085 8.09144L9.32519 11.6748C9.20019 11.7998 9.04186 11.8581 8.88353 11.8581Z"
              fill="#056C73"
            />
          </svg>
        </div>
      </div>
      <div>
        <h5 className="fw-bold">Pengaturan akun</h5>
        <p className="mb-0">
          <small>
            <Link
              to="/profile/informasi-personal"
              className="text-dark text-decoration-none"
            >
              Informasi personal
            </Link>
          </small>
        </p>
        <hr className="m-0" />
        <p className="mb-0 mt-3">
          <small>Histori transaksi</small>
        </p>
        <hr className="m-0" />
        <p className="mb-0 mt-3">
          <small>Notifikasi</small>
        </p>
        <hr className="m-0" />
        <p className="mb-0 mt-3">
          <small>Pengaturan</small>
        </p>
        <hr className="m-0" />
      </div>
      <div>
        <h5 className="fw-bold mt-3">Referensi</h5>
        <p className="mb-0">
          <small>Undang Teman</small>
        </p>
        <hr className="m-0" />
      </div>
      <div>
        <h5 className="fw-bold mt-3">Support</h5>
        <p className="mb-0 mt-3">
          <small>Pertanyaan</small>
        </p>
        <hr className="m-0" />
        <p className="mb-0 mt-3">
          <small>Feedback</small>
        </p>
        <hr className="m-0" />
      </div>
      <div>
        <h5 className="fw-bold mt-3">Logout</h5>
      </div>
    </>
  );
}
