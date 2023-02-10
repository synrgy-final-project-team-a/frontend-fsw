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
	}),
})

export const {
	useAddBookingByPencariMutation
} = transaksiApi

export default transaksiApi