import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const authApi = createApi({
	reducerPath: "authApi",
	baseQuery: fetchBaseQuery({ baseUrl: 'https://kosanku-bej.up.railway.app/' }),
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


	}),
})

export const {
	useRegisterMutation,
	useResendOtpMutation,
	useLoginMutation,
<<<<<<< HEAD
	useForgotPasswordMutation,
	useChangePasswordMutation
=======
	useResendOtpMutation,
	useForgotPasswordMutation
>>>>>>> 5190bcd1e80e47a4256ac1adc37f82ff8dde4d51
} = authApi

export default authApi