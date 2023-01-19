import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const authApi = createApi({
	reducerPath: "authApi",
	baseQuery: fetchBaseQuery({ baseUrl: 'https://kosanku-bej.up.railway.app/' }),
	tagTypes: ['Auth'],
	endpoints: (build) => ({
		register: build.mutation({
			query: ({ body, role }) => ({
				url: `api/register/+${role}`,
				method: 'POST',
				body: body,
			}),
			invalidatesTags: ['Auth'],
		}),
		register: build.mutation({
			query: ({ body }) => ({
				url: `api/login-user`,
				method: 'POST',
				body: body,
			}),
			invalidatesTags: ['Auth'],
		}),
	}),
})

export const { useRegisterMutation } = authApi

export default authApi