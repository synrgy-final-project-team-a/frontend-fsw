import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import FooterComponent from "../components/footer"
import NavbarComponent from "../components/navbar"
import PenyewaRoutes from "../routes/penyewa"
import { useCurrentUserMutation } from "../store/apis/users"
import { emptyEmail, emptyToken } from "../store/slices/authSlice"
import { emptyKos } from "../store/slices/kosSlice"
import { addUser, emptyUser } from "../store/slices/userSlice"
import { ToastContainer } from "react-toastify";

const PenyewaLayout = ({ children }) => {
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const [currentUserHit, { isLoading: isLoadingUser, isError: isErrorUser, error: errorUser, isSuccess: isSuccessUser, data: dataUser }] = useCurrentUserMutation()
	
	const token = useSelector(state => state.auth.token)

	useEffect(() => {
		if (Object.keys(token).length === 0) {
			dispatch(emptyToken())
			dispatch(emptyEmail())
			dispatch(emptyUser())
			dispatch(emptyKos())
			navigate('/login')
		} else {
			if (!token.role.includes('ROLE_TN')) {
				if(token.role.includes('ROLE_SK')) {
					navigate('/')
				}
				if(token.role.includes('ROLE_SUPERUSER')) {
					navigate('/penyewa')
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
			if (errorUser.data.hasOwnProperty('status') && errorUser.data.status === "Token expired") {
				dispatch(emptyToken())
				dispatch(emptyEmail())
				dispatch(emptyUser())
				dispatch(emptyKos())
				navigate('/login')
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isLoadingUser])

	return (
		<>
			<ToastContainer />
			<NavbarComponent routes={PenyewaRoutes} />
			{children}
			<FooterComponent />
		</>
	)
}

export default PenyewaLayout