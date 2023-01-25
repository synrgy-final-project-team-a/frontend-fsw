import React from "react"
import AdminLayout from "../../../layouts/admin.layout"
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

function DetilUser() {
	const params = useParams()
	const idUser = params.id

	useEffect(() => {
		
	}, [])
	return (
		<>
			<AdminLayout>
				<Container className="mt-4">
					<h1>Detil Users</h1>
					<h1>Id user: { idUser } </h1>
				</Container>
			</AdminLayout>
		</>
	);
};

export default DetilUser;
