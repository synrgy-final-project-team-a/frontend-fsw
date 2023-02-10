import React from "react"
import AdminLayout from "../../../layouts/admin.layout"
import { Button, Container, Table } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
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
				<Container className="d-flex mt-4 align-items-center">
					<Button as={Link} className="mx-2" to="/admin/users">Kembali</Button>
					<h3 className="my-0 mx-2">Detail User</h3>
				</Container>
				<Container className="mt-4">
					{
						isLoading ?
							"" :
							isSuccess ?
								<img src={data.data.avatar} style={{width: "200px"}} className="img-fluid" alt="..." /> :
								""
					}
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
					</Table>
				</Container>
			</AdminLayout>
		</>
	);
};

export default DetilUser;
