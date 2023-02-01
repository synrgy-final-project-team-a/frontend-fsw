import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const authApi = createApi({
	reducerPath: "authApi",
	baseQuery: fetchBaseQuery({ baseUrl: 'https://authentication-service-production.up.railway.app/' }),
	tagTypes: ['Auth'],
	endpoints: (build) => ({
		register: build.mutation({
			query: ({ body, role }) => ({
				url: `api/register/${role}`,
				method: 'POST',
				body: body,
			}),
			invalidatesTags: ['Auth'],
		}),
		resendOtp: build.mutation({
			query: (body) => ({
				url: `api/register/send-otp`,
				method: 'POST',
				body: body,
			}),
			invalidatesTags: ['Auth'],
		}),
		login: build.mutation({
			query: ({ body, role }) => ({
				url: `api/login-${role}`,
				method: 'POST',
				body: body,
			}),
			invalidatesTags: ['Auth'],
		}),
		forgotPassword: build.mutation({
			query: (body) => ({
				url: `api/forget-password/send`,
				method: 'POST',
				body: body,
			}),
			invalidatesTags: ['Auth'],
		}),
		changePassword: build.mutation({
			query: (body) => ({
				url: `api/forget-password/change-password`,
				method: 'POST',
				body: body,
			}),
			invalidatesTags: ['Auth'],
		}),
		logout: build.mutation({
			query: (token) => ({
				url: `api/logout`,
				method: 'GET',
				headers: {
					'authorization': `Bearer ${token}`
				},
				responseHandler: "text/html"
			}),
			invalidatesTags: ['Auth'],
		}),
	}),
})

export const {
	useRegisterMutation,
	useResendOtpMutation,
	useLoginMutation,
	useForgotPasswordMutation,
	useChangePasswordMutation,
	useLogoutMutation
} = authApi

export default authApi