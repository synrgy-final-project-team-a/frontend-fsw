import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FooterComponent from "../components/footer"
import NavbarComponent from "../components/navbar"
import PencariRoutes from "../routes/pencari";
import { useCurrentUserMutation } from "../store/apis/users";
import { emptyEmail, emptyToken } from "../store/slices/authSlice";
import { addUser, emptyUser } from "../store/slices/userSlice";

const PencariLayout = ({ children }) => {
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const [currentUserHit, { isLoading: isLoadingUser, isError: isErrorUser, error: errorUser, isSuccess: isSuccessUser, data: dataUser }] = useCurrentUserMutation()

	const token = useSelector(state => state.auth.token)

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
			if (errorUser.data.hasOwnProperty('status') && errorUser.data.status === "Token expired") {
				dispatch(emptyToken())
				dispatch(emptyEmail())
				dispatch(emptyUser())
				navigate('/login')
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isLoadingUser])

	return (
		<>
			<NavbarComponent routes={PencariRoutes} />
			{children}
			<FooterComponent />
		</>
	)
}

export default PencariLayout