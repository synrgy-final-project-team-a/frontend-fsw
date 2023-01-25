import { useEffect } from "react"
import { Table, Button, ButtonGroup } from "react-bootstrap"
import { useSelector } from "react-redux"
import { useListUsersMutation } from "../../store/apis/users"

const ListUsers = () => {
	const token = useSelector((state) => state.auth.token.access_token)
	const [listUserHit, { isLoading, isSuccess, data }] = useListUsersMutation()

	useEffect(() => {
		listUserHit(token)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<Table striped hover size="sm">
			<thead>
				<tr>
					<th>No</th>
					<th>Nama</th>
					<th>Role</th>
					<th></th>
				</tr>
			</thead>
			<tbody>
				{
					isLoading ?
						<tr>
							<td colSpan={4} className="text-center">Loading...</td>
						</tr> :
						isSuccess ?
							data.data.map((el, i) => {
								return (
									<tr key={i}>
										<td>1</td>
										<th>{`${el.first_name} ${el.last_name}`}</th>
										<th>Superadmin</th>
										<th>
											<ButtonGroup>
												<Button href="/admin/users/2" size="sm" variant="primary">
													detil
												</Button>
												<Button size="sm" variant="warning">
													ubah
												</Button>
												<Button size="sm" variant="danger">
													hapus
												</Button>
											</ButtonGroup>
										</th>
									</tr>
								)
							}) :
							<tr>
								<td colSpan={4} className="text-center">Ambil data gagal</td>
							</tr>
				}
			</tbody>
		</Table>
	)
}

export default ListUsers