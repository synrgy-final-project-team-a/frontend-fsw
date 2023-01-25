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
		currentUser: build.mutation({
			query: (token) => ({
				url: `api/user/detail`,
				method: 'GET',
				headers: {
					'authorization': `Bearer ${token}`
				}
			}),
			invalidatesTags: ['Users'],
		}),
		delete: build.mutation({
			query: ({ token, id }) => ({
				url: `api/user/delete/${id}`,
				method: 'DELETE',
				headers: {
					'authorization': `Bearer ${token}`
				}
			}),
			invalidatesTags: ['Users'],
		}),
	}),
})

export const {
	useListUsersMutation,
	useCurrentUserMutation,
	useDeleteMutation
} = usersApi

export default usersApi