import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { ListGroup } from "react-bootstrap";

const ProfileNav = () => {
	const userData = useSelector(state => state.user.current)
	const location = useLocation()

	const roleRoutes = (link) => {
		let profilePath = link
		if(location.pathname.includes('/penyewa')) {
			profilePath = "/penyewa" + link
		}
		if(location.pathname.includes('/admin')) {
			profilePath = "/admin" + link
		}

		return profilePath
	}

	return (
		<div id="profile-nav">
			<div className="mb-3">
				<h5 className="fw-bold">Profile</h5>
				<div className="d-flex">
					<img src={userData.avatar} className="rounded-circle me-2 profile-picture" alt="..." />
					<div>
						<p className="m-0 fw-bold">{userData.first_name + " " + userData.last_name}</p>
						<p>{userData.phone_number}</p>
					</div>
				</div>
				<div className="d-flex align-items-center h-100 ">
					<p className="text-center align-middle my-auto">Identitas terverifikasi</p>
					<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path opacity="0.4" d="M9.1335 1.71665L4.55016 3.43332C3.67516 3.76665 2.9585 4.79999 2.9585 5.74165V12.4917C2.9585 13.1667 3.40016 14.0583 3.94183 14.4583L8.52516 17.8833C9.3335 18.4917 10.6585 18.4917 11.4668 17.8833L16.0502 14.4583C16.5918 14.05 17.0335 13.1667 17.0335 12.4917V5.74165C17.0335 4.80832 16.3168 3.76665 15.4418 3.44165L10.8585 1.72499C10.3918 1.54165 9.6085 1.54165 9.1335 1.71665Z" fill="#056C73" />
						<path d="M8.88353 11.8581C8.72519 11.8581 8.56686 11.7998 8.44186 11.6748L7.1002 10.3331C6.85853 10.0914 6.85853 9.69144 7.1002 9.44977C7.34186 9.20811 7.74186 9.20811 7.98353 9.44977L8.88353 10.3498L12.0252 7.20811C12.2669 6.96644 12.6669 6.96644 12.9085 7.20811C13.1502 7.44977 13.1502 7.84977 12.9085 8.09144L9.32519 11.6748C9.20019 11.7998 9.04186 11.8581 8.88353 11.8581Z" fill="#056C73" />
					</svg>
				</div>
			</div>
			<div className="mb-3">
				<h5 className="fw-bold">Pengaturan akun</h5>
				<ListGroup variant="flush">
					<ListGroup.Item as={Link} to={roleRoutes("/profile/saya")}>Informasi Pengguna</ListGroup.Item>
					<ListGroup.Item as={Link} to={roleRoutes("/profile/histori")}>Histori Transaksi</ListGroup.Item>
					<ListGroup.Item>Notifikasi</ListGroup.Item>
					<ListGroup.Item>Pengaturan</ListGroup.Item>
				</ListGroup>
			</div>
			<div className="mb-3">
				<h5 className="fw-bold">Referensi</h5>
				<ListGroup variant="flush">
					<ListGroup.Item>Undang Teman</ListGroup.Item>
				</ListGroup>
			</div>
			<div className="mb-3">
				<h5 className="fw-bold">Bantuan</h5>
				<ListGroup variant="flush">
					<ListGroup.Item>Pertanyaan</ListGroup.Item>
					<ListGroup.Item>Feedback</ListGroup.Item>
				</ListGroup>
			</div>
		</div>
	);
}

export default ProfileNav