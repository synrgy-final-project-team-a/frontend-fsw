import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const usersApi = createApi({
	reducerPath: "usersApi",
	baseQuery: fetchBaseQuery({ baseUrl: 'https://backend-fsw-development.up.railway.app/' }),
	tagTypes: ['Users'],
	endpoints: (build) => ({
		listUsers: build.mutation({
			query: (token) => ({
				url: `api/users`,
				method: 'GET',
				headers: {
					'authorization': `Bearer ${token}`
				}
			}),
			invalidatesTags: ['Users'],
		}),
	}),
})

export const { useListUsersMutation } = usersApi

export default usersApi