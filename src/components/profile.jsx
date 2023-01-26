import React from "react";
import { Link } from "react-router-dom";

export default function profile() {
  return (
    <>
      <div>
        <h5 className="fw-bold">Profile</h5>
        <div className="d-flex">
          <img
            src="/logo512.png"
            className="rounded-circle me-2"
            width="50"
            height="50"
            alt="..."
          />
          <div>
            <p className="m-0 fw-bold">
              <small>Dion Kurniaawan</small>
            </p>
            <p>
              <small>081212121212</small>
            </p>
          </div>
        </div>
        {/* kurang tanda verif */}
        <p style={{ fontSize: "12px" }}>Identitas terverifikasi</p>
      </div>
      <div>
        <h5 className="fw-bold">Pengaturan akun</h5>
        <p className="mb-0">
          <small>
            <Link to="/profile/informasi-personal" className="text-dark text-decoration-none">Informasi personal</Link>
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
