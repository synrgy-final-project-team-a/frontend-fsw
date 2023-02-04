import React, { useEffect } from "react";
import { Container, Form, Nav, Navbar } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useCurrentUserMutation } from "../store/apis/users";
import { emptyEmail, emptyToken } from "../store/slices/authSlice";
import { addUser, emptyUser } from "../store/slices/userSlice";

const PencarianLayout = ({ children, setKeywordnya }) => {
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const [currentUserHit, { isLoading: isLoadingUser, isError: isErrorUser, error: errorUser, isSuccess: isSuccessUser, data: dataUser }] = useCurrentUserMutation()

	const token = useSelector(state => state.auth.token)
<<<<<<< HEAD
	const searchText = useSelector(state => state.decor.searchText)
=======
>>>>>>> bf99107c450d7457e8fdb76435251e8373e78533

	const submitKeyword = (e) => {
		e.preventDefault()
		const form = new FormData(e.target)
		setKeywordnya(form.get('keyword'))
	}

	useEffect(() => {
		if (Object.keys(token).length !== 0) {
			if (!token.role.includes('ROLE_SK')) {
				if(token.role.includes('ROLE_TN')) {
					navigate('/penyewa')
				}
				if(token.role.includes('ROLE_SUPERUSER')) {
					navigate('/admin')
				}
			}
			currentUserHit(token.access_token)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	useEffect(() => {
		if (isSuccessUser) {
			dispatch(addUser(dataUser.data))
		}

		if (isErrorUser) {
			if (errorUser.hasOwnProperty('data') && errorUser.data.hasOwnProperty('status') && errorUser.data.status === "Token expired") {
				dispatch(emptyToken())
				dispatch(emptyEmail())
				dispatch(emptyUser())
				navigate('/login')
				return
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isLoadingUser])

	return (
		<>
			<Navbar bg="light" expand="lg" id="navbar" className="py-0">
				<Container>
					<Navbar.Brand as={Link} key={"/"} to="/">
						<img src="/image/logo.png" className="img-fluid mx-1 logo" alt="..." />
					</Navbar.Brand>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Form className="form-search d-flex my-2" onSubmit={submitKeyword}>
							<img src="/search-normal.svg" alt="..." className="p-2" />
							<img src="/line-vertical.svg" alt="..." />
							<input type="text" className="w-100 border-0 mx-2" name="keyword" defaultValue={searchText} placeholder="Tulis daerah / alamat kosan yang akan kamu tuju" />
							<button className="btn btn-primary btn-sm m-1 rounded-full" type="submit">
								Cari
							</button>
						</Form>
						<Nav className="ms-auto align-items-center">
							<Nav.Link className="mx-3" as={Link} to="/">Kembali</Nav.Link>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
			<div id="search-result-container">
				{children}
			</div>
		</>
	);
};

export default PencarianLayout;
