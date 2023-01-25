import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FooterComponent from "../components/footer"
import NavbarComponent from "../components/navbar"
import PencariRoutes from "../routes/pencari";
import { emptyEmail, emptyToken } from "../store/slices/authSlice";
import { emptyUser } from "../store/slices/userSlice";

const PencariLayout = ({ children }) => {
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const token = useSelector(state => state.auth.token)

	useEffect(() => {
		if (Object.keys(token).length !== 0) {
			if (!token.role.includes('ROLE_SK')) {
				dispatch(emptyToken())
				dispatch(emptyEmail())
				dispatch(emptyUser())
				navigate('/login')
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<>
			<NavbarComponent routes={PencariRoutes} />
			{children}
			<FooterComponent />
		</>
	)
}

export default PencariLayout