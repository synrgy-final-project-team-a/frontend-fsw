import React from "react"
import AdminLayout from "../../../layouts/admin.layout"
import { Button, Container } from "react-bootstrap";
import ListUsers from "../../../components/users/lists";
import { Link } from "react-router-dom";

function KelolaUser() {
	return (
		<>
			<AdminLayout>
				<Container className="mt-4">
					<h1 className="mt-3">List Users</h1>
					<Button as={Link} className="mt-5" to="/admin/users/tambah">Tambah User</Button>
					<ListUsers />
				</Container>
			</AdminLayout>
		</>
	);
};

export default KelolaUser;
