import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const transaksiApi = createApi({
	reducerPath: "transaksiApi",
	baseQuery: fetchBaseQuery({
		baseUrl: 'https://transaction-service.herokuapp.com/'
	}),
	tagTypes: ['Transaksi'],
	endpoints: (build) => ({
		addBookingByPencari: build.mutation({
			query: ({ body, profileId, roomId }) => ({
				url: `api/seeker/transactions/user/${profileId}/room/${roomId}`,
				method: 'POST',
				body: body,
			}),
			invalidatesTags: ['Transaksi'],
		}),
		getListbyPencari: build.mutation({
			query: ({ profileId }) => ({
				url: `api/seeker/transactions/list/${profileId}`,
				method: 'GET',
			}),
			invalidatesTags: ['Transaksi'],
		}),
	}),
})

export const {
	useAddBookingByPencariMutation,
	useGetListbyPencariMutation
} = transaksiApi

export default transaksiApi