import React from "react"
import AdminLayout from "../../../layouts/admin.layout"
import { Button, Container } from "react-bootstrap";
import ListUsers from "../../../components/users/lists";

function KelolaUser() {
	return (
		<>
			<AdminLayout>
				<Container className="mt-4">
					<h1 className="mt-3">List Users</h1>
					<Button className="mt-5" href="/admin/users/tambah">Tambah User</Button>
					<ListUsers />
				</Container>
			</AdminLayout>
		</>
	);
};

export default KelolaUser;
