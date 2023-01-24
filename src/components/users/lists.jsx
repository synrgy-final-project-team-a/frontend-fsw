import { Table, Button, ButtonGroup } from "react-bootstrap"

const ListUsers = () => {
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
				<tr>
					<td>1</td>
					<th>Rindho Ananta Samat</th>
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
			</tbody>
		</Table>
	)
}

export default ListUsers