import React from "react"
import AdminLayout from "../../../layouts/admin.layout"
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useOneUserMutation } from "../../../store/apis/users";
import { useSelector } from "react-redux";

function DetilUser() {
	const params = useParams()
	const idUser = params.id

	const token = useSelector((state) => state.auth.token.access_token)

	const [oneUserHit, { isLoading, isSuccess, data }] = useOneUserMutation()

	useEffect(() => {
		oneUserHit({ token: token, id: idUser })
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<>
			<AdminLayout>
				<Container className="mt-4 d-flex">
					<table>
						<tbody>
							{
								isLoading ?
									<tr>
										<td colSpan={2} className="text-center">Loading...</td>
									</tr> :
									isSuccess ?
										<tr>
											<td>Nama</td>
											<td>: {data.data.first_name} {data.data.last_name}</td>
										</tr> :
										<tr>
											<td colSpan={2} className="text-center">Ambil data gagal</td>
										</tr>
							}
						</tbody>
					</table>
				</Container>
			</AdminLayout>
		</>
	);
};

export default DetilUser;
