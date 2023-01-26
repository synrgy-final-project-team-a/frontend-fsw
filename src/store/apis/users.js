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
<<<<<<< HEAD
		oneUser: build.mutation({
			query: ({ token, id }) => ({
				url: `api/user/detail/${id}`,
				method: 'GET',
				headers: {
					'authorization': `Bearer ${token}`
				}
			}),
			invalidatesTags: ['Users'],
		}),
=======
>>>>>>> a46bfbf3d2d3cd90299d32957a5577a73a71e10f
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
	useOneUserMutation,
	useCurrentUserMutation,
	useDeleteMutation
} = usersApi

export default usersApi