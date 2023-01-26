import React from "react"
import AdminLayout from "../../../layouts/admin.layout"
import { Container, Table } from "react-bootstrap";
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
					<Table>
						<tbody>
							{
								isLoading ?
									<tr>
										<td colSpan={2} className="text-center">Loading...</td>
									</tr> :
									isSuccess ?
										<>
											<tr>
												<td>Nama</td>
												<td>: {data.data.first_name} {data.data.last_name}</td>
											</tr>
											<tr>
												<td>Email</td>
												<td>: {data.data.email}</td>
											</tr>
											<tr>
												<td>Jenis Kelamin</td>
												<td>: {data.data.Gender}</td>
											</tr>
											<tr>
												<td>Nomor Telepon</td>
												<td>: {data.data.phone_number}</td>
											</tr>
											<tr>
												<td>Alamat</td>
												<td>: {data.data.address}</td>
											</tr>
											<tr>
												<td>Kota</td>
												<td>: {data.data.city}</td>
											</tr>
											<tr>
												<td>Provinsi</td>
												<td>: {data.data.province}</td>
											</tr>
										</> :
										<tr>
											<td colSpan={2} className="text-center">Ambil data gagal</td>
										</tr>
							}
						</tbody>
<<<<<<< HEAD
					</table>
=======
					</Table>
>>>>>>> testing
				</Container>
			</AdminLayout>
		</>
	);
};

export default DetilUser;
