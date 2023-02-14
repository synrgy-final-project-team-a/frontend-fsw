import { useEffect, useRef, useState } from "react"
import { Table, Button, ButtonGroup } from "react-bootstrap"
import { useSelector } from "react-redux"
import { useDeleteMutation, useListUsersMutation } from "../../store/apis/users"
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const ListUsers = () => {
	const token = useSelector((state) => state.auth.token.access_token)
	const [listUserHit, { isLoading, isSuccess, isError, data }] = useListUsersMutation()
	const [deleteHit, { isLoading: loadingDelete, isSuccess: successDelete, isError: errorDelete }] = useDeleteMutation()

	let tempRole = []

	const [loadingFirst, setLoadingFirst] = useState(true);
	const [pageState, setPage] = useState(1)
	const [isEnded, setIsEnded] = useState(false)
	const [list, setList] = useState([])

	const containerRef = useRef()

	const handleDelete = (e, id, role, name) => {
		e.preventDefault()

		if (role.includes('ROLE_SUPERUSER')) {
			toast.error("Dilarang menghapus superadmin!", {
				position: "top-center",
				autoClose: 1000,
				hideProgressBar: false,
				closeOnClick: false,
				pauseOnHover: false,
				draggable: false,
				progress: undefined,
				theme: "light",
			})
			return
		}

		let confirm = window.confirm(`Apakah anda yakin ingin menghapus ${name}?`)

		if (!confirm) {
			return
		}

		toast.loading("Sedang menghapus user", {
			position: "top-center",
			autoClose: 1000,
			hideProgressBar: false,
			closeOnClick: false,
			pauseOnHover: false,
			draggable: false,
			progress: undefined,
			theme: "light",
		})

		deleteHit({ token: token, id: id })
	}

	useEffect(() => {
		const handleScroll = () => {
			if (containerRef) {
				const bottom = containerRef.current.getBoundingClientRect().bottom
				if (bottom < window.innerHeight - 70) {
					listUserHit({ token: token, page: pageState + 1 })
				}
			}
			return
		}

		if (isLoading) {
			window.removeEventListener("scroll", handleScroll);
		}

		if (isSuccess) {
			const datanya = data.data.content
			setLoadingFirst(false)
			setList(list => ([...list, ...datanya]))
			setPage(page => page + 1)

			if (datanya.length !== 0) {
				window.addEventListener("scroll", handleScroll);
			} else {
				if (list.length !== 0 && datanya.length === 0) {
					setIsEnded(true)
				}
			}
		}

		return () => {
			window.removeEventListener("scroll", handleScroll);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isLoading])

	useEffect(() => {
		listUserHit({ token: token, page: 1 })
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	useEffect(() => {
		if (successDelete) {
			toast.dismiss()
			toast.success("Sukses menghapus user", {
				position: "top-center",
				autoClose: 1000,
				hideProgressBar: false,
				closeOnClick: false,
				pauseOnHover: false,
				draggable: false,
				progress: undefined,
				theme: "light",
			})
			setPage(1)
			setList([])
			listUserHit({ token: token, page: 1 })
		}

		if (errorDelete) {
			toast.dismiss()
			toast.error("Gagal menghapus user", {
				position: "top-center",
				autoClose: 1000,
				hideProgressBar: false,
				closeOnClick: false,
				pauseOnHover: false,
				draggable: false,
				progress: undefined,
				theme: "light",
			})
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [loadingDelete])

	return (
		<Table striped hover size="sm" className="mt-3" ref={containerRef}>
			<thead>
				<tr>
					<th>No</th>
					<th>Nama</th>
					<th>Email</th>
					<th>Role</th>
					<th>Aktif</th>
					<th></th>
				</tr>
			</thead>
			<tbody>
				{
					list.length !== 0 ?
						list.map((el, i) => {
							tempRole = []
							return (
								<tr key={i}>
									<td>{i + 1}</td>
									<td>{`${el.first_name} ${el.last_name}`}</td>
									<td>{el.email}</td>
									<td>
										{
											el.role_name.map((ele, it) => {
												if (!tempRole.includes(ele)) {
													tempRole.push(ele)
													if (ele === "ROLE_SUPERUSER") {
														return (
															<span key={it}>Superadmin, </span>
														)
													} else if (ele === "ROLE_TN") {
														return (
															<span key={it}>Penyewa, </span>
														)
													} else if (ele === "ROLE_SK") {
														return (
															<span key={it}>Pencari, </span>
														)
													}
												}
												return <></>
											})
										}
									</td>
									<td>
										{
											el.enabled ?
												<span>Aktif</span> :
												<span>Belum aktif</span>
										}
									</td>
									<td>
										<ButtonGroup>
											<Button size="sm" variant="primary"
												as={Link}
												to={`/admin/users/${el.id}`}
												disabled={isLoading || loadingDelete}
											>
												detil
											</Button>
											<Button size="sm" variant="warning"
												disabled={isLoading || loadingDelete}
											>
												ubah
											</Button>
											<Button size="sm" variant="danger"
												onClick={e => handleDelete(e, el.id, el.role_name, el.first_name + " " + el.last_name)}
												disabled={isLoading || loadingDelete}
											>
												hapus
											</Button>
										</ButtonGroup>
									</td>
								</tr>
							)
						}) :
						""
				}
				{
					loadingFirst ?
						[...Array(10).keys()].map((el, i) => {
							return (
								<tr key={i}>
									<td colSpan={6} className="skeleton">
										&nbsp;
									</td>
								</tr>
							)
						}) :
						""
				}
				<tr>
					<td colSpan={6} className="text-center">
						&nbsp;
						{
							isLoading && !loadingFirst ?
								"Loading..." :
								isError && !loadingFirst ?
									"Data gagal diambil" :
									list.length === 0 && !loadingFirst ?
										"Kos tidak ditemukan" :
										isEnded && !loadingFirst ?
											"Akhir dari list" :
											""
						}
					</td>
				</tr>
			</tbody>
		</Table>
	)
}

export default ListUsers