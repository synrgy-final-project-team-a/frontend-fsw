import { useEffect, useState } from "react"
import { Table, Button, ButtonGroup, Alert, Container } from "react-bootstrap"
import { useSelector } from "react-redux"
import { useDeleteMutation, useListUsersMutation } from "../../store/apis/users"
import { Link } from "react-router-dom";
import AdminLayout from "../../layouts/admin.layout";

const KelolaKos = () => {

	return (
		<>
        <AdminLayout>
            <Container>
                <h1 className="mt-3">Kelola Kos</h1>
			<Table striped hover size="sm" className="mt-3">
				<thead>
					<tr>
						<th>No</th>
						<th>Nama Kos</th>
						<th>Penyewa</th>
						<th>Alamat</th>
						<th>Status</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					
										<tr>
											<td>1</td>
											<td>Kos 1</td>
											<td>Penyewa 1</td>
											<td>Rawa Itik, Jakarta</td>
											<td>Pending</td>
											<td>
												<ButtonGroup>
													<Button as={Link} size="sm" variant="primary">
														Detail
													</Button>
													<Button size="sm" variant="success">
														Setujui
													</Button>
													<Button size="sm" variant="danger">
														Tolak
													</Button>
												</ButtonGroup>
											</td>
										</tr>
					
				</tbody>
			</Table>
            </Container>                        
        </AdminLayout>
			
		</>
	)
}

export default KelolaKos;